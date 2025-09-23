// Payment types for MVP

export interface PaymentStatusResponse {
  success: boolean;
  status: 'pending' | 'completed' | 'failed';
  courseAccess?: boolean;
  error?: string;
}

export interface CreateSessionRequest {
  uid: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
  courseId?: string;
  stripePriceId?: string;
}

export interface CreateSessionResponse {
  success: boolean;
  sessionId?: string;
  checkoutUrl?: string;
  error?: string;
}

export const COURSE_CONFIG = {
  title: '3x több érdeklődő - vállalkozói vevőpszichológia masterclass',
  price: 49990,
  currency: 'HUF' as const,
  description: 'Teljes Grand Slam ajánlat: masterclass + 3 bundle + 3 bónusz + tripla garancia',
  stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',
  stripeProductId: 'prod_SwFQ50r0KCrxss'
};
