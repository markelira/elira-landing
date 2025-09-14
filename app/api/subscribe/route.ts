import { NextRequest, NextResponse } from 'next/server';
import { adminApp } from '@/lib/firebase-admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Types
interface SubscribeRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  job?: string;
  education?: string;
  magnetId?: string;
  magnetTitle?: string;
  magnetSelected?: string;
  selectedMagnets?: string[];
  selectedVideoUrl?: string;
  source?: string;
}

// Validation schema (matches Firebase Functions)
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  phone: z.string().optional(),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional(),
  magnetId: z.string().optional(),
  magnetTitle: z.string().optional(),
  magnetSelected: z.string().optional(),
  selectedMagnets: z.array(z.string()).optional(),
  selectedVideoUrl: z.string().optional(),
  source: z.string().optional(),
  metadata: z.object({
    phone: z.string().optional(),
    selectedVideoUrl: z.string().optional(),
  }).optional(),
});

// Firebase Functions URL - HARDCODED FIX for environment variable issues
const FUNCTIONS_URL = `https://api-5k33v562ya-ew.a.run.app/api/subscribe`; // Direct working URL

console.log('🔧 Next.js API route using Functions URL:', FUNCTIONS_URL);

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
    console.log('[API] Request data:', JSON.stringify(validationResult.data, null, 2));

    // Handle metadata fields - Firebase Functions now supports them
    const { metadata, ...baseData } = validationResult.data;
    
    // Merge metadata fields into main data if present
    const dataForFirebase = {
      ...baseData,
      // Include phone from metadata if not already present
      phone: baseData.phone || metadata?.phone,
      // Include video URL info
      ...(metadata?.selectedVideoUrl && { selectedVideoUrl: metadata.selectedVideoUrl })
    };
    
    // Log video modal submissions for debugging
    if (validationResult.data.source === 'video-modal') {
      console.log('[API] Video modal submission detected');
      console.log('[API] Data being sent to Firebase:', JSON.stringify(dataForFirebase, null, 2));
    }

    // Call Firebase Functions for other submissions
    const functionsResponse = await fetch(FUNCTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForFirebase),
    });

    // Handle Functions response
    if (!functionsResponse.ok) {
      let errorMessage = 'Hiba történt az email küldése során. Kérjük próbáld újra később.';
      
      try {
        const errorText = await functionsResponse.text();
        console.error(`Firebase Functions error (${functionsResponse.status}):`, errorText);
        
        // Try to parse as JSON if possible
        if (errorText.startsWith('{') || errorText.startsWith('[')) {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorMessage;
        }
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
      
      // Return user-friendly error
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage 
        },
        { status: 500 }
      );
    }

    // Parse and return successful response
    let result;
    try {
      const responseText = await functionsResponse.text();
      
      // Check if response is JSON
      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        result = JSON.parse(responseText);
      } else {
        console.error('Non-JSON response from Firebase Functions:', responseText);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Váratlan hiba történt. Kérjük próbáld újra később.' 
          },
          { status: 500 }
        );
      }
    } catch (e) {
      console.error('Failed to parse Functions response:', e);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Váratlan hiba történt. Kérjük próbáld újra később.' 
        },
        { status: 500 }
      );
    }
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