const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    console.log('📋 All Enrollments:\n');

    const enrollmentsSnapshot = await db.collection('enrollments').get();

    if (enrollmentsSnapshot.empty) {
      console.log('⚠️  No enrollments found!');
      process.exit(0);
    }

    enrollmentsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  Document ID: ${doc.id}`);
      console.log(`    User ID: ${data.userId}`);
      console.log(`    Course ID: ${data.courseId}`);
      console.log(`    Status: ${data.status}`);
      console.log(`    Enrolled At: ${data.enrolledAt?.toDate()}`);
      console.log('');
    });

    console.log(`Total enrollments: ${enrollmentsSnapshot.size}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
