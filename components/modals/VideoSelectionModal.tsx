'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, AlertCircle, Mail, Loader2, Play, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Video data structure
interface Video {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  driveUrl: string;
  icon: string;
}

// Videos from modal.md
const videos: Video[] = [
  {
    id: 'target-audience',
    title: 'Pontos célzás, biztos találat találj célba a célcsoportodnál',
    shortTitle: 'Pontos célzás, biztos találat találj célba a célcsoportodnál',
    description: 'Te is mindenkit próbálsz megszólítani, de végül senki sem érzi, hogy róla szól a mondandód. Ezért nem kapsz visszajelzést, nem jönnek a vásárlók, és a kampányaid üresek maradnak. Lődd be tökéletesen a célcsoportodat, és találj célba minden alkalommal!',
    driveUrl: 'https://drive.google.com/file/d/1mTNEST9mCDkIRQQ_l9XKY4iI8tQVbLzt/view?usp=sharing',
    icon: '🎯'
  },
  {
    id: 'know-customer',
    title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
    shortTitle: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
    description: 'A kommunikációdban mindig te vagy a főhős, nem a vevő. És amíg így van, ő nem fogja meglátni, hogy te vagy az, aki elvezetheti a céljaihoz. Találd meg a közös nevezőt a vevőddel, és tarold le a piacot!',
    driveUrl: 'https://drive.google.com/file/d/1hrsgXjFcsXXrP6HZWaPS4scQebIL_wMT/view?usp=sharing',
    icon: '🤝'
  },
  {
    id: 'market-research',
    title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
    shortTitle: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
    description: 'Amíg nem tudod, ki ül a túloldalon, addig minden szavad mellémegy. És közben lassan elúszik előled a piac. Találd meg a vevőidet ezzekkel a színvonalas AI technikákkal!',
    driveUrl: 'https://drive.google.com/file/d/11sLzjKUcK4QDTBxPeRLA878RR4L7Ch6b/view?usp=sharing',
    icon: '🗺️'
  },
  {
    id: 'psychology',
    title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót',
    shortTitle: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót',
    description: 'Pszichológiai triggerek alkalmazása',
    driveUrl: 'https://drive.google.com/file/d/1j_TG2D-sNC8gui8lXTAH9xbcUazDNXyP/view?usp=sharing',
    icon: '❤️'
  },
  {
    id: 'email-marketing',
    title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
    shortTitle: 'A piac nem vár - így használd az AI-t E-mail marketingre',
    description: 'Email sorozat generátor élő bemutatóval',
    driveUrl: 'https://drive.google.com/file/d/1o8pzoGq2sXP3Z4SkVnK8fGJUJaE9J7LO/view?usp=sharing',
    icon: '📧'
  }
];

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, 'Keresztnév legalább 2 karakter'),
  lastName: z.string().min(1, 'Vezetéknév szükséges'),
  email: z.string().email('Érvényes email címet adj meg'),
  phone: z.string().regex(/^(\+36|06)?[ -]?[0-9]{1,2}[ -]?[0-9]{3}[ -]?[0-9]{4}$/, 'Érvényes telefonszámot adj meg')
});

type FormData = z.infer<typeof formSchema>;

interface VideoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const VideoSelectionModal: React.FC<VideoSelectionModalProps> = ({ 
  isOpen, 
  onClose
}) => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const [expandedVideo, setExpandedVideo] = useState<string>('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Analytics
  const { track } = useAnalytics();
  
  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur'
  });

  // Reset modal when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setSelectedVideo('');
      setExpandedVideo('');
      setSubmissionState('idle');
      setErrorMessage('');
      reset();
    }
  }, [isOpen, reset]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle video selection
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    setExpandedVideo(videoId);
    track('video_selected', { videoId });
  };

  // Toggle video description
  const toggleDescription = (videoId: string) => {
    if (selectedVideo === videoId) {
      setExpandedVideo(expandedVideo === videoId ? '' : videoId);
    }
  };

  // Proceed to form step
  const proceedToForm = () => {
    if (!selectedVideo) {
      setErrorMessage('Kérlek válassz egy videót!');
      return;
    }
    setCurrentStep(2);
    setErrorMessage('');
    track('proceed_to_form', { selectedVideo });
  };

  // Go back to video selection
  const goBackToSelection = () => {
    setCurrentStep(1);
    setErrorMessage('');
  };

  // Submit form
  const onSubmit = async (data: FormData) => {
    try {
      setSubmissionState('loading');
      setErrorMessage('');
      
      const selectedVideoData = videos.find(v => v.id === selectedVideo);
      
      if (!selectedVideoData) {
        throw new Error('No video selected');
      }

      // Send to API - Note: phone and selectedVideoUrl might not be handled by Firebase Functions yet
      // Temporarily remove phone field to avoid Firebase Functions error
      const { phone, ...dataWithoutPhone } = data;
      
      const requestData = {
        ...dataWithoutPhone,
        magnetId: selectedVideo,  // e.g., 'target-audience'
        magnetTitle: selectedVideoData.title,
        magnetSelected: selectedVideo,  // FIXED: Send the ID, not the title!
        source: 'video-modal',
        // Store phone in a different field that won't break Firebase Functions
        metadata: {
          phone: data.phone,
          selectedVideoUrl: selectedVideoData.driveUrl,
        }
      };

      // 🔍 DEBUG: Environment and URL logging
      console.log('🔍 Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
        currentURL: typeof window !== 'undefined' ? window.location.origin : 'SSR'
      });

      // 🚨 HARDCODED FIX - Environment variables are corrupted in production
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://api-5k33v562ya-ew.a.run.app/api/subscribe' // Direct working URL
        : '/api/subscribe';

      console.log('🎯 Calling API URL:', apiUrl);
      console.log('📡 Request details:', {
        url: apiUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // 🔍 DEBUG: Response logging
      console.log('📥 Response details:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
        headers: Object.fromEntries(response.headers)
      });

      // Get response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      console.log('Response status:', response.status);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('Failed to parse response as JSON:', jsonError);
        console.error('Response text:', responseText);
        throw new Error('Váratlan válasz formátum a szervertől');
      }

      console.log('API Response:', result);

      if (!response.ok || !result.success) {
        const errorMsg = result.error || `Server error: ${response.status}`;
        console.error('API Error:', errorMsg);
        throw new Error(errorMsg);
      }

      // Track success
      track('video_modal_submission_success', { 
        videoId: selectedVideo,
        email: data.email 
      });

      setSubmissionState('success');
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error: any) {
      logger.error('Form submission error:', error);
      setErrorMessage(error.message || 'Hiba történt. Kérlek próbáld újra!');
      setSubmissionState('error');
      
      track('video_modal_submission_error', { 
        error: error.message,
        videoId: selectedVideo 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Modal Container - Fixed positioning */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎬</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Válaszd ki az ingyenes videót!</h2>
                    <p className="text-sm text-gray-600">Egy videót választhatsz, amit azonnal emailben küldünk</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {currentStep === 1 ? (
                  <>
                    {/* Step 1: Video Selection */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-800 mb-4">1. Válaszd ki a videót:</h3>
                      
                      {videos.map((video) => (
                        <div
                          key={video.id}
                          className={`border rounded-xl p-4 transition-all cursor-pointer
                            ${selectedVideo === video.id 
                              ? 'border-teal-400 bg-teal-50' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                          onClick={() => handleVideoSelect(video.id)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Radio button */}
                            <div className="mt-0.5">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                ${selectedVideo === video.id ? 'border-teal-400' : 'border-gray-300'}`}>
                                {selectedVideo === video.id && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                                )}
                              </div>
                            </div>
                            
                            {/* Video info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-2">
                                  <span className="text-xl mt-0.5">{video.icon}</span>
                                  <h4 className="font-medium text-gray-800">{video.shortTitle}</h4>
                                </div>
                                
                                {selectedVideo === video.id && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDescription(video.id);
                                    }}
                                    className="text-teal-600 hover:text-teal-700"
                                  >
                                    {expandedVideo === video.id ? (
                                      <ChevronUp className="w-5 h-5" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5" />
                                    )}
                                  </button>
                                )}
                              </div>
                              
                              {/* Expandable description */}
                              <AnimatePresence>
                                {selectedVideo === video.id && expandedVideo === video.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3 text-sm text-gray-600 overflow-hidden"
                                  >
                                    {video.description}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Error message */}
                      {errorMessage && currentStep === 1 && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm">{errorMessage}</span>
                        </div>
                      )}

                      {/* Continue button */}
                      <div className="pt-4">
                        <button
                          onClick={proceedToForm}
                          disabled={!selectedVideo}
                          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all
                            ${selectedVideo 
                              ? 'bg-teal-500 text-white hover:bg-teal-600' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                          Tovább
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 2: Form */}
                    {submissionState === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sikeres feliratkozás!</h3>
                        <p className="text-gray-600">
                          A videó linket elküldtük az email címedre.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="mb-4">
                          <button
                            type="button"
                            onClick={goBackToSelection}
                            className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            ← Vissza a videó választáshoz
                          </button>
                        </div>

                        <h3 className="font-bold text-lg text-gray-800">2. Add meg az adataidat:</h3>
                        
                        {/* Selected video reminder */}
                        <div className="bg-teal-50/50 border-2 border-teal-200 rounded-xl p-4">
                          <p className="text-sm text-teal-700 font-medium">
                            <strong>Kiválasztott videó:</strong> {videos.find(v => v.id === selectedVideo)?.shortTitle}
                          </p>
                        </div>

                        {/* Form fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Keresztnév *
                            </label>
                            <input
                              {...register('firstName')}
                              type="text"
                              placeholder="János"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Vezetéknév *
                            </label>
                            <input
                              {...register('lastName')}
                              type="text"
                              placeholder="Kovács"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email cím *
                          </label>
                          <div className="relative">
                            <input
                              {...register('email')}
                              type="email"
                              placeholder="neve@email.com"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Telefonszám *
                          </label>
                          <div className="relative">
                            <input
                              {...register('phone')}
                              type="tel"
                              placeholder="+36 30 123 4567"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Error message */}
                        {errorMessage && submissionState === 'error' && (
                          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{errorMessage}</span>
                          </div>
                        )}

                        {/* Submit button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={submissionState === 'loading'}
                            className="w-full py-3 px-4 rounded-xl font-semibold bg-teal-500 text-white hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {submissionState === 'loading' ? (
                              <span className="flex items-center justify-center gap-3">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Küldés...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-3">
                                <Mail className="w-6 h-6" />
                                Videó Küldése Emailben
                              </span>
                            )}
                          </button>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-4">
                          Talán később
                        </p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoSelectionModal;