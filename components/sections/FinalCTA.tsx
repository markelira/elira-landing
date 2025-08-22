'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Sparkles } from 'lucide-react';
import { content } from '@/lib/content/hu';
import useAnalytics from '@/hooks/useAnalytics';
import { useLeadCount } from '@/hooks/useFirestore';
import PDFSelectorModal from '@/components/modals/PDFSelectorModal';

const FinalCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { trackButton } = useAnalytics();
  const { leadCount } = useLeadCount();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('cta');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const openPDFSelector = () => {
    trackButton('Open PDF Selector', 'final-cta');
    setModalOpen(true);
  };

  // Dynamic count for subtitle - use real lead count
  const dynamicSubtitle = leadCount > 0 
    ? content.finalCta.subtitle.replace('{count}', leadCount.toString())
    : content.finalCta.subtitleNoMembers;

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-cyan-600" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            {content.finalCta.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto"
          >
            {dynamicSubtitle}
          </motion.p>

          {/* PDF Selector CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <motion.button
              onClick={openPDFSelector}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-teal-700 px-12 py-6 rounded-2xl 
                         font-bold text-xl hover:bg-gray-50 
                         transition-all duration-200 shadow-xl hover:shadow-2xl
                         flex items-center space-x-4 mx-auto group"
            >
              <Download className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span>Válaszd ki az anyagokat!</span>
              <Sparkles className="w-6 h-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
            </motion.button>
            
            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/80 text-lg mt-4"
            >
              📋 Jelöld be a PDF-eket és küldjük email-ben
            </motion.p>
          </motion.div>

          {/* Privacy Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm opacity-75 max-w-lg mx-auto"
          >
            {content.finalCta.privacy}
          </motion.p>

          {/* Additional Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mt-12 opacity-75"
          >
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Azonnali hozzáférés</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Nincs rejtett költség</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Bármikor leiratkozhatsz</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* PDF Selector Modal */}
      <PDFSelectorModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default FinalCTA;