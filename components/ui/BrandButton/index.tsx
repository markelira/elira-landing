'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const brandButtonVariants = cva(
  // Base: Understated, not screaming
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-slate-400 disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md',
        secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-50',
        ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-50',
        outline: 'border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
        accent: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'px-6 py-3 text-sm',
        md: 'px-8 py-4 text-base',
        lg: 'px-10 py-5 text-lg',
        xl: 'px-12 py-6 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BrandButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandButtonVariants> {
  children: React.ReactNode;
}

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(brandButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BrandButton.displayName = 'BrandButton';