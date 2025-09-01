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

async function updateCourseToFree() {
  try {
    console.log('🔄 Updating course to free...');
    
    const courseId = 'test-course-mvp';
    
    await db.collection('courses').doc(courseId).update({
      isFree: true,
      price: 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Course updated to free!');
    console.log(`🔗 View at: http://localhost:3000/courses/${courseId}`);
    
  } catch (error) {
    console.error('❌ Error updating course:', error);
  } finally {
    process.exit(0);
  }
}

updateCourseToFree();