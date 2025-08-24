'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { paymentApi, formatPrice } from '../../../lib/payment';
import { COURSE_CONFIG } from '../../types/payment';

interface PurchaseButtonProps {
  courseId?: string;
  onPurchaseStart?: () => void;
  onPurchaseSuccess?: () => void;
  onPurchaseError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  courseId = 'ai-copywriting-course',
  onPurchaseStart,
  onPurchaseSuccess,
  onPurchaseError,
  className = '',
  disabled = false
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user || isLoading || disabled) return;

    if (user.courseAccess) {
      onPurchaseError?.('Már van hozzáférésed a kurzushoz');
      return;
    }

    setIsLoading(true);
    onPurchaseStart?.();

    try {
      // Create checkout session
      const sessionData = await paymentApi.createCheckoutSession({
        uid: user.uid,
        email: user.email,
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment/cancel`
      });

      if (!sessionData.success) {
        throw new Error(sessionData.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      await paymentApi.redirectToCheckout(sessionData.sessionId);

      // This won't execute due to redirect, but just in case
      onPurchaseSuccess?.();
    } catch (error: any) {
      console.error('Purchase error:', error);
      onPurchaseError?.(error.message || 'Fizetési hiba történt');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show button if user already has access
  if (user?.courseAccess) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center px-6 py-3 border border-green-200 rounded-lg bg-green-50 text-green-700">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Kurzushoz való hozzáférésed aktív
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={handlePurchase}
        disabled={!user || isLoading || disabled}
        className={`
          inline-flex items-center justify-center px-8 py-4 
          text-lg font-semibold rounded-lg transition-all duration-200
          ${!user || isLoading || disabled
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
        ) : (
          <>
            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Kurzus megvásárlása - {formatPrice(COURSE_CONFIG.price)}
          </>
        )}
      </button>

      {!user && (
        <p className="mt-3 text-sm text-gray-500">
          Fizetés előtt be kell jelentkezned
        </p>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <p>🔒 Biztonságos fizetés Stripe segítségével</p>
        <p>💳 Bankkártya, Apple Pay, Google Pay elfogadva</p>
        <p>🇭🇺 Magyar számlázás és ÁFA kezelés</p>
      </div>
    </div>
  );
};

export default PurchaseButton;