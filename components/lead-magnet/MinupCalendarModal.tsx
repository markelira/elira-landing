"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';

interface MinupCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string;
  clientName?: string;
}

const MinupCalendarModal: React.FC<MinupCalendarModalProps> = ({
  isOpen,
  onClose,
  leadId,
  clientName
}) => {
  // Add Minup event listener for payment redirect
  useEffect(() => {
    const handleMinupMessage = (event: MessageEvent) => {
      // Only accept messages from Minup
      if (event.origin !== "https://app.minup.io") return;
      
      const data = event.data;
      
      if (data.type === "redirect_to_payment") {
        window.location.href = data.url;
      }
      
      // Handle booking completion
      if (data.type === "booking_completed") {
        // You can add additional logic here for tracking
        console.log('Booking completed:', data);
      }
    };

    if (isOpen) {
      window.addEventListener("message", handleMinupMessage);
    }

    return () => {
      window.removeEventListener("message", handleMinupMessage);
    };
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-green-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Időpontfoglalás - Marketing Sebészet
                  </h2>
                  {clientName && (
                    <p className="text-sm text-gray-600">
                      Szia {clientName}! Válassz egy nekad megfelelő időpontot:
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Bezárás"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="relative">
              {/* Loading overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-600 text-sm">Naptár betöltése...</p>
                </div>
              </div>

              {/* Minup Calendar Embed */}
              <div className="relative">
                <iframe
                  src="https://app.minup.io/embed/elira?canStartPayment=true"
                  style={{
                    width: '100%',
                    height: '590px',
                    border: 'none'
                  }}
                  title="Minup Calendar - Marketing Sebészet Consultation"
                  onLoad={() => {
                    // Hide loading overlay when iframe loads
                    const loadingOverlay = document.querySelector('.absolute.inset-0.flex.items-center') as HTMLElement;
                    if (loadingOverlay) {
                      loadingOverlay.style.display = 'none';
                    }
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-start space-x-3 text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Mi történik ezután?
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>30 perces személyre szabott konzultáció</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Konkrét, azonnal használható megoldások</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>100%-ban ingyenes, nincs rejtett költség</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MinupCalendarModal;