interface CourseAccessResponse {
  success: boolean;
  hasAccess: boolean;
  courseId?: string;
  reason?: string;
  purchasedAt?: string;
  grantedAt?: string;
}

// Use same Firebase Functions URL as course data
const FUNCTIONS_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api/api'
  : 'https://api-5k33v562ya-ew.a.run.app/api';

console.log('🔧 [courseAccess] FUNCTIONS_BASE_URL:', {
  url: FUNCTIONS_BASE_URL,
  nodeEnv: process.env.NODE_ENV
});

export const checkCourseAccess = async (
  courseId: string, 
  userId: string
): Promise<CourseAccessResponse> => {
  try {
    // Get Firebase auth token
    const { auth } = await import('@/lib/firebase');
    const token = await auth.currentUser?.getIdToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth header if token available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fullUrl = `${FUNCTIONS_BASE_URL}/enrollments/check/${courseId}?userId=${userId}`;
    console.log('🌐 [checkCourseAccess] Making enrollment check request:', {
      baseUrl: FUNCTIONS_BASE_URL,
      fullUrl,
      courseId,
      userId,
      hasAuth: !!token
    });

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the response to match our expected format
    return {
      success: true,
      hasAccess: data.isEnrolled || data.enrolled || data.hasCourseAccess || false,
      courseId: data.courseId,
      reason: data.isEnrolled ? 'Enrolled' : 'No course access',
      grantedAt: data.enrollmentDetails?.enrolledAt
    };
  } catch (error) {
    console.error('Course access check error:', error);
    return {
      success: false,
      hasAccess: false,
      reason: error instanceof Error ? error.message : 'Network error'
    };
  }
};

export const getUserCourses = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get user courses error:', error);
    return {
      success: false,
      courses: [],
      totalCourses: 0,
      hasCourseAccess: false
    };
  }
};