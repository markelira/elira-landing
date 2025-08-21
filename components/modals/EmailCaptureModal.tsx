'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { content } from '@/lib/content/hu';
import Button from '@/components/ui/Button';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg'),
  name: z.string().min(2, 'Legalább 2 karakter szükséges'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD'])
});

type FormData = z.infer<typeof formSchema>;

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
  const { trackEmail, openModal, closeModal, startForm, submitForm } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  React.useEffect(() => {
    if (isOpen && magnet) {
      openModal(`EmailCapture_${magnet.id}`);
      startForm('email_capture');
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
      const response = await fetch('/api/subscribe', {
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

      const result = await response.json();

      if (!response.ok) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 
                         hover:text-gray-600 transition-colors rounded-full
                         hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            {/* Content based on submission state */}
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
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{magnet.icon}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${magnet.gradient}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Még egy lépés a(z) <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">{magnet.title}</span> megszerzéséhez
                  </h3>
                  
                  <p className="text-gray-600">
                    Add meg az adataidat, és azonnal küldjük emailben!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.emailCapture.modal.fields.email.label} *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={content.emailCapture.modal.fields.email.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                 transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.emailCapture.modal.fields.name.label} *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder={content.emailCapture.modal.fields.name.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                 transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Job */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.emailCapture.modal.fields.job.label}
                    </label>
                    <select
                      {...register('job')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                 transition-all duration-200"
                    >
                      <option value="">Válassz...</option>
                      {content.emailCapture.modal.fields.job.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.job && (
                      <p className="mt-1 text-sm text-red-600">{errors.job.message}</p>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.emailCapture.modal.fields.education.label}
                    </label>
                    <select
                      {...register('education')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                 focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                 transition-all duration-200"
                    >
                      <option value="">Válassz...</option>
                      {content.emailCapture.modal.fields.education.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.education && (
                      <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                    )}
                  </div>

                  {/* Error message */}
                  {submissionState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center p-3 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    loading={submissionState === 'loading'}
                    className="w-full mt-6"
                    disabled={submissionState === 'loading'}
                  >
                    {submissionState === 'loading' 
                      ? content.emailCapture.modal.loading
                      : content.emailCapture.modal.cta
                    }
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmailCaptureModal;