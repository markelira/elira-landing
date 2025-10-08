'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, BookOpen, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import { content } from '@/lib/content/hu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMasterclassDropdownOpen, setIsMasterclassDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { user, loading } = useAuth();

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-10-06T09:00:00').getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMasterclassDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.masterclass-dropdown')) {
          setIsMasterclassDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMasterclassDropdownOpen]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleInfoBarCTA = () => {
    const purchaseButton = document.querySelector('button[class*="purchase"]');
    if (purchaseButton) {
      (purchaseButton as HTMLButtonElement).click();
    } else {
      const masterclassSection = document.getElementById('masterclass');
      if (masterclassSection) {
        masterclassSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Main Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1],
          type: 'tween'
        }}
        className="sticky top-4 left-4 right-4 md:left-8 md:right-8 z-50 mx-4 md:mx-8"
      >
        {/* InfoBar Integration */}
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-teal-600/80 to-teal-700/80 backdrop-blur-xl text-white shadow-lg mb-0 overflow-hidden rounded-t-2xl border border-white/20"
        >
              <div className="px-4 md:px-6 py-2 md:py-3">
                {/* Mobile InfoBar */}
                <div className="md:hidden">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/80" />
                      <span className="text-sm font-medium">Okt 6</span>
                      <span className="text-xs bg-red-500/20 px-1.5 py-0.5 rounded-full text-red-200">10 hely</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-white/80" />
                      <div className="flex gap-1 text-sm font-mono">
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.days}n</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.hours.toString().padStart(2, '0')}ó</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.minutes.toString().padStart(2, '0')}p</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{timeLeft.seconds.toString().padStart(2, '0')}mp</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop InfoBar */}
                <div className="hidden md:flex items-center gap-4 relative">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/80" />
                      <span className="text-sm font-medium">Online Masterclass: Október 6</span>
                      <span className="text-xs bg-red-500/20 px-2 py-1 rounded-full text-red-200">MAX. 10 hely</span>
                    </div>
                  </div>
                  
                  {/* Centered Countdown */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white/80" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80">Indulásig:</span>
                      <div className="flex gap-1">
                        <span className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{timeLeft.days}n</span>
                        <span className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{timeLeft.hours.toString().padStart(2, '0')}ó</span>
                        <span className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{timeLeft.minutes.toString().padStart(2, '0')}p</span>
                        <span className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{timeLeft.seconds.toString().padStart(2, '0')}mp</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <button
                      onClick={handleInfoBarCTA}
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Jelentkezés</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
        </motion.div>

        {/* Main Navbar */}
        <motion.nav
          layout
          className="bg-white/20 backdrop-blur-2xl shadow-lg border border-white/30 transition-all duration-500 ease-out rounded-b-2xl"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)'
          }}
        >
          <div className="px-4 md:px-6 py-3 md:py-4">
            
            {/* Main Navbar Content */}
            <div className="flex items-center justify-between">
                  {/* Logo and Navigation Links */}
                  <div className="flex items-center space-x-8">
                    {/* Logo */}
                    <motion.div 
                      layout
                      className="flex items-center"
                    >
                      <img 
                        src="/navbar-icon.png" 
                        alt="Elira logo" 
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      />
                    </motion.div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-6">
                    {user && !loading ? (
                      // Authenticated user navigation
                      <>
                        <Link
                          href="/dashboard"
                          className="text-gray-700 hover:text-teal-600 transition-colors font-medium flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          <BookOpen size={16} />
                          <span>Irányítópult</span>
                        </Link>
                        <Link
                          href="/dashboard/learning"
                          className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          Tanulás
                        </Link>
                      </>
                    ) : (
                      // Public navigation
                      <>
                        <Link
                          href="#"
                          className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          Pricing
                        </Link>
                        <Link
                          href="#"
                          className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                          Enterprise
                        </Link>
                        
                        {/* Masterclass Dropdown */}
                        <div className="relative masterclass-dropdown">
                          <button
                            onClick={() => setIsMasterclassDropdownOpen(!isMasterclassDropdownOpen)}
                            className="text-gray-700 hover:text-teal-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                          >
                            Learn
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {/* Dropdown Menu */}
                          {isMasterclassDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full mt-2 left-0 w-80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden"
                              style={{
                                backdropFilter: 'blur(40px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(180%)'
                              }}
                            >
                              <div className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">ABOUT</h3>
                                    <div className="space-y-3">
                                      <Link
                                        href="#"
                                        className="flex items-start gap-3 text-gray-700 hover:text-teal-600 transition-colors group"
                                        onClick={() => setIsMasterclassDropdownOpen(false)}
                                      >
                                        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mt-0.5 group-hover:bg-teal-50">
                                          <svg className="w-3 h-3 text-gray-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                          </svg>
                                        </div>
                                        <div>
                                          <div className="font-medium">Careers</div>
                                          <div className="text-sm text-gray-500">We're always hiring fun people</div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">MORE</h3>
                                    <div className="space-y-3">
                                      <Link
                                        href="#"
                                        className="block text-gray-700 hover:text-teal-600 transition-colors font-medium"
                                        onClick={() => setIsMasterclassDropdownOpen(false)}
                                      >
                                        Blog
                                      </Link>
                                      <Link
                                        href="#"
                                        className="block text-gray-700 hover:text-teal-600 transition-colors font-medium"
                                        onClick={() => setIsMasterclassDropdownOpen(false)}
                                      >
                                        Help Center
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </>
                    )}
                    </div>
                  </div>

                  {/* Right side - Login/Profile button */}
                  <div className="hidden lg:flex items-center">
                    {user && !loading ? (
                      <Link
                        href="/dashboard/profile"
                        className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-colors flex items-center space-x-1 shadow-lg hover:shadow-xl"
                      >
                        <User size={16} />
                        <span>{user.firstName}</span>
                      </Link>
                    ) : (
                      <Link
                        href="/auth"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span>Bejelentkezés</span>
                      </Link>
                    )}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-3 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {isMobileMenuOpen ? (
                      <X size={20} className="text-gray-700" />
                    ) : (
                      <Menu size={20} className="text-gray-700" />
                    )}
                  </button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 mx-4 overflow-hidden top-32 left-4 right-4 max-w-none"
              style={{
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="space-y-1">
                  {content.navbar.items.map((item) => {
                    const isConsultation = item.label === "Díjmentes Tanácsadás";
                    
                    if (item.href.startsWith('/')) {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block w-full text-left transition-colors font-medium py-3 px-4 rounded-lg ${
                            isConsultation
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:from-orange-600 hover:to-red-600 font-bold text-center'
                              : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    return (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left transition-colors font-medium py-3 px-4 rounded-lg ${
                          isConsultation
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:from-orange-600 hover:to-red-600 font-bold text-center'
                            : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  {user && !loading ? (
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full bg-teal-600 text-white px-4 py-3 rounded-xl text-center font-semibold hover:bg-teal-700 transition-colors"
                      >
                        Irányítópult
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-center font-semibold hover:bg-gray-200 transition-colors"
                      >
                        {user.firstName} profil
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-teal-600 text-white px-4 py-3 rounded-xl text-center font-semibold hover:bg-teal-700 transition-colors"
                    >
                      Bejelentkezés
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;