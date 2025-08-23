'use client';

import { useState, useEffect } from 'react';

interface MobileDeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  hasNotch: boolean;
  isSmallScreen: boolean; // < 640px
  isMediumScreen: boolean; // 640px - 1024px
  isLargeScreen: boolean; // > 1024px
}

/**
 * useMobileDevice - Comprehensive hook for detecting device characteristics
 * 
 * Features:
 * - Device type detection (mobile, tablet, desktop)
 * - Touch capability detection
 * - OS detection (iOS, Android)
 * - Orientation detection
 * - Viewport dimensions
 * - Screen size categories
 * - Notch detection for modern phones
 */
export const useMobileDevice = (): MobileDeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<MobileDeviceInfo>(() => {
    // Initial state (SSR safe)
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouchDevice: false,
        isIOS: false,
        isAndroid: false,
        isPortrait: true,
        isLandscape: false,
        viewportWidth: 1024,
        viewportHeight: 768,
        devicePixelRatio: 1,
        hasNotch: false,
        isSmallScreen: false,
        isMediumScreen: false,
        isLargeScreen: true,
      };
    }

    return getDeviceInfo();
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo(getDeviceInfo());
    };

    // Update on mount
    updateDeviceInfo();

    // Listen for resize and orientation changes
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    // Also listen for media query changes
    const mediaQueryList = window.matchMedia('(hover: hover) and (pointer: fine)');
    mediaQueryList.addEventListener('change', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
      mediaQueryList.removeEventListener('change', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

/**
 * Helper function to get device information
 */
function getDeviceInfo(): MobileDeviceInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Touch detection
  const isTouchDevice = (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  );

  // OS detection
  const isIOS = /iphone|ipad|ipod/.test(userAgent) || 
    (navigator.platform === 'MacIntel' && isTouchDevice); // iPad on iOS 13+
  
  const isAndroid = /android/.test(userAgent);

  // Device type detection based on viewport and touch
  const isMobile = width < 768 && isTouchDevice;
  const isTablet = width >= 768 && width < 1024 && isTouchDevice;
  const isDesktop = width >= 1024 || !isTouchDevice;

  // Orientation
  const isPortrait = height > width;
  const isLandscape = width > height;

  // Screen size categories
  const isSmallScreen = width < 640;
  const isMediumScreen = width >= 640 && width < 1024;
  const isLargeScreen = width >= 1024;

  // Notch detection (for iPhone X and later)
  const hasNotch = (
    isIOS &&
    window.screen.height >= 812 && // iPhone X and later heights
    window.devicePixelRatio >= 2
  ) || (
    // Check for CSS environment variables
    CSS.supports('padding-top: env(safe-area-inset-top)') &&
    parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0') > 0
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isIOS,
    isAndroid,
    isPortrait,
    isLandscape,
    viewportWidth: width,
    viewportHeight: height,
    devicePixelRatio: window.devicePixelRatio || 1,
    hasNotch,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
}

/**
 * useBreakpoint - Simplified hook for responsive breakpoints
 */
export const useBreakpoint = () => {
  const device = useMobileDevice();
  
  return {
    isMobile: device.viewportWidth < 640,
    isSm: device.viewportWidth >= 640,
    isMd: device.viewportWidth >= 768,
    isLg: device.viewportWidth >= 1024,
    isXl: device.viewportWidth >= 1280,
    is2xl: device.viewportWidth >= 1536,
  };
};

/**
 * useOrientation - Hook for orientation changes
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window === 'undefined') return 'portrait';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
};

/**
 * useViewportSize - Hook for viewport dimensions
 */
export const useViewportSize = () => {
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

/**
 * useSafeArea - Hook for safe area insets (notch, home indicator)
 */
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      
      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
};

export default useMobileDevice;