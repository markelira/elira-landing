import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/templates?category={category}
 *
 * Fetches available templates
 *
 * @requires Authentication via Bearer token
 * @query category - Filter by category (optional)
 * @returns Array of templates
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

    await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Build query
    let query = db.collection('templates').orderBy('category').orderBy('createdAt', 'desc');

    if (category) {
      query = db
        .collection('templates')
        .where('category', '==', category)
        .orderBy('createdAt', 'desc') as any;
    }

    const templatesSnapshot = await query.get();

    const templates = templatesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      templates,
      count: templates.length,
    });
  } catch (error: any) {
    console.error('[Templates API] Fetch error:', error);

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
