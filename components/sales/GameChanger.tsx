'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Zap } from 'lucide-react';

const GameChanger: React.FC = () => {
  const roadmapSteps = [
    {
      id: '01',
      title: 'Megértés',
      subtitle: 'Ismerd meg a vevődet',
      description: 'Buyer persona kidolgozása 10 perc alatt MI segítségével, valós adatokból. Piackutatás és trendanalízis automatizálása.',
      duration: '1-2 óra',
      icon: Search,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '02', 
      title: 'Kapcsolat',
      subtitle: 'Alkoss hidat közted és a vevő között',
      description: 'Kommunikáció megfordítása, hogy a vevő azt mondja: "Pont ő kell nekem". Érzelmi copywriting technikák elsajátítása.',
      duration: '2-3 óra',
      icon: Target,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: '03',
      title: 'Automatizálás', 
      subtitle: 'AI praktikus alkalmazások',
      description: 'Social media posztok, email marketing, Facebook hirdetések és SEO tartalom generálása percek alatt. Folyamatos támogatás.',
      duration: 'Folyamatos',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-start mb-16"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
                Gyors út az AI-copywriting elsajátításához
              </h2>
            </div>
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Lépésről lépésre vezető rendszer, amely az alapoktól a szakértői szintig vezet az AI-alapú copywriting világában.
              </p>
            </div>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-300">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
              />
            </div>

            {/* Roadmap Steps */}
            <div className="grid lg:grid-cols-3 gap-8">
              {roadmapSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Number Badge */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center shadow-sm">
                        <step.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <span className="text-sm font-medium text-gray-700">{step.id}</span>
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">
                      {step.subtitle}
                    </h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    <div className="text-xs text-gray-500 font-medium">
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GameChanger;