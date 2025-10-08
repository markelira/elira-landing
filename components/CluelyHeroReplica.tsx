'use client';

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export function CluelyHeroReplica() {
  // Animation states adapted for employee training focus
  const animationStates = ['data', 'strategy', 'growth', 'results', 'success'];
  const [currentActive, setCurrentActive] = useState('data');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % animationStates.length;
        setCurrentActive(animationStates[nextIndex]);
        return nextIndex;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* V-shaped flashlight effect from below */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-32 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            rgba(255,255,255,0.8) 0%, 
            rgba(255,255,255,0.6) 20%, 
            rgba(255,255,255,0.3) 60%, 
            transparent 100%)`,
          clipPath: 'polygon(45% 0%, 55% 0%, 80% 100%, 20% 100%)',
          filter: 'blur(2px)'
        }}
      ></div>
      {/* SVG Filter for Liquid Glass Refraction Effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquidGlassFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting result="specOut" in="blur" specularConstant="1.5" specularExponent="20" lightingColor="white">
              <fePointLight x="-50" y="-50" z="200" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
            <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>

      {/* Video Background - Hidden but available for masking */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
      >
        <source src="/u9627734718_straight_on_eye_level_frame_of_a_90s_computer_set_6d598f5c-3c75-4361-a3aa-abd99a4153f2_1.mp4" type="video/mp4" />
      </video>

      {/* Content - Center aligned */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          
          {/* Main Focus Communication - Matching Hero Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2
              className="text-5xl lg:text-6xl font-semibold leading-tight mb-4"
              style={{
                color: '#374151',
                textShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.05)'
              }}
            >
              Tanuld meg, használd ma.
              <br />
              <span style={{
                color: '#374151',
                textShadow: 'inset 0 2px 4px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.06)'
              }}>Eredmények holnap.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gyakorlati rendszerek, azonnal alkalmazható sablonok, mérhető üzleti eredmények.
            </p>
          </motion.div>

          {/* Main Animated Text - Center aligned */}
          <div className="space-y-1 text-center">
            {/* Line 1: Képzés. Fejlesztés. */}
            <div className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[1.1] tracking-tight">
              <span 
                className={`text-item transition-all duration-700 ease-in-out relative inline-block ${
                  currentActive === 'data' ? 'video-text-active' : 'text-3d-effect'
                }`}
                style={{
                  color: currentActive === 'data' ? 'transparent' : '#9ca3af',
                  background: currentActive === 'data' 
                    ? 'url(/sam7785._Maharashtra_Village_revenue_officer_approving_applic_86113351-96e4-479b-88ce-0665a0698a5c_0.gif)' 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: currentActive === 'data' ? 'text' : 'initial',
                  backgroundClip: currentActive === 'data' ? 'text' : 'initial',
                  WebkitTextFillColor: currentActive === 'data' ? 'transparent' : '#9ca3af',
                  opacity: currentActive === 'data' ? 1 : 0.5,
                  willChange: 'color, background, opacity'
                }}
              >
Átadható rendszerek.
              </span>
              <span className="mx-2"></span>
              <span 
                className={`text-item transition-all duration-700 ease-in-out relative inline-block ${
                  currentActive === 'strategy' ? 'video-text-active' : 'text-3d-effect'
                }`}
                style={{
                  color: currentActive === 'strategy' ? 'transparent' : '#9ca3af',
                  background: currentActive === 'strategy' 
                    ? 'url(/u2773132747_A_female_busy_working_on_aher_laptop_camera_pans__fa42fc93-0acf-4388-922b-614c28b60e44_0.gif)' 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: currentActive === 'strategy' ? 'text' : 'initial',
                  backgroundClip: currentActive === 'strategy' ? 'text' : 'initial',
                  WebkitTextFillColor: currentActive === 'strategy' ? 'transparent' : '#9ca3af',
                  opacity: currentActive === 'strategy' ? 1 : 0.5,
                  willChange: 'color, background, opacity'
                }}
              >
Gyakorlati képzés.
              </span>
            </div>

            {/* Line 2: Tudás. Hatékonybb. */}
            <div className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[1.1] tracking-tight">
              <span 
                className={`text-item transition-all duration-700 ease-in-out relative inline-block ${
                  currentActive === 'growth' ? 'video-text-active' : 'text-3d-effect'
                }`}
                style={{
                  color: currentActive === 'growth' ? 'transparent' : '#9ca3af',
                  background: currentActive === 'growth' 
                    ? 'url(/7figuremd_03924_A_transparent_screen_made_of_a_Bleue_glass_ma_25c9e971-67a0-4f5e-83b8-d904c1468940_0.gif)' 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: currentActive === 'growth' ? 'text' : 'initial',
                  backgroundClip: currentActive === 'growth' ? 'text' : 'initial',
                  WebkitTextFillColor: currentActive === 'growth' ? 'transparent' : '#9ca3af',
                  opacity: currentActive === 'growth' ? 1 : 0.5,
                  willChange: 'color, background, opacity'
                }}
              >
Skálázható növekedés.
              </span>
              <span className="mx-2"></span>
              <span 
                className={`text-item transition-all duration-700 ease-in-out relative inline-block ${
                  currentActive === 'results' ? 'video-text-active' : 'text-3d-effect'
                }`}
                style={{
                  color: currentActive === 'results' ? 'transparent' : '#9ca3af',
                  background: currentActive === 'results' 
                    ? 'url(/u7228611778_humans_working_in_office_large_people_in_with_lap_3067eb64-7f37-408f-844e-ce13d42b6495_0.gif)' 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: currentActive === 'results' ? 'text' : 'initial',
                  backgroundClip: currentActive === 'results' ? 'text' : 'initial',
                  WebkitTextFillColor: currentActive === 'results' ? 'transparent' : '#9ca3af',
                  opacity: currentActive === 'results' ? 1 : 0.5,
                  willChange: 'color, background, opacity'
                }}
              >
Mérhető eredmények.
              </span>
            </div>

            {/* Line 3: Egyszerű megoldás. */}
            <div className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[1.1] tracking-tight">
              <span 
                className={`text-item transition-all duration-700 ease-in-out relative inline-block ${
                  currentActive === 'success' ? 'video-text-active' : 'text-3d-effect'
                }`}
                style={{
                  color: currentActive === 'success' ? 'transparent' : '#9ca3af',
                  background: currentActive === 'success' 
                    ? 'url(/u9627734718_vcr_fottage_of_a_modern_corporate_office_in_new_y_0edb4b61-2e2c-44c6-b159-dd8aa581573e_0.gif)' 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: currentActive === 'success' ? 'text' : 'initial',
                  backgroundClip: currentActive === 'success' ? 'text' : 'initial',
                  WebkitTextFillColor: currentActive === 'success' ? 'transparent' : '#9ca3af',
                  opacity: currentActive === 'success' ? 1 : 0.5,
                  willChange: 'color, background, opacity'
                }}
              >
Kompetens csapat.
              </span>
            </div>
          </div>

          {/* CTA Buttons - From Hero */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="cta-primary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Próbáld ki ingyen</span>
            </Button>
            
            <Button 
              size="lg" 
              className="cta-secondary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Masterclassok felfedezése</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Seamless fade-out effect - matching hero */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .text-6xl.lg\\:text-8xl.xl\\:text-9xl {
            font-size: 4rem;
          }
        }
        
        @media (max-width: 767px) {
          .text-6xl.lg\\:text-8xl.xl\\:text-9xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }
          
          .space-y-2 > div {
            margin-bottom: 0.5rem;
          }
        }

        .text-item {
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .text-3d-effect {
          /* No shadow effects */
        }

        .video-text-active {
          /* Clean video text display with subtle liquid glass around video */
          position: relative;
        }

        .video-text-active::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, 
            rgba(255,255,255,0.1) 0%, 
            rgba(255,255,255,0.02) 50%, 
            rgba(255,255,255,0.08) 100%);
          backdrop-filter: blur(4px) brightness(1.05);
          -webkit-backdrop-filter: blur(4px) brightness(1.05);
          border-radius: 4px;
          opacity: 0.6;
          z-index: -1;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}