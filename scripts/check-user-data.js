const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();
const userId = process.argv[2] || 'g0Vv742sKuclSHmpsP1sCklxit53';

async function checkUserData() {
  console.log(`\n🔍 Checking data for user: ${userId}\n`);

  // Check userProgress
  const progressDoc = await db.collection('userProgress').doc(userId).get();
  if (progressDoc.exists) {
    const data = progressDoc.data();
    console.log('✅ UserProgress found:');
    console.log('   Total Courses:', data.totalCourses);
    console.log('   Completed:', data.completedCourses);
    console.log('   Learning Time:', data.totalLearningTime);
    console.log('   Enrolled Courses:', data.enrolledCourses?.length || 0);
    if (data.enrolledCourses && data.enrolledCourses.length > 0) {
      console.log('   First Course:', data.enrolledCourses[0].courseTitle);
    }
  } else {
    console.log('❌ No userProgress document found');
  }

  // Check consultations
  const consultationsSnapshot = await db.collection('consultations')
    .where('userId', '==', userId)
    .get();
  console.log(`\n📅 Consultations: ${consultationsSnapshot.size}`);

  // Check implementations
  const implDoc = await db.collection('implementations').doc(userId).get();
  if (implDoc.exists) {
    const data = implDoc.data();
    console.log('\n📊 Implementation tracking found:');
    console.log('   Current Day:', data.currentDay);
    console.log('   Progress:', data.implementationProgress + '%');
  } else {
    console.log('\n❌ No implementation tracking found');
  }

  // Check templates
  const templatesSnapshot = await db.collection('templates').get();
  console.log(`\n📑 Templates in database: ${templatesSnapshot.size}`);

  process.exit(0);
}

checkUserData().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
