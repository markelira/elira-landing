'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TouchTargetProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  debug?: boolean;
  minSize?: 44 | 48 | 52;
  as?: React.ElementType;
  type?: string;
}

/**
 * TouchTarget - Ensures all interactive elements meet minimum touch target requirements
 * 
 * @param children - Content to wrap
 * @param className - Additional CSS classes
 * @param debug - Show visual debugging overlay in development
 * @param minSize - Minimum size in pixels (default: 44 for iOS, can be 48 for Android)
 * @param as - Element type to render (default: div)
 */
const TouchTarget: React.FC<TouchTargetProps> = ({
  children,
  className = '',
  debug = process.env.NODE_ENV === 'development',
  minSize = 44,
  as: Component = 'div',
  ...props
}) => {
  const minSizeClass = {
    44: 'min-w-[44px] min-h-[44px]',
    48: 'min-w-[48px] min-h-[48px]',
    52: 'min-w-[52px] min-h-[52px]',
  }[minSize];

  const debugStyles = debug
    ? 'relative before:absolute before:inset-0 before:border-2 before:border-dashed before:border-red-500/30 before:pointer-events-none before:rounded before:content-[""] before:z-50'
    : '';

  return (
    <Component
      className={cn(
        minSizeClass,
        'touch-manipulation',
        'flex items-center justify-center',
        'tap-highlight-transparent',
        '-webkit-tap-highlight-color-transparent',
        debugStyles,
        className
      )}
      {...props}
    >
      {children}
      {debug && process.env.NODE_ENV === 'development' && (
        <span className="absolute -top-6 left-0 text-[10px] text-red-500 font-mono bg-white px-1 rounded z-50 pointer-events-none">
          {minSize}px
        </span>
      )}
    </Component>
  );
};

export default TouchTarget;

// Export a hook to check if touch target requirements are met
export const useTouchTargetCheck = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width < 44 || height < 44) {
        console.warn(
          `Touch target too small: ${width}x${height}px (minimum: 44x44px)`,
          ref.current
        );
      }
    }
  }, [ref]);
};