import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    
    // Get auth token from headers
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    // Forward to Firebase Functions
    const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
      'https://api-5k33v562ya-ew.a.run.app';

    const response = await fetch(`${functionsUrl}/api/users/${userId}/progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('User progress API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get user progress',
        details: error.message 
      },
      { status: 500 }
    );
  }
}