'use client';

import { useRef, useEffect, RefObject } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwiping?: (direction: SwipeDirection, distance: number) => void;
  onSwipeEnd?: () => void;
}

interface SwipeConfig {
  threshold?: number; // Minimum distance for swipe (default: 50px)
  velocity?: number; // Minimum velocity for swipe (default: 0.3)
  preventScroll?: boolean; // Prevent scroll during swipe
  trackMouse?: boolean; // Also track mouse events
  enabled?: boolean; // Enable/disable swipe detection
}

type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

interface SwipeState {
  startX: number;
  startY: number;
  startTime: number;
  currentX: number;
  currentY: number;
  isSwiping: boolean;
  direction: SwipeDirection;
}

/**
 * useSwipeGesture - Hook for detecting and handling swipe gestures
 * 
 * @param handlers - Object containing swipe event handlers
 * @param config - Configuration options for swipe detection
 * @returns ref - Ref to attach to the swipeable element
 */
export const useSwipeGesture = <T extends HTMLElement = HTMLDivElement>(
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
): RefObject<T | null> => {
  const {
    threshold = 50,
    velocity = 0.3,
    preventScroll = true,
    trackMouse = false,
    enabled = true,
  } = config;

  const ref = useRef<T>(null);
  const stateRef = useRef<SwipeState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    isSwiping: false,
    direction: null,
  });

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    let animationFrame: number | null = null;

    const getDirection = (deltaX: number, deltaY: number): SwipeDirection => {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > absY) {
        return deltaX > 0 ? 'right' : 'left';
      } else {
        return deltaY > 0 ? 'down' : 'up';
      }
    };

    const handleStart = (clientX: number, clientY: number) => {
      stateRef.current = {
        startX: clientX,
        startY: clientY,
        startTime: Date.now(),
        currentX: clientX,
        currentY: clientY,
        isSwiping: false,
        direction: null,
      };
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!stateRef.current.startTime) return;

      const state = stateRef.current;
      const deltaX = clientX - state.startX;
      const deltaY = clientY - state.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Start swiping after moving 10px
      if (!state.isSwiping && distance > 10) {
        state.isSwiping = true;
        state.direction = getDirection(deltaX, deltaY);
      }

      if (state.isSwiping) {
        state.currentX = clientX;
        state.currentY = clientY;

        // Call onSwiping handler
        if (handlers.onSwiping && state.direction) {
          if (animationFrame) cancelAnimationFrame(animationFrame);
          animationFrame = requestAnimationFrame(() => {
            handlers.onSwiping!(state.direction!, distance);
          });
        }

        // Prevent scroll if configured
        if (preventScroll) {
          document.body.style.overflow = 'hidden';
          document.body.style.touchAction = 'none';
        }
      }
    };

    const handleEnd = () => {
      const state = stateRef.current;
      
      if (state.isSwiping) {
        const deltaX = state.currentX - state.startX;
        const deltaY = state.currentY - state.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Date.now() - state.startTime;
        const speed = distance / duration;

        // Check if swipe meets threshold and velocity requirements
        if (distance >= threshold && speed >= velocity) {
          const direction = getDirection(deltaX, deltaY);

          // Call appropriate handler based on direction
          switch (direction) {
            case 'left':
              handlers.onSwipeLeft?.();
              break;
            case 'right':
              handlers.onSwipeRight?.();
              break;
            case 'up':
              handlers.onSwipeUp?.();
              break;
            case 'down':
              handlers.onSwipeDown?.();
              break;
          }
        }

        // Call onSwipeEnd handler
        handlers.onSwipeEnd?.();

        // Reset body styles
        if (preventScroll) {
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
        }
      }

      // Reset state
      stateRef.current = {
        startX: 0,
        startY: 0,
        startTime: 0,
        currentX: 0,
        currentY: 0,
        isSwiping: false,
        direction: null,
      };

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Mouse event handlers (optional)
    const handleMouseDown = (e: MouseEvent) => {
      if (trackMouse) {
        handleStart(e.clientX, e.clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (trackMouse && stateRef.current.startTime) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      if (trackMouse) {
        handleEnd();
      }
    };

    const handleMouseLeave = () => {
      if (trackMouse && stateRef.current.isSwiping) {
        handleEnd();
      }
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    if (trackMouse) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);

      if (trackMouse) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // Reset body styles
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [enabled, handlers, threshold, velocity, preventScroll, trackMouse]);

  return ref;
};

/**
 * useSwipeableCarousel - Hook for swipeable carousel/slider
 */
export const useSwipeableCarousel = (
  totalItems: number,
  onChange?: (index: number) => void
) => {
  const currentIndexRef = useRef(0);

  const goToNext = () => {
    const newIndex = (currentIndexRef.current + 1) % totalItems;
    currentIndexRef.current = newIndex;
    onChange?.(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndexRef.current - 1 + totalItems) % totalItems;
    currentIndexRef.current = newIndex;
    onChange?.(newIndex);
  };

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
  });

  return {
    ref: swipeRef,
    currentIndex: currentIndexRef.current,
    goToNext,
    goToPrevious,
  };
};

/**
 * useSwipeToClose - Hook for swipe-to-close functionality
 */
export const useSwipeToClose = (
  onClose: () => void,
  config?: {
    direction?: 'down' | 'up' | 'any';
    threshold?: number;
  }
) => {
  const { direction = 'down', threshold = 100 } = config || {};

  const swipeRef = useSwipeGesture<HTMLDivElement>(
    {
      onSwipeDown: direction === 'down' || direction === 'any' ? onClose : undefined,
      onSwipeUp: direction === 'up' || direction === 'any' ? onClose : undefined,
    },
    {
      threshold,
    }
  );

  return swipeRef;
};

/**
 * useSwipeNavigation - Hook for swipe-based navigation
 */
export const useSwipeNavigation = (
  onNavigate: (direction: 'forward' | 'back') => void,
  config?: SwipeConfig
) => {
  const swipeRef = useSwipeGesture<HTMLDivElement>(
    {
      onSwipeLeft: () => onNavigate('forward'),
      onSwipeRight: () => onNavigate('back'),
    },
    config
  );

  return swipeRef;
};

export default useSwipeGesture;