'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Target,
  Clock,
  CheckCircle,
  Users,
  Search,
  Heart,
  Rocket
} from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'project';
}

interface CourseModule {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<any>;
  description: string;
  duration: string;
  totalLessons: number;
  color: string;
  lessons: Lesson[];
  learningObjectives: string[];
  type?: 'lesson' | 'resource';
}

const MainCourseOffer: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('1');
  const [modalOpen, setModalOpen] = useState(false);

  // Real course modules from InteractiveCourseModules
  const modules: CourseModule[] = [
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
        { id: 'lesson-1-1', title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt', duration: '4 perc', type: 'video' }
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
        { id: 'lesson-2-1', title: 'Pontos célzás, biztos találat', duration: '4 perc', type: 'video' },
        { id: 'lesson-2-2', title: 'Vélemények és trendek', duration: '4 perc', type: 'video' },
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
        { id: 'lesson-3-1', title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel', duration: '9 perc', type: 'video' }
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
        { id: 'lesson-4-1', title: 'Érintsd meg a szívét, aztán a fejét', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-2', title: 'Használd a „Na és?" technikát', duration: '1 perc', type: 'video' },
        { id: 'lesson-4-3', title: 'Vevői elkötelezettség fázisai', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-4', title: 'Mire fókuszálj, hogy mindenki megértsen', duration: '2 perc', type: 'video' },
        { id: 'lesson-4-5', title: 'Egyedi érték és érzelmi ajánlat kialakítása', duration: '5 perc', type: 'video' }
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
        { id: 'lesson-5-1', title: 'Személyre szabott közösségi média poszt készítése', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-2', title: 'AI E-mail marketing', duration: '5 perc', type: 'video' },
        { id: 'lesson-5-3', title: 'Személyre szabott Facebook hirdetés', duration: '2 perc', type: 'video' },
        { id: 'lesson-5-4', title: 'Bulletpoint generátor', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-5', title: 'Blogposzt generátor', duration: '3 perc', type: 'video' },
        { id: 'lesson-5-6', title: 'Hogyan tedd emberivé a szöveged', duration: '1 perc', type: 'video' },
        { id: 'lesson-5-7', title: 'Befejezés, köszönet!', duration: '1 perc', type: 'video' }
      ]
    },
    {
      id: '6',
      number: 6,
      title: 'Letölthető PDF-ek / sablonok',
      shortTitle: 'PDF sablonok',
      icon: BookOpen,
      description: '7 gyakorlati sablon és útmutató - azonnal letölthető és használható generátorok.',
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
        { id: 'pdf-4', title: 'Email marketing generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-5', title: 'Facebook ads copy generátor.pdf', duration: 'PDF', type: 'project' },
        { id: 'pdf-6', title: 'Közösségi média poszt generátor.pdf', duration: 'PDF', type: 'project' }
      ]
    }
  ];

  const activeModuleData = modules.find(m => m.id === activeModule) || modules[0];


  return (
    <section 
      id="main-course-offer" 
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: '#F8F7F5' }}
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              3x több érdeklődő
            </span>
            <br />
            vevőpszichológia masterclass
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-gray-900"></span>Megérted, mit akar valójában a vevőd, 
            és ezzel többet adsz el <span className="font-medium italic">(akár drágábban is)</span> anélkül, 
            hogy bármit újat kellene fejlesztened.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Main Course Offer */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-200">
            {/* Course Title */}
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Online vállalkozói vevőpszichológia kurzus
              </h3>
              </div>
            {/* Solutions & Benefits */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Mit fog ez megoldani a számodra?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">Végre megérted, mit akar a vevőd</span>
                    <p className="text-gray-600 text-sm mt-1">10 perc alatt készítesz buyer personát, ami pontosan célba talál</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">Mindig egy lépéssel előrébb leszel a versenytársaidnál</span>
                    <p className="text-gray-600 text-sm mt-1">AI-val automatizálod az elemzést, míg mások még kézzel kutakodnak</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">Az üzeneteid végre hatnak - és eladnak</span>
                    <p className="text-gray-600 text-sm mt-1">Pszichológiai triggerekkel írsz, amikre az emberek nem tudnak nemet mondani</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">Órák helyett percek alatt készülnek a kampányaid</span>
                    <p className="text-gray-600 text-sm mt-1">Email, social media, Facebook hirdetés - mind automatizálva, mind hatékony</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-teal-900 mb-3">
                Korlátozott férőhelyek októberre
              </h4>
              <p className="text-teal-800 leading-relaxed mb-4">
                <span className="font-medium italic">Csak 10 főnek elérhető,</span> mert a személyes mentorálás, és az online konzultációk minőségéből - amik a kurzushoz járnak - nem akarunk engedni
              </p>
              
              {/* Free Preview Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-white hover:bg-gray-50 text-teal-700 font-semibold py-3 px-6 rounded-xl border border-teal-200 hover:border-teal-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                🎬 Nézz bele ingyen a kurzusba
              </button>
            </div>

          </div>

          {/* Right Column - Course Content (Same as InteractiveCourseModules) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-100 overflow-hidden backdrop-blur-sm">
            <div className="grid lg:grid-cols-1 gap-0 min-h-[600px]">
            
            {/* Module List (Minimized) */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-50/80 lg:bg-gradient-to-br lg:from-gray-50/60 lg:to-white p-4 lg:p-6 border-b border-gray-200/70">
              
              {/* Module List Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">Teljes tanulási út lépésről lépésre</h3>
                <p className="text-gray-600 text-sm leading-relaxed">5 modul, 17 videó lecke</p>
              </div>

              {/* Compact Module Grid */}
              <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                {modules.filter(module => module.type !== 'resource').map((module) => (
                  <div
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`
                      cursor-pointer rounded-lg p-3 border transition-all duration-300 hover:translate-x-1 hover:shadow-md group
                      ${activeModule === module.id 
                        ? `${module.color} border-2 shadow-md shadow-gray-200 scale-[1.02]` 
                        : 'border-gray-200/70 bg-white/70 backdrop-blur-sm hover:border-gray-300 hover:bg-white hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-110
                        ${activeModule === module.id ? 'bg-white border-current shadow-sm' : 'border-gray-300/70 bg-white/80 backdrop-blur-sm'}
                      `}>
                        <module.icon className={`w-3 h-3 transition-all duration-300 ${activeModule === module.id ? 'text-current' : 'text-gray-600 group-hover:text-gray-800'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${activeModule === module.id ? 'text-current' : 'text-gray-700'}`}>
                            {module.type === 'resource' ? '📜 SABLONOK' : `MODUL ${module.number}`}
                          </span>
                        </div>
                        
                        <h4 className={`font-medium mb-1 text-xs leading-tight transition-colors duration-300 ${activeModule === module.id ? 'text-current' : 'text-gray-900 group-hover:text-gray-800'}`}>
                          {module.shortTitle}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-2 h-2" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-2 h-2" />
                            <span>{module.totalLessons} {module.type === 'resource' ? 'sablon' : 'lecke'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Content Area (Minimized) */}
            <div className="p-4 lg:p-6 bg-gradient-to-br from-white to-gray-50/30">
              <div key={activeModule}>
                  
                  {/* Module Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-xl border ${activeModuleData.color} flex items-center justify-center shadow-sm backdrop-blur-sm`}>
                        <activeModuleData.icon className="w-4 h-4 text-current" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-700 tracking-wide">
                            {activeModuleData.type === 'resource' ? '📜 SABLONOK' : `MODUL ${activeModuleData.number}`}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight tracking-tight">
                          {activeModuleData.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-xs bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text">
                      {activeModuleData.description}
                    </p>

                    {/* Module Stats */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/70 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                        <div className="text-lg font-bold text-gray-800">{activeModuleData.totalLessons}</div>
                        <div className="text-xs text-gray-500 font-medium mt-1">{activeModuleData.type === 'resource' ? 'Sablon' : 'Lecke'}</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/70 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                        <div className="text-lg font-bold text-gray-800">{activeModuleData.duration}</div>
                        <div className="text-xs text-gray-500 font-medium mt-1">{activeModuleData.type === 'resource' ? 'Hozzáférés' : 'Időtartam'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2 tracking-tight">
                      <Target className="w-4 h-4 text-gray-600" />
                      Tanulási célok
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {activeModuleData.learningObjectives?.slice(0, 3).map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-50 to-gray-50/70 rounded-lg border border-gray-200/70 hover:shadow-sm hover:border-gray-300 transition-all duration-300 backdrop-blur-sm"
                        >
                          <CheckCircle className="w-3 h-3 text-gray-600 flex-shrink-0" />
                          <span className="text-gray-700 text-xs leading-relaxed">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
            </div>
          </div>
          </div>
        </div>

        {/* October Masterclass Application CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-slate-900 via-teal-800 to-teal-700 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Limited Spots Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-amber-500/90 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                🎯 10 hely elérhető
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Jelentkezz az októberi masterclass-ra!</h3>
              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                <span className="font-semibold">Korlátozott létszám:</span> Október 6-tól csak <span className="text-yellow-300 font-bold">10 fővel</span> indítjuk el a masterclasst-t!
              </p>
              
              {/* Benefits row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>1:1 mentorálás</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Bónuszok</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>Tripla Garancia</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <PurchaseButton 
                    courseId="ai-copywriting-course"
                    className="w-full"
                  />
                </div>
              </div>
              
              <p className="text-white/70 text-sm mt-4">
                ⏰ Jelentkezési határidő: <span className="font-semibold text-white">október 5.</span> vagy a férőhelyek betöltéséig
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default MainCourseOffer;