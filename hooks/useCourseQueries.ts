import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Course } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';

// For MVP development, use localhost. In production, use deployed functions URL
const FUNCTIONS_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api'
  : (process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-5k33v562ya-ew.a.run.app');

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetch(`${FUNCTIONS_BASE_URL}/courses`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      return data.courses || [];
    },
  });
};

export const useCourse = (id: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      console.log('🔍 [useCourse] Fetching course from API - Course ID:', id);
      
      try {
        // Build the API URL with optional auth token
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        // Add auth token if user is logged in
        if (user && auth.currentUser) {
          const token = await auth.currentUser.getIdToken();
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${FUNCTIONS_BASE_URL}/courses/${id}`, {
          headers,
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Course not found');
          }
          throw new Error(`Failed to fetch course: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success || !data.course) {
          throw new Error('Invalid response format');
        }
        
        // Transform the data to match our frontend structure
        const course = data.course;
        const modules = data.modules || [];
        const lessons = data.lessons || {};
        
        // Build the complete course object with nested modules and lessons
        const transformedCourse: Course = {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          shortDescription: course.shortDescription || course.description,
          status: course.status,
          
          // Instructor info
          instructor: {
            id: course.instructorId,
            firstName: course.instructorName?.split(' ')[0] || 'Unknown',
            lastName: course.instructorName?.split(' ').slice(1).join(' ') || 'Instructor',
            email: course.instructorEmail || '',
            role: 'INSTRUCTOR' as const,
            profilePictureUrl: course.instructorPhotoUrl,
            title: course.instructorBio,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
          },
          
          // Category
          category: {
            id: course.categoryId,
            name: course.categoryName || 'Uncategorized',
          },
          
          // Modules with nested lessons
          modules: modules.map((module: any) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            order: module.order,
            status: 'PUBLISHED' as const,
            totalLessons: module.totalLessons,
            totalDuration: module.totalDuration,
            lessons: (lessons[module.id] || []).map((lesson: any) => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              content: lesson.content,
              type: lesson.type,
              order: lesson.order,
              status: 'PUBLISHED' as const,
              videoUrl: lesson.content?.videoUrl,
              duration: lesson.duration,
              isFreePreview: lesson.isFreePreview,
              createdAt: lesson.createdAt,
              updatedAt: lesson.updatedAt,
            })),
          })),
          
          // Stats
          averageRating: course.averageRating || 0,
          reviewCount: course.totalReviews || 0,
          enrollmentCount: course.enrollmentCount || 0,
          
          // Media
          thumbnailUrl: course.thumbnailUrl || '/images/course-placeholder.png',
          previewVideoUrl: course.previewVideoUrl,
          
          // Pricing
          price: course.price || 0,
          isFree: course.isFree || false,
          stripePriceId: course.stripePriceId,
          
          // Learning info
          objectives: course.objectives || [],
          prerequisites: course.prerequisites || [],
          
          // Settings
          certificateEnabled: course.certificateEnabled || false,
          language: course.language || 'hu',
          difficulty: course.difficulty || 'BEGINNER',
          
          // Timestamps
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          publishDate: course.publishedAt,
          
          // Additional fields
          isPlus: course.isPlus || false,
          reviews: [],
        };
        
        console.log('✅ [useCourse] Successfully fetched course:', transformedCourse.title);
        return transformedCourse;
      } catch (error) {
        console.error('❌ [useCourse] Error fetching course:', error);
        
        // Fallback to integrated course data for ai-copywriting-course
        if (id === 'ai-copywriting-course') {
          console.log('⚠️ [useCourse] Using integrated course data for ai-copywriting-course');
          return ({
            id: id,
            title: 'Olvass a vevőid gondolataiban',
            slug: 'ai-copywriting-course',
            description: 'AI-alapú copywriting és marketingkutatás kurzus. Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.',
            shortDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel.',
            instructor: {
              id: 'zoltan-somosi',
              firstName: 'Somosi',
              lastName: 'Zoltán',
              email: 'zoltan@elira.hu',
              role: 'INSTRUCTOR' as const,
              profilePictureUrl: '/IMG_5730.JPG',
              title: 'Marketing Specialista & Doktorandusz',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            },
            category: {
              id: 'ai-marketing',
              name: 'AI Marketing'
            },
            modules: [
              {
                id: 'module-1',
                courseId: id,
                title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
                description: 'A kommunikációdban mindig te vagy a főhős, nem a vevő. Találd meg a közös nevezőt a vevőddel.',
                order: 0,
                totalLessons: 1,
                totalDuration: 240,
                status: 'PUBLISHED' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lessons: [
                  {
                    id: 'lesson-1-1',
                    moduleId: 'module-1',
                    courseId: id,
                    title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt, hogy a vevő azt mondja: „Pont ő kell nekem"',
                    description: 'A kommunikáció megfordításának technikája',
                    type: 'VIDEO' as const,
                    order: 0,
                    duration: 240,
                    videoUrl: 'https://player.mux.com/02emHt502GnvD7gW8GjfkzNQmWGkwQR7Rcin02HAbYBDzs?metadata-video-title=Hogyan+ford%C3%ADtsd+meg+a+kommunik%C3%A1ci%C3%B3t%2C+hogy+a+vev%C5%91+azt+mondja%3A+%E2%80%9EPont+%C5%91+kell+nekem%E2%80%9D&video-title=Hogyan+ford%C3%ADtsd+meg+a+kommunik%C3%A1ci%C3%B3t%2C+hogy+a+vev%C5%91+azt+mondja%3A+%E2%80%9EPont+%C5%91+kell+nekem%E2%80%9D',
                    isFreePreview: true,
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                ]
              },
              {
                id: 'module-2',
                courseId: id,
                title: 'Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak',
                description: 'Pontos célzás és célcsoport meghatározás AI eszközökkel.',
                order: 1,
                totalLessons: 3,
                totalDuration: 720,
                status: 'PUBLISHED' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lessons: [
                  {
                    id: 'lesson-2-1',
                    moduleId: 'module-2', 
                    courseId: id,
                    title: 'Pontos célzás, biztos találat - találj célba a célcsoportodnál',
                    description: 'Célcsoport meghatározás technikái',
                    type: 'VIDEO' as const,
                    order: 0,
                    duration: 240,
                    videoUrl: 'https://player.mux.com/9nUiGBHsu00erzpCSdEgfE2P27R4H2XqSMvZq02JOWzgM?metadata-video-title=Pontos+c%C3%A9lz%C3%A1s%2C+biztos+tal%C3%A1lat+-+tal%C3%A1lj+c%C3%A9lba+a+c%C3%A9lcsoportodn%C3%A1l&video-title=Pontos+c%C3%A9lz%C3%A1s%2C+biztos+tal%C3%A1lat+-+tal%C3%A1lj+c%C3%A9lba+a+c%C3%A9lcsoportodn%C3%A1l',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-2-2',
                    moduleId: 'module-2',
                    courseId: id,
                    title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?',
                    description: 'Piackutatás és trendanalízis',
                    type: 'VIDEO' as const,
                    order: 1,
                    duration: 240,
                    videoUrl: 'https://player.mux.com/Q5ai00WXITXwlLsiODwO2DGbGqXp5YnlIk7VPbUKzlRU?metadata-video-title=V%C3%A9lem%C3%A9nyek+%C3%A9s+trendek+-+hogyan+der%C3%ADtsd+ki+mire+v%C3%A1gynak+%C3%A9s+mit%C5%91l+f%C3%A9lnek+a+potenci%C3%A1lis+v%C3%A1s%C3%A1rl%C3%B3id%3F&video-title=V%C3%A9lem%C3%A9nyek+%C3%A9s+trendek+-+hogyan+der%C3%ADtsd+ki+mire+v%C3%A1gynak+%C3%A9s+mit%C5%91l+f%C3%A9lnek+a+potenci%C3%A1lis+v%C3%A1s%C3%A1rl%C3%B3id%3F',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-2-3',
                    moduleId: 'module-2',
                    courseId: id,
                    title: 'Összefoglalás - a legfontosabb vevői insightok',
                    description: 'Vevői megértés összegzése',
                    type: 'VIDEO' as const,
                    order: 2,
                    duration: 240,
                    videoUrl: 'https://player.mux.com/P004bsdgUZWZUkP00V2XHEz02jLciWlHW36UxRKjr5VSjs?metadata-video-title=%C3%96sszefoglal%C3%A1s+-+a+legfontosabb+vev%C5%91i+insightok&video-title=%C3%96sszefoglal%C3%A1s+-+a+legfontosabb+vev%C5%91i+insightok',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                ]
              },
              {
                id: 'module-3',
                courseId: id,
                title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
                description: 'Buyer persona készítés és piackutatás AI eszközökkel.',
                order: 2,
                totalLessons: 1,
                totalDuration: 540,
                status: 'PUBLISHED' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lessons: [
                  {
                    id: 'lesson-3-1',
                    moduleId: 'module-3',
                    courseId: id,
                    title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel, valós adatokból',
                    description: 'Buyer persona automatikus generálása',
                    type: 'VIDEO' as const,
                    order: 0,
                    duration: 540,
                    videoUrl: 'https://player.mux.com/Dj8qeORP01O2itqZzfqXnomhIB7c01HMn5Zraaltf6AAk?metadata-video-title=Buyer+persona+-+komplett+vev%C5%91i+profil+meghat%C3%A1roz%C3%A1sa+10+perc+alatt+ChatGPT-vel%2C+val%C3%B3s+adatokb%C3%B3l&video-title=Buyer+persona+-+komplett+vev%C5%91i+profil+meghat%C3%A1roz%C3%A1sa+10+perc+alatt+ChatGPT-vel%2C+val%C3%B3s+adatokb%C3%B3l',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                ]
              },
              {
                id: 'module-4',
                courseId: id,
                title: 'Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon',
                description: 'Pszichológiai triggerek és érzelmi copywriting technikák.',
                order: 3,
                totalLessons: 5,
                totalDuration: 720,
                status: 'PUBLISHED' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lessons: [
                  {
                    id: 'lesson-4-1',
                    moduleId: 'module-4',
                    courseId: id,
                    title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót!',
                    description: 'Érzelmi kapcsolat kialakítása',
                    type: 'VIDEO' as const,
                    order: 0,
                    duration: 120,
                    videoUrl: 'https://player.mux.com/4nerha00pbGODs00T2Z027GY4xKZBDhmVYrkxyiSAq01T01A?metadata-video-title=%C3%89rintsd+meg+a+sz%C3%ADv%C3%A9t%2C+azt%C3%A1n+a+fej%C3%A9t+-+%C3%ADgy+nyersz+%C3%B6r%C3%B6kre+v%C3%A1s%C3%A1rl%C3%B3t%21&video-title=%C3%89rintsd+meg+a+sz%C3%ADv%C3%A9t%2C+azt%C3%A1n+a+fej%C3%A9t+-+%C3%ADgy+nyersz+%C3%B6r%C3%B6kre+v%C3%A1s%C3%A1rl%C3%B3t%21',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-4-2',
                    moduleId: 'module-4',
                    courseId: id,
                    title: 'Használd a „Na és?" technikát, hogy eljuss az előnyökhöz',
                    description: 'Előnyök kommunikációja',
                    type: 'VIDEO' as const,
                    order: 1,
                    duration: 60,
                    videoUrl: 'https://player.mux.com/00N600Lzl6rQQxVBeOj02yUcHwTAer00W68fceHwxrdb00fM?metadata-video-title=Haszn%C3%A1ld+a+%22Na+%C3%A9s%3F%22+technik%C3%A1t%2C+hogy+eljuss+az+el%C5%91ny%C3%B6kh%C3%B6z&video-title=Haszn%C3%A1ld+a+%22Na+%C3%A9s%3F%22+technik%C3%A1t%2C+hogy+eljuss+az+el%C5%91ny%C3%B6kh%C3%B6z',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-4-3',
                    moduleId: 'module-4',
                    courseId: id,
                    title: 'Vevői elkötelezettség fázisai',
                    description: 'Vásárlói út megértése',
                    type: 'VIDEO' as const,
                    order: 2,
                    duration: 120,
                    videoUrl: 'https://player.mux.com/VsfzsYtdqZmvtvZgkW00NHZh7dIEEK02KlRpChf6eHyS4?metadata-video-title=Vev%C5%91i+elk%C3%B6telez%C5%91d%C3%A9s+f%C3%A1zisai&video-title=Vev%C5%91i+elk%C3%B6telez%C5%91d%C3%A9s+f%C3%A1zisai',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-4-4',
                    moduleId: 'module-4',
                    courseId: id,
                    title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt',
                    description: 'Üzenet fókuszálás AI-val',
                    type: 'VIDEO' as const,
                    order: 3,
                    duration: 120,
                    videoUrl: 'https://player.mux.com/OZzSCxaqpHJ59ZhhBfCSu02kDoFwvZJ3ayDWne4FjlDE?metadata-video-title=Mire+f%C3%B3kusz%C3%A1lj%2C+hogy+mindenki+meg%C3%A9rtsen%2C+%C3%A9s+v%C3%A1s%C3%A1roljanak+t%C5%91led%3F+Meghat%C3%A1rozzuk+az+MI+seg%C3%ADts%C3%A9g%C3%A9vel+2+perc+alatt+&video-title=Mire+f%C3%B3kusz%C3%A1lj%2C+hogy+mindenki+meg%C3%A9rtsen%2C+%C3%A9s+v%C3%A1s%C3%A1roljanak+t%C5%91led%3F+Meghat%C3%A1rozzuk+az+MI+seg%C3%ADts%C3%A9g%C3%A9vel+2+perc+alatt+',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-4-5',
                    moduleId: 'module-4',
                    courseId: id,
                    title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból',
                    description: 'Értékajánlat készítés',
                    type: 'VIDEO' as const,
                    order: 4,
                    duration: 300,
                    videoUrl: 'https://player.mux.com/8ysyo01m602YIhDH201dU8201I00TixT5l3derL3IBO1kv6I?metadata-video-title=Egyedi+%C3%A9rt%C3%A9k+%C3%A9s+%C3%A9rzelmi+aj%C3%A1nlat+kialak%C3%ADt%C3%A1sa+mesters%C3%A9ges+intelligencia+sablonb%C3%B3l&video-title=Egyedi+%C3%A9rt%C3%A9k+%C3%A9s+%C3%A9rzelmi+aj%C3%A1nlat+kialak%C3%ADt%C3%A1sa+mesters%C3%A9ges+intelligencia+sablonb%C3%B3l',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                ]
              },
              {
                id: 'module-5',
                courseId: id,
                title: 'Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra',
                description: 'Gyakorlati AI eszközök és generátorok használata.',
                order: 4,
                totalLessons: 7,
                totalDuration: 1140,
                status: 'PUBLISHED' as const,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                lessons: [
                  {
                    id: 'lesson-5-1',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Személyre szabott közösségi média poszt készítése 3 perc alatt',
                    description: 'Social media automatizáció',
                    type: 'VIDEO' as const,
                    order: 0,
                    duration: 180,
                    videoUrl: 'https://player.mux.com/sRIiDANomGGc01tVBzz5WaaOGL5MkBaupZuQ01T4AoiEM?metadata-video-title=Szem%C3%A9lyre+szabott+k%C3%B6z%C3%B6ss%C3%A9gi+m%C3%A9dia+poszt+k%C3%A9sz%C3%ADt%C3%A9se+3+perc+alatt+&video-title=Szem%C3%A9lyre+szabott+k%C3%B6z%C3%B6ss%C3%A9gi+m%C3%A9dia+poszt+k%C3%A9sz%C3%ADt%C3%A9se+3+perc+alatt+',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-2',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
                    description: 'Email marketing AI technikák',
                    type: 'VIDEO' as const,
                    order: 1,
                    duration: 300,
                    videoUrl: 'https://player.mux.com/h95zvWKWKweg51qHUu7gSegED900LToW2In9wDjiW4GQ?metadata-video-title=A+piac+nem+v%C3%A1r+-+%C3%ADgy+haszn%C3%A1ld+az+AI-t+E-mail+marketingre%2C+hogy+te+legy%C3%A9l+a+gy%C5%91ztes&video-title=A+piac+nem+v%C3%A1r+-+%C3%ADgy+haszn%C3%A1ld+az+AI-t+E-mail+marketingre%2C+hogy+te+legy%C3%A9l+a+gy%C5%91ztes',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-3',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Személyre szabott Facebook hirdetés 2 perc alatt',
                    description: 'Facebook Ads optimalizáció',
                    type: 'VIDEO' as const,
                    order: 2,
                    duration: 120,
                    videoUrl: 'https://player.mux.com/RvjZzGc8Y2dsaOx57RlTHF1Y7OoWY02vbNVT1OvtXwzo?metadata-video-title=Szem%C3%A9lyre+szabott+Facebook+hirdet%C3%A9s+2+perc+alatt&video-title=Szem%C3%A9lyre+szabott+Facebook+hirdet%C3%A9s+2+perc+alatt',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-4',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben',
                    description: 'Bulletpoint automatizáció',
                    type: 'VIDEO' as const,
                    order: 3,
                    duration: 180,
                    videoUrl: 'https://player.mux.com/BfpIGZ8xZ1RcrqKD01Qzk2TmSB729QB00QORhrq4HT8Qw?metadata-video-title=Bulletpoint+gener%C3%A1tor+-+bulletpointok+k%C3%A9sz%C3%ADt%C3%A9se+term%C3%A9koldalra%2C+landol%C3%B3+oldalra%2C+%C3%A9rt%C3%A9kes%C3%ADt%C3%A9si+oldalra+3+percben&video-title=Bulletpoint+gener%C3%A1tor+-+bulletpointok+k%C3%A9sz%C3%ADt%C3%A9se+term%C3%A9koldalra%2C+landol%C3%B3+oldalra%2C+%C3%A9rt%C3%A9kes%C3%ADt%C3%A9si+oldalra+3+percben',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-5',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz',
                    description: 'SEO blog content generálás',
                    type: 'VIDEO' as const,
                    order: 4,
                    duration: 180,
                    videoUrl: 'https://player.mux.com/OBtxOrngXliDZRbg00vemAUlrWGOXgayLirZHyYLqIKA?metadata-video-title=Blogposzt+gener%C3%A1tor+-+blog+posztok%2C+amivel+a+Google-ben+az+els%C5%91+oldalra+ker%C3%BClhetsz&video-title=Blogposzt+gener%C3%A1tor+-+blog+posztok%2C+amivel+a+Google-ben+az+els%C5%91+oldalra+ker%C3%BClhetsz',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-6',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírlevel spam-be',
                    description: 'Humanizált tartalom készítése',
                    type: 'VIDEO' as const,
                    order: 5,
                    duration: 60,
                    videoUrl: 'https://player.mux.com/zenvxOXRH8D31379FAyPYU3P1nnZnBjqdK22TsdywlQ?metadata-video-title=Hogyan+tedd+emberiv%C3%A9+a+sz%C3%B6veged%2C+hogy+ne+ker%C3%BClj%C3%B6n+a+h%C3%ADrleveled+spam-be&video-title=Hogyan+tedd+emberiv%C3%A9+a+sz%C3%B6veged%2C+hogy+ne+ker%C3%BClj%C3%B6n+a+h%C3%ADrleveled+spam-be',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  },
                  {
                    id: 'lesson-5-7',
                    moduleId: 'module-5',
                    courseId: id,
                    title: 'Befejezés, köszönet!',
                    description: 'Kurzus lezárása',
                    type: 'VIDEO' as const,
                    order: 6,
                    duration: 60,
                    videoUrl: 'https://player.mux.com/01qex0100vtX01evBwtGH8TRl182v02ifI9vmLBg2SAiRD1s?metadata-video-title=Befejez%C3%A9s%2C+k%C3%B6sz%C3%B6net%21&video-title=Befejez%C3%A9s%2C+k%C3%B6sz%C3%B6net%21',
                    status: 'PUBLISHED' as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }
                ]
              }
            ],
            averageRating: 4.9,
            reviewCount: 89,
            enrollmentCount: 312,
            thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
            previewVideoUrl: 'https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg',
            reviews: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            certificateEnabled: true,
            language: 'hu',
            difficulty: 'INTERMEDIATE' as const,
            publishDate: new Date().toISOString(),
            isPlus: true,
            status: 'PUBLISHED' as const,
            price: 9990,
            currency: 'HUF',
            isFree: false,
            stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',
            objectives: [
              'Buyer persona kidolgozása 10 perc alatt MI segítségével',
              'Versenytárs analízis automatizálása AI eszközökkel', 
              'Pszichológiai triggerek alkalmazása a copywritingban',
              'Email marketing automatizáció készítése',
              'Facebook Ads copy generátor használata',
              'Social media tartalom tervezés AI-val'
            ],
            prerequisites: [
              'Alapvető számítógépes ismeretek',
              'Magyar nyelv magas szintű ismerete',
              'Nyitottság az új technológiák iránt',
              'Vállalkozói vagy marketinges háttér előny'
            ]
          } as unknown as Course);
        }
        
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2,
  });
};

export const useUpdateLessonProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      lessonId,
      progress,
    }: {
      courseId: string;
      lessonId: string;
      progress: number;
    }) => {
      const response = await fetch(`${FUNCTIONS_BASE_URL}/lessons/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, lessonId, progress }),
      });
      if (!response.ok) throw new Error('Failed to mark lesson as complete');
      const data = await response.json();
      return data;
    },
    onSuccess: (_, { courseId }) => {
      // Invalidate and refetch course data
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
    },
  });
};

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (courseId: string) => {
      // Check authentication
      if (!user) {
        throw new Error('Bejelentkezés szükséges a kurzusra való feliratkozáshoz');
      }
      
      // Get auth token
      const token = await auth.currentUser?.getIdToken();
      
      const response = await fetch(`${FUNCTIONS_BASE_URL}/enrollments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId }),
      });
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Beiratkozás sikertelen');
      }
      
      return data;
    },
    onSuccess: (_, courseId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};