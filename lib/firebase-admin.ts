import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDK initialization
const adminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin only if it hasn't been initialized already
const adminApp = getApps().find(app => app.name === '[DEFAULT]') || 
  initializeApp({
    credential: cert(adminConfig),
    projectId: adminConfig.projectId,
  });

// Initialize Firestore Admin
export const adminDb = getFirestore(adminApp);

// Export the admin app
export { adminApp };