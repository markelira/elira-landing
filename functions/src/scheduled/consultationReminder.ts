/**
 * Consultation Reminder Cloud Function
 *
 * Scheduled to run every hour to check for upcoming consultations
 * and send reminder notifications 24 hours before scheduled time.
 *
 * Schedule: Every 1 hour
 * Purpose: Send high-priority reminder notifications to users
 */

import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface Consultation {
  consultationId: string;
  userId: string;
  courseId: string;
  instructorName: string;
  scheduledAt: admin.firestore.Timestamp;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  remindersSent: {
    '24h': boolean;
    '1h': boolean;
  };
}

/**
 * Check for consultations scheduled in the next 24-25 hours
 * and send reminder notifications if not already sent
 */
export const consultationReminder = onSchedule(
  {
    schedule: 'every 1 hours',
    timeZone: 'Europe/Budapest',
    region: 'europe-west1',
  },
  async (event) => {
    console.log('[Consultation Reminder] Starting scheduled check');

    const now = admin.firestore.Timestamp.now();
    const nowMillis = now.toMillis();

    // Check for consultations scheduled between 23-25 hours from now
    const reminderWindowStart = admin.firestore.Timestamp.fromMillis(
      nowMillis + 23 * 60 * 60 * 1000 // 23 hours from now
    );
    const reminderWindowEnd = admin.firestore.Timestamp.fromMillis(
      nowMillis + 25 * 60 * 60 * 1000 // 25 hours from now
    );

    try {
      // Query consultations in reminder window
      const consultationsSnapshot = await db
        .collection('consultations')
        .where('status', '==', 'scheduled')
        .where('scheduledAt', '>=', reminderWindowStart)
        .where('scheduledAt', '<=', reminderWindowEnd)
        .get();

      console.log(`[Consultation Reminder] Found ${consultationsSnapshot.size} consultations in reminder window`);

      if (consultationsSnapshot.empty) {
        console.log('[Consultation Reminder] No consultations found');
        return;
      }

      const batch = db.batch();
      let remindersCreated = 0;

      for (const doc of consultationsSnapshot.docs) {
        const consultation = doc.data() as Consultation;

        // Skip if 24h reminder already sent
        if (consultation.remindersSent?.['24h']) {
          console.log(`[Consultation Reminder] Skipping ${consultation.consultationId} - reminder already sent`);
          continue;
        }

        // Create notification for user
        const notificationRef = db
          .collection('notifications')
          .doc(consultation.userId)
          .collection('items')
          .doc();

        const scheduledDate = consultation.scheduledAt.toDate();
        const formattedDate = scheduledDate.toLocaleDateString('hu-HU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const formattedTime = scheduledDate.toLocaleTimeString('hu-HU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const notification = {
          notificationId: notificationRef.id,
          userId: consultation.userId,
          type: 'consultation_reminder',
          title: 'Holnap konzultáció!',
          message: `A ${consultation.instructorName || 'oktatóddal'} való konzultációd holnap, ${formattedDate} ${formattedTime}-kor kezdődik. Készülj fel a megbeszélt témákra!`,
          priority: 'high',
          read: false,
          actionUrl: '/dashboard',
          actionText: 'Részletek megtekintése',
          metadata: {
            consultationId: consultation.consultationId,
            scheduledAt: consultation.scheduledAt,
          },
          createdAt: now,
        };

        batch.set(notificationRef, notification);

        // Update consultation to mark reminder as sent
        const consultationRef = db.collection('consultations').doc(doc.id);
        batch.update(consultationRef, {
          'remindersSent.24h': true,
        });

        remindersCreated++;
        console.log(`[Consultation Reminder] Created reminder for user ${consultation.userId}, consultation ${consultation.consultationId}`);
      }

      // Commit all changes
      if (remindersCreated > 0) {
        await batch.commit();
        console.log(`[Consultation Reminder] Successfully created ${remindersCreated} reminder notifications`);
      } else {
        console.log('[Consultation Reminder] No new reminders to create');
      }

      console.log(`[Consultation Reminder] Completed: ${remindersCreated} reminders created, ${consultationsSnapshot.size} consultations checked`);
    } catch (error) {
      console.error('[Consultation Reminder] Error:', error);
      throw error;
    }
  });

/**
 * 1-hour consultation reminder
 * Sends a notification 1 hour before consultation starts
 */
export const consultationReminderOneHour = onSchedule(
  {
    schedule: 'every 15 minutes',
    timeZone: 'Europe/Budapest',
    region: 'europe-west1',
  },
  async (event) => {
    console.log('[1h Consultation Reminder] Starting scheduled check');

    const now = admin.firestore.Timestamp.now();
    const nowMillis = now.toMillis();

    // Check for consultations scheduled between 50-70 minutes from now
    const reminderWindowStart = admin.firestore.Timestamp.fromMillis(
      nowMillis + 50 * 60 * 1000 // 50 minutes from now
    );
    const reminderWindowEnd = admin.firestore.Timestamp.fromMillis(
      nowMillis + 70 * 60 * 1000 // 70 minutes from now
    );

    try {
      const consultationsSnapshot = await db
        .collection('consultations')
        .where('status', '==', 'scheduled')
        .where('scheduledAt', '>=', reminderWindowStart)
        .where('scheduledAt', '<=', reminderWindowEnd)
        .get();

      console.log(`[1h Consultation Reminder] Found ${consultationsSnapshot.size} consultations in reminder window`);

      if (consultationsSnapshot.empty) {
        console.log('[1h Consultation Reminder] No consultations found');
        return;
      }

      const batch = db.batch();
      let remindersCreated = 0;

      for (const doc of consultationsSnapshot.docs) {
        const consultation = doc.data() as Consultation;

        // Skip if 1h reminder already sent
        if (consultation.remindersSent?.['1h']) {
          console.log(`[1h Consultation Reminder] Skipping ${consultation.consultationId} - reminder already sent`);
          continue;
        }

        // Create notification
        const notificationRef = db
          .collection('notifications')
          .doc(consultation.userId)
          .collection('items')
          .doc();

        const scheduledDate = consultation.scheduledAt.toDate();
        const formattedTime = scheduledDate.toLocaleTimeString('hu-HU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const notification = {
          notificationId: notificationRef.id,
          userId: consultation.userId,
          type: 'consultation_reminder',
          title: 'Konzultáció 1 órán belül!',
          message: `A ${consultation.instructorName || 'oktatóddal'} való konzultációd ${formattedTime}-kor kezdődik. ${consultation.meetingLink ? 'Csatlakozz a meeting linkhez!' : 'Készülj fel!'}`,
          priority: 'high',
          read: false,
          actionUrl: consultation.meetingLink || '/dashboard',
          actionText: consultation.meetingLink ? 'Csatlakozás' : 'Részletek',
          metadata: {
            consultationId: consultation.consultationId,
            scheduledAt: consultation.scheduledAt,
            meetingLink: consultation.meetingLink,
          },
          createdAt: now,
        };

        batch.set(notificationRef, notification);

        // Update consultation
        const consultationRef = db.collection('consultations').doc(doc.id);
        batch.update(consultationRef, {
          'remindersSent.1h': true,
        });

        remindersCreated++;
        console.log(`[1h Consultation Reminder] Created reminder for user ${consultation.userId}`);
      }

      if (remindersCreated > 0) {
        await batch.commit();
        console.log(`[1h Consultation Reminder] Successfully created ${remindersCreated} reminders`);
      }

      console.log(`[1h Consultation Reminder] Completed: ${remindersCreated} reminders created, ${consultationsSnapshot.size} consultations checked`);
    } catch (error) {
      console.error('[1h Consultation Reminder] Error:', error);
      throw error;
    }
  });
