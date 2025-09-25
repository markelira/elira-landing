'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '@/lib/payment';
import { COURSE_CONFIG } from '@/types/payment';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useEnrollmentStatus } from '@/hooks/useEnrollmentStatus';
import { Lock, ArrowRight } from 'lucide-react';

interface PurchaseButtonProps {
  courseId?: string;
  course?: {
    id: string;
    title: string;
    price: number;
    currency: string;
    stripePriceId?: string;
    isFree?: boolean;
  };
  onPurchaseStart?: () => void;
  onPurchaseSuccess?: () => void;
  onPurchaseError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

// Function to determine if background is dark
const isDarkBackground = (element: HTMLElement | null): boolean => {
  if (!element) return false;
  
  const computedStyle = window.getComputedStyle(element);
  const bgColor = computedStyle.backgroundColor;
  
  // Parse RGB values
  const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    // Calculate luminance using standard formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  
  // If no background color or transparent, check parent
  return isDarkBackground(element.parentElement);
};

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  courseId = 'ai-copywriting-course',
  course,
  onPurchaseStart,
  onPurchaseSuccess,
  onPurchaseError,
  className = '',
  disabled = false
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [textColor, setTextColor] = useState('text-academic-slate-600');
  const currentCourseId = course?.id || courseId;
  const { data: enrollmentData, isLoading: enrollmentLoading } = useEnrollmentStatus(currentCourseId);

  // Check background and set text color
  useEffect(() => {
    const checkBackground = () => {
      const container = document.querySelector('.text-center');
      if (isDarkBackground(container as HTMLElement)) {
        setTextColor('text-white');
      } else {
        setTextColor('text-academic-slate-600');
      }
    };
    
    checkBackground();
    // Re-check when component mounts or updates
    const observer = new MutationObserver(checkBackground);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  const handlePurchase = async () => {
    const currentCourseId = course?.id || courseId;
    
    // If not logged in, silently redirect to auth page with course purchase intent
    if (!user) {
      const currentUrl = window.location.pathname;
      router.push(`/auth?redirect=${encodeURIComponent(currentUrl)}&courseId=${currentCourseId}`);
      return;
    }
    
    if (isLoading || disabled) return;

    if (enrollmentData?.enrolled) {
      onPurchaseError?.('Már beiratkoztál erre a kurzusra');
      return;
    }

    // Check if course is free
    if (course?.isFree) {
      onPurchaseError?.('Ez a kurzus ingyenes, nincs szükség fizetésre');
      return;
    }

    // Use default Stripe Price ID if course doesn't have one
    const stripePriceId = course?.stripePriceId || COURSE_CONFIG.stripePriceId || 'price_1S2g4HHhqyKpFIBMp3uCFZta';

    setIsLoading(true);
    onPurchaseStart?.();

    try {
      // Get Firebase auth token
      console.log('[PurchaseButton] Getting auth token for user:', user?.uid);
    console.log('[PurchaseButton] Firebase Project ID being used:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
      const token = await auth.currentUser?.getIdToken();
      console.log('[PurchaseButton] Token obtained:', token ? 'Yes' : 'No');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Create payment session using local API route
      console.log('[PurchaseButton] Calling purchase API for course:', currentCourseId);
      const response = await fetch(`/api/courses/${currentCourseId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&courseId=${currentCourseId}`,
          cancelUrl: `${window.location.origin}/payment/cancel?courseId=${currentCourseId}`
        })
      });

      console.log('[PurchaseButton] Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('[PurchaseButton] Error response:', errorData);
        throw new Error(errorData.error || 'Fizetési munkamenet létrehozása sikertelen');
      }

      const sessionData = await response.json();

      if (!sessionData.success) {
        throw new Error(sessionData.error || 'Failed to create checkout session');
      }

      // If we have a checkout URL directly from the session creation, use it
      if (sessionData.checkoutUrl) {
        window.location.href = sessionData.checkoutUrl;
        return;
      }

      // Fallback: If no checkout URL, throw error
      throw new Error('No checkout URL received from payment session');

      // This won't execute due to redirect, but just in case
      onPurchaseSuccess?.();
    } catch (error: any) {
      console.error('Purchase error:', error);
      onPurchaseError?.(error.message || 'Fizetési hiba történt');
    } finally {
      setIsLoading(false);
    }
  };

  // Show "Continue Learning" button if user is enrolled
  if (enrollmentData?.enrolled) {
    return (
      <div className={`text-center ${className}`}>
        <button
          onClick={() => router.push(`/courses/${currentCourseId}/learn`)}
          className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 active:scale-95 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/30"
        >
          <span className="flex items-center justify-center">
            <Lock className="w-5 h-5 mr-3" />
            Tanulás folytatása
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handlePurchase}
        disabled={isLoading || disabled}
        className={`
          group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 active:scale-95 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/30
          ${isLoading || disabled
            ? 'cursor-not-allowed opacity-50'
            : ''
          }
        `}
      >
        <span className="flex items-center justify-center">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Fizetés folyamatban...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-3" />
              Jelentkezés a masterclassra - {course ? formatPrice(course.price) : formatPrice(COURSE_CONFIG.price)}
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default PurchaseButton;