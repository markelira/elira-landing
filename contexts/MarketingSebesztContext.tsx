"use client";

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useMarketingSebeszet, UseMarketingSebesztReturn } from '@/hooks/useMarketingSebeszet';

interface MarketingSebesztContextType extends UseMarketingSebesztReturn {
  // Additional context-specific methods
  trackPageView: (page: string) => void;
  trackEvent: (event: string, data?: Record<string, any>) => void;
  isFormAccessible: boolean;
  isBookingAccessible: boolean;
  canProceedToBooking: boolean;
}

const MarketingSebesztContext = createContext<MarketingSebesztContextType | undefined>(undefined);

interface MarketingSebesztProviderProps {
  children: React.ReactNode;
}

export const MarketingSebesztProvider: React.FC<MarketingSebesztProviderProps> = ({ children }) => {
  const marketingSebesztHook = useMarketingSebeszet();
  const { state } = marketingSebesztHook;

  // Derived state for access control
  const isFormAccessible = true; // Form is always accessible
  const isBookingAccessible = state.isSuccess && state.leadId !== null;
  const canProceedToBooking = state.currentStep === 'booking' && isBookingAccessible;

  const trackPageView = useCallback((page: string) => {
    try {
      // Google Analytics page view
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: `Marketing Sebészet - ${page}`,
          page_location: window.location.href
        });
      }

      // Custom analytics
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'marketing_sebeszet_page_view',
          page_name: page,
          lead_id: state.leadId,
          current_step: state.currentStep,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [state.leadId, state.currentStep]);

  const trackEvent = useCallback((event: string, data?: Record<string, any>) => {
    try {
      // Google Analytics custom event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event, {
          event_category: 'marketing_sebeszet',
          event_label: event,
          lead_id: state.leadId,
          current_step: state.currentStep,
          ...data
        });
      }

      // Facebook Pixel custom event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', `MarketingSebeszet_${event}`, {
          lead_id: state.leadId,
          current_step: state.currentStep,
          ...data
        });
      }

      // Custom analytics
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: `marketing_sebeszet_${event}`,
          lead_id: state.leadId,
          current_step: state.currentStep,
          timestamp: new Date().toISOString(),
          ...data
        });
      }
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, [state.leadId, state.currentStep]);

  // Track step changes
  useEffect(() => {
    const stepNames = {
      form: 'Form',
      booking: 'Booking',
      thankyou: 'Thank You'
    };
    
    const stepName = stepNames[state.currentStep];
    if (stepName) {
      trackEvent('step_change', { new_step: stepName });
    }
  }, [state.currentStep, trackEvent]);

  // Track form completion
  useEffect(() => {
    if (state.isSuccess && state.leadId) {
      trackEvent('form_completed', { 
        lead_id: state.leadId,
        completion_time: state.formSubmittedAt?.toISOString()
      });
    }
  }, [state.isSuccess, state.leadId, state.formSubmittedAt, trackEvent]);

  // Track booking completion
  useEffect(() => {
    if (state.bookingCompletedAt) {
      trackEvent('booking_completed', {
        completion_time: state.bookingCompletedAt.toISOString(),
        time_from_form_to_booking: state.formSubmittedAt 
          ? (state.bookingCompletedAt.getTime() - state.formSubmittedAt.getTime()) / 1000
          : null
      });
    }
  }, [state.bookingCompletedAt, state.formSubmittedAt, trackEvent]);

  const contextValue: MarketingSebesztContextType = {
    ...marketingSebesztHook,
    trackPageView,
    trackEvent,
    isFormAccessible,
    isBookingAccessible,
    canProceedToBooking
  };

  return (
    <MarketingSebesztContext.Provider value={contextValue}>
      {children}
    </MarketingSebesztContext.Provider>
  );
};

export const useMarketingSebesztContext = (): MarketingSebesztContextType => {
  const context = useContext(MarketingSebesztContext);
  if (context === undefined) {
    throw new Error(
      'useMarketingSebesztContext must be used within a MarketingSebesztProvider'
    );
  }
  return context;
};

// HOC for components that need the context
export const withMarketingSebeszet = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const context = useMarketingSebesztContext();
    return <Component {...props} marketingSebeszet={context} />;
  };
  
  WrappedComponent.displayName = `withMarketingSebeszet(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Helper hooks for specific use cases
export const useMarketingSebesztForm = () => {
  const context = useMarketingSebesztContext();
  return {
    formData: context.state.formData,
    errors: context.state.errors,
    isLoading: context.state.isLoading,
    isSuccess: context.state.isSuccess,
    updateFormData: context.updateFormData,
    clearError: context.clearError,
    submitForm: context.submitForm,
    validateForm: context.validateForm,
    isAccessible: context.isFormAccessible
  };
};

export const useMarketingSebesztBooking = () => {
  const context = useMarketingSebesztContext();
  return {
    leadId: context.state.leadId,
    leadName: context.state.formData.name,
    isAccessible: context.isBookingAccessible,
    canProceed: context.canProceedToBooking,
    goToThankYou: context.goToThankYou,
    trackEvent: context.trackEvent
  };
};

export const useMarketingSebesztAnalytics = () => {
  const context = useMarketingSebesztContext();
  return {
    trackPageView: context.trackPageView,
    trackEvent: context.trackEvent,
    currentStep: context.state.currentStep,
    leadId: context.state.leadId,
    getUtmParams: context.getUtmParams
  };
};

export default MarketingSebesztContext;