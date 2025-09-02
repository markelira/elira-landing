// Create user and enroll in production Firestore
const admin = require('firebase-admin');

// Initialize for production (no emulator)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

async function createAndEnrollUser() {
  const userId = 's3oUvVBfihRNpZIbNVT9NxrZ5f92';
  const courseId = 'ai-copywriting-course';
  const sessionId = 'cs_live_b1V6NJcUKP6fdM7PgQ9P89phuDo94PR4MclDBi8aCDOIRsG8cA5JEKDMJT';
  
  console.log('🎯 Creating user and enrolling in production...');

  try {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // 1. Create user document first
    console.log('👤 Creating user document...');
    await db.collection('users').doc(userId).set({
      id: userId,
      email: 'marquesesacue@gmail.com',
      firstName: 'Görgei',
      lastName: 'Márk',
      role: 'student',
      courseAccess: true,
      courseAccessGrantedAt: timestamp,
      enrolledCourses: [courseId],
      stripeCustomerId: 'cus_SycdfXbvWo4ldd',
      createdAt: timestamp,
      lastUpdated: timestamp
    }, { merge: true });

    // 2. Update payment record
    console.log('💳 Creating payment record...');
    await db.collection('payments').doc(sessionId).set({
      userId,
      courseId,
      stripeSessionId: sessionId,
      amount: 190.00,
      currency: 'HUF',
      status: 'completed',
      courseAccess: true,
      completedAt: timestamp,
      createdAt: timestamp
    }, { merge: true });

    // 3. Create enrollment record
    console.log('📝 Creating enrollment record...');
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

    // 4. Create user progress
    console.log('📊 Setting up user progress...');
    await db.collection('user-progress').doc(userId).set({
      userId,
      totalCoursesEnrolled: 1,
      totalLessonsCompleted: 0,
      totalWatchTime: 0,
      coursesInProgress: 1,
      coursesCompleted: 0,
      lastActivityAt: timestamp
    }, { merge: true });

    console.log('✅ User created and enrolled successfully!');
    console.log('🔄 Refresh the dashboard to see enrolled course');
    
  } catch (error) {
    console.error('❌ Enrollment failed:', error);
  }
}

createAndEnrollUser();