"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import MarketingSebeszet from './MarketingSebeszet';
import { useMarketingSebesztContext } from '@/contexts/MarketingSebesztContext';

export interface MarketingSebesztModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Trigger behavior
  triggerDelay?: number;
  showOnExit?: boolean;
  showOnScroll?: number; // percentage of page scrolled
  
  // Content customization
  modalTitle?: string;
  showCloseButton?: boolean;
  
  // Styling
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  backdropBlur?: boolean;
  
  // Tracking
  modalSource?: string;
}

const MarketingSebesztModal: React.FC<MarketingSebesztModalProps> = ({
  isOpen,
  onClose,
  triggerDelay = 0,
  showOnExit = false,
  showOnScroll,
  modalTitle = 'Ingyenes Marketing Sebészet',
  showCloseButton = true,
  size = 'lg',
  backdropBlur = true,
  modalSource = 'modal'
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { trackEvent } = useMarketingSebesztContext();

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  // Handle external isOpen prop
  useEffect(() => {
    if (isOpen) {
      setInternalIsOpen(true);
      setHasTriggered(true);
      trackEvent('modal_opened', { source: modalSource });
    } else {
      setInternalIsOpen(false);
    }
  }, [isOpen, trackEvent, modalSource]);

  // Handle trigger delay
  useEffect(() => {
    if (triggerDelay > 0 && !hasTriggered) {
      const timer = setTimeout(() => {
        setInternalIsOpen(true);
        setHasTriggered(true);
        trackEvent('modal_auto_triggered', { 
          source: 'delay',
          delay: triggerDelay 
        });
      }, triggerDelay);

      return () => clearTimeout(timer);
    }
  }, [triggerDelay, hasTriggered, trackEvent]);

  // Handle scroll trigger
  useEffect(() => {
    if (typeof showOnScroll === 'number' && !hasTriggered) {
      const handleScroll = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrolled >= showOnScroll) {
          setInternalIsOpen(true);
          setHasTriggered(true);
          trackEvent('modal_scroll_triggered', { 
            source: 'scroll',
            scrollPercentage: scrolled 
          });
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showOnScroll, hasTriggered, trackEvent]);

  // Handle exit intent
  useEffect(() => {
    if (showOnExit && !hasTriggered) {
      let mouseLeaveTimer: NodeJS.Timeout;

      const handleMouseLeave = (e: MouseEvent) => {
        // Check if mouse is leaving from the top of the page
        if (e.clientY <= 0) {
          mouseLeaveTimer = setTimeout(() => {
            setInternalIsOpen(true);
            setHasTriggered(true);
            trackEvent('modal_exit_intent_triggered', { source: 'exit_intent' });
          }, 100);
        }
      };

      const handleMouseEnter = () => {
        if (mouseLeaveTimer) {
          clearTimeout(mouseLeaveTimer);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        if (mouseLeaveTimer) {
          clearTimeout(mouseLeaveTimer);
        }
      };
    }
  }, [showOnExit, hasTriggered, trackEvent]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && internalIsOpen) {
        handleClose();
      }
    };

    if (internalIsOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [internalIsOpen]);

  const handleClose = () => {
    setInternalIsOpen(false);
    trackEvent('modal_closed', { source: modalSource });
    if (onClose) {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {internalIsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center p-4
            ${backdropBlur ? 'backdrop-blur-sm' : ''} bg-black/50
          `}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className={`
              ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto
              bg-white rounded-2xl shadow-2xl relative
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-0">
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
                    transition-colors rounded-full hover:bg-gray-100 z-10"
                  aria-label="Bezárás"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Sparkles className="w-6 h-6 text-teal-500" />
                  <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">
                    Korlátozott Idejű Ajánlat
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {modalTitle}
                </h2>
                
                <p className="text-gray-600 mt-2">
                  30 perc alatt konkrét megoldásokat kapsz, amik már holnap működhetnek
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <MarketingSebeszet />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
              <p className="text-xs text-center text-gray-500">
                Az adataidat bizalmasan kezeljük és nem adjuk ki harmadik félnek. 
                A modal bezárásával elfogadod az 
                <a href="/terms" className="text-teal-600 hover:underline ml-1">Általános Szerződési Feltételeket</a>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for easy modal management
export const useMarketingSebesztModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

// Helper component for trigger buttons
export const MarketingSebesztModalTrigger: React.FC<{
  children: React.ReactNode;
  modalProps?: Partial<MarketingSebesztModalProps>;
  className?: string;
}> = ({ children, modalProps = {}, className = '' }) => {
  const { isOpen, openModal, closeModal } = useMarketingSebesztModal();

  return (
    <>
      <div onClick={openModal} className={className}>
        {children}
      </div>
      
      <MarketingSebesztModal
        isOpen={isOpen}
        onClose={closeModal}
        modalSource="trigger_button"
        {...modalProps}
      />
    </>
  );
};

export default MarketingSebesztModal;