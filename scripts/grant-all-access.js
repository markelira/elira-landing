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

    console.log('📋 Users in emulator:');
    const users = [];
    usersSnapshot.forEach(doc => {
      const user = doc.data();
      users.push({ id: doc.id, ...user });
      console.log(`  - ${user.email || 'No email'} (UID: ${doc.id})`);
    });

    if (users.length === 0) {
      console.log('\n⚠️  No users found! You may need to log in first.');
      process.exit(0);
    }

    // Create enrollment for ALL users
    console.log('\n🔓 Creating enrollments for all users...');
    for (const user of users) {
      const enrollmentId = `${user.id}_ai-copywriting-course`;

      // Check if enrollment exists with correct ID
      const existingEnrollment = await db.collection('enrollments').doc(enrollmentId).get();

      if (!existingEnrollment.exists) {
        await db.collection('enrollments').doc(enrollmentId).set({
          userId: user.id,
          courseId: 'ai-copywriting-course',
          enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
          status: 'active',
          progress: 0,
          completedLessons: [],
          lastAccessedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`  ✅ Created enrollment for ${user.email || user.id}`);
      } else {
        console.log(`  ℹ️  Enrollment already exists for ${user.email || user.id}`);
      }
    }

    console.log('\n✅ All users now have access to ai-copywriting-course!');
    console.log('🔄 Refresh the browser to see the changes.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
