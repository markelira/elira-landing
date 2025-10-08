'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // Get redirect URL from query params or default to dashboard
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const courseId = searchParams.get('courseId');

  // Check if user came from course purchase flow
  const fromPurchase = searchParams.get('from') === 'purchase';

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (user && !loading) {
      router.push(redirectTo);
    }
  }, [user, loading, redirectTo, router]);

  const handleAuthSuccess = () => {
    // If coming from course purchase, redirect to payment
    if (fromPurchase && courseId) {
      router.push(`/payment?courseId=${courseId}`);
    } else {
      router.push(redirectTo);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-gray-900"></div>
      </div>
    );
  }

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Átirányítás...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Vissza a főoldalra</span>
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2">
            <img
              src="/navbar-icon.png"
              alt="Elira logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-semibold text-gray-900">Elira</span>
          </Link>
        </div>

        {/* Course Purchase Banner */}
        {courseId && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Vásárlás folytatása
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Bejelentkezés után automatikusan átirányítunk a fizetéshez.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {showRegister ? 'Fiók létrehozása' : 'Üdvözölünk vissza'}
            </h1>
            <p className="text-sm text-gray-600">
              {showRegister
                ? 'Csatlakozz az Elira közösséghez'
                : 'Jelentkezz be a fiókodba'
              }
            </p>
          </div>

          {/* Form Content */}
          {showRegister ? (
            <RegisterForm
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setShowRegister(false)}
              className="!p-0 !shadow-none !bg-transparent !border-0"
            />
          ) : (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToRegister={() => setShowRegister(true)}
              className="!p-0 !shadow-none !bg-transparent !border-0"
            />
          )}
        </div>

        {/* Privacy Links */}
        <div className="mt-6 text-center text-xs text-gray-600">
          A folytatással elfogadod az{' '}
          <Link href="/terms" className="text-gray-900 hover:text-gray-700 underline">
            Általános Szerződési Feltételeket
          </Link>{' '}
          és az{' '}
          <Link href="/privacy" className="text-gray-900 hover:text-gray-700 underline">
            Adatvédelmi Nyilatkozatot
          </Link>
        </div>
      </div>
    </div>
  );
}