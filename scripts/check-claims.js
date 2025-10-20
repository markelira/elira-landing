const admin = require('firebase-admin');

process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

admin.initializeApp({ projectId: 'elira-landing-ce927' });

const auth = admin.auth();

async function checkClaims() {
  try {
    const user = await auth.getUserByEmail('company-owner@test.com');
    console.log('User ID:', user.uid);
    console.log('Custom Claims:', JSON.stringify(user.customClaims, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

checkClaims();
