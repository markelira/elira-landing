// Manual script to initialize stats document in Firebase
// Run this once to create the stats/global document

const admin = require('firebase-admin');

// Initialize with your project ID
const app = admin.initializeApp({
  projectId: 'elira-landing'
});

const db = admin.firestore();

async function initializeStats() {
  try {
    const statsRef = db.collection('stats').doc('global');
    
    await statsRef.set({
      totalLeads: 0,
      totalDownloads: 0,
      vipSpotsRemaining: 150,
      communityMembers: 0,
      activeNow: 0,
      messagesToday: 0,
      questionsAnswered: 0,
      newMembersToday: 0,
      vipSlotsLeft: 150,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Stats document created successfully!');
    console.log('You can now use the application with working counters.');
    
  } catch (error) {
    console.error('❌ Failed to create stats document:', error);
  } finally {
    await app.delete();
  }
}

initializeStats();