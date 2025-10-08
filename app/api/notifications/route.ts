import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';
import { Notification, NotificationType, NotificationPriority } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/**
 * GET /api/notifications?unreadOnly={boolean}&limit={number}
 *
 * Fetches user's notifications
 *
 * @requires Authentication via Bearer token
 * @query unreadOnly - Only fetch unread notifications (default: false)
 * @query limit - Number of notifications to fetch (default: 50)
 * @returns Array of notifications and unread count
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
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .orderBy('createdAt', 'desc')
      .limit(limit);

    if (unreadOnly) {
      query = db
        .collection('notifications')
        .doc(userId)
        .collection('items')
        .where('read', '==', false)
        .orderBy('createdAt', 'desc')
        .limit(limit) as any;
    }

    const notificationsSnapshot = await query.get();

    const notifications = notificationsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        readAt: data.readAt?.toDate?.() || data.readAt,
        expiresAt: data.expiresAt?.toDate?.() || data.expiresAt,
      };
    });

    // Calculate unread count (always, even if unreadOnly is true)
    const unreadSnapshot = await db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .where('read', '==', false)
      .get();

    const unreadCount = unreadSnapshot.size;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      total: notifications.length,
    });
  } catch (error: any) {
    console.error('[Notifications API] Fetch error:', error);

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
 * PATCH /api/notifications
 *
 * Marks a notification as read
 *
 * @requires Authentication via Bearer token
 * @body { notificationId: string }
 * @returns Success status
 */
export async function PATCH(request: NextRequest) {
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
    const { notificationId } = body;

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: 'Missing notificationId' },
        { status: 400 }
      );
    }

    // Update notification
    const notificationRef = db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .doc(notificationId);

    const notificationDoc = await notificationRef.get();

    if (!notificationDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Notification not found' },
        { status: 404 }
      );
    }

    await notificationRef.update({
      read: true,
      readAt: FieldValue.serverTimestamp(),
    });

    console.log(`[Notifications API] Marked notification ${notificationId} as read for user ${userId}`);

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error: any) {
    console.error('[Notifications API] Update error:', error);

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
 * POST /api/notifications
 *
 * Creates a new notification (admin/system use only in production)
 * For development/testing purposes
 *
 * @requires Authentication via Bearer token
 * @body { type, title, message, actionUrl?, priority? }
 * @returns Created notification ID
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
    const { type, title, message, actionUrl, actionText, priority, metadata } = body;

    // Validate required fields
    if (!type || !title || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, title, message' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes: NotificationType[] = [
      'consultation_reminder',
      'new_module',
      'achievement',
      'system',
      'instructor_message',
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Create notification
    const notificationRef = db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .doc();

    const notification: any = {
      notificationId: notificationRef.id,
      userId,
      type,
      title,
      message,
      actionUrl: actionUrl || null,
      actionText: actionText || null,
      priority: priority || 'medium',
      read: false,
      metadata: metadata || {},
      createdAt: FieldValue.serverTimestamp(),
    };

    await notificationRef.set(notification);

    console.log(`[Notifications API] Created ${type} notification for user ${userId}`);

    return NextResponse.json({
      success: true,
      notificationId: notificationRef.id,
      message: 'Notification created successfully',
    });
  } catch (error: any) {
    console.error('[Notifications API] Create error:', error);

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
 * DELETE /api/notifications?notificationId={id}
 *
 * Deletes a notification
 *
 * @requires Authentication via Bearer token
 * @query notificationId - ID of notification to delete
 * @returns Success status
 */
export async function DELETE(request: NextRequest) {
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
    const notificationId = searchParams.get('notificationId');

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: 'Missing notificationId parameter' },
        { status: 400 }
      );
    }

    // Delete notification
    await db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .doc(notificationId)
      .delete();

    console.log(`[Notifications API] Deleted notification ${notificationId} for user ${userId}`);

    return NextResponse.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error: any) {
    console.error('[Notifications API] Delete error:', error);

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
