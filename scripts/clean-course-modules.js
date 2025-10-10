/**
 * Clean all modules and lessons for ai-copywriting-course
 * For EMULATOR use only
 */

const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();
const courseId = 'ai-copywriting-course';

async function cleanCourse() {
  console.log('🧹 Cleaning AI Copywriting Course modules and lessons...\n');

  let deletedModules = 0;
  let deletedLessons = 0;

  // Delete all lessons for this course
  const lessonsSnapshot = await db.collection('lessons')
    .where('courseId', '==', courseId)
    .get();

  console.log(`Found ${lessonsSnapshot.size} lessons to delete`);
  for (const doc of lessonsSnapshot.docs) {
    await doc.ref.delete();
    deletedLessons++;
  }

  // Delete all modules for this course
  const modulesSnapshot = await db.collection('modules')
    .where('courseId', '==', courseId)
    .get();

  console.log(`Found ${modulesSnapshot.size} modules to delete`);
  for (const doc of modulesSnapshot.docs) {
    await doc.ref.delete();
    deletedModules++;
  }

  // Update course stats to 0
  await db.collection('courses').doc(courseId).update({
    totalModules: 0,
    totalLessons: 0,
    totalDuration: 0,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`\n✅ Cleanup complete!`);
  console.log(`   Deleted ${deletedModules} modules`);
  console.log(`   Deleted ${deletedLessons} lessons\n`);

  process.exit(0);
}

cleanCourse().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
