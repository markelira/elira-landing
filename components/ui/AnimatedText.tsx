'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  variant?: 'word' | 'character' | 'line';
  className?: string;
  stagger?: boolean;
  delay?: number;
  as?: React.ElementType;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  variant = 'word',
  className = '',
  stagger = true,
  delay = 0,
}) => {
  const textVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay } },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  if (variant === 'line') {
    return (
      <motion.div
        className={className}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ delay }}
      >
  {text}
      </motion.div>
    );
  }

  const splits = variant === 'word' ? text.split(' ') : text.split('');

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={stagger ? staggerContainer : textVariants}
    >
      {splits.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className={variant === 'word' ? 'inline-block mr-2' : 'inline-block'}
          transition={{ delay: delay + index * 0.05 }}
        >
          {variant === 'character' && item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;