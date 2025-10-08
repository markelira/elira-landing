const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require(path.join(__dirname, '../elira-d05ac-firebase-adminsdk-hs7db-8e8ec61e49.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-d05ac'
});

const db = admin.firestore();

async function queryCourse() {
  try {
    console.log('Querying courses collection...');

    const coursesSnapshot = await db.collection('courses')
      .where('status', '==', 'published')
      .limit(10)
      .get();

    if (coursesSnapshot.empty) {
      console.log('No courses found');
      return;
    }

    coursesSnapshot.forEach(doc => {
      console.log('\n=== Course ID:', doc.id);
      console.log('Title:', doc.data().title);
      console.log('Slug:', doc.data().slug);

      if (doc.data().title && doc.data().title.includes('Olvass')) {
        console.log('\n✅ FOUND THE MASTERCLASS!');
        console.log(JSON.stringify(doc.data(), null, 2));
      }
    });

  } catch (error) {
    console.error('Error querying courses:', error);
  } finally {
    process.exit(0);
  }
}

queryCourse();
