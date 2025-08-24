'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Form validation schema - streamlined for better UX
const formSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg'),
  firstName: z.string().min(2, 'Keresztnév legalább 2 karakter'), 
  lastName: z.string().min(1, 'Vezetéknév szükséges'),
});

type FormData = z.infer<typeof formSchema>;

interface EnhancedMagnet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  tags: string[];
  downloadUrl: string;
}

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  magnet: EnhancedMagnet | null;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const EmailCaptureModalV2: React.FC<EmailCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  magnet 
}) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  // Analytics and refs
  const { trackEmail, openModal, closeModal, startForm, submitForm, track } = useAnalytics();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Form setup with proper validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  });

  // Watch email value for internal state management
  const emailValue = watch('email');

  // Body scroll lock with proper cleanup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // iOS viewport fix
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      
      // Restore viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    };
  }, [isOpen]);

  // Handle swipe down to close
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (info.offset.y > 150 && info.velocity.y > 0.5) {
      handleClose();
    } else {
      setDragOffset(0);
    }
  }, []);

  // ESC key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && submissionState !== 'loading') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, submissionState]);

  // Focus management and analytics
  useEffect(() => {
    if (isOpen && magnet) {
      openModal(`EmailCapture_${magnet.id}`);
      startForm('email_capture');
      track('email_capture_modal_opened', { magnetId: magnet.id });
      
      // Focus email input after modal animation using form's setFocus
      setTimeout(() => {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        if (emailInput) {
          emailInput.focus();
        }
      }, 300);
    }
  }, [isOpen, magnet, openModal, startForm, track]);

  const handleClose = useCallback(() => {
    if (magnet) {
      closeModal(`EmailCapture_${magnet.id}`);
    }
    reset();
    setSubmissionState('idle');
    setErrorMessage('');
    setIsSubmitting(false);
    onClose();
  }, [magnet, closeModal, reset, onClose]);

  // FIXED: Proper form submission with duplicate prevention
  const onSubmit = async (data: FormData) => {
    if (!magnet || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionState('loading');
    setErrorMessage('');

    try {
      track('email_capture_form_submitted', { magnetId: magnet.id });

      // Prepare payload with manual normalization
      const payload = {
        email: data.email.trim().toLowerCase(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        job: '', // Removed from form but kept for backend compatibility
        education: '', // Removed from form but kept for backend compatibility
        magnetId: magnet.id,
        magnetTitle: magnet.title,
        magnetSelected: magnet.id
      };

      logger.log('Submitting form data:', { ...payload, email: payload.email.replace(/@.*/, '@***') });

      const response = await fetch('https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`Firebase Functions error (${response.status}):`, errorText);
        
        if (response.status === 400) {
          throw new Error('Érvénytelen adatok. Kérjük, ellenőrizd a mezőket.');
        } else if (response.status >= 500) {
          throw new Error('Szerver hiba. Kérjük, próbáld újra később.');
        } else {
          throw new Error('Kapcsolati hiba. Kérjük, próbáld újra.');
        }
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Hiba történt a feldolgozás során');
      }

      // Success!
      setSubmissionState('success');
      trackEmail(data.email, `magnet_${magnet.id}`);
      submitForm('email_capture', true);
      track('email_capture_success', { magnetId: magnet.id });

      // Auto close after 5 seconds (longer than original 3s)
      setTimeout(() => {
        if (submissionState === 'success') {
          handleClose();
        }
      }, 5000);

    } catch (error: any) {
      logger.error('Submission error:', error);
      setSubmissionState('error');
      setErrorMessage(error.message || 'Váratlan hiba történt. Próbáld újra!');
      submitForm('email_capture', false);
      track('email_capture_error', { 
        magnetId: magnet.id, 
        error: error.message || 'Unknown error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!magnet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
            onClick={submissionState !== 'loading' ? handleClose : undefined}
          />

          {/* Modal Container */}
          <div className="flex items-end justify-center min-h-full">
            <motion.div
              ref={modalRef}
              initial={{ y: '100%' }}
              animate={{ y: dragOffset }}
              exit={{ y: '100%' }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.2 }}
              onDrag={(_, info) => setDragOffset(info.offset.y)}
              onDragEnd={handleDragEnd}
              className="relative bg-white w-full max-w-lg mx-auto
                         rounded-t-3xl shadow-2xl overflow-hidden
                         touch-manipulation"
              style={{
                maxHeight: '85vh',
                paddingBottom: 'env(safe-area-inset-bottom)'
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{magnet.icon}</span>
                    <div>
                      <h3 id="modal-title" className="text-lg font-bold text-gray-900">
                        {magnet.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Ingyenes letöltés
                      </p>
                    </div>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    disabled={submissionState === 'loading'}
                    className="p-3 text-gray-400 hover:text-gray-600 
                             transition-colors rounded-full hover:bg-gray-100
                             min-w-[44px] min-h-[44px] flex items-center justify-center
                             touch-manipulation disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                
                {/* Success State */}
                {submissionState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Sikeres regisztráció! 🎉
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ✅ <strong>{magnet.title}</strong> elküldve email-ben!
                    </p>
                    <p className="text-sm text-gray-500">
                      Ellenőrizd a postaládádat (és a spam mappát is!)
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Form Instructions */}
                    <div className="text-center mb-6">
                      <p className="text-gray-600">
                        Add meg az adataidat, és azonnal küldjük email-ben!
                      </p>
                    </div>

                    {/* FIXED: Form with noValidate and proper validation */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                      {/* Email Field */}
                      <div>
                        <input
                          {...register('email')}
                          type="text"
                          inputMode="email"
                          placeholder="neve@email.com"
                          className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                     focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                     transition-all duration-200 bg-gray-50
                                     min-h-[56px] touch-manipulation"
                          style={{ fontSize: '16px' }}
                          aria-label="Email cím"
                          disabled={isSubmitting}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input
                            {...register('firstName')}
                            type="text"
                            placeholder="Keresztnév"
                            className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                       transition-all duration-200 bg-gray-50
                                       min-h-[56px] touch-manipulation"
                            style={{ fontSize: '16px' }}
                            disabled={isSubmitting}
                            autoComplete="given-name"
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <input
                            {...register('lastName')}
                            type="text"
                            placeholder="Vezetéknév"
                            className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                       transition-all duration-200 bg-gray-50
                                       min-h-[56px] touch-manipulation"
                            style={{ fontSize: '16px' }}
                            disabled={isSubmitting}
                            autoComplete="family-name"
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Error Message */}
                      {submissionState === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center p-4 bg-red-50 border border-red-200 rounded-2xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          <p className="text-sm text-red-700">{errorMessage}</p>
                        </motion.div>
                      )}

                      {/* Submit Button - FIXED: Proper disable state */}
                      <div className="space-y-3 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || submissionState === 'loading'}
                          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 
                                   text-white px-6 py-4 rounded-2xl font-bold text-lg
                                   hover:from-teal-700 hover:to-cyan-700 
                                   transform hover:scale-[1.02] transition-all duration-200
                                   shadow-lg hover:shadow-xl disabled:opacity-70 
                                   disabled:cursor-not-allowed disabled:transform-none
                                   flex items-center justify-center
                                   min-h-[56px] touch-manipulation"
                        >
                          {submissionState === 'loading' ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Küldés...</span>
                            </div>
                          ) : (
                            <>
                              <Mail className="w-5 h-5 mr-2" />
                              Küldés és Letöltés
                            </>
                          )}
                        </button>

                        {/* Maybe Later Button */}
                        <button
                          type="button"
                          onClick={handleClose}
                          disabled={isSubmitting}
                          className="w-full text-gray-500 hover:text-gray-700 
                                   transition-colors text-center py-3
                                   min-h-[44px] touch-manipulation disabled:opacity-50"
                        >
                          Talán később
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmailCaptureModalV2;