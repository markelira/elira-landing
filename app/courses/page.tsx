'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CourseCard } from '@/components/course/CourseCard'
import { useCoursesCatalog } from '@/hooks/useCoursesCatalog'
import { Course } from '@/types'

export default function CoursesPage() {
  const { data: catalogData, isLoading, error } = useCoursesCatalog()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-white/90 text-lg">Kurzusok betöltése...</p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-auto"
            >
              <p className="text-white text-lg font-medium">Hiba történt a kurzusok betöltésekor.</p>
              <p className="text-white/70 text-sm mt-2">Kérjük, próbálja újra később.</p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const courses = catalogData?.courses || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 pt-32 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="courses-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#courses-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            🧠 Kurzus Katalógus
          </h1>
          <p className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Fejleszd karriered a következő szintre. Tanulj az AI és marketing legújabb trendjeiből, 
            és szerezz olyan tudást, amivel valóban növelheted a profitod.
          </p>
        </motion.div>

        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-white/90 text-lg">Jelenleg nincsenek elérhető kurzusok.</p>
              <p className="text-white/70 text-sm mt-2">Hamarosan új képzésekkel térünk vissza!</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Courses Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {courses.map((catalogCourse, index) => {
                // Transform catalog course to Course type
                const course: Course = {
                  id: catalogCourse.id,
                  title: catalogCourse.title,
                  description: catalogCourse.description,
                  status: 'PUBLISHED',
                  instructor: {
                    id: catalogCourse.instructor.id,
                    firstName: catalogCourse.instructor.firstName,
                    lastName: catalogCourse.instructor.lastName,
                    email: '',
                    role: 'INSTRUCTOR',
                    profilePictureUrl: catalogCourse.instructor.profilePictureUrl,
                    title: 'Oktató',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  category: {
                    id: catalogCourse.category.id,
                    name: catalogCourse.category.name
                  },
                  modules: [],
                  averageRating: catalogCourse.averageRating,
                  reviewCount: catalogCourse.reviewCount,
                  enrollmentCount: catalogCourse.enrollmentCount,
                  thumbnailUrl: catalogCourse.thumbnailUrl,
                  slug: catalogCourse.id,
                  reviews: [],
                  createdAt: catalogCourse.createdAt,
                  updatedAt: catalogCourse.updatedAt,
                  certificateEnabled: catalogCourse.certificateEnabled,
                  language: catalogCourse.language,
                  difficulty: catalogCourse.difficulty,
                  publishDate: catalogCourse.createdAt,
                  isPlus: catalogCourse.isPlus,
                  price: 9990
                }

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <CourseCard
                      course={course}
                      variant="featured"
                      context="home"
                    />
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {catalogData?.total || 0}
                </h3>
                <p className="text-white/80 font-medium">
                  Kurzus elérhető összesen
                </p>
                <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">✓</span>
                    <span>Tanúsítvány</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">✓</span>
                    <span>Életreszóló hozzáférés</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}