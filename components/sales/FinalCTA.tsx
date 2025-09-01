'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, TrendingDown, TrendingUp, Clock, Target, Trophy, Brain } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

const FinalCTA: React.FC = () => {
  const badChoicePoints = [
    {
      icon: Clock,
      text: "Órákat töltesz szövegírással",
      color: "text-red-400"
    },
    {
      icon: TrendingDown,
      text: "Alacsony konverziókkal küzdesz",
      color: "text-red-400"
    },
    {
      icon: Target,
      text: "Lemaradsz a versenyben",
      color: "text-red-400"
    }
  ];

  const goodChoicePoints = [
    {
      icon: Brain,
      text: "Megtanulod az AI-copywriting titkait",
      color: "text-green-400"
    },
    {
      icon: TrendingUp,
      text: "73%-kal jobb eredményeket érsz el",
      color: "text-green-400"
    },
    {
      icon: Trophy,
      text: "Vezető leszel a piacodon",
      color: "text-green-400"
    },
    {
      icon: Brain,
      text: "Megtanulsz a vevők gondolataiban olvasni",
      color: "text-green-400"
    }
  ];


  const handleFreeVideo = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514', '_blank');
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 mb-8">
              <Phone className="w-6 h-6" />
              <span className="font-bold text-lg">📞 VÉGSŐ DÖNTÉS</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Két <span className="text-teal-400">választásod</span> van:
            </h2>
          </motion.div>

          {/* Two Choices Comparison */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            {/* Bad Choice - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-900/30 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 hover:bg-red-900/40 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-red-300 mb-4">
                    Opció: Folytatod ugyanazt, amit eddig
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {badChoicePoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-red-500/20 rounded-xl border border-red-400/30"
                    >
                      <point.icon className={`w-5 h-5 ${point.color}`} />
                      <span className="text-red-200 font-medium">
                        {point.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Good Choice - Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-900/30 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 hover:bg-green-900/40 transition-all duration-300 relative overflow-hidden">
                {/* Success glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-teal-400/10" />
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-white font-bold text-2xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-300 mb-4">
                      Opció: Csatlakozol hozzánk MOST
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {goodChoicePoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 bg-green-500/20 rounded-xl border border-green-400/30"
                      >
                        <point.icon className={`w-5 h-5 ${point.color}`} />
                        <span className="text-green-200 font-medium">
                          {point.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Final CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Primary CTA */}
            <PurchaseButton 
              courseId="ai-copywriting-course"
              className="w-full"
            />

            {/* Secondary CTA */}
            <motion.button
              onClick={handleFreeVideo}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-white/10 backdrop-blur-xl hover:bg-white/15 text-white border-2 border-white/30 hover:border-white/50 px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 group"
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">🎁</span>
                <span>ELŐSZÖR AZ INGYENES VIDEÓT KÉREM</span>
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            {/* Final Trust Message */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
                <p className="text-white/80 text-lg italic">
                  💭 <span className="font-semibold">Emlékezzél:</span> A legjobb befektetés, amit tehetsz, az önmagadba való befektetés.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;