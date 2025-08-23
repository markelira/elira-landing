'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for heavy components

export const CookieBanner = dynamic(
  () => import('./CookieBanner'),
  { 
    ssr: false,
    loading: () => null
  }
);

export const SocialProof = dynamic(
  () => import('./sections/SocialProof'),
  {
    loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-lg" />
  }
);

export const ValueProposition = dynamic(
  () => import('./sections/ValueProposition'),
  {
    loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse rounded-lg" />
  }
);

export const FinalCTA = dynamic(
  () => import('./sections/FinalCTA'),
  {
    loading: () => <div className="min-h-[500px] bg-gray-50 animate-pulse rounded-lg" />
  }
);

// Wrapper for Suspense boundaries
export const OptimizedSection: React.FC<{ 
  children: React.ReactNode; 
  fallback?: React.ReactNode 
}> = ({ children, fallback }) => (
  <Suspense fallback={fallback || <div className="min-h-[200px] animate-pulse bg-gray-50" />}>
    {children}
  </Suspense>
);

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload font files
    const fontPreloads = [
      'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      'https://fonts.gstatic.com/s/geist/v1/U9MAm5JBNkNx4Q_JVB7bhFtNhLo.woff2'
    ];
    
    fontPreloads.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preconnect to external domains
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnects.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
};

export default {
  CookieBanner,
  SocialProof,
  ValueProposition,
  FinalCTA,
  OptimizedSection,
  preloadCriticalResources
};