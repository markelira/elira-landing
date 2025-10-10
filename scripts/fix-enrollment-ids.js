const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();

(async () => {
  try {
    console.log('🔧 Fixing enrollment document IDs...\n');

    // Get all enrollments
    const enrollmentsSnapshot = await db.collection('enrollments').get();

    if (enrollmentsSnapshot.empty) {
      console.log('⚠️  No enrollments found!');
      process.exit(0);
    }

    console.log(`📋 Found ${enrollmentsSnapshot.size} enrollment documents\n`);

    let fixed = 0;
    let skipped = 0;

    for (const doc of enrollmentsSnapshot.docs) {
      const data = doc.data();
      const { userId, courseId } = data;

      if (!userId || !courseId) {
        console.log(`⚠️  Skipping ${doc.id} - missing userId or courseId`);
        skipped++;
        continue;
      }

      const expectedId = `${userId}_${courseId}`;

      if (doc.id === expectedId) {
        console.log(`✅ ${doc.id} - Already has correct ID format`);
        skipped++;
        continue;
      }

      console.log(`🔄 Migrating: ${doc.id} → ${expectedId}`);

      // Check if correct ID document already exists
      const correctDoc = await db.collection('enrollments').doc(expectedId).get();

      if (correctDoc.exists) {
        console.log(`   ⚠️  Document ${expectedId} already exists, deleting duplicate ${doc.id}`);
        await doc.ref.delete();
        fixed++;
        continue;
      }

      // Create new document with correct ID
      await db.collection('enrollments').doc(expectedId).set({
        ...data,
        migratedAt: admin.firestore.FieldValue.serverTimestamp(),
        originalDocId: doc.id
      });

      // Delete old document
      await doc.ref.delete();

      console.log(`   ✅ Successfully migrated to ${expectedId}`);
      fixed++;
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`   Fixed: ${fixed}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${enrollmentsSnapshot.size}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();
