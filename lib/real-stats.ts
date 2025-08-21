import { db } from './firebase';
import { doc, onSnapshot, updateDoc, increment, collection, query, where, getDocs } from 'firebase/firestore';
import { logger } from './logger';

// Track REAL page views
export const trackPageView = async () => {
  const today = new Date().toDateString();
  await updateDoc(doc(db, 'stats', 'daily', today), {
    pageViews: increment(1),
    timestamp: new Date()
  });
};

// Get REAL active users (based on last 5 minutes activity)
export const getActiveUsers = async () => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  // Query activities from last 5 minutes
  const q = query(
    collection(db, 'activities'),
    where('createdAt', '>=', fiveMinutesAgo)
  );
  
  const snapshot = await getDocs(q);
  const uniqueUsers = new Set();
  
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.user) {
      uniqueUsers.add(data.user);
    }
  });
  
  return uniqueUsers.size;
};

// Track REAL form views (not submissions)
export const trackFormView = async (magnetId: string) => {
  await updateDoc(doc(db, 'stats', 'magnets', magnetId), {
    views: increment(1),
    lastViewed: new Date()
  });
};

// Track REAL form completion
export const trackFormCompletion = async (magnetId: string) => {
  await updateDoc(doc(db, 'stats', 'magnets', magnetId), {
    completions: increment(1),
    lastCompleted: new Date()
  });
};

// Get REAL community metrics
export const getRealCommunityMetrics = async () => {
  try {
    // Get total leads
    const leadsSnapshot = await getDocs(collection(db, 'leads'));
    const totalMembers = leadsSnapshot.size;
    
    // Get active users
    const activeNow = await getActiveUsers();
    
    // Get today's activities
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activitiesQuery = query(
      collection(db, 'activities'),
      where('createdAt', '>=', today)
    );
    
    const activitiesSnapshot = await getDocs(activitiesQuery);
    const messagesToday = activitiesSnapshot.size;
    
    // Count questions answered
    let questionsAnswered = 0;
    activitiesSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.type === 'answer' || data.action?.includes('válaszolt')) {
        questionsAnswered++;
      }
    });
    
    return {
      totalMembers,
      activeNow,
      messagesToday,
      questionsAnswered
    };
  } catch (error) {
    logger.error('Error getting real community metrics:', error);
    return {
      totalMembers: 0,
      activeNow: 0,
      messagesToday: 0,
      questionsAnswered: 0
    };
  }
};