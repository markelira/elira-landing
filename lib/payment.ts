// Payment utilities for course platform MVP

import { CreateSessionRequest, CreateSessionResponse, PaymentStatusResponse } from '@/types/payment';

export const COURSE_CONFIG = {
  title: 'AI-alapú piac-kutatásos copywriting',
  price: 7990,
  currency: 'huf' as const,
  description: 'Teljes copywriting kurzus AI-alapú piackutatással és gyakorlatokkal'
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0,
  }).format(price);
}

export const paymentApi = {
  /**
   * Get payment status from backend
   */
  async getPaymentStatus(sessionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`/api/payment/status/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          status: 'failed',
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data: PaymentStatusResponse = await response.json();
      return data;
    } catch (error: any) {
      console.error('Payment status error:', error);
      return {
        success: false,
        status: 'failed',
        error: error.message || 'Failed to check payment status'
      };
    }
  },

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const result: CreateSessionResponse = await response.json();
      return result;
    } catch (error: any) {
      console.error('Create session error:', error);
      return {
        success: false,
        error: error.message || 'Failed to create checkout session'
      };
    }
  },

  /**
   * Redirect to Stripe Checkout
   */
  async redirectToCheckout(sessionId: string): Promise<void> {
    try {
      // For a better user experience, we can use the sessionId directly to redirect
      // First try to get checkout URL from our session details endpoint
      const response = await fetch(`/api/payment/session/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = data.checkoutUrl;
          return;
        }
      }

      // Fallback: If we can't get the URL from our API, we can still redirect
      // This shouldn't happen in normal flow but provides a fallback
      throw new Error('Unable to get checkout URL');
    } catch (error: any) {
      console.error('Redirect to checkout error:', error);
      throw error;
    }
  }
};
