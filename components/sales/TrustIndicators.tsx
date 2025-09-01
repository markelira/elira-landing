'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, GraduationCap } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Users,
      value: '847',
      label: 'elégedett vállalkozó',
      color: 'text-teal-600'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'értékelés',
      color: 'text-yellow-500'
    },
    {
      icon: TrendingUp,
      value: '73%',
      label: 'átlag konverzió növekedés',
      color: 'text-green-600'
    },
    {
      icon: GraduationCap,
      value: 'Egyetemi',
      label: 'kutatással alátámasztva',
      color: 'text-blue-600'
    }
  ];

  return (
    <section className="relative bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`${indicator.color} mb-3 transform group-hover:scale-110 transition-transform duration-200`}>
                <indicator.icon className="w-8 h-8" />
              </div>
              <div className="font-bold text-2xl md:text-3xl text-gray-900 mb-1">
                {indicator.value}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {indicator.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;