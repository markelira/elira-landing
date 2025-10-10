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

async function seedFullEmulator() {
  try {
    console.log('🌱 Seeding full emulator environment...\n');

    // ============================================================================
    // 1. CREATE COURSE
    // ============================================================================
    console.log('📚 Creating course...');
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

      instructorId: 'instructor-1',
      instructorName: 'Kovács András',
      instructorEmail: 'andras@elira.hu',
      instructorBio: 'Digital marketing szakértő 10+ év tapasztalattal',

      categoryId: 'marketing',
      categoryName: 'Digital Marketing',
      language: 'hu',
      difficulty: 'INTERMEDIATE',

      thumbnailUrl: '/images/course-ai-copywriting.jpg',

      price: 29900,
      currency: 'HUF',
      isFree: false,

      objectives: [
        'AI eszközök hatékony használata copywritinghoz',
        'ChatGPT prompt engineering technikák elsajátítása',
        'Konverziót növelő szövegtípusok megismerése',
        'Landing page és email szövegek írása',
        'A/B tesztelés és optimalizálás AI segítségével'
      ],

      certificateEnabled: true,
      enrollmentCount: 234,
      completionCount: 156,
      averageRating: 4.8,
      totalReviews: 89,

      totalDuration: 3600,
      totalLessons: 12,
      totalModules: 3,

      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('courses').doc(courseId).set(courseData);
    console.log('✅ Course created: ai-copywriting-course\n');

    // ============================================================================
    // 2. CREATE MODULES
    // ============================================================================
    console.log('📦 Creating modules...');
    const moduleIds = [];
    const modules = [
      { title: 'AI Copywriting Alapok', description: 'A ChatGPT és AI eszközök alapjai', duration: 1200 },
      { title: 'Haladó Prompt Engineering', description: 'Haladó technikák prompt íráshoz', duration: 1200 },
      { title: 'Gyakorlati Projektek', description: 'Valós projektek AI-val', duration: 1200 }
    ];

    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const moduleRef = db.collection('modules').doc();
      const moduleId = moduleRef.id;
      moduleIds.push(moduleId);

      await moduleRef.set({
        courseId,
        title: module.title,
        description: module.description,
        duration: module.duration,
        order: i,
        moduleNumber: i + 1,
        isPublished: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ Module created: ${module.title}`);
    }
    console.log('');

    // ============================================================================
    // 3. CREATE LESSONS
    // ============================================================================
    console.log('📝 Creating lessons...');
    const lessonsData = [
      // Module 1 lessons
      [
        { title: 'ChatGPT bevezetés', duration: 600, type: 'VIDEO' },
        { title: 'AI alapok copywritinghoz', duration: 600, type: 'VIDEO' },
        { title: 'Első prompt írása', duration: 600, type: 'TEXT' },
        { title: 'Gyakorlás', duration: 600, type: 'ASSIGNMENT' }
      ],
      // Module 2 lessons
      [
        { title: 'Prompt struktúrák', duration: 600, type: 'VIDEO' },
        { title: 'Context ablak használata', duration: 600, type: 'VIDEO' },
        { title: 'Haladó prompt minták', duration: 600, type: 'TEXT' }
      ],
      // Module 3 lessons
      [
        { title: 'Landing page projekt', duration: 600, type: 'VIDEO' },
        { title: 'Email kampány tervezése', duration: 600, type: 'VIDEO' },
        { title: 'Social media tartalmak', duration: 600, type: 'VIDEO' },
        { title: 'Záró projekt és értékelés', duration: 600, type: 'ASSIGNMENT' }
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
          lessonNumber: j + 1,
          description: `${lesson.title} - részletes leírás`,
          isFreePreview: j === 0,
          isPublished: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      console.log(`✅ Lessons created for module ${i + 1}`);
    }
    console.log('');

    // ============================================================================
    // 4. CREATE USER & ENROLLMENT
    // ============================================================================
    console.log('👤 Creating test user...');

    // Create auth user
    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email: 'mark@elira.hu',
        password: 'password123',
        displayName: 'Mark Elira',
        emailVerified: true,
      });
      console.log('✅ Auth user created');
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        // User already exists, get it
        userRecord = await admin.auth().getUserByEmail('mark@elira.hu');
        console.log('✅ Auth user already exists');
      } else {
        throw error;
      }
    }

    // Create Firestore user
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: 'mark@elira.hu',
      firstName: 'Mark',
      lastName: 'Elira',
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log('✅ Firestore user created');

    // Create enrollment
    const enrollmentRef = db.collection('enrollments').doc();
    await enrollmentRef.set({
      userId: userRecord.uid,
      courseId: courseId,
      enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      progress: 0,
      completedLessons: [],
      lastAccessedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('✅ Enrollment created\n');

    // ============================================================================
    // DONE
    // ============================================================================
    console.log('🎉 Full emulator seed complete!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Login Email:    mark@elira.hu');
    console.log('🔑 Password:       password123');
    console.log('🔗 Course URL:     http://localhost:3000/courses/ai-copywriting-course/learn');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error seeding emulator:', error);
  } finally {
    process.exit(0);
  }
}

seedFullEmulator();
