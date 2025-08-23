'use client';

import { useState, useEffect } from 'react';

interface NetworkInformation {
  effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
  saveData?: boolean;
  rtt?: number;
  downlink?: number;
}

interface AdaptiveLoadingState {
  shouldReduceMotion: boolean;
  shouldLoadHeavyContent: boolean;
  imageQuality: number;
  videoQuality: 'auto' | 'low' | 'medium' | 'high';
  shouldPreloadContent: boolean;
  connectionSpeed: 'slow' | 'medium' | 'fast';
}

export const useAdaptiveLoading = (): AdaptiveLoadingState => {
  const [state, setState] = useState<AdaptiveLoadingState>({
    shouldReduceMotion: false,
    shouldLoadHeavyContent: true,
    imageQuality: 85,
    videoQuality: 'auto',
    shouldPreloadContent: true,
    connectionSpeed: 'fast',
  });

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldReduceMotion = motionQuery.matches;

    // Check device memory (Chrome only)
    const deviceMemory = (navigator as any).deviceMemory || 8;
    const isLowEndDevice = deviceMemory < 4;

    // Check hardware concurrency (number of CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    const isSlowCPU = cores < 4;

    // Check network information
    let networkInfo: NetworkInformation = {};
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      networkInfo = {
        effectiveType: conn?.effectiveType || '4g',
        saveData: conn?.saveData || false,
        rtt: conn?.rtt || 0,
        downlink: conn?.downlink || 10,
      };
    }

    // Determine connection speed
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast';
    if (networkInfo.saveData || networkInfo.effectiveType === '2g' || networkInfo.effectiveType === 'slow-2g') {
      connectionSpeed = 'slow';
    } else if (networkInfo.effectiveType === '3g' || (networkInfo.rtt && networkInfo.rtt > 200)) {
      connectionSpeed = 'medium';
    }

    // Calculate adaptive settings
    let imageQuality = 85;
    let videoQuality: 'auto' | 'low' | 'medium' | 'high' = 'auto';
    let shouldLoadHeavyContent = true;
    let shouldPreloadContent = true;

    if (connectionSpeed === 'slow' || networkInfo.saveData) {
      imageQuality = 40;
      videoQuality = 'low';
      shouldLoadHeavyContent = false;
      shouldPreloadContent = false;
    } else if (connectionSpeed === 'medium') {
      imageQuality = 65;
      videoQuality = 'medium';
      shouldLoadHeavyContent = true;
      shouldPreloadContent = false;
    } else if (isLowEndDevice || isSlowCPU) {
      imageQuality = 70;
      videoQuality = 'medium';
      shouldPreloadContent = false;
    }

    setState({
      shouldReduceMotion,
      shouldLoadHeavyContent,
      imageQuality,
      videoQuality,
      shouldPreloadContent,
      connectionSpeed,
    });

    // Listen for network changes
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const updateNetworkStatus = () => {
        const newEffectiveType = conn?.effectiveType || '4g';
        const newSaveData = conn?.saveData || false;
        
        let newConnectionSpeed: 'slow' | 'medium' | 'fast' = 'fast';
        if (newSaveData || newEffectiveType === '2g' || newEffectiveType === 'slow-2g') {
          newConnectionSpeed = 'slow';
        } else if (newEffectiveType === '3g') {
          newConnectionSpeed = 'medium';
        }

        setState(prev => ({
          ...prev,
          connectionSpeed: newConnectionSpeed,
          imageQuality: newConnectionSpeed === 'slow' ? 40 : newConnectionSpeed === 'medium' ? 65 : 85,
          shouldLoadHeavyContent: newConnectionSpeed !== 'slow',
          shouldPreloadContent: newConnectionSpeed === 'fast',
        }));
      };

      conn?.addEventListener('change', updateNetworkStatus);
      return () => conn?.removeEventListener('change', updateNetworkStatus);
    }
  }, []);

  return state;
};

// Hook for lazy loading with Intersection Observer
export const useProgressiveLazyLoad = (
  threshold = 0.1,
  rootMargin = '50px'
) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { shouldLoadHeavyContent, connectionSpeed } = useAdaptiveLoading();

  useEffect(() => {
    if (!ref) return;

    // Adjust root margin based on connection speed
    const adjustedRootMargin = connectionSpeed === 'fast' ? '200px' : 
                               connectionSpeed === 'medium' ? '100px' : rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: adjustedRootMargin,
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, connectionSpeed]);

  return {
    ref: setRef,
    isInView: shouldLoadHeavyContent ? isInView : true, // Load immediately on slow connections to avoid layout shifts
  };
};