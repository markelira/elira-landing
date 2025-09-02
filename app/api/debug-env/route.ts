import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  // CRITICAL: Debug environment variables for Firebase project ID mismatch
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    firebase: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasStripe: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    },
    vercel: {
      url: process.env.VERCEL_URL,
      environment: process.env.VERCEL_ENV
    }
  });
}