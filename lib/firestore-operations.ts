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
  name: string;
  email: string;
  job?: string;
  education?: string;
  phone?: string;
  selectedMagnets: string[];
  createdAt: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface Activity {
  id?: string;
  user: string;
  action: string;
  channel?: string;
  platform: 'discord' | 'whatsapp' | 'both';
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
  whatsappSlots?: number;
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
  whatsappSlots?: number | any;
  vipSlotsLeft?: number | any;
  lastUpdated?: any;
}

// Helper function to handle Firestore errors
const handleFirestoreError = (error: any, operation: string) => {
  logger.error(`Firestore ${operation} error:`, error);
  // In production, you might want to send this to error tracking service
  return null;
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
    
    // Update stats counters
    await updateStats({
      totalLeads: increment(1),
      newMembersToday: increment(1)
    });

    // Log activity
    await logActivity({
      user: leadData.name.split(' ')[0] + ' ' + leadData.name.split(' ')[1]?.[0] + '.',
      action: 'letöltötte az ingyenes anyagokat',
      platform: 'both',
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
        vipSpotsRemaining: 100,  // Real WhatsApp limit
        communityMembers: 0,      // Start from 0
        activeNow: 0,            // Will be updated with real data
        messagesToday: 0,        // Real count only
        questionsAnswered: 0,    // Real count only
        newMembersToday: 0,      // Real count only
        whatsappSlots: 150,      // Real WhatsApp group limit
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
        vipSpotsRemaining: 100,  // Real WhatsApp limit
        communityMembers: 0,      // Start from 0
        activeNow: 0,            // Will be updated with real data
        messagesToday: 0,        // Real count only
        questionsAnswered: 0,    // Real count only
        newMembersToday: 0,      // Real count only
        whatsappSlots: 150,      // Real WhatsApp group limit
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

