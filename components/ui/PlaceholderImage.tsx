'use client';

import React from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  icon?: string;
  title?: string;
  gradient?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 1440,
  height = 920,
  className = '',
  alt = 'PDF Preview',
  icon = '📄',
  title = 'PDF Preview',
  gradient = 'from-gray-100 to-gray-200'
}) => {
  return (
    <div
      className={`
        relative flex items-center justify-center
        bg-gradient-to-br ${gradient}
        border border-gray-200 rounded-lg
        ${className}
      `}
      style={{ width, height }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="text-gray-400">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <div className="flex items-center justify-center mb-2">
          <FileText className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-600">
            {title}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Előnézet hamarosan
        </p>
      </div>
      
      {/* Corner indicator */}
      <div className="absolute top-2 right-2 bg-white/80 rounded px-2 py-1">
        <span className="text-xs font-medium text-gray-600">PDF</span>
      </div>
    </div>
  );
};

export default PlaceholderImage;