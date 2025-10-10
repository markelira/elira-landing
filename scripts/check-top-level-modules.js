const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    console.log('📚 Checking AI Copywriting Course Data (Top-Level Collections):\n');

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
    console.log(`   Total Modules: ${course.totalModules || 0}`);
    console.log(`   Total Lessons: ${course.totalLessons || 0}`);
    console.log('');

    // Get modules from TOP-LEVEL collection
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', 'ai-copywriting-course')
      .orderBy('order', 'asc')
      .get();

    console.log(`📦 Modules in top-level collection: ${modulesSnapshot.size}`);

    for (const moduleDoc of modulesSnapshot.docs) {
      const module = moduleDoc.data();
      console.log(`\n  ${module.order + 1}. ${module.title}`);
      console.log(`     ID: ${moduleDoc.id}`);
      console.log(`     Total Lessons: ${module.totalLessons}`);

      // Get lessons from TOP-LEVEL collection for this module
      const lessonsSnapshot = await db.collection('lessons')
        .where('courseId', '==', 'ai-copywriting-course')
        .where('moduleId', '==', moduleDoc.id)
        .orderBy('order', 'asc')
        .get();

      console.log(`     Lessons found: ${lessonsSnapshot.size}`);
      lessonsSnapshot.forEach(lessonDoc => {
        const lesson = lessonDoc.data();
        console.log(`       ${lesson.order + 1}. ${lesson.title}`);
        if (lesson.videoUrl) {
          console.log(`          Video: ${lesson.videoUrl.substring(0, 60)}...`);
        }
      });
    }

    console.log('\n✅ Check complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
