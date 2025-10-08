'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// Mock data - replace with actual API call
const mikrokurzusok = [
  {
    id: '1',
    title: 'Vevői profil készítés 10 perc alatt',
    description: 'Azonnal használható buyer persona framework adatokkal',
    duration: 45, // minutes
    price: 9990,
    thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
    difficulty: 'BEGINNER',
    enrollmentCount: 127,
    averageRating: 4.8,
    totalReviews: 23
  },
  {
    id: '2',
    title: 'Konkurencia elemzés lépésről-lépésre',
    description: 'Feltárd a gyengeségeiket és reagálj azonnal',
    duration: 60,
    price: 14990,
    thumbnailUrl: '/dashboard-3d.png',
    difficulty: 'BEGINNER',
    enrollmentCount: 98,
    averageRating: 4.9,
    totalReviews: 18
  },
  {
    id: '3',
    title: 'Értékesítési szövegek megírása',
    description: 'Olvass a vevőid gondolataiban - olyan copy ami elad',
    duration: 75,
    price: 19990,
    thumbnailUrl: '/email-marketing.png',
    difficulty: 'INTERMEDIATE',
    enrollmentCount: 156,
    averageRating: 4.7,
    totalReviews: 31
  }
];

export function MikrokurzusokSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-blue-700 text-sm font-medium">Startup Mikrokurzusok</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
            30-90 perces mikrokurzusok konkrét problémákra
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Senior szakértő tudása egyetlen konkrét problémára - lépésről-lépésre útmutatóval és azonnal használható sablonokkal.
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mikrokurzusok.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {course.duration} perc
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Difficulty Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      {course.difficulty === 'BEGINNER' ? 'Kezdő' : 'Középhaladó'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{course.averageRating}</span>
                      <span>({course.totalReviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{course.enrollmentCount} tanuló</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{course.price.toLocaleString('hu-HU')} Ft</span>
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
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
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-all">
            Összes mikrokurzus megtekintése
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
