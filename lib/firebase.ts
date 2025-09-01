import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Analytics (client-side only)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Functions
export const functions = getFunctions(app);

// Initialize Storage
export const storage = getStorage(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Use a flag to prevent multiple connections
  const connectEmulators = () => {
    if ((window as any).__FIREBASE_EMULATORS_CONNECTED__) {
      return;
    }
    
    try {
      console.log('🔥 Connecting to Firebase emulators...');
      
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      console.log('✅ Connected to Auth emulator');
      
      connectFirestoreEmulator(db, '127.0.0.1', 8080);
      console.log('✅ Connected to Firestore emulator');
      
      connectFunctionsEmulator(functions, '127.0.0.1', 5001);
      console.log('✅ Connected to Functions emulator');
      
      connectStorageEmulator(storage, '127.0.0.1', 9199);
      console.log('✅ Connected to Storage emulator');
      
      (window as any).__FIREBASE_EMULATORS_CONNECTED__ = true;
    } catch (error) {
      console.warn('⚠️ Emulator connection error (may already be connected):', error);
    }
  };
  
  connectEmulators();
}