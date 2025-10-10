'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Building2, CheckCircle, LinkedinIcon } from 'lucide-react';
import Image from 'next/image';

const PremiumZoliIntroduction: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: 'linear-gradient(to bottom, #16222F 0%, #1a2836 50%, #16222F 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(20, 184, 166, 0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)'
              }}
            >
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-semibold text-teal-300 text-sm">A kurzus készítője</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ki áll a háttérben?
            </h2>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Megismerheted a szakembert, aki a tudományos kutatás és a gyakorlati tapasztalat ötvözésével hozta létre ezt a rendszert
            </p>
          </motion.div>

          {/* Two Column Grid Layout */}
          <div className="grid lg:grid-cols-[35%_65%] gap-8 lg:gap-12 items-start">

            {/* Left Column - Profile Card */}
            <motion.div
              className="lg:sticky lg:top-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden ring-4 ring-teal-400/30">
                  <Image
                    src="/IMG_5730.JPG"
                    alt="Somosi Zoltán profile picture"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name and Title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Somosi Zoltán
                  </h3>
                  <p className="text-teal-400 font-semibold">
                    Marketing Specialista & Doktorandusz
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-6"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(20, 184, 166, 0.3), transparent)'
                  }}
                />

                {/* Credentials */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(20, 184, 166, 0.15)',
                        border: '1px solid rgba(20, 184, 166, 0.3)'
                      }}
                    >
                      <GraduationCap className="w-4 h-4 text-teal-400" />
                    </div>
                    <span className="text-white/80 text-sm">Miskolci Egyetem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(20, 184, 166, 0.15)',
                        border: '1px solid rgba(20, 184, 166, 0.3)'
                      }}
                    >
                      <Building2 className="w-4 h-4 text-teal-400" />
                    </div>
                    <span className="text-white/80 text-sm">Heureka Group</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/80 text-sm">Több ezer kampány, 8 országban</span>
                  </div>
                </div>

                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com/in/zoltán-somosi-299605226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#0077B5] hover:bg-[#005885] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span>LinkedIn profil</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column - Introduction Content */}
            <div className="space-y-8">

              {/* Engedd meg, hogy bemutatkozzam */}
              <motion.div
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Engedd meg, hogy bemutatkozzam:
                </h2>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  A nevem <span className="font-semibold text-teal-400">Somosi Zoltán</span>, doktorandusz vagyok a <span className="font-semibold text-white">Miskolci Egyetemen</span>, ahol a{' '}
                  <span
                    className="px-2 py-1 rounded font-medium"
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}
                  >
                    mesterséges intelligencia és az online marketing hatékonyságának kapcsolatát kutatom
                  </span>{' '}
                  - vagyis azt, hogy hogyan lehet adatvezérelt módon, pontosan mérni, mi működik és mi nem.
                </p>
              </motion.div>

              {/* Mellettem nem csak elméleteket fogsz hallani */}
              <motion.div
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Mellettem nem csak elméleteket fogsz hallani:
                </h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  <span className="font-semibold text-white">Nap mint nap futtatok kampányokat több százezer felhasználó elérésével</span>, és vezettem már B2B és B2C kampányokat, ahol az e-mail és trigger marketinggel nagyvállalatoknak milliókat kerestem. A <span className="font-semibold text-white">Heureka Groupnál</span> specialistaként dolgoztam, ahol a kreativitás, az adatok és az AI ötvözése hozta a sikereket.
                </p>
              </motion.div>

              {/* Tudom, milyen kételyek lehetnek benned */}
              <motion.div
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: 'rgba(168, 85, 247, 0.1)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  boxShadow: '0 8px 24px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                  Tudom, milyen kételyek lehetnek benned:
                </h3>
                <div className="space-y-4">
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    <span className="font-semibold text-white">"Mi van, ha túl bonyolult lesz?"</span>{' '}
                    <span className="font-semibold text-white">"Mi van, ha ez is csak egy újabb kurzus?"</span>{' '}
                    <span className="font-semibold text-white">"Mi van, ha nem tudom majd a gyakorlatban alkalmazni?"</span>
                  </p>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    Pont ezért építettem fel ezt a képzést úgy, hogy{' '}
                    <span
                      className="px-2 py-1 rounded font-semibold"
                      style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid rgba(34, 197, 94, 0.4)'
                      }}
                    >
                      minden egyes marketing- és copywriting-problémádra valós, azonnal használható megoldást kapj
                    </span>
                    . Amit itt tanulsz, azt másnap már a saját piacodon kamatoztathatod.
                  </p>
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                className="rounded-2xl p-6 lg:p-8"
                style={{
                  background: 'rgba(20, 184, 166, 0.1)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(20, 184, 166, 0.3)',
                  boxShadow: '0 8px 24px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-white text-lg md:text-xl leading-relaxed font-semibold text-center">
                  Ha készen állsz arra, hogy a tudományt, a gyakorlati tapasztalatot és az AI-t ötvözve végre valódi eredményeket érj el a marketingedben, akkor ez a kurzus neked szól.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumZoliIntroduction;
