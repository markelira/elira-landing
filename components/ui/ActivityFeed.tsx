'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Users, Trophy, Clock } from 'lucide-react';
import { useSocialProof } from '@/hooks/useFirestore';
import { Activity } from '@/lib/firestore-operations';

// Activity type to icon mapping
const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'success':
      return Download;
    case 'join':
      return Users;
    case 'achievement':
      return Trophy;
    default:
      return Clock;
  }
};

// Activity type to color mapping
const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-600 bg-green-100';
    case 'join':
      return 'text-blue-600 bg-blue-100';
    case 'achievement':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

// Format time ago
const formatTimeAgo = (timestamp: any) => {
  if (!timestamp) return 'most';
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'most';
    if (diffInMinutes < 60) return `${diffInMinutes}p`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}ó`;
    return `${Math.floor(diffInMinutes / 1440)}n`;
  } catch {
    return 'most';
  }
};

// Generate user avatar initials - handle censored names
const getUserAvatar = (username: string) => {
  if (!username) return '👤';
  
  // For censored names like "J*** K.", extract the first letter
  if (username.includes('***')) {
    return username.charAt(0).toUpperCase() || '👤';
  }
  
  // For regular names, get initials
  const cleanName = username.replace(/\*/g, '');
  const nameParts = cleanName.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').substring(0, 2).toUpperCase();
  return initials || '👤';
};

interface ActivityFeedProps {
  showHeader?: boolean;
  maxItems?: number;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  showHeader = true, 
  maxItems = 5,
  className = ''
}) => {
  const { recentActivity, totalDownloads } = useSocialProof();

  return (
    <div className={`space-y-4 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h3 className="font-semibold text-gray-900">Legutóbbi aktivitások</h3>
          </div>
          <div className="text-xs text-gray-500">
            {totalDownloads} összes letöltés
          </div>
        </div>
      )}

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {recentActivity.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Légy te az első aki csatlakozik!</p>
            </motion.div>
          ) : (
            recentActivity.slice(0, maxItems).map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={`${activity.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.1
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: -100, 
                    scale: 0.9,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors group"
                >
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {getUserAvatar(activity.user)}
                    </div>
                  </div>

                  {/* Activity Icon */}
                  <div className={`p-1.5 rounded-lg ${colorClass} transition-colors`}>
                    <IconComponent className="w-3 h-3" />
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {activity.user}
                      </span>
                      <span className="text-gray-600 text-sm truncate">
                        {activity.action}
                      </span>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Live indicator */}
      {recentActivity.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center space-x-2 pt-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Élő aktivitás</span>
        </motion.div>
      )}
    </div>
  );
};

export default ActivityFeed;