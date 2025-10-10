const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function checkCoursePrice() {
  const courseId = 'ai-copywriting-course';

  console.log('💰 Checking course price...\n');

  const courseDoc = await db.collection('courses').doc(courseId).get();

  if (courseDoc.exists) {
    const course = courseDoc.data();
    console.log('✅ Course:', course.title);
    console.log('   - price:', course.price);
    console.log('   - originalPrice:', course.originalPrice);
    console.log('   - stripePriceId:', course.stripePriceId);
    console.log('   - priceId:', course.priceId);
  } else {
    console.log('❌ Course not found');
  }

  console.log('\n✅ Complete!');
  process.exit(0);
}

checkCoursePrice().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
