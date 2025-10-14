'use client';

import React, { useState, useEffect } from 'react'
import { VideoPreviewModal } from './VideoPreviewModal'
import PurchaseButton from './PurchaseButton'
import TestimonialsSection from '@/components/sales/TestimonialsSection'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Info, Users, MessageSquare, Award, ShoppingCart, PlayCircle, Clock, Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Target, CheckCircle, Wrench, Search, Heart, Rocket, GraduationCap, Building2, Lightbulb, LinkedinIcon } from 'lucide-react'

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
    { id: 'curriculum' as TabType, label: 'Kurzus tartalma', icon: BookOpen },
    { id: 'instructor' as TabType, label: 'Oktató', icon: Users },
  ]
  
  return (
    <div className="min-h-screen bg-white">
      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={courseData.previewVideoUrl}
        courseTitle={courseData.title}
      />

      {/* Hero Section - Modern Glassmorphic Style */}
      <section
        className="relative overflow-hidden -mt-20 pt-20"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
        }}
      >
        
        <div className="relative container max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">

            {/* Modern Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              {/* Category Badge - Modern Style */}
              {courseData.category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
                     style={{
                       background: 'rgba(255, 255, 255, 0.1)',
                       backdropFilter: 'blur(20px) saturate(150%)',
                       WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                       border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-white text-sm font-medium uppercase tracking-wider">Masterclass</span>
                </div>
              )}

              {/* Title - Modern Typography */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-white px-2 sm:px-0">
                {courseData.title}
              </h1>

              {/* Description - Modern Style */}
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                {courseData.shortDescription || courseData.description?.substring(0, 200) + '...'}
              </p>
            </motion.div>
            
            {/* Modern Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">

              {/* Instructor Card - Modern Glassmorphic Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white/20 shadow-lg">
                  <img
                    src="/IMG_5730.JPG"
                    alt="Somosi Zoltán profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Oktató</p>
                  <p className="font-semibold text-white text-sm">
                    Somosi Zoltán
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Marketing Specialista & Doktorandusz
                  </p>
                </div>
              </motion.div>

              {/* Course Statistics - Modern Format */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 border border-purple-400/30 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-200" />
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Tananyag</p>
                  <p className="font-semibold text-white text-sm">
                    {courseData.stats?.modules || 0} modul
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-teal-500/20 border border-teal-400/30 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-200" />
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Időtartam</p>
                  <p className="font-semibold text-white text-sm">
                    30 nap
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* DWY Service Callout - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border"
                   style={{
                     background: 'rgba(255, 255, 255, 0.08)',
                     borderColor: 'rgba(255, 255, 255, 0.2)'
                   }}>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p className="text-white text-sm font-medium">Tartalmazza a "Veled csináljuk" szakértői támogatást</p>
              </div>
            </motion.div>

            {/* Modern CTA & Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Modern CTA */}
              <PurchaseButton
                course={{
                  id: courseData.id,
                  title: courseData.title,
                  price: courseData.price || 89990,
                  currency: courseData.currency || 'HUF'
                }}
                className="px-12 py-4 text-lg"
              />

              {/* Modern Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                     style={{
                       background: 'rgba(255, 255, 255, 0.08)',
                       backdropFilter: 'blur(20px)',
                       border: '1px solid rgba(255, 255, 255, 0.18)'
                     }}>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">30 napos garancia</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                     style={{
                       background: 'rgba(255, 255, 255, 0.08)',
                       backdropFilter: 'blur(20px)',
                       border: '1px solid rgba(255, 255, 255, 0.18)'
                     }}>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Élethosszig elérhető</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Tab Navigation - Modern Glassmorphic Style */}
      <div className="sticky top-20 z-40 shadow-md"
           style={{
             background: 'rgba(255, 255, 255, 0.9)',
             backdropFilter: 'blur(20px) saturate(150%)',
             WebkitBackdropFilter: 'blur(20px) saturate(150%)',
             borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
           }}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile: Horizontal scroll, Desktop: Centered */}
          <div className="flex sm:justify-center overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 sm:space-x-8 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 sm:py-5 px-4 sm:px-6 border-b-3 transition-all font-medium whitespace-nowrap min-w-[120px] sm:min-w-auto justify-center
                      ${activeTab === tab.id
                        ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                        : 'border-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-50/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-semibold">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area - Modern Layout */}
      <div className="container max-w-7xl mx-auto px-6 py-12 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {activeTab === 'overview' && <OverviewTab course={courseData} />}
              {activeTab === 'curriculum' && <CurriculumTab course={courseData} />}
              {activeTab === 'instructor' && <InstructorTab course={courseData} />}
            </div>
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

// Modern Overview Tab Component
function OverviewTab({ course }: { course: any }) {
  return (
    <div className="space-y-12">
      {/* Course Description - Modern Style */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">A kurzusról</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Miről szól ez a kurzus?</h2>
        </motion.div>
        <div className="bg-gray-50 border-l-4 border-gray-900 rounded-r-lg p-8">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {course.description}
          </p>
        </div>
      </section>

      {/* DWY Service Integration - Minimal Professional */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">Mit tartalmaz</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Kurzus + "Veled csináljuk" szolgáltatás</h2>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <p className="text-gray-700 leading-relaxed mb-6">
            Ez nem csak egy kurzus. A beiratkozással hozzáférést kapsz a <span className="font-semibold">"Veled csináljuk" (DWY)</span> szolgáltatáshoz is, ahol <span className="font-semibold">4 heti, egyenként 1 órás konzultáción</span> dolgozunk közösen a te céljaidhoz és vállalkozásodhoz igazított stratégián, és konkrét teendőkkel (to-do lista) távozhatsz minden alkalommal.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">4×</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">4 hetes strukturált program</p>
                <p className="text-sm text-gray-600">Heti 1 óra személyes konzultáció szakértővel</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Teljes kurzus anyag</p>
                <p className="text-sm text-gray-600">Összes modul, videó és PDF sablon</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Személyre szabott stratégia</p>
                <p className="text-sm text-gray-600">A te céljaidhoz és vállalkozásodhoz igazítva</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Konkrét teendők (to-do)</p>
                <p className="text-sm text-gray-600">Egyértelmű akciótervvel minden meeting után</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Kitöltött sablonok</p>
                <p className="text-sm text-gray-600">Kampánysablonok a te termékedre adaptálva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview - Modern Style */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">Kurzus bemutató</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Nézd meg a bemutató videót</h2>
        </motion.div>

        {/* Modern Video Frame */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Video Title */}
          <div className="bg-gray-50 border-b border-gray-200 p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">🧠 Olvass a vevőid gondolataiban</h4>
            <p className="text-sm text-gray-600">Ingyenes bemutató előadás</p>
          </div>

          {/* Video Player */}
          <div className="relative bg-black">
            <iframe
              src="https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg?metadata-video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81&video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81"
              style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          </div>

          {/* Video Meta */}
          <div className="p-6 flex flex-wrap items-center justify-center gap-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">5.0</span>
            </div>
            <div className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              +7 ingyenes PDF sablon
            </div>
          </div>
        </div>
      </section>
      
      {/* Learning Objectives - Modern Style */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">Eredmények</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Mit kapsz a programmal?</h2>
        </motion.div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Pontosan tudod ki a vevőd és mit akar hallani tőled',
              'Működő kampánysablonok kitöltve a te termékeidre',
              'Üzeneteid ugyanazt a vevői nyelvet beszélik minden platformon',
              'Email folyamatok, amik automatikusan konvertálnak',
              'Social media tartalom 30 napra előre elkészítve',
              'Landing oldalak, amik valóban eladnak'
            ].map((objective, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 leading-relaxed">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Student Testimonials - Academic Version */}
      <CourseTestimonialsSection />
      
    </div>
  )
}

// Modern Curriculum Tab Component
function CurriculumTab({ course }: { course: any }) {
  const [activeModule, setActiveModule] = useState<string>('1');

  const modules = [
    {
      id: '1',
      number: 1,
      title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
      shortTitle: 'Vevő kapcsolat építés',
      icon: Users,
      description: 'A kommunikációdban mindig te vagy a főhős, nem a vevő. Találd meg a közös nevezőt a vevőddel.',
      duration: '4 perc',
      totalLessons: 1,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      learningObjectives: [
        'Vevőközpontú kommunikáció kialakítása',
        'Kommunikáció megfordításának technikája',
        'Empátia szerepe az értékesítésben',
        'Bizalomépítési stratégiák'
      ],
      lessons: [
        { id: 'lesson-1-1', title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt, hogy a vevő azt mondja: „Pont ő kell nekem"', duration: '4 perc', type: 'video' }
      ]
    },
    {
      id: '2',
      number: 2,
      title: 'Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak',
      shortTitle: 'Célzott kommunikáció',
      icon: Target,
      description: 'Pontos célzás és célcsoport meghatározás AI eszközökkel.',
      duration: '12 perc',
      totalLessons: 3,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      learningObjectives: [
        'Célcsoport pontos meghatározása',
        'Vásárlói szándék felismerése',
        'Piackutatás és trendanalízis',
        'Vevői megértés összegzése'
      ],
      lessons: [
        { id: 'lesson-2-1', title: 'Pontos célzás, biztos találat - találj célba a célcsoportodnál', duration: '4 perc', type: 'video' },
        { id: 'lesson-2-2', title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?', duration: '4 perc', type: 'video' },
        { id: 'lesson-2-3', title: 'Összefoglalás - a legfontosabb vevői insightok', duration: '4 perc', type: 'video' }
      ]
    },
    {
      id: '3',
      number: 3,
      title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
      shortTitle: 'Buyer persona készítés',
      icon: Search,
      description: 'Buyer persona készítés és piackutatás AI eszközökkel.',
      duration: '9 perc',
      totalLessons: 1,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      learningObjectives: [
        'Komplett buyer persona kidolgozása',
        'ChatGPT használata kutatáshoz',
        'Valós adatok alkalmazása',
        'Automatikus profil generálás'
      ],
      lessons: [
        { id: 'lesson-3-1', title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel, valós adatokból', duration: '9 perc', type: 'video' }
      ]
    },
    {
      id: '4',
      number: 4,
      title: 'Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon',
      shortTitle: 'Érzelmi copywriting',
      icon: Heart,
      description: 'Pszichológiai triggerek és érzelmi copywriting technikák.',
      duration: '12 perc',
      totalLessons: 5,
      color: 'bg-rose-50 border-rose-200 text-rose-700',
      learningObjectives: [
        'Érzelmi kapcsolat kialakítása',
        'Előnyök kommunikációja',
        'Vásárlói út megértése',
        'Értékajánlat készítés AI-val'
      ],
      lessons: [
        { id: 'lesson-4-1', title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót!', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-2', title: 'Használd a „Na és?" technikát, hogy eljuss az előnyökhöz', duration: '1 perc', type: 'video' },
        { id: 'lesson-4-3', title: 'Vevői elkötelezettség fázisai', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-4', title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-5', title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból', duration: '5 perc', type: 'video' }
      ]
    },
    {
      id: '5',
      number: 5,
      title: 'Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra',
      shortTitle: 'AI gyakorlati alkalmazások',
      icon: Rocket,
      description: 'Gyakorlati AI eszközök és generátorok használata.',
      duration: '18 perc',
      totalLessons: 7,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
      learningObjectives: [
        'Social media automatizáció',
        'Email marketing AI technikák',
        'Facebook Ads optimalizáció',
        'SEO tartalom generálás'
      ],
      lessons: [
        { id: 'lesson-5-1', title: 'Személyre szabott közösségi média poszt készítése 3 perc alatt', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-2', title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes', duration: '5 perc', type: 'video' },
        { id: 'lesson-5-3', title: 'Személyre szabott Facebook hirdetés 2 perc alatt', duration: '2 perc', type: 'video' },
        { id: 'lesson-5-4', title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-5', title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-6', title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírlevel spam-be', duration: '1 perc', type: 'video' },
        { id: 'lesson-5-7', title: 'Befejezés, köszönet!', duration: '1 perc', type: 'video' }
      ]
    },
    {
      id: '6',
      number: 6,
      title: 'Letölthető PDF-ek / sablonok',
      shortTitle: 'PDF sablonok',
      icon: BookOpen,
      description: '7 gyakorlati sablon és útmutató - azonnal letölthető és használható generátorok az AI-copywriting elsajátításához.',
      duration: 'Azonnali hozzáférés',
      totalLessons: 7,
      color: 'bg-teal-50 border-teal-200 text-teal-700',
      type: 'resource',
      learningObjectives: [
        'Blogposzt generátor használata',
        'Bulletpoint készítés AI-val',
        'Buyer persona kidolgozás',
        'Email marketing automatizáció'
      ],
      lessons: [
        { id: 'pdf-1', title: 'Blogposzt generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-2', title: 'Bulletpoint generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-3', title: 'Buyer persona generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-4', title: 'Buyer persona.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-5', title: 'Email marketing generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-6', title: 'Facebook ads copy generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-7', title: 'Közösségi média poszt generátor.pdf', duration: 'PDF', type: 'project' }
      ]
    }
  ];

  const activeModuleData = modules.find(module => module.id === activeModule) || modules[0];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      case 'project': return <Wrench className="w-4 h-4" />;
      default: return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Modern Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
          <span className="text-gray-700 text-sm font-medium">Kurzus tartalma</span>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Mit fogsz tanulni?</h2>
      </motion.div>

      {/* Main Modern Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-5 gap-0 min-h-[650px]">
        
        {/* Left Sidebar - Modern Module List */}
        <div className="lg:col-span-2 bg-gray-50 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">

          {/* Mobile: Modern Module Selector */}
          <div className="lg:hidden mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Válassz modult:
            </label>
            <select
              value={activeModule}
              onChange={(e) => setActiveModule(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-white"
            >
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.type === 'resource' ? '📜 ' : 'Modul '}{module.number}: {module.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Modern Module List Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 hidden lg:block"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tananyag modulok</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Válasszon modult a részletes tanterv megtekintéséhez</p>
          </motion.div>

          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveModule(module.id)}
              className={`
                cursor-pointer rounded-lg border transition-all duration-300 hover:shadow-md hidden lg:block mb-3 last:mb-0 group p-4
                ${activeModule === module.id
                  ? 'bg-purple-50 border-2 border-purple-400 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-105
                  ${activeModule === module.id ? 'bg-purple-100 border-purple-400' : 'border-gray-300 bg-white'}
                `}>
                  <module.icon className={`w-5 h-5 transition-all duration-300 ${activeModule === module.id ? 'text-purple-700' : 'text-gray-600 group-hover:text-purple-600'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${activeModule === module.id ? 'text-purple-700' : 'text-gray-600'}`}>
                      {module.type === 'resource' ? '📜 Sablonok' : `${module.number}. modul`}
                    </span>
                  </div>

                  <h4 className={`font-medium mb-2 text-sm leading-tight transition-colors duration-300 ${activeModule === module.id ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'}`}>
                    {module.shortTitle}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{module.totalLessons} {module.type === 'resource' ? 'sablon' : 'lecke'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side - Modern Content Area (60% width) */}
        <div className="lg:col-span-3 p-6 lg:p-8 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >

              {/* Modern Module Header */}
              <div className="mb-6">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl border-2 border-purple-400 bg-purple-50 flex items-center justify-center shadow-sm">
                      <activeModuleData.icon className="w-7 h-7 text-purple-700" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                        {activeModuleData.type === 'resource' ? '📜 Sablonok' : `${activeModuleData.number}. modul`}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 leading-tight mb-3">
                    {activeModuleData.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {activeModuleData.description}
                  </p>
                </div>

                {/* Modern Module Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-3xl font-bold text-purple-700 mb-1">{activeModuleData.totalLessons}</div>
                    <div className="text-xs text-gray-700 font-semibold uppercase tracking-wider">{activeModuleData.type === 'resource' ? 'Sablon' : 'Lecke'}</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-3xl font-bold text-teal-700 mb-1">{activeModuleData.duration}</div>
                    <div className="text-xs text-gray-700 font-semibold uppercase tracking-wider">{activeModuleData.type === 'resource' ? 'Hozzáférés' : 'Időtartam'}</div>
                  </div>
                </div>
              </div>

              {/* Modern Learning Objectives */}
              <div className="mb-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Tanulási célkitűzések
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeModuleData.learningObjectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-lg border border-purple-200 hover:shadow-sm hover:border-purple-300 transition-all duration-300"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{objective}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modern Lesson Breakdown */}
              <div className="mb-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    {activeModuleData.type === 'resource' ? 'Sablonok részletesen' : 'Tanterv részletesen'}
                  </h4>
                </div>
                <div className="space-y-3">
                  {activeModuleData.lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                        {getLessonIcon(lesson.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 text-sm leading-tight mb-2 group-hover:text-purple-700 transition-colors">{lesson.title}</h5>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </span>
                          <span className="capitalize">
                            {lesson.type === 'video' ? 'Videó előadás' :
                             lesson.type === 'quiz' ? 'Értékelés' : 'Sablon'}
                          </span>
                        </div>
                      </div>

                      {/* Check mark would go here if lesson completion tracking is enabled */}
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </div>
  )
}

// Modern Instructor Tab Component
function InstructorTab({ course }: { course: any }) {
  return (
    <div className="space-y-8">
      {/* Modern Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
          <span className="text-gray-700 text-sm font-medium">Az oktató</span>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Somosi Zoltán</h2>
      </motion.div>

      {/* Modern Two Column Layout */}
      <div className="grid lg:grid-cols-[35%_65%] gap-10 items-start">
        
        {/* Left Column - Modern Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-8"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">

            {/* Modern Profile Image */}
            <div className="w-36 h-36 mx-auto mb-6 rounded-xl shadow-lg overflow-hidden ring-4 ring-purple-100">
              <img
                src="/IMG_5730.JPG"
                alt="Somosi Zoltán profile picture"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modern Name and Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Somosi Zoltán
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Marketing Specialista & Doktorandusz
              </p>
            </div>

            {/* Modern Credentials */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 text-sm">Miskolci Egyetem</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <Building2 className="w-5 h-5 text-teal-600" />
                <span className="text-gray-700 text-sm">Heureka Group</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 text-sm">Több ezer kampány, 8 országban</span>
              </div>
            </div>

            {/* Modern LinkedIn Link */}
            <div className="text-center pt-6 border-t border-gray-200">
              <a
                href="https://linkedin.com/in/zoltán-somosi-299605226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn profil</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Modern Introduction Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* Modern Introduction */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Engedd meg, hogy bemutatkozzam:
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A nevem <span className="font-semibold text-purple-700">Somosi Zoltán</span>, doktorandusz vagyok a <span className="font-medium">Miskolci Egyetemen</span>, ahol a <span className="bg-purple-100 px-2 py-1 rounded-md border border-purple-200">mesterséges intelligencia és az online marketing hatékonyságának kapcsolatát kutatom</span> - vagyis azt, hogy hogyan lehet adatvezérelt módon, pontosan mérni, mi működik és mi nem.
            </p>
          </div>

          {/* Modern Experience */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mellettem nem csak elméleteket fogsz hallani:
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Nap mint nap futtatok kampányokat több százezer felhasználó elérésével</span>, és vezettem már B2B és B2C kampányokat, ahol az e-mail és trigger marketinggel nagyvállalatoknak milliókat kerestem. A <span className="font-medium">Heureka Groupnál</span> specialistaként dolgoztam, ahol a kreativitás, az adatok és az AI ötvözése hozta a sikereket.
            </p>
          </div>

          {/* Modern Concerns */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tudom, milyen kételyek lehetnek benned:
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900 italic">"Mi van, ha túl bonyolult lesz?"</span> <span className="font-semibold text-gray-900 italic">"Mi van, ha ez is csak egy újabb kurzus?"</span> <span className="font-semibold text-gray-900 italic">"Mi van, ha nem tudom majd a gyakorlatban alkalmazni?"</span>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Pont ezért építettem fel ezt a képzést úgy, hogy <span className="bg-purple-100 px-2 py-1 rounded-md border border-purple-200">minden egyes marketing- és copywriting-problémádra valós, azonnal használható megoldást kapj</span>. Amit itt tanulsz, azt másnap már a saját piacodon kamatoztathatod.
              </p>
            </div>
          </div>

          {/* Modern Closing */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-8 shadow-md">
            <p className="text-gray-800 leading-relaxed font-medium text-center">
              Ha készen állsz arra, hogy a tudományt, a gyakorlati tapasztalatot és az AI-t ötvözve végre valódi eredményeket érj el a marketingedben, akkor ez a kurzus neked szól.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

// Modern Purchase Card Component
function PurchaseCard({ course }: any) {
  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
        {/* Modern Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-200 mb-4">
            <ShoppingCart className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 text-sm font-semibold">Beiratkozás</span>
          </div>
        </div>

        {/* Modern Price - Minimal */}
        <div className="mb-6">
          {course.isFree ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-4xl font-bold text-gray-900">Ingyenes</p>
              <p className="text-gray-600 mt-2 text-sm">Örökre hozzáférhető</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-4xl font-bold text-gray-900">
                {course.price?.toLocaleString('hu-HU')} Ft
              </p>
              <p className="text-gray-600 mt-2 text-sm">Egyszeri fizetés</p>
            </div>
          )}
        </div>

        {/* Modern Enrollment Button */}
        <div className="mb-8">
          <PurchaseButton
            course={{
              id: course.id,
              title: course.title,
              price: course.price || 89990,
              currency: course.currency || 'HUF'
            }}
            className="w-full px-6 py-4"
          />
        </div>

        {/* Modern Course Features */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            A csomag tartalmazza:
          </h3>
          <div className="space-y-3">
            {[
              { icon: Clock, text: `${course.stats?.duration || 'N/A'} videó tartalom` },
              { icon: BookOpen, text: `${course.stats?.lessons || 0} lecke + PDF sablonok` },
              { icon: Users, text: '"Veled csináljuk" DWY szolgáltatás' },
              { icon: Target, text: 'Személyre szabott stratégia' },
              { icon: CheckCircle, text: 'Élethosszig tartó hozzáférés' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 text-gray-900">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Guarantee - Minimal */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Award className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">30 napos garancia</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ha nem vagy elégedett, teljes összeget visszatérítünk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modern Course Testimonials Section
function CourseTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      message: "Cégvezetőként eddig is használtam AI-t, de a kurzus új szintre emelte a hatékonyságot, főleg az AI posztok és blogok készítésében. Nemcsak sablonokat kaptam, hanem egy szemléletet is, amivel gyorsabban és eredményesebben tudunk kommunikálni az ügyfelekkel. Számomra ez egyértelműen befektetés, ami már most megtérült.",
      name: "Dienes Martin",
      position: "Ügyvezető",
      company: "Dma ponthu Kft.",
      rating: 5,
      avatar: "/dienes-martin1.png"
    },
    {
      id: 2,
      message: "Napi szinten használom az AI-t a munkámban, viszont éreztem, hogy több van ebben és tudnám hatékonyabban is használni. Konkrét prompt íráshoz kerestem sablonokat, akkor találtam rá a kurzusra. Így hát ha kész prompt sablonok mellett még tanulhatok is a jövőről, miért is ne, megvettem. Abszolút nem bántam meg, életem egyik leghasznosabb kurzusa volt, amivel úgy érzem egy magasabb szintre emelhetem a munkám.",
      name: "Kecskeméti Ádám",
      position: "Projekt menedzser",
      company: "",
      rating: 5,
      avatar: "/IMG_1452 1.png"
    },
    {
      id: 3,
      message: "A modul összességében egy modern, értékközpontú és inspiráló tanulási élményt kínál, amely valóban hozzájárul a digitális kompetenciák fejlesztéséhez. A tananyag kimagaslóan gyakorlatorientált, hiszen minden modulban konkrét, azonnal alkalmazható jó gyakorlatok jelennek meg. A videós tartalmak jól strukturáltak, valós példákkal mutatják be a digitális marketing kulcsterületeit. A tananyag felhasználóbarát felépítése és vizuálisan támogatott bemutatása segíti a gyors megértést.",
      name: "Dr. Hajdú Noémi",
      position: "rektorhelyettesi referens, egyetemi docens",
      company: "Miskolci Egyetem, Marketing és Turizmus Intézet",
      rating: 5,
      avatar: "/hajdu-noemi.jpeg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Modern Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span className="text-gray-700 text-sm font-medium">Értékelések</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Hallgatói visszajelzések
            </h2>
          </motion.div>

          {/* Modern Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Modern Navigation Buttons */}
              <button
                onClick={goToPrev}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg rounded-lg p-2 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg rounded-lg p-2 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Modern Testimonial Content */}
              <div className="px-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    {/* Modern Quote Icon */}
                    <Quote className="w-10 h-10 text-purple-400 mx-auto mb-6" />

                    {/* Modern Testimonial Message */}
                    <blockquote className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                      "{testimonials[currentIndex].message}"
                    </blockquote>

                    {/* Modern Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>

                    {/* Modern Author Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-purple-200">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 font-semibold">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {testimonials[currentIndex].position}
                        </div>
                        {testimonials[currentIndex].company && (
                          <div className="text-gray-500 text-xs">
                            {testimonials[currentIndex].company}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modern Carousel Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-purple-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}