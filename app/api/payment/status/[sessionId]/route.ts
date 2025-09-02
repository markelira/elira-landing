import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params;
    
    // Forward to Firebase Functions
    const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
      'https://api-5k33v562ya-ew.a.run.app';
    
    const response = await fetch(`${functionsUrl}/api/payment/status/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Payment status API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get payment status', status: 'failed' },
      { status: 500 }
    );
  }
}