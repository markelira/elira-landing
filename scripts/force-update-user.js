const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();
const userId = 'g0Vv742sKuclSHmpsP1sCklxit53';

async function forceUpdate() {
  console.log(`🔄 Force updating userProgress for: ${userId}\n`);

  const enrolledAt = new Date();
  enrolledAt.setDate(enrolledAt.getDate() - 5);

  const updates = {
    totalCourses: 1,
    completedCourses: 0,
    totalLearningTime: 1200,
    currentStreak: 3,
    longestStreak: 5,
    lastStreakDate: new Date().toISOString().split('T')[0],
    enrolledCourses: [{
      courseId: 'ai-copywriting-course',
      courseTitle: '30 nap - működő marketing rendszer',
      enrolledAt: admin.firestore.Timestamp.fromDate(enrolledAt),
      progressPercentage: 20,
      completedLessons: 3,
      totalLessons: 17,
      lastActivityAt: admin.firestore.Timestamp.fromDate(new Date()),
      nextLessonId: 'lesson-4',
      isCompleted: false,
    }],
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('userProgress').doc(userId).update(updates);

  console.log('✅ Update complete!');
  console.log('   Total Courses:', updates.totalCourses);
  console.log('   Enrolled Courses:', updates.enrolledCourses.length);
  console.log('   First Course:', updates.enrolledCourses[0].courseTitle);

  // Verify
  const doc = await db.collection('userProgress').doc(userId).get();
  const data = doc.data();
  console.log('\n✅ Verification:');
  console.log('   Total Courses:', data.totalCourses);
  console.log('   Enrolled Count:', data.enrolledCourses?.length);

  process.exit(0);
}

forceUpdate().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
