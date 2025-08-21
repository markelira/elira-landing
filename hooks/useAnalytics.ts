'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackEvent,
  trackPageView,
  trackEmailSubmit,
  trackButtonClick,
  trackScrollDepth,
  trackFormStart,
  trackFormSubmit,
  trackModalOpen,
  trackModalClose,
} from '@/lib/analytics';

export const useAnalytics = () => {
  const pathname = usePathname();
  const scrollDepthRef = useRef<Set<number>>(new Set());
  const modalStartTimeRef = useRef<Record<string, number>>({});

  // Track page views
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, and 100% intervals
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollDepthRef.current.has(milestone)) {
          scrollDepthRef.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Analytics functions
  const track = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  }, []);

  const trackEmail = useCallback((email: string, source?: string) => {
    trackEmailSubmit(email, source);
  }, []);

  const trackButton = useCallback((buttonText: string, location: string) => {
    trackButtonClick(buttonText, location);
  }, []);

  const startForm = useCallback((formName: string) => {
    trackFormStart(formName);
  }, []);

  const submitForm = useCallback((formName: string, success: boolean) => {
    trackFormSubmit(formName, success);
  }, []);

  const openModal = useCallback((modalName: string) => {
    modalStartTimeRef.current[modalName] = Date.now();
    trackModalOpen(modalName);
  }, []);

  const closeModal = useCallback((modalName: string) => {
    const startTime = modalStartTimeRef.current[modalName];
    const timeSpent = startTime ? Date.now() - startTime : undefined;
    trackModalClose(modalName, timeSpent);
    delete modalStartTimeRef.current[modalName];
  }, []);

  return {
    track,
    trackEmail,
    trackButton,
    startForm,
    submitForm,
    openModal,
    closeModal,
  };
};

export default useAnalytics;