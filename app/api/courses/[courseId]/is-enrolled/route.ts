import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseFunctionsApiUrl } from '@/lib/firebase-functions-url';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { courseId } = await params;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      );
    }

    // Get auth token from headers
    const authHeader = request.headers.get('authorization');

    // Forward to Firebase Functions
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    // Forward auth header if present
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const functionsUrl = getFirebaseFunctionsApiUrl(`/api/enrollments/check/${courseId}?userId=${userId}`);

    const response = await fetch(
      functionsUrl,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Functions API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error checking enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to check enrollment status' },
      { status: 500 }
    );
  }
}