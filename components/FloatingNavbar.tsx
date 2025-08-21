'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import Image from 'next/image';

const FloatingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { trackButton } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      // Keep navbar always visible, just change styling
      setScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = ['hero', 'lead-magnets', 'value', 'cta'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    trackButton(label, 'floating-nav');
    
    // Smooth scroll to section
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`
      fixed top-4 left-1/2 -translate-x-1/2 z-50 
      transition-all duration-300
      ${scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg' 
        : 'bg-white/70 backdrop-blur-md shadow-md'
      }
      rounded-full px-8 py-3 border border-gray-200/50
    `}>
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center mr-2">
          <Image
            src="/eliraicon.png"
            alt="Elira Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
              {content.navbar.items.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href, item.label)}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-full
                      transition-all duration-200
                      ${isActive 
                        ? 'text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full"
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
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;