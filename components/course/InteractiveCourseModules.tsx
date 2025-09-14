'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Wrench, 
  Rocket, 
  Trophy,
  Play,
  Clock,
  CheckCircle,
  BarChart3,
  Users,
  Award,
  Search,
  Heart,
  ArrowRight
} from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import VideoSelectionModal from '@/components/modals/VideoSelectionModal';
import { COURSE_CONFIG } from '@/types/payment';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'project';
  completed?: boolean;
}

interface CourseModule {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<any>;
  description: string;
  lessons: Lesson[];
  duration: string;
  learningObjectives: string[];
  color: string;
  totalLessons: number;
  type?: 'lesson' | 'resource';
}

const InteractiveCourseModules: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('1');
  const [modalOpen, setModalOpen] = useState(false);

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
      case 'video': return <Play className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      case 'project': return <Wrench className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-12 overflow-x-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Teljes tanulási út lépésről lépésre
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              17 lecke, 17 videó, 7 PDF sablon - amely az alapoktól a szakértői szintig vezet az AI-copywriting világában
            </p>
          </motion.div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-100 overflow-hidden backdrop-blur-sm">
            <div className="grid lg:grid-cols-5 gap-0 min-h-[600px]">
            
            {/* Left Sidebar - Module List (40% width) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-50/80 lg:bg-gradient-to-br lg:from-gray-50/60 lg:to-white p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200/70">
              
              {/* Mobile: Compact Module Selector */}
              <div className="lg:hidden mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Válassz modult:
                </label>
                <select
                  value={activeModule}
                  onChange={(e) => setActiveModule(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white"
                >
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.type === 'resource' ? '📜 ' : 'Modul '}{module.number}: {module.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
              {/* Desktop: Module List Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6 hidden lg:block"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">Kurzus modulok</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Válassz modult a részletek megtekintéséhez</p>
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
                    cursor-pointer rounded-lg p-4 border transition-all duration-300 hover:translate-x-1 hover:shadow-md hidden lg:block mb-3 last:mb-0 group
                    ${activeModule === module.id 
                      ? `${module.color} border-2 shadow-md shadow-gray-200 scale-[1.02]` 
                      : 'border-gray-200/70 bg-white/70 backdrop-blur-sm hover:border-gray-300 hover:bg-white hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-110
                      ${activeModule === module.id ? 'bg-white border-current shadow-sm' : 'border-gray-300/70 bg-white/80 backdrop-blur-sm'}
                    `}>
                      <module.icon className={`w-4 h-4 transition-all duration-300 ${activeModule === module.id ? 'text-current' : 'text-gray-600 group-hover:text-gray-800'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium ${activeModule === module.id ? 'text-current' : 'text-gray-700'}`}>
                          {module.type === 'resource' ? '📜 SABLONOK' : `MODUL ${module.number}`}
                        </span>
                      </div>
                      
                      <h4 className={`font-medium mb-2 text-sm leading-tight transition-colors duration-300 ${activeModule === module.id ? 'text-current' : 'text-gray-900 group-hover:text-gray-800'}`}>
                        {module.shortTitle}
                      </h4>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
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

            {/* Right Side - Dynamic Content Area (60% width) */}
            <div className="lg:col-span-3 p-4 lg:p-6 bg-gradient-to-br from-white to-gray-50/30">
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
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl border ${activeModuleData.color} flex items-center justify-center shadow-sm backdrop-blur-sm`}>
                        <activeModuleData.icon className="w-6 h-6 text-current" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-700 tracking-wide">
                            {activeModuleData.type === 'resource' ? '📜 SABLONOK' : `MODUL ${activeModuleData.number}`}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 leading-tight tracking-tight">
                          {activeModuleData.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-[15px] bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text">
                      {activeModuleData.description}
                    </p>

                    {/* Module Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/70 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                        <div className="text-xl font-bold text-gray-800">{activeModuleData.totalLessons}</div>
                        <div className="text-xs text-gray-500 font-medium mt-1">{activeModuleData.type === 'resource' ? 'Sablon' : 'Lecke'}</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/70 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300">
                        <div className="text-xl font-bold text-gray-800">{activeModuleData.duration}</div>
                        <div className="text-xs text-gray-500 font-medium mt-1">{activeModuleData.type === 'resource' ? 'Hozzáférés' : 'Időtartam'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
                      <Target className="w-5 h-5 text-gray-600" />
                      Tanulási célok
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeModuleData.learningObjectives.map((objective, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-50/70 rounded-lg border border-gray-200/70 hover:shadow-sm hover:border-gray-300 transition-all duration-300 backdrop-blur-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{objective}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Lesson Breakdown */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
                      <BookOpen className="w-5 h-5 text-gray-600" />
                      {activeModuleData.type === 'resource' ? 'Sablonok részletesen' : 'Leckék részletesen'}
                    </h4>
                    <div className="space-y-2">
                      {activeModuleData.lessons.map((lesson, index) => (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200/70 hover:border-gray-300 hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                        >
                          <div className="w-7 h-7 bg-white rounded-lg border border-gray-300/70 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {getLessonIcon(lesson.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 text-sm leading-tight mb-1 group-hover:text-gray-800 transition-colors">{lesson.title}</h5>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </span>
                              <span className="capitalize font-medium">
                                {lesson.type === 'video' ? 'Videó' : 
                                 lesson.type === 'quiz' ? 'Kvíz' : 'Sablon'}
                              </span>
                            </div>
                          </div>
                          
                          {lesson.completed && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
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

        {/* CTA Buttons - Bottom of Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-4 max-w-lg mx-auto mt-12"
        >
          {/* Free Video Button */}
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 min-w-[280px]"
          >
            Válassz egyet az 5 modulból ingyen
          </motion.button>
          
          {/* Purchase Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PurchaseButton
              courseId="ai-copywriting-course"
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2 min-w-[280px]"
            />
          </motion.div>
          
        </motion.div>
      </div>

      {/* Video Selection Modal */}
      <VideoSelectionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default InteractiveCourseModules;