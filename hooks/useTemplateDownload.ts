import { auth } from '@/lib/firebase';

/**
 * Hook for tracking template downloads
 *
 * Provides a function to track when user downloads a template
 *
 * @returns {trackDownload}
 */
export function useTemplateDownload() {
  /**
   * Tracks a template download and logs as learning activity
   *
   * @param templateId - ID of the template being downloaded
   * @param courseId - ID of the course (optional, defaults to ai-copywriting-course)
   */
  const trackDownload = async (templateId: string, courseId = 'ai-copywriting-course') => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('[Template Download] No user logged in');
        return;
      }

      const token = await user.getIdToken();

      // Log as learning activity
      const response = await fetch('/api/learning-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'template_downloaded',
          courseId,
          metadata: { templateId },
        }),
      });

      if (response.ok) {
        console.log('[Template Download] Download tracked for template:', templateId);
      } else {
        const errorData = await response.json();
        console.error('[Template Download] Error tracking download:', errorData);
      }
    } catch (error) {
      console.error('[Template Download] Error tracking template download:', error);
    }
  };

  return { trackDownload };
}
