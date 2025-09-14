'use client'

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
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={courseData.previewVideoUrl}
        courseTitle={courseData.title}
      />
      
      {/* Hero Section - Academic Harvard/Yale Style */}
      <section className="relative bg-gradient-to-b from-slate-50 via-stone-50 to-amber-50/30 text-slate-800 overflow-hidden border-b border-amber-200/50">
        {/* Academic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            <pattern id="academic-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="10" cy="10" r="0.5" fill="currentColor"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#academic-grid)" />
          </svg>
        </div>
        
        {/* Elegant Border Frame */}
        <div className="absolute inset-4 border border-amber-300/20 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-8 border border-amber-400/10 rounded pointer-events-none"></div>
        
        <div className="relative container max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-28">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Academic Header with Decorative Elements */}
            <div className="mb-8 sm:mb-12">
              {/* Decorative Top Line */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-16 sm:w-24"></div>
                <div className="mx-3 sm:mx-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600/60 rounded-full"></div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-16 sm:w-24"></div>
              </div>
              
              {/* Category Badge - Academic Style */}
              {courseData.category && (
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100/80 border border-amber-300/50 rounded-sm text-xs font-medium tracking-widest text-amber-900 uppercase mb-6 sm:mb-8">
                  <span>{courseData.category.name}</span>
                </div>
              )}
              
              {/* Title - Academic Typography */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-6 sm:mb-8 text-slate-900 px-2 sm:px-0">
                <span className="font-serif tracking-tight">{courseData.title}</span>
              </h1>
              
              {/* Description - Academic Style */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6"></div>
                <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-light italic">
                  {courseData.shortDescription || courseData.description?.substring(0, 200) + '...'}
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-6"></div>
              </div>
            </div>
            
            {/* Academic Information Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              
              {/* Instructor Card - Academic Portrait Style with Real Photo */}
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-3 border-slate-300 shadow-md">
                  <img 
                    src="/IMG_5730.JPG" 
                    alt="Somosi Zoltán profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Oktató</p>
                  <p className="font-medium text-slate-900 text-sm font-serif">
                    Somosi Zoltán
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Marketing Specialista & Doktorandusz
                  </p>
                </div>
              </div>
              
              {/* Course Statistics - Academic Format */}
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 border border-amber-300/50 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Tananyag</p>
                  <p className="font-medium text-slate-900 text-sm">
                    {courseData.stats?.modules || 0} modul
                  </p>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 border border-blue-300/50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-700" />
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Időtartam</p>
                  <p className="font-medium text-slate-900 text-sm">
                    {courseData.stats?.duration || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Academic Certification & Enrollment */}
            <div className="flex flex-col items-center space-y-6">
              
              {/* Academic Style CTA */}
              <PurchaseButton
                course={{
                  id: courseData.id,
                  title: courseData.title,
                  price: courseData.price || 9990,
                  currency: courseData.currency || 'HUF'
                }}
                className="px-12 py-4"
              />
              
              {/* Academic Credentials - Badge Style */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-2 bg-white/50 border border-slate-200 px-3 py-2 rounded-sm">
                  <span className="font-medium uppercase tracking-wider">30 napos garancia</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 border border-slate-200 px-3 py-2 rounded-sm">
                  <span className="font-medium uppercase tracking-wider">Élethosszig elérhető</span>
                </div>
              </div>
            </div>
            
            {/* Bottom Academic Decoration */}
            <div className="flex items-center justify-center mt-12">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-32"></div>
              <div className="mx-6 flex space-x-2">
                <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-amber-600/40 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-amber-600/60 rounded-full"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tab Navigation - Academic Style - Mobile Optimized */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-slate-50 to-stone-50 border-b-2 border-amber-200/50 shadow-sm backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-2 sm:px-4">
          {/* Mobile: Horizontal scroll, Desktop: Centered */}
          <div className="flex sm:justify-center overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 sm:space-x-12 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 sm:py-6 px-3 sm:px-3 border-b-3 transition-all font-medium font-serif tracking-wide whitespace-nowrap min-w-[120px] sm:min-w-auto justify-center touch-target
                      ${activeTab === tab.id 
                        ? 'border-amber-600 text-amber-800 bg-white/60 rounded-t-sm shadow-sm' 
                        : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-white/30 rounded-t-sm'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm uppercase tracking-wider">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area - Academic Layout */}
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded border border-slate-200/50 shadow-lg p-8">
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

// Academic Overview Tab Component
function OverviewTab({ course }: { course: any }) {
  return (
    <div className="space-y-10">
      {/* Course Description - Academic Style */}
      <section className="mb-10">
        <div className="text-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
          <h2 className="text-2xl font-serif font-light text-slate-900 mb-2">A kurzusról</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
        </div>
        <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border border-slate-200/50 p-8 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-center font-light italic text-lg whitespace-pre-line">
            {course.description}
          </p>
        </div>
      </section>
      
      {/* Video Preview - Academic Style */}
      <section className="mb-10">
        <div className="text-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
          <h2 className="text-2xl font-serif font-light text-slate-900 mb-2">Kurzus bemutató</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
        </div>
        
        {/* Academic Video Frame */}
        <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border-2 border-amber-300/30 p-8 shadow-lg">
          
          {/* Academic Video Title */}
          <div className="text-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
              <h4 className="font-serif text-xl text-slate-900 mb-2">🧠 Olvass a vevőid gondolataiban</h4>
              <p className="text-sm text-slate-600 font-light italic">Ingyenes bemutató előadás</p>
            </div>
          </div>

          {/* Academic Video Player */}
          <div className="relative rounded border border-slate-300/50 overflow-hidden shadow-md bg-gradient-to-br from-slate-100 to-stone-100">
            <iframe
              src="https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg?metadata-video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81&video-title=Olvass+a+vevo%CC%8Bid+gondolataiban+kurzus+bemutato%CC%81"
              style={{ width: '100%', border: 'none', aspectRatio: '16/9' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="rounded"
            />
          </div>

          {/* Academic Video Meta */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 bg-white/50 border border-slate-200 px-4 py-2 rounded-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 font-serif">5.0</span>
              <span className="text-xs text-slate-500"></span>
            </div>
            <div className="bg-amber-600 text-white text-xs font-medium px-4 py-2 rounded-sm uppercase tracking-wider">
              +7 ingyenes PDF sablon
            </div>
          </div>
        </div>
      </section>
      
      {/* Learning Objectives - Academic Style */}
      <section className="mb-10">
        <div className="text-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
          <h2 className="text-2xl font-serif font-light text-slate-900 mb-2">Mit fogsz tudni a kurzus végén?</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border border-slate-200/50 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Buyer persona kidolgozása 10 perc alatt MI segítségével</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Versenytárs analízis automatizálása AI eszközökkel</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Pszichológiai triggerek alkalmazása a copywritingban</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Email marketing automatizáció készítése</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Social media tartalom tervezés AI-val</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-amber-100 border border-amber-300/50 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-slate-700 font-light leading-relaxed">Facebook Ads copy generátor használata</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Student Testimonials - Academic Version */}
      <CourseTestimonialsSection />
      
    </div>
  )
}

// Academic Curriculum Tab Component
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
      <div className="text-center mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
        <h2 className="text-2xl font-serif font-light text-slate-900 mb-2">Tanterv és Módszertan</h2>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
      </div>
      
      {/* Main Academic Content Card */}
      <div className="bg-gradient-to-br from-slate-50/30 to-stone-50/30 rounded border-2 border-amber-300/30 shadow-lg overflow-hidden">
        <div className="grid lg:grid-cols-5 gap-0 min-h-[650px]">
        
        {/* Left Sidebar - Academic Module List */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-50/60 to-stone-50/60 p-6 border-b lg:border-b-0 lg:border-r border-amber-200/50">
          
          {/* Mobile: Compact Module Selector */}
          <div className="lg:hidden mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Válassz modult:
            </label>
            <select
              value={activeModule}
              onChange={(e) => setActiveModule(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded bg-white/90 backdrop-blur-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:bg-white"
            >
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.type === 'resource' ? '📜 ' : 'Modul '}{module.number}: {module.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Module List Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 hidden lg:block text-center"
          >
            <h3 className="text-lg font-serif font-light text-slate-900 mb-3 tracking-wide">Tananyag modulok</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-4"></div>
            <p className="text-slate-600 text-sm leading-relaxed font-light italic">Válasszon modult a részletes tanterv megtekintéséhez</p>
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
                cursor-pointer rounded border transition-all duration-300 hover:translate-x-1 hover:shadow-md hidden lg:block mb-4 last:mb-0 group p-4
                ${activeModule === module.id 
                  ? 'bg-white/80 border-2 border-amber-400/60 shadow-lg shadow-amber-200/50' 
                  : 'border-slate-200/70 bg-white/50 backdrop-blur-sm hover:border-slate-300 hover:bg-white/70 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-8 h-8 rounded-sm border flex items-center justify-center transition-all duration-300 group-hover:scale-110
                  ${activeModule === module.id ? 'bg-amber-50 border-amber-400/60 shadow-sm' : 'border-slate-300/70 bg-white/80 backdrop-blur-sm'}
                `}>
                  <module.icon className={`w-4 h-4 transition-all duration-300 ${activeModule === module.id ? 'text-amber-700' : 'text-slate-600 group-hover:text-slate-800'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium uppercase tracking-wider ${activeModule === module.id ? 'text-amber-700' : 'text-slate-700'}`}>
                      {module.type === 'resource' ? '📜 Sablonok' : `${module.number}. modul`}
                    </span>
                  </div>
                  
                  <h4 className={`font-serif font-light mb-2 text-sm leading-tight transition-colors duration-300 ${activeModule === module.id ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'}`}>
                    {module.shortTitle}
                  </h4>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="font-light">{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="font-light">{module.totalLessons} {module.type === 'resource' ? 'sablon' : 'lecke'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side - Academic Content Area (60% width) */}
        <div className="lg:col-span-3 p-6 lg:p-8 bg-gradient-to-br from-white/80 to-slate-50/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* Module Header */}
              <div className="mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 rounded-sm border-2 border-amber-400/60 bg-amber-50 flex items-center justify-center shadow-sm">
                      <activeModuleData.icon className="w-7 h-7 text-amber-700" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-600 uppercase tracking-wider bg-white/60 px-3 py-1 rounded-sm border border-slate-200">
                      {activeModuleData.type === 'resource' ? '📜 Sablonok' : `${activeModuleData.number}. modul`}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-light text-slate-900 leading-tight tracking-wide">
                    {activeModuleData.title}
                  </h3>
                </div>
                
                <div className="text-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-4"></div>
                  <p className="text-slate-700 leading-relaxed text-base font-light italic mx-auto max-w-2xl">
                    {activeModuleData.description}
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-4"></div>
                </div>

                {/* Academic Module Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-serif font-light text-slate-800 mb-1">{activeModuleData.totalLessons}</div>
                    <div className="text-xs text-slate-600 font-medium uppercase tracking-wider">{activeModuleData.type === 'resource' ? 'Sablon' : 'Lecke'}</div>
                  </div>
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="text-2xl font-serif font-light text-slate-800 mb-1">{activeModuleData.duration}</div>
                    <div className="text-xs text-slate-600 font-medium uppercase tracking-wider">{activeModuleData.type === 'resource' ? 'Hozzáférés' : 'Időtartam'}</div>
                  </div>
                </div>
              </div>

              {/* Academic Learning Objectives */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-serif font-light text-slate-900 mb-2 flex items-center justify-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Tanulási célkitűzések
                  </h4>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeModuleData.learningObjectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded border border-slate-200/70 hover:shadow-sm hover:border-slate-300 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-slate-700 text-sm leading-relaxed font-light">{objective}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Academic Lesson Breakdown */}
              <div className="mb-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-serif font-light text-slate-900 mb-2 flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    {activeModuleData.type === 'resource' ? 'Sablonok részletesen' : 'Tanterv részletesen'}
                  </h4>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-2"></div>
                </div>
                <div className="space-y-3">
                  {activeModuleData.lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded border border-slate-200/70 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-amber-50 rounded-sm border border-amber-300/50 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {getLessonIcon(lesson.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif font-light text-slate-900 text-sm leading-tight mb-2 group-hover:text-slate-800 transition-colors">{lesson.title}</h5>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-light">{lesson.duration}</span>
                          </span>
                          <span className="capitalize font-light">
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

// Academic Instructor Tab Component
function InstructorTab({ course }: { course: any }) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
        <h2 className="text-2xl font-serif font-light text-slate-900 mb-2">Az oktató</h2>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
      </div>
      
      {/* Academic Two Column Layout */}
      <div className="grid lg:grid-cols-[35%_65%] gap-10 items-start">
        
        {/* Left Column - Academic Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-8"
        >
          <div className="bg-gradient-to-br from-slate-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            
            {/* Academic Profile Image */}
            <div className="w-36 h-36 mx-auto mb-8 rounded-sm shadow-lg overflow-hidden border-3 border-amber-300/50">
              <img 
                src="/IMG_5730.JPG" 
                alt="Somosi Zoltán profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Academic Name and Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">
                Somosi Zoltán
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-3"></div>
              <p className="text-slate-700 font-light italic text-sm">
                Marketing Specialista & Doktorandusz
              </p>
            </div>
            
            {/* Academic Credentials */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 justify-center">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <span className="text-slate-700 text-sm font-light">Miskolci Egyetem</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span className="text-slate-700 text-sm font-light">Heureka Group</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-slate-700 text-sm font-light">Több ezer kampány, 8 országban</span>
              </div>
            </div>
            
            {/* Academic LinkedIn Link */}
            <div className="text-center pt-6 border-t border-amber-200/50">
              <a 
                href="https://linkedin.com/in/zoltán-somosi-299605226"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-sm font-medium transition-all duration-300 hover:shadow-lg text-sm uppercase tracking-wider"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn profil</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Academic Introduction Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          
          {/* Academic Introduction */}
          <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border border-slate-200/50 p-8 shadow-sm">
            <h2 className="text-xl font-serif font-light text-slate-900 mb-6 text-center">
              Engedd meg, hogy bemutatkozzam:
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
            <p className="text-slate-700 leading-relaxed font-light text-justify">
              A nevem <span className="font-medium text-amber-700">Somosi Zoltán</span>, doktorandusz vagyok a <span className="font-medium">Miskolci Egyetemen</span>, ahol a <span className="bg-amber-100/60 px-2 py-1 rounded-sm border border-amber-300/30">mesterséges intelligencia és az online marketing hatékonyságának kapcsolatát kutatom</span> - vagyis azt, hogy hogyan lehet adatvezérelt módon, pontosan mérni, mi működik és mi nem.
            </p>
          </div>

          {/* Academic Experience */}
          <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border border-slate-200/50 p-8 shadow-sm">
            <h3 className="text-lg font-serif font-light text-slate-900 mb-6 text-center">
              Mellettem nem csak elméleteket fogsz hallani:
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
            <p className="text-slate-700 leading-relaxed font-light text-justify">
              <span className="font-medium text-slate-900">Nap mint nap futtatok kampányokat több százezer felhasználó elérésével</span>, és vezettem már B2B és B2C kampányokat, ahol az e-mail és trigger marketinggel nagyvállalatoknak milliókat kerestem. A <span className="font-medium">Heureka Groupnál</span> specialistaként dolgoztam, ahol a kreativitás, az adatok és az AI ötvözése hozta a sikereket.
            </p>
          </div>

          {/* Academic Concerns */}
          <div className="bg-gradient-to-br from-slate-50/50 to-stone-50/50 rounded border border-slate-200/50 p-8 shadow-sm">
            <h3 className="text-lg font-serif font-light text-slate-900 mb-6 text-center">
              Tudom, milyen kételyek lehetnek benned:
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
            <div className="space-y-6">
              <p className="text-slate-700 leading-relaxed font-light text-justify">
                <span className="font-medium text-slate-900 italic">"Mi van, ha túl bonyolult lesz?"</span> <span className="font-medium text-slate-900 italic">"Mi van, ha ez is csak egy újabb kurzus?"</span> <span className="font-medium text-slate-900 italic">"Mi van, ha nem tudom majd a gyakorlatban alkalmazni?"</span>
              </p>
              <p className="text-slate-700 leading-relaxed font-light text-justify">
                Pont ezért építettem fel ezt a képzést úgy, hogy <span className="bg-amber-100/60 px-2 py-1 rounded-sm border border-amber-300/30">minden egyes marketing- és copywriting-problémádra valós, azonnal használható megoldást kapj</span>. Amit itt tanulsz, azt másnap már a saját piacodon kamatoztathatod.
              </p>
            </div>
          </div>

          {/* Academic Closing */}
          <div className="bg-gradient-to-br from-amber-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-8 shadow-md">
            <div className="text-center">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
              <p className="text-slate-700 leading-relaxed font-medium text-justify">
                Ha készen állsz arra, hogy a tudományt, a gyakorlati tapasztalatot és az AI-t ötvözve végre valódi eredményeket érj el a marketingedben, akkor ez a kurzus neked szól.
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

// Academic Purchase Card Component
function PurchaseCard({ course }: any) {
  return (
    <div className="sticky top-20">
      <div className="bg-gradient-to-br from-slate-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 shadow-lg p-8">
        {/* Academic Header */}
        <div className="text-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-4"></div>
          <h3 className="text-lg font-serif font-light text-slate-900 mb-2">Beiratkozás</h3>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-4"></div>
        </div>
        
        {/* Academic Price */}
        <div className="text-center mb-8">
          {course.isFree ? (
            <div className="bg-white/60 rounded border border-slate-200/50 p-6">
              <p className="text-3xl font-serif font-light text-slate-800">Ingyenes</p>
              <p className="text-slate-600 mt-2 text-sm font-light italic">Örökre hozzáférhető</p>
            </div>
          ) : (
            <div className="bg-white/60 rounded border border-slate-200/50 p-6">
              <p className="text-3xl font-serif font-light text-slate-800">
                {course.price?.toLocaleString('hu-HU')} Ft
              </p>
              <p className="text-slate-600 mt-2 text-sm font-light italic">Egyszeri beiratkozási díj</p>
            </div>
          )}
        </div>
        
        {/* Academic Enrollment Button */}
        <div className="mb-8">
          <PurchaseButton
            course={{
              id: course.id,
              title: course.title,
              price: course.price || 9990,
              currency: course.currency || 'HUF'
            }}
            className="w-full px-6 py-4"
          />
        </div>
        
        {/* Academic Course Features */}
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="font-serif font-light text-slate-900 text-base">A tanulmány tartalmazza:</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-2"></div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-light text-slate-700">{course.stats?.duration || 'N/A'} videó előadás</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-light text-slate-700">{course.stats?.lessons || 0} tananyag modul</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-light text-slate-700">Letölthető segédanyagok</span>
            </div>
            <div className="flex items-center gap-3 p-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-light text-slate-700">Élethosszig tartó hozzáférés</span>
            </div>
          </div>
        </div>
        
        {/* Academic Guarantee */}
        <div className="mt-6 pt-6 border-t border-amber-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Award className="w-5 h-5 text-amber-600" />
              <p className="font-serif font-light text-slate-900">30 napos garancia</p>
            </div>
            <p className="text-xs text-slate-600 font-light italic leading-relaxed">
              Ha nem vagy elégedett a tanulmánnyal, teljes összeget visszatérítünk.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Academic Course Testimonials Section
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
          
          {/* Academic Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-6"></div>
            <h2 className="text-2xl font-serif font-light text-slate-900 mb-4">
              Hallgatói visszajelzések
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-6"></div>
          </motion.div>

          {/* Academic Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-slate-50/60 to-stone-50/60 rounded border-2 border-amber-300/30 p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Academic Navigation Buttons */}
              <button
                onClick={goToPrev}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border border-slate-300 hover:bg-white hover:shadow-lg rounded-sm p-2 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border border-slate-300 hover:bg-white hover:shadow-lg rounded-sm p-2 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>

              {/* Academic Testimonial Content */}
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
                    {/* Academic Quote Icon */}
                    <Quote className="w-10 h-10 text-amber-600/40 mx-auto mb-6" />
                    
                    {/* Academic Testimonial Message */}
                    <blockquote className="text-sm md:text-base text-slate-700 mb-8 leading-relaxed max-w-2xl mx-auto font-light italic text-justify">
                      "{testimonials[currentIndex].message}"
                    </blockquote>
                    
                    {/* Academic Rating */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    
                    {/* Academic Author Info */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-sm overflow-hidden border-2 border-amber-300/50">
                        <img 
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="text-slate-900 font-serif font-medium">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-slate-600 font-light text-sm">
                          {testimonials[currentIndex].position}
                        </div>
                        {testimonials[currentIndex].company && (
                          <div className="text-slate-500 text-xs font-light italic">
                            {testimonials[currentIndex].company}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Academic Carousel Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-sm border transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-amber-600 border-amber-600' 
                        : 'bg-slate-300 border-slate-300 hover:bg-slate-400 hover:border-slate-400'
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