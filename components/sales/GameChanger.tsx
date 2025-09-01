'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Brain, TrendingUp, Unlock } from 'lucide-react';

const GameChanger: React.FC = () => {
  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg mb-8">
              <Zap className="w-6 h-6" />
              <span className="font-bold text-lg">🚀 GAME-CHANGER</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Miért lesz ez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Game-Changer</span><br />
              a számodra?
            </h2>
          </motion.div>

          {/* USP Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            
            {/* USP Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Megismered a copywriting kritikus pontjait, miértjeit.
              </p>
            </motion.div>

            {/* USP Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Megtanulod feltérképezni a konkurenciát és olvasol a vevők gondolataiban.
              </p>
            </motion.div>

            {/* USP Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                MI segítségével automatizálod a gondolatolvasást, bármilyen iparágban.
              </p>
            </motion.div>

            {/* USP Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 group md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Olyan szövegeket írsz, amik növelik a láthatóságod és a profitod.
              </p>
            </motion.div>

            {/* USP Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 group md:col-span-2"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Unlock className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                Hátra dőlsz és engeded, hogy a "piszkos munkát" elvégezze a gép!
              </p>
            </motion.div>

          </div>

          {/* Transition Element - Sets up FOMO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-300 max-w-2xl mx-auto">
              <p className="text-gray-700 text-lg font-semibold">
                Ezek mind szuperek... <span className="text-red-600 font-bold">DE van egy probléma:</span>
              </p>
              <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GameChanger;