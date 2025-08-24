'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCourseAccess?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requireAuth = false,
  requireCourseAccess = false,
  fallback = null,
  redirectTo
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (loading) return;

    // Check authentication requirement
    if (requireAuth && !user) {
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      setShouldRender(false);
      return;
    }

    // Check course access requirement
    if (requireCourseAccess && (!user || !user.courseAccess)) {
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      setShouldRender(false);
      return;
    }

    setShouldRender(true);
  }, [user, loading, requireAuth, requireCourseAccess, redirectTo, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Show fallback if not authorized
  if (!shouldRender) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Default unauthorized message
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {requireAuth ? 'Bejelentkezés szükséges' : 'Hozzáférés megtagadva'}
            </h2>
            <p className="mt-2 text-gray-600">
              {requireAuth 
                ? 'Kérjük jelentkezz be a tartalom megtekintéséhez.'
                : requireCourseAccess 
                ? 'Ez a tartalom csak a kurzus vásárlói számára elérhető.'
                : 'Nincs jogosultságod ehhez a tartalomhoz.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Vissza a főoldalra
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;