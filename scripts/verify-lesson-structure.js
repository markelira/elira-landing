const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    console.log('🔍 Verifying lesson structure:\n');

    // Get a sample lesson
    const lessonDoc = await db.collection('lessons').doc('lesson-1-1').get();

    if (!lessonDoc.exists) {
      console.log('❌ Lesson not found!');
      process.exit(1);
    }

    const lesson = lessonDoc.data();

    console.log('📖 Lesson: lesson-1-1');
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Type: ${lesson.type}`);
    console.log(`   Duration: ${lesson.duration}s`);
    console.log('');
    console.log('📹 Content structure:');
    console.log(`   Has content object: ${!!lesson.content}`);
    console.log(`   Video URL: ${lesson.content?.videoUrl || 'NOT FOUND'}`);
    console.log(`   Video Provider: ${lesson.content?.videoProvider || 'N/A'}`);
    console.log('');

    // Get a lesson with resources
    const lessonWithResources = await db.collection('lessons').doc('lesson-3-1').get();
    const lessonData = lessonWithResources.data();

    console.log('📖 Lesson with resources: lesson-3-1');
    console.log(`   Resources: ${lessonData.resources?.length || 0}`);
    if (lessonData.resources?.length > 0) {
      lessonData.resources.forEach((resource, i) => {
        console.log(`   ${i + 1}. ${resource.title} (${resource.type})`);
        console.log(`      URL: ${resource.url.substring(0, 60)}...`);
      });
    }

    console.log('\n✅ Verification complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
