'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Eye } from 'lucide-react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import useAnalytics from '@/hooks/useAnalytics';

interface Preview {
  thumbnail: string;
  pages: number;
  fileSize: string;
  screenshots: string[];
  sampleContent: string;
}

interface Metadata {
  lastUpdated: string;
}

interface EnhancedMagnet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  benefits: string[];
  preview: Preview;
  metadata: Metadata;
  icon: string;
  gradient: string;
  tags: string[];
  downloadUrl: string;
}

interface MagnetShowcaseProps {
  magnet: EnhancedMagnet;
  onClick: (magnet: EnhancedMagnet) => void;
  index: number;
  isReversed?: boolean;
}

const MagnetShowcase: React.FC<MagnetShowcaseProps> = ({ 
  magnet, 
  onClick, 
  index,
  isReversed = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { track } = useAnalytics();

  const handlePreviewClick = () => {
    track('magnet_preview_click', { magnet: magnet.id });
    setIsExpanded(!isExpanded);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    track('magnet_showcase_download_click', { magnet: magnet.id });
    onClick(magnet);
  };


  return (
    <div
      className="relative mb-16 last:mb-0"
    >

      {/* Main Container */}
      <div className={`
        grid lg:grid-cols-2 gap-8 lg:gap-12 items-start
        ${isReversed ? 'lg:grid-flow-col-dense' : ''}
      `}>
        
        {/* Content Column */}
        <div className={`space-y-4 lg:space-y-6 order-2 lg:order-none ${isReversed ? 'lg:col-start-2' : ''}`}>
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <div className="text-4xl">{magnet.icon}</div>
              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {magnet.title}
                  </h3>
                </div>
                <p className="text-base lg:text-lg text-teal-700 font-semibold">
                  {magnet.subtitle}
                </p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              {magnet.longDescription}
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Mit tartalmaz:</h4>
            <ul className="space-y-2">
              {magnet.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-teal-700" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Sample Content Preview */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Betekintés:
            </h5>
            <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded-lg">
              {magnet.preview.sampleContent}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleDownloadClick}
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-teal-700 to-cyan-600 
                       text-white font-semibold rounded-full shadow-lg 
                       hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Letöltöm Ingyen
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 scale-0 
                          group-hover:scale-100 transition-transform 
                          duration-500 rounded-full" />
          </button>
        </div>

        {/* Preview Column */}
        <div className={`order-1 lg:order-none ${isReversed ? 'lg:col-start-1' : ''}`}>
          <div
            className="relative group cursor-pointer"
            onClick={handlePreviewClick}
          >
            {/* Main Preview Image */}
            <div className="relative aspect-[1440/920] rounded-2xl overflow-hidden shadow-2xl">
              {/* Fallback placeholder - behind the image */}
              <div className="absolute inset-0 z-0">
                <PlaceholderImage
                  className="w-full h-full"
                  icon={magnet.icon}
                  title={magnet.title}
                  gradient={magnet.gradient}
                />
              </div>
              
              {magnet.preview.thumbnail ? (
                <Image
                  src={magnet.preview.thumbnail}
                  alt={`${magnet.title} előnézet`}
                  fill
                  className="object-cover z-10 relative"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    // Fallback to placeholder on error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : null}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-all duration-300 z-20" />
              
              {/* File Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 
                              transform translate-y-2 group-hover:translate-y-0 
                              opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {magnet.preview.pages} oldal • {magnet.preview.fileSize}
                    </span>
                    <span className="text-teal-700 font-semibold">
                      PDF
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Click to Preview Indicator */}
              <div className="absolute top-4 right-4 z-30">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2
                              transform scale-0 group-hover:scale-100 
                              transition-all duration-300">
                  <Eye className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-teal-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-cyan-500 rounded-full animate-pulse delay-700" />
          </div>

          {/* File Metadata */}
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium">{magnet.preview.pages}</span>
              <span>oldal</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="flex items-center gap-1">
              <span className="font-medium">PDF</span>
              <span>formátum</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="flex items-center gap-1">
              <span className="font-medium">{magnet.preview.fileSize}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagnetShowcase;