'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickAccessCardProps {
  icon: string;
  title: string;
  subtitle: string;
  gradient: string;
  onClick: () => void;
  fullWidth?: boolean;
  isSelected?: boolean;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ 
  icon, 
  title, 
  subtitle, 
  gradient, 
  onClick,
  fullWidth = false,
  isSelected = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl p-4
        bg-white shadow-md hover:shadow-xl
        transform hover:-translate-y-1 transition-all duration-300
        cursor-pointer border border-gray-100
        ${fullWidth ? 'col-span-2' : ''}
      `}
    >
      {/* Gradient Border on Hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${gradient}
        opacity-0 group-hover:opacity-10 transition-opacity
      `} />
      
      {/* Content */}
      <div className="relative z-10 text-left">
        {/* Icon */}
        <div className="text-3xl mb-2">{icon}</div>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-xs text-gray-600 mt-1">
          {subtitle}
        </p>
        
        {/* Arrow Indicator or Checkmark */}
        <div className="absolute top-2 right-2">
          {isSelected ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-6 h-6 bg-green-500 rounded-full 
                         flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <div className="w-6 h-6 rounded-full 
                            bg-gray-100 group-hover:bg-gradient-to-r 
                            group-hover:from-teal-500 group-hover:to-cyan-500
                            flex items-center justify-center
                            transform group-hover:translate-x-1 transition-all">
              <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-white" />
            </div>
          )}
        </div>
      </div>
      
      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 -top-20 -left-20 w-40 h-40 
                      bg-white opacity-0 group-hover:opacity-20 
                      rotate-45 transition-all duration-500
                      group-hover:translate-x-full group-hover:translate-y-full" />
    </button>
  );
};

export default QuickAccessCard;