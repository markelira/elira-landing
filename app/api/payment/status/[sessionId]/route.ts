import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseFunctionsApiUrl } from '@/lib/firebase-functions-url';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params;

    // Forward to Firebase Functions
    const functionsUrl = getFirebaseFunctionsApiUrl(`/api/payment/status/${sessionId}`);

    const response = await fetch(functionsUrl, {
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