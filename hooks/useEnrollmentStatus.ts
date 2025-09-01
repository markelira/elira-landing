import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

export const useEnrollmentStatus = (courseId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['enrollment', courseId, user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        return { enrolled: false };
      }
      
      try {
        const response = await fetch(
          `/api/courses/${courseId}/is-enrolled?userId=${user.uid}`
        );
        
        if (!response.ok) {
          console.error('Failed to check enrollment status');
          return { enrolled: false };
        }
        
        const data = await response.json();
        return data;
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