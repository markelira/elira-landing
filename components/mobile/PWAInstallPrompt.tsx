'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Share, Plus } from 'lucide-react';
import { useMobileDevice } from './useMobileDevice';
import TouchTarget from './TouchTarget';
import MobileButton from './MobileButton';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * PWAInstallPrompt - Component to handle PWA installation
 */
const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const { isIOS, isAndroid, isMobile } = useMobileDevice();

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if running as PWA (iOS specific)
    if ((window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after delay if not dismissed before
      const hasSeenPrompt = localStorage.getItem('pwa-prompt-seen');
      if (!hasSeenPrompt && isMobile) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 30000); // Show after 30 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS doesn't support beforeinstallprompt, show custom instructions
    if (isIOS && !isInstalled) {
      const hasSeenIOSPrompt = localStorage.getItem('ios-pwa-prompt-seen');
      if (!hasSeenIOSPrompt) {
        setTimeout(() => {
          setShowIOSInstructions(true);
        }, 30000);
      }
    }

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isIOS, isInstalled, isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-seen', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-prompt-seen', 'true');
    localStorage.setItem('ios-pwa-prompt-seen', 'true');
  };

  // Don't show anything if already installed or not on mobile
  if (isInstalled || !isMobile) {
    return null;
  }

  return (
    <>
      {/* Android/Chrome Install Prompt */}
      <AnimatePresence>
        {showPrompt && deferredPrompt && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 z-50 safe-area-bottom"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">
                      Telepítsd az Elira alkalmazást
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Gyors hozzáférés, offline működés, push értesítések
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <MobileButton
                        size="sm"
                        variant="primary"
                        onClick={handleInstallClick}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Telepítés
                      </MobileButton>
                      
                      <MobileButton
                        size="sm"
                        variant="ghost"
                        onClick={handleDismiss}
                      >
                        Később
                      </MobileButton>
                    </div>
                  </div>
                  
                  <TouchTarget
                    as="button"
                    onClick={handleDismiss}
                    minSize={44}
                    className="p-2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </TouchTarget>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Install Instructions */}
      <AnimatePresence>
        {showIOSInstructions && isIOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={handleDismiss}
            />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-t-3xl w-full p-6 pb-safe"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Telepítsd az Elira alkalmazást
                </h3>
                <p className="text-gray-600">
                  Kövesd az alábbi lépéseket az alkalmazás telepítéséhez
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Nyomj a <Share className="inline w-4 h-4 text-blue-500" /> Megosztás ikonra
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Az alsó menüsorban található
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Görgess le és válaszd a "Hozzáadás a kezdőképernyőhöz"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <Plus className="inline w-3 h-3" /> ikon mellett található
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Nyomj a "Hozzáadás" gombra
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      A jobb felső sarokban
                    </p>
                  </div>
                </div>
              </div>
              
              <MobileButton
                fullWidth
                variant="primary"
                onClick={handleDismiss}
              >
                Értem, köszönöm
              </MobileButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Install Button (optional) */}
      {deferredPrompt && !showPrompt && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 
                   rounded-full shadow-lg flex items-center justify-center z-40"
          onClick={() => setShowPrompt(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </>
  );
};

export default PWAInstallPrompt;

/**
 * usePWAInstall - Hook to manage PWA installation
 */
export const usePWAInstall = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    };

    setIsInstalled(checkInstalled());

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setCanInstall(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return false;

    const result = await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setCanInstall(false);
      return true;
    }

    return false;
  };

  return {
    canInstall,
    isInstalled,
    install,
  };
};