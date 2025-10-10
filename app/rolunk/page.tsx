'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { TrendingUp, Target, Users, Zap, Shield, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section
        className="relative min-h-screen overflow-hidden -mt-20 pt-20"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[80vh]">

            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm"
                     style={{
                       background: 'rgba(255, 255, 255, 0.1)',
                       backdropFilter: 'blur(20px) saturate(150%)',
                       WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                       border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="font-semibold text-white">Küldetésünk</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/90">Alapítva 2025-ben</span>
                  </div>
                </div>
              </motion.div>

              {/* Main Headlines */}
              <motion.div
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-white">
                  Átvisszük a tudást
                  <br />
                  <span className="text-white">végrehajtásba</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                  Felgyorsítjuk a magyar vállalkozások növekedését azzal, hogy megszüntetjük a tanulás és az alkalmazás közötti szakadékot. Tiszta megközelítés. Gyakorlati fókusz. Azonnal használható stratégiák és implementáció.
                </p>
              </motion.div>

              {/* Trust Stats */}
              <motion.div
                className="pt-4 sm:pt-6 lg:pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12">
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold">Alkalmazható tudás</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm font-semibold">Gyors eredmények</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold">Gyakorlati fókusz</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <motion.div
              className="relative mt-8 lg:mt-0 space-y-8 lg:pt-16"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Main Card */}
              <div className="relative rounded-2xl sm:rounded-[32px] p-3 sm:p-4"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     backdropFilter: 'blur(40px) saturate(180%)',
                     WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                     border: '1px solid rgba(255, 255, 255, 0.18)',
                     boxShadow: `
                       0 8px 32px 0 rgba(0, 0, 0, 0.2),
                       inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                       inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)
                     `
                   }}>

                <div className="rounded-[24px] overflow-hidden relative bg-white/10 aspect-[4/3]"
                     style={{
                       boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)'
                     }}>
                  <Image
                    src="/rolunk-hero.png"
                    alt="Elira founders working together"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-xs sm:text-sm">DWY / DFY</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                    <span className="text-white font-semibold text-xs sm:text-sm">Masterclass platform</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-8 -left-6 px-4 py-2.5 rounded-xl hidden lg:flex"
                  style={{
                    background: 'rgba(139, 92, 246, 0.25)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(167, 139, 250, 0.3)',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-200" />
                    <span className="text-white font-semibold text-xs">Implementáció</span>
                  </div>
                </motion.div>

                <div className="absolute inset-0 rounded-[32px] pointer-events-none"
                     style={{
                       background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 70%)'
                     }} />
              </div>

              {/* Founders */}
              <div className="mt-8 lg:mt-12">
                <p className="text-xs sm:text-sm text-white/60 mb-4 sm:mb-6 font-medium text-center">
                  Az alapítók
                </p>

                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
                  <div className="flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <div className="h-12 w-12 border border-white/20 rounded-xl overflow-hidden relative">
                      <Image
                        src="/MARK1.png"
                        alt="Márk - Co-founder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium text-sm">Márk</div>
                      <div className="text-white/60 text-xs">Co-founder</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <div className="h-12 w-12 border border-white/20 rounded-xl overflow-hidden relative">
                      <Image
                        src="/ARON1.jpeg"
                        alt="Áron - Co-founder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-medium text-sm">Áron</div>
                      <div className="text-white/60 text-xs">Co-founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4 sm:mb-6 tracking-tight">
                Alapítva 2025-ben. Már ma hatással vagyunk.
              </h2>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                Indulás óta folyamatosan építjük a hidat a tudás és a végrehajtás között magyar vállalkozásoknak.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                3
              </div>
              <div className="text-sm sm:text-base text-white/60 font-medium">
                Vállalkozási szint
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-2">
                Startupoktól középvállalatokig
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                30-90
              </div>
              <div className="text-sm sm:text-base text-white/60 font-medium">
                Perc az eredményig
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-2">
                Mikrokurzusoknál
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                1 hónap
              </div>
              <div className="text-sm sm:text-base text-white/60 font-medium">
                Működő rendszer
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-2">
                Integrált programoknál
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Miért létezünk
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Magyar vállalkozások befektetnek tanulásba, de a tudás nem konvertálódik eredményre. Megszüntetjük ezt a szakadékot.
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-red-100"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Elméleti tudás, nincs alkalmazás
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Vállalkozások befektetnek képzésekbe, kurzusokba, konferenciákba. A tudás megvan, de a gyakorlatban nem generál valós eredményt. Az elméleti kereteket senki nem fordítja át működő rendszerré.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 sm:p-8 border border-amber-100"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Nincs kapacitás alkalmazni
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Csapatok operatív feladatokkal túlterheltek. Nincs idő és erőforrás az általános kereteket saját kontextusra átfordítani. A megtanult tudás sosem kerül alkalmazásba.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border-2 border-teal-200"
            >
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Elira: Átvezetjük a tudást végrehajtásba
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nem tanítjuk az elméletet. Átvezetjük azt implementációba. Keretrendszerek, sablonok, munkafolyamatok – minden, ami kell a végrehajtáshoz. Tiszta implementáció, azonnali alkalmazhatóság.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Az Elira megközelítés
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Minden vállalkozási szinten ugyanaz a cél: azonnali alkalmazhatóság és mérhető eredmények
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">

            {/* Level 1 - Startups */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Startupoknak: Gyors, fókuszált megoldások</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Amikor minden perc számít, célzott tudást biztosítunk konkrét kihívásokra. Buyer persona, konkurencia elemzés, email stratégia – 30-90 perc múlva használható keretrendszerrel és sablonokkal rendelkezel. Azonnali gyakorlati alkalmazás, minden elméleti felvezetés nélkül.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Azonnali alkalmazhatóság
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Gyors implementáció
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Level 2 - Small Business */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Kisvállalkozásoknak: Teljes rendszerépítés rugalmas támogatással</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Átfogó programok, amelyek teljes működő rendszert építenek 4-8 óra alatt. Minden eszközt megkapsz: videók, sablonok, munkafolyamatok, esettanulmányok. Alapvetően önálló implementációra tervezve. Szükség esetén rugalmas támogatással: konzultáció vagy közös megvalósítás (DWY/DFY). Teljesen a te igényeid szerint.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Teljes rendszer, használható eszközök
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Támogatás igény szerint
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Level 3 - Mid-size */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Középvállalatoknak: Integrált implementáció változásmenedzsmenttel</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Amikor a szervezeti átállás kulcsfontosságú, nem csak tanítunk – együtt implementálunk. 1 hónap alatt a teljes rendszer felépül: 4 konzultáció, személyre szabott roadmap, osztályközi koordináció, dokumentált playbook. Nem tanácsadás – hanem közös munka, amely fenntartható, dokumentált, mérhető eredményeket hoz.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Dokumentált, mérhető, fenntartható
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Változásmenedzsment támogatás
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Miből indulunk ki
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Elvek, amik minden döntésünket vezetik
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Azonnali alkalmazhatóság</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Minden tartalom azonnali gyakorlati értéket nyújt. Nincs várakozás, nincs késleltetett alkalmazás. A használhatóság az elsődleges kritérium minden megoldásunknál.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tisztán gyakorlati megközelítés</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Bevált gyakorlatok helyett konkrét, működő eszközöket biztosítunk. Nincs általános elméleti keretek magyarázata. Csak specifikus megoldások valós problémákra. Gyakorlati, működő, bizonyított.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hatékony időkeretek</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  30 perc – használható eredmény. 4 óra – teljes rendszer. 1 hónap – szervezeti átalakulás. Strukturált, gyors folyamatok mérhető eredményekkel, hatékony végrehajtással.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Teljes átláthatóság</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Minden költség, eredmény és folyamat előre tisztázott. Pontos elvárások, mérhető célok, világos struktúra. Átlátható működés minden szinten, meglepetések nélkül.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
                Honnan jöttünk
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm"
            >
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
                Amikor 2025-ben elindítottuk az Elirát, egyetlen kérdés vezetett minket: miért van szakadék aközött, amit a vállalkozások megtanulnak, és amit ténylegesen alkalmaznak?
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                Láttuk, hogy vállalkozások vesznek részt drága képzéseken, olvasnak számtalan könyvet, hallgatnak podcastokat – aztán semmi nem változik. Nem azért, mert a tudás rossz. Hanem azért, mert nincs idő, kapacitás vagy keretrendszer az alkalmazáshoz.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Így született meg az Elira: egy platform, amely nem csak tanít, hanem át is vezeti a tudást végrehajtásba. Mikrokurzusok startupoknak. Masterclassok kisvállalkozásoknak. Integrált programok középvállalatoknak. Mindegyik ugyanazt csinálja: megszünteti a tanulás és az alkalmazás közötti szakadékot.
              </p>

              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden relative mb-3 border border-gray-200">
                    <Image
                      src="/MARK1.png"
                      alt="Márk - Co-founder & CEO"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-gray-900 font-semibold text-base">Márk</div>
                    <div className="text-gray-600 text-sm">Co-founder & CEO</div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden relative mb-3 border border-gray-200">
                    <Image
                      src="/ARON1.jpeg"
                      alt="Áron - Co-founder & CTO"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-gray-900 font-semibold text-base">Áron</div>
                    <div className="text-gray-600 text-sm">Co-founder & CTO</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Closing */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 mb-6 tracking-tight">
                Egy küldetés
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Megszüntetni a tudás és a végrehajtás közötti szakadékot magyar vállalkozásoknál. Gyorsan, tisztán, mérhető eredményekkel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
