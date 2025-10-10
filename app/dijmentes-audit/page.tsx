'use client';

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function DijmentesAuditPage() {
  return (
    <div className="min-h-screen">
      <PremiumHeader />

      <main>
        {/* Hero Section - Two Column Layout */}
        <section
          className="relative min-h-screen overflow-hidden -mt-20 pt-20"
          style={{
            background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[80vh]">

              {/* Left Column - Content */}
              <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                {/* Corporate Badge */}
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
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <span className="font-semibold text-white">Ingyenes Marketing Audit</span>
                    </div>
                    <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 sm:w-3 h-0.5 bg-white/20"></div>
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-sm"></div>
                        <div className="w-2 sm:w-3 h-0.5 bg-white/20"></div>
                        <div className="w-3 sm:w-4 h-3 sm:h-4 bg-indigo-400 rounded"></div>
                      </div>
                      <span className="text-white/90">30 perc</span>
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
                    Kíváncsi vagy,
                    <br />
                    <span className="text-white">működne-e nálad?</span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                    30 perces személyre szabott audit, ahol konkrét, azonnal alkalmazható stratégiákat mutatunk - kifejezetten a <span className="text-white font-medium">TE termékedhez, a TE piacodhoz</span> igazítva. Nincs kötelezettség, csak tiszta érték.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7"
                    onClick={() => document.getElementById('idopont-foglalas')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Igen, érdekel - foglalok időpontot</span>
                  </Button>
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
                      <span className="text-sm font-semibold">100% Ingyenes</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-sm font-semibold">Átlag 3-5 azonosított lehetőség</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold">30 perc - Nincs kötelezettség</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Image with Floating Badges */}
              <motion.div
                className="relative mt-8 lg:mt-0 space-y-8 lg:pt-16"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Main Glassmorphic Card */}
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

                  {/* Inner Image Container */}
                  <div className="rounded-[24px] overflow-hidden relative"
                       style={{
                         boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)'
                       }}>
                    <Image
                      src="/dijmentes-hero.png"
                      alt="Dijmentes Audit Preview"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Floating Badge 1 - Top Right */}
                  <motion.div
                    className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex"
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: `
                        0 8px 24px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold text-xs sm:text-sm">Ingyenes</span>
                    </div>
                  </motion.div>

                  {/* Floating Badge 2 - Bottom Left */}
                  <motion.div
                    className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: `
                        0 8px 24px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-semibold text-xs sm:text-sm">30 perc</span>
                    </div>
                  </motion.div>

                  {/* Floating Badge 3 - Top Left - Hidden on mobile */}
                  <motion.div
                    className="absolute top-8 -left-6 px-4 py-2.5 rounded-xl hidden lg:flex"
                    style={{
                      background: 'rgba(139, 92, 246, 0.25)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                      border: '1.5px solid rgba(167, 139, 250, 0.3)',
                      boxShadow: `
                        0 8px 24px rgba(139, 92, 246, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-semibold text-xs">Szakértői elemzés</span>
                    </div>
                  </motion.div>

                  {/* Floating Badge 4 - Bottom Right - Hidden on mobile */}
                  <motion.div
                    className="absolute bottom-12 -right-4 px-4 py-2.5 rounded-xl hidden lg:flex"
                    style={{
                      background: 'rgba(59, 130, 246, 0.25)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                      border: '1.5px solid rgba(96, 165, 250, 0.3)',
                      boxShadow: `
                        0 8px 24px rgba(59, 130, 246, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    animate={{ x: [3, -3, 3] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-semibold text-xs">Személyre szabott</span>
                      <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Ambient glow effect */}
                  <div className="absolute inset-0 rounded-[32px] pointer-events-none"
                       style={{
                         background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 70%)'
                       }} />
                </div>

                {/* Testimonials under the card */}
                <div className="mt-8 lg:mt-12">
                  <p className="text-xs sm:text-sm text-white/60 mb-4 sm:mb-6 font-medium text-center">
                    Megbíznak bennünk
                  </p>

                  {/* Static Testimonials */}
                  <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
                    {/* Dienes Martin - DMA */}
                    <div className="flex flex-col items-start space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <img
                        src="/cropped-dma-favicon-logo.png"
                        alt="DMA Logo"
                        className="h-8 w-20 object-contain brightness-0 invert"
                      />
                      <div>
                        <div className="text-white font-medium text-sm">Dienes Martin</div>
                        <div className="text-white/60 text-xs">Ügyvezető</div>
                      </div>
                    </div>

                    {/* Dr. Hajdú Noémi - Miskolci Egyetem */}
                    <div className="flex flex-col items-start space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <img
                        src="/ME_Logo-2 (1).png"
                        alt="Miskolci Egyetem Logo"
                        className="h-8 w-20 object-contain brightness-0 invert"
                      />
                      <div>
                        <div className="text-white font-medium text-sm">Dr. Hajdú Noémi</div>
                        <div className="text-white/60 text-xs">Rektorhelyettesi referens</div>
                      </div>
                    </div>

                    {/* Kecskeméti Ádám */}
                    <div className="flex flex-col items-start space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                      <div className="h-8 w-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">KÁ</span>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">Kecskeméti Ádám</div>
                        <div className="text-white/60 text-xs">Projekt menedzser</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>


          {/* Custom animations */}
          <style jsx global>{`
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-20px) translateX(10px); }
            }

            @keyframes float-medium {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-15px) translateX(-8px); }
            }

            @keyframes float-fast {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-25px) translateX(5px); }
            }

            .animate-float-slow {
              animation: float-slow 8s ease-in-out infinite;
            }

            .animate-float-medium {
              animation: float-medium 6s ease-in-out infinite;
              animation-delay: 2s;
            }

            .animate-float-fast {
              animation: float-fast 4s ease-in-out infinite;
              animation-delay: 1s;
            }

            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
            }
          `}</style>
        </section>

        {/* What You'll Discover Section */}
        <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  Mit fogsz megtudni 30 perc alatt?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Minden audit személyre szabott, de ezek a leggyakoribb területek, amiket átnézünk
                </p>
              </motion.div>
            </div>

            {/* Value Grid */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {/* Item 1 - Marketing Effectiveness */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Marketing üzeneteid hatékonysága
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Megmutatjuk, hogy az üzeneteid elég egyértelműek-e, és beszélnek-e a fájdalompontokhoz. Sok vállalkozás itt veszít 40-50% potenciális ügyfelet.
                </p>
              </motion.div>

              {/* Item 2 - Pricing Strategy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 sm:p-8 border border-emerald-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Árazási stratégia audit
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Túl olcsó vagy? Túl drága? Az árazás érzelmi döntés - megnézzük, hogy a tiéd kommunikálja-e az értéket, vagy csak a piacot követi.
                </p>
              </motion.div>

              {/* Item 3 - Conversion Barriers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Konverziós gátak azonosítása
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mi az a 3-5 pont az ügyfélútban, ahol az emberek kilépnek? Túl sok súrlódás van a vásárlásig, vagy túl kevés bizalomépítés?
                </p>
              </motion.div>

              {/* Item 4 - Target Audience */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sm:p-8 border border-orange-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Célközönség pontosítás
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "Mindenki" nem célközönség. Megnézzük, hogy elég specifikusan beszélsz-e a valódi döntéshozókhoz, vagy túl általános vagy.
                </p>
              </motion.div>

              {/* Item 5 - Competitive Position */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-cyan-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Versenyhelyzet gyorsaudit
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mit csinálnak jobban a versenytársaid? És mit csinálsz te jobban, csak nem kommunikálod elég erősen? Pozicionálási rések feltárása.
                </p>
              </motion.div>

              {/* Item 6 - Action Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 sm:p-8 border border-amber-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  3-5 konkrét lépés, holnapra
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Az audit végére kapsz egy priorizált listát - mi az a 3-5 változtatás, amit ha megcsinálsz, a legnagyobb hatással lesz a bevételeidre.
                </p>
              </motion.div>

            </div>

            {/* Bottom Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 sm:mt-16 text-center"
            >
              <div className="inline-flex items-start gap-3 p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-slate-200 max-w-3xl">
                <svg className="w-6 h-6 text-slate-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold mb-1">
                    Ez NEM egy általános tanácsadás
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Minden audit 100% személyre szabott. Megnézzük a weboldalad, social jelenléteid, és kifejezetten a TE piacodra, termékeidre fókuszálunk. Nincs két egyforma audit.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section - Corporate Professional Design */}
        <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  Hogyan működik?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Három egyszerű lépésben jutunk el a növekedési tervedhez
                </p>
              </motion.div>
            </div>

            {/* Steps Timeline */}
            <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-xl sm:text-2xl font-medium text-slate-700">1</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0 md:pt-2">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2 sm:mb-3">
                            Időpont foglalás
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Válassz egy számodra megfelelő időpontot az online naptárunkból. A foglalás néhány kattintás és teljesen ingyenes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-medium text-slate-700">2</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-medium text-gray-900 mb-3">
                            30 perces konzultáció
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Szakértőnk részletesen áttekinti veled a jelenlegi marketing és értékesítési folyamataidat, és azonosítja a növekedési lehetőségeket.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                      <span className="text-2xl font-medium text-slate-700">3</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-medium text-gray-900 mb-3">
                            Konkrét akcióterv
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Részletes, személyre szabott ajánlásokat kapsz, amelyeket azonnal elkezdhetsz alkalmazni a bevételeid növelése érdekében.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-20"
            >
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all px-8"
                onClick={() => document.getElementById('idopont-foglalas')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Igen, foglalok ingyenes auditot</span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  Ez neked szól, ha...
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Az ingyenes audit a legtöbb értéket azoknak adja, akik már dolgoznak a növekedésen
                </p>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">

              {/* IS FOR - Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-green-200 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Tökéletes, ha...
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        Van működő vállalkozásod, de <span className="font-semibold text-gray-900">érzed, hogy lehetne jobb</span>
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        Már próbáltál <span className="font-semibold text-gray-900">különböző marketing megoldásokat</span>, de nem tudod, melyik ér igazán
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        A bevételeid stagnálnak vagy <span className="font-semibold text-gray-900">nem nőnek elég gyorsan</span>
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Kíváncsi vagy</span>, hogyan használhatnád jobban a masterclassainkat vagy egyéb szolgáltatásainkat
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Nyitott vagy szakértői visszajelzésre</span>, még ha az kényelmetlenebb igazságokat is tartalmaz
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 leading-relaxed">
                        Kész vagy <span className="font-semibold text-gray-900">megvalósítani a változásokat</span>, ha azok értelmet adnak
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* NOT FOR - Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-gray-200 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Nem neked való, ha...
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        Még <span className="font-semibold text-gray-700">nincs kész terméked vagy szolgáltatásod</span>
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        Csak egy <span className="font-semibold text-gray-700">"varázslatos" megoldást keresel</span>, ami munka nélkül működik
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-700">Nem vagy nyitott változtatásra</span> az üzleti folyamataidban
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        Csak <span className="font-semibold text-gray-700">"általános tippeket"</span> keresel (arra van YouTube)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-700">Nincs időd vagy energiád</span> megvalósításra a következő 30 napban
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-gray-600 leading-relaxed">
                        Ingyen konzultációkat gyűjtögetsz, de <span className="font-semibold text-gray-700">sosem cselekszel</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12 sm:mt-16"
            >
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                Ha a bal oldalon felismerted magad 👈
              </p>
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all px-8"
                onClick={() => document.getElementById('idopont-foglalas')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Szeretném megnézni - foglalok most</span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Appointment Scheduling Section */}
        <section
          id="idopont-foglalas"
          className="relative py-32 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-medium text-white mb-6 tracking-tight">
                  Foglalj időpontot most
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Válaszd ki a számodra legmegfelelőbb időpontot, és induljon a növekedésed
                </p>
              </motion.div>
            </div>

            {/* Iframe Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Glassmorphic Container */}
              <div
                className="rounded-3xl p-6 lg:p-8"
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
                }}
              >
                {/* Inner White Container for Iframe */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full flex justify-center">
                    <iframe
                      src="https://app.minup.io/embed/elira?canStartPayment=true"
                      style={{
                        width: '100%',
                        maxWidth: '750px',
                        height: '590px',
                        border: 'none'
                      }}
                      frameBorder="0"
                      title="Időpont foglalás"
                    />
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">100% Ingyenes</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">30 perc</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm font-medium">Azonnali visszaigazolás</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Script for payment redirect */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener("message", (event) => {
                  if (event.origin !== "https://app.minup.io") return;
                  const data = event.data;
                  if (data.type === "redirect_to_payment") {
                    window.location.href = data.url;
                  }
                });
              `
            }}
          />
        </section>

        {/* Pre-Meeting Preparation Section */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
                  Hogyan készülj fel a találkozóra?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Néhány egyszerű lépéssel maximalizálhatod a konzultáció hatékonyságát
                </p>
              </motion.div>
            </div>

            {/* Preparation Checklist */}
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">

                {/* Checklist Item 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/60 h-full hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          Jelenlegi marketing helyzet
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Gondold át, milyen marketing csatornákat használsz jelenleg, és melyek működnek a legjobban.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Checklist Item 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/60 h-full hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          Üzleti célok
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Határozd meg, milyen bevételi vagy növekedési célokat szeretnél elérni a következő 3-6 hónapban.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Checklist Item 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/60 h-full hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          Célközönség
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Ismerd meg, kik az ideális ügyfeleid, milyen problémákat oldasz meg nekik, és hol érheted el őket.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Checklist Item 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/60 h-full hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mt-1">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          Kihívások és problémák
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Gyűjtsd össze azokat a marketing vagy értékesítési akadályokat, amikkel most szembesülsz.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-start gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-gray-900 font-medium mb-1">Ne aggódj, ha nem vagy teljesen felkészülve!</p>
                    <p className="text-gray-700 text-sm">
                      A konzultáció során végigvezetünk minden fontos kérdésen, és közösen feltérképezzük a lehetőségeket.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Addressing Objections */}
        <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-tight">
                  Gyakori kérdések
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Minden, amit tudnod kell mielőtt időpontot foglalsz
                </p>
              </motion.div>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-4xl mx-auto space-y-4">

              {/* FAQ 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <details className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Tényleg 100% ingyenes? Mi a "csapda"?
                    </h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">Igen, teljesen ingyenes.</span> Nincs kötelezettség, nem fogunk hívogatni, nincs rejtett költség. Azért csináljuk, mert így ismerheted meg a munkánkat és a hozzáállásunkat - ha tetszik, amit látsz, később döntesz, hogy akarsz-e velünk dolgozni. Ha nem, tök oké - kaptál 30 perc alatt 3-5 konkrét lépést ingyen. Win-win.
                    </p>
                  </div>
                </details>
              </motion.div>

              {/* FAQ 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <details className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Mennyire lesz ez személyre szabva? Nem csak "általános tippek"?
                    </h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">100% személyre szabott.</span> Előtte megnézzük a weboldalad, social média jelenléteid, és az audit alatt kifejezetten a TE helyzetedről, piacodról, termékeidről beszélünk.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Nincs két egyforma audit. Az általános tippekre van YouTube - mi konkrét, a te vállalkozásodra szabott javaslatokat adunk.
                    </p>
                  </div>
                </details>
              </motion.div>

              {/* FAQ 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <details className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Mit kell előkészítenem az audithoz?
                    </h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">Semmit sem muszáj.</span> Jó, ha van működő weboldad vagy social média jelenlét, amit megnézhetünk - de ha nincs, attól még tudunk segíteni.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Hasznos (de nem kötelező) ha van analytics adatod, marketing kampány eredményeid, vagy alapvető számok (forgalom, ügyfélszám, stb.) - de ha nincs, akkor is működik. Mi kérdezünk, te válaszolsz, együtt feltérképezzük a lehetőségeket.
                    </p>
                  </div>
                </details>
              </motion.div>

              {/* FAQ 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <details className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      Mi történik az audit után? Fognak nyomasztani, hogy vásároljak valamit?
                    </h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">Nem.</span> Kapsz egy összefoglalót emailben a legfontosabb pontokkal amit megbeszéltünk. Utána te döntöd el, akarsz-e tovább dolgozni velünk (masterclass, konzultáció, stb.) vagy sem.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Nem hívunk, nem spammeljük az inboxodat. Ha te nem jelentkezel, mi sem. Zero pressure - csak value.
                    </p>
                  </div>
                </details>
              </motion.div>

              {/* FAQ 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <details className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      30 perc elég lesz? Nem túl rövid ez?
                    </h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <span className="font-semibold text-gray-900">30 perc meglepően sok.</span> Mivel előre megnézzük a vállalkozásod, az audit alatt már célzottan beszélünk - nem kell hosszasan hátteret mesélned.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      500+ audit tapasztalatával tudjuk, hogy hol vannak jellemzően a gyenge pontok - így gyorsan azonosítjuk a 3-5 legfontosabb lépést. Ha szükség van hosszabb beszélgetésre, természetesen megbeszéljük.
                    </p>
                  </div>
                </details>
              </motion.div>

            </div>

            {/* Still Have Questions CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12 sm:mt-16"
            >
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                Van más kérdésed? Írd meg nekünk az audit során - válaszolunk mindenre!
              </p>
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all px-8"
                onClick={() => document.getElementById('idopont-foglalas')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Kérem az ingyenes auditot</span>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>

      <PremiumFooter />
    </div>
  );
}
