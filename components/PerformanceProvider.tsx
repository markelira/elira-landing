'use client';

import React, { createContext, useContext } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';

interface PerformanceConfig {
  reduceMotion: boolean;
  disableScrollAnimations: boolean;
  fastTransitions: boolean;
}

const PerformanceContext = createContext<PerformanceConfig>({
  reduceMotion: false,
  disableScrollAnimations: false,
  fastTransitions: false
});

export const usePerformanceConfig = () => useContext(PerformanceContext);

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Performance optimizations for fast loading
  const config: PerformanceConfig = {
    reduceMotion: true, // Always disable for maximum performance
    disableScrollAnimations: true, // Disable scroll-triggered animations
    fastTransitions: true // Use only fast, essential transitions
  };

  // Global transition settings for maximum performance
  const fastTransition = {
    duration: 0.15, // Ultra-fast transitions (was 0.3-0.8s)
    ease: "easeOut"
  };

  const noTransition = {
    duration: 0,
    ease: "linear"
  };

  return (
    <PerformanceContext.Provider value={config}>
      <MotionConfig
        reducedMotion="always" // Disable all non-essential animations
        transition={config.fastTransitions ? fastTransition : noTransition}
      >
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
};

// Utility function for performance-optimized motion props
export const fastMotionProps = {
  initial: { opacity: 1 }, // Remove opacity animations
  animate: { opacity: 1 },
  transition: { duration: 0 },
  // Remove all scroll-based animations
  whileInView: undefined,
  viewport: undefined
};

// Zero-animation version for maximum performance
export const noMotionProps = {
  initial: false,
  animate: false,
  exit: false,
  transition: { duration: 0 },
  whileHover: undefined,
  whileInView: undefined,
  viewport: undefined
};