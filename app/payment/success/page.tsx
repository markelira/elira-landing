'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { paymentApi } from '../../../../lib/payment';
import AuthWrapper from '../../../components/auth/AuthWrapper';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed'>('pending');

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('Érvénytelen fizetési munkamenet');
        setLoading(false);
        return;
      }

      try {
        // Check payment status
        const status = await paymentApi.getPaymentStatus(sessionId);
        
        if (status.success) {
          setPaymentStatus(status.status);
          
          if (status.courseAccess) {
            // Refresh user data to get updated course access
            await refreshUser();
          }
        } else {
          setError(status.error || 'Fizetés ellenőrzése sikertelen');
        }
      } catch (err: any) {
        console.error('Payment verification error:', err);
        setError(err.message || 'Fizetés ellenőrzése sikertelen');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, refreshUser]);

  const handleContinueToCourse = () => {
    router.push('/dashboard/course');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <AuthWrapper requireAuth={true} redirectTo="/">
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Fizetés ellenőrzése...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Fizetési hiba</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Vissza a főoldalra
              </button>
            </div>
          ) : paymentStatus === 'completed' ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Sikeres vásárlás!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Köszönjük! A kurzushoz való hozzáférésed aktiválásra került.
                Kezdheted tanulni azonnal!
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleContinueToCourse}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Kurzus indítása
                </button>

                <button
                  onClick={handleGoToDashboard}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Dashboard megtekintése
                </button>
              </div>

              <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                <h3 className="font-medium text-teal-900 mb-2">Mi történik most?</h3>
                <ul className="text-sm text-teal-700 space-y-1 text-left">
                  <li>✅ Kurzushoz való hozzáférés aktiválva</li>
                  <li>✅ Visszaigazoló email elküldve</li>
                  <li>✅ Számla email útján megküldve</li>
                  <li>✅ Discord közösséghez való hozzáférés</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Fizetés feldolgozás alatt</h1>
              <p className="text-gray-600 mb-6">
                A fizetésed még feldolgozás alatt van. Kérjük, várd meg a megerősítést.
              </p>
              <button
                onClick={handleGoToDashboard}
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Dashboard megtekintése
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}