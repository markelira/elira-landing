'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, Settings } from 'lucide-react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show banner after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    
    // Enable Google Analytics if user accepts
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
    
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const selectedConsent = {
      ...consent,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(selectedConsent));
    
    // Configure Google Analytics based on consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied'
      });
    }
    
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    
    // Disable tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
    
    setIsVisible(false);
  };

  const updateConsent = (type: keyof CookieConsent, value: boolean) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    setConsent(prev => ({ ...prev, [type]: value }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[200] 
                     max-w-4xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 
                          rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Cookie className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cookie beállítások
                  </h3>
                  <p className="text-sm text-gray-600">
                    Az oldalunk működéséhez szükségünk van sütikre
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-700 mb-4">
                Sütiket használunk az oldal működéséhez, a forgalom elemzéséhez és a tartalom személyre szabásához. 
                A "Minden elfogadása" gombra kattintva hozzájárulsz az összes süti használatához.
              </p>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 py-4 border-t border-gray-100">
                      
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-sm text-gray-900">
                              Szükséges sütik
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Az oldal alapműködéséhez szükségesek, nem kapcsolhatók ki.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-10 h-6 bg-teal-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-medium text-sm text-gray-900 block mb-1">
                            Analitikai sütik
                          </span>
                          <p className="text-xs text-gray-600">
                            Segítenek megérteni, hogyan használják a látogatók az oldalt.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => updateConsent('analytics', !consent.analytics)}
                            className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                              consent.analytics 
                                ? 'bg-teal-500 justify-end' 
                                : 'bg-gray-300 justify-start'
                            } px-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                          </button>
                        </div>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-medium text-sm text-gray-900 block mb-1">
                            Marketing sütik
                          </span>
                          <p className="text-xs text-gray-600">
                            Személyre szabott hirdetések megjelenítéséhez használjuk.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => updateConsent('marketing', !consent.marketing)}
                            className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                              consent.marketing 
                                ? 'bg-teal-500 justify-end' 
                                : 'bg-gray-300 justify-start'
                            } px-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 
                           text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 
                           rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>{showDetails ? 'Kevesebb' : 'Részletek'}</span>
                </button>
                
                <div className="flex gap-3 flex-1">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium 
                             text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 
                             rounded-lg transition-colors"
                  >
                    Csak szükséges
                  </button>
                  
                  {showDetails && (
                    <button
                      onClick={handleAcceptSelected}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium 
                               text-white bg-gray-600 hover:bg-gray-700 
                               rounded-lg transition-colors"
                    >
                      Kiválasztottak
                    </button>
                  )}
                  
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white 
                             bg-gradient-to-r from-teal-500 to-teal-700 
                             hover:from-teal-700 hover:to-teal-800 
                             rounded-lg transition-all duration-200 
                             shadow-lg shadow-teal-500/25"
                  >
                    Minden elfogadása
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;