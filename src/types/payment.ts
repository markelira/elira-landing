import { Timestamp } from 'firebase/firestore';

// Payment document stored in Firestore
export interface PaymentDocument {
  userId: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  amount: number; // 7990
  currency: 'huf';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  courseAccess: boolean;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

// API Request/Response interfaces
export interface CreateSessionRequest {
  uid: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateSessionResponse {
  success: boolean;
  sessionId: string;
  checkoutUrl: string;
  error?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  status: 'pending' | 'completed' | 'failed';
  courseAccess: boolean;
  error?: string;
}

// Stripe webhook event types
export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
}

// Course pricing configuration
export const COURSE_CONFIG = {
  price: 7990, // HUF
  currency: 'huf',
  title: 'AI-alapú piac-kutatásos copywriting',
  description: 'Teljes copywriting kurzus AI-alapú piackutatással'
} as const;