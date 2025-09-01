import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

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

// CRITICAL: Set emulator environment variables BEFORE ANY initialization
if (process.env.NODE_ENV === 'development' || !process.env.FIREBASE_PROJECT_ID) {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  console.log('🔧 Emulator environment variables set BEFORE initialization');
}

let adminApp: any = null;
let adminDb: any = null;
let auth: any = null;

try {
  // Check if we already have an initialized app
  const existingApps = getApps();
  
  if (existingApps.length > 0) {
    console.log('♻️ Using existing Firebase Admin app');
    adminApp = existingApps[0];
  } else {
    console.log('🆕 Initializing new Firebase Admin app for emulator');
    // Initialize WITHOUT credentials for emulator
    adminApp = initializeApp({
      projectId: 'elira-landing-ce927',
    });
  }
  
  // Initialize services
  adminDb = getFirestore(adminApp);
  auth = getAuth(adminApp);
  
  console.log('✅ Firebase Admin configured successfully:', {
    hasApp: !!adminApp,
    hasDb: !!adminDb,
    hasAuth: !!auth,
    emulatorHost: process.env.FIRESTORE_EMULATOR_HOST
  });
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  // Set to null so we can handle gracefully
  adminDb = null;
  auth = null;
}

// Export the admin services with null check
export { adminDb, adminApp, auth };