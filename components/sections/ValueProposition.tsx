'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Rocket } from 'lucide-react';
import { content } from '@/lib/content/hu';

const iconMap = {
  sparkles: Sparkles,
  award: Award,
  rocket: Rocket,
};

const ValueProposition: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const element = document.getElementById('value');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="value" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            {content.value.title}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {content.value.subtitle}
          </motion.p>
        </motion.div>

        {/* Value Points Grid */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {content.value.points.map((point, index) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                           transition-all duration-300 border border-gray-100 
                           hover:border-gray-200 group cursor-default"
              >
                {/* Icon with gradient background */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 
                                  rounded-2xl flex items-center justify-center 
                                  group-hover:scale-110 transition-transform duration-300
                                  shadow-lg group-hover:shadow-xl">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 
                               group-hover:text-gray-800 transition-colors">
                  {point.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 
                               opacity-0 group-hover:opacity-100 rounded-2xl 
                               transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                         from-teal-50 to-cyan-50 rounded-full border border-teal-100">
            <Sparkles className="w-5 h-5 text-teal-700 mr-2" />
            <span className="text-sm font-medium text-teal-900">
              Valódi értéket teremtünk, nem csak ígérünk
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;