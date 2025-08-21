'use client';

import React, { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

type MotionCardProps = CardProps & MotionProps;

const Card = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ variant = 'default', padding = 'md', children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variants = {
      default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20',
      elevated: 'bg-white shadow-lg hover:shadow-xl border-0',
    };

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={scaleIn}
        whileHover={{ y: -2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;