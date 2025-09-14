'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, User, BookOpen } from 'lucide-react';
import { content } from '@/lib/content/hu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

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
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/eliraicon.png" 
                alt="Elira logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold text-black">
                Elira
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {user && !loading ? (
                // Authenticated user navigation
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-teal-700 transition-colors font-medium flex items-center space-x-1"
                  >
                    <BookOpen size={16} />
                    <span>Irányítópult</span>
                  </Link>
                  <Link
                    href="/courses"
                    className="text-gray-700 hover:text-teal-700 transition-colors font-medium"
                  >
                    Kurzusok
                  </Link>
                  <Link
                    href="/dashboard/learning"
                    className="text-gray-700 hover:text-teal-700 transition-colors font-medium"
                  >
                    Tanulás
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors flex items-center space-x-1"
                  >
                    <User size={16} />
                    <span>{user.firstName}</span>
                  </Link>
                </>
              ) : (
                // Public navigation
                <>
                  {content.navbar.items.map((item) => {
                    if (item.href.startsWith('/')) {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-700 hover:text-teal-700 transition-colors font-medium"
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    return (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="text-gray-700 hover:text-teal-700 transition-colors font-medium"
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  
                  {/* Auth Button */}
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/auth"
                      className="bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors flex items-center space-x-1"
                    >
                      <User size={16} />
                      <span>Bejelentkezés</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-teal-700 transition-colors touch-target"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <div className="container mx-auto px-4 sm:px-6 py-4 space-y-3">
                {content.navbar.items.map((item) => {
                  if (item.href.startsWith('/')) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-left text-gray-700 hover:text-teal-700 transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 touch-target"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left text-gray-700 hover:text-teal-700 transition-colors font-medium py-3 px-2 rounded-lg hover:bg-gray-50 touch-target"
                    >
                      {item.label}
                    </button>
                  );
                })}
                
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {user && !loading ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full bg-teal-700 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors text-center"
                      >
                        Irányítópult
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors text-center"
                      >
                        {user.firstName} profil
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full bg-teal-700 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors text-center"
                      >
                        Bejelentkezés
                      </Link>
                    </>
                  )}
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