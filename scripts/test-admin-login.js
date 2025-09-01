const admin = require('firebase-admin');

// Configure for Firebase emulators
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

// Initialize Firebase Admin SDK for emulator
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927'
  });
}

async function testAdminUser() {
  try {
    console.log('🔍 Testing admin user...');
    
    // Get user by email
    const user = await admin.auth().getUserByEmail('admin@elira.hu');
    console.log('✅ Found user:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      disabled: user.disabled
    });

    // Check custom claims
    const customClaims = user.customClaims;
    console.log('✅ Custom claims:', customClaims);

    // Check Firestore document
    const userDoc = await admin.firestore().collection('users').doc(user.uid).get();
    if (userDoc.exists) {
      console.log('✅ Firestore document:', userDoc.data());
    } else {
      console.log('❌ No Firestore document found');
    }

    console.log('\n✅ Admin user is ready to use!');
    console.log('📧 Email: admin@elira.hu');
    console.log('🔑 Password: Admin123!');

  } catch (error) {
    console.error('❌ Error testing admin user:', error);
  }
  
  process.exit(0);
}

testAdminUser();