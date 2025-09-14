'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { salesPageContent } from '@/lib/sales-page-config';
import useAnalytics from '@/hooks/useAnalytics';
import PurchaseButton from '@/components/course/PurchaseButton';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';
import { COURSE_CONFIG } from '@/types/payment';

const SalesHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { trackButton } = useAnalytics();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCTAClick = () => {
    trackButton('Browse Courses', 'sales-hero-cta');
    const element = document.getElementById('courses-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="sales-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#sales-grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-12rem)]">
          
          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-4 sm:space-y-6 lg:space-y-8 mb-8 sm:mb-12 lg:mb-16"
          >
            {/* Top Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-teal-100 text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4 px-2 sm:px-0"
            >
              A Miskolci Egyetem doktorandusza és a Heureka Group marketing specialistája bemutatja:
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white mb-3 sm:mb-4 lg:mb-6 px-2 sm:px-0"
            >
              🧠 Olvass a vevőid gondolataiban
            </motion.h1>

            {/* Course Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm sm:text-base md:text-base lg:text-lg text-teal-100 leading-relaxed max-w-3xl mx-auto font-normal mb-6 sm:mb-8 px-4 sm:px-2"
            >
              Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.
            </motion.p>


          </motion.div>

          {/* CTA Button - Before Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center max-w-lg mx-auto mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0"
          >
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
            >
              Válassz egyet az 5 modulból ingyen
            </motion.button>
          </motion.div>

          {/* Central Video Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          >
            {/* Video Frame with Runway-style Design */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              
              {/* Video Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                    KURZUS BEMUTATÓ
                  </span>
                </div>
              </div>

              {/* Video Title */}
              <div className="mb-4 sm:mb-6 text-center">
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-200">
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-1">🧠 Olvass a vevőid gondolataiban</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Ingyenes kurzus előzetes</p>
                </div>
              </div>

              {/* Video Player - Central Focus */}
              <div className="relative rounded-lg sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 group-hover:shadow-2xl transition-all duration-300">
                <iframe
                  src="https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg?metadata-video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81&video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81"
                  style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  className="rounded-lg sm:rounded-2xl"
                />
              </div>

              {/* Video Meta Info */}
              <div className="mt-4 sm:mt-6 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">5.0</span>
                  <span className="text-xs text-gray-500">• 312+ értékelés</span>
                </div>
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                  INGYENES
                </div>
              </div>
            </div>

          </motion.div>

          {/* Trust Signals - After Video */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 text-center px-4 sm:px-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Azonnali hozzáférés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Nincs rejtett költség</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>30 napos garancia</span>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
      
      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      
      {/* Subtle Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50/20 to-transparent z-20 pointer-events-none" />
      
    </section>
  );
};

export default SalesHero;