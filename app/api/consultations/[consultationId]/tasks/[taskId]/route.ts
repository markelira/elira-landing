import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/consultations/[consultationId]/tasks/[taskId]
 *
 * Updates a consultation prep task (mark as complete/incomplete)
 *
 * @requires Authentication via Bearer token
 * @body { completed: boolean }
 * @returns Success status
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ consultationId: string; taskId: string }> }
) {
  try {
    const { consultationId, taskId } = await context.params;

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
    const { completed } = body;

    if (typeof completed !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'completed must be a boolean' },
        { status: 400 }
      );
    }

    // Get consultation
    const consultationRef = db.collection('consultations').doc(consultationId);
    const consultationDoc = await consultationRef.get();

    if (!consultationDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Consultation not found' },
        { status: 404 }
      );
    }

    const consultationData = consultationDoc.data();

    // Verify user owns this consultation
    if (consultationData?.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Cannot modify other user consultations' },
        { status: 403 }
      );
    }

    // Update task
    const updatedTasks = consultationData.prepTasks?.map((task: any) => {
      if (task.taskId === taskId) {
        return {
          ...task,
          completed,
          completedAt: completed ? new Date() : null,
        };
      }
      return task;
    }) || [];

    await consultationRef.update({
      prepTasks: updatedTasks,
      updatedAt: FieldValue.serverTimestamp(),
    });

    console.log(
      `[Consultation Task] Updated task ${taskId} to ${completed ? 'completed' : 'incomplete'} for consultation ${consultationId}`
    );

    return NextResponse.json({
      success: true,
      message: `Task ${completed ? 'completed' : 'uncompleted'} successfully`,
    });
  } catch (error: any) {
    console.error('[Consultation Task] Update error:', error);

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
