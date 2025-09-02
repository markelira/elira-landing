const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927',
    storageBucket: 'elira-landing-ce927.firebasestorage.app'
  });
}

const db = admin.firestore();
const auth = admin.auth();

async function enrollUser() {
  try {
    const email = 'marquesesacue@gmail.com';
    const courseId = 'ai-copywriting-course';
    
    console.log(`Finding user with email: ${email}`);
    
    // Get user by email
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`✅ User found: ${userRecord.uid}`);
    } catch (error) {
      console.log(`❌ User not found, creating user: ${email}`);
      userRecord = await auth.createUser({
        email: email,
        emailVerified: true
      });
      console.log(`✅ User created: ${userRecord.uid}`);
    }
    
    const userId = userRecord.uid;
    
    // Check if already enrolled
    const enrollmentDoc = await db.collection('enrollments').doc(`${userId}_${courseId}`).get();
    
    if (enrollmentDoc.exists) {
      console.log(`✅ User already enrolled in course: ${courseId}`);
      return {
        success: true,
        message: 'User already enrolled',
        userId: userId,
        courseId: courseId
      };
    }
    
    // Create enrollment
    const enrollmentData = {
      userId: userId,
      courseId: courseId,
      enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'ACTIVE',
      paymentStatus: 'COMPLETED',
      paymentMethod: 'MANUAL_ENROLLMENT',
      enrollmentType: 'PAID',
      progress: {
        completedLessons: [],
        currentLesson: null,
        totalProgress: 0,
        lastAccessedAt: null
      }
    };
    
    await db.collection('enrollments').doc(`${userId}_${courseId}`).set(enrollmentData);
    
    console.log(`✅ User enrolled successfully: ${userId} in ${courseId}`);
    
    return {
      success: true,
      message: 'User enrolled successfully',
      userId: userId,
      courseId: courseId,
      enrollmentId: `${userId}_${courseId}`
    };
    
  } catch (error) {
    console.error('❌ Error enrolling user:', error);
    throw error;
  }
}

enrollUser()
  .then(result => {
    console.log('Result:', JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });