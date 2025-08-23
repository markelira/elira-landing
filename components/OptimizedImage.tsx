'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Generate blur data URL for placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const dataUrl = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality,
  className = '',
  sizes,
  placeholder = 'blur',
  blurDataURL,
}) => {
  const [imageQuality, setImageQuality] = useState(quality || 75);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Adaptive quality based on network speed
    if (!quality && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      const effectiveType = conn?.effectiveType || '4g';
      const saveData = conn?.saveData || false;
      
      if (saveData) {
        setImageQuality(40);
      } else {
        switch (effectiveType) {
          case 'slow-2g':
          case '2g':
            setImageQuality(50);
            break;
          case '3g':
            setImageQuality(65);
            break;
          case '4g':
          default:
            setImageQuality(85);
            break;
        }
      }
    }
  }, [quality]);

  // Generate WebP and AVIF versions
  const getOptimizedSrc = (originalSrc: string) => {
    // If it's already a remote URL, return as is
    if (originalSrc.startsWith('http')) return originalSrc;
    
    // For local images, we'll rely on Next.js Image optimization
    return originalSrc;
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        quality={imageQuality}
        priority={priority}
        sizes={sizes || `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
        placeholder={placeholder}
        blurDataURL={blurDataURL || dataUrl(width, height)}
        onLoad={() => setLoaded(true)}
        className={`
          transition-opacity duration-300
          ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
};

// Picture element for art direction
export const OptimizedPicture: React.FC<{
  sources: Array<{
    srcSet: string;
    media?: string;
    type?: string;
  }>;
  fallback: {
    src: string;
    alt: string;
  };
  className?: string;
}> = ({ sources, fallback, className }) => {
  return (
    <picture className={className}>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={source.type}
        />
      ))}
      <img
        src={fallback.src}
        alt={fallback.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto"
      />
    </picture>
  );
};