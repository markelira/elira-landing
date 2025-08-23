'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  enabled?: boolean;
}

/**
 * useIntersectionObserver - Hook for observing element visibility
 */
export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions = {}
): [RefObject<T | null>, boolean, IntersectionObserverEntry | undefined] => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    root = null,
    triggerOnce = true,
    enabled = true,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);

        if (entry.isIntersecting && triggerOnce) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, enabled]);

  return [elementRef, isIntersecting, entry];
};

/**
 * useAnimateOnScroll - Hook for triggering animations when element comes into view
 */
export const useAnimateOnScroll = (
  animationClass: string = 'animate-fade-in',
  options: IntersectionObserverOptions = {}
) => {
  const [ref, isInView] = useIntersectionObserver(options);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    className: hasAnimated ? animationClass : 'opacity-0',
    isInView,
    hasAnimated,
  };
};

/**
 * useLazyLoad - Hook for lazy loading content
 */
export const useLazyLoad = <T extends HTMLElement = HTMLDivElement>(
  onLoad?: () => void,
  options: IntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] => {
  const [ref, isInView] = useIntersectionObserver<T>({
    ...options,
    triggerOnce: true,
  });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
      onLoad?.();
    }
  }, [isInView, hasLoaded, onLoad]);

  return [ref, hasLoaded];
};

/**
 * useProgressiveImage - Hook for progressive image loading
 */
export const useProgressiveImage = (
  lowQualitySrc: string,
  highQualitySrc: string
): [string, boolean] => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setSrc(lowQualitySrc);

    const img = new window.Image();
    img.src = highQualitySrc;
    
    img.onload = () => {
      setSrc(highQualitySrc);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, isLoading];
};

/**
 * useReducedMotion - Hook for respecting user's motion preferences
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * AnimateOnScroll - Component wrapper for scroll animations
 */
export const AnimateOnScroll: React.FC<{
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}> = ({
  children,
  animation = 'fade',
  duration = 0.6,
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const [ref, isInView] = useIntersectionObserver({
    threshold,
    triggerOnce,
  });
  
  const prefersReducedMotion = useReducedMotion();

  const animationClasses = {
    fade: 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    scale: 'animate-scale',
    rotate: 'animate-rotate',
  };

  const baseStyles = prefersReducedMotion
    ? {}
    : {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : getInitialTransform(animation),
        transition: `all ${duration}s ease-out ${delay}s`,
      };

  return (
    <div
      ref={ref}
      className={className}
      style={baseStyles}
    >
      {children}
    </div>
  );
};

function getInitialTransform(animation: string): string {
  switch (animation) {
    case 'slide-up':
      return 'translateY(30px)';
    case 'slide-down':
      return 'translateY(-30px)';
    case 'slide-left':
      return 'translateX(30px)';
    case 'slide-right':
      return 'translateX(-30px)';
    case 'scale':
      return 'scale(0.9)';
    case 'rotate':
      return 'rotate(-5deg)';
    default:
      return 'none';
  }
}

export default useIntersectionObserver;