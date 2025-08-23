'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}

const MobileModal: React.FC<MobileModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = '90vh'
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Handle swipe down to close
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100 && info.velocity.y > 0) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="flex items-end justify-center min-h-full md:items-center md:p-4">
            <motion.div
              initial={{ 
                opacity: 0, 
                y: '100%',  // Start from bottom on mobile
                scale: 0.95 
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: '100%', 
                scale: 0.95 
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.2 }}
              onDragEnd={handleDragEnd}
              className="relative bg-white w-full md:max-w-md md:rounded-3xl
                         rounded-t-3xl md:rounded-b-3xl shadow-2xl overflow-hidden
                         touch-manipulation"
              style={{ 
                maxHeight: maxHeight,
                minHeight: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile drag indicator */}
              <div className="md:hidden flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Header with close button */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                {title && (
                  <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
                    {title}
                  </h2>
                )}
                
                {/* Close button - 44x44px touch target */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-3 text-gray-400 hover:text-gray-600 
                           transition-colors rounded-full hover:bg-gray-100
                           min-w-[44px] min-h-[44px] flex items-center justify-center
                           touch-manipulation"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto px-6 py-4">
                {children}
              </div>
              
              {/* Mobile bottom close area - easier one-handed reach */}
              <div className="md:hidden sticky bottom-0 bg-white border-t border-gray-100 p-4 safe-area-bottom">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl
                           text-gray-700 font-medium transition-colors
                           min-h-[48px] touch-manipulation"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileModal;