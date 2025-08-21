'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Gift, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Simple email schema for exit intent
const exitEmailSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg')
});

type ExitEmailFormData = z.infer<typeof exitEmailSchema>;

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { trackEmail, openModal, closeModal, trackButton } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ExitEmailFormData>({
    resolver: zodResolver(exitEmailSchema)
  });

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    openModal('ExitIntent');
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, openModal]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    closeModal('ExitIntent');
    reset();
    setSubmissionState('idle');
    setErrorMessage('');
    onClose();
  };

  const onSubmit = async (data: ExitEmailFormData) => {
    setSubmissionState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: 'Exit Intent Lead',
          source: 'exit_intent'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Hiba történt a feldolgozás során');
      }

      setSubmissionState('success');
      trackEmail(data.email, 'exit_intent');
      trackButton('Exit Intent Subscribe', 'exit-intent-popup');
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2500);

    } catch (error: any) {
      logger.error('Exit intent submission error:', error);
      setSubmissionState('error');
      setErrorMessage(error.message || 'Váratlan hiba történt. Próbáld újra!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop with stronger blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4
            }}
            className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-2 border-orange-200"
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

            {/* Success State */}
            {submissionState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Fantasztikus!
                </h3>
                <p className="text-gray-600">
                  Elküldtük az összes ingyenes anyagot! Nézd meg a spam mappát is.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Az ablak automatikusan bezáródik...
                </div>
              </motion.div>
            ) : (
              <>
                {/* Urgency Indicator */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center px-4 py-2 bg-orange-100 
                                 rounded-full border border-orange-200">
                    <Clock className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm font-semibold text-orange-800">
                      Ajánlat lejár: {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 
                                 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Állj meg egy pillanatra! 🛑
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Mielőtt elmennél, szeretnénk <span className="font-semibold text-orange-600">mind az 5 ingyenes anyagot</span> 
                    {" "}elküldeni neked <span className="font-semibold">azonnal</span>!
                  </p>
                </div>

                {/* Special Offer */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 
                               rounded-2xl p-6 mb-6 border border-orange-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Gift className="w-5 h-5 text-orange-600 mr-2" />
                    Exkluzív csomag - csak most!
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      ChatGPT Prompt Sablon Gyűjtemény
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      30 Napos LinkedIn Növekedési Naptár
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      Email Marketing Sablon Könyvtár
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      TikTok Algoritmus Hack Guide
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      Marketing Automatizáció Tervezők
                    </li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Add meg az email címed..."
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl
                               focus:ring-2 focus:ring-orange-500 focus:border-transparent
                               transition-all duration-200 text-lg
                               placeholder-gray-400"
                      disabled={submissionState === 'loading'}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
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

                  <button
                    type="submit"
                    disabled={submissionState === 'loading'}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 
                             text-white px-8 py-4 rounded-2xl font-bold text-lg
                             hover:from-orange-600 hover:to-red-600 
                             transform hover:scale-105 transition-all duration-200
                             shadow-lg hover:shadow-xl disabled:opacity-70 
                             disabled:cursor-not-allowed disabled:transform-none
                             flex items-center justify-center"
                  >
                    {submissionState === 'loading' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                       rounded-full animate-spin" />
                        <span>Küldés...</span>
                      </div>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        Igen, küldétek az összes anyagot!
                      </>
                    )}
                  </button>
                </form>

                {/* Trust indicators */}
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500">
                    🔒 100% biztonságos • Nem küldünk spam-et • Bármikor leiratkozhatsz
                  </p>
                </div>

                {/* Alternative close */}
                <div className="text-center mt-4">
                  <button
                    onClick={handleClose}
                    className="text-sm text-gray-500 hover:text-gray-700 
                             transition-colors underline"
                  >
                    Nem, köszönöm (folytatom a böngészést)
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;