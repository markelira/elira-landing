import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { logger } from './logger';

const STATS_DOC_ID = 'global';

export interface SiteStats {
  totalLeads: number;
  totalDownloads: number;
  vipSpotsRemaining: number;
  communityMembers: number;
  lastUpdated: any;
}

// Initialize stats document if it doesn't exist
export const initializeStats = async () => {
  try {
    if (!db) return; // Skip if Firebase not configured
    
    const statsRef = doc(db, 'stats', STATS_DOC_ID);
    const statsSnap = await getDoc(statsRef);
    
    if (!statsSnap.exists()) {
      await setDoc(statsRef, {
        totalLeads: 0,
        totalDownloads: 0,
        vipSpotsRemaining: 100,
        communityMembers: 47,
        lastUpdated: new Date()
      });
    }
  } catch (error) {
    logger.error('Error initializing stats:', error);
  }
};

// Get current stats
export const getStats = async (): Promise<SiteStats | null> => {
  try {
    if (!db) {
      // Return demo stats if Firebase is not configured
      return { 
        totalLeads: 0, 
        totalDownloads: 0,
        vipSpotsRemaining: 100,
        communityMembers: 47,
        lastUpdated: new Date() 
      };
    }
    
    const statsRef = doc(db, 'stats', STATS_DOC_ID);
    const statsSnap = await getDoc(statsRef);
    
    if (statsSnap.exists()) {
      return statsSnap.data() as SiteStats;
    }
    
    // Initialize if doesn't exist
    await initializeStats();
    return { 
      totalLeads: 0, 
      totalDownloads: 0,
      vipSpotsRemaining: 100,
      communityMembers: 47,
      lastUpdated: new Date() 
    };
  } catch (error) {
    logger.error('Error getting stats:', error);
    // Return demo stats on error
    return { 
      totalLeads: 0, 
      totalDownloads: 0,
      vipSpotsRemaining: 100,
      communityMembers: 47,
      lastUpdated: new Date() 
    };
  }
};

// Increment lead count
export const incrementLeadCount = async () => {
  try {
    if (!db) {
      logger.log('Firebase not configured - skipping stats increment');
      return; // Skip if Firebase not configured
    }
    
    const statsRef = doc(db, 'stats', STATS_DOC_ID);
    await updateDoc(statsRef, {
      totalLeads: increment(1),
      lastUpdated: new Date()
    });
  } catch (error) {
    logger.error('Error incrementing lead count:', error);
    // Fallback - try to initialize and then increment
    try {
      if (!db) return;
      await initializeStats();
      const statsRef = doc(db, 'stats', STATS_DOC_ID);
      await updateDoc(statsRef, {
        totalLeads: increment(1),
        lastUpdated: new Date()
      });
    } catch (fallbackError) {
      logger.error('Fallback error:', fallbackError);
    }
  }
};

// Real-time stats listener
export const subscribeToStats = (callback: (stats: SiteStats) => void) => {
  if (!db) {
    // Return demo stats immediately if Firebase not configured
    callback({ 
      totalLeads: 0, 
      totalDownloads: 0,
      vipSpotsRemaining: 100,
      communityMembers: 47,
      lastUpdated: new Date() 
    });
    return () => {}; // Return empty unsubscribe function
  }
  
  const statsRef = doc(db, 'stats', STATS_DOC_ID);
  
  return onSnapshot(
    statsRef,
    (doc) => {
      if (doc.exists()) {
        callback(doc.data() as SiteStats);
      } else {
        // Initialize if doesn't exist
        initializeStats().then(() => {
          callback({ 
            totalLeads: 0, 
            totalDownloads: 0,
            vipSpotsRemaining: 100,
            communityMembers: 47,
            lastUpdated: new Date() 
          });
        });
      }
    },
    (error) => {
      logger.error('Stats listener error:', error);
      // Fallback to default stats
      callback({ 
        totalLeads: 0, 
        totalDownloads: 0,
        vipSpotsRemaining: 100,
        communityMembers: 47,
        lastUpdated: new Date() 
      });
    }
  );
};