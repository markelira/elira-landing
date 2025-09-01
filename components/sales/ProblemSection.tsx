'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingDown, Zap, DollarSign, X, AlertTriangle } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      icon: Clock,
      text: "Órákat töltesz egy-egy szöveg megírásával",
      color: "red"
    },
    {
      icon: TrendingDown,
      text: "20-30%-os konverziót érsz el jó esetben", 
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

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'red': return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: 'text-red-600'
      };
      case 'orange': return {
        bg: 'bg-orange-50',
        border: 'border-orange-200', 
        text: 'text-orange-700',
        icon: 'text-orange-600'
      };
      case 'yellow': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        icon: 'text-yellow-600'
      };
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        icon: 'text-gray-600'
      };
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-red-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-red-300/30 mb-8">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-red-200 font-bold text-lg">🔥 A PROBLÉMA</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Nézzük meg őszintén,<br />
              <span className="text-red-400">hol tartasz most:</span>
            </h2>
          </motion.div>

          {/* Main Problems Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            
            {/* Left Column - AI Problems */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Ha nem használod az AI-t a copywritingban:
                </h3>
                
                <div className="space-y-6">
                  {painPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-start gap-4 p-4 rounded-xl border ${getColorClasses(point.color).bg} ${getColorClasses(point.color).border} hover:scale-105 transition-transform duration-200`}
                    >
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <X className={`w-5 h-5 ${getColorClasses(point.color).icon}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${getColorClasses(point.color).text}`}>
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  A többi platform problémái:
                </h3>
                
                <div className="space-y-6">
                  {courseProblems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-start gap-4 p-4 rounded-xl border ${getColorClasses(problem.color).bg} ${getColorClasses(problem.color).border} hover:scale-105 transition-transform duration-200`}
                    >
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <span className="text-2xl">🚫</span>
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${getColorClasses(problem.color).text}`}>
                          {problem.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Emotional Impact Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-300/30 max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  😰 Felismered magad?
                </h4>
                <p className="text-red-100 text-xl leading-relaxed mb-6">
                  Minden elvesztegetett óra, minden alacsony konverzió, minden elszalasztott ügyfel... 
                  <span className="font-bold text-white"> pénz, amit soha nem fogsz visszakapni.</span>
                </p>
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-8">
                  <p className="text-white text-lg font-semibold">
                    🕐 Minden nap, amit vársz = További lemaradás a versenyben
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
                    className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 px-6 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <span className="text-xl">🎁</span>
                    <span>ELŐSZÖR AZ INGYENES VIDEÓT KÉREM</span>
                  </motion.a>
                  
                  <PurchaseButton 
                    courseId="ai-copywriting-course"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;