'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '@/lib/payment';
import { COURSE_CONFIG } from '@/types/payment';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useEnrollmentStatus } from '@/hooks/useEnrollmentStatus';

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
          className="academic-button inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-sm transition-all duration-300 text-white hover:shadow-lg transform hover:-translate-y-1 uppercase tracking-wide"
          style={{
            backgroundColor: '#0f766e',
            borderColor: '#134e4a',
            border: '1px solid #134e4a'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#134e4a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0f766e';
          }}
        >
          <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-9h10a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
          Tanulás folytatása
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
          academic-button inline-flex items-center justify-center px-8 py-4 
          text-lg font-semibold rounded-sm transition-all duration-300 uppercase tracking-wide
          ${isLoading || disabled
            ? 'cursor-not-allowed'
            : 'text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          }
        `}
        style={{
          backgroundColor: isLoading || disabled ? '#E2E8F0' : '#0f766e',
          color: isLoading || disabled ? '#64748B' : 'white',
          borderColor: isLoading || disabled ? '#CBD5E1' : '#134e4a',
          border: `1px solid ${isLoading || disabled ? '#CBD5E1' : '#134e4a'}`
        }}
        onMouseEnter={(e) => {
          if (!isLoading && !disabled) {
            e.currentTarget.style.backgroundColor = '#134e4a';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && !disabled) {
            e.currentTarget.style.backgroundColor = '#0f766e';
          }
        }}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Fizetés folyamatban...
          </>
        ) : !user ? (
          <>
            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Vásárlás és azonnali kezdés - {course ? formatPrice(course.price) : formatPrice(COURSE_CONFIG.price)}
          </>
        ) : (
          <>
            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Vásárlás és azonnali kezdés - {course ? formatPrice(course.price) : formatPrice(COURSE_CONFIG.price)}
          </>
        )}
      </button>


      <div className={`mt-4 text-xs ${textColor} academic-body`}>
        <p>🔒 Biztonságos fizetés Stripe segítségével</p>
        <p>💳 Bankkártya, Apple Pay, Google Pay elfogadva</p>
        <p>🇭🇺 Magyar számlázás és ÁFA kezelés</p>
      </div>
    </div>
  );
};

export default PurchaseButton;