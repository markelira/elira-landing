'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, GraduationCap, Building2, Users, Microscope } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  const trustFactors = [
    {
      icon: GraduationCap,
      title: "Egyetemi háttér:",
      description: "Miskolci Egyetem doktorandusz",
      emoji: "🎓",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Building2,
      title: "Vállalati tapasztalat:",
      description: "Heureka Group specialista",
      emoji: "💼", 
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Users,
      title: "Valós eredmények:",
      description: "312+ elégedett vállalkozás",
      emoji: "📊",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Microscope,
      title: "Kutatási alap:",
      description: "Tudományosan alátámasztott módszerek",
      emoji: "🔬",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-bold">🔒 GARANCIA ÉS BIZALOM</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Miért bízhatsz bennem?
            </h2>
          </motion.div>

          {/* Trust Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {trustFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 backdrop-saturate-150">
                  
                  {/* Icon and Emoji */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`bg-gradient-to-r ${factor.color} rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <factor.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-lg">{factor.emoji}</span>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {factor.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm font-medium leading-relaxed">
                      {factor.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Guarantee Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl backdrop-saturate-150 max-w-3xl mx-auto mb-8">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-800 text-lg md:text-xl font-semibold italic">
                30 napos elégedettségi garancia — 
                <span className="text-green-700 font-bold"> bár eddig senki sem kérte vissza</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-3 bg-white backdrop-blur-xl hover:bg-gray-50 text-teal-700 border-2 border-teal-200 hover:border-teal-300 px-6 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <span className="text-xl">🎁</span>
                <span>ELŐSZÖR AZ INGYENES VIDEÓT KÉREM</span>
              </motion.a>
              
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-xl">🚀</span>
                  <div className="text-center">
                    <div>CSATLAKOZOM MOST</div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 line-through text-sm">19.990 Ft</span>
                      <span className="text-yellow-300 font-black">9.990 Ft</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;