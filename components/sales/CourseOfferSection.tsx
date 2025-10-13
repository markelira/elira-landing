'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { UniversalCourseCard } from '../course/UniversalCourseCard';
import { useTrendingCourses } from '@/hooks/useCoursesCatalog';
import { Button } from '../ui/button';

const CourseOfferSection: React.FC = () => {
  const router = useRouter();
  const { data: catalogData, isLoading, error } = useTrendingCourses(6, 'popular');

  if (error) {
    console.error('Failed to load courses:', error);
    return null;
  }

  const courses = catalogData?.courses || [];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg mb-8">
              <Star className="w-6 h-6" />
              <span className="font-bold text-lg">🌟 NÉPSZERŰ KURZUSOK</span>
            </div>
            
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Fedezd fel a legkeresettebb kurzusainkat
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
            >
              Szakértő oktatóinktól tanulhatsz, akik a gyakorlatban is használják, amit tanítanak
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="aspect-[16/10] bg-gray-300"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Course Grid */}
          {!isLoading && courses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {courses.map((catalogCourse, index) => {
                // Transform to UniversalCourseCard format
                const courseData = {
                  id: catalogCourse.id,
                  title: catalogCourse.title,
                  description: catalogCourse.description,
                  thumbnail: catalogCourse.thumbnailUrl,
                  instructor: {
                    firstName: catalogCourse.instructor.firstName,
                    lastName: catalogCourse.instructor.lastName,
                    title: 'Oktató'
                  },
                  category: catalogCourse.category,
                  price: 9990, // Use consistent pricing
                  currency: 'HUF',
                  duration: 480, // 8 hours default
                  lessonsCount: 24, // Default lesson count
                  studentsCount: catalogCourse.enrollmentCount,
                  rating: catalogCourse.averageRating,
                  level: catalogCourse.difficulty === 'EXPERT' ? 'ADVANCED' : catalogCourse.difficulty,
                  status: 'PUBLISHED' as const
                };

                const enrollmentData = {
                  isEnrolled: catalogCourse.isEnrolled
                };

                return (
                  <motion.div
                    key={catalogCourse.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <UniversalCourseCard
                      course={courseData}
                      enrollment={enrollmentData}
                      variant="featured"
                      onEnroll={(courseId) => router.push(`/courses/${courseId}`)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              onClick={() => router.push('/courses')}
              variant="outline"
              size="lg"
              className="gap-3 px-8 py-4 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              Összes kurzus megtekintése
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Empty State */}
          {!isLoading && courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Kurzusok hamarosan érkeznek
                </h3>
                <p className="text-gray-600 mb-8">
                  Dolgozunk az új kurzusainkon. Iratkozz fel, hogy értesítést kapj az induláskor!
                </p>
                <Button
                  onClick={() => router.push('/contact')}
                  variant="default"
                  className="gap-2"
                >
                  Értesítést kérek
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default CourseOfferSection;