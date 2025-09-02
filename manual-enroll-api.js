// Manual enrollment via direct database update
const admin = require('firebase-admin');

// Initialize with application default credentials (works in Firebase environment)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

async function enrollUserDirectly() {
  const userId = 's3oUvVBfihRNpZIbNVT9NxrZ5f92';
  const courseId = 'ai-copywriting-course';
  const sessionId = 'cs_live_b1V6NJcUKP6fdM7PgQ9P89phuDo94PR4MclDBi8aCDOIRsG8cA5JEKDMJT';
  
  console.log('🎯 Manually enrolling user in database...');

  try {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // 1. Update payment record
    console.log('💳 Updating payment record...');
    await db.collection('payments').doc(sessionId).set({
      userId,
      courseId,
      stripeSessionId: sessionId,
      amount: 190.00, // 19000 HUF / 100
      currency: 'HUF',
      status: 'completed',
      courseAccess: true,
      completedAt: timestamp,
      createdAt: timestamp
    }, { merge: true });

    // 2. Grant course access to user
    console.log('👤 Updating user document...');
    await db.collection('users').doc(userId).update({
      courseAccess: true,
      courseAccessGrantedAt: timestamp,
      enrolledCourses: admin.firestore.FieldValue.arrayUnion(courseId),
      lastUpdated: timestamp
    });

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

    // 5. Create course-specific progress
    console.log('🎓 Creating course progress...');
    await db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .doc(courseId)
      .set({
        courseId,
        userId,
        overallProgress: 0,
        completedLessons: [],
        totalLessons: 12,
        enrolledAt: timestamp,
        lastAccessedAt: timestamp
      }, { merge: true });

    console.log('✅ User enrolled successfully!');
    console.log('🔄 Refresh the dashboard to see changes');
    
  } catch (error) {
    console.error('❌ Enrollment failed:', error);
  }
}

enrollUserDirectly();