import { useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase';

/**
 * Hook for tracking video watch time and completion
 *
 * Automatically logs learning activities when user watches videos
 *
 * @param courseId - ID of the course
 * @param lessonId - ID of the lesson
 * @param videoElement - HTML video element reference
 * @returns {totalWatchTime}
 */
export function useVideoTracking(
  courseId: string,
  lessonId: string,
  videoElement: HTMLVideoElement | null
) {
  const startTimeRef = useRef<number>(0);
  const totalWatchTimeRef = useRef<number>(0);
  const hasStartedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!videoElement || !courseId || !lessonId) return;

    const handlePlay = async () => {
      startTimeRef.current = Date.now();

      // Log lesson started (only once per session)
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;

        try {
          const user = auth.currentUser;
          if (!user) return;

          const token = await user.getIdToken();

          await fetch('/api/learning-activities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 'lesson_started',
              courseId,
              lessonId,
              metadata: {},
            }),
          });

          console.log('[Video Tracking] Lesson started logged');
        } catch (error) {
          console.error('[Video Tracking] Error logging lesson start:', error);
        }
      }
    };

    const handlePause = () => {
      if (startTimeRef.current > 0) {
        const watchTime = (Date.now() - startTimeRef.current) / 1000; // seconds
        totalWatchTimeRef.current += watchTime;
        startTimeRef.current = 0;
      }
    };

    const handleEnded = async () => {
      handlePause();

      // Log lesson completion
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        const response = await fetch('/api/learning-activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'lesson_completed',
            courseId,
            lessonId,
            metadata: {
              duration: Math.round(totalWatchTimeRef.current),
            },
          }),
        });

        if (response.ok) {
          console.log('[Video Tracking] Lesson completion logged with watch time:', Math.round(totalWatchTimeRef.current), 's');
        } else {
          const errorData = await response.json();
          console.error('[Video Tracking] Error logging completion:', errorData);
        }
      } catch (error) {
        console.error('[Video Tracking] Error logging lesson completion:', error);
      }
    };

    // Add event listeners
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    // Cleanup on unmount
    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);

      // Log final watch time if video is playing when component unmounts
      if (startTimeRef.current > 0) {
        handlePause();
      }
    };
  }, [videoElement, courseId, lessonId]);

  return {
    totalWatchTime: totalWatchTimeRef.current,
  };
}
