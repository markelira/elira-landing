'use client'

import React from 'react'
import { BookOpen, Clock, Users, Award, CheckCircle } from 'lucide-react'

interface CourseDetailLayoutProps {
  courseData: any
  courseId: string
  onEnroll?: () => void
  isEnrolling?: boolean
}

export function CourseDetailLayout({ 
  courseData, 
  courseId,
  onEnroll,
  isEnrolling = false
}: CourseDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {courseData.title}
              </h1>
              <p className="text-xl text-teal-100 mb-6">
                {courseData.shortDescription || courseData.description?.substring(0, 150) + '...'}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{courseData.stats?.modules || 0} modul</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{courseData.stats?.duration || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{courseData.stats?.students || 0} tanuló</span>
                </div>
              </div>
            </div>
            
            {/* Thumbnail placeholder */}
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">A kurzusról</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {courseData.description}
              </p>
              
              {/* Learning Objectives */}
              {courseData.objectives && courseData.objectives.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mit fogsz tanulni?</h3>
                  <ul className="space-y-2">
                    {courseData.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            
            {/* Curriculum Section */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tananyag</h2>
              {courseData.modules && courseData.modules.length > 0 ? (
                <div className="space-y-4">
                  {courseData.modules.map((module: any, moduleIndex: number) => (
                    <div key={module.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {moduleIndex + 1}. modul: {module.title}
                      </h3>
                      {module.description && (
                        <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                      )}
                      {module.lessons && module.lessons.length > 0 && (
                        <ul className="space-y-2">
                          {module.lessons.map((lesson: any, lessonIndex: number) => (
                            <li key={lesson.id} className="flex items-center gap-3 text-sm text-gray-700">
                              <span className="text-gray-400">{moduleIndex + 1}.{lessonIndex + 1}</span>
                              <span>{lesson.title}</span>
                              {lesson.duration && (
                                <span className="text-gray-500 ml-auto">
                                  {Math.floor(lesson.duration / 60)} perc
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nincs elérhető tananyag információ.</p>
              )}
            </section>
            
            {/* Instructor Section */}
            {courseData.instructor && (
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Az oktatóról</h2>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {courseData.instructor.firstName?.[0]}{courseData.instructor.lastName?.[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {courseData.instructor.firstName} {courseData.instructor.lastName}
                    </h3>
                    {courseData.instructor.title && (
                      <p className="text-gray-600">{courseData.instructor.title}</p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
          
          {/* Right Column - Course Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Price Display */}
                <div className="mb-6">
                  {courseData.isFree ? (
                    <div className="text-3xl font-bold text-teal-600">Ingyenes</div>
                  ) : courseData.price ? (
                    <div className="text-3xl font-bold text-gray-900">
                      {courseData.price.toLocaleString('hu-HU')} Ft
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">
                      Ár egyeztetés alatt
                    </div>
                  )}
                </div>
                
                {/* Enroll Button */}
                <button
                  onClick={onEnroll}
                  disabled={isEnrolling}
                  className="w-full py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEnrolling ? 'Folyamatban...' : (courseData.isFree ? 'Ingyenes beiratkozás' : 'Megvásárlás')}
                </button>
                
                {/* Course Stats */}
                <div className="mt-6 space-y-3 border-t pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Modulok</span>
                    <span className="font-semibold text-gray-900">{courseData.stats?.modules || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Leckék</span>
                    <span className="font-semibold text-gray-900">{courseData.stats?.lessons || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Időtartam</span>
                    <span className="font-semibold text-gray-900">{courseData.stats?.duration || 'N/A'}</span>
                  </div>
                  {courseData.certificateEnabled && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tanúsítvány</span>
                      <Award className="w-4 h-4 text-teal-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}