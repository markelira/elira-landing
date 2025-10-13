import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { Consultation, ConsultationStatus, MeetingPlatform } from '@/types/database';
import { FieldValue, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/**
 * GET /api/consultations?status={status}&limit={limit}
 *
 * Fetches user's consultations
 *
 * @requires Authentication via Bearer token
 * @query status - Filter by status (optional)
 * @query limit - Number of consultations to fetch (default: 10)
 * @returns Array of consultations
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
    const userId = decodedToken.uid;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    let query = db
      .collection('consultations')
      .where('userId', '==', userId)
      .orderBy('scheduledAt', 'desc')
      .limit(limit);

    if (status) {
      query = db
        .collection('consultations')
        .where('userId', '==', userId)
        .where('status', '==', status)
        .orderBy('scheduledAt', 'desc')
        .limit(limit) as any;
    }

    const consultationsSnapshot = await query.get();

    const consultations = consultationsSnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        scheduledAt: data.scheduledAt?.toDate?.() || data.scheduledAt,
        attendedAt: data.attendedAt?.toDate?.() || data.attendedAt,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        prepTasks: data.prepTasks?.map((task: any) => ({
          ...task,
          completedAt: task.completedAt?.toDate?.() || task.completedAt,
        })) || [],
      };
    });

    return NextResponse.json({
      success: true,
      consultations,
      count: consultations.length,
    });
  } catch (error: any) {
    console.error('[Consultations API] Fetch error:', error);

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
 * POST /api/consultations
 *
 * Creates a new consultation
 *
 * @requires Authentication via Bearer token
 * @body { courseId, scheduledAt, instructorId?, meetingPlatform?, prepTasks? }
 * @returns Created consultation ID
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
    const {
      courseId,
      scheduledAt,
      instructorId,
      meetingPlatform,
      prepTasks,
      meetingLink,
    } = body;

    // Validate required fields
    if (!courseId || !scheduledAt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: courseId, scheduledAt' },
        { status: 400 }
      );
    }

    // Validate date
    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid scheduledAt date format' },
        { status: 400 }
      );
    }

    // Check if date is in the future
    if (scheduledDate < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Consultation must be scheduled for a future date' },
        { status: 400 }
      );
    }

    const consultationRef = db.collection('consultations').doc();

    // Default prep tasks for marketing masterclass
    const defaultPrepTasks = [
      { taskId: '1', title: 'Videók 1-3 megtekintése', completed: false },
      { taskId: '2', title: 'Sablon kitöltése', completed: false },
      { taskId: '3', title: 'Kérdések beküldése (24 órával előtte)', completed: false },
    ];

    const consultation: any = {
      consultationId: consultationRef.id,
      courseId,
      userId,
      instructorId: instructorId || 'default-instructor-id', // TODO: Get from course data
      scheduledAt: FieldValue.serverTimestamp(),
      duration: 60, // 60 minutes default
      status: 'scheduled' as ConsultationStatus,
      meetingLink: meetingLink || null,
      meetingPlatform: (meetingPlatform || 'zoom') as MeetingPlatform,
      prepTasks: prepTasks || defaultPrepTasks,
      attendanceStatus: null,
      remindersSent: {
        '24h': false,
        '1h': false,
      },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Override scheduledAt with the actual date
    consultation.scheduledAt = scheduledDate;

    await consultationRef.set(consultation);

    console.log(`[Consultations API] Created consultation ${consultationRef.id} for user ${userId}`);

    // Create notification for new consultation
    const notificationRef = db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .doc();

    await notificationRef.set({
      notificationId: notificationRef.id,
      userId,
      type: 'consultation_reminder',
      title: 'Új konzultáció ütemezve',
      message: `Konzultációd: ${scheduledDate.toLocaleDateString('hu-HU', {
        month: 'long',
        day: 'numeric',
      })} ${scheduledDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}`,
      actionUrl: `/dashboard/consultations/${consultationRef.id}`,
      actionText: 'Részletek megtekintése',
      priority: 'high',
      read: false,
      metadata: { consultationId: consultationRef.id },
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      consultationId: consultationRef.id,
      message: 'Consultation scheduled successfully',
    });
  } catch (error: any) {
    console.error('[Consultations API] Create error:', error);

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
