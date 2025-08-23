'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import TouchTarget from './TouchTarget';
import useMobileDevice from './useMobileDevice';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[]; // Percentage heights (e.g., [0.25, 0.5, 0.9])
  defaultSnapPoint?: number;
  showHandle?: boolean;
  closeOnOverlayClick?: boolean;
  preventScroll?: boolean;
  fullScreen?: boolean;
}

/**
 * MobileBottomSheet - iOS-style bottom sheet with drag gestures
 */
const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [0.5, 0.9],
  defaultSnapPoint = 0,
  showHandle = true,
  closeOnOverlayClick = true,
  preventScroll = true,
  fullScreen = false,
}) => {
  const [currentSnapIndex, setCurrentSnapIndex] = useState(defaultSnapPoint);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { viewportHeight, isIOS } = useMobileDevice();
  
  const y = useMotionValue(0);
  const sheetHeight = snapPoints[currentSnapIndex] * viewportHeight;
  
  // Transform for backdrop opacity based on sheet position
  const backdropOpacity = useTransform(
    y,
    [0, sheetHeight],
    [0.5, 0]
  );

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen && preventScroll) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      if (isIOS) {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      }
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        if (isIOS) {
          window.scrollTo(0, scrollY);
        }
      };
    }
  }, [isOpen, preventScroll, isIOS]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const shouldClose = info.velocity.y > 500 || 
                       (info.velocity.y > 0 && info.offset.y > sheetHeight * 0.3);
    
    if (shouldClose) {
      onClose();
    } else {
      // Snap to nearest point
      const currentPosition = info.offset.y;
      let nearestSnapIndex = currentSnapIndex;
      let minDistance = Infinity;
      
      snapPoints.forEach((point, index) => {
        const snapHeight = point * viewportHeight;
        const distance = Math.abs(currentPosition + snapHeight - sheetHeight);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSnapIndex = index;
        }
      });
      
      setCurrentSnapIndex(nearestSnapIndex);
    }
  };

  const sheetVariants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: fullScreen ? 0 : `${100 - snapPoints[currentSnapIndex] * 100}%`,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black pointer-events-auto"
            onClick={closeOnOverlayClick ? onClose : undefined}
            style={{ opacity: fullScreen ? 0.5 : backdropOpacity }}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={fullScreen ? false : "y"}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={handleDragEnd}
            style={{ y }}
            className={`
              absolute bottom-0 left-0 right-0 bg-white
              rounded-t-3xl shadow-2xl pointer-events-auto
              ${fullScreen ? 'h-full' : `h-[${snapPoints[currentSnapIndex] * 100}vh]`}
              max-h-[95vh] touch-manipulation
            `}
          >
            {/* Drag Handle */}
            {showHandle && !fullScreen && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
            )}

            {/* Header */}
            {title && (
              <div className="sticky top-0 bg-white border-b border-gray-100 
                            px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
                  {title}
                </h2>
                
                <TouchTarget
                  as="button"
                  onClick={onClose}
                  minSize={44}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </TouchTarget>
              </div>
            )}

            {/* Content */}
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-4"
              style={{
                maxHeight: fullScreen 
                  ? 'calc(100vh - 120px)' 
                  : `calc(${snapPoints[currentSnapIndex] * 100}vh - 120px)`,
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomSheet;

/**
 * MobileActionSheet - iOS-style action sheet
 */
export const MobileActionSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'danger' | 'cancel';
    icon?: React.ReactNode;
  }>;
}> = ({ isOpen, onClose, title, message, actions }) => {
  const { isIOS } = useMobileDevice();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Action Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 z-[201] p-4 pb-safe"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              {(title || message) && (
                <div className="px-6 py-4 text-center border-b border-gray-100">
                  {title && (
                    <h3 className="text-sm font-semibold text-gray-900">
                      {title}
                    </h3>
                  )}
                  {message && (
                    <p className="text-sm text-gray-500 mt-1">
                      {message}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="divide-y divide-gray-100">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      onClose();
                    }}
                    className={`
                      w-full px-6 py-4 min-h-[56px] flex items-center justify-center
                      space-x-3 transition-colors touch-manipulation
                      ${action.variant === 'danger' 
                        ? 'text-red-600 hover:bg-red-50 active:bg-red-100' 
                        : action.variant === 'cancel'
                        ? 'text-gray-500 hover:bg-gray-50 active:bg-gray-100 font-semibold'
                        : 'text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                      }
                    `}
                  >
                    {action.icon && (
                      <span className="flex-shrink-0">
                        {action.icon}
                      </span>
                    )}
                    <span className={isIOS ? 'text-lg' : 'text-base'}>
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cancel button (iOS style) */}
            {isIOS && (
              <button
                onClick={onClose}
                className="w-full mt-2 px-6 py-4 min-h-[56px] bg-white rounded-2xl
                         text-blue-600 font-semibold text-lg
                         hover:bg-gray-50 active:bg-gray-100
                         transition-colors touch-manipulation"
              >
                Cancel
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * MobileDialog - Centered dialog for important actions
 */
export const MobileDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'default' | 'danger';
}> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl z-[201]"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">
                {message}
              </p>
            </div>

            <div className="flex border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 min-h-[48px] text-gray-600
                         hover:bg-gray-50 active:bg-gray-100
                         transition-colors touch-manipulation
                         border-r border-gray-100"
              >
                {cancelLabel}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`
                  flex-1 px-6 py-4 min-h-[48px] font-semibold
                  transition-colors touch-manipulation
                  ${variant === 'danger'
                    ? 'text-red-600 hover:bg-red-50 active:bg-red-100'
                    : 'text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                  }
                `}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};