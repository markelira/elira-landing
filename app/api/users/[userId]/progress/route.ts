import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
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

    // Fetch ALL enrollments (don't filter by status - user might have access via other means)
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();

    console.log('[Progress API] All enrollments found:', enrollmentsSnapshot.size);

    // Get user document to check for additional course access sources
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    // Build set of accessible course IDs from multiple sources
    const accessibleCourseIds = new Set<string>();

    // Source 1: Enrollment documents
    enrollmentsSnapshot.docs.forEach(doc => {
      const enrollmentData = doc.data();
      accessibleCourseIds.add(enrollmentData.courseId);
    });

    // Source 2: User's enrolledCourses array
    if (userData?.enrolledCourses) {
      userData.enrolledCourses.forEach((courseId: string) => {
        accessibleCourseIds.add(courseId);
      });
    }

    // Source 3: Check for completed payments (grants access)
    const paymentsSnapshot = await db
      .collection('payments')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .get();

    paymentsSnapshot.docs.forEach(doc => {
      const paymentData = doc.data();
      if (paymentData.courseId) {
        accessibleCourseIds.add(paymentData.courseId);
      }
    });

    // Source 4: Legacy courseAccess for default course
    if (userData?.courseAccess === true) {
      accessibleCourseIds.add('ai-copywriting-course');
      accessibleCourseIds.add('default-course');
    }

    console.log('[Progress API] Accessible courses from all sources:', {
      totalAccessible: accessibleCourseIds.size,
      courseIds: Array.from(accessibleCourseIds),
      fromEnrollments: enrollmentsSnapshot.size,
      fromUserArray: userData?.enrolledCourses?.length || 0,
      fromPayments: paymentsSnapshot.size
    });

    // BUILD enrolled courses array - combine userProgress data with actual enrollments
    const enrolledCoursesMap = new Map();

    // Start with courses from userProgress (has detailed progress data)
    if (data?.enrolledCourses && Array.isArray(data.enrolledCourses)) {
      data.enrolledCourses.forEach((course: any) => {
        if (accessibleCourseIds.has(course.courseId)) {
          enrolledCoursesMap.set(course.courseId, course);
        }
      });
    }

    // Add courses from enrollment documents that aren't in userProgress yet
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      try {
        const enrollment = enrollmentDoc.data();
        const courseId = enrollment?.courseId;

        if (!courseId) {
          console.warn('[Progress API] Enrollment missing courseId:', enrollmentDoc.id);
          continue;
        }

        if (accessibleCourseIds.has(courseId) && !enrolledCoursesMap.has(courseId)) {
          // Fetch course details from courses collection
          let courseData = null;
          try {
            const courseDoc = await db.collection('courses').doc(courseId).get();
            courseData = courseDoc.exists ? courseDoc.data() : null;
          } catch (courseError) {
            console.error('[Progress API] Error fetching course:', courseId, courseError);
          }

          // Build course progress object from enrollment data
          enrolledCoursesMap.set(courseId, {
            courseId,
            courseTitle: enrollment.courseTitle || courseData?.title || 'Untitled Course',
            totalLessons: enrollment.totalLessons || courseData?.totalLessons || 0,
            completedLessons: enrollment.completedLessons?.length || 0,
            progressPercentage: enrollment.progress || 0,
            lastActivityAt: enrollment.lastAccessedAt || enrollment.enrolledAt,
            isCompleted: enrollment.certificateEarned || false,
            nextLessonId: null,
            nextLessonTitle: null
          });
        }
      } catch (enrollmentError) {
        console.error('[Progress API] Error processing enrollment:', enrollmentDoc.id, enrollmentError);
        // Continue processing other enrollments
        continue;
      }
    }

    const activeEnrolledCourses = Array.from(enrolledCoursesMap.values());

    console.log('[Progress API] Final enrolled courses:', {
      total: activeEnrolledCourses.length,
      courseIds: activeEnrolledCourses.map(c => c.courseId),
      courseTitles: activeEnrolledCourses.map(c => c.courseTitle)
    });

    // Convert Firestore timestamps to dates for JSON serialization
    const serializedData = {
      ...data,
      createdAt: data?.createdAt?.toDate?.() || data?.createdAt || null,
      updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt || null,
      lastActivityAt: data?.lastActivityAt?.toDate?.() || data?.lastActivityAt || null,
      enrolledCourses: activeEnrolledCourses.map((course) => ({
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        totalLessons: course.totalLessons || 0,
        completedLessons: course.completedLessons || 0,
        progressPercentage: course.progressPercentage || 0,
        lastActivityAt: course.lastActivityAt?.toDate?.() || course.lastActivityAt || null,
        isCompleted: course.isCompleted || false,
        nextLessonId: course.nextLessonId || null,
        nextLessonTitle: course.nextLessonTitle || null,
        enrolledAt: course.enrolledAt?.toDate?.() || course.enrolledAt || null,
        lastAccessedAt: course.lastAccessedAt?.toDate?.() || course.lastAccessedAt || null,
        completedAt: course.completedAt?.toDate?.() || course.completedAt || null,
      })),
      // Update counts to reflect only active enrollments
      totalCourses: activeEnrolledCourses.length,
    };

    console.log('[Progress API] Serialized data (activeonly):', {
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