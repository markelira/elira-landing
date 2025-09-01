'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Search, Heart, Trophy, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ModulesTimeline: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleModule = (moduleNumber: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleNumber)
        ? prev.filter(num => num !== moduleNumber)
        : [...prev, moduleNumber]
    );
  };
  const modules = [
    {
      number: 1,
      title: "Alkoss Hidat Közted és a Vevő Között",
      problem: "A kommunikációdban mindig te vagy a főhős, nem a vevő.",
      solution: "Megtanulod, hogyan találd meg a közös nevezőt a vevőddel",
      benefits: [
        "A copywriting alapjait",
        "Gondolkozni a vevő fejével", 
        "Valós esettanulmányok"
      ],
      icon: Users,
      color: {
        primary: "from-blue-500 to-blue-600",
        light: "from-blue-50 to-blue-100",
        text: "text-blue-700",
        border: "border-blue-200"
      }
    },
    {
      number: 2,
      title: "Pontos Célzás, Biztos Találat",
      problem: "Mindenkit próbálsz megszólítani, de senki sem érzi magáénak",
      solution: "Tökéletesen belőtt célcsoport meghatározás",
      benefits: [
        "Hogyan találj célba a célcsoportodnál",
        "Kulcsszó kutatási MI technikák",
        "Vevői vélemények alapján a vásárlók félelmeinek és motivációinak feltárása MI segítségével"
      ],
      icon: Target,
      color: {
        primary: "from-green-500 to-green-600",
        light: "from-green-50 to-green-100", 
        text: "text-green-700",
        border: "border-green-200"
      }
    },
    {
      number: 3,
      title: "Térképezd Fel a Vevődet Mesterséges intelligenciával",
      problem: "Nem tudod, ki ül a túloldalon",
      solution: "Színvonalas AI technikák a vevőkutatáshoz",
      benefits: [
        "Teljes Buyer Persona kidolgozása 10 perc alatt",
        "Versenytárs analízis automatizálás",
        "Vevői insight feltárás"
      ],
      icon: Search,
      color: {
        primary: "from-purple-500 to-purple-600",
        light: "from-purple-50 to-purple-100",
        text: "text-purple-700", 
        border: "border-purple-200"
      }
    },
    {
      number: 4,
      title: "Érintsd Meg a Szívét, Aztán a Fejét",
      problem: "A vevőd nem figyel, mert nem szólítod meg érzelmileg",
      solution: "Érzelem + Logika egyensúly megteremtése",
      benefits: [
        "Pszichológiai triggerek alkalmazása",
        "Storytelling sablonok", 
        "Konverziós formulák"
      ],
      icon: Heart,
      color: {
        primary: "from-pink-500 to-pink-600",
        light: "from-pink-50 to-pink-100",
        text: "text-pink-700",
        border: "border-pink-200"
      }
    },
    {
      number: 5,
      title: "Használd az AI-t a Győzelemhez",
      problem: "Órákat töltesz feladatokkal, amit az AI percek alatt megoldana",
      solution: "Email marketing AI automatizáció",
      benefits: [
        "Komplett email sorozat generátorok",
        "Facebook Ads copy generátor",
        "Social media poszt sablonok"
      ],
      icon: Trophy,
      color: {
        primary: "from-yellow-500 to-orange-500",
        light: "from-yellow-50 to-orange-100",
        text: "text-orange-700",
        border: "border-orange-200"
      }
    }
  ];

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg mb-8">
              <span className="text-2xl">📚</span>
              <span className="font-bold text-lg">MIT KAPSZ - 5 MODUL RÉSZLETEZÉSE</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Egy utazás, ami <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">átalakítja a munkádat</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Minden modul egy újabb lépés a hatékony AI copywriting felé
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-200 via-cyan-300 to-teal-200 rounded-full hidden md:block" />
            
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-16 last:mb-0"
              >
                {/* Timeline Number */}
                <div className="absolute left-0 md:left-4 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl z-10 border-3 border-white">
                  <span className="text-white font-bold text-lg">{module.number}</span>
                </div>
                
                {/* Module Content Card */}
                <div className="ml-16 md:ml-20">
                  <div className={`bg-gradient-to-br ${module.color.light} rounded-2xl border ${module.color.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                    
                    {/* Module Header - Clickable */}
                    <button
                      onClick={() => toggleModule(module.number)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-2xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`bg-gradient-to-r ${module.color.primary} rounded-xl p-3 shadow-lg`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                            "{module.title}"
                          </h3>
                        </div>
                        <div className="flex items-center">
                          {expandedModules.includes(module.number) ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence>
                      {expandedModules.includes(module.number) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            {/* Problem & Solution */}
                            <div className="grid md:grid-cols-2 gap-5 mb-6">
                              {/* Problem */}
                              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                                <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                                  <span className="text-base">⚠️</span>
                                  A probléma:
                                </h4>
                                <p className="text-red-600 font-medium leading-relaxed text-sm">
                                  {module.problem}
                                </p>
                              </div>
                              
                              {/* Solution */}
                              <div className={`bg-gradient-to-br ${module.color.light} rounded-xl p-5 border ${module.color.border}`}>
                                <h4 className={`font-bold ${module.color.text} mb-2 flex items-center gap-2`}>
                                  <span className="text-base">💡</span>
                                  A megoldás:
                                </h4>
                                <p className={`${module.color.text} font-medium leading-relaxed text-sm`}>
                                  {module.solution}
                                </p>
                              </div>
                            </div>

                            {/* Benefits List */}
                            <div className="space-y-2">
                              <h4 className="font-bold text-gray-900 mb-3 text-base">
                                Mit tanulsz meg:
                              </h4>
                              {module.benefits.map((benefit, benefitIndex) => (
                                <motion.div
                                  key={benefitIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                                  className="flex items-center gap-3 group"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors text-sm">
                                    {benefit}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

export default ModulesTimeline;