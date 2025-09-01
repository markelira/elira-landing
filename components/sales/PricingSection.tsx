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
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg mb-8">
              <DollarSign className="w-6 h-6" />
              <span className="font-bold text-lg">💰 FŐ AJÁNLAT</span>
            </div>
          </motion.div>

          {/* Value Calculation Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-200 mb-8"
          >
            
            {/* Value Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-teal-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  A kurzus összes komponensének értéke:
                </h2>
              </div>
            </div>

            {/* Components List with Values */}
            <div className="space-y-4 mb-8">
              {courseComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {component.text}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {component.detail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      {component.value.toLocaleString()} Ft
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Value Calculation */}
            <div className="border-t-2 border-gray-300 pt-6 mb-8">
              <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    Összes érték:
                  </p>
                  <p className="text-gray-600">
                    Ha külön-külön vennéd meg
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {totalValue.toLocaleString()} Ft
                  </p>
                </div>
              </div>
            </div>

            {/* Actual Price */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl shadow-xl"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Te azonban csak ennyit fizetsz:
                </h3>
                <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-2">
                  {actualPrice.toLocaleString()} Ft
                </div>
                <p className="text-green-100 text-lg">
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