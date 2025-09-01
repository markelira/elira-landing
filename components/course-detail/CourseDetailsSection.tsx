'use client';

import React, { useState } from 'react';
import { Book, Play, ChevronDown, ChevronRight, GraduationCap, Share2, ExternalLink, Check, Star, Clock, Calendar, Users, BarChart3, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseDetailsSectionProps {
  courseData?: any;
}

type TabType = 'overview' | 'curriculum' | 'instructors' | 'reviews' | 'faq';

const CourseDetailsSection: React.FC<CourseDetailsSectionProps> = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Mock data for the sales page course
  const mockCourseData = {
    title: "Olvass a vevőid gondolataiban",
    description: "AI-alapú copywriting és marketingkutatás kurzus",
    modules: [
      {
        id: '1',
        title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
        lessons: [
          { id: '1-1', title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt, hogy a vevő azt mondja: „Pont ő kell nekem”', duration: 4 }
        ]
      },
      {
        id: '2',
        title: 'Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak',
        lessons: [
          { id: '2-1', title: 'Pontos célzás, biztos találat - találj célba a célcsoportodnál', duration: 4 },
          { id: '2-2', title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?', duration: 4 },
          { id: '2-3', title: 'Összefoglalás - a legfontosabb vevői insightok', duration: 4 }
        ]
      },
      {
        id: '3',
        title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
        lessons: [
          { id: '3-1', title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel, valós adatokból', duration: 9 }
        ]
      },
      {
        id: '4',
        title: 'Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon',
        lessons: [
          { id: '4-1', title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót!', duration: 2 },
          { id: '4-2', title: 'Használd a „Na és?” technikát, hogy eljuss az előnyökhöz', duration: 1 },
          { id: '4-3', title: 'Vevői elkötelezettség fázisai', duration: 2 },
          { id: '4-4', title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt', duration: 2 },
          { id: '4-5', title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból', duration: 5 }
        ]
      },
      {
        id: '5',
        title: 'Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra',
        lessons: [
          { id: '5-1', title: 'Személyre szabott közösségi média poszt készítése 3 perc alatt', duration: 3 },
          { id: '5-2', title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes', duration: 5 },
          { id: '5-3', title: 'Személyre szabott Facebook hirdetés 2 perc alatt', duration: 2 },
          { id: '5-4', title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben', duration: 3 },
          { id: '5-5', title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz', duration: 3 },
          { id: '5-6', title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírlevel spam-be', duration: 1 },
          { id: '5-7', title: 'Befejezés, köszönet!', duration: 1 }
        ]
      }
    ],
    instructor: {
      firstName: 'Somosi',
      lastName: 'Zoltán',
      profilePictureUrl: '/IMG_5730.JPG',
      title: 'Marketing Specialista & Doktorandusz',
      bio: 'E-mail és trigger marketing specialista a Heureka Groupnál, és doktorandusz a Miskolci Egyetemen, ahol a mesterséges intelligencia és az online marketing hatékonysága a kutatási területem.',
      institution: 'Miskolci Egyetem & Heureka Group'
    },
    highlights: [
      'Buyer persona kidolgozása 10 perc alatt MI segítségével',
      'Versenytárs analízis automatizálása AI eszközökkel',
      'Pszichológiai triggerek alkalmazása a copywritingban',
      'Email marketing automatizáció készítése',
      'Facebook Ads copy generátor használata',
      'Social media tartalom tervezés AI-val'
    ],
    stats: {
      modules: 5,
      lessons: 17,
      students: 312,
      rating: 4.9,
      duration: 56
    }
  };

  const data = courseData || mockCourseData;

  const tabs = [
    { id: 'overview', label: 'Áttekintés' },
    { id: 'curriculum', label: 'Kurzus tartalma' },
    { id: 'instructors', label: 'Oktató' }
  ];

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Tab content renderers
  const renderOverviewTab = () => {
    const totalLessons = data.modules.reduce((sum: number, module: any) => sum + module.lessons.length, 0);
    const totalDuration = data.modules.reduce((sum: number, module: any) => 
      sum + module.lessons.reduce((lessonSum: number, lesson: any) => lessonSum + lesson.duration, 0), 0
    );

    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours} óra ${mins > 0 ? `${mins} perc` : ''}`.trim();
      }
      return `${mins} perc`;
    };

    const stats = [
      { icon: Clock, label: "Összesen", value: "1 óra" },
      { icon: Calendar, label: "Modulok", value: `${data.stats.modules} modul` },
      { icon: Book, label: "Gyakorlati anyagok", value: "7" },
      { icon: Play, label: "Videók", value: "17" }
    ];

    return (
      <div className="space-y-12">
        {/* Highlights Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tanulási eredmények</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-5 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-gray-700 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Course Statistics Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Kurzus áttekintés</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                <p className="font-bold text-xl text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderCurriculumTab = () => {
    const totalLessons = data.modules.reduce((sum: number, module: any) => sum + module.lessons.length, 0);
    const totalDuration = data.modules.reduce((sum: number, module: any) => 
      sum + module.lessons.reduce((lessonSum: number, lesson: any) => lessonSum + lesson.duration, 0), 0
    );

    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours} óra ${mins > 0 ? `${mins} perc` : ''}`.trim();
      }
      return `${mins} perc`;
    };

    return (
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kurzus tartalma</h2>
              <p className="text-gray-600">24 lecke, 17 videó, 7 pdf sablon</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {data.modules.map((module: any, moduleIndex: number) => {
              const moduleDuration = module.lessons.reduce((sum: number, lesson: any) => sum + lesson.duration, 0);
              
              return (
                <div key={module.id} className="border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/80 transition-colors rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                        {moduleIndex + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.lessons.length} lecke • {formatDuration(moduleDuration)}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </button>
                  
                  {expandedModules.has(module.id) && (
                    <div className="px-6 pb-4 border-t border-gray-100/50">
                      <div className="space-y-2 pt-4">
                        {module.lessons.map((lesson: any, lessonIndex: number) => (
                          <div key={lesson.id} className="flex items-center gap-3 py-3 px-4 bg-white/60 hover:bg-white/80 rounded-lg border border-gray-100 transition-colors">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-teal-600" />
                            </div>
                            <span className="text-sm text-gray-700 flex-1">{lesson.title}</span>
                            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border">{lesson.duration} perc</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PDF Downloads Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Letölthető PDF-ek / sablonok</h2>
              <p className="text-gray-600">7 gyakorlati sablon és útmutató</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
              <button
                onClick={() => toggleModule('pdfs')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/80 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Letölthető PDF-ek / sablonok</h3>
                    <p className="text-sm text-gray-600">7 sablon • Azonnal letölthető</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {expandedModules.has('pdfs') ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </button>
              
              {expandedModules.has('pdfs') && (
                <div className="px-6 pb-4 border-t border-gray-100/50">
                  <div className="space-y-2 pt-4">
                    {[
                      'Blogposzt generátor.pdf',
                      'Bulletpoint generátor.pdf', 
                      'Buyer persona generátor.pdf',
                      'Buyer persona.pdf',
                      'email marketing generátor.pdf',
                      'Facebook ads copy generátor.pdf',
                      'Közösségi média poszt generátor.pdf'
                    ].map((pdfName, index) => (
                      <div key={index} className="flex items-center gap-3 py-3 px-4 bg-white/60 hover:bg-white/80 rounded-lg border border-gray-100 transition-colors">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <FileText className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="text-sm text-gray-700 flex-1">{pdfName}</span>
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md border">PDF</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderInstructorsTab = () => {
    return (
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Oktató</h2>
          </div>
          
          <div className="border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 p-8 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img 
                  src={data.instructor.profilePictureUrl}
                  alt={`${data.instructor.firstName} ${data.instructor.lastName}`}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0 border-2 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-2 text-gray-900">
                  {data.instructor.firstName} {data.instructor.lastName}
                </h3>
                <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 px-3 py-1 rounded-lg text-sm font-medium mb-4">
                  {data.instructor.title}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {data.instructor.bio}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all px-4 py-2 rounded-lg font-medium">
                    <Share2 className="w-4 h-4" />
                    Kapcsolat
                  </button>
                  <a 
                    href="https://linkedin.com/in/zoltán-somosi-299605226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all px-4 py-2 rounded-lg font-medium shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn profil
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'curriculum':
        return renderCurriculumTab();
      case 'instructors':
        return renderInstructorsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Tab Navigation - Connected to Hero */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-center">
            <div className="flex gap-2 bg-gray-100/80 backdrop-blur-sm p-2 rounded-2xl shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                      : "text-gray-700 hover:text-gray-900 hover:bg-white/80"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {renderTabContent()}
        </div>
      </div>

    </section>
  );
};

export default CourseDetailsSection;