/**
 * Script to enroll a user in a course
 *
 * Usage: node scripts/enroll-user.js <userId> <courseId>
 *
 * This creates enrollment data in userProgress for testing
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();

// Get userId and courseId from command line args
const userId = process.argv[2];
const courseId = process.argv[3] || 'ai-copywriting-course';

if (!userId) {
  console.error('❌ Error: Please provide a userId as an argument');
  console.log('Usage: node scripts/enroll-user.js <userId> [courseId]');
  process.exit(1);
}

async function enrollUser() {
  console.log(`🌱 Enrolling user ${userId} in course ${courseId}`);

  const progressRef = db.collection('userProgress').doc(userId);
  const progressDoc = await progressRef.get();

  const enrolledAt = new Date();
  enrolledAt.setDate(enrolledAt.getDate() - 5); // Enrolled 5 days ago

  const enrollmentData = {
    courseId: courseId,
    courseTitle: '30 nap - működő marketing rendszer',
    enrolledAt: admin.firestore.Timestamp.fromDate(enrolledAt),
    progressPercentage: 20,
    completedLessons: 3,
    totalLessons: 17,
    lastActivityAt: admin.firestore.Timestamp.fromDate(new Date()),
    nextLessonId: 'lesson-4',
    isCompleted: false,
  };

  if (progressDoc.exists) {
    // Update existing progress document
    const currentData = progressDoc.data();
    const enrolledCourses = currentData.enrolledCourses || [];

    // Check if already enrolled
    const existingIndex = enrolledCourses.findIndex(c => c.courseId === courseId);

    if (existingIndex >= 0) {
      console.log('⚠️  User already enrolled in this course. Updating enrollment data...');
      enrolledCourses[existingIndex] = enrollmentData;
    } else {
      enrolledCourses.push(enrollmentData);
    }

    await progressRef.update({
      enrolledCourses: enrolledCourses,
      totalCourses: enrolledCourses.length,
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ User enrolled successfully!`);
    console.log(`   Course: ${enrollmentData.courseTitle}`);
    console.log(`   Progress: ${enrollmentData.progressPercentage}%`);
    console.log(`   Completed: ${enrollmentData.completedLessons}/${enrollmentData.totalLessons} lessons`);
  } else {
    // Create new progress document with enrollment
    const today = new Date().toISOString().split('T')[0];

    const initialProgress = {
      userId: userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      totalCourses: 1,
      completedCourses: 0,
      totalLearningTime: 1200, // 20 minutes
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
      currentStreak: 3,
      longestStreak: 5,
      lastStreakDate: today,
      enrolledCourses: [enrollmentData],
    };

    await progressRef.set(initialProgress);

    console.log(`✅ User progress created with enrollment!`);
    console.log(`   Course: ${enrollmentData.courseTitle}`);
    console.log(`   Progress: ${enrollmentData.progressPercentage}%`);
    console.log(`   Completed: ${enrollmentData.completedLessons}/${enrollmentData.totalLessons} lessons`);
  }

  process.exit(0);
}

// Run enrollment
enrollUser().catch((error) => {
  console.error('❌ Enrollment failed:', error);
  process.exit(1);
});
