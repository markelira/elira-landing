'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, AlertCircle, ChevronDown, Mail } from 'lucide-react';
import { content } from '@/lib/content/hu';
import Button from '@/components/ui/Button';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Progressive form validation schemas
const emailOnlySchema = z.object({
  email: z.string().email('Érvényes email címet adj meg'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional()
});

const fullFormSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg'),
  firstName: z.string().min(2, 'Keresztnév legalább 2 karakter szükséges'),
  lastName: z.string().min(1, 'Vezetéknév legalább 1 karakter szükséges'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional()
});

type FormData = z.infer<typeof fullFormSchema>;

interface MagnetItem {
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
  magnet: MagnetItem | null;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  magnet 
}) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  // Removed isExpanded state - form always shows all fields
  const [dragOffset, setDragOffset] = useState(0);
  const { trackEmail, openModal, closeModal, startForm, submitForm } = useAnalytics();
  
  // Refs for focus management
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  // Scroll lock and iOS optimizations when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // iOS keyboard handling - prevent zoom on input focus
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      // No longer using isExpanded state
      
      // Restore normal viewport behavior
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      // Restore viewport on cleanup
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    };
  }, [isOpen]);

  // Handle swipe down to close
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 150 && info.velocity.y > 0.5) {
      handleClose();
    } else {
      // Reset position if not closing
      setDragOffset(0);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus management and modal tracking
  React.useEffect(() => {
    if (isOpen && magnet) {
      openModal(`EmailCapture_${magnet.id}`);
      startForm('email_capture');
      
      // Focus the email input after modal opens
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, magnet, openModal, startForm]);

  const handleClose = () => {
    if (magnet) {
      closeModal(`EmailCapture_${magnet.id}`);
    }
    reset();
    setSubmissionState('idle');
    setErrorMessage('');
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    if (!magnet) return;

    setSubmissionState('loading');
    setErrorMessage('');

    try {
      // Call Firebase Functions directly
      const response = await fetch('https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          magnetId: magnet.id,
          magnetTitle: magnet.title,
          magnetSelected: magnet.id
        }),
      });

      // Check if response is OK first
      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`Firebase Functions error (${response.status}):`, errorText);
        throw new Error('Hiba történt az email küldése során. Kérjük próbáld újra később.');
      }

      // Parse JSON response
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Hiba történt a feldolgozás során');
      }

      // Success
      setSubmissionState('success');
      trackEmail(data.email, `magnet_${magnet.id}`);
      submitForm('email_capture', true);

      // Auto close after 3 seconds to give user time to read message
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error: any) {
      logger.error('Submission error:', error);
      setSubmissionState('error');
      setErrorMessage(error.message || 'Váratlan hiba történt. Próbáld újra!');
      submitForm('email_capture', false);
    }
  };

  if (!magnet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop - shows parent page with darkening */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />

          {/* Bottom Sheet Container */}
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
                maxHeight: '85vh', // Always show full height since we're not using progressive disclosure
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
                  
                  {/* Close button - large touch target */}
                  <button
                    onClick={handleClose}
                    className="p-3 text-gray-400 hover:text-gray-600 
                             transition-colors rounded-full hover:bg-gray-100
                             min-w-[44px] min-h-[44px] flex items-center justify-center
                             touch-manipulation"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
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
                    <p className="text-gray-600">
                      ✅ Email elküldve! Nézd meg a postaládádat (spam mappát is!)
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Quick Email Section */}
                    <div className="mb-6">
                      <div className="text-center mb-4">
                        <p className="text-gray-600">
                          Add meg az email címed, és azonnal küldjük!
                        </p>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Field - Always Visible */}
                        <div>
                          <input
                            {...register('email')}
                            ref={emailInputRef}
                            type="email"
                            placeholder="neve@email.com"
                            className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                       focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                       transition-all duration-200 bg-gray-50
                                       min-h-[56px] touch-manipulation"
                            style={{ fontSize: '16px' }}
                            aria-label="Email cím"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600">{String(errors.email?.message || '')}</p>
                          )}
                        </div>

                        {/* Name Fields - Always Visible */}
                        <div className="space-y-4">
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
                                  />
                                  {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-600">{String(errors.firstName?.message || '')}</p>
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
                                  />
                                  {errors.lastName && (
                                    <p className="mt-1 text-xs text-red-600">{String(errors.lastName?.message || '')}</p>
                                  )}
                                </div>
                              </div>

                              {/* Optional Fields */}
                              <div className="space-y-3">
                                <select
                                  {...register('job')}
                                  className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                             focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                             transition-all duration-200 bg-gray-50
                                             min-h-[56px] touch-manipulation"
                                  style={{ fontSize: '16px' }}
                                >
                                  <option value="">Munkakör (opcionális)</option>
                                  {content.emailCapture.modal.fields.job.options.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>

                                <select
                                  {...register('education')}
                                  className="w-full px-4 py-4 text-[16px] border-2 border-gray-300 rounded-2xl
                                             focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                                             transition-all duration-200 bg-gray-50
                                             min-h-[56px] touch-manipulation"
                                  style={{ fontSize: '16px' }}
                                >
                                  <option value="">Végzettség (opcionális)</option>
                                  {content.emailCapture.modal.fields.education.options.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                        </div>

                        {/* Error message */}
                        {submissionState === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center p-4 bg-red-50 border border-red-200 rounded-2xl"
                          >
                            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                            <p className="text-sm text-red-700">{errorMessage}</p>
                          </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                          {/* Primary CTA */}
                          <button
                            type="submit"
                            disabled={submissionState === 'loading'}
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
                                <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                               rounded-full animate-spin" />
                                <span>Küldés...</span>
                              </div>
                            ) : (
                              <>
                                <Mail className="w-5 h-5 mr-2" />
                                Küldés és Letöltés
                              </>
                            )}
                          </button>


                          {/* Maybe Later */}
                          <button
                            type="button"
                            onClick={handleClose}
                            className="w-full text-gray-500 hover:text-gray-700 
                                     transition-colors text-center py-3
                                     min-h-[44px] touch-manipulation"
                          >
                            Talán később
                          </button>
                        </div>
                      </form>
                    </div>
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

export default EmailCaptureModal;