'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { checkCourseAccess } from '@/lib/api/courseAccess';

interface CourseAccessResponse {
  success: boolean;
  hasAccess: boolean;
  courseId?: string;
  reason?: string;
  purchasedAt?: string;
  grantedAt?: string;
}

export const useCourseAccess = (courseId: string = 'ai-copywriting-course') => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessDetails, setAccessDetails] = useState<CourseAccessResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setLoading(false);
        setError('User not authenticated');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await checkCourseAccess(courseId, user.uid);

        if (mounted) {
          setAccessDetails(data);
          setHasAccess(data.success && data.hasAccess);
          setError(data.success ? null : 'Access check failed');
        }
      } catch (err) {
        console.error('Course access check error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          setHasAccess(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [user, courseId]);

  const refetchAccess = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await checkCourseAccess(courseId, user.uid);
      setAccessDetails(data);
      setHasAccess(data.success && data.hasAccess);
      setError(null);
    } catch (err) {
      console.error('Course access refetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    hasAccess,
    loading,
    error,
    accessDetails,
    refetchAccess
  };
};