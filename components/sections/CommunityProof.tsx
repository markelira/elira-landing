'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MessageCircle, Users, Award, TrendingUp, Clock, Flame } from 'lucide-react';
import { useActivityFeed, useCommunityMetrics } from '@/hooks/useFirestore';

const CommunityProof: React.FC = () => {
  const { activities, loading: activitiesLoading } = useActivityFeed();
  const { 
    activeNow, 
    messagesToday, 
    questionsAnswered, 
    growthToday,
    loading: statsLoading 
  } = useCommunityMetrics();

  // Helper function to format time from Firestore timestamp
  const formatTimeAgo = (timestamp: any): string => {
    if (!timestamp) return 'most';
    
    const now = new Date();
    const activityTime = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'most';
    if (diffInMinutes < 60) return `${diffInMinutes} perce`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} órája`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} napja`;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'discord':
        return '🎮';
      case 'whatsapp':
        return '💬';
      default:
        return '🌟';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'join':
        return '👋';
      case 'question':
        return '❓';
      case 'success':
        return '🎉';
      case 'achievement':
        return '🏆';
      default:
        return '💬';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'join':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'question':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'achievement':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/activity-pattern.svg')] opacity-5" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Activity className="w-4 h-4" />
            <span>🔴 ÉLŐ KÖZVETÍTÉS</span>
          </motion.div>
          
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Valós idejű aktivitás • Frissül automatikusan • Ne maradj le!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Flame className="w-6 h-6 text-red-500" />
                  <span>Aktivitás Feed</span>
                </h3>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Élő</span>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activitiesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex items-start space-x-3 p-4 rounded-lg bg-gray-100">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence>
                    {activities.slice(0, 10).map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className={`flex items-start space-x-3 p-4 rounded-lg border ${getTypeColor(activity.type)} transition-all hover:shadow-md`}
                      >
                        <div className="flex-shrink-0 text-lg">
                          {getTypeIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-gray-900">{activity.user}</span>
                            <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                              {getPlatformIcon(activity.platform)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {activity.action}
                            {activity.channel && (
                              <span className="ml-1 text-blue-600 font-medium">
                                #{activity.channel}
                              </span>
                            )}
                          </p>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(activity.createdAt)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  További aktivitások betöltése...
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Real-time Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Élő Statisztikák</span>
              </h3>
              
              <div className="space-y-4">
                {statsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-8"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Online most:</span>
                      </div>
                      <motion.span
                        key={activeNow}
                        initial={{ scale: 1.2, color: '#10b981' }}
                        animate={{ scale: 1, color: '#059669' }}
                        className="font-bold text-green-600"
                      >
                        {activeNow}
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">Üzenetek ma:</span>
                      </div>
                      <motion.span
                        key={messagesToday}
                        initial={{ scale: 1.2, color: '#3b82f6' }}
                        animate={{ scale: 1, color: '#2563eb' }}
                        className="font-bold text-blue-600"
                      >
                        {messagesToday}
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-700">Válaszolt kérdések:</span>
                      </div>
                      <motion.span
                        key={questionsAnswered}
                        initial={{ scale: 1.2, color: '#8b5cf6' }}
                        animate={{ scale: 1, color: '#7c3aed' }}
                        className="font-bold text-purple-600"
                      >
                        {questionsAnswered}
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700">Új tagok ma:</span>
                      </div>
                      <motion.span
                        key={growthToday}
                        initial={{ scale: 1.2, color: '#ea580c' }}
                        animate={{ scale: 1, color: '#dc2626' }}
                        className="font-bold text-orange-600"
                      >
                        +{growthToday}
                      </motion.span>
                    </motion.div>
                  </>
                )}
              </div>
            </div>

            {/* FOMO Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl mb-3"
                >
                  🚨
                </motion.div>
                <h3 className="font-bold text-lg mb-2">
                  FOMO Alert!
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {growthToday} ember csatlakozott ma. 
                  Ne maradj le a beszélgetésből!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-600 font-bold py-2 px-4 rounded-lg text-sm cursor-pointer"
                >
                  Csatlakozom Most! 🏃‍♂️
                </motion.div>
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-4">🔥 Trending Most</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">#linkedin-stratégia</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">23 üzenet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">#cv-review</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">18 üzenet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">#napi-challenge</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">15 üzenet</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityProof;