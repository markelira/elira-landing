const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

const userId = process.argv[2];

if (!userId) {
  console.error('❌ Usage: node create-enrollment-for-user.js <userId>');
  process.exit(1);
}

(async () => {
  try {
    console.log(`🔧 Creating enrollment for user: ${userId}\n`);

    const enrollmentId = `${userId}_ai-copywriting-course`;

    // Check if enrollment already exists
    const existingEnrollment = await db.collection('enrollments').doc(enrollmentId).get();

    if (existingEnrollment.exists) {
      console.log(`✅ Enrollment already exists for user ${userId}`);
    } else {
      // Create enrollment
      await db.collection('enrollments').doc(enrollmentId).set({
        userId: userId,
        courseId: 'ai-copywriting-course',
        enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        progress: 0,
        completedLessons: [],
        lastAccessedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✅ Created enrollment for user ${userId}`);
    }

    // Also update user document if it exists
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      await db.collection('users').doc(userId).update({
        enrolledCourses: admin.firestore.FieldValue.arrayUnion('ai-copywriting-course')
      });
      console.log(`✅ Updated user document with enrolled course`);
    } else {
      console.log(`⚠️  User document doesn't exist in Firestore`);
    }

    console.log('\n✅ Done! Refresh the browser to access the course.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
