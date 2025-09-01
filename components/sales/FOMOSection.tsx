'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, Clock } from 'lucide-react';

const FOMOSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-red-900 via-red-800 to-black overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
            animation: 'pulse 4s ease-in-out infinite'
          }} />
        </div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -skew-x-12 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              Miközben te ezt olvasod:
            </h2>
          </motion.div>

          {/* Real-time Stats */}
          <div className="space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-2xl p-6 hover:bg-red-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-red-900" />
              </div>
              <p className="text-white text-lg md:text-xl font-bold">
                ⚡ 3 versenytársad már AI-al ír szövegeket
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-2xl p-6 hover:bg-red-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-6 h-6 text-red-900" />
              </div>
              <p className="text-white text-lg md:text-xl font-bold">
                ⚡ 2 percenként valaki a piacodon bevezeti az AI-t
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-2xl p-6 hover:bg-red-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <TrendingDown className="w-6 h-6 text-red-900" />
              </div>
              <p className="text-white text-lg md:text-xl font-bold">
                ⚡ 47%-kal gyorsabban dolgoznak, mint te
              </p>
            </motion.div>
          </div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-black/60 backdrop-blur-xl border border-red-500/50 rounded-3xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-6 text-center">
                EREDMÉNY:
              </h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white text-lg font-semibold"
                >
                  <span className="text-red-400 text-xl">→</span>
                  <span>Ők kapják a te ügyfeleidet</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white text-lg font-semibold"
                >
                  <span className="text-red-400 text-xl">→</span>
                  <span>Ők viszik el a te profitod</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white text-lg font-semibold"
                >
                  <span className="text-red-400 text-xl">→</span>
                  <span>Te maradsz le véglegesen</span>
                </motion.div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
};

export default FOMOSection;