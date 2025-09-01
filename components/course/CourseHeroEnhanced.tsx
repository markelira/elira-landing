'use client'

import React from 'react'
import { BookOpen, Clock, Users, Star, Award, PlayCircle } from 'lucide-react'
import PurchaseButton from './PurchaseButton'

interface CourseHeroProps {
  course: any
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative container max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Category Badge */}
            {course.category && (
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                <span className="text-teal-100">{course.category.name}</span>
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              {course.title}
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-teal-50 leading-relaxed">
              {course.shortDescription || course.description?.substring(0, 200) + '...'}
            </p>
            
            {/* Instructor */}
            {course.instructor && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {course.instructor.firstName?.[0]}{course.instructor.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-teal-100">Oktató</p>
                  <p className="font-semibold">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </p>
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-200" />
                <span className="text-sm">
                  <strong>{course.stats?.modules || 0}</strong> modul
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-200" />
                <span className="text-sm">
                  <strong>{course.stats?.duration || 'N/A'}</strong>
                </span>
              </div>
              {course.stats?.students > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-200" />
                  <span className="text-sm">
                    <strong>{course.stats.students.toLocaleString('hu-HU')}</strong> tanuló
                  </span>
                </div>
              )}
              {course.averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">
                    <strong>{course.averageRating.toFixed(1)}</strong> ({course.reviewCount || 0})
                  </span>
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <PurchaseButton
                course={{
                  id: course.id,
                  title: course.title,
                  price: course.price || 9990,
                  currency: course.currency || 'HUF'
                }}
                className="px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all transform hover:scale-105 shadow-xl"
              />
              
              {course.previewVideoUrl && (
                <button className="px-6 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Előzetes megtekintése
                </button>
              )}
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {course.certificateEnabled && (
                <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Award className="w-4 h-4" />
                  <span>Tanúsítvány</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span>30 napos garancia</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span>Élethosszig elérhető</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Video/Image Preview */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-500/20 to-teal-700/20 backdrop-blur-sm border border-white/20">
              {course.thumbnailUrl ? (
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/30" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              {course.previewVideoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all transform hover:scale-110 shadow-xl">
                    <PlayCircle className="w-10 h-10 text-teal-700 ml-1" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-xl shadow-2xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-teal-700">{course.stats?.modules || 0}</p>
                  <p className="text-xs text-gray-600">Modul</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-700">{course.stats?.lessons || 0}</p>
                  <p className="text-xs text-gray-600">Lecke</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-teal-700">{course.stats?.duration || 'N/A'}</p>
                  <p className="text-xs text-gray-600">Időtartam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}