'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, ArrowRight, Gift, Zap, Calculator } from 'lucide-react';
import PurchaseButton from '../course/PurchaseButton';

const PricingSection: React.FC = () => {
  const courseComponents = [
    {
      text: "5 modul, 17 videó (56 perc)",
      detail: "Strukturált tananyag videó formátumban",
      value: 8000,
      icon: CheckCircle
    },
    {
      text: "7 AI generátor PDF",
      detail: "Blogposzt, Email, Facebook Ads, Buyer Persona, stb.",
      value: 5000,
      icon: CheckCircle
    },
    {
      text: "Gyakorlati AI prompt sablonok",
      detail: "Azonnal használható copywriting promptok",
      value: 3000,
      icon: CheckCircle
    },
    {
      text: "Doktorandusz oktató szakértelem",
      detail: "Tudományos háttér + gyakorlati tapasztalat",
      value: 12000,
      icon: CheckCircle
    },
    {
      text: "Magyar piacra szabott tartalom",
      detail: "Helyi piaci sajátosságokra optimalizált",
      value: 4000,
      icon: CheckCircle
    }
  ];

  const totalValue = courseComponents.reduce((sum, component) => sum + component.value, 0);
  const actualPrice = 9990;

  const courseData = {
    id: 'ai-copywriting-course',
    title: 'AI-alapú piac-kutatásos copywriting',
    price: actualPrice,
    currency: 'HUF'
  };

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Money flow animation */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='80' cy='80' r='1'/%3E%3Ccircle cx='20' cy='80' r='1'/%3E%3Ccircle cx='80' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 sm:px-4 py-2 rounded-full border border-green-200 shadow-sm mb-4 sm:mb-6 hover:shadow-md transition-all duration-300">
              <DollarSign className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="font-medium text-gray-900">Fő ajánlat</span>
            </div>
          </motion.div>

          {/* Value Calculation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 mb-6 sm:mb-8 relative overflow-hidden"
          >
            {/* Value stack shimmer effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 animate-pulse"></div>
            
            {/* Value Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 text-center">
                  A kurzus összes komponensének értéke:
                </h2>
              </div>
            </div>

            {/* Components List with Values */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {courseComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-green-200 hover:bg-green-50/30 transition-all duration-300 group gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm sm:text-base">
                        {component.text}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {component.detail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right sm:text-right flex-shrink-0">
                    <p className="font-bold text-base sm:text-lg text-gray-900">
                      {component.value.toLocaleString()} Ft
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Value Calculation */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Összes érték:
                  </p>
                  <p className="text-gray-600 text-sm">
                    Ha külön-külön vennéd meg
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {totalValue.toLocaleString()} Ft
                  </p>
                </div>
              </div>
            </div>

            {/* Actual Price */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white via-green-50/20 to-white border-2 border-green-300 p-6 rounded-lg shadow-lg relative overflow-hidden"
              >
                {/* Animated savings badge */}
                <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  -69%
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Te azonban csak ennyit fizetsz:
                </h3>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {actualPrice.toLocaleString()} Ft
                </div>
                <p className="text-gray-600">
                  Egyszerű, átlátható árképzés
                </p>
              </motion.div>
            </div>

            {/* Purchase CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <PurchaseButton
                course={courseData}
                className="transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              />

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-green-500" />
                  <span>30 napos garancia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Azonnali hozzáférés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lifetime updates</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;