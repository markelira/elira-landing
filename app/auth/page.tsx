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
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Átirányítás...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Back to Home Link */}
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Vissza a főoldalra</span>
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <img 
              src="/eliraicon.png" 
              alt="Elira logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-3xl font-bold text-gray-900">Elira</span>
          </Link>
          <p className="mt-2 text-gray-600">
            {fromPurchase 
              ? 'Jelentkezz be vagy regisztrálj a vásárlás folytatásához'
              : 'Jelentkezz be a tanulási platformra'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('login')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'login'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bejelentkezés
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'register'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Regisztráció
              </button>
            </nav>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeTab === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={() => setActiveTab('register')}
                className="!p-0 !shadow-none"
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setActiveTab('login')}
                className="!p-0 !shadow-none"
              />
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">A regisztrációval hozzáférsz:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-center text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              AI Copywriting Mastery Kurzus
            </div>
            <div className="flex items-center justify-center text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Személyre szabott tanulási útvonal
            </div>
            <div className="flex items-center justify-center text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Haladás követés és tanúsítvány
            </div>
          </div>
        </div>

        {/* Privacy Links */}
        <div className="mt-8 text-center text-xs text-gray-500">
          A folytatással elfogadod az{' '}
          <Link href="/terms" className="text-teal-600 hover:text-teal-700">
            Általános Szerződési Feltételeket
          </Link>{' '}
          és az{' '}
          <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
            Adatvédelmi Nyilatkozatot
          </Link>
        </div>
      </div>
    </div>
  );
}