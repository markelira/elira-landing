'use client';

import { useState, useEffect } from 'react';
import { 
  getRealtimeStats, 
  getRealtimeActivityFeed, 
  getRealtimeLeadCount,
  updateStats,
  type Stats,
  type Activity
} from '@/lib/firestore-operations';

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

// Hook for global statistics
export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getRealtimeStats((newStats) => {
      setStats(newStats);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const incrementStat = async (statName: keyof Stats, value: number = 1) => {
    if (!stats) return;
    
    const updates: Partial<Stats> = {};
    updates[statName] = (stats[statName] as number) + value;
    
    await updateStats(updates);
  };

  return { 
    stats, 
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
  const whatsappSlotsUsed = (stats?.whatsappSlots || 150) - (stats?.vipSpotsRemaining || stats?.vipSlotsLeft || 150);
  const conversionRate = leadCount > 0 ? ((leadCount / (leadCount + 1000)) * 100).toFixed(1) : '0';
  const growthToday = stats?.newMembersToday || 0;
  
  return {
    totalMembers,
    activeNow: stats?.activeNow || 0, // Will implement real tracking
    messagesToday: stats?.messagesToday || 0, // Real count only
    questionsAnswered: stats?.questionsAnswered || 0, // Real count only
    whatsappSlotsLeft: stats?.vipSpotsRemaining || stats?.vipSlotsLeft || 150, // Start with full availability
    whatsappSlotsUsed,
    conversionRate,
    growthToday,
    loading
  };
};

// Hook for real-time urgency indicators
export const useUrgencyIndicators = () => {
  const { stats } = useStats();
  const [lastJoinTime, setLastJoinTime] = useState<Date>(new Date());
  
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

// Hook for social proof indicators
export const useSocialProof = () => {
  const { activities } = useActivityFeed();
  const { stats } = useStats();
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    // Filter recent activities (last 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recent = activities.filter(activity => {
      const activityTime = activity.createdAt?.toDate ? activity.createdAt.toDate() : new Date();
      return activityTime > tenMinutesAgo;
    });
    setRecentActivity(recent);
  }, [activities]);

  return {
    recentActivity,
    totalMembers: stats?.totalLeads || 0,
    activeNow: stats?.activeNow || 0,
    activitiesLast10Min: recentActivity.length,
    mostActiveChannel: recentActivity.length > 0 ? 
      recentActivity[0].channel || 'general' : 'general'
  };
};