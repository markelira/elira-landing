import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseFunctionsApiUrl } from '@/lib/firebase-functions-url';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Add logging to verify route is loaded
console.log('[ROUTE LOADED] Purchase route.ts loaded at:', new Date().toISOString());

// Helper to extract courseId from URL
function getCourseIdFromUrl(url: string): string | null {
  const match = url.match(/\/api\/courses\/([^\/]+)\/purchase/);
  return match ? match[1] : null;
}

// Add GET handler for debugging - NO params to avoid Next.js 15 issues
export async function GET(request: NextRequest) {
  console.log('[API Route - GET] GET handler invoked for debugging');
  console.log('[API Route - GET] Request URL:', request.url);

  try {
    // Extract courseId from URL
    const courseId = getCourseIdFromUrl(request.url);
    console.log('[API Route - GET] Course ID from URL:', courseId);

    return NextResponse.json({
      success: true,
      message: 'GET handler works',
      courseId,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[API Route - GET] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

// POST handler - NO params to avoid Next.js 15 issues
export async function POST(request: NextRequest) {
  console.log('[API Route - ENTRY] POST handler invoked at:', new Date().toISOString());
  console.log('[API Route - ENTRY] Request URL:', request.url);
  console.log('[API Route - ENTRY] Request method:', request.method);

  try {
    // Extract courseId from URL
    const courseId = getCourseIdFromUrl(request.url);
    console.log('[API Route - PARAMS] Course ID from URL:', courseId);

    if (!courseId) {
      console.error('[API Route - PARAMS] No course ID found!');
      return NextResponse.json({
        success: false,
        error: 'Course ID is required'
      }, { status: 400 });
    }

    console.log('[API Route - PARAMS] Final Course ID:', courseId);
    
    const body = await request.json();
    const { successUrl, cancelUrl } = body;
    
    // Get auth token from headers
    const authHeader = request.headers.get('authorization');
    console.log('[API Route] Auth header present:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[API Route] Missing or invalid auth header');
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    console.log('[API Route] Token extracted, length:', token?.length);
    
    // Forward to Firebase Functions
    const functionsUrl = getFirebaseFunctionsApiUrl(`/api/courses/${courseId}/purchase`);
    console.log('[API Route] Using Firebase Functions URL:', functionsUrl);

    const response = await fetch(functionsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        successUrl,
        cancelUrl
      })
    });
    
    console.log('[API Route] Firebase Functions response status:', response.status);
    const data = await response.json();
    console.log('[API Route] Firebase Functions response data:', data);
    
    if (!response.ok) {
      console.error('[API Route] Firebase Functions error:', data);
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Course purchase API error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process course purchase',
        details: error.message 
      },
      { status: 500 }
    );
  }
}