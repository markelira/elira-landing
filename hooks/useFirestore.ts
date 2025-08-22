'use client';

import { useState, useEffect } from 'react';
import { 
  getRealtimeStats, 
  getRealtimeActivityFeed, 
  getRealtimeLeadCount,
  getRecentDownloads,
  updateStats,
  type Stats,
  type Activity
} from '@/lib/firestore-operations';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { logger } from '@/lib/logger';
import { initializeStatsIfNeeded } from '@/lib/init-firestore-client';

// Hook for real-time lead counter
export const useLeadCount = () => {
  const [leadCount, setLeadCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getRealtimeLeadCount((count) => {
      setLeadCount(count);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { leadCount, loading };
};

// Hook for real-time activity feed
export const useActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getRealtimeActivityFeed((newActivities) => {
      setActivities(newActivities);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { activities, loading };
};

// Hook for global statistics with fallback calculation
export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [calculatedStats, setCalculatedStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Try to get stats from the stats collection
    const unsubscribe = getRealtimeStats((newStats) => {
      if (newStats) {
        setStats(newStats);
        setCalculatedStats(null); // Use real stats, not calculated
      } else {
        // Stats collection doesn't exist, calculate from activities collection
        calculateStatsFromActivities();
      }
      setLoading(false);
    });

    // Also recalculate when component mounts to ensure we have data
    calculateStatsFromActivities();

    return () => {
      unsubscribe();
    };
  }, []);

  // Calculate stats from activities collection (we CAN read this!)
  const calculateStatsFromActivities = async () => {
    try {
      if (!db) return;
      
      // We can read activities collection!
      const activitiesRef = collection(db, 'activities');
      const activitiesSnapshot = await getDocs(activitiesRef);
      
      let totalDownloads = 0;
      let uniqueUsers = new Set<string>();
      
      // Count downloads from activities
      activitiesSnapshot.forEach((doc) => {
        const activity = doc.data() as Activity;
        
        // Count download activities
        if (activity.type === 'success' && activity.action?.includes('letöltötte')) {
          // Extract number of downloads from action text if available
          const match = activity.action.match(/(\d+) anyagot/);
          if (match) {
            totalDownloads += parseInt(match[1]);
          } else {
            totalDownloads += 1;
          }
          
          // Track unique users
          if (activity.user) {
            uniqueUsers.add(activity.user);
          }
        }
      });
      
      const calculatedStatsData: Stats = {
        totalLeads: uniqueUsers.size,
        totalDownloads,
        vipSpotsRemaining: 150,
        communityMembers: uniqueUsers.size,
        activeNow: 0,
        messagesToday: 0,
        questionsAnswered: 0,
        newMembersToday: uniqueUsers.size,
        vipSlotsLeft: 150,
        lastUpdated: new Date()
      };
      
      setCalculatedStats(calculatedStatsData);
      logger.log('Calculated stats from activities:', calculatedStatsData);
      
    } catch (error) {
      logger.error('Failed to calculate stats from activities:', error);
    }
  };

  const incrementStat = async (statName: keyof Stats, value: number = 1) => {
    if (!stats) return;
    
    const updates: Partial<Stats> = {};
    updates[statName] = (stats[statName] as number) + value;
    
    await updateStats(updates);
  };

  return { 
    stats: stats || calculatedStats, 
    loading, 
    incrementStat 
  };
};

// Hook for community-specific metrics
export const useCommunityMetrics = () => {
  const { stats, loading } = useStats();
  const { leadCount } = useLeadCount();
  
  // Calculate derived metrics - REAL data only
  const totalMembers = leadCount; // Real count only
  const conversionRate = leadCount > 0 ? ((leadCount / (leadCount + 1000)) * 100).toFixed(1) : '0';
  const growthToday = stats?.newMembersToday || 0;
  
  return {
    totalMembers,
    activeNow: stats?.activeNow || 0, // Will implement real tracking
    messagesToday: stats?.messagesToday || 0, // Real count only
    questionsAnswered: stats?.questionsAnswered || 0, // Real count only
    conversionRate,
    growthToday,
    loading
  };
};

// Hook for real-time urgency indicators
export const useUrgencyIndicators = () => {
  const { stats } = useStats();
  const [lastJoinTime] = useState<Date>(new Date());
  
  // Real join times will be tracked from actual user activity

  const minutesSinceLastJoin = Math.floor((Date.now() - lastJoinTime.getTime()) / 60000);
  const urgencyLevel = minutesSinceLastJoin < 5 ? 'high' : minutesSinceLastJoin < 15 ? 'medium' : 'low';
  
  return {
    vipSlotsLeft: stats?.vipSpotsRemaining || stats?.vipSlotsLeft || 150,
    minutesSinceLastJoin,
    urgencyLevel,
    lastJoinTime
  };
};

// Hook for form completion tracking
export const useFormTracking = () => {
  const [formViews, setFormViews] = useState(0);
  const [formStarts, setFormStarts] = useState(0);
  const [formCompletions, setFormCompletions] = useState(0);

  const trackFormView = () => {
    setFormViews(prev => prev + 1);
  };

  const trackFormStart = () => {
    setFormStarts(prev => prev + 1);
  };

  const trackFormCompletion = () => {
    setFormCompletions(prev => prev + 1);
  };

  const conversionRate = formViews > 0 ? ((formCompletions / formViews) * 100).toFixed(1) : '0';
  const abandonmentRate = formStarts > 0 ? (((formStarts - formCompletions) / formStarts) * 100).toFixed(1) : '0';

  return {
    formViews,
    formStarts,
    formCompletions,
    conversionRate,
    abandonmentRate,
    trackFormView,
    trackFormStart,
    trackFormCompletion
  };
};

// Hook for recent downloads
export const useRecentDownloads = () => {
  const [recentDownloads, setRecentDownloads] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getRecentDownloads((downloads) => {
      setRecentDownloads(downloads);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { recentDownloads, loading };
};

// Hook for social proof indicators
export const useSocialProof = () => {
  const { activities } = useActivityFeed();
  const { recentDownloads } = useRecentDownloads();
  const { stats } = useStats();
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [calculatedTotalDownloads, setCalculatedTotalDownloads] = useState<number>(0);

  // Initialize Firestore stats if needed (for client-side operations)
  useEffect(() => {
    initializeStatsIfNeeded().catch(error => {
      logger.warn('Failed to initialize stats:', error);
    });
  }, []);

  useEffect(() => {
    // Combine all recent activities and downloads
    const allActivities = [...activities, ...recentDownloads];
    
    // Calculate total downloads from all activities
    let totalDownloads = 0;
    allActivities.forEach(activity => {
      if (activity.type === 'success' && activity.action?.includes('letöltötte')) {
        const match = activity.action.match(/(\d+) anyagot/);
        if (match) {
          totalDownloads += parseInt(match[1]);
        } else {
          totalDownloads += 1;
        }
      }
    });
    setCalculatedTotalDownloads(totalDownloads);
    
    // Filter recent activities (last 30 minutes for better social proof)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const recent = allActivities.filter(activity => {
      const activityTime = activity.createdAt?.toDate ? activity.createdAt.toDate() : new Date();
      return activityTime > thirtyMinutesAgo;
    }).slice(0, 5); // Show only top 5 most recent
    
    setRecentActivity(recent);
  }, [activities, recentDownloads]);

  const finalTotalDownloads = stats?.totalDownloads || calculatedTotalDownloads;
  
  // Log for debugging
  if (finalTotalDownloads > 0) {
    logger.log('useSocialProof returning downloads:', finalTotalDownloads, 'from', stats ? 'stats' : 'calculated');
  }

  return {
    recentActivity,
    recentDownloads,
    stats, // Add stats to the return object
    totalMembers: stats?.totalLeads || 0,
    totalDownloads: finalTotalDownloads, // Use calculated as fallback
    activeNow: stats?.activeNow || 0,
    activitiesLast30Min: recentActivity.length,
    mostActiveChannel: recentActivity.length > 0 ? 
      recentActivity[0].channel || 'downloads' : 'downloads'
  };
};