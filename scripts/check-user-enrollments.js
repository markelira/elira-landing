const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    // Get all users
    const usersSnapshot = await db.collection('users').get();

    console.log('👥 User Enrollment Status:\n');

    for (const userDoc of usersSnapshot.docs) {
      const user = userDoc.data();
      console.log(`📧 ${user.email || 'No email'} (UID: ${userDoc.id})`);

      // Get enrollments for this user
      const enrollmentsSnapshot = await db.collection('enrollments')
        .where('userId', '==', userDoc.id)
        .get();

      if (enrollmentsSnapshot.empty) {
        console.log('  ❌ No enrollments found');
      } else {
        console.log('  ✅ Enrolled in:');
        for (const enrollDoc of enrollmentsSnapshot.docs) {
          const enrollment = enrollDoc.data();
          console.log(`     - ${enrollment.courseId} (Status: ${enrollment.status})`);
        }
      }
      console.log('');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
