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

async function createAdminUserInEmulator() {
  try {
    console.log('🔥 Creating admin user in Firebase Auth Emulator...');
    
    // First try to delete existing user if it exists
    try {
      const existingUser = await admin.auth().getUserByEmail('admin@elira.hu');
      await admin.auth().deleteUser(existingUser.uid);
      console.log('🗑️ Deleted existing admin user');
    } catch (error) {
      // User doesn't exist, that's fine
      console.log('ℹ️ No existing user to delete');
    }

    // Create the admin user in Firebase Auth Emulator
    const userRecord = await admin.auth().createUser({
      uid: 'admin-user-emulator', // Fixed UID for consistency
      email: 'admin@elira.hu',
      password: 'Admin123!',
      displayName: 'Admin User',
      disabled: false,
      emailVerified: true
    });

    console.log('✅ Admin user created successfully:', userRecord.uid);

    // Create admin user document in Firestore emulator
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: 'admin@elira.hu',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      courseAccess: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Admin user document created in Firestore emulator');

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { 
      role: 'ADMIN', 
      admin: true,
      courseAccess: true
    });

    console.log('✅ Admin custom claims set');
    console.log('\n🎉 Admin user created successfully in emulator!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@elira.hu');
    console.log('🔑 Password: Admin123!');
    console.log('🆔 UID:', userRecord.uid);
    console.log('🔗 Firebase Auth Emulator UI: http://127.0.0.1:4000/auth');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure Firebase emulators are running: firebase emulators:start');
    console.log('2. Check that Auth emulator is on port 9099');
    console.log('3. Check that Firestore emulator is on port 8080');
  }
  
  process.exit(0);
}

// Create a test user as well
async function createTestUser() {
  try {
    console.log('👤 Creating test user...');
    
    const testUserRecord = await admin.auth().createUser({
      uid: 'test-user-emulator',
      email: 'test@elira.hu', 
      password: 'Test123!',
      displayName: 'Test User',
      disabled: false,
      emailVerified: true
    });

    await admin.firestore().collection('users').doc(testUserRecord.uid).set({
      uid: testUserRecord.uid,
      email: 'test@elira.hu',
      firstName: 'Test',
      lastName: 'User', 
      role: 'USER',
      isActive: true,
      courseAccess: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    await admin.auth().setCustomUserClaims(testUserRecord.uid, { 
      role: 'USER',
      courseAccess: true
    });

    console.log('✅ Test user created: test@elira.hu / Test123!');
  } catch (error) {
    console.log('⚠️ Test user creation failed (may already exist):', error.message);
  }
}

async function main() {
  await createAdminUserInEmulator();
  await createTestUser();
}

main();