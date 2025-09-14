'use client';

import React from 'react';
import { useAcademicMode } from '@/lib/academic-mode';
import { GraduationCap } from 'lucide-react';

interface AcademicModeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'button' | 'switch' | 'floating';
}

export default function AcademicModeToggle({ 
  className = '', 
  showLabel = true,
  variant = 'button'
}: AcademicModeToggleProps) {
  const { isAcademicMode, toggle } = useAcademicMode();

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <button
          onClick={toggle}
          className={`
            group flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-300
            ${isAcademicMode 
              ? 'bg-academic-primary-600 text-white hover:bg-academic-primary-700' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
            hover:shadow-xl hover:scale-105
          `}
          title={isAcademicMode ? 'Exit Academic Mode' : 'Enter Academic Mode'}
        >
          <GraduationCap className={`w-5 h-5 transition-transform group-hover:scale-110`} />
          {showLabel && (
            <span className="text-sm font-medium">
              {isAcademicMode ? 'Academic' : 'Modern'}
            </span>
          )}
        </button>
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showLabel && (
          <label htmlFor="academic-toggle" className="text-sm font-medium text-gray-700">
            Academic Mode
          </label>
        )}
        <button
          id="academic-toggle"
          onClick={toggle}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isAcademicMode 
              ? 'bg-academic-primary-600 focus:ring-academic-primary-500' 
              : 'bg-gray-200 focus:ring-gray-500'
            }
          `}
          role="switch"
          aria-checked={isAcademicMode}
        >
          <span
            className={`
              ${isAcademicMode ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
            `}
          />
        </button>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggle}
      className={`
        group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
        ${isAcademicMode
          ? 'bg-academic-primary-100 text-academic-primary-800 hover:bg-academic-primary-200 border border-academic-primary-300'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
        }
        hover:shadow-sm ${className}
      `}
    >
      <GraduationCap className={`w-4 h-4 transition-transform group-hover:scale-110`} />
      {showLabel && (
        <span className="text-sm font-medium">
          {isAcademicMode ? 'Academic Mode' : 'Modern Mode'}
        </span>
      )}
    </button>
  );
}