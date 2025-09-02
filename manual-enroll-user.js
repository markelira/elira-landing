// Direct enrollment script for successful payment
const admin = require('firebase-admin');

// Initialize Firebase Admin (production)
const serviceAccount = require('./serviceAccount.json'); // You'll need to download this
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function enrollUser() {
  const userId = 's3oUvVBfihRNpZIbNVT9NxrZ5f92';
  const courseId = 'ai-copywriting-course';
  const sessionId = 'cs_live_b1IjsLwZ2pEGmylvC5kWIANazUeegW8jI01KH2EQNpAOAnBITIpi8lvgTB';
  
  console.log('🎯 Enrolling user manually...');

  try {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // Update payment record
    await db.collection('payments').doc(sessionId).set({
      userId,
      courseId,
      stripeSessionId: sessionId,
      amount: 499.50,
      currency: 'HUF',
      status: 'completed',
      courseAccess: true,
      completedAt: timestamp,
      createdAt: timestamp
    }, { merge: true });

    // Grant course access to user
    await db.collection('users').doc(userId).update({
      courseAccess: true,
      courseAccessGrantedAt: timestamp,
      enrolledCourses: admin.firestore.FieldValue.arrayUnion(courseId),
      lastUpdated: timestamp
    });

    // Create enrollment record
    await db.collection('enrollments').add({
      userId,
      courseId,
      enrolledAt: timestamp,
      status: 'ACTIVE',
      paymentSessionId: sessionId,
      progress: 0,
      completedLessons: [],
      lastAccessedAt: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp
    });

    // Create user progress
    await db.collection('user-progress').doc(userId).set({
      userId,
      totalCoursesEnrolled: 1,
      totalLessonsCompleted: 0,
      totalWatchTime: 0,
      coursesInProgress: 1,
      coursesCompleted: 0,
      lastActivityAt: timestamp
    }, { merge: true });

    console.log('✅ User enrolled successfully!');
    
  } catch (error) {
    console.error('❌ Enrollment failed:', error);
  } finally {
    process.exit(0);
  }
}

enrollUser();