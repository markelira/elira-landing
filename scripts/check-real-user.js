const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function checkRealUser() {
  const userId = 'g0Vv742sKuclSHmpsP1sCklxit53'; // mark@elira.hu

  console.log('🔍 Checking REAL production user: mark@elira.hu');
  console.log('---\n');

  // 1. User document
  const userDoc = await db.collection('users').doc(userId).get();
  const userData = userDoc.data();
  console.log('1️⃣ User:', userData.email);
  console.log('   - courseAccess:', userData.courseAccess);
  console.log('   - enrolledCourses:', userData.enrolledCourses);

  // 2. Enrollment
  const enrollmentDoc = await db.collection('enrollments').doc(`${userId}_ai-copywriting-course`).get();
  if (enrollmentDoc.exists) {
    const enrollment = enrollmentDoc.data();
    console.log('\n2️⃣ Enrollment exists:');
    console.log('   - courseId:', enrollment.courseId);
    console.log('   - status:', enrollment.status || 'not set');
    console.log('   - enrolledAt:', enrollment.enrolledAt?.toDate?.() || enrollment.enrolledAt);
    console.log('   - progress:', enrollment.progress || 0);
  }

  // 3. UserProgress
  const progressDoc = await db.collection('userProgress').doc(userId).get();
  if (progressDoc.exists) {
    const progress = progressDoc.data();
    console.log('\n3️⃣ UserProgress:');
    console.log('   - totalCourses:', progress.totalCourses);
    console.log('   - enrolledCourses:', progress.enrolledCourses?.length || 0);
    if (progress.enrolledCourses && progress.enrolledCourses.length > 0) {
      console.log('   - Course IDs:', progress.enrolledCourses.map(c => c.courseId));
    }
  }

  // 4. Simulate API logic
  console.log('\n4️⃣ API Access Check Simulation:');
  const accessibleCourseIds = new Set();

  // Source 1: Enrollments
  const enrollmentsSnapshot = await db.collection('enrollments').where('userId', '==', userId).get();
  enrollmentsSnapshot.docs.forEach(doc => {
    accessibleCourseIds.add(doc.data().courseId);
  });

  // Source 2: User's enrolledCourses array
  if (userData?.enrolledCourses) {
    userData.enrolledCourses.forEach(courseId => {
      accessibleCourseIds.add(courseId);
    });
  }

  // Source 3: Completed payments
  const paymentsSnapshot = await db
    .collection('payments')
    .where('userId', '==', userId)
    .where('status', '==', 'completed')
    .get();
  paymentsSnapshot.docs.forEach(doc => {
    if (doc.data().courseId) {
      accessibleCourseIds.add(doc.data().courseId);
    }
  });

  // Source 4: Legacy courseAccess
  if (userData?.courseAccess === true) {
    accessibleCourseIds.add('ai-copywriting-course');
    accessibleCourseIds.add('default-course');
  }

  console.log('   - Accessible courses:', Array.from(accessibleCourseIds));
  console.log('   - From enrollments:', enrollmentsSnapshot.size);
  console.log('   - From user array:', userData?.enrolledCourses?.length || 0);
  console.log('   - From payments:', paymentsSnapshot.size);
  console.log('   - From courseAccess:', userData?.courseAccess === true ? 'YES' : 'NO');

  console.log('\n✅ Complete!');
  process.exit(0);
}

checkRealUser().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
