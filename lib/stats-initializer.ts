import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { logger } from './logger';

// Initialize stats document if it doesn't exist
export async function initializeStatsDocument() {
  if (!db) {
    logger.error('Firestore not initialized');
    return false;
  }

  try {
    const statsRef = doc(db, 'stats', 'global');
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      // Document doesn't exist, but we can't create it due to security rules
      logger.log('Stats document does not exist and cannot be created client-side');
      return false;
    }
    
    logger.log('Stats document already exists');
    return true;
    
  } catch (error) {
    logger.error('Error checking stats document:', error);
    return false;
  }
}

// Check if stats document exists and return current values
export async function getCurrentStats() {
  if (!db) {
    logger.error('Firestore not initialized');
    return null;
  }

  try {
    const statsRef = doc(db, 'stats', 'global');
    const statsDoc = await getDoc(statsRef);
    
    if (statsDoc.exists()) {
      return statsDoc.data();
    } else {
      logger.log('Stats document does not exist');
      return null;
    }
    
  } catch (error) {
    logger.error('Error reading stats document:', error);
    return null;
  }
}