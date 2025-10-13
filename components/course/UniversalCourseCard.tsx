'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { 
  Clock, 
  BookOpen, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Lock,
  ArrowRight
} from 'lucide-react'

export interface CourseData {
  id: string
  title: string
  description: string
  thumbnail?: string
  instructor: {
    firstName: string
    lastName: string
    title?: string
  }
  category?: {
    name: string
  }
  price?: number
  currency?: string
  duration?: number // in minutes
  lessonsCount?: number
  studentsCount?: number
  rating?: number
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  status?: 'PUBLISHED' | 'DRAFT'
}

export interface EnrollmentData {
  isEnrolled: boolean
  progressPercentage?: number
  completedLessons?: number
  totalLessons?: number
  lastAccessedAt?: Date
  nextLessonId?: string
  isCompleted?: boolean
}

interface UniversalCourseCardProps {
  course: CourseData
  enrollment?: EnrollmentData
  variant?: 'default' | 'featured' | 'compact'
  onEnroll?: (courseId: string) => void
  className?: string
  showProgress?: boolean
}

export function UniversalCourseCard({ 
  course, 
  enrollment, 
  variant = 'default',
  onEnroll,
  className = '',
  showProgress = true
}: UniversalCourseCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    if (enrollment?.isEnrolled && enrollment?.nextLessonId) {
      router.push(`/courses/${course.id}/lessons/${enrollment.nextLessonId}`)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEnroll) {
      onEnroll(course.id)
    } else {
      router.push(`/courses/${course.id}`)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}ó ${mins}p`
    }
    return `${mins}p`
  }

  const getLevelBadge = (level?: string) => {
    const levelMap = {
      BEGINNER: { text: 'Kezdő', color: 'bg-green-100 text-green-800' },
      INTERMEDIATE: { text: 'Középhaladó', color: 'bg-yellow-100 text-yellow-800' },
      ADVANCED: { text: 'Haladó', color: 'bg-red-100 text-red-800' }
    }
    return levelMap[level as keyof typeof levelMap] || { text: 'Kezdő', color: 'bg-green-100 text-green-800' }
  }

  const levelBadge = getLevelBadge(course.level)
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <div 
      className={`
        group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden
        hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1
        ${isFeatured ? 'ring-2 ring-blue-500 ring-opacity-20' : ''}
        ${className}
      `}
      onClick={handleCardClick}
    >
      {/* Course Thumbnail */}
      <div className={`relative overflow-hidden ${isCompact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={isFeatured}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white opacity-50" />
          </div>
        )}
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${levelBadge.color} text-xs font-medium`}>
            {levelBadge.text}
          </Badge>
          {isFeatured && (
            <Badge className="bg-yellow-500 text-white text-xs font-medium">
              Kiemelt
            </Badge>
          )}
        </div>

        {/* Duration badge */}
        {course.duration && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-black bg-opacity-70 text-white text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {formatDuration(course.duration)}
            </Badge>
          </div>
        )}

        {/* Enrollment status overlay */}
        {enrollment?.isEnrolled && (
          <div className="absolute bottom-3 left-3">
            {enrollment.isCompleted ? (
              <Badge className="bg-green-600 text-white text-xs font-medium">
                <CheckCircle className="w-3 h-3 mr-1" />
                Befejezve
              </Badge>
            ) : (
              <Badge className="bg-blue-600 text-white text-xs font-medium">
                <Play className="w-3 h-3 mr-1" />
                {enrollment.progressPercentage ? `${Math.round(enrollment.progressPercentage)}%` : 'Elkezdve'}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className={`p-4 ${isCompact ? 'p-3' : 'p-5'}`}>
        {/* Category */}
        {course.category && !isCompact && (
          <div className="mb-2">
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
              {course.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 ${isCompact ? 'text-sm' : 'text-lg'}`}>
          {course.title}
        </h3>

        {/* Description */}
        {!isCompact && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {course.description}
          </p>
        )}

        {/* Instructor */}
        <div className={`flex items-center mb-3 ${isCompact ? 'mb-2' : 'mb-4'}`}>
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <Users className="w-3 h-3 text-gray-500" />
          </div>
          <span className={`text-gray-600 ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {course.instructor.firstName} {course.instructor.lastName}
          </span>
        </div>

        {/* Course Stats */}
        {!isCompact && (
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            {course.lessonsCount && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>{course.lessonsCount} lecke</span>
              </div>
            )}
            {course.studentsCount && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{course.studentsCount} diák</span>
              </div>
            )}
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-yellow-400" />
                <span>{course.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar for Enrolled Users */}
        {enrollment?.isEnrolled && showProgress && enrollment.progressPercentage !== undefined && !enrollment.isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">Haladás</span>
              <span className="text-xs font-medium">{Math.round(enrollment.progressPercentage)}%</span>
            </div>
            <ProgressBar 
              value={enrollment.progressPercentage} 
              height="sm" 
              color="blue"
              animated
            />
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          {enrollment?.isEnrolled ? (
            <Button 
              className={`flex-1 group-hover:bg-blue-700 transition-colors ${isCompact ? 'h-8 text-xs' : ''}`}
              onClick={handleCardClick}
            >
              {enrollment.isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Újranézés
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Folytatás
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              {course.price && course.price > 0 ? (
                <>
                  <div className="flex flex-col">
                    <span className={`font-bold text-gray-900 ${isCompact ? 'text-sm' : 'text-lg'}`}>
                      {new Intl.NumberFormat('hu-HU', { 
                        style: 'currency', 
                        currency: course.currency || 'HUF' 
                      }).format(course.price)}
                    </span>
                    <span className="text-xs text-gray-500">Egyszeri fizetés</span>
                  </div>
                  <Button 
                    variant="default"
                    onClick={handleEnrollClick}
                    className={`ml-3 ${isCompact ? 'h-8 text-xs px-3' : ''}`}
                  >
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Vásárlás
                  </Button>
                </>
              ) : (
                <Button 
                  className={`flex-1 ${isCompact ? 'h-8 text-xs' : ''}`}
                  onClick={handleEnrollClick}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ingyenes hozzáférés
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}