import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { UserProgress } from '../../../types/database';

/**
 * Cloud Function that initializes user progress when called
 * Note: This is an HTTP function that should be called after user creation
 *
 * TODO: Convert to auth trigger when firebase-functions is updated
 */
export const onUserCreate = onRequest(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ success: false, error: 'userId is required' });
    return;
  }

  const user = { uid: userId };
  const db = admin.firestore();

  console.log(`[onUserCreate] Initializing progress for user ${user.uid}`);

  try {
    const today = new Date().toISOString().split('T')[0];

    const initialProgress: Omit<UserProgress, 'createdAt' | 'updatedAt' | 'lastActivityAt'> & {
      createdAt: admin.firestore.FieldValue;
      updatedAt: admin.firestore.FieldValue;
      lastActivityAt: admin.firestore.FieldValue;
    } = {
      userId: user.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),

      // Learning Statistics
      totalCourses: 0,
      completedCourses: 0,
      totalLearningTime: 0,
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),

      // Streak Tracking
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: today,

      // Course-specific Progress
      enrolledCourses: [],
    };

    await db.collection('userProgress').doc(user.uid).set(initialProgress);

    console.log(`[onUserCreate] Successfully initialized progress for user ${user.uid}`);

    // Also create welcome notification
    const notificationRef = db
      .collection('notifications')
      .doc(user.uid)
      .collection('items')
      .doc();

    await notificationRef.set({
      notificationId: notificationRef.id,
      userId: user.uid,
      type: 'system',
      title: 'Üdvözlünk az Elira platformon!',
      message: 'Fedezd fel a masterclass programjainkat és kezdj el tanulni még ma.',
      actionUrl: '/courses',
      actionText: 'Programok megtekintése',
      priority: 'medium',
      read: false,
      metadata: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`[onUserCreate] Welcome notification created for user ${user.uid}`);

    res.json({
      success: true,
      userId: user.uid,
    });
  } catch (error) {
    console.error(`[onUserCreate] Error initializing user ${user.uid}:`, error);

    // Don't throw error - we don't want user creation to fail if progress init fails
    // The progress will be created lazily when they first access the dashboard
    res.status(500).json({
      success: false,
      userId: user.uid,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
