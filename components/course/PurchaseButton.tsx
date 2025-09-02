'use client';

import React, { useState } from 'react';
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
  const currentCourseId = course?.id || courseId;
  const { data: enrollmentData, isLoading: enrollmentLoading } = useEnrollmentStatus(currentCourseId);

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
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
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
          inline-flex items-center justify-center px-8 py-4 
          text-lg font-semibold rounded-lg transition-all duration-200
          ${isLoading || disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }
        `}
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


      <div className="mt-4 text-xs text-gray-400">
        <p>🔒 Biztonságos fizetés Stripe segítségével</p>
        <p>💳 Bankkártya, Apple Pay, Google Pay elfogadva</p>
        <p>🇭🇺 Magyar számlázás és ÁFA kezelés</p>
      </div>
    </div>
  );
};

export default PurchaseButton;