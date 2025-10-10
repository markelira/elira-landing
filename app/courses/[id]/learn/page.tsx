'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, FileText, ChevronLeft, ChevronRight, CheckCircle, 
  Clock, BarChart3, BookOpen, Menu, X, Home
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CourseAccessGuard } from '@/components/guards/CourseAccessGuard';
import { useCourse } from '@/hooks/useCourseQueries';
import { useAuth } from '@/contexts/AuthContext';

interface CoursePlayerPageProps {}

export default function CoursePlayerPage({}: CoursePlayerPageProps) {
  const params = useParams();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { user } = useAuth();
  
  const { data: course, isLoading, error } = useCourse(courseId || '');
  
  const [currentModuleId, setCurrentModuleId] = useState<string>('');
  const [currentLessonId, setCurrentLessonId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Set sidebar open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [pdfSectionExpanded, setPdfSectionExpanded] = useState(false);

  // Initialize with first lesson when course loads
  useEffect(() => {
    if (course && course.modules.length > 0) {
      const firstModule = course.modules[0];
      if (firstModule.lessons.length > 0) {
        if (!currentModuleId) setCurrentModuleId(firstModule.id);
        if (!currentLessonId) setCurrentLessonId(firstModule.lessons[0].id);
        setExpandedModules(new Set([firstModule.id]));
      }
    }
  }, [course, currentModuleId, currentLessonId]);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (!courseId) return;
    
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    const savedCurrentLesson = localStorage.getItem(`current-lesson-${courseId}`);
    
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        setCompletedLessons(new Set(progressData.completedLessons || []));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }

    if (savedCurrentLesson) {
      try {
        const lessonData = JSON.parse(savedCurrentLesson);
        setCurrentModuleId(lessonData.moduleId);
        setCurrentLessonId(lessonData.lessonId);
        if (lessonData.moduleId) {
          setExpandedModules(prev => new Set(Array.from(prev).concat(lessonData.moduleId)));
        }
      } catch (error) {
        console.error('Error loading current lesson:', error);
      }
    }
  }, [courseId]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!courseId) return;
    
    const progressData = {
      completedLessons: Array.from(completedLessons),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(progressData));
  }, [completedLessons, courseId]);

  // Save current lesson to localStorage whenever it changes
  useEffect(() => {
    if (!courseId || !currentModuleId || !currentLessonId) return;
    
    const lessonData = {
      moduleId: currentModuleId,
      lessonId: currentLessonId,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`current-lesson-${courseId}`, JSON.stringify(lessonData));
  }, [currentModuleId, currentLessonId, courseId]);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getTotalProgress = () => {
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    return totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0;
  };

  const getModuleProgress = (moduleId: string) => {
    if (!course) return 0;
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completedInModule = module.lessons.filter(l => completedLessons.has(l.id)).length;
    return module.lessons.length > 0 ? Math.round((completedInModule / module.lessons.length) * 100) : 0;
  };

  const currentModule = course?.modules.find(m => m.id === currentModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set(Array.from(prev).concat(lessonId)));
  };

  const navigateToLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const getNextLesson = () => {
    if (!course || !currentModule) return null;
    
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId);
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex + 1].id
      };
    } else if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      return {
        moduleId: nextModule.id,
        lessonId: nextModule.lessons[0].id
      };
    }
    return null;
  };

  const getPrevLesson = () => {
    if (!course || !currentModule) return null;
    
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId);
    
    if (currentLessonIndex > 0) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex - 1].id
      };
    } else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      return {
        moduleId: prevModule.id,
        lessonId: prevModule.lessons[prevModule.lessons.length - 1].id
      };
    }
    return null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Kurzus betöltése...</h2>
          <p className="text-gray-600">Kérjük várjon, amíg betöltjük a kurzus tartalmát</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kurzus nem található
            </h2>
            
            <p className="text-gray-600 mb-6">
              A keresett kurzus nem elérhető vagy nem létezik.
            </p>
            
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              Vissza a főoldalra
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <CourseAccessGuard courseId={courseId}>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #2a3d54 50%, #466C95 100%)'
        }}
      >
        {/* Premium Header - Matching Homepage */}
        <header
          className="px-4 md:px-6 py-4 sticky top-0 z-30"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base hidden sm:block">Vissza a főoldalra</span>
                <span className="font-medium text-sm md:text-base sm:hidden">Vissza</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <h1 className="text-lg md:text-xl font-semibold text-white hidden lg:block">
                {course.title}
              </h1>
              <div
                className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                <span className="text-xs md:text-sm font-semibold text-white">
                  {getTotalProgress()}%
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Premium Glassmorphic Sidebar */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-0 md:inset-y-0 md:left-0 z-40 w-full md:w-96 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 mt-0 md:mt-0 shadow-xl md:shadow-none`}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              borderRight: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >

            <div className="h-full flex flex-col">
              {/* Premium Sidebar Header */}
              <div
                className="p-4 md:p-6 text-white relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden absolute top-4 right-4 z-20 p-2 bg-white/15 hover:bg-white/25 rounded-lg transition-colors"
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Ambient glow decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)'
                  }} />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)'
                  }} />
                
                <div className="relative z-10">
                  {/* Course Title and Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-teal-100 text-sm font-medium uppercase tracking-wide">
                        {course.category.name}
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold leading-tight mb-3">
                      {course.title}
                    </h2>
                    <p className="text-teal-100 text-xs md:text-sm leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Course Stats - Premium Cards */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                    <div
                      className="rounded-xl p-2 md:p-3 text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(20px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="text-base md:text-lg font-bold text-white">{course.modules.length}</div>
                      <div className="text-xs text-white/70">Modul</div>
                    </div>
                    <div
                      className="rounded-xl p-2 md:p-3 text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(20px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="text-base md:text-lg font-bold text-white">
                        {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                      </div>
                      <div className="text-xs text-white/70">Videó</div>
                    </div>
                    <div
                      className="rounded-xl p-2 md:p-3 text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(20px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="text-base md:text-lg font-bold text-white">
                        {Math.round(course.modules.reduce((acc, m) =>
                          acc + m.lessons.reduce((lessonAcc, l) => lessonAcc + (l.duration || 0), 0), 0) / 60)}
                      </div>
                      <div className="text-xs text-white/70">Perc</div>
                    </div>
                  </div>

                  {/* Premium Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">Előrehaladás</span>
                      <span className="text-sm font-bold text-white/90">{getTotalProgress()}%</span>
                    </div>
                    <div
                      className="rounded-full h-3 mb-2 overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${getTotalProgress()}%`,
                          background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.9) 0%, rgba(251, 146, 60, 0.9) 100%)',
                          boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)'
                        }}
                      />
                    </div>
                    <p className="text-white/70 text-xs">
                      {completedLessons.size} / {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lecke befejezve
                      {completedLessons.size > 0 && (
                        <span className="ml-2">🎯</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3">
                {course.modules.map((module, moduleIndex) => {
                  const isExpanded = expandedModules.has(module.id);
                  const moduleProgress = getModuleProgress(module.id);
                  const hasCurrentLesson = module.lessons.some(l => l.id === currentLessonId);

                  return (
                    <div
                      key={module.id}
                      className="rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                            style={{
                              background: hasCurrentLesson
                                ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(6, 182, 212, 0.8))'
                                : moduleProgress === 100
                                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(16, 185, 129, 0.8))'
                                : 'rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          >
                            {moduleProgress === 100 ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <span>{moduleIndex + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                              {moduleIndex + 1}. modul
                            </h3>
                            <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                              {module.title}
                            </p>
                            {/* Module Progress */}
                            <div className="mt-2">
                              <div
                                className="rounded-full h-1.5 overflow-hidden"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.2)',
                                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                                }}
                              >
                                <div
                                  className="h-1.5 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${moduleProgress}%`,
                                    background: moduleProgress === 100
                                      ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.9))'
                                      : 'linear-gradient(90deg, rgba(20, 184, 166, 0.9), rgba(6, 182, 212, 0.9))',
                                    boxShadow: '0 0 8px rgba(20, 184, 166, 0.4)'
                                  }}
                                />
                              </div>
                              <p className="text-xs text-white/60 mt-1">
                                {module.lessons.filter(l => completedLessons.has(l.id)).length}/{module.lessons.length} lecke
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 text-white/60 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                      
                      {/* Module Lessons */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <div className="p-2 space-y-1">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  navigateToLesson(module.id, lesson.id);
                                  if (window.innerWidth < 1024) setSidebarOpen(false);
                                }}
                                className="w-full text-left p-3 rounded-lg transition-all duration-200 group"
                                style={
                                  currentLessonId === lesson.id
                                    ? {
                                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(20, 184, 166, 0.4)',
                                        boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                      }
                                    : completedLessons.has(lesson.id)
                                    ? {
                                        background: 'rgba(34, 197, 94, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(34, 197, 94, 0.3)'
                                      }
                                    : {
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                      }
                                }
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={
                                      currentLessonId === lesson.id
                                        ? {
                                            background: 'rgba(255, 255, 255, 0.25)',
                                            color: 'white',
                                            border: '1px solid rgba(255, 255, 255, 0.3)'
                                          }
                                        : completedLessons.has(lesson.id)
                                        ? {
                                            background: 'rgba(34, 197, 94, 0.3)',
                                            color: 'rgb(34, 197, 94)',
                                            border: '1px solid rgba(34, 197, 94, 0.4)'
                                          }
                                        : {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)'
                                          }
                                    }
                                  >
                                    {completedLessons.has(lesson.id) ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : currentLessonId === lesson.id ? (
                                      <Play className="w-3 h-3" />
                                    ) : (
                                      <span>{lessonIndex + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium leading-tight mb-1 text-white">
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Clock className="w-3 h-3 text-white/60" />
                                      <span className="text-xs text-white/60">
                                        {Math.round((lesson.duration || 0) / 60)} perc
                                      </span>
                                      {lesson.type === 'VIDEO' && (
                                        <span
                                          className="text-xs px-2 py-0.5 rounded-full"
                                          style={{
                                            background: 'rgba(59, 130, 246, 0.2)',
                                            color: 'rgb(147, 197, 253)',
                                            border: '1px solid rgba(59, 130, 246, 0.3)'
                                          }}
                                        >
                                          Videó
                                        </span>
                                      )}
                                      {lesson.isFreePreview && (
                                        <span
                                          className="text-xs px-2 py-0.5 rounded-full"
                                          style={{
                                            background: 'rgba(34, 197, 94, 0.2)',
                                            color: 'rgb(134, 239, 172)',
                                            border: '1px solid rgba(34, 197, 94, 0.3)'
                                          }}
                                        >
                                          Ingyenes
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
                
                {/* PDF Sablonok Section */}
                <div
                  className="rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* PDF Section Header */}
                  <button
                    onClick={() => setPdfSectionExpanded(!pdfSectionExpanded)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.8), rgba(239, 68, 68, 0.8))',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(249, 115, 22, 0.3)'
                        }}
                      >
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                          PDF Sablonok (7)
                        </h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                          Letölthető AI prompt sablonok
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 text-white/60 transition-transform duration-200 ${
                      pdfSectionExpanded ? 'rotate-90' : ''
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                  
                  {/* PDF List */}
                  {pdfSectionExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <div className="p-2 space-y-1">
                        {[
                          { name: 'Blogposzt generátor', url: 'https://drive.google.com/file/d/1jw4_izUgnQHpnWDUswOCbKH0h6gkltcf/view?usp=sharing' },
                          { name: 'Bulletpoint generátor', url: 'https://drive.google.com/file/d/13adEI925qZLbmtnnWKUrhggkH5fhDVMC/view?usp=sharing' },
                          { name: 'Buyer persona generátor', url: 'https://drive.google.com/file/d/1dfaiqQBV6hOOz_Iz1sANStfyNJvqGCMy/view?usp=sharing' },
                          { name: 'Buyer persona', url: 'https://drive.google.com/file/d/1N8WaQQvskCiutXYPOD089leAhhMXijW3/view?usp=sharing' },
                          { name: 'Email marketing generátor', url: 'https://drive.google.com/file/d/1PnfgOCkNT29s6I4p5vJVAvKjaedrdffw/view?usp=sharing' },
                          { name: 'Facebook ads copy generátor', url: 'https://drive.google.com/file/d/1yCLa-UhSzdlxBsGzz3JkrNtXirPQ8jJV/view?usp=sharing' },
                          { name: 'Közösségi média poszt generátor', url: 'https://drive.google.com/file/d/1M9eSYzQd7qkTy1KhBkLkBNwmV-x7XErE/view?usp=sharing' }
                        ].map((pdf, index) => (
                          <a
                            key={index}
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center gap-3"
                            style={{
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
                              e.currentTarget.style.border = '1px solid rgba(249, 115, 22, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                            }}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{
                                background: 'rgba(249, 115, 22, 0.2)',
                                color: 'rgb(251, 146, 60)',
                                border: '1px solid rgba(249, 115, 22, 0.3)'
                              }}
                            >
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight mb-1 text-white">
                                {pdf.name}.pdf
                              </p>
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    background: 'rgba(249, 115, 22, 0.2)',
                                    color: 'rgb(251, 146, 60)',
                                    border: '1px solid rgba(249, 115, 22, 0.3)'
                                  }}
                                >
                                  PDF
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Backdrop */}
          {sidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50" 
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Premium Main Content */}
          <main className="flex-1 md:ml-0 min-h-screen">
            <div className="p-4 md:p-6 max-w-5xl mx-auto">
              {/* Premium Lesson Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-xs md:text-sm mb-3">
                  <span
                    className="px-3 md:px-4 py-1.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(20, 184, 166, 0.2)',
                      color: 'rgb(94, 234, 212)',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {currentModule?.title}
                  </span>
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {currentLesson?.title}
                </h1>
                {currentLesson?.description && (
                  <p className="text-white/70 text-sm md:text-lg leading-relaxed">
                    {currentLesson.description}
                  </p>
                )}
              </div>

              {/* Premium Video Content */}
              {currentLesson?.type === 'VIDEO' && currentLesson.videoUrl && (
                <div
                  className="rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="relative">
                    {/* Video Container with Premium Frame */}
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
                        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <iframe
                        src={currentLesson.videoUrl}
                        style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        className="rounded-xl"
                      />
                    </div>

                    {/* Premium Video Info */}
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <div
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Clock className="w-4 h-4 text-white/80" />
                          <span className="text-xs md:text-sm font-medium text-white/90">
                            {Math.round((currentLesson.duration || 0) / 60)} perc
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Play className="w-4 h-4 text-white/80" />
                          <span className="text-xs md:text-sm font-medium text-white/90">HD videó</span>
                        </div>
                      </div>

                      {!completedLessons.has(currentLessonId) && (
                        <button
                          onClick={() => markLessonComplete(currentLessonId)}
                          className="px-4 md:px-6 py-2 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base"
                          style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.9))',
                            color: 'white',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          }}
                        >
                          ✓ Lecke befejezése
                        </button>
                      )}

                      {completedLessons.has(currentLessonId) && (
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-xl"
                          style={{
                            background: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            color: 'rgb(134, 239, 172)'
                          }}
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Befejezve</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Premium Lesson Navigation */}
              <div
                className="rounded-xl md:rounded-2xl p-4 md:p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                  <button
                    onClick={() => {
                      const prev = getPrevLesson();
                      if (prev) {
                        navigateToLesson(prev.moduleId, prev.lessonId);
                        setExpandedModules(new Set(Array.from(expandedModules).concat(prev.moduleId)));
                      }
                    }}
                    disabled={!getPrevLesson()}
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm md:text-base w-full md:w-auto justify-center font-medium text-white/90"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (getPrevLesson()) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Előző lecke</span>
                  </button>

                  {/* Premium Progress Indicator */}
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-white/60 mb-1">Kurzus előrehaladás</div>
                    <div className="text-xl md:text-2xl font-bold text-white">{getTotalProgress()}%</div>
                  </div>

                  <button
                    onClick={() => {
                      const next = getNextLesson();
                      if (next) {
                        navigateToLesson(next.moduleId, next.lessonId);
                        setExpandedModules(new Set(Array.from(expandedModules).concat(next.moduleId)));
                      }
                    }}
                    disabled={!getNextLesson()}
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm md:text-base w-full md:w-auto justify-center font-medium"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(6, 182, 212, 0.9))',
                      color: 'white',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                      boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (getNextLesson()) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(20, 184, 166, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 184, 166, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <span>Következő lecke</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Lesson Completion Status */}
                {!completedLessons.has(currentLessonId) && (
                  <div
                    className="mt-6 pt-4 text-center"
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <p className="text-white/70 text-sm mb-3">
                      Fejezd be ezt a leckét a folytatáshoz
                    </p>
                    <div
                      className="rounded-full h-2 mb-3 overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div
                        className="h-2 rounded-full w-0 animate-pulse"
                        style={{
                          background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.9), rgba(6, 182, 212, 0.9))',
                          boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </CourseAccessGuard>
  );
}