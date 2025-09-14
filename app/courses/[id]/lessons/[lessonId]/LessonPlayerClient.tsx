'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePlayerData } from '@/hooks/usePlayerData'
import { useLessonProgress } from '@/hooks/useLessonProgress'
import { VideoPlayer } from '@/components/video/VideoPlayer'
import { VideoPlayerControls } from '@/components/video/VideoPlayerControls'
import PDFViewer from '@/components/lesson/PDFViewer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Lock
} from 'lucide-react'

interface Props {
  courseId: string
  lessonId: string
}

export default function LessonPlayerClient({ courseId, lessonId }: Props) {
  const router = useRouter()
  const { data, isLoading, error } = usePlayerData(courseId, lessonId)
  const { updateProgress, markAsCompleted, progress, error: progressError } = useLessonProgress()
  const [showSidebar, setShowSidebar] = useState(true)
  const [notes, setNotes] = useState<any[]>([])
  const [bookmarks, setBookmarks] = useState<any[]>([])

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h1>
          <p className="text-gray-600 mb-6">The requested lesson could not be loaded.</p>
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (!data || !data.currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No lesson data</h1>
          <p className="text-gray-600 mb-6">Unable to load lesson content.</p>
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const { course, currentLesson, signedPlaybackUrl } = data

  // Find current lesson index and navigation
  const allLessons = course?.modules.flatMap(module => 
    module.lessons.map(lesson => ({
      ...lesson,
      moduleTitle: module.title
    }))
  ) || []
  
  const currentIndex = allLessons.findIndex(lesson => lesson.id === lessonId)
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const handleProgress = async (percentage: number, timeSpent: number) => {
    // Update lesson progress
    await updateProgress({
      lessonId,
      courseId,
      watchedPercentage: percentage,
      timeSpent
    })
  }

  const handleVideoEnded = () => {
    console.log('Video ended')
    // Auto-navigate to next lesson or show completion
    if (nextLesson) {
      setTimeout(() => {
        router.push(`/courses/${courseId}/lessons/${nextLesson.id}`)
      }, 2000)
    }
  }

  const handleAddNote = (noteData: any) => {
    const newNote = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date()
    }
    setNotes(prev => [...prev, newNote])
  }

  const handleAddBookmark = (bookmarkData: any) => {
    const newBookmark = {
      id: Date.now().toString(),
      ...bookmarkData,
      createdAt: new Date()
    }
    setBookmarks(prev => [...prev, newBookmark])
  }

  const navigateToLesson = (targetLessonId: string) => {
    router.push(`/courses/${courseId}/lessons/${targetLessonId}`)
  }

  const isVideoLesson = currentLesson.type === 'VIDEO'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            
            <div className="border-l pl-4">
              <h1 className="font-semibold text-gray-900 truncate max-w-md">
                {currentLesson.title}
              </h1>
              <p className="text-sm text-gray-600">{course?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {currentIndex + 1} of {allLessons.length}
            </Badge>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 ${showSidebar ? 'pr-0' : ''}`}>
          <div className="max-w-4xl">
            {/* Video Player for Video Lessons */}
            {isVideoLesson && signedPlaybackUrl && (
              <div className="mb-6">
                <VideoPlayer
                  src={signedPlaybackUrl}
                  lessonTitle={currentLesson.title}
                  lessonId={currentLesson.id}
                  courseId={courseId}
                  onProgress={handleProgress}
                  onEnded={handleVideoEnded}
                  poster={`/images/lesson-${currentLesson.id}-poster.jpg`}
                  chapters={[]} // Add chapters if available
                  bookmarks={bookmarks}
                  className="mb-4"
                />
                
                <VideoPlayerControls
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  volume={volume}
                  playbackRate={playbackRate}
                  isFullscreen={isFullscreen}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onSeek={(time) => setCurrentTime(time)}
                  onVolumeChange={setVolume}
                  onPlaybackRateChange={setPlaybackRate}
                  onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
                  onSkipForward={(seconds) => setCurrentTime(prev => prev + seconds)}
                  onSkipBackward={(seconds) => setCurrentTime(prev => Math.max(0, prev - seconds))}
                  onAddNote={handleAddNote}
                  onAddBookmark={handleAddBookmark}
                  notes={notes}
                  bookmarks={bookmarks}
                  lessonTitle={currentLesson.title}
                  courseTitle={course?.title}
                />
              </div>
            )}

            {/* PDF Lessons */}
            {currentLesson.type === 'PDF' && currentLesson.pdfUrl && (
              <div className="mb-6">
                <PDFViewer
                  url={currentLesson.pdfUrl}
                  title={currentLesson.title}
                  onProgressUpdate={(prog) => {
                    // Update lesson progress based on PDF reading progress
                    if (prog > 90) { // Consider lesson complete when 90% read
                      markAsCompleted(lessonId, courseId);
                    }
                  }}
                  enableBookmarks={true}
                  enableSearch={true}
                  enableDownload={true}
                />
              </div>
            )}

            {/* Text Content for Non-Video/Non-PDF Lessons */}
            {!isVideoLesson && currentLesson.type !== 'PDF' && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <Badge variant="outline">{currentLesson.type}</Badge>
                </div>
                
                <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{currentLesson.content}</p>
                  
                  {/* Placeholder for rich content */}
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">📚 Lesson Content</h3>
                    <p className="text-sm text-gray-600">
                      This is a placeholder for the lesson content. In a real implementation, 
                      this would contain the actual lesson materials, interactive exercises, 
                      or other educational content.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => markAsCompleted(lessonId, courseId)}
                    disabled={progress?.isCompleted}
                    className={progress?.isCompleted ? 'bg-green-600' : ''}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {progress?.isCompleted ? 'Befejezve' : 'Befejezés jelölése'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div>
                {previousLesson && (
                  <Button
                    variant="outline"
                    onClick={() => navigateToLesson(previousLesson.id)}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous: {previousLesson.title}
                  </Button>
                )}
              </div>

              <div>
                {nextLesson && (
                  <Button
                    onClick={() => navigateToLesson(nextLesson.id)}
                    className="gap-2"
                  >
                    Next: {nextLesson.title}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-white border-l p-6 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
            
            <div className="space-y-4">
              {course?.modules.map((module) => (
                <div key={module.id}>
                  <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
                  <div className="space-y-1">
                    {module.lessons.map((lesson, index) => {
                      const isCurrentLesson = lesson.id === lessonId
                      const isCompleted = progress?.lessonId === lesson.id && progress?.isCompleted
                      const isLocked = false // This would be based on course progression in a real app
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigateToLesson(lesson.id)}
                          disabled={isLocked}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            isCurrentLesson 
                              ? 'bg-blue-50 border-blue-200 text-blue-900' 
                              : isCompleted
                              ? 'bg-green-50 border-green-200 hover:bg-green-100'
                              : isLocked
                              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : isCurrentLesson ? (
                                  <Play className="w-4 h-4 text-blue-600" />
                                ) : isLocked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : lesson.type === 'VIDEO' ? (
                                  <Play className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <BookOpen className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                              
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                  >
                                    {lesson.type}
                                  </Badge>
                                  {lesson.duration && (
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock className="w-3 h-3" />
                                      <span>{Math.ceil(lesson.duration / 60)}m</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}