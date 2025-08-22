'use client';

import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function initializeStatsIfNeeded() {
  try {
    const statsRef = doc(db, 'stats', 'downloads');
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      console.log('Initializing stats document...');
      await setDoc(statsRef, {
        totalDownloads: 0,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
      console.log('Stats document initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing stats:', error);
  }
}