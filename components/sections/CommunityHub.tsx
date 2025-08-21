'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, BookOpen, Handshake, Zap, Gift, Clock, TrendingUp } from 'lucide-react';
import { useCommunityMetrics, useUrgencyIndicators } from '@/hooks/useFirestore';

const CommunityHub: React.FC = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [showValue, setShowValue] = useState(false);
  const { totalMembers, activeNow, messagesToday, questionsAnswered } = useCommunityMetrics();
  const { vipSlotsLeft } = useUrgencyIndicators();

  const valueStack = [
    {
      icon: Target,
      value: null, // Remove fake pricing
      title: "Heti Live Q&A Sessions",
      description: "Egyetemi oktatókkal közvetlenül",
      delay: 0.2,
      estimated: true // Flag as estimated value
    },
    {
      icon: BookOpen,
      value: null, // Remove fake pricing
      title: "Exclusive Mini-Kurzusok",
      description: "Csak közösségi tagoknak",
      delay: 0.4,
      estimated: true
    },
    {
      icon: Handshake,
      value: null, // Remove fake pricing
      title: "Networking Lehetőségek",
      description: "Találj mentorokat és társakat",
      delay: 0.6,
      estimated: true
    },
    {
      icon: Zap,
      value: null, // Remove fake pricing
      title: "Early Access",
      description: "Új kurzusokhoz elsőként férj hozzá",
      delay: 0.8,
      estimated: true
    },
    {
      icon: Gift,
      value: null, // Remove fake pricing
      title: "Havi Surprise Bonusok",
      description: "Premium tartalmak ingyen",
      delay: 1.0,
      estimated: true
    }
  ];

  // Remove value calculation since we removed pricing
  const totalStackValue = 0;

  useEffect(() => {
    // Animate value calculation
    const timer = setTimeout(() => {
      setShowValue(true);
      let currentValue = 0;
      const increment = totalStackValue / 50;
      
      const valueInterval = setInterval(() => {
        currentValue += increment;
        setTotalValue(Math.floor(currentValue));
        
        if (currentValue >= totalStackValue) {
          setTotalValue(totalStackValue);
          clearInterval(valueInterval);
        }
      }, 30);
      
      return () => clearInterval(valueInterval);
    }, 1500);

    return () => clearTimeout(timer);
  }, [totalStackValue]);

  // Use real VIP slots data from Firebase

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
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
            className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            <span>{totalMembers}+ Motivált Magyar Már Tagja</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Az <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Elira Közösség</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Ahol a Tanulás Sosem Áll Meg és a Siker Garantált
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Value Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🎯 Mit Kapsz Ha Csatlakozol?
              </h3>
              
              <div className="space-y-4">
                {valueStack.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 p-2 bg-teal-100 rounded-lg">
                      <item.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total Value Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showValue ? 1 : 0, scale: showValue ? 1 : 0.8 }}
                className="mt-8 p-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-white text-center"
              >
                <div className="text-sm uppercase tracking-wide opacity-90 mb-2">
                  Összértéke
                </div>
                <div className="text-3xl font-bold mb-2">
                  {totalValue.toLocaleString()} Ft+
                </div>
                <div className="text-sm opacity-90 line-through mb-3">
                  ({totalStackValue.toLocaleString()} Ft értékű tartalom)
                </div>
                <div className="text-4xl font-black">
                  TELJESEN INGYEN
                </div>
                <div className="text-sm opacity-90 mt-2">
                  (csak most, az első 100 tagnak)
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Join CTA Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Urgency Counter */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-2 rounded-full text-sm font-medium mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Korlátozott Idő!</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  VIP Státusz Garanciával
                </h3>
                <p className="text-gray-600">
                  Az első 100 tag VIP státuszt kap élethosszig
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Fennmaradó helyek</span>
                  <span className="text-sm font-bold text-red-600">{vipSlotsLeft} maradt</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${(vipSlotsLeft / 100) * 100}%` }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {100 - vipSlotsLeft} ember már csatlakozott az elmúlt órában
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-4">
                <motion.a
                  href="https://discord.gg/qrdENUbW"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl text-center text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  🎮 Discord Közösségbe (Ingyenes)
                </motion.a>
                
                <motion.a
                  href="https://chat.whatsapp.com/KvMY8eiJ3iZIs1EgfskUQb"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-xl text-center text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  💬 WhatsApp VIP Csoportba (Max 150 fő)
                </motion.a>
              </div>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>✅ Nincs spam</span>
                  <span>•</span>
                  <span>✅ Bármikor kiléphetsz</span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <span className="font-semibold text-gray-900">Live Aktivitás</span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Online most:</span>
                  <span className="font-bold text-green-600">{activeNow} tag</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Üzenetek ma:</span>
                  <span className="font-bold text-blue-600">{messagesToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Megválaszolt kérdések:</span>
                  <span className="font-bold text-purple-600">{questionsAnswered}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHub;