'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'screen';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  preventOverflow?: boolean;
  center?: boolean;
  as?: React.ElementType;
}

/**
 * ResponsiveContainer - Prevents horizontal overflow and provides consistent spacing
 * 
 * @param children - Content to wrap
 * @param className - Additional CSS classes
 * @param maxWidth - Maximum width constraint (default: 'full')
 * @param padding - Responsive padding preset (default: 'md')
 * @param preventOverflow - Prevent horizontal overflow (default: true)
 * @param center - Center the container (default: true)
 * @param as - Element type to render (default: div)
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'full',
  padding = 'md',
  preventOverflow = true,
  center = true,
  as: Component = 'div',
  ...props
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    screen: 'max-w-[100vw]',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-3 sm:px-4 lg:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  };

  const overflowClasses = preventOverflow
    ? 'overflow-x-hidden max-w-[100vw]'
    : '';

  const centerClasses = center ? 'mx-auto' : '';

  return (
    <Component
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        overflowClasses,
        centerClasses,
        // Safe area padding for modern phones
        'safe-area-left safe-area-right',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer;

/**
 * ResponsiveGrid - Mobile-first grid container
 */
export const ResponsiveGrid: React.FC<{
  children: ReactNode;
  className?: string;
  cols?: {
    default: 1 | 2;
    sm?: 2 | 3 | 4;
    md?: 3 | 4 | 5 | 6;
    lg?: 4 | 5 | 6 | 8;
  };
  gap?: 'sm' | 'md' | 'lg';
}> = ({
  children,
  className = '',
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
}) => {
  const gapClasses = {
    sm: 'gap-2 sm:gap-3 lg:gap-4',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
  };

  const colClasses = `
    grid-cols-${cols.default}
    ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''}
    ${cols.md ? `md:grid-cols-${cols.md}` : ''}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
  `.trim();

  return (
    <div
      className={cn(
        'grid',
        colClasses,
        gapClasses[gap],
        'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * ResponsiveFlex - Mobile-first flex container
 */
export const ResponsiveFlex: React.FC<{
  children: ReactNode;
  className?: string;
  direction?: 'col' | 'row' | 'col-reverse' | 'row-reverse';
  breakpoint?: 'sm' | 'md' | 'lg';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}> = ({
  children,
  className = '',
  direction = 'col',
  breakpoint = 'sm',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
}) => {
  const directionClasses = {
    col: `flex-col ${breakpoint}:flex-row`,
    row: 'flex-row',
    'col-reverse': `flex-col-reverse ${breakpoint}:flex-row-reverse`,
    'row-reverse': 'flex-row-reverse',
  };

  const gapClasses = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4 lg:gap-6',
    lg: 'gap-4 sm:gap-6 lg:gap-8',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};