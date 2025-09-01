const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: "elira-landing-ce927",
  client_email: "firebase-adminsdk-fbsvc@elira-landing-ce927.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlA5Opebj24ycQ\nQd0/s3NCXySYarkSrfmvXnaqtii3blOfpS9biOSk9+2Ebyr1MdW53q1lqlceFLBi\nIoPkEnWW4eCCrtvs2oKnQwZQ4YtnWt/R6WAr2XOlo9GsXB2oIrFf+R9010gPZl7/\nUfY6L8iwgZkZrK2+F6aEEldkmZGeqBUZlPpbHt6QLVPh150timktGh8H/odCKxZd\nKxxSdBb5TuAD4LF+T3NHDzxNH0rbUsOE8/A1jT74fJ3+lORhaZLzBRudBIK83EFZ\nSj5WFCIM/zb8PRsYIAS8lXgHoE6kEeH46tHV7oAp85Qh5oZ99kwhmu5R6x71feLA\nvuWeC++DAgMBAAECggEACLE/kA2yMxDBIVFWq/3MMKc61NwsJSTcVscvmuAqIHg8\nDVGwP/mssARHDCFKEJ9xHMpya2rxPo+LeFYWCniW5QCyzFMFvvI2RlH5ceV1rJka\n6LVCdLeet5lFspSWfZS/hcSHaKBpOEhq76b1QRUiOWzZ2ksfFxl/tQCbN5LKn6pw\nLD8CNzgcMim7F6xfjdbCLlZUhso05i+t8DGEsDc1lpLWeaZG5GmbTtozxogUID/k\nTve6Bpna21FsFUvyh5CbF/SF1fbT/UTN76r+qA2MjPdTgIKPrsbB4FTHgZKRsG51\nQtXSZxzx9+vi5KiQCsim8FEq+t1ZOB7UgxxqxDaeRQKBgQD2zHlaB6A4z9hI8t2E\n6jf/Gnu3vqNyq7UHy4/QNVVjL8mgYky8dfFxqUfJAuWMFfU2hVg0YYy9uXR+/OsD\n0lo1SfbdfQkgWKzNaBv5nEsSkbd1JxSZDykPgsQKDl60Q/vzKimYJUe5G68W5y5j\nD22y+UVWhA3BjymYozuww5zeFwKBgQDtjVwA1immFVjgLq9AopayNLvZ3pwABA6d\nbWKagrUHeqTjx/2YPFbUv/IYZG6ttG8kqFVKEuUiSitT/CeNw0Z11soIJcefgzw+\nopzRGKbHfcNPM+J0amEmaO/bip2Hv2u+aFijwA2HhQvAON8SKG3EIKf/Ot5v0xrZ\nezk5NrVpdQKBgQDNclHi3E5IfN0zfNli+Ac9WbJ7tzshDkdZAd/qFzvJodJarPns\nONKRJ7YWY07rWqwSgtZ2ZG5g0a1kuO568/UcP0I+BwQ95ROUuoHvPGhSQPNTlwDS\nmYg43UaMiIHV1nI6bnLJsN8P/Te3/SLkW8eaIV/TMYKyCpc59UiPUYeYaQKBgQCH\nm36964PzD5SgxYW9/BLSwE/MW8vqJmbBb8QuOBdnoZengG9ADJH0+W4Whp64Apy/\n7Ghj1M2A+Z4qX3Ok9aivdGH4rLh8Usp9Zw7mPpBWqXBpMlE/68pxxs3GIiczaw7y\nr1aKhAQ1LLo8jTqqfvHKWGoOxWhdpcFaDYHpK1X8UQKBgDnU5eHY9zZx2Iy1sUSd\nGEAtrSTzoGg5UVnna1EY3xe4ZwZXfpMgMlFLcfnhd4U4COphudYoLUHinnq3yStD\nj89eJlhi3Qp3AOf+GWS3ehzS54rdAQJO4UNA4oMoeuwx/d91cXY8dElZ0wyBZv+C\nlABqPiZXbeIs7BtLlX+2jtE+\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n')
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://elira-landing-ce927-default-rtdb.firebaseio.com"
  });
}

async function createAdminUser() {
  try {
    // Create the admin user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: 'admin@elira.hu',
      password: 'Admin123!',
      displayName: 'Admin User',
      disabled: false,
      emailVerified: true
    });

    console.log('✓ Admin user created successfully:', userRecord.uid);

    // Set admin role in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: 'admin@elira.hu',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      courseAccess: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✓ Admin user document created in Firestore');

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'ADMIN', admin: true });

    console.log('✓ Admin custom claims set');
    console.log('\n🎉 Admin user created successfully!');
    console.log('Email: admin@elira.hu');
    console.log('Password: Admin123!');
    console.log('UID:', userRecord.uid);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    
    if (error.code === 'auth/email-already-exists') {
      console.log('\n📝 User already exists, updating role...');
      
      try {
        const existingUser = await admin.auth().getUserByEmail('admin@elira.hu');
        
        // Update Firestore document
        await admin.firestore().collection('users').doc(existingUser.uid).set({
          email: 'admin@elira.hu',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          isActive: true,
          courseAccess: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Set custom claims
        await admin.auth().setCustomUserClaims(existingUser.uid, { role: 'ADMIN', admin: true });

        console.log('✓ Existing user updated to admin');
        console.log('UID:', existingUser.uid);
      } catch (updateError) {
        console.error('❌ Error updating existing user:', updateError);
      }
    }
  } finally {
    process.exit(0);
  }
}

createAdminUser();