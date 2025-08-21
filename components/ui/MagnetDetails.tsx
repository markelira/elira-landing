'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';


interface Metadata {
  lastUpdated: string;
}

interface MagnetDetailsProps {
  metadata: Metadata;
  benefits: string[];
  isVisible: boolean;
}

const MagnetDetails: React.FC<MagnetDetailsProps> = ({
  metadata,
  benefits,
  isVisible
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={isVisible ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className="pt-6 space-y-6">
        
        {/* Last Updated */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 p-3 bg-gradient-to-br from-purple-50 to-purple-100 
                     rounded-xl border border-purple-200"
          >
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-700">
              Utoljára frissítve: <strong>{metadata.lastUpdated}</strong>
            </span>
          </motion.div>
        </div>

        {/* Enhanced Benefits */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Check className="w-5 h-5 text-teal-600" />
            Részletes tartalomjegyzék:
          </h4>
          
          <div className="grid gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white rounded-lg 
                         border border-gray-100 hover:border-teal-200 
                         hover:shadow-sm transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center 
                              justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-teal-600">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-700 flex-1">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Azonnal letölthető</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500" />
            <span>Email-ben megkapod</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000" />
            <span>100% ingyenes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MagnetDetails;