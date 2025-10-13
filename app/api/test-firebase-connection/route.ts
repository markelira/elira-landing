import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseFunctionsApiUrl } from '@/lib/firebase-functions-url';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const functionsUrl = getFirebaseFunctionsApiUrl('/api/health');

    console.log('[Test] Testing connection to Firebase Functions:', functionsUrl);

    const response = await fetch(functionsUrl, {
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