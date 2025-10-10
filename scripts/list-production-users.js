const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

async function listUsers() {
  console.log('📋 Listing production Firestore data...\n');

  // 1. List all users
  console.log('1️⃣ Users:');
  const usersSnapshot = await db.collection('users').limit(10).get();
  if (usersSnapshot.empty) {
    console.log('   ❌ No users found');
  } else {
    console.log(`   ✅ Found ${usersSnapshot.size} user(s):`);
    usersSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}: ${data.email || 'no email'}`);
    });
  }

  // 2. List all enrollments
  console.log('\n2️⃣ Enrollments:');
  const enrollmentsSnapshot = await db.collection('enrollments').limit(10).get();
  if (enrollmentsSnapshot.empty) {
    console.log('   ❌ No enrollments found');
  } else {
    console.log(`   ✅ Found ${enrollmentsSnapshot.size} enrollment(s):`);
    enrollmentsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}: ${data.userId} → ${data.courseId}`);
    });
  }

  // 3. List all userProgress
  console.log('\n3️⃣ UserProgress:');
  const progressSnapshot = await db.collection('userProgress').limit(10).get();
  if (progressSnapshot.empty) {
    console.log('   ❌ No userProgress found');
  } else {
    console.log(`   ✅ Found ${progressSnapshot.size} userProgress doc(s):`);
    progressSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}: ${data.totalCourses || 0} courses`);
    });
  }

  // 4. List all payments
  console.log('\n4️⃣ Payments:');
  const paymentsSnapshot = await db.collection('payments').limit(10).get();
  if (paymentsSnapshot.empty) {
    console.log('   ❌ No payments found');
  } else {
    console.log(`   ✅ Found ${paymentsSnapshot.size} payment(s):`);
    paymentsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}: ${data.userId} - ${data.status}`);
    });
  }

  // 5. List all courses
  console.log('\n5️⃣ Courses:');
  const coursesSnapshot = await db.collection('courses').limit(10).get();
  if (coursesSnapshot.empty) {
    console.log('   ❌ No courses found');
  } else {
    console.log(`   ✅ Found ${coursesSnapshot.size} course(s):`);
    coursesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${doc.id}: ${data.title || 'Untitled'}`);
    });
  }

  console.log('\n✅ Complete!');
  process.exit(0);
}

listUsers().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
