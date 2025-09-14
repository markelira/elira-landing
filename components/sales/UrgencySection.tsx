'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Users, Gift, TrendingDown, DollarSign, Zap } from 'lucide-react';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';

const UrgencySection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const urgencyFactors = [
    {
      icon: Users,
      text: "Csak az első 100 felhasználóig 50% kedvezmény",
      color: "from-red-500 to-red-600",
      emoji: "🔴"
    },
    {
      icon: Clock,
      text: "50% kedvezmény csak 72 óráig érvényes",
      color: "from-orange-500 to-orange-600", 
      emoji: "⏰"
    },
    {
      icon: Gift,
      text: "Ingyenes videó csak az első 100 jelentkezőnek",
      color: "from-purple-500 to-purple-600",
      emoji: "🎁"
    }
  ];

  const consequences = [
    {
      icon: TrendingDown,
      text: "Versenytársaid előnyt szereznek",
      color: "text-red-400"
    },
    {
      icon: DollarSign,
      text: "Pénzt hagysz az asztalon",
      color: "text-orange-400"
    },
    {
      icon: Zap,
      text: "Lemaradsz az AI forradalomról",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-red-900 via-red-800 to-orange-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
        
        {/* Animated warning pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="warning-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#warning-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-red-500/30 backdrop-blur-md text-white px-6 py-3 rounded-full border border-red-300/50 mb-8">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <span className="font-bold text-lg">⏰ SÜRGŐSSÉG ÉS LIMITÁCIÓ</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Miért <span className="text-red-300">most</span> érdemes cselekedned?
            </h2>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                ⏰ Kedvezmény lejárata:
              </h3>
              
              <div className="flex justify-center gap-4">
                <div className="bg-red-500 rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-red-200 text-sm font-medium">ÓRA</div>
                </div>
                <div className="bg-orange-500 rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-orange-200 text-sm font-medium">PERC</div>
                </div>
                <div className="bg-yellow-500 rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-yellow-200 text-sm font-medium">MP</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Urgency Factors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid gap-6 mb-12"
          >
            {urgencyFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${factor.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <factor.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{factor.emoji}</span>
                      <span className="text-white text-lg font-bold">
                        {factor.text}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Consequences of Waiting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-red-300/30">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Minden nap, amit vársz:
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {consequences.map((consequence, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <consequence.icon className={`w-8 h-8 ${consequence.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                      <p className="text-white font-semibold text-lg">
                        {consequence.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span className="text-xl">🎁</span>
                <span>ELŐSZÖR AZ INGYENES VIDEÓT KÉREM</span>
              </motion.button>
              
              <motion.button
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-xl">🚀</span>
                  <div className="text-center">
                    <div>CSATLAKOZOM MOST</div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 line-through text-sm">19.990 Ft</span>
                      <span className="text-yellow-300 font-black">9.990 Ft</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default UrgencySection;