const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    const coursesSnapshot = await db.collection('courses').get();
    console.log('📚 Available courses:');
    coursesSnapshot.forEach(doc => {
      console.log(`  - ${doc.id}: ${doc.data().title}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
