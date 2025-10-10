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

async function seedTestCourse() {
  try {
    console.log('🌱 Seeding test course...');
    
    // Create a test course (matching production structure)
    const courseId = 'ai-copywriting-course';
    const courseData = {
      title: 'AI Copywriting Kurzus - Teljes Program',
      slug: 'ai-copywriting-course',
      description: `Ez a gyakorlatorientált kurzus mindent megtanít, amit tudnod kell a modern AI-alapú copywritingról.
      
      A kurzus során megismered a ChatGPT és más AI eszközök hatékony használatát, megtanulod a prompt engineering alapjait és haladó technikáit, valamint valós projekteken keresztül gyakorolhatod a konverziót növelő szövegek írását.
      
      A kurzus végére képes leszel önállóan, professzionális szinten használni az AI eszközöket copywriting feladatokhoz, legyen szó landing page-ekről, email kampányokról, vagy social media tartalmakról.`,
      shortDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel.',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      
      // Instructor
      instructorId: 'instructor-1',
      instructorName: 'Kovács András',
      instructorEmail: 'andras@elira.hu',
      instructorBio: 'Digital marketing szakértő 10+ év tapasztalattal',
      
      // Category
      categoryId: 'marketing',
      categoryName: 'Digital Marketing',
      language: 'hu',
      difficulty: 'INTERMEDIATE',
      
      // Media
      thumbnailUrl: '/images/course-ai-copywriting.jpg',
      
      // Pricing
      price: 29900,
      currency: 'HUF',
      isFree: false,
      
      // Learning
      objectives: [
        'AI eszközök hatékony használata copywritinghoz',
        'ChatGPT prompt engineering technikák elsajátítása',
        'Konverziót növelő szövegtípusok megismerése',
        'Landing page és email szövegek írása',
        'A/B tesztelés és optimalizálás AI segítségével'
      ],
      prerequisites: [
        'Alapvető számítógépes ismeretek',
        'Magyar nyelv magas szintű ismerete',
        'Nyitottság az új technológiák iránt'
      ],
      targetAudience: [
        'Marketing szakemberek',
        'Vállalkozók',
        'Content creatorok',
        'Freelancer szövegírók'
      ],
      
      // Settings
      certificateEnabled: true,
      
      // Stats
      enrollmentCount: 234,
      completionCount: 156,
      averageRating: 4.8,
      totalReviews: 89,
      
      // Content stats
      totalModules: 3,
      totalLessons: 12,
      totalDuration: 14400, // 4 hours in seconds
      
      // Timestamps
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save course
    await db.collection('courses').doc(courseId).set(courseData);
    console.log('✅ Course created:', courseId);
    
    // Create modules
    const modules = [
      {
        courseId,
        title: 'AI Copywriting Alapok',
        description: 'Ismerkedj meg az AI copywriting világával és az alapvető eszközökkel',
        order: 0,
        totalLessons: 4,
        totalDuration: 4800
      },
      {
        courseId,
        title: 'Haladó Prompt Engineering',
        description: 'Sajátítsd el a professzionális prompt írás művészetét',
        order: 1,
        totalLessons: 4,
        totalDuration: 4800
      },
      {
        courseId,
        title: 'Gyakorlati Projektek',
        description: 'Valós példákon keresztül gyakorold a tanultakat',
        order: 2,
        totalLessons: 4,
        totalDuration: 4800
      }
    ];
    
    const moduleIds = [];
    for (const module of modules) {
      const moduleRef = await db.collection('modules').add({
        ...module,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      moduleIds.push(moduleRef.id);
      console.log('✅ Module created:', module.title);
    }
    
    // Create lessons
    const lessonsData = [
      // Module 1 lessons
      [
        { title: 'Bevezetés az AI copywritingba', duration: 1200, type: 'VIDEO' },
        { title: 'ChatGPT beállítása és alapok', duration: 1200, type: 'VIDEO' },
        { title: 'Az első AI asszisztált szöveg', duration: 1200, type: 'VIDEO' },
        { title: 'Gyakorlati feladat: Első projekt', duration: 1200, type: 'ASSIGNMENT' }
      ],
      // Module 2 lessons
      [
        { title: 'Prompt struktúrák és technikák', duration: 1200, type: 'VIDEO' },
        { title: 'Kontextus és hangnem beállítása', duration: 1200, type: 'VIDEO' },
        { title: 'Iteratív finomhangolás', duration: 1200, type: 'VIDEO' },
        { title: 'Haladó prompt minták', duration: 1200, type: 'TEXT' }
      ],
      // Module 3 lessons
      [
        { title: 'Landing page projekt', duration: 1200, type: 'VIDEO' },
        { title: 'Email kampány tervezése', duration: 1200, type: 'VIDEO' },
        { title: 'Social media tartalmak', duration: 1200, type: 'VIDEO' },
        { title: 'Záró projekt és értékelés', duration: 1200, type: 'ASSIGNMENT' }
      ]
    ];
    
    for (let i = 0; i < moduleIds.length; i++) {
      const moduleId = moduleIds[i];
      const lessons = lessonsData[i];
      
      for (let j = 0; j < lessons.length; j++) {
        const lesson = lessons[j];
        await db.collection('lessons').add({
          moduleId,
          courseId,
          title: lesson.title,
          type: lesson.type,
          duration: lesson.duration,
          order: j,
          description: `${lesson.title} - részletes leírás`,
          isFreePreview: j === 0, // First lesson is free preview
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      console.log(`✅ Lessons created for module ${i + 1}`);
    }
    
    console.log('\n🎉 Test course seeded successfully!');
    console.log(`📍 Course ID: ${courseId}`);
    console.log(`🔗 View at: http://localhost:3000/courses/${courseId}/learn`);
    
  } catch (error) {
    console.error('❌ Error seeding course:', error);
  } finally {
    process.exit(0);
  }
}

seedTestCourse();