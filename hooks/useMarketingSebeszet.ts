"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { leadCaptureService, LeadSubmissionData } from '@/lib/services/leadCaptureService';

export interface MarketingSebesztFormData {
  name: string;
  phone: string;
  email: string;
  occupation: string;
}

export interface MarketingSebesztState {
  // Form state
  formData: MarketingSebesztFormData;
  errors: Record<string, string>;
  isLoading: boolean;
  isSuccess: boolean;
  
  // Lead management
  leadId: string | null;
  currentStep: 'form' | 'booking' | 'thankyou';
  
  // Progress tracking
  formSubmittedAt: Date | null;
  bookingCompletedAt: Date | null;
}

export interface UseMarketingSebesztReturn {
  // State
  state: MarketingSebesztState;
  
  // Form methods
  updateFormData: (field: keyof MarketingSebesztFormData, value: string) => void;
  clearError: (field: string) => void;
  resetForm: () => void;
  
  // Submission methods
  submitForm: () => Promise<boolean>;
  
  // Navigation methods
  goToBooking: () => void;
  goToThankYou: () => void;
  
  // Validation
  validateForm: () => boolean;
  
  // Utilities
  getUtmParams: () => Record<string, string>;
  saveProgressToLocalStorage: () => void;
  loadProgressFromLocalStorage: () => void;
}

const STORAGE_KEY = 'marketing_sebeszet_progress';

const initialFormData: MarketingSebesztFormData = {
  name: '',
  phone: '',
  email: '',
  occupation: ''
};

const initialState: MarketingSebesztState = {
  formData: initialFormData,
  errors: {},
  isLoading: false,
  isSuccess: false,
  leadId: null,
  currentStep: 'form',
  formSubmittedAt: null,
  bookingCompletedAt: null
};

export const useMarketingSebeszet = (): UseMarketingSebesztReturn => {
  const [state, setState] = useState<MarketingSebesztState>(initialState);
  const router = useRouter();

  // Load progress from localStorage on mount
  useEffect(() => {
    loadProgressFromLocalStorage();
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (state.leadId) {
      saveProgressToLocalStorage();
    }
  }, [state]);

  const updateFormData = useCallback((field: keyof MarketingSebesztFormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      },
      errors: {
        ...prev.errors,
        [field]: '' // Clear error when user types
      }
    }));
  }, []);

  const clearError = useCallback((field: string) => {
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: ''
      }
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const validateForm = useCallback((): boolean => {
    const { formData } = state;
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'A név megadása kötelező';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'A névnek legalább 2 karakter hosszúnak kell lennie';
    }

    // Phone validation
    const phoneRegex = /^(\+36|06)?(20|30|31|50|70)\d{7}$/;
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'A telefonszám megadása kötelező';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Érvénytelen magyar telefonszám formátum';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Az email cím megadása kötelező';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Érvénytelen email cím formátum';
    }

    // Occupation validation
    if (!formData.occupation) {
      newErrors.occupation = 'A foglalkozás kiválasztása kötelező';
    }

    setState(prev => ({
      ...prev,
      errors: newErrors
    }));

    return Object.keys(newErrors).length === 0;
  }, [state]);

  const getUtmParams = useCallback((): Record<string, string> => {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      fbclid: urlParams.get('fbclid') || '',
      gclid: urlParams.get('gclid') || ''
    };
  }, []);

  const submitForm = useCallback(async (): Promise<boolean> => {
    // Validate form first
    if (!validateForm()) {
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const { formData } = state;
      const utmParams = getUtmParams();

      // Prepare submission data
      const submissionData: LeadSubmissionData = {
        name: formData.name.trim(),
        phone: formData.phone,
        email: formData.email.toLowerCase().trim(),
        occupation: formData.occupation,
        utmParams: {
          source: utmParams.utm_source,
          medium: utmParams.utm_medium,
          campaign: utmParams.utm_campaign
        }
      };

      // Submit to Firebase
      const leadId = await leadCaptureService.saveLead(submissionData);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        leadId,
        currentStep: 'booking',
        formSubmittedAt: new Date()
      }));

      // Track successful submission
      trackFormSubmission(submissionData, leadId);

      return true;

    } catch (error) {
      console.error('Form submission error:', error);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        errors: {
          ...prev.errors,
          submit: error instanceof Error ? error.message : 'Hiba történt a küldés során. Kérjük, próbálja újra.'
        }
      }));

      return false;
    }
  }, [state, validateForm, getUtmParams]);

  const goToBooking = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: 'booking' }));
    router.push(`/foglalas-marketing-sebeszet${state.leadId ? `?lead=${state.leadId}` : ''}`);
  }, [router, state.leadId]);

  const goToThankYou = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'thankyou',
      bookingCompletedAt: new Date()
    }));
    router.push('/koszonjuk-marketing-sebeszet');
  }, [router]);

  const saveProgressToLocalStorage = useCallback(() => {
    try {
      const progressData = {
        leadId: state.leadId,
        currentStep: state.currentStep,
        formSubmittedAt: state.formSubmittedAt?.toISOString(),
        bookingCompletedAt: state.bookingCompletedAt?.toISOString(),
        formData: state.formData
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }, [state]);

  const loadProgressFromLocalStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const progressData = JSON.parse(stored);
      
      // Only restore if not older than 24 hours
      const submittedAt = progressData.formSubmittedAt ? new Date(progressData.formSubmittedAt) : null;
      const isExpired = submittedAt && (Date.now() - submittedAt.getTime()) > 24 * 60 * 60 * 1000;
      
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setState(prev => ({
        ...prev,
        leadId: progressData.leadId || null,
        currentStep: progressData.currentStep || 'form',
        formSubmittedAt: submittedAt,
        bookingCompletedAt: progressData.bookingCompletedAt ? new Date(progressData.bookingCompletedAt) : null,
        formData: progressData.formData || initialFormData
      }));
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const trackFormSubmission = useCallback((data: LeadSubmissionData, leadId: string) => {
    try {
      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'marketing_sebeszet_form',
          lead_id: leadId,
          occupation: data.occupation,
          source: data.utmParams?.source || 'direct'
        });
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'marketing_sebeszet_form',
          content_category: 'lead_magnet',
          value: 1,
          currency: 'HUF',
          lead_id: leadId
        });
      }

      // Custom analytics
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'marketing_sebeszet_form_submit',
          lead_id: leadId,
          user_occupation: data.occupation,
          traffic_source: data.utmParams?.source || 'direct',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error tracking form submission:', error);
    }
  }, []);

  return {
    state,
    updateFormData,
    clearError,
    resetForm,
    submitForm,
    goToBooking,
    goToThankYou,
    validateForm,
    getUtmParams,
    saveProgressToLocalStorage,
    loadProgressFromLocalStorage
  };
};