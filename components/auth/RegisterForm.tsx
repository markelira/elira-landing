'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterFormData } from '../../types/auth';
import { functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';

const registerSchema = z.object({
  firstName: z.string().min(2, 'A keresztnév legalább 2 karakter hosszú kell legyen'),
  lastName: z.string().min(2, 'A vezetéknév legalább 2 karakter hosszú kell legyen'),
  email: z.string().email('Érvényes email címet adj meg'),
  password: z.string().min(6, 'A jelszónak legalább 6 karakter hosszúnak kell lennie'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "A jelszavak nem egyeznek",
  path: ["confirmPassword"]
});

interface RegisterFormProps {
  onSuccess?: (linkedDownloads?: string[]) => void;
  onSwitchToLogin?: () => void;
  onBack?: () => void;
  className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
  onBack,
  className = ''
}) => {
  const { register: registerUser, loginWithGoogle, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName);

      // Set STUDENT role for individual users
      try {
        const setRole = httpsCallable(functions, 'setIndividualUserRole');
        await setRole({});
        console.log('✅ STUDENT role set successfully');
      } catch (roleError) {
        console.error('Failed to set STUDENT role:', roleError);
        // Don't block registration if role setting fails
      }

      // Note: We could get linked downloads from the response, but for now just indicate success
      onSuccess?.();
    } catch (err: any) {
      // Firebase error codes
      const errorCode = err.code || '';

      if (errorCode === 'auth/email-already-in-use') {
        setError('Ez az email cím már regisztrálva van. Próbálj meg bejelentkezni helyette.');
      } else if (errorCode === 'auth/invalid-email') {
        setError('Érvénytelen email cím formátum.');
      } else if (errorCode === 'auth/operation-not-allowed') {
        setError('A regisztráció jelenleg nem elérhető. Kérlek próbáld újra később.');
      } else if (errorCode === 'auth/weak-password') {
        setError('A jelszó túl gyenge. Használj legalább 6 karaktert, számokat és betűket.');
      } else {
        setError(err.message || 'Regisztráció sikertelen. Kérlek próbáld újra.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await loginWithGoogle();

      // Set STUDENT role for individual users
      try {
        const setRole = httpsCallable(functions, 'setIndividualUserRole');
        await setRole({});
        console.log('✅ STUDENT role set successfully');
      } catch (roleError) {
        console.error('Failed to set STUDENT role:', roleError);
        // Don't block registration if role setting fails
      }

      onSuccess?.();
    } catch (err: any) {
      const errorCode = err.code || '';

      if (errorCode === 'auth/popup-closed-by-user') {
        setError('Regisztrációs ablak bezárva. Kérlek próbáld újra.');
      } else if (errorCode === 'auth/popup-blocked') {
        setError('A böngésző blokkolta a regisztrációs ablakot. Kérlek engedélyezd a felugró ablakokat.');
      } else if (errorCode === 'auth/account-exists-with-different-credential') {
        setError('Ez az email cím már regisztrálva van más módszerrel. Próbálj meg bejelentkezni.');
      } else {
        setError(err.message || 'Google regisztráció sikertelen. Kérlek próbáld újra.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* Back button if onBack is provided */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Vissza</span>
        </button>
      )}

      {/* Google Registration - Primary CTA */}
      <button
        onClick={handleGoogleRegister}
        disabled={isSubmitting || loading}
        className="w-full flex justify-center items-center py-3.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Folytatás Google-lal
      </button>

      {/* Divider */}
      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-transparent text-gray-500">vagy email címmel</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 p-3.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
              Keresztnév
            </label>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
              placeholder="János"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-xs text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
              Vezetéknév
            </label>
            <input
              {...register('lastName')}
              type="text"
              id="lastName"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
              placeholder="Kovács"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="mt-1.5 text-xs text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email cím
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
            placeholder="pelda@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Jelszó
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
            placeholder="Legalább 6 karakter"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
            Jelszó megerősítése
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-sm"
            placeholder="Jelszó újra"
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Fiók létrehozása...
            </>
          ) : (
            'Fiók létrehozása'
          )}
        </button>
      </form>

      {/* Switch to Login */}
      {onSwitchToLogin && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Már van fiókod?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              Bejelentkezés
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;