import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';

// Use same Firebase Functions URL as other APIs
const FUNCTIONS_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api'
  : 'https://api-5k33v562ya-ew.a.run.app/api';

export const useEnrollmentStatus = (courseId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['enrollment', courseId, user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        return { enrolled: false };
      }
      
      try {
        // Get Firebase auth token
        const token = await auth.currentUser?.getIdToken();
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        // Add auth header if token available
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(
          `${FUNCTIONS_BASE_URL}/enrollments/check/${courseId}?userId=${user.uid}`,
          {
            headers,
          }
        );
        
        if (!response.ok) {
          console.error('Failed to check enrollment status');
          return { enrolled: false };
        }
        
        const data = await response.json();
        
        // Transform response to match expected format
        return {
          enrolled: data.isEnrolled || data.enrolled || false,
          enrollmentData: data.enrollmentData || null
        };
      } catch (error) {
        console.error('Error checking enrollment:', error);
        return { enrolled: false };
      }
    },
    enabled: !!user?.uid && !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to invalidate enrollment cache when needed
export const useInvalidateEnrollment = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return (courseId?: string) => {
    if (courseId) {
      queryClient.invalidateQueries({ 
        queryKey: ['enrollment', courseId, user?.uid] 
      });
    } else {
      queryClient.invalidateQueries({ 
        queryKey: ['enrollment'] 
      });
    }
  };
};