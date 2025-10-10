import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Add logging to verify route is loaded
console.log('[ROUTE LOADED] Purchase route.ts loaded at:', new Date().toISOString());

// Helper to extract courseId from URL
function getCourseIdFromUrl(url: string): string | null {
  const match = url.match(/\/api\/courses\/([^\/]+)\/purchase/);
  return match ? match[1] : null;
}

// Add GET handler for debugging
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ courseId: string }> }
) {
  console.log('[API Route - GET] GET handler invoked for debugging');
  console.log('[API Route - GET] Request URL:', request.url);

  try {
    // Extract courseId from URL as fallback
    const courseIdFromUrl = getCourseIdFromUrl(request.url);
    console.log('[API Route - GET] Course ID from URL:', courseIdFromUrl);

    // Try to get params from context
    let courseId = courseIdFromUrl;
    try {
      const params = await props.params;
      courseId = params.courseId || courseIdFromUrl;
      console.log('[API Route - GET] Course ID from params:', params.courseId);
    } catch (e) {
      console.log('[API Route - GET] Params error, using URL extraction:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'GET handler works',
      courseId,
      extractedFromUrl: courseIdFromUrl,
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

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ courseId: string }> }
) {
  console.log('[API Route - ENTRY] POST handler invoked at:', new Date().toISOString());
  console.log('[API Route - ENTRY] Request URL:', request.url);
  console.log('[API Route - ENTRY] Request method:', request.method);

  try {
    // Extract courseId from URL as primary method
    const courseIdFromUrl = getCourseIdFromUrl(request.url);
    console.log('[API Route - PARAMS] Course ID from URL:', courseIdFromUrl);

    // Try to get params from context as backup
    let courseId = courseIdFromUrl;
    try {
      const params = await props.params;
      courseId = params.courseId || courseIdFromUrl;
      console.log('[API Route - PARAMS] Course ID from params:', params.courseId);
    } catch (e) {
      console.log('[API Route - PARAMS] Using URL extraction due to params error:', e);
    }

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
    
    // Forward to Firebase Functions - using correct production URL
    const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
      'https://api-5k33v562ya-ew.a.run.app';
    console.log('[API Route] Using Firebase Functions URL:', functionsUrl);
    
    const response = await fetch(`${functionsUrl}/api/courses/${courseId}/purchase`, {
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