import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/debug/firestore
 *
 * Debug endpoint to test Firestore connection and data
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[Debug] Testing Firestore connection...');

    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Firestore database not initialized',
        envVars: {
          hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
          hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
          hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
          privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
        }
      }, { status: 500 });
    }

    // Test query - get all users (limit 5)
    const usersSnapshot = await db.collection('users').limit(5).get();
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email,
      hasEnrolledCourses: !!doc.data().enrolledCourses,
      hasCourseAccess: !!doc.data().courseAccess,
    }));

    // Test specific user: mark@elira.hu
    const markUserId = 'g0Vv742sKuclSHmpsP1sCklxit53';
    const markUserDoc = await db.collection('users').doc(markUserId).get();
    const markEnrollmentDoc = await db.collection('enrollments').doc(`${markUserId}_ai-copywriting-course`).get();
    const markProgressDoc = await db.collection('userProgress').doc(markUserId).get();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      firestore: {
        connected: true,
        usersCount: usersSnapshot.size,
        sampleUsers: users,
      },
      markUser: {
        exists: markUserDoc.exists,
        email: markUserDoc.data()?.email,
        courseAccess: markUserDoc.data()?.courseAccess,
        enrolledCourses: markUserDoc.data()?.enrolledCourses,
      },
      markEnrollment: {
        exists: markEnrollmentDoc.exists,
        courseId: markEnrollmentDoc.data()?.courseId,
        status: markEnrollmentDoc.data()?.status,
        progress: markEnrollmentDoc.data()?.progress,
      },
      markProgress: {
        exists: markProgressDoc.exists,
        totalCourses: markProgressDoc.data()?.totalCourses,
        enrolledCoursesCount: markProgressDoc.data()?.enrolledCourses?.length || 0,
      }
    });

  } catch (error: any) {
    console.error('[Debug] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 3),
    }, { status: 500 });
  }
}
