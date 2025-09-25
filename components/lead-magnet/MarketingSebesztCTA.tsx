"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export interface MarketingSebesztCTAProps {
  // Appearance
  variant?: 'primary' | 'secondary' | 'minimal' | 'floating';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // Content
  text?: string;
  subtext?: string;
  showUrgency?: boolean;
  showBenefits?: boolean;
  
  // Behavior
  onClick?: () => void;
  href?: string;
  openModal?: boolean;
  
  // Styling
  className?: string;
  fullWidth?: boolean;
  
  // Tracking
  source?: string;
  campaign?: string;
}

const MarketingSebesztCTA: React.FC<MarketingSebesztCTAProps> = ({
  variant = 'primary',
  size = 'md',
  text = 'Igen, kérem az ingyenes Marketing Sebészetet!',
  subtext,
  showUrgency = true,
  showBenefits = false,
  onClick,
  href = '/ingyenes-marketing-sebeszet',
  openModal = false,
  className = '',
  fullWidth = false,
  source = 'cta_button',
  campaign = 'marketing_sebeszet'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-50',
    minimal: 'bg-transparent text-teal-600 hover:text-teal-700 underline underline-offset-4',
    floating: 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-2xl hover:shadow-3xl fixed bottom-4 right-4 z-50 rounded-full'
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    
    // Track click event
    if (typeof window !== 'undefined') {
      // Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'click', {
          event_category: 'engagement',
          event_label: 'marketing_sebeszet_cta',
          source: source,
          campaign: campaign
        });
      }

      // Facebook Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: 'marketing_sebeszet_cta',
          source: source
        });
      }
    }
  };

  const buttonContent = (
    <motion.button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${variant === 'floating' ? '' : 'rounded-lg'}
        font-bold transition-all duration-300 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
      whileHover={{ scale: variant === 'floating' ? 1.1 : 1.05 }}
      whileTap={{ scale: variant === 'floating' ? 1.05 : 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className="flex items-center justify-center space-x-2">
        {variant === 'floating' ? (
          <Zap className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} />
        ) : (
          <>
            <span>{text}</span>
            <ArrowRight className={`${
              size === 'sm' ? 'w-4 h-4' : 
              size === 'md' ? 'w-5 h-5' : 
              size === 'lg' ? 'w-6 h-6' : 'w-7 h-7'
            } transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </>
        )}
      </span>
    </motion.button>
  );

  if (variant === 'floating') {
    return buttonContent;
  }

  return (
    <div className={`${fullWidth ? 'w-full' : ''} space-y-4`}>
      {/* Main CTA Button */}
      {href && !onClick ? (
        <Link 
          href={`${href}?utm_source=${source}&utm_campaign=${campaign}`}
          className="block"
        >
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}

      {/* Subtext */}
      {subtext && (
        <p className="text-sm text-gray-600 text-center">
          {subtext}
        </p>
      )}

      {/* Urgency indicator */}
      {showUrgency && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center space-x-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200"
        >
          <Clock className="w-4 h-4" />
          <span className="font-medium">
            Csak havi 15 konzultációt vállalok! Még {15 - Math.floor(Math.random() * 5)} szabad hely van.
          </span>
        </motion.div>
      )}

      {/* Benefits */}
      {showBenefits && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>100% ingyenes</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>Azonnali eredmény</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>30 perces konzultáció</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MarketingSebesztCTA;