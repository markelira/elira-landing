const admin = require('firebase-admin');

// Initialize Firebase Admin for emulator
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

async function updateCourseFromHomepage() {
  try {
    console.log('🔄 Updating ai-copywriting-course with homepage data...');
    
    const courseId = 'ai-copywriting-course';
    
    // Complete course data extracted from homepage components
    const courseData = {
      // Basic info
      title: 'Olvass a vevőid gondolataiban',
      slug: 'ai-copywriting-course',
      description: 'AI-alapú copywriting és marketingkutatás kurzus. Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.',
      shortDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel.',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      
      // Instructor - from ZoliIntroduction component
      instructorId: 'zoltan-somosi',
      instructorName: 'Somosi Zoltán',
      instructorEmail: 'zoltan@elira.hu',
      instructorBio: 'E-mail és trigger marketing specialista a Heureka Groupnál, és doktorandusz a Miskolci Egyetemen, ahol a mesterséges intelligencia és az online marketing hatékonysága a kutatási területem.',
      instructorPhotoUrl: '/IMG_5730.JPG',
      instructorTitle: 'Marketing Specialista & Doktorandusz',
      instructorInstitution: 'Miskolci Egyetem & Heureka Group',
      instructorLinkedIn: 'https://linkedin.com/in/zoltán-somosi-299605226',
      
      // Category
      categoryId: 'ai-marketing',
      categoryName: 'AI Marketing',
      language: 'hu',
      difficulty: 'INTERMEDIATE',
      
      // Media
      thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
      previewVideoUrl: 'https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg',
      
      // Pricing - from PricingSection and Stripe configuration
      price: 9990,
      currency: 'HUF',
      isFree: false,
      stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',
      stripeProductId: 'prod_SwFQ50r0KCrxss',
      
      // Learning objectives - from CourseDetailsSection highlights
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
      ],
      
      targetAudience: [
        'Vállalkozók, akik megunta, hogy minden fillért ügynökségekre költ',
        'Marketingesek, akiket a főnök folyamatosan szorít jobb számokért',
        'Akik tisztában vannak vele, hogy lemaradnak az AI forradalomról'
      ],
      
      // Course features - from homepage components
      features: [
        'Buyer persona készítése 5 perc alatt MI segítségével',
        'Fájdalompontok feltárása automatizált módszerekkel',
        'Profitnövelő szövegírás AI-val',
        'MI-sablonok készítése és használata',
        'Konkrét példák és gyakorlatok',
        '7 letölthető PDF sablon',
        'Azonnali hozzáférés',
        '30 napos pénzvisszafizetési garancia'
      ],
      
      // Settings
      certificateEnabled: true,
      
      // Stats - from homepage
      enrollmentCount: 312,
      completionCount: 200,
      averageRating: 4.9,
      totalReviews: 89,
      
      // Content stats - from CourseDetailsSection
      totalModules: 5,
      totalLessons: 17,
      totalDuration: 3360, // 56 minutes in seconds
      totalVideos: 17,
      totalPDFs: 7,
      
      // Timestamps
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp(),
      
      // Additional metadata
      isPlus: true,
      isFeatured: true,
      tags: ['AI', 'Copywriting', 'Marketing', 'ChatGPT', 'Email Marketing', 'Facebook Ads'],
      seoKeywords: ['AI copywriting', 'mesterséges intelligencia marketing', 'ChatGPT copywriting', 'buyer persona', 'email marketing'],
      
      // Course value proposition
      courseValue: {
        totalComponentValue: 32000, // From PricingSection calculation
        actualPrice: 9990,
        savings: 22010,
        valueComponents: [
          { text: '5 modul, 17 videó (56 perc)', value: 8000 },
          { text: '7 AI generátor PDF', value: 5000 },
          { text: 'Gyakorlati AI prompt sablonok', value: 3000 },
          { text: 'Doktorandusz oktató szakértelem', value: 12000 },
          { text: 'Magyar piacra szabott tartalom', value: 4000 }
        ]
      }
    };
    
    // Update the course document
    await db.collection('courses').doc(courseId).set(courseData, { merge: true });
    console.log('✅ Course updated with homepage data:', courseId);
    
    // Create/update modules with detailed content from CourseDetailsSection
    const modules = [
      {
        id: 'module-1',
        courseId,
        title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
        description: 'A kommunikációdban mindig te vagy a főhős, nem a vevő. Találd meg a közös nevezőt a vevőddel.',
        order: 0,
        totalLessons: 1,
        totalDuration: 240, // 4 minutes
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
        totalDuration: 720, // 12 minutes
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
        totalDuration: 540, // 9 minutes
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
        totalDuration: 720, // 12 minutes
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
        totalDuration: 1140, // 19 minutes
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
            title: 'Blogposzt generátor - blog posztok, amivel a Google-ben az első oldalra kerülhetsz',
            duration: 180,
            type: 'VIDEO',
            order: 4
          },
          {
            id: 'lesson-5-6',
            title: 'Hogyan tedd emberivé a szöveged, hogy ne kerüljön a hírlevel spam-be',
            duration: 60,
            type: 'VIDEO',
            order: 5
          },
          {
            id: 'lesson-5-7',
            title: 'Befejezés, köszönet!',
            duration: 60,
            type: 'VIDEO',
            order: 6
          }
        ]
      }
    ];

    // PDF resources - from CourseDetailsSection
    const pdfResources = [
      'Blogposzt generátor.pdf',
      'Bulletpoint generátor.pdf', 
      'Buyer persona generátor.pdf',
      'Buyer persona.pdf',
      'email marketing generátor.pdf',
      'Facebook ads copy generátor.pdf',
      'Közösségi média poszt generátor.pdf'
    ];

    // Add PDF resources to course data
    courseData.pdfResources = pdfResources;
    courseData.totalPDFs = pdfResources.length;

    // Update the main course document
    await db.collection('courses').doc(courseId).set(courseData, { merge: true });
    console.log('✅ Main course document updated');

    // Create/update modules and lessons
    const batch = db.batch();
    
    for (const module of modules) {
      const moduleRef = db.collection('modules').doc(module.id);
      const { lessons, ...moduleData } = module;
      
      batch.set(moduleRef, {
        ...moduleData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // Create lessons for this module
      for (const lesson of lessons) {
        const lessonRef = db.collection('lessons').doc(lesson.id);
        batch.set(lessonRef, {
          ...lesson,
          moduleId: module.id,
          courseId,
          description: `${lesson.title} - részletes magyarázat`,
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }
    }

    // Create PDF resource documents
    for (let i = 0; i < pdfResources.length; i++) {
      const pdfName = pdfResources[i];
      const pdfRef = db.collection('course-resources').doc(`pdf-${i + 1}`);
      batch.set(pdfRef, {
        courseId,
        type: 'PDF',
        title: pdfName,
        filename: pdfName,
        downloadUrl: `/docs/${pdfName}`,
        order: i,
        isPublished: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    // Commit all changes
    await batch.commit();
    console.log('✅ Modules, lessons, and resources created/updated');
    
    console.log('\n🎉 Course integration complete!');
    console.log(`📍 Course ID: ${courseId}`);
    console.log(`💰 Price: ${courseData.price} ${courseData.currency}`);
    console.log(`💳 Stripe Price ID: ${courseData.stripePriceId}`);
    console.log(`🔗 Product ID: ${courseData.stripeProductId}`);
    console.log(`📚 Total Modules: ${modules.length}`);
    console.log(`📖 Total Lessons: ${modules.reduce((sum, m) => sum + m.lessons.length, 0)}`);
    console.log(`📄 Total PDFs: ${pdfResources.length}`);
    console.log(`⏱️ Total Duration: ${Math.round(courseData.totalDuration / 60)} minutes`);
    
  } catch (error) {
    console.error('❌ Error updating course:', error);
  } finally {
    process.exit(0);
  }
}

updateCourseFromHomepage();