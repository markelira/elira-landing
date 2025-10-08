import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function PremiumHeader() {
  const [isMasterclassDropdownOpen, setIsMasterclassDropdownOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full">
      <div 
        className="relative"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)'
        }}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <img 
              src="/navbar-icon.png" 
              alt="Elira Logo" 
              className="w-7 h-7 object-contain"
            />
            <span className="text-xl font-bold text-gray-900">
              Elira
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Díjmentes audit
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              Cégeknek
            </a>
            
            {/* Masterclass Dropdown */}
            <div className="relative masterclass-dropdown">
              <button
                onClick={() => setIsMasterclassDropdownOpen(!isMasterclassDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span>Masterclass</span>
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMasterclassDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 w-80 rounded-2xl shadow-xl border border-white/30 overflow-hidden"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.7) 100%)',
                      backdropFilter: 'blur(25px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(25px) saturate(150%)'
                    }}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">ABOUT</h3>
                          <div className="space-y-3">
                            <a
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
                            </a>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">MORE</h3>
                          <div className="space-y-3">
                            <a
                              href="#"
                              className="block text-gray-700 hover:text-teal-600 transition-colors font-medium"
                              onClick={() => setIsMasterclassDropdownOpen(false)}
                            >
                              Blog
                            </a>
                            <a
                              href="#"
                              className="block text-gray-700 hover:text-teal-600 transition-colors font-medium"
                              onClick={() => setIsMasterclassDropdownOpen(false)}
                            >
                              Help Center
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
        
        <Button 
          size="sm" 
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Bejelentkezés
        </Button>
      </div>
      
      </div>
    </header>
  );
}