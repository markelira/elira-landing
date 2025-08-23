'use client';

import React, { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import TouchTarget from './TouchTarget';

interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  haptic?: boolean;
  children: React.ReactNode;
}

type MotionButtonProps = MobileButtonProps & MotionProps;

/**
 * MobileButton - Touch-optimized button with enforced minimum sizes
 * 
 * Minimum heights:
 * - sm: 44px (iOS minimum)
 * - md: 48px (Android recommended)
 * - lg: 52px (Accessibility best practice)
 */
const MobileButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      haptic = true,
      children,
      className = '',
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles with mobile-first approach
    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'rounded-xl font-medium',
      'transition-all duration-200',
      'touch-manipulation tap-highlight-transparent',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none',
      fullWidth && 'w-full'
    );

    // Variant styles with better contrast for mobile
    const variants = {
      primary: cn(
        'bg-gradient-to-r from-teal-700 to-cyan-600',
        'hover:from-teal-800 hover:to-cyan-700',
        'active:from-teal-900 active:to-cyan-800',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-teal-500'
      ),
      secondary: cn(
        'bg-white border-2 border-gray-300',
        'hover:bg-gray-50 active:bg-gray-100',
        'text-gray-900',
        'focus:ring-gray-500'
      ),
      ghost: cn(
        'bg-transparent',
        'hover:bg-gray-100 active:bg-gray-200',
        'text-gray-900',
        'focus:ring-gray-500'
      ),
      danger: cn(
        'bg-red-600 hover:bg-red-700 active:bg-red-800',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-red-500'
      ),
      success: cn(
        'bg-green-600 hover:bg-green-700 active:bg-green-800',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-green-500'
      ),
      glow: cn(
        'bg-gradient-to-r from-purple-600 to-pink-600',
        'hover:from-purple-700 hover:to-pink-700',
        'active:from-purple-800 active:to-pink-800',
        'text-white shadow-lg hover:shadow-xl',
        'focus:ring-purple-500',
        'animate-gradient-x'
      ),
    };

    // Size styles with enforced minimums for mobile
    const sizes = {
      sm: cn(
        'min-h-[44px] px-4 py-2.5',
        'text-sm',
        icon && !children && 'min-w-[44px] px-2.5' // Square for icon-only
      ),
      md: cn(
        'min-h-[48px] px-5 py-3',
        'text-base',
        icon && !children && 'min-w-[48px] px-3' // Square for icon-only
      ),
      lg: cn(
        'min-h-[52px] px-6 py-3.5',
        'text-lg',
        icon && !children && 'min-w-[52px] px-3.5' // Square for icon-only
      ),
    };

    // Handle haptic feedback
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Trigger haptic feedback if available
      if (haptic && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    const buttonContent = (
      <>
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div 
              className={cn(
                'border-2 border-current border-t-transparent rounded-full animate-spin',
                size === 'sm' && 'w-4 h-4',
                size === 'md' && 'w-5 h-5',
                size === 'lg' && 'w-6 h-6'
              )}
            />
            {children && <span>Loading...</span>}
          </div>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={cn(
                'flex-shrink-0',
                children && 'mr-2'
              )}>
                {icon}
              </span>
            )}
            {children && <span className="truncate">{children}</span>}
            {icon && iconPosition === 'right' && (
              <span className={cn(
                'flex-shrink-0',
                children && 'ml-2'
              )}>
                {icon}
              </span>
            )}
          </>
        )}
      </>
    );

    // Use motion.button for animations
    const MotionButton = motion.button;

    return (
      <MotionButton
        ref={ref}
        className={combinedClassName}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        {...props}
      >
        {buttonContent}
        
        {/* Ripple effect for touch feedback */}
        {!disabled && !loading && (
          <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <span className="ripple" />
          </span>
        )}
      </MotionButton>
    );
  }
);

MobileButton.displayName = 'MobileButton';

export default MobileButton;

/**
 * MobileIconButton - Circular icon button with touch target
 */
export const MobileIconButton = forwardRef<
  HTMLButtonElement,
  Omit<MotionButtonProps, 'children'> & { 
    icon: React.ReactNode;
    label: string;
  }
>(({ icon, label, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'w-[44px] h-[44px]',
    md: 'w-[48px] h-[48px]',
    lg: 'w-[52px] h-[52px]',
  };

  return (
    <MobileButton
      ref={ref}
      size={size}
      className={cn(sizeClasses[size], 'rounded-full p-0')}
      aria-label={label}
      {...props}
    >
      {icon}
    </MobileButton>
  );
});

MobileIconButton.displayName = 'MobileIconButton';

/**
 * MobileButtonGroup - Group of buttons with proper spacing
 */
export const MobileButtonGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
}> = ({ children, className = '', direction = 'horizontal', fullWidth = false }) => {
  return (
    <div
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row space-x-3' : 'flex-col space-y-3',
        fullWidth && 'w-full',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            fullWidth: fullWidth && direction === 'vertical',
          });
        }
        return child;
      })}
    </div>
  );
};