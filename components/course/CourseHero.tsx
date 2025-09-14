import React from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, Clock, Award, Play } from 'lucide-react'
import PurchaseButton from './PurchaseButton'
import { useAuth } from '@/contexts/AuthContext'

interface CourseHeroProps {
  courseData: {
    title: string
    description: string
    thumbnail?: string
    instructor: {
      firstName: string
      lastName: string
      title?: string
      profilePictureUrl?: string
    }
    averageRating?: number
    reviewCount?: number
    enrollmentCount?: number
    modules: any[]
    estimatedDuration?: number
  }
  courseId: string
  onStartLearning: () => void
}

export function CourseHero({ courseData, courseId, onStartLearning }: CourseHeroProps) {
  const { user } = useAuth()
  
  // For MVP, assume enrolled if authenticated
  const isEnrolled = !!user

  // Calculate course stats
  const totalLessons = courseData.modules.reduce((sum, module) => {
    return sum + (Array.isArray(module.lessons) ? module.lessons.length : 0)
  }, 0)

  const totalDuration = courseData.modules.reduce((sum: number, module: any) => {
    const moduleLessons = Array.isArray(module.lessons) ? module.lessons : []
    return sum + moduleLessons.reduce((lessonSum: number, lesson: any) => {
      return lessonSum + (lesson.duration || 600) // Default 10 minutes
    }, 0)
  }, 0)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    return hours > 0 ? `${hours} óra` : `${Math.floor(seconds / 60)} perc`
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Badge className="bg-white/20 text-white">
                <BookOpen className="w-3 h-3 mr-1" />
                Online kurzus
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {courseData.title}
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                {courseData.description}
              </p>
            </div>

            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 text-lg">
              {courseData.averageRating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{courseData.averageRating}</span>
                  <span className="opacity-80">({courseData.reviewCount || 0} értékelés)</span>
                </div>
              )}
              
              {courseData.enrollmentCount && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{courseData.enrollmentCount} hallgató</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formatDuration(totalDuration)} tartalom</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{totalLessons} lecke</span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">
                  {courseData.instructor.firstName[0]}{courseData.instructor.lastName[0]}
                </span>
              </div>
              <div>
                <div className="font-semibold">
                  {courseData.instructor.firstName} {courseData.instructor.lastName}
                </div>
                <div className="text-sm opacity-80">
                  {courseData.instructor.title || 'Oktató'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              {isEnrolled ? (
                <Button 
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-50"
                  onClick={onStartLearning}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Tanulás folytatása
                </Button>
              ) : (
                <PurchaseButton 
                  className="bg-white text-primary hover:bg-gray-50"
                  onPurchaseStart={() => console.log('Purchase started')}
                  onPurchaseSuccess={() => console.log('Purchase successful')}
                  onPurchaseError={(error) => console.error('Purchase error:', error)}
                />
              )}
            </div>
          </div>

          {/* Course Thumbnail/Video */}
          <div className="relative">
            <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20">
              {courseData.thumbnail ? (
                <img 
                  src={courseData.thumbnail}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 cursor-pointer">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              
              {/* Play overlay for video preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 cursor-pointer">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}