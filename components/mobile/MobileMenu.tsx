'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Download, MessageSquare } from 'lucide-react';
import { content } from '@/lib/content/hu';
import TouchTarget from './TouchTarget';
import useSwipeGesture from './useSwipeGesture';
import useMobileDevice from './useMobileDevice';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
  onNavClick: (href: string, label: string) => void;
  onDiscordClick: () => void;
  onPdfClick: (magnetId: string, title: string) => void;
}

/**
 * MobileMenu - Full-screen mobile navigation with swipe gestures
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection = 'hero',
  onNavClick,
  onDiscordClick,
  onPdfClick,
}) => {
  const [showPdfSubmenu, setShowPdfSubmenu] = useState(false);
  const { isIOS } = useMobileDevice();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // iOS-specific fix for background scrolling
      if (isIOS) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, isIOS]);

  // Swipe to close
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeRight: onClose,
  }, {
    threshold: 80,
    enabled: isOpen,
  });

  const handleNavClick = (href: string, label: string) => {
    onNavClick(href, label);
    onClose();
  };

  const handlePdfClick = (magnetId: string, title: string) => {
    onPdfClick(magnetId, title);
    onClose();
  };

  const regularItems = content.navbar.items.filter(item => item.label !== 'Ingyenes Anyagok');
  const pdfItem = content.navbar.items.find(item => item.label === 'Ingyenes Anyagok');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            ref={swipeRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Menü</h2>
              <TouchTarget
                as="button"
                onClick={onClose}
                minSize={44}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </TouchTarget>
            </div>

            {/* Navigation Items */}
            <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
              {/* Regular Nav Items */}
              {regularItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href, item.label)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl min-h-[48px]
                      flex items-center justify-between group
                      transition-all duration-200 touch-manipulation
                      ${isActive 
                        ? 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white' 
                        : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className={`
                      w-5 h-5 transition-transform
                      ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}
                    `} />
                  </motion.button>
                );
              })}

              {/* PDF Downloads Section */}
              {pdfItem && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowPdfSubmenu(!showPdfSubmenu)}
                    className="w-full text-left px-4 py-3 rounded-xl min-h-[48px]
                               flex items-center justify-between
                               hover:bg-gray-50 transition-colors touch-manipulation"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-teal-600" />
                      <span className="font-medium text-gray-700">
                        {pdfItem.label}
                      </span>
                    </div>
                    <ChevronRight className={`
                      w-5 h-5 text-gray-400 transition-transform
                      ${showPdfSubmenu ? 'rotate-90' : ''}
                    `} />
                  </button>

                  <AnimatePresence>
                    {showPdfSubmenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pr-2 py-2 space-y-1">
                          {content.magnets.items.map((magnet) => (
                            <button
                              key={magnet.id}
                              onClick={() => handlePdfClick(magnet.id, magnet.title)}
                              className="w-full text-left px-4 py-3 rounded-lg min-h-[44px]
                                       hover:bg-gray-50 transition-colors
                                       flex items-start space-x-3 group touch-manipulation"
                            >
                              <span className="text-xl flex-shrink-0 mt-0.5">
                                {magnet.icon}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-sm text-gray-900 
                                              group-hover:text-teal-700 transition-colors">
                                  {magnet.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                  {magnet.subtitle}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </nav>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
              <button
                onClick={() => {
                  onDiscordClick();
                  onClose();
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800
                         text-white px-6 py-3 rounded-xl min-h-[48px]
                         flex items-center justify-center space-x-3
                         transition-colors touch-manipulation"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Csatlakozz a Discord-hoz</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

/**
 * MobileMenuButton - Hamburger menu button
 */
export const MobileMenuButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}> = ({ isOpen, onClick, className = '' }) => {
  return (
    <TouchTarget
      as="button"
      onClick={onClick}
      minSize={44}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="relative w-6 h-6">
        <span className={`
          absolute left-0 top-1 w-6 h-0.5 bg-gray-700 transition-all duration-200
          ${isOpen ? 'rotate-45 top-3' : ''}
        `} />
        <span className={`
          absolute left-0 top-3 w-6 h-0.5 bg-gray-700 transition-all duration-200
          ${isOpen ? 'opacity-0' : ''}
        `} />
        <span className={`
          absolute left-0 top-5 w-6 h-0.5 bg-gray-700 transition-all duration-200
          ${isOpen ? '-rotate-45 top-3' : ''}
        `} />
      </div>
    </TouchTarget>
  );
};

/**
 * BottomNavigation - Fixed bottom navigation for mobile
 */
export const BottomNavigation: React.FC<{
  items: Array<{
    icon: React.ReactNode;
    label: string;
    href: string;
    active?: boolean;
  }>;
  onItemClick: (href: string) => void;
}> = ({ items, onItemClick }) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                 px-2 pb-safe z-50 md:hidden"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <TouchTarget
            key={item.href}
            as="button"
            onClick={() => onItemClick(item.href)}
            minSize={48}
            className={`
              flex flex-col items-center justify-center py-2 px-3 w-full
              transition-colors touch-manipulation
              ${item.active 
                ? 'text-teal-700' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <div className={`
              ${item.active ? 'scale-110' : ''}
              transition-transform
            `}>
              {item.icon}
            </div>
            <span className="text-xs mt-1 font-medium">
              {item.label}
            </span>
            {item.active && (
              <motion.div
                layoutId="bottom-nav-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 
                         bg-teal-700 rounded-full"
              />
            )}
          </TouchTarget>
        ))}
      </div>
    </motion.nav>
  );
};