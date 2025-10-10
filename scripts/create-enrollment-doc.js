/**
 * Script to create enrollment document in enrollments collection
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

const userId = process.argv[2];
const courseId = process.argv[3] || 'ai-copywriting-course';

if (!userId) {
  console.error('❌ Error: Please provide a userId as an argument');
  console.log('Usage: node scripts/create-enrollment-doc.js <userId> [courseId]');
  process.exit(1);
}

async function createEnrollmentDocument() {
  console.log(`🌱 Creating enrollment document for user ${userId} in course ${courseId}`);

  // Get course data
  const courseDoc = await db.collection('courses').doc(courseId).get();

  if (!courseDoc.exists) {
    console.error('❌ Course not found');
    process.exit(1);
  }

  const courseData = courseDoc.data();

  const enrollmentId = `${userId}_${courseId}`;
  const enrollmentRef = db.collection('enrollments').doc(enrollmentId);

  // Check if already exists
  const existing = await enrollmentRef.get();

  const enrollmentData = {
    userId: userId,
    courseId: courseId,
    courseTitle: courseData.title || 'Olvass a vevőid gondolataiban',
    courseSlug: courseData.slug || 'ai-copywriting-course',
    enrolledAt: admin.firestore.Timestamp.now(),
    lastAccessedAt: admin.firestore.Timestamp.now(),
    progress: 20,
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
    totalLessons: courseData.totalLessons || 17,
    status: 'active',
    certificateEarned: false
  };

  if (existing.exists) {
    console.log('⚠️  Enrollment document already exists, updating...');
    await enrollmentRef.update(enrollmentData);
  } else {
    console.log('📝 Creating new enrollment document...');
    await enrollmentRef.set(enrollmentData);
  }

  console.log('✅ Enrollment document created successfully!');
  console.log('   Document ID:', enrollmentId);
  console.log('   Course:', enrollmentData.courseTitle);
  console.log('   Progress:', enrollmentData.progress + '%');
  console.log('   Completed Lessons:', enrollmentData.completedLessons.length);

  process.exit(0);
}

createEnrollmentDocument().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
