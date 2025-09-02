'use client'

import React, { useState } from 'react'
import { CourseHero } from './CourseHeroEnhanced'
import { CourseRating } from './CourseRating'
import { ShareButtons } from './ShareButtons'
import { VideoPreviewModal } from './VideoPreviewModal'
import PurchaseButton from './PurchaseButton'
import { BookOpen, Info, Users, MessageSquare, Award, ShoppingCart } from 'lucide-react'

interface CourseDetailWithTabsProps {
  courseData: any
  courseId: string
}

type TabType = 'overview' | 'curriculum' | 'instructor' | 'reviews'

export function CourseDetailWithTabs({ 
  courseData, 
  courseId
}: CourseDetailWithTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [showVideoModal, setShowVideoModal] = useState(false)
  
  const tabs = [
    { id: 'overview' as TabType, label: 'Áttekintés', icon: Info },
    { id: 'curriculum' as TabType, label: 'Tananyag', icon: BookOpen },
    { id: 'instructor' as TabType, label: 'Oktató', icon: Users },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CourseHero 
        course={courseData}
      />
      
      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={courseData.previewVideoUrl}
        courseTitle={courseData.title}
      />
      
      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 transition-all
                    ${activeTab === tab.id 
                      ? 'border-teal-600 text-teal-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && <OverviewTab course={courseData} />}
            {activeTab === 'curriculum' && <CurriculumTab course={courseData} />}
            {activeTab === 'instructor' && <InstructorTab course={courseData} />}
          </div>
          
          {/* Right Column - Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <PurchaseCard 
              course={courseData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ course }: { course: any }) {
  return (
    <div className="space-y-8">
      {/* Rating and Share Section */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {course.averageRating > 0 && (
            <CourseRating 
              rating={course.averageRating}
              reviewCount={course.reviewCount || 0}
              size="lg"
            />
          )}
          <ShareButtons
            url={`/courses/${course.id}`}
            title={course.title}
            description={course.shortDescription || course.description}
          />
        </div>
      </section>
      
      {/* Course Description */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">A kurzusról</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="whitespace-pre-line leading-relaxed">
            {course.description}
          </p>
        </div>
      </section>
      
      {/* What You'll Learn */}
      {course.objectives && course.objectives.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mit fogsz tanulni?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.objectives.map((objective: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{objective}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      
    </div>
  )
}

// Curriculum Tab Component
function CurriculumTab({ course }: { course: any }) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kurzus tananyag</h2>
        
        {/* Course Stats */}
        <div className="flex gap-6 mb-6 pb-6 border-b">
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{course.stats?.modules || 0}</span> modul
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{course.stats?.lessons || 0}</span> lecke
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">{course.stats?.duration || 'N/A'}</span> összes időtartam
          </div>
        </div>
        
        {/* Modules */}
        {course.modules && course.modules.length > 0 ? (
          <div className="space-y-4">
            {course.modules.map((module: any, moduleIndex: number) => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-500">
                      {moduleIndex + 1}. MODUL
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {module.title}
                    </h3>
                    {module.lessons && (
                      <span className="text-sm text-gray-500">
                        ({module.lessons.length} lecke)
                      </span>
                    )}
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedModules.has(module.id) ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedModules.has(module.id) && module.lessons && (
                  <div className="bg-white">
                    {module.description && (
                      <p className="px-6 py-3 text-sm text-gray-600 border-b">
                        {module.description}
                      </p>
                    )}
                    <ul className="divide-y">
                      {module.lessons.map((lesson: any, lessonIndex: number) => (
                        <li key={lesson.id} className="px-6 py-3 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">
                                {moduleIndex + 1}.{lessonIndex + 1}
                              </span>
                              <span className="text-gray-700">{lesson.title}</span>
                              {lesson.isFreePreview && (
                                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">
                                  Ingyenes előzetes
                                </span>
                              )}
                            </div>
                            {lesson.duration && (
                              <span className="text-sm text-gray-500">
                                {Math.floor(lesson.duration / 60)} perc
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nincs elérhető tananyag információ.</p>
        )}
      </div>
    </div>
  )
}

// Instructor Tab Component
function InstructorTab({ course }: { course: any }) {
  if (!course.instructor) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-500">Nincs elérhető oktató információ.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Az oktatóról</h2>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
            {course.instructor.firstName?.[0]}{course.instructor.lastName?.[0]}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {course.instructor.firstName} {course.instructor.lastName}
            </h3>
            {course.instructor.title && (
              <p className="text-gray-600 mb-4">{course.instructor.title}</p>
            )}
            {course.instructor.bio && (
              <p className="text-gray-700 leading-relaxed">{course.instructor.bio}</p>
            )}
            
            {/* Instructor Stats */}
            <div className="flex gap-6 mt-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">5+</p>
                <p className="text-sm text-gray-600">év tapasztalat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-sm text-gray-600">tanuló</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-600">átlag értékelés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reviews Tab Component
function ReviewsTab({ course }: { course: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tanulói értékelések</h2>
        
        {/* Rating Summary */}
        {course.averageRating > 0 && (
          <div className="flex items-center gap-8 mb-8 pb-8 border-b">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900">{course.averageRating.toFixed(1)}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(course.averageRating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300 fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">{course.reviewCount || 0} értékelés</p>
            </div>
          </div>
        )}
        
        <div className="text-center py-8 text-gray-500">
          <p>Az értékelések hamarosan elérhetőek lesznek.</p>
        </div>
      </div>
    </div>
  )
}

// Purchase Card Component
function PurchaseCard({ course }: any) {
  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Price */}
        <div className="text-center mb-6">
          {course.isFree ? (
            <div>
              <p className="text-4xl font-bold text-teal-600">Ingyenes</p>
              <p className="text-gray-600 mt-1">Örökre</p>
            </div>
          ) : (
            <div>
              <p className="text-4xl font-bold text-gray-900">
                {course.price?.toLocaleString('hu-HU')} Ft
              </p>
              <p className="text-gray-600 mt-1">Egyszeri díj</p>
            </div>
          )}
        </div>
        
        {/* Real Purchase Button */}
        <PurchaseButton
          course={{
            id: course.id,
            title: course.title,
            price: course.price || 9990,
            currency: course.currency || 'HUF'
          }}
          className="w-full"
        />
        
        {/* Features */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">A kurzus tartalmazza:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{course.stats?.duration || 'N/A'} videó tartalom</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{course.stats?.lessons || 0} lecke</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Letölthető anyagok</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Élethosszig tartó hozzáférés</span>
            </div>
          </div>
        </div>
        
        {/* Money Back Guarantee */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">30 napos pénzvisszafizetési garancia</p>
              <p className="text-sm text-gray-600 mt-1">
                Ha nem vagy elégedett, teljes összeget visszatérítünk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}