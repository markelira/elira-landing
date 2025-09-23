'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Repeat, AlertTriangle } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';

const NeedEstablishment: React.FC = () => {
  const revenueWays = [
    {
      icon: Users,
      text: "Több vásárlót szerezni",
      description: "Több érdeklődőt meggyőzni arról, hogy vásároljanak tőled - javítani a konverziós rátádat."
    },
    {
      icon: TrendingUp,
      text: "Növelni az átlagos vásárlási értéket",
      description: "Minden egyes vásárló többet költsön egyetlen tranzakció során - drágább verzió, kiegészítő termékek, vagy csomagajánlatok eladása. Egy vásárlás = több pénz."
    },
    {
      icon: Repeat,
      text: "Rávenni őket, hogy többször vásároljanak",
      description: "Meglévő ügyfeleket visszahozni és gyakrabban vásároltatni velük. Az egyszeri vásárló visszatérő ügyféllé válik."
    }
  ];

  const keyRequirements = [
    {
      text: "Több vásárlót csak akkor szerzel, ha tudod, mit akarnak és hol találod őket",
      icon: "🎯"
    },
    {
      text: "Magasabb árat csak akkor tudsz kérni, ha tudod, mi az értékes nekik",
      icon: "💰"
    },
    {
      text: "Többször vásárolnak csak akkor, ha tudod, mikor és mit akarnak legközelebb",
      icon: "🔄"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-teal-50 px-4 py-2 rounded-full border border-green-200 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-gray-900 font-medium">Az igazság a bevételnövelésről</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
              3 módja van annak, hogy többet keress:
            </h2>
          </motion.div>

          {/* Three Ways to Earn More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {revenueWays.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg hover:border-green-200 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-xl font-bold text-green-600">{index + 1}.</span>
                  </div>
                  <way.icon className="w-6 h-6 text-green-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {way.text}
                </h3>
                <p className="text-gray-600 text-sm">
                  {way.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-xl font-semibold text-gray-900">
                Ennyi. Nincs 4. módszer.
              </p>
            </div>
          </motion.div>

          {/* The Problem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-white to-orange-50/20 rounded-xl border border-orange-200 p-8 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center shadow-sm">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  De van egy probléma...
                </h3>
              </div>
              
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                Mind a 3 módszer egyetlen dolgon múlik: <span className="font-semibold text-orange-700">mennyire ismered a vevődet.</span>
              </p>

              <div className="space-y-4">
                {keyRequirements.map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm hover:border-orange-200 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{requirement.icon}</span>
                    </div>
                    <p className="font-medium text-gray-800 flex-1">
                      {requirement.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* The Reality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 mb-12"
          >
            {/* What Most Do */}
            <div className="bg-gradient-to-br from-white to-red-50/20 rounded-xl border border-red-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                A legtöbb vállalkozó találgatja. Ezért bukik el.
              </h4>
              
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <h5 className="font-semibold text-red-800 mb-2">Amit a legtöbben csinálnak:</h5>
                  <p className="text-red-700">Termékfókuszú gondolkodás</p>
                  <p className="text-red-600 text-sm italic">"Milyen új terméket fejlesszek?"</p>
                </div>
              </div>
            </div>

            {/* What A.I.M. Teaches */}
            <div className="bg-gradient-to-br from-white to-green-50/20 rounded-xl border border-green-200 p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Itt A Különbség:
              </h4>
              
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h5 className="font-semibold text-green-800 mb-2">Amit a masterclassban tanulsz:</h5>
                  <p className="text-green-700">Vevőfókuszú gondolkodás</p>
                  <p className="text-green-600 text-sm italic">"Mit akar valójában a vevőm, és hogyan adom meg neki?"</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Truth - Final CTA Setup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-xl border border-teal-200 p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Az igazság:
              </h3>
              
              <div className="space-y-4 text-lg text-gray-800 leading-relaxed">
                <p>
                  Ha ismered a vevőd gondolatait, <span className="font-semibold text-teal-700">nem kell kitalálnod, mit csinálj.</span>
                </p>
                <p className="font-medium">
                  Ő megmondja neked.
                </p>
                <p className="text-xl font-semibold text-teal-800 bg-teal-50 rounded-lg p-4 border border-teal-200">
                  A vevőpszichológia az egyetlen skill, ami mind a 3 bevételnövelési módszert egyszerre javítja.
                </p>
                <p className="text-lg font-medium text-gray-900">
                  Most megtanulhatod, hogyan.
                </p>
              </div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                viewport={{ once: true }}
                className="mt-8 pt-6 border-t border-teal-200"
              >
                <PurchaseButton 
                  courseId="ai-copywriting-course"
                  className="bg-transparent border-2 border-teal-700 hover:border-teal-800 text-teal-700 hover:text-teal-800 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default NeedEstablishment;