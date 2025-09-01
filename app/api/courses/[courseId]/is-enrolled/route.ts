import { NextRequest, NextResponse } from 'next/server';

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

    // Forward to Firebase Functions
    const functionsUrl = 'https://europe-west1-elira-landing-ce927.cloudfunctions.net';
    const response = await fetch(
      `${functionsUrl}/api/enrollments/check/${courseId}?userId=${userId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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