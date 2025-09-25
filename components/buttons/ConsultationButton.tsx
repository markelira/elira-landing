'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ConsultationButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const ConsultationButton: React.FC<ConsultationButtonProps> = ({
  className = '',
  variant = 'secondary',
  size = 'md',
  showIcon = true
}) => {
  const handleClick = () => {
    window.open('https://app.minup.io/book/elira/service/49277', '_blank');
  };

  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl focus:ring-teal-500",
    secondary: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl focus:ring-orange-500",
    outline: "border-2 border-teal-500 text-teal-600 hover:bg-teal-50 hover:border-teal-600 focus:ring-teal-500"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <span className="text-lg">🗣️</span>}
      <span className="font-semibold">Díjmentes tanácsadás</span>
    </motion.button>
  );
};

export default ConsultationButton;