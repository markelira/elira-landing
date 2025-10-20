import { Button } from "../ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { buttonStyles, glassMorphism, animations } from "@/lib/design-tokens";

export function ConsistentPremiumHeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden -mt-20 pt-20"
      style={{
        background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="flex flex-col items-center gap-8 lg:gap-12 min-h-[80vh] justify-center">

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-center max-w-4xl">
            {/* Corporate Badge */}
            <motion.div
              {...animations.scaleIn}
              className="flex justify-center"
            >
              <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full text-sm sm:text-base min-h-[44px]"
                   style={{
                     background: 'rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(20px) saturate(150%)',
                     WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                     border: '1px solid rgba(255, 255, 255, 0.2)',
                     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-semibold text-white">Startupoktól Nagyvállalatokig</span>
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
                  <span className="text-white/90">Minden méretben</span>
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
                Ahol adatokból stratégia,
                <br />
                <span className="text-white">stratégiából növekedés lesz.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Összekötjük a bizonyított eredményekkel rendelkező szakértőket azokkal a cégvezetőkkel és csapatokkal, akik nem próbálgatni akarnak, hanem működő rendszerek mentén fejlődni.
              </p>
            </motion.div>

            {/* Image Card - Below Subheadline */}
            <motion.div
              className="relative w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Main Glassmorphic Card */}
              <div className="relative rounded-2xl sm:rounded-[32px] p-3 sm:p-4"
                   style={{
                     ...glassMorphism.light
                   }}>
                {/* Inner Image Container */}
                <div className="rounded-[24px] overflow-hidden relative"
                     style={{
                       boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)'
                     }}>
                  <Image
                    src="/hero-new-1.png"
                    alt="Elira Platform Preview"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                    priority
                    quality={90}
                    loading="eager"
                  />
                </div>

                {/* Floating Badge 1 - Top Right */}
                <motion.div
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex min-h-[44px] items-center"
                  style={{
                    ...glassMorphism.badge
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-sm sm:text-base">Online</span>
                  </div>
                </motion.div>

                {/* Floating Badge 2 - Bottom Left */}
                <motion.div
                  className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl min-h-[44px] flex items-center"
                  style={{
                    ...glassMorphism.badge
                  }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-white font-semibold text-sm sm:text-base">Masterclassok</span>
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
                    <span className="text-white font-semibold text-xs">Mért eredmények</span>
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
                    <span className="text-white font-semibold text-xs">Magyar piac</span>
                    <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Ambient glow effect */}
                <div className="absolute inset-0 rounded-[32px] pointer-events-none"
                     style={{
                       background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 70%)'
                     }} />
              </div>
            </motion.div>

            {/* Action Buttons - GLASSMORPHIC PILLS (DARK BACKGROUND VARIANTS) */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/dijmentes-audit" className="w-full sm:w-auto">
                <button className={`${buttonStyles.primaryDark} w-full sm:w-auto`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Díjmentes audit</span>
                </button>
              </Link>

              <Link href="/masterclass" className="w-full sm:w-auto">
                <button className={`${buttonStyles.secondaryDark} w-full sm:w-auto`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Masterclassok felfedezése</span>
                </button>
              </Link>
            </motion.div>

            {/* Trust Section - iOS Liquid Glass Card with RESULTS-BASED METRICS */}
            <motion.div
              className="pt-4 sm:pt-6 lg:pt-8 max-w-2xl mx-auto w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* SVG Filter for Liquid Glass Distortion */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <filter id="liquidGlassDistortion" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.015 0.02"
                      numOctaves="3"
                      result="noise"
                      seed="2"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="12"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displacement"
                    />
                    <feGaussianBlur in="displacement" stdDeviation="0.8" result="blur" />
                    <feSpecularLighting
                      in="blur"
                      surfaceScale="3"
                      specularConstant="1.2"
                      specularExponent="20"
                      lightingColor="#ffffff"
                      result="specular"
                    >
                      <fePointLight x="-100" y="-100" z="200" />
                    </feSpecularLighting>
                    <feComposite
                      in="specular"
                      in2="SourceAlpha"
                      operator="in"
                      result="specularClip"
                    />
                    <feComposite
                      in="SourceGraphic"
                      in2="specularClip"
                      operator="arithmetic"
                      k1="0"
                      k2="1"
                      k3="0.3"
                      k4="0"
                    />
                  </filter>
                </defs>
              </svg>

              {/* Liquid Glass Container */}
              <div className="relative">
                {/* Main Glass Card */}
                <div
                  className="relative px-5 sm:px-7 py-5 sm:py-6 rounded-2xl sm:rounded-[24px] overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(1.1)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: `
                      0 8px 32px 0 rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
                      inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
                      0 0 0 0.5px rgba(255, 255, 255, 0.1)
                    `,
                    filter: 'url(#liquidGlassDistortion)',
                  }}
                >
                  {/* Organic gradient overlays for depth */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
                      `
                    }}
                  />

                  {/* Title */}
                  <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-5 font-medium text-center tracking-wide">
                    Megbíznak bennünk
                  </p>

                  {/* Testimonials in horizontal layout */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 lg:gap-10">
                    {/* Dienes Martin - DMA */}
                    <div className="flex flex-col items-center space-y-2 group">
                      <div className="relative">
                        <img
                          src="/cropped-dma-favicon-logo.png"
                          alt="DMA Logo"
                          className="h-6 w-14 object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-xs sm:text-sm">Dienes Martin</div>
                        <div className="text-white/60 text-[10px] sm:text-xs">Ügyvezető</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-10 bg-white/20" />

                    {/* Dr. Hajdú Noémi - Miskolci Egyetem */}
                    <div className="flex flex-col items-center space-y-2 group">
                      <div className="relative">
                        <img
                          src="/ME_Logo-2 (1).png"
                          alt="Miskolci Egyetem Logo"
                          className="h-6 w-14 object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-xs sm:text-sm">Dr. Hajdú Noémi</div>
                        <div className="text-white/60 text-[10px] sm:text-xs">Rektorhelyettesi referens</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-10 bg-white/20" />

                    {/* Kecskeméti Ádám */}
                    <div className="flex flex-col items-center space-y-2 group">
                      <div className="h-6 w-6 bg-white/15 border border-white/30 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                        <span className="text-white font-bold text-xs">KÁ</span>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-xs sm:text-sm">Kecskeméti Ádám</div>
                        <div className="text-white/60 text-[10px] sm:text-xs">Projekt menedzser</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outer glow for depth */}
                <div
                  className="absolute inset-0 rounded-2xl sm:rounded-[24px] pointer-events-none -z-10"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
