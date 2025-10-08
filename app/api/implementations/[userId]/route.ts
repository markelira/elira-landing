import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { Implementation } from '@/types/database';

export const dynamic = 'force-dynamic';

/**
 * GET /api/implementations/[userId]
 *
 * Fetches user's implementation tracking data
 *
 * @requires Authentication via Bearer token
 * @returns Implementation data (initializes if doesn't exist)
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

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

    // Verify user is requesting their own data
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const implDoc = await db.collection('implementations').doc(userId).get();

    if (!implDoc.exists) {
      // Initialize implementation tracking
      const startDate = new Date().toISOString().split('T')[0];

      const initialImpl: any = {
        userId,
        courseId: 'ai-copywriting-course',
        programStartDate: startDate,
        currentDay: 1,
        milestones: [],
        deliverables: {
          marketResearchCompleted: false,
          buyerPersonasCreated: 0,
          campaignsLaunched: 0,
          abTestsRunning: 0,
        },
        implementationProgress: 0,
        updatedAt: new Date(),
      };

      await db.collection('implementations').doc(userId).set(initialImpl);

      return NextResponse.json({ success: true, implementation: initialImpl });
    }

    const implementation = implDoc.data();

    // Calculate current day based on start date
    const startDate = new Date(implementation.programStartDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentDay = Math.min(Math.max(daysDiff + 1, 1), 30);

    // Update current day if changed
    if (implementation.currentDay !== currentDay) {
      await db.collection('implementations').doc(userId).update({
        currentDay,
        updatedAt: new Date(),
      });
      implementation.currentDay = currentDay;
    }

    // Serialize timestamps
    const serializedImpl = {
      ...implementation,
      updatedAt: implementation.updatedAt?.toDate?.() || implementation.updatedAt,
      deliverables: {
        ...implementation.deliverables,
        marketResearchCompletedAt: implementation.deliverables?.marketResearchCompletedAt?.toDate?.() || implementation.deliverables?.marketResearchCompletedAt,
      },
    };

    return NextResponse.json({ success: true, implementation: serializedImpl });
  } catch (error: any) {
    console.error('[Implementations API] Error:', error);

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
 * PATCH /api/implementations/[userId]
 *
 * Updates user's implementation data
 *
 * @requires Authentication via Bearer token
 * @body Partial<Implementation> - Fields to update
 * @returns Updated implementation data
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

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

    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Whitelist of allowed fields
    const allowedFields = [
      'milestones',
      'deliverables',
      'implementationProgress',
    ];

    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    updates.updatedAt = new Date();

    await db.collection('implementations').doc(userId).update(updates);

    // Fetch updated document
    const updatedDoc = await db.collection('implementations').doc(userId).get();
    const data = updatedDoc.data();

    return NextResponse.json({
      success: true,
      implementation: {
        ...data,
        updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('[Implementations API] Update error:', error);

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
