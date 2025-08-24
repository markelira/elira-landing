import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Get Firestore instance
const db = admin.firestore();

export const initStats = async (req: Request, res: Response) => {
  try {
    console.log('🚀 Initializing Firestore stats...');

    // Initialize stats document with admin permissions
    const statsRef = db.doc('stats/downloads');
    await statsRef.set({
      totalLeads: 0,
      totalDownloads: 0,
      vipSpotsRemaining: 150,
      communityMembers: 0,
      activeNow: 0,
      messagesToday: 0,
      questionsAnswered: 0,
      newMembersToday: 0,
      vipSlotsLeft: 150,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    // Add some sample activities
    const activitiesRef = db.collection('activities');
    
    const sampleActivities = [
      {
        user: 'János K.',
        action: 'letöltötte a ChatGPT Prompt Gyűjteményt',
        type: 'success',
        platform: 'discord',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        user: 'Anna M.',
        action: 'letöltötte az Email Marketing Sablonokat', 
        type: 'success',
        platform: 'discord',
        createdAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 1000))
      },
      {
        user: 'Péter G.',
        action: 'letöltötte a LinkedIn Növekedési Naptárt',
        type: 'success', 
        platform: 'discord',
        createdAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() - 10 * 60 * 1000))
      }
    ];

    for (const activity of sampleActivities) {
      await activitiesRef.add(activity);
    }

    // Update stats with activity counts
    await statsRef.update({
      totalLeads: 3,
      totalDownloads: 3,
      communityMembers: 3,
      newMembersToday: 3
    });

    console.log('✅ Firestore initialization complete!');

    res.json({
      success: true,
      message: 'Stats initialized successfully',
      data: {
        statsCreated: true,
        activitiesCreated: 3,
        initialCounts: {
          totalDownloads: 3,
          totalLeads: 3
        }
      }
    });

  } catch (error) {
    console.error('❌ Error initializing stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize stats'
    });
  }
};