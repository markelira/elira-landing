import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { UserProgress } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/**
 * GET /api/users/[userId]/progress
 *
 * Fetches the user's learning progress data from the new dashboard system
 *
 * @requires Authentication via Bearer token
 * @returns UserProgress data or initializes if doesn't exist
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);

    // Verify user is requesting their own data
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Cannot access other user data' },
        { status: 403 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    // Fetch user progress from new collection
    console.log('[Progress API] Fetching userProgress for userId:', userId);
    console.log('[Progress API] Database config:', {
      hasDb: !!db,
      projectId: process.env.FIREBASE_PROJECT_ID,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
    });

    const progressDoc = await db.collection('userProgress').doc(userId).get();
    console.log('[Progress API] Document exists:', progressDoc.exists);
    console.log('[Progress API] Document ID:', progressDoc.id);
    console.log('[Progress API] Document ref path:', progressDoc.ref.path);

    if (!progressDoc.exists) {
      // Initialize if doesn't exist (fallback in case onUserCreate trigger failed)
      console.log(`[Progress API] Initializing progress for user ${userId}`);

      const today = new Date().toISOString().split('T')[0];

      const initialProgress: any = {
        userId: userId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        totalCourses: 0,
        completedCourses: 0,
        totalLearningTime: 0,
        lastActivityAt: FieldValue.serverTimestamp(),
        currentStreak: 0,
        longestStreak: 0,
        lastStreakDate: today,
        enrolledCourses: [],
      };

      await db.collection('userProgress').doc(userId).set(initialProgress);

      // Convert timestamps for response
      const responseData = {
        ...initialProgress,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActivityAt: new Date(),
      };

      return NextResponse.json({ success: true, data: responseData });
    }

    const data = progressDoc.data();

    console.log('[Progress API] Raw Firestore data:', {
      totalCourses: data?.totalCourses,
      completedCourses: data?.completedCourses,
      enrolledCoursesCount: data?.enrolledCourses?.length
    });

    // Convert Firestore timestamps to dates for JSON serialization
    const serializedData = {
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
      updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
      lastActivityAt: data?.lastActivityAt?.toDate?.() || data?.lastActivityAt,
      enrolledCourses: data?.enrolledCourses?.map((course: any) => ({
        ...course,
        enrolledAt: course.enrolledAt?.toDate?.() || course.enrolledAt,
        lastAccessedAt: course.lastAccessedAt?.toDate?.() || course.lastAccessedAt,
        completedAt: course.completedAt?.toDate?.() || course.completedAt,
      })) || [],
    };

    console.log('[Progress API] Serialized data:', {
      totalCourses: serializedData.totalCourses,
      enrolledCoursesCount: serializedData.enrolledCourses?.length
    });

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: any) {
    console.error('[Progress API] Error:', error);

    // Handle specific Firebase Auth errors
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { success: false, error: 'Token expired - please login again' },
        { status: 401 }
      );
    }

    if (error.code === 'auth/argument-error') {
      return NextResponse.json(
        { success: false, error: 'Invalid token format' },
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
 * PATCH /api/users/[userId]/progress
 *
 * Updates the user's learning progress
 *
 * @requires Authentication via Bearer token
 * @body Partial<UserProgress> - Fields to update
 * @returns Updated UserProgress data
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);

    // Verify user is updating their own data
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Whitelist of allowed fields to update
    const allowedFields = [
      'totalCourses',
      'completedCourses',
      'totalLearningTime',
      'currentStreak',
      'longestStreak',
      'lastStreakDate',
      'enrolledCourses',
    ];

    // Filter body to only allowed fields
    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    // Always update timestamps
    updates.updatedAt = FieldValue.serverTimestamp();
    updates.lastActivityAt = FieldValue.serverTimestamp();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    // Update progress document
    const progressRef = db.collection('userProgress').doc(userId);
    await progressRef.update(updates);

    // Fetch updated document
    const updatedDoc = await progressRef.get();
    const data = updatedDoc.data();

    // Serialize timestamps
    const serializedData = {
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
      updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
      lastActivityAt: data?.lastActivityAt?.toDate?.() || data?.lastActivityAt,
      enrolledCourses: data?.enrolledCourses?.map((course: any) => ({
        ...course,
        enrolledAt: course.enrolledAt?.toDate?.() || course.enrolledAt,
        lastAccessedAt: course.lastAccessedAt?.toDate?.() || course.lastAccessedAt,
        completedAt: course.completedAt?.toDate?.() || course.completedAt,
      })) || [],
    };

    return NextResponse.json({ success: true, data: serializedData });
  } catch (error: any) {
    console.error('[Progress API] Update error:', error);

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