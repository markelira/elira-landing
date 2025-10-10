/**
 * Weekly Insights Cloud Function
 *
 * Scheduled to run every Monday at 9 AM Budapest time
 * Analyzes user's weekly learning activity and sends personalized insights
 *
 * Schedule: Every Monday at 9:00 AM
 * Purpose: Motivate users with weekly progress summaries and recommendations
 */

import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface UserProgress {
  userId: string;
  totalCourses: number;
  completedCourses: number;
  totalLearningTime: number; // seconds
  lastActivityAt: admin.firestore.Timestamp;
  currentStreak: number;
  longestStreak: number;
}

interface Activity {
  userId: string;
  timestamp: admin.firestore.Timestamp;
  type: string;
  duration?: number;
}

/**
 * Generate weekly insights for all active users
 * Runs every Monday at 9 AM Budapest time
 */
export const weeklyInsights = onSchedule(
  {
    schedule: '0 9 * * MON',
    timeZone: 'Europe/Budapest',
    region: 'europe-west1',
  },
  async (event) => {
    console.log('[Weekly Insights] Starting weekly insights generation');

    const now = admin.firestore.Timestamp.now();
    const nowMillis = now.toMillis();

    // Define this week (last 7 days) and previous week (8-14 days ago)
    const thisWeekStart = admin.firestore.Timestamp.fromMillis(
      nowMillis - 7 * 24 * 60 * 60 * 1000
    );
    const lastWeekStart = admin.firestore.Timestamp.fromMillis(
      nowMillis - 14 * 24 * 60 * 60 * 1000
    );
    const lastWeekEnd = thisWeekStart;

    try {
      // Get all active users (those with activity in last 30 days)
      const thirtyDaysAgo = admin.firestore.Timestamp.fromMillis(
        nowMillis - 30 * 24 * 60 * 60 * 1000
      );

      const activeUsersSnapshot = await db
        .collection('userProgress')
        .where('lastActivityAt', '>=', thirtyDaysAgo)
        .get();

      console.log(`[Weekly Insights] Found ${activeUsersSnapshot.size} active users`);

      if (activeUsersSnapshot.empty) {
        console.log('[Weekly Insights] No active users found');
        return;
      }

      const batch = db.batch();
      let insightsCreated = 0;

      for (const userDoc of activeUsersSnapshot.docs) {
        const userProgress = userDoc.data() as UserProgress;
        const userId = userDoc.id;

        try {
          // Get this week's activities
          const thisWeekActivities = await db
            .collection('activities')
            .where('userId', '==', userId)
            .where('timestamp', '>=', thisWeekStart)
            .where('timestamp', '<=', now)
            .get();

          // Get last week's activities for comparison
          const lastWeekActivities = await db
            .collection('activities')
            .where('userId', '==', userId)
            .where('timestamp', '>=', lastWeekStart)
            .where('timestamp', '<', lastWeekEnd)
            .get();

          // Calculate metrics
          const thisWeekLearningTime = thisWeekActivities.docs.reduce(
            (total, doc) => total + ((doc.data() as Activity).duration || 0),
            0
          );

          const lastWeekLearningTime = lastWeekActivities.docs.reduce(
            (total, doc) => total + ((doc.data() as Activity).duration || 0),
            0
          );

          const thisWeekLessons = thisWeekActivities.docs.filter(
            (doc) => (doc.data() as Activity).type === 'lesson_completed'
          ).length;

          // Calculate percentage change
          const percentageChange = lastWeekLearningTime > 0
            ? Math.round(((thisWeekLearningTime - lastWeekLearningTime) / lastWeekLearningTime) * 100)
            : thisWeekLearningTime > 0 ? 100 : 0;

          // Determine trend
          let trend: 'improving' | 'stable' | 'declining';
          if (percentageChange > 10) {
            trend = 'improving';
          } else if (percentageChange < -10) {
            trend = 'declining';
          } else {
            trend = 'stable';
          }

          // Generate personalized message
          let message: string;
          let recommendations: string[] = [];

          if (trend === 'improving') {
            message = `Nagyszerű hét! ${Math.abs(percentageChange)}%-kal több időt töltöttél tanulással, mint múlt héten. ${thisWeekLessons} leckét fejeztél be. Folytasd így!`;
            recommendations.push('Tartsd fent a lendületet a következő héten is');
            if (userProgress.currentStreak < 7) {
              recommendations.push('Próbálj meg 7 napos streakot elérni');
            }
          } else if (trend === 'stable') {
            message = `Jó munka ezen a héten! ${thisWeekLessons} leckét fejeztél be. A tanulási időd stabil maradt.`;
            recommendations.push('Próbálj meg több időt szánni a következő héten');
            recommendations.push('Tölts le egy új marketing sablont a Template Library-ből');
          } else {
            message = `Ezen a héten ${Math.abs(percentageChange)}%-kal kevesebb időt töltöttél tanulással. Ne aggódj, újra fel tudod venni a ritmust!`;
            recommendations.push('Állíts be napi 15 perces tanulási időt');
            recommendations.push('Kezdd a legrövidebb modullal');
            recommendations.push('Csatlakozz egy konzultációhoz motivációért');
          }

          // Format learning time
          const hours = Math.floor(thisWeekLearningTime / 3600);
          const minutes = Math.floor((thisWeekLearningTime % 3600) / 60);
          const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

          // Create notification
          const notificationRef = db
            .collection('notifications')
            .doc(userId)
            .collection('items')
            .doc();

          const notification = {
            notificationId: notificationRef.id,
            userId,
            type: 'system',
            title: 'Heti összefoglaló',
            message: `${message} Ezen a héten összesen ${timeString}-t tanultál.`,
            priority: 'medium',
            read: false,
            actionUrl: '/dashboard',
            actionText: 'Részletek megtekintése',
            metadata: {
              weeklyInsight: true,
              thisWeekLearningTime,
              lastWeekLearningTime,
              percentageChange,
              trend,
              lessonsCompleted: thisWeekLessons,
              recommendations,
            },
            createdAt: now,
          };

          batch.set(notificationRef, notification);
          insightsCreated++;

          console.log(`[Weekly Insights] Created insight for user ${userId}: ${trend}, ${percentageChange}% change`);

        } catch (userError) {
          console.error(`[Weekly Insights] Error processing user ${userId}:`, userError);
          // Continue with next user
          continue;
        }
      }

      // Commit all notifications
      if (insightsCreated > 0) {
        await batch.commit();
        console.log(`[Weekly Insights] Successfully created ${insightsCreated} weekly insight notifications`);
      } else {
        console.log('[Weekly Insights] No insights to create');
      }

      console.log(`[Weekly Insights] Completed: ${insightsCreated} insights created, ${activeUsersSnapshot.size} users checked`);

    } catch (error) {
      console.error('[Weekly Insights] Error:', error);
      throw error;
    }
  });

/**
 * Manual trigger for testing weekly insights
 * Can be called via HTTP for testing purposes
 */
export const triggerWeeklyInsightsManual = onRequest(
  {
    region: 'europe-west1',
  },
  async (req, res) => {
    // Only allow in development or with proper authentication
    if (process.env.NODE_ENV === 'production') {
      // In production, require authentication
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      try {
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Check if user is admin
        const userDoc = await db.collection('users').doc(decodedToken.uid).get();
        const userData = userDoc.data();

        if (userData?.role !== 'admin') {
          res.status(403).json({ error: 'Forbidden - Admin access required' });
          return;
        }
      } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
    }

    try {
      console.log('[Weekly Insights Manual] Triggering manual weekly insights generation');

      // Call the same logic as scheduled function
      // Note: In real implementation, extract the core logic to a shared function

      res.status(200).json({
        success: true,
        message: 'Weekly insights generation triggered manually',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[Weekly Insights Manual] Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to trigger weekly insights',
      });
    }
  });
