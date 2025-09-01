'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, FileText, ChevronLeft, ChevronRight, CheckCircle, 
  Clock, BarChart3, BookOpen, Menu, X, Home
} from 'lucide-react';
import Link from 'next/link';
import { CourseAccessGuard } from '@/components/guards/CourseAccessGuard';

// Complete course data structure with all lessons and assets
const courseData = {
  id: 'copywriting-course',
  title: 'Olvass a vevőid gondolataiban',
  description: 'AI-alapú copywriting és marketingkutatás kurzus',
  modules: [
    {
      id: '1',
      title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
      lessons: [
        {
          id: '1-1',
          title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt, hogy a vevő azt mondja: „Pont ő kell nekem"',
          type: 'video',
          duration: 4,
          videoEmbed: `<iframe src="https://player.mux.com/02emHt502GnvD7gW8GjfkzNQmWGkwQR7Rcin02HAbYBDzs?metadata-video-title=Hogyan+ford%C3%ADtsd+meg+a+kommunik%C3%A1ci%C3%B3t%2C+hogy+a+vev%C5%91+azt+mondja%3A+%E2%80%9EPont+%C5%91+kell+nekem%E2%80%9D&video-title=Hogyan+ford%C3%ADtsd+meg+a+kommunik%C3%A1ci%C3%B3t%2C+hogy+a+vev%C5%91+azt+mondja%3A+%E2%80%9EPont+%C5%91+kell+nekem%E2%80%9D" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        }
      ]
    },
    {
      id: '2', 
      title: 'Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak',
      lessons: [
        {
          id: '2-1',
          title: 'Pontos célzás, biztos találat - találj célba a célcsoportodnál',
          type: 'video',
          duration: 4,
          videoEmbed: `<iframe src="https://player.mux.com/9nUiGBHsu00erzpCSdEgfE2P27R4H2XqSMvZq02JOWzgM?metadata-video-title=Pontos+c%C3%A9lz%C3%A1s%2C+biztos+tal%C3%A1lat+-+tal%C3%A1lj+c%C3%A9lba+a+c%C3%A9lcsoportodn%C3%A1l&video-title=Pontos+c%C3%A9lz%C3%A1s%2C+biztos+tal%C3%A1lat+-+tal%C3%A1lj+c%C3%A9lba+a+c%C3%A9lcsoportodn%C3%A1l" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '2-2',
          title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?',
          type: 'video',
          duration: 4,
          videoEmbed: `<iframe src="https://player.mux.com/Q5ai00WXITXwlLsiODwO2DGbGqXp5YnlIk7VPbUKzlRU?metadata-video-title=V%C3%A9lem%C3%A9nyek+%C3%A9s+trendek+-+hogyan+der%C3%ADtsd+ki+mire+v%C3%A1gynak+%C3%A9s+mit%C5%91l+f%C3%A9lnek+a+potenci%C3%A1lis+v%C3%A1s%C3%A1rl%C3%B3id%3F&video-title=V%C3%A9lem%C3%A9nyek+%C3%A9s+trendek+-+hogyan+der%C3%ADtsd+ki+mire+v%C3%A1gynak+%C3%A9s+mit%C5%91l+f%C3%A9lnek+a+potenci%C3%A1lis+v%C3%A1s%C3%A1rl%C3%B3id%3F" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '2-3',
          title: 'Összefoglalás - a legfontosabb vevői insightok',
          type: 'video',
          duration: 4,
          videoEmbed: `<iframe src="https://player.mux.com/P004bsdgUZWZUkP00V2XHEz02jLciWlHW36UxRKjr5VSjs?metadata-video-title=%C3%96sszefoglal%C3%A1s+-+a+legfontosabb+vev%C5%91i+insightok&video-title=%C3%96sszefoglal%C3%A1s+-+a+legfontosabb+vev%C5%91i+insightok" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        }
      ]
    },
    {
      id: '3',
      title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
      lessons: [
        {
          id: '3-1',
          title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel, valós adatokból',
          type: 'video',
          duration: 9,
          videoEmbed: `<iframe src="https://player.mux.com/Dj8qeORP01O2itqZzfqXnomhIB7c01HMn5Zraaltf6AAk?metadata-video-title=Buyer+persona+-+komplett+vev%C5%91i+profil+meghat%C3%A1roz%C3%A1sa+10+perc+alatt+ChatGPT-vel%2C+val%C3%B3s+adatokb%C3%B3l&video-title=Buyer+persona+-+komplett+vev%C5%91i+profil+meghat%C3%A1roz%C3%A1sa+10+perc+alatt+ChatGPT-vel%2C+val%C3%B3s+adatokb%C3%B3l" style="width: 100%; border: none;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        }
      ]
    },
    {
      id: '4',
      title: 'Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon',
      lessons: [
        {
          id: '4-1',
          title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót!',
          type: 'video',
          duration: 2,
          videoEmbed: `<iframe src="https://player.mux.com/4nerha00pbGODs00T2Z027GY4xKZBDhmVYrkxyiSAq01T01A?metadata-video-title=%C3%89rintsd+meg+a+sz%C3%ADv%C3%A9t%2C+azt%C3%A1n+a+fej%C3%A9t+-+%C3%ADgy+nyersz+%C3%B6r%C3%B6kre+v%C3%A1s%C3%A1rl%C3%B3t%21&video-title=%C3%89rintsd+meg+a+sz%C3%ADv%C3%A9t%2C+azt%C3%A1n+a+fej%C3%A9t+-+%C3%ADgy+nyersz+%C3%B6r%C3%B6kre+v%C3%A1s%C3%A1rl%C3%B3t%21" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '4-2',
          title: 'Használd a "Na és?" technikát, hogy eljuss az előnyökhöz',
          type: 'video',
          duration: 1,
          videoEmbed: `<iframe src="https://player.mux.com/00N600Lzl6rQQxVBeOj02yUcHwTAer00W68fceHwxrdb00fM?metadata-video-title=Haszn%C3%A1ld+a+%22Na+%C3%A9s%3F%22+technik%C3%A1t%2C+hogy+eljuss+az+el%C5%91ny%C3%B6kh%C3%B6z&video-title=Haszn%C3%A1ld+a+%22Na+%C3%A9s%3F%22+technik%C3%A1t%2C+hogy+eljuss+az+el%C5%91ny%C3%B6kh%C3%B6z" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '4-3',
          title: 'Vevői elköteleződés fázisai',
          type: 'video',
          duration: 2,
          videoEmbed: `<iframe src="https://player.mux.com/VsfzsYtdqZmvtvZgkW00NHZh7dIEEK02KlRpChf6eHyS4?metadata-video-title=Vev%C5%91i+elk%C3%B6telez%C5%91d%C3%A9s+f%C3%A1zisai&video-title=Vev%C5%91i+elk%C3%B6telez%C5%91d%C3%A9s+f%C3%A1zisai" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '4-4',
          title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt',
          type: 'video',
          duration: 2,
          videoEmbed: `<iframe src="https://player.mux.com/OZzSCxaqpHJ59ZhhBfCSu02kDoFwvZJ3ayDWne4FjlDE?metadata-video-title=Mire+f%C3%B3kusz%C3%A1lj%2C+hogy+mindenki+meg%C3%A9rtsen%2C+%C3%A9s+v%C3%A1s%C3%A1roljanak+t%C5%91led%3F+Meghat%C3%A1rozzuk+az+MI+seg%C3%ADts%C3%A9g%C3%A9vel+2+perc+alatt+&video-title=Mire+f%C3%B3kusz%C3%A1lj%2C+hogy+mindenki+meg%C3%A9rtsen%2C+%C3%A9s+v%C3%A1s%C3%A1roljanak+t%C5%91led%3F+Meghat%C3%A1rozzuk+az+MI+seg%C3%ADts%C3%A9g%C3%A9vel+2+perc+alatt+" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '4-5',
          title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból',
          type: 'video',
          duration: 5,
          videoEmbed: `<iframe src="https://player.mux.com/8ysyo01m602YIhDH201dU8201I00TixT5l3derL3IBO1kv6I?metadata-video-title=Egyedi+%C3%A9rt%C3%A9k+%C3%A9s+%C3%A9rzelmi+aj%C3%A1nlat+kialak%C3%ADt%C3%A1sa+mesters%C3%A9ges+intelligencia+sablonb%C3%B3l&video-title=Egyedi+%C3%A9rt%C3%A9k+%C3%A9s+%C3%A9rzelmi+aj%C3%A1nlat+kialak%C3%ADt%C3%A1sa+mesters%C3%A9ges+intelligencia+sablonb%C3%B3l" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        }
      ]
    },
    {
      id: '5',
      title: 'Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra',
      lessons: [
        {
          id: '5-1',
          title: 'Személyre szabott közösségi média poszt készítése 3 perc alatt',
          type: 'video',
          duration: 3,
          videoEmbed: `<iframe src="https://player.mux.com/sRIiDANomGGc01tVBzz5WaaOGL5MkBaupZuQ01T4AoiEM?metadata-video-title=Szem%C3%A9lyre+szabott+k%C3%B6z%C3%B6ss%C3%A9gi+m%C3%A9dia+poszt+k%C3%A9sz%C3%ADt%C3%A9se+3+perc+alatt+&video-title=Szem%C3%A9lyre+szabott+k%C3%B6z%C3%B6ss%C3%A9gi+m%C3%A9dia+poszt+k%C3%A9sz%C3%ADt%C3%A9se+3+perc+alatt+" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-2',
          title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
          type: 'video',
          duration: 5,
          videoEmbed: `<iframe src="https://player.mux.com/h95zvWKWKweg51qHUu7gSegED900LToW2In9wDjiW4GQ?metadata-video-title=A+piac+nem+v%C3%A1r+-+%C3%ADgy+haszn%C3%A1ld+az+AI-t+E-mail+marketingre%2C+hogy+te+legy%C3%A9l+a+gy%C5%91ztes&video-title=A+piac+nem+v%C3%A1r+-+%C3%ADgy+haszn%C3%A1ld+az+AI-t+E-mail+marketingre%2C+hogy+te+legy%C3%A9l+a+gy%C5%91ztes" style="width: 100%; border: none;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-3',
          title: 'Személyre szabott Facebook hirdetés 2 perc alatt',
          type: 'video',
          duration: 2,
          videoEmbed: `<iframe src="https://player.mux.com/RvjZzGc8Y2dsaOx57RlTHF1Y7OoWY02vbNVT1OvtXwzo?metadata-video-title=Szem%C3%A9lyre+szabott+Facebook+hirdet%C3%A9s+2+perc+alatt&video-title=Szem%C3%A9lyre+szabott+Facebook+hirdet%C3%A9s+2+perc+alatt" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-4',
          title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben',
          type: 'video',
          duration: 3,
          videoEmbed: `<iframe src="https://player.mux.com/BfpIGZ8xZ1RcrqKD01Qzk2TmSB729QB00QORhrq4HT8Qw?metadata-video-title=Bulletpoint+gener%C3%A1tor+-+bulletpointok+k%C3%A9sz%C3%ADt%C3%A9se+term%C3%A9koldalra%2C+landol%C3%B3+oldalra%2C+%C3%A9rt%C3%A9kes%C3%ADt%C3%A9si+oldalra+3+percben&video-title=Bulletpoint+gener%C3%A1tor+-+bulletpointok+k%C3%A9sz%C3%ADt%C3%A9se+term%C3%A9koldalra%2C+landol%C3%B3+oldalra%2C+%C3%A9rt%C3%A9kes%C3%ADt%C3%A9si+oldalra+3+percben" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-5',
          title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz',
          type: 'video',
          duration: 3,
          videoEmbed: `<iframe src="https://player.mux.com/OBtxOrngXliDZRbg00vemAUlrWGOXgayLirZHyYLqIKA?metadata-video-title=Blogposzt+gener%C3%A1tor+-+blog+posztok%2C+amivel+a+Google-ben+az+els%C5%91+oldalra+ker%C3%BClhetsz&video-title=Blogposzt+gener%C3%A1tor+-+blog+posztok%2C+amivel+a+Google-ben+az+els%C5%91+oldalra+ker%C3%BClhetsz" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-6',
          title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírleveled spam-be',
          type: 'video',
          duration: 1,
          videoEmbed: `<iframe src="https://player.mux.com/zenvxOXRH8D31379FAyPYU3P1nnZnBjqdK22TsdywlQ?metadata-video-title=Hogyan+tedd+emberiv%C3%A9+a+sz%C3%B6veged%2C+hogy+ne+ker%C3%BClj%C3%B6n+a+h%C3%ADrleveled+spam-be&video-title=Hogyan+tedd+emberiv%C3%A9+a+sz%C3%B6veged%2C+hogy+ne+ker%C3%BClj%C3%B6n+a+h%C3%ADrleveled+spam-be" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        },
        {
          id: '5-7',
          title: 'Befejezés, köszönet!',
          type: 'video',
          duration: 1,
          videoEmbed: `<iframe src="https://player.mux.com/01qex0100vtX01evBwtGH8TRl182v02ifI9vmLBg2SAiRD1s?metadata-video-title=Befejez%C3%A9s%2C+k%C3%B6sz%C3%B6net%21&video-title=Befejez%C3%A9s%2C+k%C3%B6sz%C3%B6net%21" style="width: 100%; border: none; aspect-ratio: 238/135;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen></iframe>`
        }
      ]
    }
  ],
  pdfs: [
    {
      id: 'blogposzt-generator',
      title: 'Blogposzt generátor.pdf',
      url: 'https://drive.google.com/file/d/1jw4_izUgnQHpnWDUswOCbKH0h6gkltcf/view?usp=sharing'
    },
    {
      id: 'bulletpoint-generator', 
      title: 'Bulletpoint generátor.pdf',
      url: 'https://drive.google.com/file/d/13adEI925qZLbmtnnWKUrhggkH5fhDVMC/view?usp=sharing'
    },
    {
      id: 'buyer-persona-generator',
      title: 'Buyer persona generátor.pdf', 
      url: 'https://drive.google.com/file/d/1dfaiqQBV6hOOz_Iz1sANStfyNJvqGCMy/view?usp=sharing'
    },
    {
      id: 'buyer-persona',
      title: 'Buyer persona.pdf',
      url: 'https://drive.google.com/file/d/1N8WaQQvskCiutXYPOD089leAhhMXijW3/view?usp=sharing'
    },
    {
      id: 'email-marketing-generator',
      title: 'email marketing generátor.pdf',
      url: 'https://drive.google.com/file/d/1PnfgOCkNT29s6I4p5vJVAvKjaedrdffw/view?usp=sharing'
    },
    {
      id: 'facebook-ads-generator',
      title: 'Facebook ads copy generátor.pdf',
      url: 'https://drive.google.com/file/d/1yCLa-UhSzdlxBsGzz3JkrNtXirPQ8jJV/view?usp=sharing'
    },
    {
      id: 'social-media-generator',
      title: 'Közösségi média poszt generátor.pdf',
      url: 'https://drive.google.com/file/d/1M9eSYzQd7qkTy1KhBkLkBNwmV-x7XErE/view?usp=sharing'
    }
  ]
};

export default function CoursePlayerPage() {
  const [currentModuleId, setCurrentModuleId] = useState('1');
  const [currentLessonId, setCurrentLessonId] = useState('1-1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['1'])); // Start with first module expanded
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('course-progress');
    const savedCurrentLesson = localStorage.getItem('current-lesson');
    
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
        setCurrentModuleId(lessonData.moduleId || '1');
        setCurrentLessonId(lessonData.lessonId || '1-1');
      } catch (error) {
        console.error('Error loading current lesson:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progressData = {
      completedLessons: Array.from(completedLessons),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('course-progress', JSON.stringify(progressData));
  }, [completedLessons]);

  // Save current lesson to localStorage whenever it changes
  useEffect(() => {
    const lessonData = {
      moduleId: currentModuleId,
      lessonId: currentLessonId,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('current-lesson', JSON.stringify(lessonData));
  }, [currentModuleId, currentLessonId]);

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
    const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  const getModuleProgress = (moduleId: string) => {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completedInModule = module.lessons.filter(l => completedLessons.has(l.id)).length;
    return Math.round((completedInModule / module.lessons.length) * 100);
  };

  const currentModule = courseData.modules.find(m => m.id === currentModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set(Array.from(prev).concat(lessonId)));
  };

  const navigateToLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const getNextLesson = () => {
    // Find next lesson logic
    const currentModuleIndex = courseData.modules.findIndex(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === currentLessonId) || 0;
    
    if (currentModule && currentLessonIndex < currentModule.lessons.length - 1) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex + 1].id
      };
    } else if (currentModuleIndex < courseData.modules.length - 1) {
      return {
        moduleId: courseData.modules[currentModuleIndex + 1].id,
        lessonId: courseData.modules[currentModuleIndex + 1].lessons[0].id
      };
    }
    return null;
  };

  const getPrevLesson = () => {
    // Find previous lesson logic
    const currentModuleIndex = courseData.modules.findIndex(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === currentLessonId) || 0;
    
    if (currentModule && currentLessonIndex > 0) {
      return {
        moduleId: currentModuleId,
        lessonId: currentModule.lessons[currentLessonIndex - 1].id
      };
    } else if (currentModuleIndex > 0) {
      const prevModule = courseData.modules[currentModuleIndex - 1];
      return {
        moduleId: prevModule.id,
        lessonId: prevModule.lessons[prevModule.lessons.length - 1].id
      };
    }
    return null;
  };

  return (
    <CourseAccessGuard courseId="ai-copywriting-course">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Vissza a főoldalra</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900 hidden md:block">
              {courseData.title}
            </h1>
            <div className="flex items-center gap-3 bg-teal-50 px-4 py-2 rounded-full border border-teal-200">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">
                {getTotalProgress()}% befejezve
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-96 bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 mt-[73px] lg:mt-0 shadow-xl lg:shadow-none`}>
          
          <div className="h-full flex flex-col">
            {/* Enhanced Sidebar Header */}
            <div className="p-6 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 text-white relative overflow-hidden">
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
                      AI Copywriting Kurzus
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight mb-3">
                    {courseData.title}
                  </h2>
                  <p className="text-teal-100 text-sm leading-relaxed">
                    {courseData.description}
                  </p>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">{courseData.modules.length}</div>
                    <div className="text-xs text-teal-100">Modul</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">
                      {courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                    </div>
                    <div className="text-xs text-teal-100">Videó</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                    <div className="text-lg font-bold text-white">56</div>
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
                    {completedLessons.size} / {courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lecke befejezve
                    {completedLessons.size > 0 && (
                      <span className="ml-2">🎯</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {courseData.modules.map((module, moduleIndex) => {
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
                                if (window.innerWidth < 1024) setSidebarOpen(false); // Close on mobile
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
                                      {lesson.duration} perc
                                    </span>
                                    {lesson.type === 'video' && (
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        currentLessonId === lesson.id 
                                          ? 'bg-white/20 text-white' 
                                          : 'bg-blue-100 text-blue-700'
                                      }`}>
                                        Videó
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
            </div>

            {/* PDF Resources Section */}
            <div className="p-4 border-t border-gray-200/50">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900 text-sm">PDF Sablonok (7)</h3>
                </div>
                <div className="space-y-2">
                  {courseData.pdfs.slice(0, 3).map((pdf) => (
                    <a
                      key={pdf.id}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white/60 hover:bg-white/80 rounded-lg transition-colors group"
                    >
                      <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium group-hover:text-gray-900 line-clamp-1">
                        {pdf.title}
                      </span>
                    </a>
                  ))}
                  {courseData.pdfs.length > 3 && (
                    <p className="text-xs text-gray-500 text-center pt-2">
                      +{courseData.pdfs.length - 3} további PDF
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-6 max-w-5xl mx-auto">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-teal-600 mb-3">
                <span className="bg-teal-100 px-3 py-1 rounded-full font-medium">
                  {currentModule?.title}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {currentLesson?.title}
              </h1>
            </div>

            {/* Video Content */}
            {currentLesson?.type === 'video' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
                <div className="relative">
                  {/* Video Container */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl">
                    <div 
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: currentLesson.videoEmbed || '' }}
                    />
                  </div>
                  
                  {/* Video Info */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{currentLesson.duration} perc</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Play className="w-4 h-4" />
                        <span className="text-sm font-medium">HD videó</span>
                      </div>
                    </div>
                    
                    {!completedLessons.has(currentLessonId) && (
                      <button
                        onClick={() => markLessonComplete(currentLessonId)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const prev = getPrevLesson();
                    if (prev) {
                      navigateToLesson(prev.moduleId, prev.lessonId);
                      setExpandedModules(new Set(Array.from(expandedModules).concat(prev.moduleId)));
                    }
                  }}
                  disabled={!getPrevLesson()}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Előző lecke</span>
                </button>

                {/* Progress Indicator */}
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Kurzus előrehaladás</div>
                  <div className="text-2xl font-bold text-teal-600">{getTotalProgress()}%</div>
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
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
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