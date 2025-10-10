const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    console.log('📚 Checking AI Copywriting Course Data:\n');

    // Get course
    const courseDoc = await db.collection('courses').doc('ai-copywriting-course').get();

    if (!courseDoc.exists) {
      console.log('❌ Course not found!');
      process.exit(1);
    }

    const course = courseDoc.data();
    console.log('✅ Course found:', course.title);
    console.log(`   Published: ${course.published}`);
    console.log(`   Status: ${course.status}`);
    console.log('');

    // Get modules
    const modulesSnapshot = await db.collection('courses')
      .doc('ai-copywriting-course')
      .collection('modules')
      .orderBy('order')
      .get();

    console.log(`📦 Modules: ${modulesSnapshot.size}`);

    for (const moduleDoc of modulesSnapshot.docs) {
      const module = moduleDoc.data();
      console.log(`\n  ${module.order}. ${module.title}`);

      // Get lessons for this module
      const lessonsSnapshot = await db.collection('courses')
        .doc('ai-copywriting-course')
        .collection('modules')
        .doc(moduleDoc.id)
        .collection('lessons')
        .orderBy('order')
        .get();

      console.log(`     Lessons: ${lessonsSnapshot.size}`);
      lessonsSnapshot.forEach(lessonDoc => {
        const lesson = lessonDoc.data();
        console.log(`       ${lesson.order}. ${lesson.title}`);
        if (lesson.videoUrl) {
          console.log(`          Video: ${lesson.videoUrl.substring(0, 60)}...`);
        }
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
