'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle, AlertCircle, Download, Check } from 'lucide-react';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import { logger } from '@/lib/logger';

// Form validation schema
const formSchema = z.object({
  email: z.string().email('Érvényes email címet adj meg'),
  firstName: z.string().min(2, 'Keresztnév legalább 2 karakter szükséges'),
  lastName: z.string().min(1, 'Vezetéknév legalább 1 karakter szükséges'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']),
  selectedMagnets: z.array(z.string()).min(1, 'Válassz legalább egy anyagot')
});

type FormData = z.infer<typeof formSchema>;

interface PDFSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const PDFSelectorModal: React.FC<PDFSelectorModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMagnets, setSelectedMagnets] = useState<string[]>([]);
  const { trackEmail, openModal, closeModal, startForm, submitForm } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  React.useEffect(() => {
    if (isOpen) {
      openModal('PDFSelector');
      startForm('pdf_selector');
    }
  }, [isOpen, openModal, startForm]);

  React.useEffect(() => {
    setValue('selectedMagnets', selectedMagnets);
  }, [selectedMagnets, setValue]);

  const handleClose = () => {
    closeModal('PDFSelector');
    reset();
    setSelectedMagnets([]);
    setSubmissionState('idle');
    setErrorMessage('');
    onClose();
  };

  const toggleMagnet = (magnetId: string) => {
    setSelectedMagnets(prev => {
      if (prev.includes(magnetId)) {
        return prev.filter(id => id !== magnetId);
      } else {
        return [...prev, magnetId];
      }
    });
  };

  const onSubmit = async (data: FormData) => {
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
          source: 'pdf_selector',
          selectedMagnets: data.selectedMagnets
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Hiba történt a feldolgozás során');
      }

      // Success
      setSubmissionState('success');
      trackEmail(data.email, 'pdf_selector');
      submitForm('pdf_selector', true);

      // Auto close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error: any) {
      logger.error('PDF Selector submission error:', error);
      setSubmissionState('error');
      setErrorMessage(error.message || 'Váratlan hiba történt. Próbáld újra!');
      submitForm('pdf_selector', false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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
            className="relative bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 
                         hover:text-gray-600 transition-colors rounded-full
                         hover:bg-gray-100 z-10"
            >
              <X size={24} />
            </button>

            {/* Success State */}
            {submissionState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Fantasztikus! 🎉
                </h3>
                <p className="text-xl text-gray-600 mb-2">
                  {selectedMagnets.length} anyagot küldünk neked email-ben!
                </p>
                <p className="text-gray-500">
                  ✅ Nézd meg a postaládádat (spam mappát is!)
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8 text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Válaszd ki az anyagokat! 📚
                  </h3>
                  <p className="text-xl text-gray-600 mb-2">
                    Jelöld be, melyik PDF-eket szeretnéd megkapni
                  </p>
                  <p className="text-gray-500">
                    Minden anyagot egy emailben küldjük el neked
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* PDF Selection Grid */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Ingyenes anyagok ({selectedMagnets.length} kiválasztva):
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {content.magnets.items.map((magnet) => (
                        <motion.div
                          key={magnet.id}
                          whileHover={{ y: -2 }}
                          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            selectedMagnets.includes(magnet.id)
                              ? 'border-teal-500 bg-teal-50 shadow-lg'
                              : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleMagnet(magnet.id)}
                        >
                          {/* Checkbox */}
                          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedMagnets.includes(magnet.id)
                              ? 'bg-teal-500 border-teal-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedMagnets.includes(magnet.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex items-start space-x-4 pr-8">
                            <div className="text-3xl">{magnet.icon}</div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {magnet.title}
                              </h5>
                              <p className="text-sm text-gray-600 mb-2">
                                {magnet.subtitle}
                              </p>
                              <p className="text-xs text-gray-500">
                                {magnet.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {errors.selectedMagnets && (
                      <p className="text-sm text-red-600 mt-2">{errors.selectedMagnets.message}</p>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="space-y-6 border-t pt-6">
                    
                    {/* Name fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keresztnév *
                        </label>
                        <input
                          {...register('firstName')}
                          type="text"
                          placeholder="János"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                     focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                     transition-all duration-200"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vezetéknév *
                        </label>
                        <input
                          {...register('lastName')}
                          type="text"
                          placeholder="Kovács"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                     focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                     transition-all duration-200"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email cím *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="janos.kovacs@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                   focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                   transition-all duration-200"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Job and Education */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Job */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Munkakör *
                        </label>
                        <select
                          {...register('job')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                     focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                     transition-all duration-200"
                        >
                          <option value="">Válassz...</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT/Fejlesztő">IT/Fejlesztő</option>
                          <option value="HR">HR</option>
                          <option value="Pénzügy">Pénzügy</option>
                          <option value="Értékesítés">Értékesítés</option>
                          <option value="Vezetői pozíció">Vezetői pozíció</option>
                          <option value="Diák">Diák</option>
                          <option value="Egyéb">Egyéb</option>
                        </select>
                        {errors.job && (
                          <p className="mt-1 text-sm text-red-600">{errors.job.message}</p>
                        )}
                      </div>

                      {/* Education */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Végzettség *
                        </label>
                        <select
                          {...register('education')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                     focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                     transition-all duration-200"
                        >
                          <option value="">Válassz...</option>
                          <option value="Középiskola">Középiskola</option>
                          <option value="Főiskola">Főiskola</option>
                          <option value="Egyetem (BSc)">Egyetem (BSc)</option>
                          <option value="Mesterszint (MSc)">Mesterszint (MSc)</option>
                          <option value="PhD">PhD</option>
                        </select>
                        {errors.education && (
                          <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Error message */}
                  {submissionState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      {selectedMagnets.length > 0 && (
                        <span className="font-medium text-teal-700">
                          {selectedMagnets.length} anyag kiválasztva
                        </span>
                      )}
                    </p>
                    
                    <motion.button
                      type="submit"
                      disabled={submissionState === 'loading' || selectedMagnets.length === 0}
                      whileHover={{ scale: selectedMagnets.length > 0 ? 1.02 : 1 }}
                      whileTap={{ scale: selectedMagnets.length > 0 ? 0.98 : 1 }}
                      className="px-8 py-4 bg-gradient-to-r from-teal-700 to-cyan-600 
                                 text-white font-bold rounded-xl
                                 hover:from-teal-800 hover:to-cyan-700
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200 flex items-center space-x-2"
                    >
                      {submissionState === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Küldés...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>Küldés és Letöltés ({selectedMagnets.length})</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PDFSelectorModal;