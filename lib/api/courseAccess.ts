interface CourseAccessResponse {
  success: boolean;
  hasAccess: boolean;
  courseId?: string;
  reason?: string;
  purchasedAt?: string;
  grantedAt?: string;
}

export const checkCourseAccess = async (
  courseId: string, 
  userId: string
): Promise<CourseAccessResponse> => {
  try {
    const response = await fetch(
      `/api/courses/${courseId}/is-enrolled?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the response to match our expected format
    return {
      success: true,
      hasAccess: data.enrolled || data.hasCourseAccess || false,
      courseId: data.courseId,
      reason: data.enrolled ? 'Enrolled' : 'No course access',
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