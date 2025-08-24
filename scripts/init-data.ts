import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  Timestamp
} from 'firebase/firestore';

// Use current Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8gw6c4s2HtX6XLcMz07TMrzVLsQ_wJs",
  authDomain: "elira-landing-ce927.firebaseapp.com", 
  projectId: "elira-landing-ce927",
  storageBucket: "elira-landing-ce927.firebasestorage.app",
  messagingSenderId: "997344115935",
  appId: "1:997344115935:web:fb45ee098f60731f76fd6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeData() {
  try {
    console.log('🚀 Initializing Firestore data...');

    // 1. Initialize stats document
    const statsRef = doc(db, 'stats', 'downloads');
    await setDoc(statsRef, {
      totalLeads: 0,
      totalDownloads: 0,
      vipSpotsRemaining: 150,
      communityMembers: 0,
      activeNow: 0,
      messagesToday: 0,
      questionsAnswered: 0,
      newMembersToday: 0,
      vipSlotsLeft: 150,
      lastUpdated: Timestamp.now()
    });
    console.log('✅ Stats document created');

    // 2. Add some sample activities for the feed
    const activitiesRef = collection(db, 'activities');
    
    const sampleActivities = [
      {
        user: 'János K.',
        action: 'letöltötte a ChatGPT Prompt Gyűjteményt',
        type: 'success' as const,
        platform: 'discord' as const,
        createdAt: Timestamp.now()
      },
      {
        user: 'Anna M.',
        action: 'letöltötte az Email Marketing Sablonokat',
        type: 'success' as const,
        platform: 'discord' as const,
        createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 1000)) // 5 minutes ago
      },
      {
        user: 'Péter G.',
        action: 'letöltötte a LinkedIn Növekedési Naptárt',
        type: 'success' as const,
        platform: 'discord' as const,
        createdAt: Timestamp.fromDate(new Date(Date.now() - 10 * 60 * 1000)) // 10 minutes ago
      }
    ];

    for (const activity of sampleActivities) {
      await addDoc(activitiesRef, activity);
    }
    console.log('✅ Sample activities created');

    // 3. Update stats with initial counts
    await setDoc(statsRef, {
      totalLeads: 3,
      totalDownloads: 3,
      vipSpotsRemaining: 147,
      communityMembers: 3,
      activeNow: 1,
      messagesToday: 5,
      questionsAnswered: 2,
      newMembersToday: 3,
      vipSlotsLeft: 147,
      lastUpdated: Timestamp.now()
    });
    console.log('✅ Stats updated with initial counts');

    console.log('🎉 Firestore initialization complete!');
    
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
  }
}

// Run initialization
initializeData()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });