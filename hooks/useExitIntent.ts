'use client';

import { useState, useEffect } from 'react';

interface UseExitIntentOptions {
  threshold?: number; // Pixels from top to trigger
  delay?: number; // Delay before popup can show again (ms)
  sensitivity?: number; // Mouse speed sensitivity
  onExitIntent?: () => void;
}

const useExitIntent = ({
  threshold = 50,
  delay = 1000,
  sensitivity = 100,
  onExitIntent
}: UseExitIntentOptions = {}) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [canTrigger, setCanTrigger] = useState(true);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem('exit-intent-shown');
    if (hasShown) {
      setCanTrigger(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (event: MouseEvent) => {
      // Only trigger if:
      // 1. Mouse is moving upward (negative Y velocity)
      // 2. Mouse is near the top of the viewport
      // 3. We haven't already triggered
      // 4. We can trigger (not in cooldown)
      if (
        event.clientY <= threshold &&
        event.movementY < -sensitivity &&
        !isTriggered &&
        canTrigger
      ) {
        setIsTriggered(true);
        setCanTrigger(false);
        sessionStorage.setItem('exit-intent-shown', 'true');
        onExitIntent?.();
      }
    };

    const handleMouseEnter = () => {
      // Clear timeout when mouse re-enters
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    const handleVisibilityChange = () => {
      // Trigger if user switches tabs (another exit intent)
      if (
        document.visibilityState === 'hidden' &&
        !isTriggered &&
        canTrigger
      ) {
        // Small delay to avoid false positives
        timeoutId = setTimeout(() => {
          setIsTriggered(true);
          setCanTrigger(false);
          sessionStorage.setItem('exit-intent-shown', 'true');
          onExitIntent?.();
        }, 500);
      }
    };

    // Mobile: detect rapid scroll up (exit intent alternative)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = lastScrollY - currentScrollY;
      
      // If user scrolls up rapidly from below fold
      if (
        scrollDifference > 150 && // Rapid upward scroll
        currentScrollY > 500 && // Not at top of page
        !isTriggered &&
        canTrigger
      ) {
        setIsTriggered(true);
        setCanTrigger(false);
        sessionStorage.setItem('exit-intent-shown', 'true');
        onExitIntent?.();
      }
      
      lastScrollY = currentScrollY;
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, delay, sensitivity, isTriggered, canTrigger, onExitIntent]);

  const reset = () => {
    setIsTriggered(false);
    setTimeout(() => {
      setCanTrigger(true);
      sessionStorage.removeItem('exit-intent-shown');
    }, delay);
  };

  const disable = () => {
    setCanTrigger(false);
    sessionStorage.setItem('exit-intent-shown', 'true');
  };

  return {
    isTriggered,
    canTrigger,
    reset,
    disable
  };
};

export default useExitIntent;