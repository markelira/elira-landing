'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavbarProps {
  links?: NavLink[];
}

export function MobileNavbar({ links }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Default navigation links
  const defaultLinks: NavLink[] = [
    { label: 'Díjmentes audit', href: '/dijmentes-audit' },
    { label: 'Masterclass', href: '/masterclass' },
    { label: 'Rólunk', href: '/rolunk' },
  ];

  const navigationLinks = links || defaultLinks;

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {/* Top line */}
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2 bg-white' : ''
          }`}
        />
        {/* Middle line */}
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        {/* Bottom line */}
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2 bg-white' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay - ONLY BLURRY BACKGROUND */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] md:hidden"
            style={{
              background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)',
            }}
          >
            {/* Content Container */}
            <div className="flex flex-col items-center justify-center h-full px-6 py-20">

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-12"
              >
                <Link href="/" onClick={closeMenu} className="flex items-center space-x-3">
                  <img
                    src="/navbar-icon.png"
                    alt="Elira Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-3xl font-bold text-white">
                    Elira
                  </span>
                </Link>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center space-y-6 mb-12">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-white text-2xl font-medium hover:text-white/80 transition-colors duration-200 py-3 px-6 inline-block min-h-[44px] cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Auth Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="w-full max-w-xs"
              >
                <Link href={user ? '/dashboard' : '/auth'} onClick={closeMenu} className="cursor-pointer">
                  <Button
                    size="lg"
                    className={`w-full ${
                      user
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-900'
                    } px-8 py-6 text-lg font-medium transition-all duration-200 min-h-[44px] cursor-pointer`}
                  >
                    {user ? 'Irányítópult' : 'Bejelentkezés'}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
