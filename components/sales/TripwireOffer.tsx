'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Users, Target, Search, Heart, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

const TripwireOffer: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet",
      preview: "A kommunikációdban mindig te vagy a főhős, nem a vevő. És amíg így van, ő nem fogja meglátni, hogy te vagy az, aki elvezetheti a céljaihoz. Találd meg a közös nevezőt a vevőddel, és tarold le a piacot!",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      title: "Pontos célzás, biztos találat találj célba a célcsoportodnál", 
      preview: "Te is mindenkit próbálsz megszólítani, de végül senki sem érzi, hogy róla szól a mondandód. Ezért nem kapsz visszajelzést, nem jönnek a vásárlók, és a kampányaid üresek maradnak. Lődd be tökéletesen a célcsoportodat, és találj célba minden alkalommal!",
      icon: Target,
      color: "from-green-500 to-green-600"
    },
    {
      number: 3,
      title: "Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!",
      preview: "Amíg nem tudod, ki ül a túloldalon, addig minden szavad mellémegy. És közben lassan elúszik előled a piac. Találd meg a vevőidet ezzekkel a színvonalas AI technikákkal!",
      icon: Search,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 4,
      title: "Érintsd Meg a Szívét, Aztán a Fejét",
      preview: "Pszichológiai triggerek alkalmazása",
      icon: Heart,
      color: "from-pink-500 to-pink-600"
    },
    {
      number: 5,
      title: "Használd az AI-t a Győzelemhez",
      preview: "Email sorozat generátor élő bemutatóval",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const handleModuleSelect = (moduleNumber: number) => {
    setSelectedModule(moduleNumber);
  };

  const handleGetFreeVideo = () => {
    if (selectedModule) {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfRJ-hWzGa1qxZ7luJr_en2Pk1_O4SrKaCyliiShfSHEg87VA/viewform?usp=sharing&ouid=113299212479349141514', '_blank');
    }
  };

  return (
    <section id="tripwire" className="relative py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30 mb-8">
              <Gift className="w-6 h-6" />
              <span className="font-bold text-lg">🎁 INGYENES VIDEÓ AJÁNLAT</span>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Csak egy dolgot kérek Tőled:
              <br />
              <span className="text-teal-200">ne vedd meg, előbb nézz bele ingyen.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white text-xl md:text-2xl font-semibold"
            >
              Válaszd ki, melyik téma érdekel a legjobban, és <span className="bg-white/20 px-3 py-1 rounded-lg">INGYEN</span> megkapod:
            </motion.p>
          </motion.div>

          {/* Module Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid gap-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleModuleSelect(module.number)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedModule === module.number 
                      ? 'transform scale-105' 
                      : 'hover:scale-102'
                  }`}
                >
                  <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedModule === module.number 
                      ? 'border-yellow-400 shadow-2xl bg-white' 
                      : 'border-white/30 hover:border-white/50 shadow-lg'
                  }`}>
                    <div className="flex items-center gap-4">
                      {/* Selection Indicator */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        selectedModule === module.number
                          ? 'border-yellow-400 bg-yellow-400'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {selectedModule === module.number && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      {/* Module Icon */}
                      <div className={`bg-gradient-to-r ${module.color} rounded-xl p-3 shadow-lg`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Module Info */}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                          MODUL {module.number}: {module.title}
                        </h4>
                        <p className="text-gray-600">
                          {module.preview}
                        </p>
                      </div>
                      
                      {/* Module Number Badge */}
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                        {module.number}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={handleGetFreeVideo}
              disabled={!selectedModule}
              whileHover={selectedModule ? { scale: 1.05, y: -3 } : {}}
              whileTap={selectedModule ? { scale: 0.95 } : {}}
              className={`px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 mx-auto relative overflow-hidden ${
                selectedModule 
                  ? 'bg-white text-teal-700 hover:bg-gray-50 hover:shadow-3xl cursor-pointer' 
                  : 'bg-white/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedModule && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
              )}
              
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>
                  {selectedModule 
                    ? `IGEN, KÉREM A ${selectedModule}. MODULT INGYEN!`
                    : 'VÁLASSZ EGY MODULT ELŐSZÖR'
                  }
                </span>
              </span>
              {selectedModule && (
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              )}
            </motion.button>

            {/* Selection Hint */}
            {!selectedModule && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-teal-100 text-sm mt-4 italic"
              >
                ☝️ Kattints egy modulra a fenti listából
              </motion.p>
            )}

            {/* Trust Message */}
            {selectedModule && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6"
              >
                <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md text-green-100 px-4 py-2 rounded-full border border-green-300/30">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold text-sm">
                    Azonnali hozzáférés, nincs rejtett költség
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Course Player Demo Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 pt-6 border-t border-white/20"
          >
            <p className="text-white/80 text-sm mb-4">
              Vagy nézd meg a kurzus lejátszó előnézetét:
            </p>
            <Link
              href="/course-player"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <CheckCircle className="w-5 h-5" />
              <span>🎬 Kurzus lejátszó előnézet</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TripwireOffer;