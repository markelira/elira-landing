/**
 * Centralized configuration and environment validation
 * This ensures consistent API endpoint configuration across the entire application
 */

import { z } from 'zod';

// Environment validation schema for client-side
const clientEnvSchema = z.object({
  // Firebase (public)
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase Messaging Sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  
  // Stripe (public)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_', "Invalid Stripe publishable key format"),
  
  // Optional
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
});

// Environment validation schema for server-side
const serverEnvSchema = z.object({
  // Firebase Admin (private)
  FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  FIREBASE_CLIENT_EMAIL: z.string().email("Valid Firebase client email is required"),
  FIREBASE_PRIVATE_KEY: z.string().includes('BEGIN PRIVATE KEY'),
  
  // Mux (private)
  MUX_TOKEN_ID: z.string().min(1, "Mux Token ID is required"),
  MUX_TOKEN_SECRET: z.string().min(1, "Mux Token Secret is required"),
  MUX_SIGNING_KEY: z.string().optional(), // Optional for development
  MUX_SIGNING_KEY_ID: z.string().optional(), // Optional for development
  
  // Stripe (private)
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', "Invalid Stripe secret key format"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_', "Invalid Stripe webhook secret format"),
  
  // SendGrid (private)
  SENDGRID_API_KEY: z.string().startsWith('SG.', "Invalid SendGrid API key format"),
  SENDGRID_FROM_EMAIL: z.string().email("Valid SendGrid from email is required"),
  
  // Optional
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
});

// Client-side configuration
export const clientConfig = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  },
};

// Server-side configuration (Node.js/Edge runtime)
export const serverConfig = {
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  mux: {
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
    signingKey: process.env.MUX_SIGNING_KEY,
    signingKeyId: process.env.MUX_SIGNING_KEY_ID,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL,
  },
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
  },
};

// Configuration validation functions
export const validateClientEnv = () => {
  try {
    const env = {
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    };
    
    return clientEnvSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Client environment validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
};

export const validateServerEnv = () => {
  try {
    const env = {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
      MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
      MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
      MUX_SIGNING_KEY: process.env.MUX_SIGNING_KEY,
      MUX_SIGNING_KEY_ID: process.env.MUX_SIGNING_KEY_ID,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
      DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    };
    
    return serverEnvSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Server environment validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
};

// Development fallback configuration
export const developmentConfig = {
  mux: {
    enabled: process.env.NODE_ENV === 'production',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  stripe: {
    enabled: !!process.env.STRIPE_SECRET_KEY,
  },
  sendgrid: {
    enabled: !!process.env.SENDGRID_API_KEY,
  },
};

export const getFirebaseFunctionsURL = (): string => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const useEmulators = process.env.USE_FIREBASE_EMULATORS === 'true'

  return process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL ||
         (isDevelopment && useEmulators
           ? 'http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api/api'
           : 'https://api-5k33v562ya-ew.a.run.app')
}

// Export as constant for backward compatibility
export const FIREBASE_FUNCTIONS_URL = getFirebaseFunctionsURL()

// Configuration validation on app start
export const initializeConfig = () => {
  if (typeof window !== 'undefined') {
    // Client-side validation
    try {
      validateClientEnv();
      console.log('✅ Client environment configuration valid');
    } catch (error) {
      console.warn('⚠️ Client environment configuration issues:', error);
    }
  } else {
    // Server-side validation
    try {
      validateServerEnv();
      console.log('✅ Server environment configuration valid');
    } catch (error) {
      console.warn('⚠️ Server environment configuration issues:', error);
    }
  }
};

/**
 * Make an authenticated request to Firebase Functions
 * @param endpoint - The API endpoint (starting with /api/)
 * @param options - Fetch options
 * @param token - Firebase auth token
 */
export const makeAuthenticatedRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}, 
  token?: string
): Promise<T> => {
  const baseURL = getFirebaseFunctionsURL()
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status} ${response.statusText}`
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // If JSON parsing fails, use status text
    }
    
    throw new Error(errorMessage)
  }
  
  return response.json()
}