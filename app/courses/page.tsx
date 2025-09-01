'use client'

import React from 'react'
import { CourseCard } from '@/components/course/CourseCard'
import { useCoursesCatalog } from '@/hooks/useCoursesCatalog'
import { Course } from '@/types'

export default function CoursesPage() {
  const { data: catalogData, isLoading, error } = useCoursesCatalog()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Kurzusok betöltése...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Hiba történt a kurzusok betöltésekor.</p>
          </div>
        </div>
      </div>
    )
  }

  const courses = catalogData?.courses || []

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kurzus Katalógus
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fedezd fel a legújabb képzéseinket és fejleszd karriered a következő szintre
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Jelenleg nincsenek elérhető kurzusok.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((catalogCourse) => {
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
                    email: '', // Not needed for display
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
                  modules: [], // Will be loaded separately
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
                  <CourseCard
                    key={course.id}
                    course={course}
                    variant="default"
                    context="home"
                  />
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                {catalogData?.total || 0} kurzus elérhető összesen
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}