'use client';

import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { TrendingUp, Clock, Shield } from 'lucide-react';
import { content } from '@/lib/content/hu';
import { subscribeToStats, getStats, SiteStats } from '@/lib/firestore-stats';
import { logger } from '@/lib/logger';

interface AnimatedCounterProps {
  targetCount: number;
  isVisible: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetCount, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const controls = animate(0, targetCount, {
      duration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (value) => setCount(Math.floor(value))
    });

    return () => controls.stop();
  }, [isVisible, targetCount]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={isVisible ? { 
        scale: 1,
        transition: { 
          type: "spring",
          damping: 15,
          stiffness: 300,
          delay: 0.3
        }
      } : {}}
      className="text-6xl md:text-7xl font-bold text-teal-600 mb-2"
    >
      {count.toLocaleString('hu-HU')}
    </motion.div>
  );
};

const SocialProof: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsCount, setStatsCount] = useState(0); // Start from 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('social-proof');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Real-time Firestore stats
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    // Get initial stats
    getStats().then(stats => {
      if (stats) {
        setStatsCount(stats.totalLeads);
      }
    });

    // Set up real-time listener
    try {
      unsubscribe = subscribeToStats((stats: SiteStats) => {
        setStatsCount(stats.totalLeads);
      });
    } catch (error) {
      logger.error('Error setting up stats listener:', error);
      // No fallback simulation - show real data only
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="social-proof" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Main Counter Section */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
          >
            {content.social.title}
          </motion.h2>

          {/* Animated Counter */}
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-2xl mx-auto mb-8">
            <AnimatedCounter targetCount={statsCount} isVisible={isVisible} />
            <motion.p 
              variants={itemVariants}
              className="text-2xl text-gray-600 font-medium"
            >
              {content.social.counter}
            </motion.p>
            
            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center mt-6 space-x-6"
            >
              <div className="flex items-center text-green-600">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">100% Biztonságos</span>
              </div>
              <div className="flex items-center text-teal-600">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Folyamatosan bővülő</span>
              </div>
            </motion.div>
          </div>

          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-6 py-3 bg-white/60 
                       backdrop-blur-sm rounded-full shadow-lg border border-gray-200"
          >
            <span className="text-sm text-gray-700 font-medium">
              🎓 {content.social.trustBadge}
            </span>
          </motion.div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            {content.social.recentActivity}
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-4">
            {content.social.activity.length > 0 ? content.social.activity.map((activity: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg 
                           transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{activity.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {activity.name}
                      </span>
                      <span className="text-gray-600">{activity.action}</span>
                    </div>
                    {activity.magnet && (
                      <div className="text-sm text-teal-600 font-medium mb-1">
                        {activity.magnet}
                      </div>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>

                {/* Activity indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 
                               rounded-full animate-pulse" />
              </motion.div>
            )) : (
              <div className="col-span-2 text-center p-8 bg-gray-50 rounded-xl">
                <p className="text-gray-600">Légy te az első aki csatlakozik!</p>
              </div>
            )}
          </div>

          {/* Live indicator */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-50 
                           rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
              <span className="text-sm text-green-700 font-medium">
                Élő aktivitás
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Row */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: "5", label: "Ingyenes Anyag", icon: "📚" },
            { number: "100%", label: "Ingyenes", icon: "💯" },
            { number: "24/7", label: "Hozzáférés", icon: "⏰" },
            { number: "2024", label: "Frissítve", icon: "🚀" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;