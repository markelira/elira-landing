'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Download, Zap } from 'lucide-react';
import { useSocialProof } from '@/hooks/useFirestore';
import ActivityFeed from '@/components/ui/ActivityFeed';
import { content } from '@/lib/content/hu';

const CommunityProof: React.FC = () => {
  const { totalDownloads, recentActivity } = useSocialProof();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {content.social.title}
          </h2>

          {/* Trust badges */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Ahol a fejlődés sosem áll meg, és a siker garantált
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main stats card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              
              {/* Total Downloads - Single card, full width */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center justify-center mb-4">
                  <Download className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-900 mb-2">
                  {totalDownloads || 0}
                </div>
                <div className="text-lg text-green-700 mb-4">
                  Letöltés összesen
                </div>
                
                {/* Growth indicator */}
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">
                    Minden letöltés valós adatok alapján
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Value proposition */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">
                🎯 Miért válassz minket?
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>Azonnal alkalmazható tudás</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>Aktív közösség és támogatás</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span>100% ingyenes, nincs rejtett költség</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Activity Feed Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Activity feed card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <ActivityFeed maxItems={8} />
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">
                Csatlakozz te is! 🚀
              </h3>
              <p className="text-purple-100 mb-4 text-sm">
                Minden héten új anyagokkal és frissítésekkel várunk.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('lead-magnets');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Ingyenes Anyagok Megtekintése
              </motion.button>

              <p className="text-xs text-purple-200 mt-3">
                ✅ Azonnali hozzáférés • ✅ Nincs spam • ✅ 100% ingyenes
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityProof;