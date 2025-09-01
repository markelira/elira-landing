"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Book, Play, ChevronDown, ChevronRight, Clock, CheckCircle, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'

interface CurriculumTabProps {
  courseData: any
  courseId: string
}

export function CurriculumTab({ courseData, courseId }: CurriculumTabProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { user } = useAuth()

  // For MVP, assume enrolled if authenticated
  const isEnrolled = !!user

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  // Use real modules from courseData
  const modules = courseData.modules || []
  
  // Calculate total lessons and duration
  const totalLessons = modules.reduce((sum: number, module: any) => {
    return sum + (Array.isArray(module.lessons) ? module.lessons.length : 0)
  }, 0)
  
  const totalDuration = modules.reduce((sum: number, module: any) => {
    const moduleLessons = Array.isArray(module.lessons) ? module.lessons : []
    const moduleDuration = moduleLessons.reduce((lessonSum: number, lesson: any) => {
      return lessonSum + (lesson.duration || 600) // Default 10 minutes (600 seconds)
    }, 0)
    return sum + moduleDuration
  }, 0)

  // Format duration helper (convert from seconds to readable format)
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours} óra ${mins > 0 ? `${mins} perc` : ''}`.trim()
    }
    return `${mins} perc`
  }

  const navigateToLesson = (lessonId: string) => {
    router.push(`/courses/${courseId}/lessons/${lessonId}`)
  }

  return (
    <div className="space-y-6">
      {/* Course Content Header */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">A kurzus tartalma</h2>
        </div>
        <p className="text-gray-600 mb-6">
          {totalLessons} lecke • {formatDuration(totalDuration)}
        </p>
        
        {/* Modules */}
        <div className="space-y-4">
          {modules.map((module: any, moduleIndex: number) => {
            const moduleLessons = Array.isArray(module.lessons) ? module.lessons : []
            const moduleDuration = moduleLessons.reduce((sum: number, lesson: any) => {
              return sum + (lesson.duration || 600)
            }, 0)
            
            return (
              <div key={module.id || moduleIndex} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleModule(module.id || moduleIndex.toString())}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {moduleIndex + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{module.title || `Modul ${moduleIndex + 1}`}</h3>
                      <p className="text-sm text-gray-500">
                        {moduleLessons.length} lecke • {formatDuration(moduleDuration)}
                      </p>
                    </div>
                  </div>
                  {expandedModules.has(module.id || moduleIndex.toString()) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedModules.has(module.id || moduleIndex.toString()) && (
                  <div className="px-4 py-3 border-t border-gray-200">
                    <div className="space-y-2">
                      {moduleLessons.map((lesson: any, lessonIndex: number) => {
                        const isCompleted = false // This would come from progress data
                        const isLocked = !isEnrolled && lessonIndex > 0 // Lock lessons if not enrolled, except first in each module
                        const canAccess = isEnrolled || lessonIndex === 0 // Allow first lesson for preview
                        
                        return (
                          <button
                            key={lesson.id || lessonIndex}
                            onClick={() => {
                              if (canAccess) {
                                navigateToLesson(lesson.id)
                              } else {
                                // Could show enrollment prompt here
                                console.log('Show enrollment prompt')
                              }
                            }}
                            disabled={isLocked}
                            className={`w-full flex items-center gap-3 py-2 px-2 rounded transition-colors ${
                              canAccess
                                ? 'hover:bg-gray-50 cursor-pointer'
                                : isLocked
                                ? 'opacity-60 cursor-not-allowed'
                                : 'hover:bg-gray-50 cursor-pointer'
                            }`}
                          >
                            <div className="w-4 h-4 flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4 text-gray-400" />
                              ) : lesson.type === 'VIDEO' ? (
                                <Play className="w-4 h-4 text-primary" />
                              ) : (
                                <Book className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <span className="text-sm text-gray-700 flex-1 text-left">
                              {lesson.title || `Lecke ${lessonIndex + 1}`}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {lesson.type || 'VIDEO'}
                              </Badge>
                              {lessonIndex === 0 && !isEnrolled && (
                                <Badge className="text-xs bg-blue-100 text-blue-800">
                                  Előnézet
                                </Badge>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-500">
                                  {lesson.duration ? `${Math.ceil(lesson.duration / 60)} perc` : '10 perc'}
                                </span>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {modules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nincs elérhető tananyag</p>
          </div>
        )}
      </section>
    </div>
  )
}