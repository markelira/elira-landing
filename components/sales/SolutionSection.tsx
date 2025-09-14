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
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-200 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="font-medium text-gray-900">A megoldás</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Itt a megoldás ezekre a problémákra
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ahelyett, hogy tovább veszítenéd az időt és a pénzt, íme az egyetlen kurzus, 
              amire szükséged van a versenyben maradáshoz
            </p>
          </motion.div>

          {/* Solution Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {solutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10"
              >
                {/* Problem (crossed out) */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
                      <span className="text-red-500 text-sm">✗</span>
                    </div>
                    <p className="text-gray-500 line-through text-sm">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium text-sm">Megoldás:</span>
                    </div>
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Course Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl border border-gray-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50"></div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Itt az egyetlen megoldás:
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                "Olvass a vevőid gondolataiban" - Az AI-alapú copywriting kurzus, 
                ami véget vet a lemaradásnak és előnybe hoz a versenyben
              </p>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 mb-2">24 óra</div>
                  <p className="text-gray-600">alatt használhatod</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 mb-2">3x gyorsabb</div>
                  <p className="text-gray-600">szövegírás azonnal</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900 mb-2">0 kockázat</div>
                  <p className="text-gray-600">30 napos garancia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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