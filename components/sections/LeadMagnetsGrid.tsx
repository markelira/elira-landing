'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp } from 'lucide-react';
import { content } from '@/lib/content/hu';
import MagnetShowcase from '@/components/ui/MagnetShowcase';
import EmailCaptureModal from '@/components/modals/EmailCaptureModal';
import useAnalytics from '@/hooks/useAnalytics';

interface Preview {
  thumbnail: string;
  pages: number;
  fileSize: string;
  screenshots: string[];
  sampleContent: string;
}

interface Metadata {
  lastUpdated: string;
}

interface EnhancedMagnet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  benefits: string[];
  preview: Preview;
  metadata: Metadata;
  icon: string;
  gradient: string;
  tags: string[];
  downloadUrl: string;
}

const LeadMagnetsGrid: React.FC = () => {
  const [selectedMagnet, setSelectedMagnet] = useState<EnhancedMagnet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewedMagnets, setViewedMagnets] = useState(new Set<string>());
  const { track } = useAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('lead-magnets');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleMagnetClick = (magnet: EnhancedMagnet) => {
    setSelectedMagnet(magnet);
    setIsModalOpen(true);
    track('magnet_showcase_click', { 
      magnet: magnet.id, 
      title: magnet.title 
    });
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMagnet(null);
  };


  // Track magnet views
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const magnetId = entry.target.getAttribute('data-magnet-id');
            if (magnetId && !viewedMagnets.has(magnetId)) {
              setViewedMagnets(prev => new Set([...prev, magnetId]));
              track('magnet_view', { magnet: magnetId });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const magnetElements = document.querySelectorAll('[data-magnet-id]');
    magnetElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [track, viewedMagnets]);

  // Cast content magnets to enhanced type
  const enhancedMagnets = content.magnets.items as EnhancedMagnet[];

  return (
    <>
      <section id="lead-magnets" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 
                          bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
              <Eye className="w-4 h-4" />
              Részletes előnézet minden PDF-hez
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {content.magnets.title}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.magnets.subtitle}
            </p>
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="text-sm text-gray-500">
                {viewedMagnets.size}/5 anyag megtekintve
              </div>
              <div className="flex gap-1">
                {enhancedMagnets.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      viewedMagnets.size > index ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Magnets Showcase */}
          <div className="max-w-7xl mx-auto space-y-24">
            {enhancedMagnets.map((magnet, index) => (
              <div
                key={magnet.id}
                data-magnet-id={magnet.id}
                className="relative"
              >
                <MagnetShowcase
                  magnet={magnet}
                  onClick={handleMagnetClick}
                  index={index}
                  isReversed={index % 2 === 1}
                />
              </div>
            ))}
          </div>

          {/* Enhanced Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-center mt-24"
          >
            {/* Statistics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {enhancedMagnets.reduce((sum, m) => sum + m.preview.pages, 0)}
                </div>
                <div className="text-sm text-gray-600">Oldal tartalom</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  100%
                </div>
                <div className="text-sm text-gray-600">Ingyenes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">
                  5
                </div>
                <div className="text-sm text-gray-600">PDF anyag</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 
                            backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">
                  💯 Teljesen ingyenes
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 
                            backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">
                  ⚡ Azonnali hozzáférés
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/80 
                            backdrop-blur-sm rounded-full shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">
                  🎓 Egyetemi minőség
                </span>
              </div>
            </div>

            {/* View Completion Tracker */}
            {viewedMagnets.size === enhancedMagnets.length && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 
                         bg-gradient-to-r from-teal-500 to-cyan-500 
                         text-white rounded-full font-semibold shadow-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Gratulálunk! Mind az 5 anyagot megnézted! 🎉
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        magnet={selectedMagnet}
      />

    </>
  );
};

export default LeadMagnetsGrid;