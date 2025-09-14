'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gift, Users, Target, Search, Heart, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';

const TripwireOffer: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      setModalOpen(true);
    }
  };

  return (
    <section id="tripwire" className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 rounded-full border border-teal-200 shadow-sm mb-8 hover:shadow-md transition-all duration-300">
              <Gift className="w-5 h-5 text-teal-600 animate-pulse" />
              <span className="font-medium text-gray-900">🎁 Ingyenes videó ajánlat</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 leading-tight">
              Csak egy dolgot kérek Tőled:
              <br />
              <span className="text-teal-600">mielőtt megvennéd, előbb nézz bele ingyen.</span>
            </h2>
            
            <p className="text-gray-700 text-lg">
              Válaszd ki, melyik téma érdekel a legjobban, és <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded font-semibold">INGYEN</span> megkapod:
            </p>
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
                  <div className={`rounded-xl p-6 border-2 transition-all duration-300 relative overflow-hidden ${
                    selectedModule === module.number 
                      ? 'border-teal-400 shadow-xl bg-gradient-to-r from-teal-50 to-cyan-50' 
                      : 'bg-white border-gray-200 hover:border-teal-300 shadow-sm hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-white'
                  }`}>
                    {/* Hover accent line */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 transform transition-transform duration-500 ${
                      selectedModule === module.number ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></div>
                    <div className="flex items-center gap-4">
                      {/* Selection Indicator */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        selectedModule === module.number
                          ? 'border-teal-500 bg-teal-500'
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
              className={`px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-4 mx-auto relative overflow-hidden ${
                selectedModule 
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl cursor-pointer' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
                className="text-gray-600 text-sm mt-4 italic"
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
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-sm">
                    Azonnali hozzáférés, nincs rejtett költség
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>


        </div>
      </div>
      
      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default TripwireOffer;