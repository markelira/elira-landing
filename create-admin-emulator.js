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

async function createAdminUser() {
  try {
    console.log('🔄 Creating admin user in Firebase emulator...');
    
    // Create the admin user in Firebase Auth Emulator
    const userRecord = await admin.auth().createUser({
      uid: 'admin-user-emulator',
      email: 'admin@elira.hu',
      password: 'Admin123!',
      displayName: 'Admin User',
      disabled: false,
      emailVerified: true
    });

    console.log('✓ Admin user created in Auth emulator:', userRecord.uid);

    // Set admin role in Firestore Emulator
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

    console.log('✓ Admin user document created in Firestore emulator');

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { 
      role: 'ADMIN', 
      admin: true 
    });

    console.log('✓ Admin custom claims set');
    console.log('\n🎉 Admin user created successfully in emulator!');
    console.log('Email: admin@elira.hu');
    console.log('Password: Admin123!');
    console.log('UID:', userRecord.uid);

  } catch (error) {
    if (error.code === 'auth/uid-already-exists') {
      console.log('📝 User with this UID already exists, updating...');
      
      try {
        const existingUser = await admin.auth().getUser('admin-user-emulator');
        
        // Update Firestore document
        await admin.firestore().collection('users').doc(existingUser.uid).set({
          uid: existingUser.uid,
          email: 'admin@elira.hu',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          isActive: true,
          courseAccess: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Set custom claims
        await admin.auth().setCustomUserClaims(existingUser.uid, { 
          role: 'ADMIN', 
          admin: true 
        });

        console.log('✓ Existing user updated to admin');
        console.log('UID:', existingUser.uid);
      } catch (updateError) {
        console.error('❌ Error updating existing user:', updateError);
      }
    } else {
      console.error('❌ Error creating admin user:', error);
    }
  }
  
  process.exit(0);
}

createAdminUser();