'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, Clock, Users, Target, ArrowRight, CheckCircle, Star } from 'lucide-react';
import useAnalytics from '@/hooks/useAnalytics';

const TransitionSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredScenario, setHoveredScenario] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [countAnimated, setCountAnimated] = useState(false);
  const { trackButton } = useAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    const element = document.getElementById('transition');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const scenarios = [
    {
      icon: Sparkles,
      text: "...holnap reggel lenne 100+ működő ChatGPT promptod?",
      shortText: "100+ ChatGPT prompt",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      delay: 0.2,
      stats: "100+",
      benefit: "Azonnali produktivitás",
      timeframe: "24 óra alatt",
      expandedText: "Képzeld el: holnap reggel felkelsz, és már kész van 100+ tesztelt ChatGPT prompt, ami azonnal használható minden marketing helyzetben."
    },
    {
      icon: TrendingUp,
      text: "...30 nap múlva 1000 LinkedIn követőd?",
      shortText: "1000 LinkedIn követő",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: 0.4,
      stats: "1000+",
      benefit: "Exponenciális növekedés",
      timeframe: "30 nap alatt",
      expandedText: "Strukturált terv, napi feladatok, bevált stratégiák - minden megvan ahhoz, hogy 30 nap alatt felépítsd a LinkedIn jelenléted."
    },
    {
      icon: Zap,
      text: "...jövő héten már automatizált email kampányod futna?",
      shortText: "Automatizált kampányok",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      delay: 0.6,
      stats: "24/7",
      benefit: "Passzív bevétel",
      timeframe: "1 hét alatt",
      expandedText: "Kész workflow-k, automatizált rendszerek, amiket egyszer beállítasz és utána magukban működnek."
    }
  ];

  return (
    <section 
      id="transition" 
      className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-50 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Hook */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12"
          >
            <span className="text-gray-900">Mi lenne, ha</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">...</span>
          </motion.h2>

          {/* Interactive Dream Scenarios */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: scenario.delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredScenario(index);
                  trackButton(`Hover Scenario ${index + 1}`, 'transition-engagement');
                }}
                onMouseLeave={() => setHoveredScenario(null)}
                onClick={() => {
                  setExpandedCard(expandedCard === index ? null : index);
                  trackButton(`Expand Scenario ${index + 1}`, 'transition-interaction');
                }}
              >
                <motion.div
                  className={`
                    relative p-6 rounded-3xl border border-gray-200 
                    bg-gradient-to-br ${scenario.bgGradient} to-white
                    shadow-lg group-hover:shadow-2xl transition-all duration-500
                    overflow-hidden
                  `}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-60" />
                  
                  {/* Floating Icon */}
                  <motion.div
                    className={`
                      relative mb-4 w-16 h-16 rounded-2xl bg-gradient-to-r ${scenario.gradient} 
                      shadow-lg flex items-center justify-center
                      group-hover:shadow-xl
                    `}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <scenario.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulsing glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${scenario.gradient} opacity-30`}
                      animate={hoveredScenario === index ? { scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Stats Display */}
                  <motion.div
                    className="mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: scenario.delay + 0.3 }}
                  >
                    <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${scenario.gradient} mb-1`}>
                      {scenario.stats}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {scenario.shortText}
                    </div>
                  </motion.div>

                  {/* Main Question */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {scenario.text}
                  </h3>

                  {/* Benefits */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">{scenario.benefit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">{scenario.timeframe}</span>
                    </div>
                  </div>

                  {/* Expansion Area */}
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 pt-4 mt-4"
                      >
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {scenario.expandedText}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Star className={`w-4 h-4 text-gradient-to-r ${scenario.gradient}`} />
                          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${scenario.gradient}`}>
                            Kezdd el most →
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={hoveredScenario === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className={`w-5 h-5 text-gradient-to-r ${scenario.gradient}`} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>


          {/* Enhanced Statistics with Progressive Disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="relative"
            onViewportEnter={() => setCountAnimated(true)}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-purple-100 to-cyan-100 rounded-3xl blur-3xl opacity-30 scale-110" />
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Packages */}
                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => trackButton('Stats Packages', 'transition-stats')}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600 mb-2"
                    animate={countAnimated ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    5
                  </motion.div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Csomag
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 }}
                    className="text-xs text-teal-700 font-medium"
                  >
                    Azonnal elérhető
                  </motion.div>
                </motion.div>
                
                {/* Pages */}
                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => trackButton('Stats Pages', 'transition-stats')}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2"
                    animate={countAnimated ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    103
                  </motion.div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Oldal
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.5 }}
                    className="text-xs text-purple-600 font-medium"
                  >
                    Prémium tartalom
                  </motion.div>
                </motion.div>
                
                {/* Value */}
                <motion.div 
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => trackButton('Stats Value', 'transition-stats')}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2"
                    animate={countAnimated ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    0Ft
                  </motion.div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Ár
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.6 }}
                    className="text-xs text-orange-600 font-medium"
                  >
                    100% ingyen
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Main Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  És most <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">ingyen</span> a tiéd lehet.
                </h3>
                
                {/* Social Proof Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6 }}
                  className="flex items-center justify-center gap-6 text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>100+ letöltés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Bevált módszerek</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Simple CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 text-center"
          >
            {/* Main CTA Button */}
            <motion.button
              onClick={() => {
                trackButton('View PDF Details Enhanced', 'transition-cta-enhanced');
                const element = document.getElementById('lead-magnets');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button Base */}
              <div className="relative px-12 py-5 bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl">
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, -60, -20],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  <span>Részletes előnézet minden PDF-hez</span>
                  <motion.div
                    className="flex items-center"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </div>
              
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl -z-10 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{ transform: 'scale(1.1)' }}
              />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TransitionSection;