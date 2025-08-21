'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MagnetItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  tags: string[];
  downloadUrl: string;
}

interface MagnetCardProps {
  magnet: MagnetItem;
  onClick: (magnet: MagnetItem) => void;
  index: number;
}

const MagnetCard: React.FC<MagnetCardProps> = ({ magnet, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative cursor-pointer"
      onClick={() => onClick(magnet)}
    >
      {/* Gradient border effect */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${magnet.gradient} 
                   rounded-2xl opacity-0 group-hover:opacity-100 
                   transition-all duration-300 blur-sm`}
      />
      
      {/* Main card */}
      <motion.div
        whileHover={{ 
          y: -8,
          scale: 1.02
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        className="relative bg-white rounded-2xl p-8 shadow-xl 
                   group-hover:shadow-2xl transition-all duration-300
                   border border-gray-100 hover:border-gray-200"
      >
        {/* Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-4xl">{magnet.icon}</div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 
                       text-gray-400 group-hover:text-gray-600 
                       transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 
                           group-hover:text-gray-800 transition-colors">
              {magnet.title}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {magnet.subtitle}
            </p>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {magnet.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {magnet.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs font-medium 
                         bg-gray-100 text-gray-700 
                         rounded-full border border-gray-200
                         group-hover:bg-white group-hover:border-gray-300
                         transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover overlay gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${magnet.gradient} 
                     opacity-0 group-hover:opacity-5 
                     rounded-2xl transition-opacity duration-300 pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
};

export default MagnetCard;