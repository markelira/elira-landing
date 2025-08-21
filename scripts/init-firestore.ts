import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  Timestamp,
  increment
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzHstrXjJjSAomfNUXNW3qdNeY8y614DI",
  authDomain: "elira-landing.firebaseapp.com",
  projectId: "elira-landing",
  storageBucket: "elira-landing.firebasestorage.app",
  messagingSenderId: "651802555158",
  appId: "1:651802555158:web:73d3c330615f0a02c89637",
  measurementId: "G-62PNN5TT2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data
const sampleLeads = [
  {
    email: "test@example.com",
    name: "Test User",
    magnetSelected: "chatgpt-prompts",
    job: "Marketing",
    education: "BSc",
    timestamp: Timestamp.now()
  },
  {
    email: "sample@demo.com",
    name: "Sample Demo",
    magnetSelected: "linkedin-calendar",
    job: "Sales",
    timestamp: Timestamp.now()
  }
];

const sampleActivities = [
  {
    type: "signup",
    userName: "Kovács A.",
    action: "csatlakozott",
    timestamp: Timestamp.now()
  },
  {
    type: "download",
    userName: "Nagy P.",
    action: "letöltötte a LinkedIn Naptárt",
    magnetName: "LinkedIn Naptár",
    timestamp: Timestamp.now()
  },
  {
    type: "community_join",
    userName: "Szabó E.",
    action: "belépett a Discord-ra",
    timestamp: Timestamp.now()
  },
  {
    type: "signup",
    userName: "Tóth M.",
    action: "csatlakozott",
    timestamp: Timestamp.now()
  },
  {
    type: "download",
    userName: "Kiss B.",
    action: "letöltötte a ChatGPT Guide-ot",
    magnetName: "ChatGPT Guide",
    timestamp: Timestamp.now()
  }
];

async function initializeFirestore() {
  console.log('🚀 Initializing Firestore Database...\n');

  try {
    // 1. Initialize Stats Collection
    console.log('📊 Setting up stats collection...');
    const statsRef = doc(db, 'stats', 'global');
    const statsDoc = await getDoc(statsRef);

    if (!statsDoc.exists()) {
      await setDoc(statsRef, {
        totalLeads: 0,
        totalDownloads: 0,
        vipSpotsRemaining: 100,
        communityMembers: 47,
        lastUpdated: Timestamp.now()
      });
      console.log('✅ Stats collection created');
    } else {
      console.log('ℹ️  Stats collection already exists - updating timestamp');
      await updateDoc(statsRef, {
        lastUpdated: Timestamp.now()
      });
    }

    // 2. Initialize Leads Collection
    console.log('\n📧 Setting up leads collection...');
    const leadsCollection = collection(db, 'leads');
    const existingLeads = await getDocs(leadsCollection);

    if (existingLeads.empty) {
      const leadPromises = sampleLeads.map(lead => addDoc(leadsCollection, lead));
      await Promise.all(leadPromises);
      console.log(`✅ Sample leads added (${sampleLeads.length} documents)`);

      // Update stats with lead count
      await updateDoc(statsRef, {
        totalLeads: increment(sampleLeads.length)
      });
    } else {
      console.log('ℹ️  Leads collection already has data - skipping sample data');
    }

    // 3. Initialize Activities Collection
    console.log('\n🎯 Setting up activities collection...');
    const activitiesCollection = collection(db, 'activities');
    const existingActivities = await getDocs(activitiesCollection);

    if (existingActivities.empty) {
      const activityPromises = sampleActivities.map(activity => addDoc(activitiesCollection, activity));
      await Promise.all(activityPromises);
      console.log(`✅ Sample activities added (${sampleActivities.length} documents)`);
    } else {
      console.log('ℹ️  Activities collection already has data - skipping sample data');
    }

    // 4. Verify and display database status
    console.log('\n📊 Database Status:');
    console.log('-------------------');

    // Get current stats
    const currentStats = await getDoc(statsRef);
    const stats = currentStats.data();

    // Count documents
    const leadsSnapshot = await getDocs(leadsCollection);
    const activitiesSnapshot = await getDocs(activitiesCollection);

    console.log(`- Total Leads: ${leadsSnapshot.size}`);
    console.log(`- VIP Spots Remaining: ${stats?.vipSpotsRemaining || 100}`);
    console.log(`- Community Members: ${stats?.communityMembers || 47}`);
    console.log(`- Activities: ${activitiesSnapshot.size}`);

    console.log('\n✨ Database initialization complete!');
    console.log('\nNext steps:');
    console.log('1. Run "npm run deploy-rules" to deploy security rules');
    console.log('2. Run "npm run test-db" to verify the setup');
    console.log('3. Start your app with "npm run dev"\n');

  } catch (error) {
    console.error('\n❌ Error during initialization:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Check your Firebase configuration is correct');
    console.log('2. Ensure Firestore is enabled in Firebase Console');
    console.log('3. Check your internet connection');
    process.exit(1);
  }
}

// Run the initialization
initializeFirestore()
  .then(() => {
    console.log('🎉 Process completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });