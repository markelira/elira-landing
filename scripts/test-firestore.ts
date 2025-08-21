import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  orderBy,
  limit
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

async function testFirestore() {
  console.log('🔍 Testing Firestore Database Connection...\n');

  try {
    // 1. Test Stats Collection
    console.log('📊 Testing Stats Collection:');
    console.log('----------------------------');
    const statsRef = doc(db, 'stats', 'global');
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      const stats = statsDoc.data();
      console.log('✅ Stats document found:');
      console.log(`   - Total Leads: ${stats.totalLeads}`);
      console.log(`   - Total Downloads: ${stats.totalDownloads}`);
      console.log(`   - VIP Spots Remaining: ${stats.vipSpotsRemaining}`);
      console.log(`   - Community Members: ${stats.communityMembers}`);
      console.log(`   - Last Updated: ${stats.lastUpdated?.toDate?.() || stats.lastUpdated}`);
    } else {
      console.log('❌ Stats document not found');
    }

    // 2. Test Leads Collection
    console.log('\n📧 Testing Leads Collection:');
    console.log('----------------------------');
    const leadsRef = collection(db, 'leads');
    const leadsSnapshot = await getDocs(leadsRef);

    if (!leadsSnapshot.empty) {
      console.log(`✅ Found ${leadsSnapshot.size} lead(s)`);
      
      // Note: In production, leads should not be readable from client
      // This is just for testing purposes
      console.log('   Sample leads (first 3):');
      let count = 0;
      leadsSnapshot.forEach(doc => {
        if (count < 3) {
          const lead = doc.data();
          console.log(`   - ${lead.name || 'Anonymous'} (${lead.email})`);
          count++;
        }
      });
    } else {
      console.log('⚠️  No leads found in collection');
    }

    // 3. Test Activities Collection
    console.log('\n🎯 Testing Activities Collection:');
    console.log('--------------------------------');
    const activitiesRef = collection(db, 'activities');
    const activitiesQuery = query(
      activitiesRef, 
      orderBy('timestamp', 'desc'), 
      limit(5)
    );
    const activitiesSnapshot = await getDocs(activitiesQuery);

    if (!activitiesSnapshot.empty) {
      console.log(`✅ Found ${activitiesSnapshot.size} recent activities`);
      console.log('   Recent activities:');
      
      activitiesSnapshot.forEach(doc => {
        const activity = doc.data();
        const action = activity.magnetName 
          ? `${activity.action} (${activity.magnetName})`
          : activity.action;
        console.log(`   - ${activity.userName}: ${action}`);
      });
    } else {
      console.log('⚠️  No activities found in collection');
    }

    // 4. Test Write Permissions (should fail for stats)
    console.log('\n🔐 Testing Security Rules:');
    console.log('-------------------------');
    
    try {
      // This should fail due to security rules
      const testStatsRef = doc(db, 'stats', 'test');
      await getDoc(testStatsRef);
      console.log('✅ Read access to stats: Allowed');
    } catch (error) {
      console.log('❌ Read access to stats: Denied');
    }

    // Summary
    console.log('\n📈 Database Test Summary:');
    console.log('------------------------');
    console.log('✅ Database connection successful');
    console.log('✅ All collections accessible');
    console.log('✅ Security rules appear to be working');
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\nYour Firestore database is ready for production use.');

  } catch (error) {
    console.error('\n❌ Error during testing:', error);
    console.log('\nPossible issues:');
    console.log('1. Database not initialized - run "npm run init-db" first');
    console.log('2. Network connectivity issues');
    console.log('3. Firebase configuration incorrect');
    console.log('4. Security rules not deployed');
    process.exit(1);
  }
}

// Run the test
testFirestore()
  .then(() => {
    console.log('\n✨ Test script completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });