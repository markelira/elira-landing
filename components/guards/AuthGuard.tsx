'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo,
  requireAuth = true 
}) => {
  const { user, isLoading, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authReady && requireAuth && !user && redirectTo) {
      router.push(redirectTo);
    }
  }, [user, authReady, requireAuth, redirectTo, router]);

  // Still loading auth state
  if (isLoading || !authReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Betöltés...</h2>
          <p className="text-gray-600">Kérjük várjon</p>
        </motion.div>
      </div>
    );
  }

  // Require auth but user not authenticated
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bejelentkezés szükséges
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Az oldal megtekintéséhez kérjük jelentkezzen be a fiókjába
            </p>
            
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Bejelentkezés</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // User is authenticated or auth not required
  return <>{children}</>;
};