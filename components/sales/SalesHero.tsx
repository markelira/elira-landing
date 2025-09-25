'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAnalytics from '@/hooks/useAnalytics';
import PurchaseButton from '@/components/course/PurchaseButton';
import ConsultationButton from '@/components/buttons/ConsultationButton';

const SalesHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackButton } = useAnalytics();

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <header className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-teal-800 to-teal-700" role="banner">
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
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pt-48 lg:pb-24">
        <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-12rem)]">
          
          {/* Header Content */}
          <div className="text-white space-y-8 sm:space-y-12 mb-8 sm:mb-12 lg:mb-16">
            {/* MAIN HEADLINE */}
            <div className="relative">
              {/* Attention-grabbing button for consultation */}
              <motion.button
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => {
                  const consultationSection = document.getElementById('marketing-sebeszet-section');
                  if (consultationSection) {
                    consultationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex flex-col items-center gap-1 sm:gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg mb-4 sm:mb-6 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xl sm:text-2xl">🔥</span>
                  <span className="uppercase tracking-wide text-sm sm:text-base">DÍJMENTES TANÁCSADÁS</span>
                  <span className="text-xl sm:text-2xl">🔥</span>
                </div>
                <span className="text-xs sm:text-sm font-normal opacity-90 group-hover:opacity-100 transition-opacity text-center">
                  Korlátozott helyek - Kattints ide!
                </span>
              </motion.button>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white relative px-4 sm:px-0"
              >
                {/* Glowing effect behind text - Mobile responsive */}
                <span className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent blur-sm opacity-50">
                  3x több érdeklődő
                </span>
                
                <span className="relative z-10">3x több érdeklődő</span>
                
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent font-black"
                >
                  30 nap alatt
                </motion.span>
              </motion.h1>

            </div>

            {/* SIMPLE VALUE PROP */}
            <p className="text-lg sm:text-xl text-white/80 font-normal max-w-3xl mx-auto">
              Megérted, mit akar valójában a vevőd, és ezzel többet adsz el <span className="italic">(akár drágábban is)</span> anélkül, hogy bármit újat kellene fejlesztened.
            </p>

            {/* KINEK SZÓL SECTION */}
            <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Ez Neked Szól */}
                <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30">
                  <h3 className="text-xl font-bold text-green-300 mb-4 text-left">Ez neked szól, ha...</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Webshopod van és évi 50M+ HUF forgalmat csinálsz</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Online szolgáltatást nyújtasz és van bevételed</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Vendéglátóhely tulajdonosa vagy és online rendelést akarsz növelni</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Marketing költségvetésed van, de nem hozza a várt eredményt</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Tudod, hogy az AI-ban van a jövő, de nem tudod, hogyan alkalmazd</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 text-lg flex-shrink-0">✅</span>
                      <p className="text-white/90 text-sm text-left">Elakadtál a jelenlegi bevételi szinteden</p>
                    </div>
                  </div>
                </div>

                {/* Ez NEM Neked Szól */}
                <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30">
                  <h3 className="text-xl font-bold text-red-300 mb-4 text-left">Ez NEM neked szól, ha...</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">"Gyors pénz" megoldásokat keresel - ez nem gazdagodj meg gyorsan séma</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Nem vagy hajlandó fejleszteni a jelenlegi módszereiden</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Nincs időd 1-2 órát hetente a masterclassra</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Azt várod, hogy "mágikusan" működjön anélkül, hogy alkalmaznád</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Nem akarsz befektetni saját magadba és a tudásodba</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Szkeptikus vagy az AI és a vevőpszichológia kapcsán</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Azt hiszed, hogy már mindent tudsz a marketingről</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-lg flex-shrink-0">❌</span>
                      <p className="text-white/90 text-sm text-left">Csak nézegetni akarod, de nem csinálni</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* URGENCY WARNING */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-red-400/50">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <p className="text-red-200 font-bold text-lg">CSAK 10 HELYRE KORLÁTOZOTT!</p>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-white/90 text-center text-sm">
                <span className="font-semibold">Miért csak 10 főnek?</span> Azért, mert a személyes mentorálás, és az online konzultációk minőségéből - amik a kurzushoz járnak - nem akarunk engedni
              </p>
            </div>

            {/* WHAT'S INCLUDED CARDS */}
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">Mit kapsz a csomagban, a kurzus mellé?</h3>
              
              {/* Bundles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="text-lg font-bold text-white mb-2">Eredmény 48 órán belül - 48 órás launch</h4>
                  <p className="text-white/80 text-sm mb-4">Amely az első 48 órában látható eredményeket hoz, és garantálja hogy az első hónapban megtérül a befektetésed.</p>
                  <button 
                    onClick={() => window.location.href = '#bundles'}
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    Bővebben →
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">⭐</div>
                  <h4 className="text-lg font-bold text-white mb-2">Átütő sikertámogatás tervrajz – VIP támogatási ökoszisztéma 4 hétig</h4>
                  <p className="text-white/80 text-sm mb-4">Biztosítjuk, hogy minden egyes lépést megértesz és alkalmazni tudsz, még ha eddig mindig elakadtál hasonló képzéseknél.</p>
                  <button 
                    onClick={() => window.location.href = '#bundles'}
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    Bővebben →
                  </button>
                </div>
              </div>

              {/* Bonuses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:from-green-500/25 hover:to-emerald-500/25 transition-all duration-300">
                  <div className="text-3xl mb-3">🎁</div>
                  <h4 className="text-lg font-bold text-white mb-2">BÓNUSZ #1: 6db COPY-PASTE PROFIT GENERÁTOR"</h4>
                  <p className="text-white/80 text-sm mb-4">Kész AI promptok új kampányokhoz, blog posztokhoz...</p>
                  <button 
                    onClick={() => window.location.href = '#bonuses'}
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    Bővebben →
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:from-purple-500/25 hover:to-pink-500/25 transition-all duration-300">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="text-lg font-bold text-white mb-2">BÓNUSZ #2: VERSENYTÁRS VADÁSZ RENDSZER</h4>
                  <p className="text-white/80 text-sm mb-4">Versenytárs elemzés + 1:1 meeting az eredményekkel.</p>
                  <button 
                    onClick={() => window.location.href = '#bonuses'}
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    Bővebben →
                  </button>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30 hover:from-orange-500/25 hover:to-red-500/25 transition-all duration-300">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h4 className="text-lg font-bold text-white mb-2">BÓNUSZ #3: PROFIT MENTÉS GARANCIA</h4>
                  <p className="text-white/80 text-sm mb-4">1 év korlátlan support + kampány átírási garancia.</p>
                  <button 
                    onClick={() => window.location.href = '#bonuses'}
                    className="text-yellow-300 hover:text-yellow-200 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    Bővebben →
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Buttons - Mobile First */}
          <div className="mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-0">
            <div className="bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <PurchaseButton
                  courseId="ai-copywriting-course"
                  className="transform hover:scale-105 transition-transform duration-300 flex-1 w-full"
                  onPurchaseStart={() => trackButton('Grand Slam Purchase', 'sales-hero-purchase-button')}
                />
                <div className="text-gray-400 text-base sm:text-lg font-bold hidden sm:block">VAGY</div>
                <ConsultationButton 
                  className="flex-1 w-full"
                  variant="secondary"
                  size="lg"
                />
              </div>
              <div className="mt-3 sm:mt-4 text-center text-gray-600 text-xs sm:text-sm">
                📞 Nem vagy biztos? Beszéljük meg előtte!
              </div>
            </div>
          </div>


        </div>
        </div>
      </div>
      

      
      {/* Subtle Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50/20 to-transparent z-20 pointer-events-none" />
      
    </header>
  );
};

export default SalesHero;