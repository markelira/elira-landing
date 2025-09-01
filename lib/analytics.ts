import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';
import { AnalyticsEvent } from '@/types';
import { logger } from './logger';

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    const eventData: AnalyticsEvent = {
      event_name: eventName,
      timestamp: new Date().toISOString(),
      ...parameters,
    };

    // Track with Google Tag Manager
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: parameters?.category || 'engagement',
        event_label: parameters?.label,
        value: parameters?.value,
        custom_parameters: parameters,
      });
    }

    // Track with Firebase Analytics
    if (analytics) {
      logEvent(analytics, eventName, parameters);
    }

    // Development logging - reduced to prevent console spam
    if (process.env.NODE_ENV === 'development' && eventName !== 'page_view') {
      logger.log('Analytics Event:', eventData);
    }
  } catch (error) {
    // Silently catch analytics errors to prevent app crashes
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics error:', error);
    }
  }
};

// Pre-defined event tracking functions
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    category: 'navigation',
  });
};

export const trackEmailSubmit = (email: string, source: string = 'unknown') => {
  trackEvent('email_submit', {
    category: 'conversion',
    label: source,
    email_domain: email.split('@')[1],
    source,
  });
};

export const trackButtonClick = (buttonText: string, location: string) => {
  trackEvent('button_click', {
    category: 'engagement',
    label: buttonText,
    location,
    button_text: buttonText,
  });
};

export const trackScrollDepth = (depth: number, pagePath: string) => {
  trackEvent('scroll_depth', {
    category: 'engagement',
    value: depth,
    page_path: pagePath,
    scroll_depth: depth,
  });
};

export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    category: 'conversion',
    label: formName,
    form_name: formName,
  });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    category: 'conversion',
    label: formName,
    value: success ? 1 : 0,
    form_name: formName,
    success,
  });
};

export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_open', {
    category: 'engagement',
    label: modalName,
    modal_name: modalName,
  });
};

export const trackModalClose = (modalName: string, timeSpent?: number) => {
  trackEvent('modal_close', {
    category: 'engagement',
    label: modalName,
    value: timeSpent,
    modal_name: modalName,
    time_spent: timeSpent,
  });
};