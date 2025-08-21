'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import { useLeadCount } from '@/hooks/useFirestore';
import { logger } from '@/lib/logger';

// Simplified form schema - just email
const emailSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg')
});

type EmailFormData = z.infer<typeof emailSchema>;

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const FinalCTA: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { trackEmail, startForm, submitForm } = useAnalytics();
  const { leadCount } = useLeadCount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema)
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('cta');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const onSubmit = async (data: EmailFormData) => {
    setSubmissionState('loading');
    setErrorMessage('');
    startForm('final_cta');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: 'Final CTA Subscriber', // Default name for final CTA
          source: 'final_cta'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Hiba történt a feldolgozás során');
      }

      setSubmissionState('success');
      trackEmail(data.email, 'final_cta');
      submitForm('final_cta', true);
      
      // Reset form after success
      setTimeout(() => {
        reset();
        setSubmissionState('idle');
      }, 3000);

    } catch (error: any) {
      logger.error('Final CTA submission error:', error);
      setSubmissionState('error');
      setErrorMessage(error.message || 'Váratlan hiba történt. Próbáld újra!');
      submitForm('final_cta', false);
    }
  };

  // Dynamic count for subtitle - use real lead count
  const dynamicSubtitle = leadCount > 0 
    ? content.finalCta.subtitle.replace('{count}', leadCount.toString())
    : content.finalCta.subtitleNoMembers;

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            {content.finalCta.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto"
          >
            {dynamicSubtitle}
          </motion.p>

          {/* Success State */}
          {submissionState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto"
            >
              <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Sikeres!</h3>
              <p className="text-white/90">Elküldtük az emailt! Nézd meg a spam mappát is.</p>
            </motion.div>
          )}

          {/* Form */}
          {submissionState !== 'success' && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8"
            >
              <div className="flex-1">
                <input
                  {...register('email')}
                  type="email"
                  placeholder={content.finalCta.placeholder}
                  className="w-full px-6 py-4 rounded-full text-gray-900 
                           placeholder-gray-500 border-0 focus:ring-4 
                           focus:ring-white/30 transition-all duration-200
                           shadow-lg hover:shadow-xl"
                  disabled={submissionState === 'loading'}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-white/90 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={submissionState === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-8 py-4 rounded-full 
                           font-bold text-lg hover:bg-gray-50 
                           transition-all duration-200 shadow-lg hover:shadow-xl
                           disabled:opacity-70 disabled:cursor-not-allowed
                           flex items-center justify-center min-w-[140px]"
              >
                {submissionState === 'loading' ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent 
                                   rounded-full animate-spin" />
                    <span>Küldés...</span>
                  </div>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    {content.finalCta.button}
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* Error message */}
          {submissionState === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center p-4 bg-red-500/20 
                         backdrop-blur-sm border border-red-300/30 rounded-xl mb-6 max-w-md mx-auto"
            >
              <AlertCircle className="w-5 h-5 text-white mr-2" />
              <p className="text-sm text-white">{errorMessage}</p>
            </motion.div>
          )}

          {/* Privacy Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm opacity-75 max-w-lg mx-auto"
          >
            {content.finalCta.privacy}
          </motion.p>

          {/* Additional Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mt-12 opacity-75"
          >
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Azonnali hozzáférés</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Nincs rejtett költség</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Bármikor leiratkozhatsz</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;