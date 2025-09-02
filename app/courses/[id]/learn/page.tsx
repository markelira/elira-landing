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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
        {/* Enhanced Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 md:px-6 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base hidden sm:block">Vissza a főoldalra</span>
                <span className="font-medium text-sm md:text-base sm:hidden">Vissza</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 hidden lg:block">
                {course.title}
              </h1>
              <div className="flex items-center gap-2 md:gap-3 bg-teal-50 px-2 md:px-4 py-1 md:py-2 rounded-full border border-teal-200">
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-teal-600" />
                <span className="text-xs md:text-sm font-semibold text-teal-700">
                  {getTotalProgress()}%
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Enhanced Sidebar */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-0 md:inset-y-0 md:left-0 z-40 w-full md:w-96 bg-gradient-to-b from-white to-gray-50/50 md:border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 mt-0 md:mt-0 shadow-xl md:shadow-none`}>
            
            <div className="h-full flex flex-col">
              {/* Enhanced Sidebar Header */}
              <div className="p-4 md:p-6 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 text-white relative overflow-hidden">
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
                
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

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-2 md:p-3 text-center backdrop-blur-sm">
                      <div className="text-base md:text-lg font-bold text-white">{course.modules.length}</div>
                      <div className="text-xs text-teal-100">Modul</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 md:p-3 text-center backdrop-blur-sm">
                      <div className="text-base md:text-lg font-bold text-white">
                        {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                      </div>
                      <div className="text-xs text-teal-100">Videó</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 md:p-3 text-center backdrop-blur-sm">
                      <div className="text-base md:text-lg font-bold text-white">
                        {Math.round(course.modules.reduce((acc, m) => 
                          acc + m.lessons.reduce((lessonAcc, l) => lessonAcc + (l.duration || 0), 0), 0) / 60)}
                      </div>
                      <div className="text-xs text-teal-100">Perc</div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">Előrehaladás</span>
                      <span className="text-sm font-bold text-teal-100">{getTotalProgress()}%</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3 mb-2 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-yellow-300 to-orange-300 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${getTotalProgress()}%` }}
                      />
                    </div>
                    <p className="text-teal-100 text-xs">
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
                    <div key={module.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                            hasCurrentLesson 
                              ? 'bg-gradient-to-r from-teal-500 to-cyan-500'
                              : moduleProgress === 100
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}>
                            {moduleProgress === 100 ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <span>{moduleIndex + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                              {moduleIndex + 1}. modul
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                              {module.title}
                            </p>
                            {/* Module Progress */}
                            <div className="mt-2">
                              <div className="bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    moduleProgress === 100 ? 'bg-green-500' : 'bg-teal-500'
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
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                                    : completedLessons.has(lesson.id)
                                    ? 'bg-green-50 border border-green-200 hover:bg-green-100 text-green-900'
                                    : 'hover:bg-gray-50 text-gray-700'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                    currentLessonId === lesson.id
                                      ? 'bg-white/20 text-white'
                                      : completedLessons.has(lesson.id)
                                      ? 'bg-green-200 text-green-700'
                                      : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                                  }`}>
                                    {completedLessons.has(lesson.id) ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : currentLessonId === lesson.id ? (
                                      <Play className="w-3 h-3" />
                                    ) : (
                                      <span>{lessonIndex + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium leading-tight mb-1 ${
                                      currentLessonId === lesson.id ? 'text-white' : ''
                                    }`}>
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Clock className={`w-3 h-3 ${
                                        currentLessonId === lesson.id ? 'text-white/80' : 'text-gray-500'
                                      }`} />
                                      <span className={`text-xs ${
                                        currentLessonId === lesson.id ? 'text-white/80' : 'text-gray-500'
                                      }`}>
                                        {Math.round((lesson.duration || 0) / 60)} perc
                                      </span>
                                      {lesson.type === 'VIDEO' && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          currentLessonId === lesson.id 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                          Videó
                                        </span>
                                      )}
                                      {lesson.isFreePreview && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          currentLessonId === lesson.id 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-green-100 text-green-700'
                                        }`}>
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
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                  {/* PDF Section Header */}
                  <button
                    onClick={() => setPdfSectionExpanded(!pdfSectionExpanded)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm bg-gradient-to-r from-orange-500 to-red-500">
                        <FileText className="w-6 h-6" />
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
                            className="w-full text-left p-3 rounded-lg transition-all duration-200 group hover:bg-orange-50 text-gray-700 flex items-center gap-3"
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 bg-orange-100 text-orange-700 group-hover:bg-orange-200">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight mb-1">
                                {pdf.name}.pdf
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
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

          {/* Enhanced Main Content */}
          <main className="flex-1 md:ml-0 min-h-screen">
            <div className="p-4 md:p-6 max-w-5xl mx-auto">
              {/* Lesson Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-xs md:text-sm text-teal-600 mb-3">
                  <span className="bg-teal-100 px-2 md:px-3 py-1 rounded-full font-medium">
                    {currentModule?.title}
                  </span>
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  {currentLesson?.title}
                </h1>
                {currentLesson?.description && (
                  <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                    {currentLesson.description}
                  </p>
                )}
              </div>

              {/* Video Content */}
              {currentLesson?.type === 'VIDEO' && currentLesson.videoUrl && (
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200/50 p-4 md:p-8 mb-6 md:mb-8">
                  <div className="relative">
                    {/* Video Container */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl">
                      <iframe
                        src={currentLesson.videoUrl}
                        style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        className="rounded-xl"
                      />
                    </div>
                    
                    {/* Video Info */}
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs md:text-sm font-medium">
                            {Math.round((currentLesson.duration || 0) / 60)} perc
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Play className="w-4 h-4" />
                          <span className="text-xs md:text-sm font-medium">HD videó</span>
                        </div>
                      </div>
                      
                      {!completedLessons.has(currentLessonId) && (
                        <button
                          onClick={() => markLessonComplete(currentLessonId)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 md:px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
                        >
                          ✓ Lecke befejezése
                        </button>
                      )}
                      
                      {completedLessons.has(currentLessonId) && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Befejezve</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Lesson Navigation */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200/50 p-4 md:p-6">
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
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base w-full md:w-auto justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="font-medium">Előző lecke</span>
                  </button>

                  {/* Progress Indicator */}
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-gray-600 mb-1">Kurzus előrehaladás</div>
                    <div className="text-xl md:text-2xl font-bold text-teal-600">{getTotalProgress()}%</div>
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
                    className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base w-full md:w-auto justify-center"
                  >
                    <span className="font-medium">Következő lecke</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Lesson Completion Status */}
                {!completedLessons.has(currentLessonId) && (
                  <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <p className="text-gray-600 text-sm mb-3">
                      Fejezd be ezt a leckét a folytatáshoz
                    </p>
                    <div className="bg-gray-100 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full w-0 animate-pulse" />
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