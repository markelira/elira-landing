import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Helper function to properly format the private key
function formatPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  
  // Handle different formats of private key
  let formattedKey = key;
  
  // If key has literal \n strings, replace them with actual newlines
  if (formattedKey.includes('\\n')) {
    formattedKey = formattedKey.replace(/\\n/g, '\n');
  }
  
  // Ensure proper BEGIN/END format
  if (!formattedKey.includes('-----BEGIN PRIVATE KEY-----')) {
    // If it's just the key content, wrap it properly
    const keyContent = formattedKey.replace(/-----BEGIN PRIVATE KEY-----/g, '')
                                   .replace(/-----END PRIVATE KEY-----/g, '')
                                   .replace(/\s/g, '');
    
    // Add proper formatting with line breaks every 64 characters
    const chunks = keyContent.match(/.{1,64}/g) || [];
    formattedKey = '-----BEGIN PRIVATE KEY-----\n' + 
                   chunks.join('\n') + '\n' + 
                   '-----END PRIVATE KEY-----\n';
  }
  
  return formattedKey;
}

// Firebase Admin SDK initialization with better error handling
const adminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
};

// Validate configuration
if (!adminConfig.projectId || !adminConfig.clientEmail || !adminConfig.privateKey) {
  console.error('Firebase Admin SDK configuration is incomplete:', {
    hasProjectId: !!adminConfig.projectId,
    hasClientEmail: !!adminConfig.clientEmail,
    hasPrivateKey: !!adminConfig.privateKey,
  });
}

let adminApp: any = null;
let adminDb: any = null;

try {
  // Initialize Firebase Admin only if it hasn't been initialized already
  adminApp = getApps().find(app => app.name === '[DEFAULT]') || 
    initializeApp({
      credential: cert(adminConfig),
      projectId: adminConfig.projectId,
    });

  // Initialize Firestore Admin
  adminDb = getFirestore(adminApp);
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  // Set to null so we can handle gracefully
  adminDb = null;
}

// Export the admin db with null check
export { adminDb, adminApp };