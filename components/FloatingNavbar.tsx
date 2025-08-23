'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import Image from 'next/image';
import { ChevronDown, MessageSquare, Download, Menu, X } from 'lucide-react';

// Mobile breakpoint constant
const MOBILE_BREAKPOINT = 768;

const FloatingNavbar: React.FC = () => {
  // Core state
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Desktop state
  const [showPdfDropdown, setShowPdfDropdown] = useState(false);
  
  // Mobile state
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Analytics and refs
  const { trackButton } = useAnalytics();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Advanced scroll detection with hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);

      // Hide/show navbar based on scroll direction (mobile only)
      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          // Scrolling down - hide navbar
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsHidden(false);
        }
      } else {
        setIsHidden(false); // Always show on desktop
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = ['hero', 'transition', 'lead-magnets', 'community'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // For hero section, consider it active if we're at the top or if it's in view
          if (section === 'hero') {
            return window.scrollY < 200 || (rect.top <= 100 && rect.bottom >= 100);
          }
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, lastScrollY]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPdfDropdown(false);
      }
      
      // Mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (showMobileMenu) {
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
  }, [showMobileMenu]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
        if (showPdfDropdown) {
          setShowPdfDropdown(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showMobileMenu, showPdfDropdown]);

  // Navigation handlers
  const handleNavClick = (href: string, label: string) => {
    trackButton(label, 'floating-nav');
    setShowMobileMenu(false); // Close mobile menu on navigation
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    trackButton('Logo', 'floating-nav');
    setShowMobileMenu(false);
    
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDiscordClick = () => {
    trackButton('Discord', 'navbar-quick-action');
    window.open('https://discord.gg/mcUyZXGERT', '_blank', 'noopener,noreferrer');
  };

  const handlePdfClick = (magnetId: string, title: string) => {
    trackButton(`PDF-${title}`, 'navbar-dropdown');
    setShowPdfDropdown(false);
    setShowMobileMenu(false);
    
    // Trigger email capture modal
    const event = new CustomEvent('openEmailCapture', { 
      detail: { magnetId, title } 
    });
    window.dispatchEvent(event);
  };

  // Hamburger Menu Component
  const HamburgerButton = () => (
    <motion.button
      onClick={() => setShowMobileMenu(!showMobileMenu)}
      className="relative z-50 p-3 rounded-full hover:bg-gray-100 transition-colors
                 min-w-[44px] min-h-[44px] flex items-center justify-center
                 touch-manipulation"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={showMobileMenu ? "Menü bezárása" : "Menü megnyitása"}
    >
      <motion.div
        animate={showMobileMenu ? "open" : "closed"}
        className="w-6 h-6 flex flex-col justify-center items-center"
      >
        <motion.span
          className="w-6 h-0.5 bg-gray-800 block"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 6 }
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-gray-800 block mt-1.5"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-gray-800 block mt-1.5"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -6 }
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.button>
  );

  const regularItems = content.navbar.items.filter(item => item.label !== 'Ingyenes Anyagok');
  const pdfItem = content.navbar.items.find(item => item.label === 'Ingyenes Anyagok');

  return (
    <>
      {/* Mobile Navigation */}
      {isMobile ? (
        <>
          {/* Mobile Header Bar */}
          <motion.nav 
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl 
                       border-b border-gray-200/30 px-4 py-3"
            initial={false}
            animate={{ 
              y: isHidden ? -100 : 0,
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="navigation"
            aria-label="Fő navigáció"
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 
                           transition-colors min-w-[44px] min-h-[44px] touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/eliraicon.png"
                  alt="Elira Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <span className="text-lg font-bold text-gray-900">Elira</span>
              </motion.button>

              {/* Hamburger Button */}
              <HamburgerButton />
            </div>
          </motion.nav>

          {/* Full-Screen Mobile Menu Overlay */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  opacity: { duration: 0.2 }
                }}
                className="fixed inset-0 z-50 bg-white"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 0, right: 0.2 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100 && info.velocity.x > 0.5) {
                    setShowMobileMenu(false);
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Navigációs menü"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <motion.button
                    onClick={handleLogoClick}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/eliraicon.png"
                      alt="Elira Logo"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="text-xl font-bold text-gray-900">Elira</span>
                  </motion.button>

                  <HamburgerButton />
                </div>

                {/* Mobile Menu Content */}
                <div className="p-6 space-y-6">
                  {/* Navigation Items */}
                  <div className="space-y-2">
                    {regularItems.map((item, index) => {
                      const sectionId = item.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      
                      return (
                        <motion.button
                          key={item.href}
                          onClick={() => handleNavClick(item.href, item.label)}
                          className="w-full text-left p-4 rounded-2xl transition-all duration-200
                                     hover:bg-gray-50 min-h-[56px] touch-manipulation
                                     flex items-center justify-between"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className={`text-lg font-medium ${isActive ? 'text-teal-600' : 'text-gray-900'}`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-teal-600 rounded-full"
                              layoutId="mobile-active-indicator"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* PDF Downloads Section */}
                  {pdfItem && (
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Ingyenes Anyagok
                      </h3>
                      <div className="space-y-2">
                        {content.magnets.items.map((magnet, index) => (
                          <motion.button
                            key={magnet.id}
                            onClick={() => handlePdfClick(magnet.id, magnet.title)}
                            className="w-full text-left p-4 rounded-2xl bg-gray-50 hover:bg-gray-100
                                       transition-all duration-200 min-h-[64px] touch-manipulation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (regularItems.length + index) * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{magnet.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-base">
                                  {magnet.title}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {magnet.subtitle}
                                </div>
                              </div>
                              <Download className="w-5 h-5 text-gray-400" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Discord CTA */}
                  <div className="border-t border-gray-100 pt-6">
                    <motion.button
                      onClick={handleDiscordClick}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 
                                 text-white p-4 rounded-2xl font-semibold text-lg
                                 hover:from-purple-700 hover:to-purple-800
                                 transition-all duration-200 min-h-[56px] touch-manipulation
                                 flex items-center justify-center space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Csatlakozz a Discord Közösséghez</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Desktop Navigation */
        <motion.nav 
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                     transition-all duration-300 rounded-full px-6 py-3 
                     border border-gray-200/30 backdrop-blur-xl"
          initial={false}
          animate={{ 
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.90)',
            boxShadow: scrolled 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
              : '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
          }}
          role="navigation"
          aria-label="Fő navigáció"
        >
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <motion.button
              onClick={handleLogoClick}
              className="flex items-center mr-2 p-1 rounded-full hover:bg-gray-100 
                         transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Kezdőlap"
            >
              <Image
                src="/eliraicon.png"
                alt="Elira Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </motion.button>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {/* Regular nav items */}
              {regularItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href, item.label)}
                    className="relative px-3 py-2 text-sm font-medium rounded-full
                               transition-all duration-200 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-teal-700 to-cyan-600 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}

              {/* PDF Dropdown */}
              {pdfItem && (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={() => setShowPdfDropdown(!showPdfDropdown)}
                    className="relative px-3 py-2 text-sm font-medium rounded-full
                               transition-all duration-200 flex items-center gap-1
                               text-gray-700 hover:text-gray-900 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="relative z-10">{pdfItem.label}</span>
                    <motion.div
                      animate={{ rotate: showPdfDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {showPdfDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 bg-white rounded-xl shadow-xl 
                                   border border-gray-200/50 backdrop-blur-xl overflow-hidden 
                                   min-w-max left-1/2 transform -translate-x-1/2 w-80"
                      >
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 px-3 py-2 
                                         uppercase tracking-wide">
                            5 Ingyenes Anyag
                          </div>
                          {content.magnets.items.map((magnet) => (
                            <motion.button
                              key={magnet.id}
                              onClick={() => handlePdfClick(magnet.id, magnet.title)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 
                                         transition-colors flex items-start gap-3 group"
                              whileHover={{ x: 2 }}
                            >
                              <span className="text-lg flex-shrink-0 mt-0.5">{magnet.icon}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-gray-900 text-sm 
                                               group-hover:text-teal-700 transition-colors">
                                  {magnet.title}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                  {magnet.subtitle}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200/50">
              <motion.button
                onClick={handleDiscordClick}
                className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 
                           transition-colors group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Csatlakozz a Discord közösséghez"
              >
                <MessageSquare className="w-5 h-5" />
                
                {/* Live indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full 
                               border-2 border-white animate-pulse"></div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}
    </>
  )
};

export default FloatingNavbar;