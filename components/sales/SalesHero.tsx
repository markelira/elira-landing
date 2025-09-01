'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { salesPageContent } from '@/lib/sales-page-config';
import useAnalytics from '@/hooks/useAnalytics';
import PurchaseButton from '@/components/course/PurchaseButton';

const SalesHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        
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
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Column - Main Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-8"
          >
            {/* Pre-headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-teal-100 text-lg md:text-xl font-medium italic mb-4"
            >
              A Miskolci Egyetem doktorandusza és a Heureka Group marketing specialistája bemutatja:
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
            >
              🧠 Olvass a vevőid gondolataiban
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-teal-100 leading-relaxed max-w-3xl font-normal"
            >
Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.            </motion.p>

            {/* Course Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Mit tartalmaz a kurzus?
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-blue-400 text-base">👤</span>
                    <span className="text-sm font-medium">Buyer persona 5 perc alatt</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-red-400 text-base">🎯</span>
                    <span className="text-sm font-medium">Fájdalompontok feltárása</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-purple-400 text-base">✍️</span>
                    <span className="text-sm font-medium">Profitnövelő szövegírás</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-yellow-400 text-base">🤖</span>
                    <span className="text-sm font-medium">MI-sablonok készítés</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer hover:scale-[1.02] md:col-span-2"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-green-400 text-base">💼</span>
                    <span className="text-sm font-medium">Konkrét példák és gyakorlatok, amiket rögtön beépíthetsz a munkádba.</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Section - No Background Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative pt-8 space-y-8"
            >
              {/* Pre-CTA Messaging */}
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="text-white text-xl font-bold"
                >
                  Válaszd ki, melyik modul érdekel a legjobban, és <span className="text-teal-200">INGYEN</span> megkapod
                </motion.p>
              </div>

              {/* Primary CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <motion.a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/95 backdrop-blur-sm text-teal-700 hover:text-teal-800 px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-4 group relative overflow-hidden border border-white/40 hover:border-white/60"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <span>IGEN, KÉREM AZ INGYENES VIDEÓT</span>
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                </motion.a>
              </motion.div>

              {/* Urgency Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md text-red-100 px-4 py-2 rounded-full border border-red-300/30">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="font-semibold text-sm">
                    Csak az első 100 jelentkezőnek
                  </span>
                </div>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="flex items-center justify-center gap-6 text-sm text-white/80"
              >
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>Azonnali hozzáférés</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>Nincs rejtett költség</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>30 napos garancia</span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* Right Column - Course Preview Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:pl-8"
          >
            {/* Main Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative group"
            >
              {/* Video Frame with Brand Styling */}
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-[1.02]">
                
                {/* Video Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      BEMUTATÓ VIDEÓ
                    </span>
                  </div>
                </div>

                {/* Video Title - Outside Player */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-4 border border-teal-200">
                    <h4 className="font-bold text-gray-900 mb-1">🧠 Olvass a vevőid gondolataiban</h4>
                    <p className="text-sm text-gray-600">Kurzus bemutató - Ingyenes előzetes</p>
                  </div>
                </div>

                {/* Mux Video Player - Clean */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 group-hover:shadow-2xl transition-all duration-300">
                  <iframe
                    src="https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg?metadata-video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81&video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81"
                    style={{ width: '100%', border: 'none', aspectRatio: '238/135' }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen
                    className="rounded-2xl"
                  />
                </div>

                {/* Video Info - Outside Player */}
                <div className="mt-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">5.0</span>
                        </div>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-600">Értékelés</span>
                      </div>
                      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        INGYENES ELŐZETES
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className="mt-6 text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    👤 Kinek szól?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    ➡️ Vállalkozó vagy, aki már megunta, hogy minden fillért ügynökségekre költ, de még mindig nem látja az eredményt
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    ➡️ Marketinges vagy, akit a főnök folyamatosan szorít jobb számokért, de fogalmad sincs, hogyan javíts a konverzión
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    ➡️ Tisztában vagy vele, hogy lemaradsz az AI forradalomról, de nem tudod, hol és hogyan kezdj hozzá
                  </p>
                  {/* Course Features */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
                      🎯 Gyakorlati
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      🏆 Bizonyított
                    </span>
                    <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                      💼 Bármelyik szektorban
                    </span>
                  </div>
                </div>

                {/* Purchase CTA Button Under Video */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="mt-8"
                >
                  <PurchaseButton 
                    courseId="ai-copywriting-course"
                    className="w-full"
                  />
                </motion.div>
              </div>


            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default SalesHero;