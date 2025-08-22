'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import Image from 'next/image';
import { ChevronDown, MessageSquare, Download } from 'lucide-react';

const FloatingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showPdfDropdown, setShowPdfDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { trackButton } = useAnalytics();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

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

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPdfDropdown(false);
      }
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (href: string, label: string) => {
    trackButton(label, 'floating-nav');
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    trackButton('Logo', 'floating-nav');
    
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to top
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
    
    // Trigger email capture modal for the specific PDF
    const event = new CustomEvent('openEmailCapture', { 
      detail: { magnetId, title } 
    });
    window.dispatchEvent(event);
  };

  const regularItems = content.navbar.items.filter(item => item.label !== 'Ingyenes Anyagok');
  const pdfItem = content.navbar.items.find(item => item.label === 'Ingyenes Anyagok');

  return (
    <nav className={`
      fixed top-4 left-1/2 -translate-x-1/2 z-50 
      transition-all duration-300
      ${scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl' 
        : 'bg-white/80 backdrop-blur-md shadow-lg'
      }
      rounded-full px-6 py-3 border border-gray-200/30
      ${isMobile ? 'px-4 py-2' : ''}
    `}>
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <motion.button
          onClick={handleLogoClick}
          className="flex items-center mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Kezdőlap"
        >
          <Image
            src="/eliraicon.png"
            alt="Elira Logo"
            width={isMobile ? 28 : 32}
            height={isMobile ? 28 : 32}
            className={isMobile ? "w-7 h-7" : "w-8 h-8"}
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
                className={`
                  relative px-3 py-2 text-sm font-medium rounded-full
                  transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                  }
                  ${isMobile ? 'px-2 py-1.5 text-xs' : ''}
                `}
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
                <span className="relative z-10">
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
                className={`
                  relative px-3 py-2 text-sm font-medium rounded-full
                  transition-all duration-200 flex items-center gap-1
                  text-gray-700 hover:text-gray-900 whitespace-nowrap
                  ${isMobile ? 'px-2 py-1.5 text-xs' : ''}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span className="relative z-10">{isMobile ? 'PDFs' : pdfItem.label}</span>
                <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} transition-transform ${showPdfDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showPdfDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200/50
                      backdrop-blur-xl overflow-hidden min-w-max
                      ${isMobile 
                        ? 'right-0 w-64' 
                        : 'left-1/2 transform -translate-x-1/2 w-80'
                      }
                    `}
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                        5 Ingyenes Anyag
                      </div>
                      {content.magnets.items.map((magnet) => (
                        <motion.button
                          key={magnet.id}
                          onClick={() => handlePdfClick(magnet.id, magnet.title)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-start gap-3 group"
                          whileHover={{ x: 2 }}
                        >
                          <span className="text-lg flex-shrink-0 mt-0.5">{magnet.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 text-sm group-hover:text-teal-700 transition-colors">
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
          {/* Discord Button */}
          <motion.button
            onClick={handleDiscordClick}
            className={`
              p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 
              transition-colors group relative
              ${isMobile ? 'p-1.5' : ''}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Csatlakozz a Discord közösséghez"
          >
            <MessageSquare className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            
            {/* Live indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;