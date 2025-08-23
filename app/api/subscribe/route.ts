import { NextRequest, NextResponse } from 'next/server';
import { adminApp } from '@/lib/firebase-admin';
import { z } from 'zod';

// Required for static export with API routes
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Types
interface SubscribeRequest {
  email: string;
  firstName: string;
  lastName: string;
  job?: string;
  education?: string;
  magnetId?: string;
  magnetTitle?: string;
  magnetSelected?: string;
  selectedMagnets?: string[];
  source?: string;
}

// Validation schema (matches Firebase Functions)
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional(),
  magnetId: z.string().optional(),
  magnetTitle: z.string().optional(),
  magnetSelected: z.string().optional(),
  selectedMagnets: z.array(z.string()).optional(),
  source: z.string().optional(),
});

// Firebase Functions URL
const FUNCTIONS_URL = `https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/api/subscribe`;

// Get access token for authenticating with Firebase Functions
async function getAccessToken(): Promise<string | null> {
  try {
    if (!adminApp) {
      console.error('Firebase Admin not initialized');
      return null;
    }

    // Get access token using the service account
    const credential = adminApp.options.credential;
    if (!credential || typeof credential.getAccessToken !== 'function') {
      console.error('No valid credential found');
      return null;
    }

    const accessTokenObj = await credential.getAccessToken();
    return accessTokenObj.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse and validate request body
    let body: SubscribeRequest;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Invalid JSON in request body:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    console.log(`[API] Processing subscription request for: ${validationResult.data.email}`);

    // Call Firebase Functions (now public)
    const functionsResponse = await fetch(FUNCTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationResult.data),
    });

    // Handle Functions response
    if (!functionsResponse.ok) {
      const errorText = await functionsResponse.text();
      console.error(`Firebase Functions error (${functionsResponse.status}):`, errorText);
      
      // Return user-friendly error
      return NextResponse.json(
        { 
          success: false, 
          error: 'Hiba történt az email küldése során. Kérjük próbáld újra később.' 
        },
        { status: 500 }
      );
    }

    // Parse and return successful response
    const result = await functionsResponse.json();
    const duration = Date.now() - startTime;
    
    console.log(`[API] Successfully processed subscription in ${duration}ms`);
    
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[API] Subscription failed after ${duration}ms:`, error);
    
    // Return generic error to avoid exposing internals
    return NextResponse.json(
      { 
        success: false, 
        error: 'Hiba történt. Kérjük próbáld újra később.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}