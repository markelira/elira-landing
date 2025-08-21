'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1">
      {/* Background track */}
      <div className="w-full h-full bg-gray-200/30 backdrop-blur-sm" />
      
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r 
                   from-teal-500 via-cyan-500 to-teal-600
                   shadow-lg shadow-teal-500/20"
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 40,
          mass: 0.5
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 right-0 h-full w-8 
                   bg-gradient-to-l from-white/60 to-transparent
                   pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.05 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          transform: `translateX(${(scrollProgress * 100)}%)`,
          right: `${100 - (scrollProgress * 100)}%`
        }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;