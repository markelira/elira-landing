'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X } from 'lucide-react';
import TouchTarget from './TouchTarget';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

/**
 * MobileInput - Touch-optimized input with iOS zoom prevention
 * 
 * Features:
 * - Hardcoded 16px font size to prevent iOS zoom
 * - Minimum 48px height for comfortable touch
 * - Clear button for easy value reset
 * - Password visibility toggle
 * - Touch-friendly spacing
 */
const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      clearable = false,
      onClear,
      fullWidth = true,
      variant = 'default',
      type = 'text',
      className = '',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;
    
    const hasValue = value !== undefined && value !== null && value !== '';

    // Base input styles with 16px font to prevent iOS zoom
    const baseInputStyles = cn(
      'w-full',
      'min-h-[48px] px-4 py-3',
      // Critical: 16px font size prevents iOS zoom
      'text-[16px] leading-normal',
      'rounded-xl',
      'transition-all duration-200',
      'touch-manipulation tap-highlight-transparent',
      'placeholder:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
      // Add padding for icons
      icon && 'pl-12',
      (clearable || isPasswordType) && 'pr-12',
      // Focus styles
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      error 
        ? 'focus:ring-red-500 focus:border-red-500' 
        : 'focus:ring-teal-500 focus:border-teal-500'
    );

    // Variant styles
    const variantStyles = {
      default: cn(
        'bg-white',
        'border-2',
        error ? 'border-red-500' : 'border-gray-300',
        !error && 'hover:border-gray-400'
      ),
      filled: cn(
        'bg-gray-50',
        'border-2 border-transparent',
        error ? 'border-red-500 bg-red-50' : '',
        !error && 'hover:bg-gray-100 focus:bg-white'
      ),
      outlined: cn(
        'bg-transparent',
        'border-2',
        error ? 'border-red-500' : 'border-gray-400',
        !error && 'hover:border-gray-500'
      ),
    };

    const combinedInputStyles = cn(
      baseInputStyles,
      variantStyles[variant],
      className
    );

    const containerStyles = cn(
      'relative',
      fullWidth && 'w-full'
    );

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        // Create synthetic event
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className={containerStyles}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              {icon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={combinedInputStyles}
            style={{
              // Ensure 16px font size for iOS zoom prevention
              fontSize: '16px',
              // Prevent auto-zoom on iOS
              WebkitTextSizeAdjust: '100%',
            }}
            {...props}
          />
          
          {/* Action buttons container */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {/* Clear button */}
            {clearable && hasValue && !disabled && (
              <TouchTarget
                as="button"
                type="button"
                minSize={44}
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear input"
              >
                <X className="w-5 h-5" />
              </TouchTarget>
            )}
            
            {/* Password toggle */}
            {isPasswordType && !disabled && (
              <TouchTarget
                as="button"
                type="button"
                minSize={44}
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </TouchTarget>
            )}
          </div>
        </div>
        
        {/* Hint or Error message */}
        {(hint || error) && (
          <p className={cn(
            'mt-2 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export default MobileInput;

/**
 * MobileTextarea - Touch-optimized textarea
 */
export const MobileTextarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    hint?: string;
    fullWidth?: boolean;
    variant?: 'default' | 'filled' | 'outlined';
  }
>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      variant = 'default',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'w-full',
      'min-h-[96px] px-4 py-3',
      'text-[16px] leading-normal',
      'rounded-xl',
      'transition-all duration-200',
      'touch-manipulation tap-highlight-transparent',
      'placeholder:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'resize-y',
      error 
        ? 'focus:ring-red-500 focus:border-red-500' 
        : 'focus:ring-teal-500 focus:border-teal-500'
    );

    const variantStyles = {
      default: cn(
        'bg-white',
        'border-2',
        error ? 'border-red-500' : 'border-gray-300',
        !error && 'hover:border-gray-400'
      ),
      filled: cn(
        'bg-gray-50',
        'border-2 border-transparent',
        error ? 'border-red-500 bg-red-50' : '',
        !error && 'hover:bg-gray-100 focus:bg-white'
      ),
      outlined: cn(
        'bg-transparent',
        'border-2',
        error ? 'border-red-500' : 'border-gray-400',
        !error && 'hover:border-gray-500'
      ),
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            baseStyles,
            variantStyles[variant],
            className
          )}
          style={{
            fontSize: '16px',
            WebkitTextSizeAdjust: '100%',
          }}
          {...props}
        />
        
        {(hint || error) && (
          <p className={cn(
            'mt-2 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

MobileTextarea.displayName = 'MobileTextarea';

/**
 * MobileSelect - Touch-optimized select dropdown
 */
export const MobileSelect = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    error?: string;
    hint?: string;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    fullWidth?: boolean;
    variant?: 'default' | 'filled' | 'outlined';
  }
>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder = 'Select an option',
      fullWidth = true,
      variant = 'default',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'w-full',
      'min-h-[48px] px-4 py-3 pr-10',
      'text-[16px] leading-normal',
      'rounded-xl',
      'transition-all duration-200',
      'touch-manipulation tap-highlight-transparent',
      'appearance-none',
      'bg-[length:20px_20px] bg-[position:right_12px_center] bg-no-repeat',
      "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")]",
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      error 
        ? 'focus:ring-red-500 focus:border-red-500' 
        : 'focus:ring-teal-500 focus:border-teal-500'
    );

    const variantStyles = {
      default: cn(
        'bg-white',
        'border-2',
        error ? 'border-red-500' : 'border-gray-300',
        !error && 'hover:border-gray-400'
      ),
      filled: cn(
        'bg-gray-50',
        'border-2 border-transparent',
        error ? 'border-red-500 bg-red-50' : '',
        !error && 'hover:bg-gray-100 focus:bg-white'
      ),
      outlined: cn(
        'bg-transparent',
        'border-2',
        error ? 'border-red-500' : 'border-gray-400',
        !error && 'hover:border-gray-500'
      ),
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            baseStyles,
            variantStyles[variant],
            className
          )}
          style={{
            fontSize: '16px',
            WebkitTextSizeAdjust: '100%',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {(hint || error) && (
          <p className={cn(
            'mt-2 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

MobileSelect.displayName = 'MobileSelect';