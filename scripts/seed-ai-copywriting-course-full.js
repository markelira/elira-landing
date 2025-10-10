/**
 * Seed full AI Copywriting Course with all modules, lessons, video URLs, and PDF resources
 * For EMULATOR use only
 */

const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();
const courseId = 'ai-copywriting-course';

// PDF Resources mapping
const pdfResources = {
  'blogpost': {
    id: 'pdf-blogpost',
    title: 'Blogposzt generátor',
    description: 'AI prompt sablon blogposzt íráshoz',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1jw4_izUgnQHpnWDUswOCbKH0h6gkltcf/view?usp=sharing',
    isPublic: true
  },
  'bulletpoint': {
    id: 'pdf-bulletpoint',
    title: 'Bulletpoint generátor',
    description: 'AI prompt sablon bulletpointok készítéséhez',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/13adEI925qZLbmtnnWKUrhggkH5fhDVMC/view?usp=sharing',
    isPublic: true
  },
  'buyer-persona-generator': {
    id: 'pdf-buyer-persona-gen',
    title: 'Buyer persona generátor',
    description: 'AI prompt sablon buyer persona készítéséhez',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1dfaiqQBV6hOOz_Iz1sANStfyNJvqGCMy/view?usp=sharing',
    isPublic: true
  },
  'buyer-persona': {
    id: 'pdf-buyer-persona',
    title: 'Buyer persona',
    description: 'Buyer persona dokumentum sablon',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1N8WaQQvskCiutXYPOD089leAhhMXijW3/view?usp=sharing',
    isPublic: true
  },
  'email-marketing': {
    id: 'pdf-email-marketing',
    title: 'Email marketing generátor',
    description: 'AI prompt sablon email kampányokhoz',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1PnfgOCkNT29s6I4p5vJVAvKjaedrdffw/view?usp=sharing',
    isPublic: true
  },
  'facebook-ads': {
    id: 'pdf-facebook-ads',
    title: 'Facebook ads copy generátor',
    description: 'AI prompt sablon Facebook hirdetésekhez',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1yCLa-UhSzdlxBsGzz3JkrNtXirPQ8jJV/view?usp=sharing',
    isPublic: true
  },
  'social-media': {
    id: 'pdf-social-media',
    title: 'Közösségi média poszt generátor',
    description: 'AI prompt sablon social media tartalmakhoz',
    type: 'PDF',
    url: 'https://drive.google.com/file/d/1M9eSYzQd7qkTy1KhBkLkBNwmV-x7XErE/view?usp=sharing',
    isPublic: true
  }
};

async function seedFullCourse() {
  console.log('🌱 Seeding full AI Copywriting Course...\n');

  const modules = [
    {
      id: 'module-1',
      courseId,
      title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
      description: 'A kommunikációdban mindig te vagy a főhős, nem a vevő. Találd meg a közös nevezőt a vevőddel.',
      order: 0,
      totalLessons: 1,
      totalDuration: 240,
      status: 'PUBLISHED',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Bevezetés - Hogyan fordítsd meg a kommunikációt, hogy a vevő azt mondja: „Pont ő kell nekem"',
          description: 'A kommunikáció megfordításának technikája',
          duration: 240,
          type: 'VIDEO',
          order: 0,
          isFreePreview: true,
          content: {
            videoUrl: 'https://player.mux.com/02emHt502GnvD7gW8GjfkzNQmWGkwQR7Rcin02HAbYBDzs',
            videoProvider: 'mux'
          }
        }
      ]
    },
    {
      id: 'module-2',
      courseId,
      title: 'Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak',
      description: 'Pontos célzás és célcsoport meghatározás AI eszközökkel.',
      order: 1,
      totalLessons: 3,
      totalDuration: 720,
      status: 'PUBLISHED',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Pontos célzás, biztos találat - találj célba a célcsoportodnál',
          description: 'Célcsoport meghatározás technikái',
          duration: 240,
          type: 'VIDEO',
          order: 0,
          content: {
            videoUrl: 'https://player.mux.com/9nUiGBHsu00erzpCSdEgfE2P27R4H2XqSMvZq02JOWzgM',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-2-2',
          title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?',
          description: 'Piackutatás és trendanalízis',
          duration: 240,
          type: 'VIDEO',
          order: 1,
          content: {
            videoUrl: 'https://player.mux.com/Q5ai00WXITXwlLsiODwO2DGbGqXp5YnlIk7VPbUKzlRU',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-2-3',
          title: 'Összefoglalás - a legfontosabb vevői insightok',
          description: 'Vevői megértés összegzése',
          duration: 240,
          type: 'VIDEO',
          order: 2,
          content: {
            videoUrl: 'https://player.mux.com/P004bsdgUZWZUkP00V2XHEz02jLciWlHW36UxRKjr5VSjs',
            videoProvider: 'mux'
          }
        }
      ]
    },
    {
      id: 'module-3',
      courseId,
      title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
      description: 'Buyer persona készítés és piackutatás AI eszközökkel.',
      order: 2,
      totalLessons: 1,
      totalDuration: 540,
      status: 'PUBLISHED',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Buyer persona - komplett vevői profil meghatározása 10 perc alatt ChatGPT-vel, valós adatokból',
          description: 'Buyer persona automatikus generálása',
          duration: 540,
          type: 'VIDEO',
          order: 0,
          content: {
            videoUrl: 'https://player.mux.com/Dj8qeORP01O2itqZzfqXnomhIB7c01HMn5Zraaltf6AAk',
            videoProvider: 'mux'
          },
          resources: [
            pdfResources['buyer-persona-generator'],
            pdfResources['buyer-persona']
          ]
        }
      ]
    },
    {
      id: 'module-4',
      courseId,
      title: 'Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon',
      description: 'Pszichológiai triggerek és érzelmi copywriting technikák.',
      order: 3,
      totalLessons: 5,
      totalDuration: 720,
      status: 'PUBLISHED',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót!',
          description: 'Érzelmi kapcsolat kialakítása',
          duration: 120,
          type: 'VIDEO',
          order: 0,
          content: {
            videoUrl: 'https://player.mux.com/4nerha00pbGODs00T2Z027GY4xKZBDhmVYrkxyiSAq01T01A',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-4-2',
          title: 'Használd a „Na és?" technikát, hogy eljuss az előnyökhöz',
          description: 'Előnyök kommunikációja',
          duration: 60,
          type: 'VIDEO',
          order: 1,
          content: {
            videoUrl: 'https://player.mux.com/00N600Lzl6rQQxVBeOj02yUcHwTAer00W68fceHwxrdb00fM',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-4-3',
          title: 'Vevői elkötelezettség fázisai',
          description: 'Vásárlói út megértése',
          duration: 120,
          type: 'VIDEO',
          order: 2,
          content: {
            videoUrl: 'https://player.mux.com/VsfzsYtdqZmvtvZgkW00NHZh7dIEEK02KlRpChf6eHyS4',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-4-4',
          title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt',
          description: 'Üzenet fókuszálás AI-val',
          duration: 120,
          type: 'VIDEO',
          order: 3,
          content: {
            videoUrl: 'https://player.mux.com/OZzSCxaqpHJ59ZhhBfCSu02kDoFwvZJ3ayDWne4FjlDE',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-4-5',
          title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból',
          description: 'Értékajánlat készítés',
          duration: 300,
          type: 'VIDEO',
          order: 4,
          content: {
            videoUrl: 'https://player.mux.com/8ysyo01m602YIhDH201dU8201I00TixT5l3derL3IBO1kv6I',
            videoProvider: 'mux'
          }
        }
      ]
    },
    {
      id: 'module-5',
      courseId,
      title: 'Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra',
      description: 'Gyakorlati AI eszközök és generátorok használata.',
      order: 4,
      totalLessons: 7,
      totalDuration: 1140,
      status: 'PUBLISHED',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Személyre szabott közösségi média poszt készítése 3 perc alatt',
          description: 'Social media automatizáció',
          duration: 180,
          type: 'VIDEO',
          order: 0,
          content: {
            videoUrl: 'https://player.mux.com/sRIiDANomGGc01tVBzz5WaaOGL5MkBaupZuQ01T4AoiEM',
            videoProvider: 'mux'
          },
          resources: [pdfResources['social-media']]
        },
        {
          id: 'lesson-5-2',
          title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
          description: 'Email marketing AI technikák',
          duration: 300,
          type: 'VIDEO',
          order: 1,
          content: {
            videoUrl: 'https://player.mux.com/h95zvWKWKweg51qHUu7gSegED900LToW2In9wDjiW4GQ',
            videoProvider: 'mux'
          },
          resources: [pdfResources['email-marketing']]
        },
        {
          id: 'lesson-5-3',
          title: 'Személyre szabott Facebook hirdetés 2 perc alatt',
          description: 'Facebook Ads optimalizáció',
          duration: 120,
          type: 'VIDEO',
          order: 2,
          content: {
            videoUrl: 'https://player.mux.com/RvjZzGc8Y2dsaOx57RlTHF1Y7OoWY02vbNVT1OvtXwzo',
            videoProvider: 'mux'
          },
          resources: [pdfResources['facebook-ads']]
        },
        {
          id: 'lesson-5-4',
          title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben',
          description: 'Bulletpoint automatizáció',
          duration: 180,
          type: 'VIDEO',
          order: 3,
          content: {
            videoUrl: 'https://player.mux.com/BfpIGZ8xZ1RcrqKD01Qzk2TmSB729QB00QORhrq4HT8Qw',
            videoProvider: 'mux'
          },
          resources: [pdfResources['bulletpoint']]
        },
        {
          id: 'lesson-5-5',
          title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz',
          description: 'SEO blog content generálás',
          duration: 120,
          type: 'VIDEO',
          order: 4,
          content: {
            videoUrl: 'https://player.mux.com/OBtxOrngXliDZRbg00vemAUlrWGOXgayLirZHyYLqIKA',
            videoProvider: 'mux'
          },
          resources: [pdfResources['blogpost']]
        },
        {
          id: 'lesson-5-6',
          title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírleveled spam-be',
          description: 'Humanizált tartalom készítése',
          duration: 180,
          type: 'VIDEO',
          order: 5,
          content: {
            videoUrl: 'https://player.mux.com/zenvxOXRH8D31379FAyPYU3P1nnZnBjqdK22TsdywlQ',
            videoProvider: 'mux'
          }
        },
        {
          id: 'lesson-5-7',
          title: 'Befejezés, köszönet!',
          description: 'Kurzus lezárása',
          duration: 60,
          type: 'VIDEO',
          order: 6,
          content: {
            videoUrl: 'https://player.mux.com/01qex0100vtX01evBwtGH8TRl182v02ifI9vmLBg2SAiRD1s',
            videoProvider: 'mux'
          }
        }
      ]
    }
  ];

  // Create modules and lessons
  let totalModules = 0;
  let totalLessons = 0;

  for (const module of modules) {
    console.log(`\n📦 Creating module: ${module.title}`);

    // Create module document
    const moduleData = {
      courseId: module.courseId,
      title: module.title,
      description: module.description,
      order: module.order,
      totalLessons: module.totalLessons,
      totalDuration: module.totalDuration,
      status: module.status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('modules').doc(module.id).set(moduleData);
    totalModules++;
    console.log(`   ✅ Module created: ${module.id}`);

    // Create lesson documents
    for (const lesson of module.lessons) {
      const lessonData = {
        courseId: module.courseId,
        moduleId: module.id,
        title: lesson.title,
        description: lesson.description || '',
        duration: lesson.duration,
        type: lesson.type,
        order: lesson.order,
        content: lesson.content,
        resources: lesson.resources || [],
        isFreePreview: lesson.isFreePreview || false,
        status: 'PUBLISHED',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('lessons').doc(lesson.id).set(lessonData);
      totalLessons++;
      const resourceInfo = lesson.resources ? ` + ${lesson.resources.length} PDF(s)` : '';
      console.log(`      📖 Lesson created: ${lesson.id} (with video${resourceInfo})`);
    }
  }

  // Update course with correct stats
  await db.collection('courses').doc(courseId).update({
    totalModules,
    totalLessons,
    totalDuration: modules.reduce((sum, m) => sum + m.totalDuration, 0),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`\n✅ Full AI Copywriting Course seeded successfully!`);
  console.log(`   Total Modules: ${totalModules}`);
  console.log(`   Total Lessons: ${totalLessons}`);
  console.log(`   Course ID: ${courseId}`);
  console.log(`\n🔗 Access at: http://localhost:3000/courses/${courseId}/learn\n`);

  process.exit(0);
}

seedFullCourse().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
