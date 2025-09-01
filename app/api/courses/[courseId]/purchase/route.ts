import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await context.params;
    console.log('[API Route] Purchase request for course:', courseId);
    
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