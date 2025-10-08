import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { UserProgress } from '@/types/database';

/**
 * Real-time hook for user progress
 *
 * Subscribes to userProgress document and updates in real-time
 * when user completes lessons, updates streak, etc.
 *
 * @returns {progressData, isLoading, error}
 */
export function useUserProgressRealtime() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProgressData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      doc(db, 'userProgress', user.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          // Convert Firestore timestamps to Date objects
          const progressData: UserProgress = {
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
            lastActivityAt: data.lastActivityAt?.toDate?.() || data.lastActivityAt,
            enrolledCourses: data.enrolledCourses?.map((course: any) => ({
              ...course,
              enrolledAt: course.enrolledAt?.toDate?.() || course.enrolledAt,
              lastAccessedAt: course.lastAccessedAt?.toDate?.() || course.lastAccessedAt,
              completedAt: course.completedAt?.toDate?.() || course.completedAt,
            })) || [],
          } as UserProgress;

          setProgressData(progressData);
        } else {
          // Document doesn't exist yet, will be created by onUserCreate trigger
          setProgressData(null);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error('[useUserProgressRealtime] Error:', err);
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  return { progressData, isLoading, error };
}
