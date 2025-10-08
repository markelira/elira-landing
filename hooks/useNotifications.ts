import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Notification } from '@/types/database';

/**
 * Real-time hook for user notifications
 *
 * Subscribes to notifications subcollection and updates in real-time
 *
 * @param unreadOnly - Only fetch unread notifications (default: false)
 * @param limitCount - Number of notifications to fetch (default: 50)
 * @returns {notifications, unreadCount, isLoading, markAsRead}
 */
export function useNotifications(unreadOnly = false, limitCount = 50) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Build query
    let q = query(
      collection(db, 'notifications', user.uid, 'items'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (unreadOnly) {
      q = query(
        collection(db, 'notifications', user.uid, 'items'),
        where('read', '==', false),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            readAt: data.readAt?.toDate?.() || data.readAt,
            expiresAt: data.expiresAt?.toDate?.() || data.expiresAt,
          } as Notification;
        });

        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
        setIsLoading(false);
      },
      (error) => {
        console.error('[useNotifications] Error:', error);
        setIsLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [user, unreadOnly, limitCount]);

  /**
   * Marks a notification as read
   */
  const markAsRead = async (notificationId: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        console.error('[useNotifications] No auth token available');
        return;
      }

      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[useNotifications] Failed to mark as read:', errorData);
      }
    } catch (error) {
      console.error('[useNotifications] Error marking notification as read:', error);
    }
  };

  /**
   * Marks all notifications as read
   */
  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);

    for (const notification of unreadNotifications) {
      await markAsRead(notification.id);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  };
}
