'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterFormData } from '../../types/auth';

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
  className?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
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
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
      
      // Note: We could get linked downloads from the response, but for now just indicate success
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Regisztráció sikertelen');
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
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Google regisztráció sikertelen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Regisztráció
        </h2>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Keresztnév
              </label>
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="János"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Vezetéknév
              </label>
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Kovács"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email cím
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="pelda@email.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Jelszó
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Jelszó megerősítése
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Regisztráció...
              </div>
            ) : (
              'Fiók létrehozása'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Vagy</span>
            </div>
          </div>

          <button
            onClick={handleGoogleRegister}
            disabled={isSubmitting || loading}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google-lal regisztráció
          </button>
        </div>

        {onSwitchToLogin && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Már van fiókod?{' '}
              <button
                onClick={onSwitchToLogin}
                className="font-medium text-teal-600 hover:text-teal-500"
                disabled={isSubmitting}
              >
                Bejelentkezés
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 bg-teal-50 rounded-lg p-4 border border-teal-200">
          <h4 className="text-sm font-semibold text-teal-800 mb-2">A regisztrációval hozzáférsz:</h4>
          <div className="space-y-1">
            <div className="flex items-center text-xs text-teal-700">
              <svg className="w-3 h-3 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Vállalkozói vevőpszichológia masterclass
            </div>
            <div className="flex items-center text-xs text-teal-700">
              <svg className="w-3 h-3 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              4 webinár + 5 személyes 1:1 meeting
            </div>
            <div className="flex items-center text-xs text-teal-700">
              <svg className="w-3 h-3 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              3 bónusz csomag + tripla garancia
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          A regisztrációval elfogadod az{' '}
          <a href="/terms" className="text-teal-600 hover:text-teal-500">
            Általános Szerződési Feltételeket
          </a>{' '}
          és az{' '}
          <a href="/privacy" className="text-teal-600 hover:text-teal-500">
            Adatvédelmi Szabályzatot
          </a>.
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;