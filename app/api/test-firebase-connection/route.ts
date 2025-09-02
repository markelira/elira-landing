import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
      'https://api-5k33v562ya-ew.a.run.app';
    
    console.log('[Test] Testing connection to Firebase Functions:', functionsUrl);
    
    const response = await fetch(`${functionsUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('[Test] Firebase Functions response status:', response.status);
    const data = await response.json();
    console.log('[Test] Firebase Functions response data:', data);
    
    return NextResponse.json({
      success: true,
      functionsUrl,
      functionsResponse: data,
      functionsStatus: response.status
    });
    
  } catch (error: any) {
    console.error('[Test] Firebase connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Firebase Functions',
        details: error.message 
      },
      { status: 500 }
    );
  }
}