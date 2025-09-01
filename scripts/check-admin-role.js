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

async function checkAdminRole() {
  try {
    console.log('🔍 Checking admin@elira.hu role status...\n');
    
    // Get user from Auth
    const userRecord = await admin.auth().getUserByEmail('admin@elira.hu');
    console.log('✓ User found in Firebase Auth');
    console.log('  UID:', userRecord.uid);
    console.log('  Email:', userRecord.email);
    console.log('  Custom Claims:', userRecord.customClaims);
    
    // Get user from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userRecord.uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      console.log('\n✓ User found in Firestore');
      console.log('  Role:', userData.role);
      console.log('  Active:', userData.isActive);
      console.log('  Course Access:', userData.courseAccess);
      
      // Check if everything is set correctly
      const hasAdminClaim = userRecord.customClaims?.role === 'ADMIN';
      const hasAdminRole = userData.role === 'ADMIN';
      
      console.log('\n🔐 Role Verification:');
      console.log('  ✓ Firebase Auth Custom Claim (role: ADMIN):', hasAdminClaim ? '✅' : '❌');
      console.log('  ✓ Firestore Document (role: ADMIN):', hasAdminRole ? '✅' : '❌');
      
      if (hasAdminClaim && hasAdminRole) {
        console.log('\n🎉 SUCCESS: admin@elira.hu has full admin access!');
        console.log('   Can access: /admin/dashboard');
        console.log('   Credentials: admin@elira.hu / Admin123!');
      } else {
        console.log('\n❌ ISSUE: Admin role not properly set');
      }
      
    } else {
      console.log('\n❌ User document not found in Firestore');
    }
    
  } catch (error) {
    console.error('❌ Error checking admin role:', error);
  } finally {
    process.exit(0);
  }
}

checkAdminRole();