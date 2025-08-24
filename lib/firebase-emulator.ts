import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "demo-project",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Initialize Firebase for emulator testing
export const emulatorApp = getApps().find(app => app.name === 'emulator-app') || 
  initializeApp(firebaseConfig, 'emulator-app');

// Initialize services for emulator
export const emulatorAuth = getAuth(emulatorApp);
export const emulatorDb = getFirestore(emulatorApp);
export const emulatorFunctions = getFunctions(emulatorApp);

// Connect to emulators (only in development)
let emulatorsConnected = false;

export function connectToEmulators() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !emulatorsConnected) {
    try {
      // Auth Emulator
      connectAuthEmulator(emulatorAuth, 'http://localhost:9099', { disableWarnings: true });
      
      // Firestore Emulator
      connectFirestoreEmulator(emulatorDb, 'localhost', 8080);
      
      // Functions Emulator
      connectFunctionsEmulator(emulatorFunctions, 'localhost', 5001);
      
      emulatorsConnected = true;
      console.log('🔧 Connected to Firebase Emulators');
    } catch (error) {
      console.warn('⚠️ Emulator connection failed:', error);
    }
  }
}