'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Background track */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[100]"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #16222F 0%, #466C95 50%, #16222F 100%)',
          boxShadow: '0 2px 8px rgba(22, 34, 47, 0.3)'
        }}
      />
    </>
  );
}
