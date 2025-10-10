'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { buttonStyles } from '@/lib/design-tokens';

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMasterclass, setShowMasterclass] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 800px (after hero)
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 800);

      // Alternate between CTAs based on scroll position
      // Show "Masterclass" CTA after 4000px scroll
      setShowMasterclass(scrolled > 4000);
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCTA = showMasterclass
    ? {
        href: '/masterclass',
        label: 'Masterclassok felfedezése',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      }
    : {
        href: '/dijmentes-audit',
        label: 'Díjmentes audit',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-0 right-0 z-40 md:hidden px-4"
        >
          {/* Glassmorphic container */}
          <div
            className="rounded-2xl p-3"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            }}
          >
            <Link href={currentCTA.href}>
              <motion.button
                className={`${buttonStyles.primaryLight} w-full text-base px-8 py-4`}
                whileTap={{ scale: 0.97 }}
              >
                {currentCTA.icon}
                <span>{currentCTA.label}</span>
              </motion.button>
            </Link>

            {/* Indicator Dots - Premium style */}
            <div className="flex items-center justify-center gap-2 mt-3 pb-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  !showMasterclass ? 'bg-gray-900 w-8' : 'bg-gray-300 w-1'
                }`}
              />
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  showMasterclass ? 'bg-gray-900 w-8' : 'bg-gray-300 w-1'
                }`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
