'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// Mock data - replace with actual API call
const masterclassok = [
  {
    id: '1',
    title: 'Marketing Kampány Építés Masterclass',
    description: 'Teljes kampányrendszer felépítése A-Z-ig: stratégia, tartalom, mérés, optimalizálás',
    duration: 480, // minutes (8 hours)
    modulesCount: 12,
    lessonsCount: 45,
    templatesCount: 18,
    price: 149000,
    thumbnailUrl: '/data-analytics.gif',
    difficulty: 'INTERMEDIATE',
    enrollmentCount: 89,
    averageRating: 4.9,
    totalReviews: 34,
    features: ['Komplett rendszer', 'Dokumentált folyamatok', 'Opcionális konzultáció']
  },
  {
    id: '2',
    title: 'Értékesítési Folyamat Optimalizálás',
    description: 'Működő sales funnel építése, CRM integráció, csapat összehangolása',
    duration: 420, // minutes (7 hours)
    modulesCount: 10,
    lessonsCount: 38,
    templatesCount: 15,
    price: 179000,
    thumbnailUrl: '/workspace-systems.png',
    difficulty: 'INTERMEDIATE',
    enrollmentCount: 67,
    averageRating: 4.8,
    totalReviews: 21,
    features: ['Sales funnel sablonok', 'CRM beállítás', 'Csapat training']
  },
  {
    id: '3',
    title: 'AI Tartalom Termelés Masterclass',
    description: 'AI eszközök bevezetése, workflow automatizálás, minőségbiztosítás',
    duration: 360, // minutes (6 hours)
    modulesCount: 9,
    lessonsCount: 32,
    templatesCount: 20,
    price: 199000,
    thumbnailUrl: '/nicholasycmo_A_split-vision_workspace_at_the_top_colorful_mind__3445c407-9c40-4f06-8a54-67c21f58d21b.png',
    difficulty: 'ADVANCED',
    enrollmentCount: 124,
    averageRating: 4.9,
    totalReviews: 45,
    features: ['AI workflow sablonok', 'Prompt library', 'Minőség checklist']
  }
];

export function MasterclassokSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} óra`;
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
            <span className="text-purple-700 text-sm font-medium">Kisvállalati Masterclassok</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
            4-8 órás masterclassok komplett rendszerekhez
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Teljes működő rendszerek felépítése videós oktatással, sablonokkal és opcionális közös implementációval.
          </p>
        </motion.div>

        {/* Masterclass Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masterclassok.map((masterclass, index) => (
            <motion.div
              key={masterclass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="bg-white border-l-4 border-purple-600 border-t border-r border-b border-gray-200 rounded-r-lg overflow-hidden hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={masterclass.thumbnailUrl}
                    alt={masterclass.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {formatDuration(masterclass.duration)}
                  </div>
                  {/* Difficulty Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                    Masterclass
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Stats Row */}
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{masterclass.modulesCount} modul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{masterclass.templatesCount} sablon</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                    {masterclass.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                    {masterclass.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    {masterclass.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating & Enrollment */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{masterclass.averageRating}</span>
                      <span>({masterclass.totalReviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{masterclass.enrollmentCount} tanuló</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{masterclass.price.toLocaleString('hu-HU')} Ft</span>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors">
                      Részletek
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all">
            Összes masterclass megtekintése
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
