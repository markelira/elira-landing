import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { LearningActivity, ActivityType } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/**
 * POST /api/learning-activities
 *
 * Creates a new learning activity record and updates user progress
 *
 * @requires Authentication via Bearer token
 * @body { type, courseId, lessonId?, moduleId?, metadata? }
 * @returns Created activity ID
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    if (!auth || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 500 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { type, courseId, lessonId, moduleId, metadata } = body;

    // Validate required fields
    if (!type || !courseId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, courseId' },
        { status: 400 }
      );
    }

    // Validate activity type
    const validTypes: ActivityType[] = [
      'lesson_started',
      'lesson_completed',
      'quiz_taken',
      'template_downloaded',
      'consultation_attended',
      'module_completed',
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid activity type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create activity record
    const activityRef = db
      .collection('learningActivities')
      .doc(userId)
      .collection('activities')
      .doc();

    const activity: any = {
      activityId: activityRef.id,
      userId,
      timestamp: FieldValue.serverTimestamp(),
      type,
      courseId,
      lessonId: lessonId || null,
      moduleId: moduleId || null,
      metadata: metadata || {},
    };

    await activityRef.set(activity);

    console.log(`[Learning Activity] Created ${type} for user ${userId}`);

    // Update user progress based on activity type
    await updateUserProgress(userId, type, metadata || {}, courseId);

    // Check for achievements (will implement in Phase 3)
    // await checkAchievements(userId, type);

    return NextResponse.json({
      success: true,
      activityId: activityRef.id,
      message: 'Activity logged successfully',
    });
  } catch (error: any) {
    console.error('[Learning Activity] Error:', error);

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { success: false, error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/learning-activities?userId={userId}&limit={limit}
 *
 * Fetches learning activities for a user
 *
 * @requires Authentication via Bearer token
 * @query userId - User ID (must match authenticated user)
 * @query limit - Number of activities to fetch (default: 50)
 * @returns Array of learning activities
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    if (!auth || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 500 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    const authenticatedUserId = decodedToken.uid;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || authenticatedUserId;
    const limit = parseInt(searchParams.get('limit') || '50');

    // Verify user is requesting their own activities
    if (userId !== authenticatedUserId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Cannot access other user activities' },
        { status: 403 }
      );
    }

    // Fetch activities
    const activitiesSnapshot = await db
      .collection('learningActivities')
      .doc(userId)
      .collection('activities')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    const activities = activitiesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
      };
    });

    return NextResponse.json({
      success: true,
      activities,
      count: activities.length,
    });
  } catch (error: any) {
    console.error('[Learning Activity] Fetch error:', error);

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { success: false, error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to update user progress based on activity
 */
async function updateUserProgress(
  userId: string,
  activityType: string,
  metadata: any,
  courseId: string
) {
  if (!db) return;

  const progressRef = db.collection('userProgress').doc(userId);
  const progressDoc = await progressRef.get();

  if (!progressDoc.exists) {
    console.log(`[Progress Update] User progress doesn't exist for ${userId}, skipping update`);
    return;
  }

  const updates: any = {
    lastActivityAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Add learning time if provided
  if (metadata?.duration && typeof metadata.duration === 'number') {
    updates.totalLearningTime = FieldValue.increment(metadata.duration);
    console.log(`[Progress Update] Adding ${metadata.duration}s to learning time`);
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const progressData = progressDoc.data();

  if (progressData?.lastStreakDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (progressData?.lastStreakDate === yesterdayStr) {
      // Continue streak
      const newStreak = (progressData?.currentStreak || 0) + 1;
      updates.currentStreak = newStreak;
      updates.lastStreakDate = today;

      // Update longest streak if needed
      if (newStreak > (progressData?.longestStreak || 0)) {
        updates.longestStreak = newStreak;
      }

      console.log(`[Progress Update] Streak continued: ${newStreak} days`);
    } else {
      // Streak broken, reset
      updates.currentStreak = 1;
      updates.lastStreakDate = today;
      console.log('[Progress Update] Streak reset to 1');
    }
  }

  // Update course-specific progress for lesson/module completion
  if (activityType === 'lesson_completed' || activityType === 'module_completed') {
    const enrolledCourses = progressData?.enrolledCourses || [];
    const courseIndex = enrolledCourses.findIndex((c: any) => c.courseId === courseId);

    if (courseIndex !== -1) {
      const updatedCourses = [...enrolledCourses];

      if (activityType === 'lesson_completed') {
        updatedCourses[courseIndex].completedLessons = (updatedCourses[courseIndex].completedLessons || 0) + 1;

        // Calculate new progress percentage
        const totalLessons = updatedCourses[courseIndex].totalLessons || 1;
        const completedLessons = updatedCourses[courseIndex].completedLessons;
        updatedCourses[courseIndex].progressPercentage = Math.round((completedLessons / totalLessons) * 100);

        console.log(`[Progress Update] Lesson completed: ${completedLessons}/${totalLessons}`);
      }

      updatedCourses[courseIndex].lastAccessedAt = new Date();

      updates.enrolledCourses = updatedCourses;
    }
  }

  // Perform update
  try {
    await progressRef.update(updates);
    console.log(`[Progress Update] Successfully updated progress for user ${userId}`);
  } catch (error) {
    console.error('[Progress Update] Error updating progress:', error);
  }
}
