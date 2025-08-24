'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { content } from '@/lib/content/hu';

const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handlePDFClick = (magnetId: string) => {
    // Dispatch custom event for PDF clicks
    const event = new CustomEvent('openEmailCapture', {
      detail: { magnetId }
    });
    window.dispatchEvent(event);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/eliraicon.png" 
                alt="Elira logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-bold text-black">
                Elira
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {content.navbar.items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-teal-700 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Quick PDF Access */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePDFClick('chatgpt-prompts')}
                  className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors flex items-center space-x-1"
                >
                  <Download size={16} />
                  <span>ChatGPT PDF</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-teal-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {content.navbar.items.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-gray-700 hover:text-teal-700 transition-colors font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handlePDFClick('chatgpt-prompts')}
                    className="w-full bg-teal-700 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download size={16} />
                    <span>ChatGPT PDF Letöltés</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;