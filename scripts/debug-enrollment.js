const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function debugEnrollment() {
  const userId = 'lz4zqj6GY5d5g4aKZ9K5pKUz2im1'; // marquesesauce@gmail.com
  const courseId = 'ai-copywriting-course';

  console.log('🔍 Debugging enrollment for user:', userId);
  console.log('---');

  // 1. Check userProgress document
  console.log('\n1️⃣ Checking userProgress document...');
  const progressDoc = await db.collection('userProgress').doc(userId).get();
  if (progressDoc.exists) {
    const data = progressDoc.data();
    console.log('✅ UserProgress exists');
    console.log('   - totalCourses:', data.totalCourses);
    console.log('   - completedCourses:', data.completedCourses);
    console.log('   - enrolledCourses:', data.enrolledCourses?.length || 0);
    if (data.enrolledCourses && data.enrolledCourses.length > 0) {
      console.log('   - Enrolled course IDs:', data.enrolledCourses.map(c => c.courseId));
    }
  } else {
    console.log('❌ UserProgress document does NOT exist');
  }

  // 2. Check user document
  console.log('\n2️⃣ Checking user document...');
  const userDoc = await db.collection('users').doc(userId).get();
  if (userDoc.exists) {
    const userData = userDoc.data();
    console.log('✅ User document exists');
    console.log('   - email:', userData.email);
    console.log('   - courseAccess:', userData.courseAccess);
    console.log('   - enrolledCourses:', userData.enrolledCourses || 'not set');
  } else {
    console.log('❌ User document does NOT exist');
  }

  // 3. Check enrollment documents
  console.log('\n3️⃣ Checking enrollment documents...');
  const enrollmentsSnapshot = await db
    .collection('enrollments')
    .where('userId', '==', userId)
    .get();

  if (enrollmentsSnapshot.empty) {
    console.log('❌ No enrollment documents found');
  } else {
    console.log(`✅ Found ${enrollmentsSnapshot.size} enrollment(s):`);
    enrollmentsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}:`);
      console.log(`     courseId: ${data.courseId}`);
      console.log(`     status: ${data.status || 'not set'}`);
      console.log(`     enrolledAt: ${data.enrolledAt?.toDate?.() || data.enrolledAt}`);
    });
  }

  // 4. Check payments
  console.log('\n4️⃣ Checking completed payments...');
  const paymentsSnapshot = await db
    .collection('payments')
    .where('userId', '==', userId)
    .where('status', '==', 'completed')
    .get();

  if (paymentsSnapshot.empty) {
    console.log('❌ No completed payments found');
  } else {
    console.log(`✅ Found ${paymentsSnapshot.size} completed payment(s):`);
    paymentsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}:`);
      console.log(`     courseId: ${data.courseId || 'not set'}`);
      console.log(`     amount: ${data.amount}`);
    });
  }

  // 5. Simulate the API logic
  console.log('\n5️⃣ Simulating API access check logic...');
  const accessibleCourseIds = new Set();

  // Source 1: Enrollments
  enrollmentsSnapshot.docs.forEach(doc => {
    accessibleCourseIds.add(doc.data().courseId);
  });

  // Source 2: User's enrolledCourses array
  if (userDoc.exists && userDoc.data().enrolledCourses) {
    userDoc.data().enrolledCourses.forEach(courseId => {
      accessibleCourseIds.add(courseId);
    });
  }

  // Source 3: Completed payments
  paymentsSnapshot.docs.forEach(doc => {
    if (doc.data().courseId) {
      accessibleCourseIds.add(doc.data().courseId);
    }
  });

  // Source 4: Legacy courseAccess
  if (userDoc.exists && userDoc.data().courseAccess === true) {
    accessibleCourseIds.add('ai-copywriting-course');
    accessibleCourseIds.add('default-course');
  }

  console.log('Accessible course IDs:', Array.from(accessibleCourseIds));
  console.log('Has access to', courseId, ':', accessibleCourseIds.has(courseId));

  // 6. Check course document
  console.log('\n6️⃣ Checking course document...');
  const courseDoc = await db.collection('courses').doc(courseId).get();
  if (courseDoc.exists) {
    const courseData = courseDoc.data();
    console.log('✅ Course exists');
    console.log('   - title:', courseData.title);
    console.log('   - totalLessons:', courseData.totalLessons);
  } else {
    console.log('❌ Course document does NOT exist');
  }

  console.log('\n✅ Debug complete!');
  process.exit(0);
}

debugEnrollment().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
