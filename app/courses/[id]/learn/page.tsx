'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tartalom betöltése</h2>
          <p className="text-gray-600 text-sm">Kérjük várjon...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Program nem található
            </h2>

            <p className="text-gray-600 mb-6">
              A keresett program nem elérhető vagy nem létezik.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200"
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
      <div className="min-h-screen bg-gray-50">
        {/* Clean Professional Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between max-w-[1800px] mx-auto">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base hidden sm:block">Vissza a főoldalra</span>
                <span className="font-medium text-sm md:text-base sm:hidden">Vissza</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <h1 className="text-base md:text-lg font-semibold text-gray-900 hidden lg:block max-w-md truncate">
                {course.title}
              </h1>
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  {getTotalProgress()}%
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex max-w-[1800px] mx-auto w-full">
          {/* Clean Professional Sidebar */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-0 lg:inset-y-0 lg:left-0 z-40 w-full md:w-96 lg:w-[380px] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl lg:shadow-none bg-white lg:border-r lg:border-gray-200`}
          >

            <div className="h-full flex flex-col">
              {/* Clean Sidebar Header */}
              <div className="p-4 md:p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden absolute top-4 right-4 z-20 p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors shadow-sm border border-gray-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Course Title and Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-blue-700 text-sm font-medium uppercase tracking-wide">
                      {course.category.name}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                {/* Course Stats - Clean Cards */}
                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                  <div className="rounded-xl p-2 md:p-3 text-center bg-white border border-gray-200 shadow-sm">
                    <div className="text-base md:text-lg font-bold text-gray-900">{course.modules.length}</div>
                    <div className="text-xs text-gray-600">Modul</div>
                  </div>
                  <div className="rounded-xl p-2 md:p-3 text-center bg-white border border-gray-200 shadow-sm">
                    <div className="text-base md:text-lg font-bold text-gray-900">
                      {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                    </div>
                    <div className="text-xs text-gray-600">Videó</div>
                  </div>
                  <div className="rounded-xl p-2 md:p-3 text-center bg-white border border-gray-200 shadow-sm">
                    <div className="text-base md:text-lg font-bold text-gray-900">
                      {Math.round(course.modules.reduce((acc, m) =>
                        acc + m.lessons.reduce((lessonAcc, l) => lessonAcc + (l.duration || 0), 0), 0) / 60)}
                    </div>
                    <div className="text-xs text-gray-600">Perc</div>
                  </div>
                </div>

                {/* Clean Progress Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Előrehaladás</span>
                    <span className="text-sm font-bold text-gray-900">{getTotalProgress()}%</span>
                  </div>
                  <div className="rounded-full h-2.5 mb-2 overflow-hidden bg-gray-200">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500 bg-blue-500"
                      style={{ width: `${getTotalProgress()}%` }}
                    />
                  </div>
                  <p className="text-gray-600 text-xs">
                    {completedLessons.size} / {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lecke befejezve
                  </p>
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
                      className="rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-sm hover:shadow-md"
                    >
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-sm ${
                              hasCurrentLesson
                                ? 'bg-blue-500 text-white'
                                : moduleProgress === 100
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {moduleProgress === 100 ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-sm">{moduleIndex + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                              Modul {moduleIndex + 1}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                              {module.title}
                            </p>
                            {/* Module Progress */}
                            <div className="mt-2">
                              <div className="rounded-full h-1.5 overflow-hidden bg-gray-200">
                                <div
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    moduleProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${moduleProgress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {module.lessons.filter(l => completedLessons.has(l.id)).length}/{module.lessons.length} lecke
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </button>
                      
                      {/* Module Lessons */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-gray-100"
                        >
                          <div className="p-2 space-y-1">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  navigateToLesson(module.id, lesson.id);
                                  if (window.innerWidth < 1024) setSidebarOpen(false);
                                }}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                                  currentLessonId === lesson.id
                                    ? 'bg-blue-50 border border-blue-200 shadow-sm'
                                    : completedLessons.has(lesson.id)
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                      currentLessonId === lesson.id
                                        ? 'bg-blue-500 text-white'
                                        : completedLessons.has(lesson.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
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
                                    <p className="text-sm font-medium leading-tight mb-1 text-gray-900">
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Clock className="w-3 h-3 text-gray-500" />
                                      <span className="text-xs text-gray-600">
                                        {Math.round((lesson.duration || 0) / 60)} perc
                                      </span>
                                      {lesson.type === 'VIDEO' && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                                          Videó
                                        </span>
                                      )}
                                      {lesson.isFreePreview && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
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
                <div className="rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-sm hover:shadow-md">
                  {/* PDF Section Header */}
                  <button
                    onClick={() => setPdfSectionExpanded(!pdfSectionExpanded)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600 shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                          PDF Sablonok (7)
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Letölthető AI prompt sablonok
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                      pdfSectionExpanded ? 'rotate-90' : ''
                    }`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                  
                  {/* PDF List */}
                  {pdfSectionExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-100"
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
                            className="w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-center gap-3 bg-gray-50 border border-gray-200 hover:bg-orange-50 hover:border-orange-200"
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-orange-100 text-orange-600">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight mb-1 text-gray-900">
                                {pdf.name}.pdf
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
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

          {/* Clean Main Content */}
          <main className="flex-1 md:ml-0 min-h-screen">
            <div className="p-4 md:p-6 max-w-5xl mx-auto">
              {/* Clean Lesson Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-xs md:text-sm mb-3">
                  <span className="px-3 md:px-4 py-1.5 rounded-full font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    {currentModule?.title}
                  </span>
                </div>
                <h1 className="text-xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6 leading-tight">
                  {currentLesson?.title}
                </h1>
                {currentLesson?.description && (
                  <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                    {currentLesson.description}
                  </p>
                )}
              </div>

              {/* Clean Video Content */}
              {currentLesson?.type === 'VIDEO' && currentLesson.videoUrl && (
                <div className="rounded-2xl p-6 md:p-8 mb-6 md:mb-8 bg-white border border-gray-200 shadow-sm">
                  <div className="relative">
                    {/* Video Container */}
                    <div className="rounded-xl overflow-hidden shadow-lg bg-black">
                      <iframe
                        src={currentLesson.videoUrl}
                        style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        className="rounded-xl"
                      />
                    </div>

                    {/* Video Info */}
                    <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {Math.round((currentLesson.duration || 0) / 60)} perc
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200">
                          <Play className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">HD videó</span>
                        </div>
                      </div>

                      {!completedLessons.has(currentLessonId) && (
                        <button
                          onClick={() => markLessonComplete(currentLessonId)}
                          className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm md:text-base bg-green-500 text-white hover:bg-green-600 shadow-sm"
                        >
                          ✓ Lecke befejezése
                        </button>
                      )}

                      {completedLessons.has(currentLessonId) && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 text-green-700 border border-green-200">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Befejezve</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Clean Lesson Navigation */}
              <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      const prev = getPrevLesson();
                      if (prev) {
                        navigateToLesson(prev.moduleId, prev.lessonId);
                        setExpandedModules(new Set(Array.from(expandedModules).concat(prev.moduleId)));
                      }
                    }}
                    disabled={!getPrevLesson()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm md:text-base w-full sm:w-auto justify-center font-medium bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Előző lecke</span>
                  </button>

                  {/* Progress Indicator */}
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-gray-600 mb-1">Előrehaladás</div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{getTotalProgress()}%</div>
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm md:text-base w-full sm:w-auto justify-center font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                  >
                    <span>Következő lecke</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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