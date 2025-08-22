import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  increment,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { logger } from './logger';

// Types for our data structures
export interface Lead {
  id?: string;
  firstName: string;
  lastName: string;
  // Backward compatibility
  name?: string; // Will be deprecated
  email: string;
  job?: string;
  education?: string;
  phone?: string;
  selectedMagnets: string[];
  source?: string;
  downloadCount?: number; // How many PDFs this lead downloaded
  createdAt: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface Activity {
  id?: string;
  user: string;
  action: string;
  channel?: string;
  platform: 'discord';
  type: 'join' | 'message' | 'question' | 'success' | 'achievement';
  createdAt: any;
}

export interface Stats {
  totalLeads: number;
  totalDownloads: number;
  vipSpotsRemaining: number;
  communityMembers: number;
  activeNow?: number;
  messagesToday?: number;
  questionsAnswered?: number;
  newMembersToday?: number;
  vipSlotsLeft?: number;
  lastUpdated: any;
}

// Separate interface for update operations that can include FieldValue
export interface StatsUpdate {
  totalLeads?: number | any;
  totalDownloads?: number | any;
  vipSpotsRemaining?: number | any;
  communityMembers?: number | any;
  activeNow?: number | any;
  messagesToday?: number | any;
  questionsAnswered?: number | any;
  newMembersToday?: number | any;
  vipSlotsLeft?: number | any;
  lastUpdated?: any;
}

// Helper function to handle Firestore errors
const handleFirestoreError = (error: any, operation: string) => {
  logger.error(`Firestore ${operation} error:`, error);
  // In production, you might want to send this to error tracking service
  return null;
};

// Helper function to create censored name for public display
export const createCensoredName = (firstName: string, lastName?: string): string => {
  if (!firstName) return 'Anonymous';
  
  const firstInitial = firstName.charAt(0).toUpperCase();
  const censoredFirst = firstInitial + '***';
  
  if (lastName) {
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${censoredFirst} ${lastInitial}.`;
  }
  
  return censoredFirst;
};

// Lead Management Functions
export const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    if (!db) throw new Error('Firestore not initialized');
    
    const lead: Omit<Lead, 'id'> = {
      ...leadData,
      createdAt: serverTimestamp(),
      ipAddress: typeof window !== 'undefined' ? 
        (window as any).clientIP || 'unknown' : 'server',
      userAgent: typeof window !== 'undefined' ? 
        navigator.userAgent.substring(0, 200) : 'server'
    };

    const docRef = await addDoc(collection(db, 'leads'), lead);
    
    // Log activity with censored name (client-side - allowed by security rules)
    const displayName = createCensoredName(leadData.firstName, leadData.lastName);
    await logActivity({
      user: displayName,
      action: leadData.selectedMagnets.length > 1 
        ? `letöltötte: ${leadData.selectedMagnets.length} anyagot`
        : 'letöltötte az ingyenes anyagokat',
      platform: 'discord',
      type: 'success'
    });

    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, 'addLead');
  }
};

// Stats Management Functions
export const updateStats = async (updates: StatsUpdate): Promise<boolean> => {
  try {
    if (!db) throw new Error('Firestore not initialized');
    
    const statsRef = doc(db, 'stats', 'global');
    await updateDoc(statsRef, {
      ...updates,
      lastUpdated: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    // If document doesn't exist, create it
    try {
      await addDoc(collection(db, 'stats'), {
        id: 'global',
        totalLeads: 0,
        totalDownloads: 0,
        communityMembers: 0,      // Start from 0
        activeNow: 0,            // Will be updated with real data
        messagesToday: 0,        // Real count only
        questionsAnswered: 0,    // Real count only
        newMembersToday: 0,      // Real count only
        vipSlotsLeft: 150,       // Start with full availability
        ...updates,
        lastUpdated: serverTimestamp()
      });
      return true;
    } catch (createError) {
      return handleFirestoreError(createError, 'createStats') !== null;
    }
  }
};

// Get real-time stats subscription
export const getRealtimeStats = (callback: (stats: Stats | null) => void): (() => void) => {
  if (!db) {
    callback(null);
    return () => {};
  }

  const statsRef = doc(db, 'stats', 'global');
  
  return onSnapshot(statsRef, (doc) => {
    if (doc.exists()) {
      callback({ ...doc.data() } as Stats);
    } else {
      // Initialize stats if document doesn't exist
      updateStats({
        totalLeads: 0,
        totalDownloads: 0,
        communityMembers: 0,      // Start from 0
        activeNow: 0,            // Will be updated with real data
        messagesToday: 0,        // Real count only
        questionsAnswered: 0,    // Real count only
        newMembersToday: 0,      // Real count only
        vipSlotsLeft: 150        // Start with full availability
      });
      callback(null);
    }
  }, (error) => {
    handleFirestoreError(error, 'getRealtimeStats');
    callback(null);
  });
};

// Activity Management Functions
export const logActivity = async (activityData: Omit<Activity, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    if (!db) throw new Error('Firestore not initialized');
    
    const activity: Omit<Activity, 'id'> = {
      ...activityData,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'activities'), activity);
    return docRef.id;
  } catch (error) {
    return handleFirestoreError(error, 'logActivity');
  }
};

// Get real-time activity feed
export const getRealtimeActivityFeed = (callback: (activities: Activity[]) => void): (() => void) => {
  if (!db) {
    callback([]);
    return () => {};
  }

  const activitiesRef = collection(db, 'activities');
  const q = query(activitiesRef, orderBy('createdAt', 'desc'), limit(10));
  
  return onSnapshot(q, (snapshot) => {
    const activities: Activity[] = [];
    snapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() } as Activity);
    });
    callback(activities);
  }, (error) => {
    handleFirestoreError(error, 'getRealtimeActivityFeed');
    callback([]);
  });
};

// Lead count functions
export const getLeadCount = async (): Promise<number> => {
  try {
    if (!db) return 0;
    
    const leadsRef = collection(db, 'leads');
    const snapshot = await getDocs(leadsRef);
    return snapshot.size;
  } catch (error) {
    handleFirestoreError(error, 'getLeadCount');
    return 0;
  }
};

// Get real-time lead count
export const getRealtimeLeadCount = (callback: (count: number) => void): (() => void) => {
  if (!db) {
    callback(0);
    return () => {};
  }

  const leadsRef = collection(db, 'leads');
  
  return onSnapshot(leadsRef, (snapshot) => {
    callback(snapshot.size);
  }, (error) => {
    handleFirestoreError(error, 'getRealtimeLeadCount');
    callback(0);
  });
};

// Download tracking functions
export const trackDownload = async (firstName: string, lastName: string, magnetTitle: string): Promise<string | null> => {
  try {
    if (!db) throw new Error('Firestore not initialized');
    
    // Update download counter
    await updateStats({
      totalDownloads: increment(1)
    });

    // Log download activity with censored name
    const censoredName = createCensoredName(firstName, lastName);
    await logActivity({
      user: censoredName,
      action: `letöltötte: ${magnetTitle}`,
      platform: 'discord',
      type: 'success',
      channel: 'downloads'
    });

    return 'success';
  } catch (error) {
    return handleFirestoreError(error, 'trackDownload');
  }
};

// Get magnet title by ID
export const getMagnetTitle = (magnetId: string): string => {
  const magnetTitles: { [key: string]: string } = {
    'chatgpt-prompts': 'ChatGPT Prompt Sablonok',
    'linkedin-calendar': 'LinkedIn Növekedési Naptár',
    'email-templates': 'Email Marketing Sablonok',
    'tiktok-guide': 'TikTok Algoritmus Guide',
    'automation-workflows': 'Marketing Automatizáció'
  };
  
  return magnetTitles[magnetId] || 'Ingyenes Anyag';
};

// Track milestone achievements
export const trackMilestone = async (milestone: string, count: number): Promise<void> => {
  try {
    if (!db) return;
    
    await logActivity({
      user: 'Elira Csapat',
      action: `🎉 ${milestone}: ${count} ember!`,
      platform: 'discord',
      type: 'achievement',
      channel: 'milestones'
    });
  } catch (error) {
    handleFirestoreError(error, 'trackMilestone');
  }
};

// Analytics helpers
export const getLeadsToday = async (): Promise<number> => {
  try {
    if (!db) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, where('createdAt', '>=', today));
    const snapshot = await getDocs(q);
    
    return snapshot.size;
  } catch (error) {
    handleFirestoreError(error, 'getLeadsToday');
    return 0;
  }
};

// Get recent download activities
export const getRecentDownloads = (callback: (activities: Activity[]) => void): (() => void) => {
  if (!db) {
    callback([]);
    return () => {};
  }

  const activitiesRef = collection(db, 'activities');
  const q = query(
    activitiesRef, 
    where('type', '==', 'success'),
    orderBy('createdAt', 'desc'), 
    limit(5)
  );
  
  return onSnapshot(q, (snapshot) => {
    const activities: Activity[] = [];
    snapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() } as Activity);
    });
    callback(activities);
  }, (error) => {
    handleFirestoreError(error, 'getRecentDownloads');
    callback([]);
  });
};

