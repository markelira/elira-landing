// Analytics and tracking service for Marketing Sebészet lead magnet

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  custom_properties?: Record<string, any>;
}

export interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    price?: number;
  }>;
}

class MarketingSebesztAnalytics {
  private isInitialized = false;
  private debugMode = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.debugMode = window.location.hostname === 'localhost' || window.location.hostname.includes('preview');
    }
  }

  /**
   * Initialize analytics tracking
   */
  initialize(config?: {
    ga_measurement_id?: string;
    facebook_pixel_id?: string;
    hotjar_id?: string;
  }) {
    if (typeof window === 'undefined' || this.isInitialized) return;

    this.isInitialized = true;
    
    if (this.debugMode) {
      console.log('🔍 Marketing Sebészet Analytics initialized in debug mode');
    }

    // Initialize dataLayer for GTM/GA4
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Initialize tracking queues if pixels aren't loaded yet
    (window as any).fbq = (window as any).fbq || function() {
      ((window as any).fbq.q = (window as any).fbq.q || []).push(arguments);
    };
  }

  /**
   * Track page views
   */
  trackPageView(page: string, additionalData?: Record<string, any>) {
    const eventData = {
      event: 'page_view',
      page_title: `Marketing Sebészet - ${page}`,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      lead_magnet: 'marketing_sebeszet',
      ...additionalData
    };

    this.sendToAnalytics('page_view', eventData);
  }

  /**
   * Track form interactions
   */
  trackFormStart() {
    this.sendToAnalytics('begin_checkout', {
      event: 'form_start',
      category: 'engagement',
      label: 'marketing_sebeszet_form',
      content_name: 'Marketing Sebészet Form',
      content_category: 'lead_magnet'
    });
  }

  trackFormFieldFocus(fieldName: string) {
    this.sendToAnalytics('form_field_focus', {
      event: 'form_field_focus',
      category: 'form_interaction',
      label: fieldName,
      field_name: fieldName
    });
  }

  trackFormValidationError(fieldName: string, errorMessage: string) {
    this.sendToAnalytics('form_error', {
      event: 'form_validation_error',
      category: 'form_error',
      label: fieldName,
      field_name: fieldName,
      error_message: errorMessage
    });
  }

  trackFormSubmit(leadId: string, formData: {
    occupation: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }) {
    // Google Analytics Lead event
    this.sendToAnalytics('generate_lead', {
      event: 'lead_generated',
      category: 'conversion',
      label: 'marketing_sebeszet_form',
      value: 1,
      currency: 'HUF',
      lead_id: leadId,
      occupation: formData.occupation,
      traffic_source: formData.utm_source || 'direct',
      traffic_medium: formData.utm_medium || 'none',
      traffic_campaign: formData.utm_campaign || 'none'
    });

    // Facebook Pixel Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Marketing Sebészet',
        content_category: 'lead_magnet',
        value: 50, // Estimated lead value in HUF
        currency: 'HUF',
        lead_id: leadId,
        custom_occupation: formData.occupation
      });
    }
  }

  /**
   * Track booking interactions
   */
  trackBookingPageView(leadId?: string) {
    this.sendToAnalytics('booking_page_view', {
      event: 'booking_page_view',
      category: 'engagement',
      label: 'marketing_sebeszet_booking',
      lead_id: leadId,
      funnel_step: 'booking'
    });
  }

  trackCalendarInteraction(action: 'opened' | 'date_selected' | 'time_selected', leadId?: string) {
    this.sendToAnalytics('calendar_interaction', {
      event: 'calendar_interaction',
      category: 'booking',
      label: action,
      lead_id: leadId,
      interaction_type: action
    });
  }

  trackBookingComplete(leadId: string, bookingData?: {
    selected_date?: string;
    selected_time?: string;
    time_to_book?: number; // seconds from form submit to booking complete
  }) {
    // This is a high-value conversion event
    this.sendToAnalytics('purchase', {
      event: 'booking_completed',
      category: 'conversion',
      label: 'marketing_sebeszet_booking',
      value: 100, // Estimated booking value in HUF
      currency: 'HUF',
      transaction_id: leadId,
      lead_id: leadId,
      selected_date: bookingData?.selected_date,
      selected_time: bookingData?.selected_time,
      time_to_convert: bookingData?.time_to_book
    });

    // Facebook Pixel Schedule event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Schedule', {
        content_name: 'Marketing Sebészet Booking',
        value: 100,
        currency: 'HUF',
        lead_id: leadId
      });
    }
  }

  /**
   * Track user engagement
   */
  trackScrollDepth(percentage: number, leadId?: string) {
    // Only track meaningful scroll milestones
    if ([25, 50, 75, 100].includes(percentage)) {
      this.sendToAnalytics('scroll', {
        event: 'scroll_depth',
        category: 'engagement',
        label: `${percentage}%`,
        scroll_depth: percentage,
        lead_id: leadId
      });
    }
  }

  trackTimeOnPage(seconds: number, page: string, leadId?: string) {
    // Track time milestones
    const milestones = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    
    if (milestones.includes(seconds)) {
      this.sendToAnalytics('timing_complete', {
        event: 'time_on_page',
        category: 'engagement',
        label: page,
        value: seconds,
        time_seconds: seconds,
        lead_id: leadId
      });
    }
  }

  trackCTAClick(ctaType: string, ctaLocation: string, leadId?: string) {
    this.sendToAnalytics('cta_click', {
      event: 'cta_click',
      category: 'engagement',
      label: ctaType,
      cta_type: ctaType,
      cta_location: ctaLocation,
      lead_id: leadId
    });
  }

  /**
   * Track campaign performance
   */
  trackCampaignAttribution(utmData: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  }, leadId?: string) {
    this.sendToAnalytics('campaign_attribution', {
      event: 'campaign_attribution',
      category: 'acquisition',
      utm_source: utmData.source,
      utm_medium: utmData.medium,
      utm_campaign: utmData.campaign,
      utm_content: utmData.content,
      utm_term: utmData.term,
      lead_id: leadId
    });
  }

  /**
   * Track A/B tests
   */
  trackABTestView(testName: string, variant: string, leadId?: string) {
    this.sendToAnalytics('ab_test_view', {
      event: 'ab_test_view',
      category: 'experiment',
      label: testName,
      test_name: testName,
      test_variant: variant,
      lead_id: leadId
    });
  }

  trackABTestConversion(testName: string, variant: string, leadId: string) {
    this.sendToAnalytics('ab_test_conversion', {
      event: 'ab_test_conversion',
      category: 'experiment',
      label: testName,
      test_name: testName,
      test_variant: variant,
      lead_id: leadId
    });
  }

  /**
   * Track errors and issues
   */
  trackError(errorType: string, errorMessage: string, context?: Record<string, any>) {
    this.sendToAnalytics('exception', {
      event: 'error_occurred',
      category: 'error',
      label: errorType,
      description: errorMessage,
      fatal: false,
      error_type: errorType,
      error_message: errorMessage,
      ...context
    });
  }

  /**
   * Custom event tracking
   */
  trackCustomEvent(eventName: string, properties: Record<string, any>) {
    this.sendToAnalytics(eventName, {
      event: eventName,
      category: 'custom',
      ...properties
    });
  }

  /**
   * Send data to all analytics platforms
   */
  private sendToAnalytics(eventType: string, data: Record<string, any>) {
    if (typeof window === 'undefined') return;

    const timestamp = new Date().toISOString();
    const finalData = { ...data, timestamp };

    // Debug logging
    if (this.debugMode) {
      console.log(`📊 Analytics Event: ${eventType}`, finalData);
    }

    // Google Analytics 4 / Google Tag Manager
    if ((window as any).gtag) {
      (window as any).gtag('event', eventType, finalData);
    }

    // Push to dataLayer for GTM
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventType,
      ...finalData
    });

    // Facebook Pixel custom events
    if ((window as any).fbq && eventType.startsWith('marketing_sebeszet_')) {
      (window as any).fbq('trackCustom', eventType, {
        lead_magnet: 'marketing_sebeszet',
        ...finalData
      });
    }

    // Hotjar event tracking
    if ((window as any).hj) {
      (window as any).hj('event', eventType);
    }

    // Custom analytics endpoint (if you have one)
    this.sendToCustomAnalytics(eventType, finalData);
  }

  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomAnalytics(eventType: string, data: Record<string, any>) {
    try {
      // Only send important events to reduce server load
      const importantEvents = [
        'generate_lead', 
        'purchase', 
        'booking_completed', 
        'page_view'
      ];
      
      if (!importantEvents.includes(eventType)) return;

      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: eventType,
          data: data,
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          referrer: document.referrer
        })
      });
    } catch (error) {
      if (this.debugMode) {
        console.error('Failed to send to custom analytics:', error);
      }
    }
  }

  /**
   * Get UTM parameters from URL
   */
  getUtmParameters(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      fbclid: params.get('fbclid') || '',
      gclid: params.get('gclid') || ''
    };
  }

  /**
   * Enhanced ecommerce tracking for lead scoring
   */
  trackLeadScore(leadId: string, score: number, factors: Record<string, number>) {
    this.sendToAnalytics('lead_scored', {
      event: 'lead_scored',
      category: 'lead_qualification',
      lead_id: leadId,
      lead_score: score,
      scoring_factors: factors
    });
  }

  /**
   * Track funnel steps for conversion optimization
   */
  trackFunnelStep(step: string, stepNumber: number, leadId?: string) {
    this.sendToAnalytics('funnel_step', {
      event: 'funnel_step_reached',
      category: 'conversion_funnel',
      label: step,
      funnel_step: step,
      step_number: stepNumber,
      lead_id: leadId
    });
  }
}

// Create singleton instance
export const marketingSebesztAnalytics = new MarketingSebesztAnalytics();

// Auto-initialize
if (typeof window !== 'undefined') {
  marketingSebesztAnalytics.initialize();
}

export default marketingSebesztAnalytics;