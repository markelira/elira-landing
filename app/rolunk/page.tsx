'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { BookOpen, Wrench, Target, Users, Award } from 'lucide-react';
import Link from 'next/link';
import TestimonialsSection from '@/components/sales/TestimonialsSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
      <FloatingNavbar />
      
      {/* Hero Section - Academic Harvard/Yale Style */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-stone-50 to-amber-50/30" />
        
        {/* Academic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            <pattern id="academic-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="10" cy="10" r="0.5" fill="currentColor"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#academic-grid)" />
          </svg>
        </div>
        
        {/* Elegant Border Frame */}
        <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-8 border border-amber-400/10 rounded pointer-events-none"></div>
        
        <div className="relative z-10 container max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-28">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Academic Header with Decorative Elements */}
            <div className="mb-8 sm:mb-12">
              {/* Decorative Top Line */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-16 sm:w-24"></div>
                <div className="mx-3 sm:mx-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600/60 rounded-full"></div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-16 sm:w-24"></div>
              </div>
              
              {/* Academic Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100/80 border border-amber-300/50 rounded-sm text-xs font-medium tracking-widest text-amber-900 uppercase mb-6 sm:mb-8"
              >
                <span>ELIRA KÖTELESSÉGE</span>
              </motion.div>
              
              {/* Title - Academic Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-6 sm:mb-8 text-slate-900 px-2 sm:px-0"
              >
                <span className="font-serif tracking-tight">
                  Minden magyar számára elérhetővé tesszük<br />
                  az egyetemi oktatást
                </span>
              </motion.h1>
              
              {/* Description - Academic Style */}
              <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6"></div>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-light italic mb-4 sm:mb-6"
                >
                  Anélkül, hogy vissza kellene ülni az iskolapadba
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-slate-700 font-light mb-4 sm:mb-6"
                >
                  <p className="mb-3 font-medium text-slate-900">A célunk:</p>
                  <p className="leading-relaxed">
                    mindenki számára <span className="font-medium text-amber-700">egyenlő esélyt teremteni</span> a karrierfejlődésben, háttérétől függetlenül.
                  </p>
                </motion.div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-6"></div>
              </div>
            </div>
            
            {/* Academic Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center space-y-6"
            >
              <button className="mobile-btn academic-button inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-sm transition-all duration-300 bg-academic-slate-700 text-white border border-academic-slate-800 hover:bg-academic-slate-800 hover:shadow-lg transform hover:-translate-y-1 uppercase tracking-wide w-full sm:w-auto">
                <BookOpen className="w-5 h-5 mr-3" />
                ISMERD MEG A KÜLDETÉSÜNKET
              </button>
            </motion.div>
            
            {/* Bottom Academic Decoration */}
            <div className="flex items-center justify-center mt-12">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-32"></div>
              <div className="mx-6 flex space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-amber-600/40 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Knowledge Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F5' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Academic Section Header */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 mb-4 sm:mb-6 font-serif px-2 sm:px-0">
              A gyakorlati <span className="text-amber-700 font-medium">tudás hiánya</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6 mb-12"></div>
            
            {/* Academic Content Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-4 sm:p-8 shadow-sm max-w-4xl mx-auto">
              <div className="space-y-8 text-left">
                <div className="border-l-3 border-amber-600/50 pl-6">
                  <p className="text-slate-700 leading-relaxed font-light">
                    <span className="font-medium text-amber-700 uppercase tracking-wider text-sm">Felismerés:</span><br />
                    Az egyetemek kiváló elméleti alapokat adnak, de a piaci gyakorlat gyakran más készségeket igényel.
                  </p>
                </div>
                <div className="border-l-3 border-amber-600/50 pl-6">
                  <p className="text-slate-700 leading-relaxed font-light">
                    <span className="font-medium text-amber-700 uppercase tracking-wider text-sm">Kihívás:</span><br />
                    A friss diplomások rendelkeznek tudással, de nem mindig gyakorlati tapasztalattal és alkalmazható készségekkel.
                  </p>
                </div>
                <div className="border-l-3 border-amber-600/50 pl-6">
                  <p className="text-slate-700 leading-relaxed font-light">
                    <span className="font-medium text-amber-700 uppercase tracking-wider text-sm">Megoldás:</span><br />
                    Mi áthidaljuk ezt a szakadékot gyakorlati, alkalmazható képzésekkel.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Academic Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-serif font-light text-slate-900 mb-4">
                Együttműködés, nem verseny
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - University strengths */}
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-700 mb-6">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-serif font-medium text-slate-900">Egyetemi oktatás erősségei</h4>
                </div>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Mély elméleti tudás</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Tudományos módszertan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Kritikai gondolkodás</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Akadémiai hitelesség</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Szisztematikus tanulás</span>
                  </li>
                </ul>
              </div>

              {/* Right - Elira strengths */}
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="flex items-center gap-3 text-amber-700 mb-6">
                  <Wrench className="w-5 h-5" />
                  <h4 className="font-serif font-medium text-slate-900">ELIRA kiegészítő szerepe</h4>
                </div>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Gyakorlati alkalmazás</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Piaci készségek</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Eszközök használata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Valós projektek</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="font-light leading-relaxed">Azonnali használhatóság</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Platform Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50/60 to-stone-50/60 border-y border-amber-200/30">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Academic Section Header */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-6 font-serif">
              Mi egy gyakorlati képző<br />
              <span className="text-amber-700 font-medium">platform vagyunk</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6 mb-12"></div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-8 shadow-sm max-w-3xl mx-auto mb-12">
              <p className="text-slate-700 leading-relaxed font-light italic text-lg">
                Nem helyettesítjük az egyetemeket - gyakorlati készségekkel egészítjük ki őket.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="border-l-3 border-amber-600/50 pl-4">
                  <p className="text-slate-700 leading-relaxed font-light">
                    <span className="font-medium text-amber-700 uppercase tracking-wider text-sm">Hisszük:</span><br />
                    Az elméleti tudás + gyakorlati készségek = <span className="font-medium text-slate-900">piacképes szakember</span>.
                  </p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="border-l-3 border-amber-600/50 pl-4">
                  <p className="text-slate-700 leading-relaxed font-light">
                    <span className="font-medium text-amber-700 uppercase tracking-wider text-sm">Célunk:</span><br />
                    Hogy <span className="font-medium text-slate-900">bárkiből</span> - végzettségtől függetlenül - piacképes szakembert neveljünk <span className="font-medium text-slate-900">bizonyított módszerekkel</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-6 h-6 text-amber-700" />
                <h3 className="text-xl font-serif font-light text-slate-900">Elmélet + Gyakorlat = Siker</h3>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
              <p className="text-slate-700 leading-relaxed font-light text-center">
                <span className="font-medium text-slate-900">Együtt neveljük</span> azokat a szakembereket, akik mind tudják az elméletet, mind alkalmazni is tudják a gyakorlatban.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hogyan született meg a gyakorlati oktatás víziónk */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F8F7F5' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              HOGYAN SZÜLETETT MEG<br />
              <span className="text-teal-600">A GYAKORLATI OKTATÁS VÍZIÓNK</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-gray-700"
            >
              <p>
                <strong className="text-teal-600">2024-ben</strong> felismertük valamit, ami megváltoztatta a látásmódunkat:
              </p>
              <p className="text-blue-600 font-semibold text-lg">
                A legjobb oktatás akkor jön létre, amikor az egyetemi tudást a piaci sikerekkel kombináljuk.
              </p>
              <p className="text-gray-700">
                Nem elég a tudást átadni - bizonyított eredményekkel kell alátámasztani.
              </p>
              <p className="text-gray-700">
                Ezért választottuk azt az utat, hogy <strong>csak olyan oktatókat alkalmazunk, akiknek valós, mérhető sikereik vannak</strong> piacon - és ezt az egyetemi szintű tudással párosítjuk.
              </p>
              <p className="text-gray-700">
                <strong className="text-teal-600">Az ELIRA különlegessége:</strong><br />
                Oktatóink nem csak tanítanak <strong>-élő bizonyítékai</strong> annak, amit tanítanak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-teal-800">A TÖKÉLETES KOMBINÁCIÓ:</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Elméleti alapok:</span>
                  <span className="text-blue-600 font-semibold">Egyetemi szint ✓</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Bizonyított piaci sikerek:</span>
                  <span className="text-teal-600 font-semibold">Oktatóink ✓</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Előzetes végzettség:</span>
                  <span className="text-purple-600 font-semibold">Nem szükséges</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Tanulási idő:</span>
                  <span className="text-green-600 font-semibold">6-12 hét</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Végeredmény:</span>
                  <span className="text-orange-600 font-semibold">Piacképes szakember</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Munkalehetőségek:</span>
                  <span className="text-teal-600 font-semibold">Korlátlan</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* 2030-ra section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50/60 to-stone-50/60 border-y border-amber-200/30">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Academic Section Header */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-6 font-serif">
              2030-ra <span className="text-amber-700 font-medium">elmélet + gyakorlat</span><br />
              lesz az aranystandard
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6 mb-12"></div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-8 shadow-sm max-w-3xl mx-auto mb-12">
              <p className="text-slate-700 leading-relaxed font-light italic text-lg">
                A kérdés nem az, hogy <span className="font-medium text-slate-900">elméletet vagy gyakorlatot</span> tanulj - hanem hogy <span className="font-medium text-slate-900">mindkettőt hogyan kombinálod</span> a legjobbam.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="w-6 h-6 text-amber-700" />
                <h3 className="text-xl font-serif font-light text-slate-900">A jövő a gyakorlati tudásban van</h3>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-8"></div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                  <h4 className="text-lg font-serif font-medium text-slate-900 mb-4">Elmélet + Gyakorlat kombinációval:</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Szilárd elméleti alap + alkalmazható tudás</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Akadémiai hitelesség + piaci releváns készségek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Hosszú távú gondolkodás + azonnali használhatóság</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Tudományos módszer + praktikus megoldások</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                  <h4 className="text-lg font-serif font-medium text-slate-900 mb-4">Csak elmélet vagy csak gyakorlat:</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Hiányos képzettség</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Korlátozott alkalmazhatóság</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Lassabb karrier előrehaladás</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Szűkebb lehetőségek</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-slate-700 leading-relaxed font-light text-center">
                <span className="font-medium text-slate-900">Mi együttműködünk az egyetemekkel, hogy te a lehető legjobban felkészült legyen.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Miért pont mi? section */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F8F7F5' }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Miért pont <span className="text-teal-600">mi?</span>
            </h2>
            <h3 className="text-2xl md:text-3xl text-gray-700 mb-8">
              Két egyetemista, aki megtalálta a hiányzó láncszemt
            </h3>
            
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700">
              <p><strong>Mi nem kritizáljuk az egyetemeket - mi értjük őket.</strong></p>
              <p>
                Az egyetemek fantasztikusak abban, amire létrehozták őket: mély, elméleti tudás átadása.<br />
                <strong className="text-teal-600">DE van egy rés: a gyakorlati alkalmazás hidje.</strong>
              </p>
              <p className="font-semibold text-gray-900">Mi ezt a hidat építjük fel.</p>
            </div>
          </motion.div>

          {/* Founder profiles */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Márk */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-blue-50 rounded-2xl p-4 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
                  <img 
                    src="/mark-profile.jpg" 
                    alt="Márk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">MÁRK</h3>
                  <div className="flex items-center gap-2 text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Miskolci Egyetem</span>
                  </div>
                  <p className="text-gray-600">Kereskedelem & Marketing</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-4xl text-blue-500 mb-4">"</div>
                <p className="text-gray-700 italic mb-4">
                  "A vízióm egy olyan platform létrehozása, ahol a tudás végtelen és mindenki számára elérhető. Az ELIRA egyenlőséget teremt az oktatásban, gyakorlati tudást nyújtva, amit azonnal alkalmazhatsz a piacon.
                </p>
                <p className="text-gray-900 font-semibold">
                  Nem elméletet tanítunk, hanem holnap használható készségeket.
                </p>
                <p className="text-gray-700 italic">
                  Ez a jövő oktatása."
                </p>
              </div>
            </motion.div>

            {/* Áron */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-green-50 rounded-2xl p-4 sm:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-500">
                  <img 
                    src="/אירוע מפיצים ALMA (195 of 470).JPEG" 
                    alt="Áron"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">ÁRON</h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Debreceni Egyetem</span>
                  </div>
                  <p className="text-gray-600">Fogorvosi szak</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-4xl text-green-500 mb-4">"</div>
                <p className="text-gray-700 italic mb-4">
                  "A fogorvosi egyetemen megtanultam, hogy a legnagyobb felelősségünk az emberek segítése - minden döntésünknek az a célja, hogy jobbá tegyük mások életét
                </p>
                <p className="text-gray-900 font-semibold">
                  Ugyanezt az elvét szeretném átvinni az oktatásba: minden kurzust úgy alakítunk ki, hogy ténylegesen segítsen az embereknek fejlődni a karrierjükben.
                </p>
                <p className="text-gray-700 italic">
                  Nem azért csináljuk ezt, mert "jó üzlet", hanem mert látjuk, hogy mennyi tehetséges ember veszíti el a motivációját a rossz oktatási rendszerek miatt. Szeretnénk ezt megváltoztatni."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50/60 to-stone-50/60 border-t border-amber-200/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Academic Section Header */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-6 font-serif">
              Csatlakozz <span className="text-amber-700 font-medium">a gyakorlati oktatáshoz</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6 mb-12"></div>
            
            <div className="grid gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <p className="text-slate-700 font-light leading-relaxed">
                  Van diplomád? <span className="text-green-700 font-medium">Tökéletes!</span><br />
                  Most add hozzá a gyakorlati készségeket is.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <p className="text-slate-700 font-light leading-relaxed">
                  Nincs diplomád? <span className="text-amber-700 font-medium">Semmi baj!</span><br />
                  Nálunk az számít, amit tudsz, mint a papírod színe.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <p className="text-slate-700 font-light leading-relaxed">
                  Egyetemre jársz? <span className="text-blue-700 font-medium">Kiváló!</span><br />
                  Kezdd el a gyakorlati tanulást már most, párhuzamosan.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-6 h-6 text-amber-700" />
                <h3 className="text-xl font-serif font-light text-slate-900">A tökéletes kombináció felé</h3>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-8"></div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                  <h4 className="text-lg font-serif font-medium text-slate-900 mb-4">Egyetemi tudás + ELIRA:</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Szilárd elméleti alap</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">+ Alkalmazható gyakorlati készségek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">= Piacképes szakértelem</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">= Maximális munkalehetőségek</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                  <h4 className="text-lg font-serif font-medium text-slate-900 mb-4">Mit kapsz tőlünk:</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">6-12 hetes gyakorlati képzés</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Alkalmazható készségek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Valós projektek</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="font-light leading-relaxed">Piaci releváns tudás</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link
              href="/courses/ai-copywriting-course"
              className="academic-button inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-sm transition-all duration-300 bg-academic-slate-700 text-white border border-academic-slate-800 hover:bg-academic-slate-800 hover:shadow-lg transform hover:-translate-y-1 uppercase tracking-wide"
            >
              <Target className="w-5 h-5 mr-3" />
              SZERZEK GYAKORLATI TUDÁST!
            </Link>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <span>🔥</span>
                <span className="font-light">Tökéletes kiegészítés az egyetemi tanulmányokhoz</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <span>🛡️</span>
                <span className="font-light">30 napos pénzvisszafizetési garancia</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <span>🤝</span>
                <span className="font-light">Partnerség az akadémiai világgal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}