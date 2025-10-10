/**
 * Verify course data update
 * For EMULATOR use only
 */

const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();
const courseId = 'ai-copywriting-course';

async function verifyCourseUpdate() {
  console.log('🔍 Verifying course data update...\n');

  try {
    const courseDoc = await db.collection('courses').doc(courseId).get();

    if (!courseDoc.exists) {
      console.log('❌ Course not found!');
      process.exit(1);
    }

    const course = courseDoc.data();

    console.log('📋 Course Information:');
    console.log(`   Title: ${course.title}`);
    console.log(`   Short Description: ${course.shortDescription}`);
    console.log(`   Instructor: ${course.instructorName} (${course.instructorBio})`);
    console.log(`   Price: ${course.price?.toLocaleString('hu-HU')} ${course.currency}`);
    console.log(`   Total Modules: ${course.totalModules}`);
    console.log(`   Total Lessons: ${course.totalLessons}`);
    console.log('\n📚 Learning Objectives:');
    course.objectives?.forEach((obj, i) => {
      console.log(`   ${i + 1}. ${obj}`);
    });
    console.log('\n✅ Verification complete!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error verifying course:', error);
    process.exit(1);
  }
}

verifyCourseUpdate();
