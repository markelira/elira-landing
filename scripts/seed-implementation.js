/**
 * Script to seed implementation tracking data into Firestore
 *
 * Usage: node scripts/seed-implementation.js <userId>
 *
 * This creates sample implementation data for the specified user
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();

// Get userId from command line args
const userId = process.argv[2];

if (!userId) {
  console.error('❌ Error: Please provide a userId as an argument');
  console.log('Usage: node scripts/seed-implementation.js <userId>');
  process.exit(1);
}

async function seedImplementation() {
  console.log(`🌱 Creating implementation tracking for user: ${userId}`);

  // Set program start date to 5 days ago (so currentDay will be 6)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 5);
  const programStartDate = startDate.toISOString().split('T')[0];

  const implementation = {
    userId: userId,
    courseId: 'ai-copywriting-course',
    programStartDate: programStartDate,
    currentDay: 6,
    milestones: [
      {
        day: 3,
        title: 'Piackutatás megkezdve',
        description: 'Elindítottad a versenytárs elemzést',
        completedAt: admin.firestore.Timestamp.fromDate(
          new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        ),
      },
      {
        day: 5,
        title: 'Első buyer persona elkészült',
        description: 'Létrehoztad az első célközönség profilt',
        completedAt: admin.firestore.Timestamp.fromDate(
          new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        ),
      },
    ],
    deliverables: {
      marketResearchCompleted: true,
      marketResearchCompletedAt: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      ),
      buyerPersonasCreated: 1,
      campaignsLaunched: 0,
      abTestsRunning: 0,
    },
    implementationProgress: 25,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('implementations').doc(userId).set(implementation);

  console.log(`✅ Implementation tracking created successfully!`);
  console.log(`   Program Start: ${programStartDate}`);
  console.log(`   Current Day: 6/30`);
  console.log(`   Progress: 25%`);
  console.log(`   Deliverables:`);
  console.log(`     - Market Research: ✓ Completed`);
  console.log(`     - Buyer Personas: 1/3`);
  console.log(`     - Campaigns Launched: 0`);
  console.log(`     - A/B Tests: 0`);

  process.exit(0);
}

// Run seeding
seedImplementation().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
