const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function fixCurrentUserEnrollment() {
  const userId = 's3oUvVBfihRNpZIbNVT9NxrZ5f92';
  const courseId = 'ai-copywriting-course';
  const enrollmentId = `${userId}_${courseId}`;
  
  console.log('🔧 Creating missing enrollment document...');
  console.log('Document ID:', enrollmentId);
  
  const enrollmentData = {
    userId,
    courseId,
    courseTitle: 'AI Copywriting Mastery Kurzus',
    status: 'active',
    enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
    completedLessons: [],
    totalLessons: 12,
    progressPercentage: 0,
    lastAccessedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  
  await db.collection('enrollments').doc(enrollmentId).set(enrollmentData);
  
  console.log('✅ Enrollment document created successfully!');
  console.log('Path: enrollments/' + enrollmentId);
  
  // Verify it was created
  const verification = await db.collection('enrollments').doc(enrollmentId).get();
  console.log('✅ Verification - Document exists:', verification.exists);
  
  process.exit(0);
}

fixCurrentUserEnrollment().catch(console.error);