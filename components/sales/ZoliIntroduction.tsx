'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, CheckCircle, Lightbulb, LinkedinIcon } from 'lucide-react';

const ZoliIntroduction: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#F8F7F5' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Lightbulb className="w-5 h-5 text-teal-600 animate-pulse" />
              <span className="font-medium text-gray-900">A kurzus készítője</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Ki áll a háttérben?
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Megismerheted a szakembert, aki a tudományos kutatás és a gyakorlati tapasztalat ötvözésével hozta létre ezt a rendszert
            </p>
          </motion.div>
          
          {/* Two Column Grid Layout - 30/70 split */}
          <div className="grid lg:grid-cols-[30%_70%] gap-12 items-start">
            
            {/* Left Column - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-8"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full shadow-xl overflow-hidden border-4 border-white">
                  <img 
                    src="/IMG_5730.JPG" 
                    alt="Somosi Zoltán profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name and Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Somosi Zoltán
                  </h3>
                  <p className="text-teal-700 font-semibold">
                    Marketing Specialista & Doktorandusz
                  </p>
                </div>
                
                {/* Credentials */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700 text-sm">Miskolci Egyetem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700 text-sm">Heureka Group</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 text-sm">Több ezer kampány, 8 országban</span>
                  </div>
                </div>
                
                {/* LinkedIn Profile Link */}
                <div className="mt-6 pt-6 border-t border-teal-200">
                  <a 
                    href="https://linkedin.com/in/zoltán-somosi-299605226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#0077B5] hover:bg-[#005885] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Introduction Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              
              {/* Engedd meg, hogy bemutatkozzam */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Engedd meg, hogy bemutatkozzam:
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  A nevem <span className="font-semibold text-teal-700">Somosi Zoltán</span>, doktorandusz vagyok a <span className="font-semibold">Miskolci Egyetemen</span>, ahol a <span className="bg-yellow-100 px-2 py-1 rounded">mesterséges intelligencia és az online marketing hatékonyságának kapcsolatát kutatom</span> - vagyis azt, hogy hogyan lehet adatvezérelt módon, pontosan mérni, mi működik és mi nem.
                </p>
              </div>

              {/* Mellettem nem csak elméleteket fogsz hallani */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Mellettem nem csak elméleteket fogsz hallani:
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  <span className="font-semibold text-gray-900">Nap mint nap futtatok kampányokat több százezer felhasználó elérésével</span>, és vezettem már B2B és B2C kampányokat, ahol az e-mail és trigger marketinggel nagyvállalatoknak milliókat kerestem. A <span className="font-semibold">Heureka Groupnál</span> specialistaként dolgoztam, ahol a kreativitás, az adatok és az AI ötvözése hozta a sikereket.
                </p>
              </div>

              {/* Tudom, milyen kételyek lehetnek benned */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Tudom, milyen kételyek lehetnek benned:
                </h3>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-gray-900">"Mi van, ha túl bonyolult lesz?"</span> <span className="font-semibold text-gray-900">"Mi van, ha ez is csak egy újabb kurzus?"</span> <span className="font-semibold text-gray-900">"Mi van, ha nem tudom majd a gyakorlatban alkalmazni?"</span>
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Pont ezért építettem fel ezt a képzést úgy, hogy <span className="bg-green-100 px-2 py-1 rounded">minden egyes marketing- és copywriting-problémádra valós, azonnal használható megoldást kapj</span>. Amit itt tanulsz, azt másnap már a saját piacodon kamatoztathatod.
                  </p>
                </div>
              </div>

              {/* Closing Statement */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-700 text-lg leading-relaxed font-semibold">
                  Ha készen állsz arra, hogy a tudományt, a gyakorlati tapasztalatot és az AI-t ötvözve végre valódi eredményeket érj el a marketingedben, akkor ez a kurzus neked szól.
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZoliIntroduction;