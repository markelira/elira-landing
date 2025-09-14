'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, DollarSign, X, AlertTriangle } from 'lucide-react';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';

const ProblemSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openVideoModal = () => {
    setModalOpen(true);
  };
  const painPoints = [
    {
      icon: Clock,
      text: "Órákat töltesz egy-egy szöveg megírásával",
      color: "red"
    },
    {
      icon: Zap,
      text: "Versenytársaid 3x gyorsabban dolgoznak AI-val",
      color: "red"
    },
    {
      icon: DollarSign,
      text: "Rengeteg pénzt hagysz az asztalon rossz szövegek miatt",
      color: "red"
    }
  ];

  const courseProblems = [
    {
      text: "Elavult tartalom (6-12 hónapos késés)",
      color: "red"
    },
    {
      text: "Általános, nem magyar piacra szabott",
      color: "red"
    },
    {
      text: "Nincs valós üzleti háttér",
      color: "red"
    },
    {
      text: "Elméleti, gyakorlatban használhatatlan",
      color: "red"
    }
  ];


  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Subtle warning pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626' fill-opacity='1'%3E%3Cpath d='M20 20L0 0M20 20L40 0M20 20L0 40M20 20L40 40'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-full border border-red-200 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
              <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="text-gray-900 font-medium">A probléma</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
              Nézzük meg őszintén, hol tartasz most:
            </h2>
          </motion.div>

          {/* Main Problems Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column - AI Problems */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white to-red-50/20 rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg hover:border-red-200 transition-all duration-300 relative overflow-hidden group">
                {/* Animated danger indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  Ha nem használod az AI-t a copywritingban:
                </h3>
                
                <div className="space-y-4">
                  {painPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm hover:border-red-200 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {point.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Course Problems */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-white to-red-50/20 rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg hover:border-red-200 transition-all duration-300 relative overflow-hidden group">
                {/* Animated danger indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  A többi platform problémái:
                </h3>
                
                <div className="space-y-4">
                  {courseProblems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm hover:border-red-200 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <span className="text-red-600">🚫</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {problem.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm max-w-3xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Minden elvesztegetett óra, minden alacsony konverzió, minden elszalasztott ügyfel... 
                <span className="font-semibold text-gray-900">pénz, amit soha nem fogsz visszakapni.</span>
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={openVideoModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>🎁</span>
                <span>Válassz egyet az 5 modulból ingyen</span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default ProblemSection;