import { loadStripe } from '@stripe/stripe-js';
import { CreateSessionRequest, CreateSessionResponse, PaymentStatusResponse } from '../src/types/payment';

// Initialize Stripe
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Payment API functions
export const paymentApi = {
  // Create checkout session
  async createCheckoutSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Create checkout session error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }
  },

  // Get payment status
  async getPaymentStatus(sessionId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`/api/payment/status/${sessionId}`);

      if (!response.ok) {
        throw new Error('Failed to get payment status');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Get payment status error:', error);
      throw new Error(error.message || 'Failed to get payment status');
    }
  },

  // Redirect to checkout
  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe not available');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe redirect error:', error);
      throw new Error(error.message || 'Failed to redirect to checkout');
    }
  }
};

// Helper function to format currency
export function formatPrice(amount: number, currency: string = 'HUF'): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
}