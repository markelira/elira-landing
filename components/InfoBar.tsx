'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, ArrowRight } from 'lucide-react';

const InfoBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set target date to October 6, 2025
      const targetDate = new Date('2025-10-06T09:00:00').getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide on mobile/tablet (below lg breakpoint)
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px - hide the bar
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show the bar
          setIsVisible(true);
        }
      } else {
        // Always visible on desktop
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -100,
        height: isVisible ? 'auto' : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-[52px] sm:top-[68px] lg:top-[76px] left-0 right-0 z-30 bg-gradient-to-br from-teal-800 to-teal-700 text-white shadow-lg overflow-hidden"
    >
      <div className="container mx-auto px-4 py-2 lg:py-3">
        {/* Mobile-optimized compact layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between gap-2">
            {/* Compact date info */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium">Okt 6</span>
              <span className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full text-red-200">10 hely</span>
            </div>
            
            {/* Compact timer */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-white/80" />
              <div className="flex gap-1 text-sm font-mono">
                <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.days}n</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.hours.toString().padStart(2, '0')}ó</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.minutes.toString().padStart(2, '0')}p</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-3">
          
          {/* Left: Masterclass Date with Spots Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white/10 rounded-full p-1.5">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm">Masterclass indulás:</span>
                <span className="font-semibold">Október 6</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-7">
              <Users className="w-3 h-3 text-white/60" />
              <span className="text-xs text-white/70">MAX. 10 hely elérhető</span>
              <span className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full text-red-200">Korlátozott</span>
            </div>
          </motion.div>

          {/* Center: Timer */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Clock className="w-4 h-4 text-white/80" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/80">Indulásig még van:</span>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-lg">
                    {timeLeft.days}
                  </div>
                  <span className="text-xs text-white/60 mt-0.5">nap</span>
                </div>
                <span className="text-white/60 text-lg self-start mt-1">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-lg">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs text-white/60 mt-0.5">óra</span>
                </div>
                <span className="text-white/60 text-lg self-start mt-1">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-lg">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs text-white/60 mt-0.5">perc</span>
                </div>
                <span className="text-white/60 text-lg self-start mt-1">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-lg">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs text-white/60 mt-0.5">mp</span>
                </div>
              </div>
            </div>
          </motion.div>


          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="hidden lg:block"
          >
            <button
              onClick={() => {
                const purchaseButton = document.querySelector('button[class*="purchase"]');
                if (purchaseButton) {
                  (purchaseButton as HTMLButtonElement).click();
                } else {
                  const masterclassSection = document.getElementById('masterclass');
                  if (masterclassSection) {
                    masterclassSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Jelentkezés a masterclassra</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default InfoBar;