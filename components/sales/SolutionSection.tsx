'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Target, Clock, TrendingUp, Shield, Sparkles } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

const SolutionSection: React.FC = () => {
  const solutions = [
    {
      problem: "47%-kal lassabban dolgozol",
      solution: "3x gyorsabb copywriting AI sablonokkal",
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      problem: "Versenytársaid elviszik ügyfeleid",
      solution: "Te leszel aki megelőzi őket modern technikákkal",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      problem: "Órákat töltesz szövegírással",
      solution: "10 perc alatt kész, profi szövegek",
      icon: Clock,
      color: "from-purple-500 to-violet-500"
    },
    {
      problem: "Elveszted a profitod rossz szövegek miatt",
      solution: "Magasabb konverziós szövegek garantáltan",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
      {/* Healing Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-transparent to-blue-100/30" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Powerful Solution Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-lg mb-8">
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-xl">✅ A MEGOLDÁS</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              STOP!<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Itt a megoldás</span><br />
              ezekre a problémákra
            </h2>
            
            <p className="text-xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Ahelyett, hogy tovább veszítenéd az időt és a pénzt, íme az egyetlen kurzus, 
              amire szükséged van a versenyben maradáshoz
            </p>
          </motion.div>

          {/* Solution Cards - Direct Problem/Solution Pairs */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {solutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                {/* Problem (crossed out) */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-lg font-bold">✗</span>
                    </div>
                    <p className="text-gray-500 line-through font-medium">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* Solution (highlighted) */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-bold text-sm">MEGOLDÁS:</span>
                    </div>
                    <p className="text-gray-900 font-bold text-lg leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Animated success indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            ))}
          </div>

          {/* The Answer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
              
              {/* Success Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }} />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  🎯 Itt az egyetlen megoldás:
                </h3>
                
                <p className="text-xl md:text-2xl font-bold text-green-100 leading-relaxed mb-8">
                  "Olvass a vevőid gondolataiban" - Az AI-alapú copywriting kurzus, 
                  ami <span className="text-yellow-300 font-black">véget vet a lemaradásnak </span> 
                  és <span className="text-yellow-300 font-black">előnybe hoz a versenyben</span>
                </p>

                {/* Immediate Benefits */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-300 mb-2">24 óra</div>
                    <p className="text-green-100">alatt használhatod</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-300 mb-2">3x gyorsabb</div>
                    <p className="text-green-100">szövegírás azonnal</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-300 mb-2">0 kockázat</div>
                    <p className="text-green-100">30 napos garancia</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Urgency CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <PurchaseButton 
              courseId="ai-copywriting-course"
            />
            
            <p className="text-gray-600 text-sm mt-4">
              Minden perccel jobban lemaradsz. Ne várj tovább.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SolutionSection;