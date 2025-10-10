/**
 * Create modules and lessons for production course
 */

const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();
const courseId = 'ai-copywriting-course';

async function createModulesAndLessons() {
  console.log('🌱 Creating modules and lessons for production course...');

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
          duration: 240,
          type: 'VIDEO',
          order: 0,
          isFreePreview: true
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
          duration: 240,
          type: 'VIDEO',
          order: 0
        },
        {
          id: 'lesson-2-2',
          title: 'Vélemények és trendek - hogyan derítsd ki mire vágynak és mitől félnek a potenciális vásárlóid?',
          duration: 240,
          type: 'VIDEO',
          order: 1
        },
        {
          id: 'lesson-2-3',
          title: 'Összefoglalás - a legfontosabb vevői insightok',
          duration: 240,
          type: 'VIDEO',
          order: 2
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
          duration: 540,
          type: 'VIDEO',
          order: 0
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
          duration: 120,
          type: 'VIDEO',
          order: 0
        },
        {
          id: 'lesson-4-2',
          title: 'Használd a „Na és?" technikát, hogy eljuss az előnyökhöz',
          duration: 60,
          type: 'VIDEO',
          order: 1
        },
        {
          id: 'lesson-4-3',
          title: 'Vevői elkötelezettség fázisai',
          duration: 120,
          type: 'VIDEO',
          order: 2
        },
        {
          id: 'lesson-4-4',
          title: 'Mire fókuszálj, hogy mindenki megértsen, és vásároljanak tőled? Meghatározzuk az MI segítségével 2 perc alatt',
          duration: 120,
          type: 'VIDEO',
          order: 3
        },
        {
          id: 'lesson-4-5',
          title: 'Egyedi érték és érzelmi ajánlat kialakítása mesterséges intelligencia sablonból',
          duration: 300,
          type: 'VIDEO',
          order: 4
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
          duration: 180,
          type: 'VIDEO',
          order: 0
        },
        {
          id: 'lesson-5-2',
          title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
          duration: 300,
          type: 'VIDEO',
          order: 1
        },
        {
          id: 'lesson-5-3',
          title: 'Személyre szabott Facebook hirdetés 2 perc alatt',
          duration: 120,
          type: 'VIDEO',
          order: 2
        },
        {
          id: 'lesson-5-4',
          title: 'Bulletpoint generátor - bulletpointok készítése termékoldalra, landoló oldalra, értékesítési oldalra 3 percben',
          duration: 180,
          type: 'VIDEO',
          order: 3
        },
        {
          id: 'lesson-5-5',
          title: 'Social media poszt gyors posztoláshoz - 2 perc alatt',
          duration: 120,
          type: 'VIDEO',
          order: 4
        },
        {
          id: 'lesson-5-6',
          title: 'Landing oldal generátor - értékesítési oldal készítése 5 percben',
          duration: 180,
          type: 'VIDEO',
          order: 5
        },
        {
          id: 'lesson-5-7',
          title: 'Hirdetési hook készítő - szöveg és képgenerátor facebook hirdetéshez 3 perc alatt',
          duration: 60,
          type: 'VIDEO',
          order: 6
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
        duration: lesson.duration,
        type: lesson.type,
        order: lesson.order,
        isFreePreview: lesson.isFreePreview || false,
        status: 'PUBLISHED',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('lessons').doc(lesson.id).set(lessonData);
      totalLessons++;
      console.log(`      📖 Lesson created: ${lesson.id}`);
    }
  }

  console.log(`\n✅ All modules and lessons created successfully!`);
  console.log(`   Total Modules: ${totalModules}`);
  console.log(`   Total Lessons: ${totalLessons}`);

  process.exit(0);
}

createModulesAndLessons().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
