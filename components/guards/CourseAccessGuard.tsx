'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShoppingCart, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCourseAccess } from '@/hooks/useCourseAccess';
import { AuthGuard } from './AuthGuard';

interface CourseAccessGuardProps {
  courseId?: string;
  children: React.ReactNode;
}

export const CourseAccessGuard: React.FC<CourseAccessGuardProps> = ({ 
  courseId = 'ai-copywriting-course', 
  children 
}) => {
  const { hasAccess, loading, error, accessDetails } = useCourseAccess(courseId);

  // Loading state
  if (loading) {
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Kurzus hozzáférés ellenőrzése...</h2>
          <p className="text-gray-600">Kérjük várjon, amíg ellenőrizzük a jogosultságát</p>
        </motion.div>
      </div>
    );
  }


  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Hiba történt
            </h2>
            
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
              >
                Újra próbálkozás
              </button>
              
              <Link
                href="/"
                className="inline-block w-full text-gray-600 hover:text-gray-800 text-sm"
              >
                Vissza a főoldalra
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // No access - show purchase prompt
  if (hasAccess === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kurzus hozzáférés szükséges
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {accessDetails?.reason === 'No course access' 
                ? 'Ehhez a kurzushoz még nem rendelkezik hozzáféréssel.'
                : 'A kurzus tartalmának megtekintéséhez vásárolja meg a teljes kurzust.'
              }
            </p>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-900">Mit kap a kurzus megvásárlásával:</span>
              </div>
              <ul className="text-left space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>5 modul, 17 videó (56 perc)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>7 AI generátor PDF sablon</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Gyakorlati AI prompt sablonok</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Azonnali hozzáférés és lifetime updates</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Link
                href={`/courses/${courseId}`}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Kurzus megvásárlása</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="text-center">
                <Link
                  href="/#tripwire"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium underline"
                >
                  Vagy próbálja ki ingyen egy modult
                </Link>
              </div>
              
              <Link
                href="/"
                className="inline-block text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Vissza a főoldalra
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Has access - render the protected content with auth guard
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
};