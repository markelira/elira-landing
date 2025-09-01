'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Users, Clock, BookOpen, Play, TrendingUp, Bookmark, Share } from 'lucide-react'
import { cn } from '@/lib/utils'

// Course interface for Universal Card
interface Course {
  id: string
  title: string
  slug?: string
  thumbnail?: string | null
  description?: string
  instructor?: {
    firstName: string
    lastName: string
    title?: string
    imageUrl?: string
  }
  university?: {
    name: string
    logoUrl?: string
  }
  rating?: number
  ratingCount?: number
  enrollmentCount?: number
  duration?: number
  difficulty?: string
  category?: string
  price?: number
  originalPrice?: number
  isFeatured?: boolean
  hasVideo?: boolean
  certificateType?: string
  completionRate?: number
  progress?: number
  isEnrolled?: boolean
  isBookmarked?: boolean
  createdAt?: string
  updatedAt?: string
}

interface UniversalCourseCardProps {
  course: Course
  variant?: 'default' | 'compact' | 'featured' | 'list' | 'minimal'
  context?: 'dashboard' | 'university' | 'search' | 'recommendations' | 'home'
  actions?: ('enroll' | 'continue' | 'bookmark' | 'share' | 'details')[]
  showElements?: ('rating' | 'price' | 'instructor' | 'duration' | 'students' | 'category' | 'university' | 'progress' | 'difficulty')[]
  onAction?: (action: string, course: Course) => void
  className?: string
  priority?: boolean
}

const difficultyColors: Record<string, string> = {
  'Kezdő': 'bg-green-100 text-green-800',
  'Haladó': 'bg-blue-100 text-blue-800',
  'Középhaladó': 'bg-yellow-100 text-yellow-800',
  'Szakértő': 'bg-red-100 text-red-800',
  'BEGINNER': 'bg-green-100 text-green-800',
  'INTERMEDIATE': 'bg-yellow-100 text-yellow-800',
  'ADVANCED': 'bg-blue-100 text-blue-800',
  'EXPERT': 'bg-red-100 text-red-800'
}

const categoryIcons: Record<string, string> = {
  'Business': '💼',
  'Technology': '💻',
  'Design': '🎨',
  'Marketing': '📊',
  'Digital Marketing': '📊',
  'Engineering': '⚙️',
  'Healthcare': '🏥',
  'Education': '🎓',
  'Finance': '💰'
}

export function UniversalCourseCard({
  course,
  variant = 'default',
  context = 'home',
  actions = ['enroll', 'details'],
  showElements = ['rating', 'price', 'instructor'],
  onAction,
  className = '',
  priority = false
}: UniversalCourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked || false)
  const [imageError, setImageError] = useState(false)

  const handleAction = (action: string) => {
    if (action === 'bookmark') {
      setIsBookmarked(!isBookmarked)
    }
    onAction?.(action, course)
  }

  const courseUrl = `/courses/${course.slug || course.id}`
  const hasDiscount = course.originalPrice && course.price && course.originalPrice > course.price

  // Common elements
  const renderThumbnail = (aspectRatio: string = 'aspect-video', size: string = 'h-48') => (
    <div className={cn('relative bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg overflow-hidden', aspectRatio, size)}>
      {course.thumbnail && !imageError ? (
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <BookOpen className="w-12 h-12 text-primary/60" />
        </div>
      )}

      {/* Overlay badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {course.isFeatured && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Kiemelt
          </div>
        )}
        {showElements.includes('category') && course.category && (
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {categoryIcons[course.category]} {course.category}
          </div>
        )}
      </div>

      {/* Rating badge */}
      {showElements.includes('rating') && course.rating && (
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          {course.rating}
        </div>
      )}

      {/* Video play button */}
      {course.hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 cursor-pointer">
            <Play className="w-5 h-5 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Progress bar for enrolled courses */}
      {showElements.includes('progress') && course.progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="text-white text-xs mt-1">{course.progress}% befejezve</div>
        </div>
      )}
    </div>
  )

  const renderPrice = () => {
    if (!showElements.includes('price') || !course.price) return null

    return (
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-green-600">
          {course.price.toLocaleString('hu-HU')} Ft
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-500 line-through">
            {course.originalPrice?.toLocaleString('hu-HU')} Ft
          </span>
        )}
        {hasDiscount && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
            -{Math.round(((course.originalPrice! - course.price!) / course.originalPrice!) * 100)}%
          </span>
        )}
      </div>
    )
  }

  const renderStats = () => (
    <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
      {showElements.includes('rating') && course.rating && (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-medium">{course.rating}</span>
          {course.ratingCount && <span>({course.ratingCount})</span>}
        </div>
      )}
      
      {showElements.includes('students') && course.enrollmentCount && (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{course.enrollmentCount} hallgató</span>
        </div>
      )}

      {showElements.includes('duration') && course.duration && (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{course.duration}h</span>
        </div>
      )}

      {showElements.includes('difficulty') && course.difficulty && (
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', difficultyColors[course.difficulty] || 'bg-gray-100 text-gray-800')}>
          {course.difficulty}
        </span>
      )}
    </div>
  )

  const renderInstructor = () => {
    if (!showElements.includes('instructor') || !course.instructor) return null

    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          {course.instructor.imageUrl ? (
            <Image
              src={course.instructor.imageUrl}
              alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-primary">
              {course.instructor.firstName[0]}{course.instructor.lastName[0]}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {course.instructor.firstName} {course.instructor.lastName}
          </div>
          {course.instructor.title && (
            <div className="text-sm text-gray-600 truncate">{course.instructor.title}</div>
          )}
        </div>
      </div>
    )
  }

  const renderActions = () => (
    <div className="flex gap-2 flex-wrap">
      {actions.map(action => {
        switch (action) {
          case 'enroll':
            return (
              <button
                key={action}
                onClick={() => handleAction('enroll')}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center min-w-[120px]"
              >
                {course.isEnrolled ? 'Beiratkozva' : 'Beiratkozás'}
              </button>
            )
          
          case 'continue':
            return (
              <button
                key={action}
                onClick={() => handleAction('continue')}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center min-w-[120px]"
              >
                Folytatás
              </button>
            )
          
          case 'details':
            return (
              <Link
                key={action}
                href={courseUrl}
                className="px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center"
              >
                Részletek
              </Link>
            )
          
          case 'bookmark':
            return (
              <button
                key={action}
                onClick={() => handleAction('bookmark')}
                className={cn(
                  'p-2 rounded-lg border-2 transition-colors',
                  isBookmarked 
                    ? 'bg-yellow-100 border-yellow-300 text-yellow-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                )}
              >
                <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
              </button>
            )
          
          case 'share':
            return (
              <button
                key={action}
                onClick={() => handleAction('share')}
                className="p-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Share className="w-4 h-4" />
              </button>
            )
          
          default:
            return null
        }
      })}
    </div>
  )

  // Default card layout
  return (
    <div className={cn('bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]', className)}>
      {renderThumbnail()}
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <div className="mt-2 space-y-2">
            {renderInstructor()}
          </div>
        </div>

        {renderStats()}
        {renderPrice()}

        <div className="pt-2">
          {renderActions()}
        </div>
      </div>
    </div>
  )
}