const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

async function updateCoursePrice() {
  try {
    console.log('🔄 Connecting to Firestore...');
    
    const courseRef = db.collection('courses').doc('ai-copywriting-course');
    const doc = await courseRef.get();
    
    if (doc.exists) {
      const courseData = doc.data();
      console.log('📋 Current course data:');
      console.log('  - Title:', courseData.title);
      console.log('  - Current stripePriceId:', courseData.stripePriceId);
      console.log('  - Price:', courseData.price, courseData.currency);
      
      console.log('\n🔄 Updating to new price ID: price_1SAbPbHhqyKpFIBMcfdPF1Lh');
      
      await courseRef.update({
        stripePriceId: 'price_1SAbPbHhqyKpFIBMcfdPF1Lh',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Verify the update
      const updatedDoc = await courseRef.get();
      const updatedData = updatedDoc.data();
      
      console.log('\n✅ Course stripePriceId updated successfully!');
      console.log('  - New stripePriceId:', updatedData.stripePriceId);
      console.log('  - Updated at:', new Date().toISOString());
    } else {
      console.log('❌ Course not found: ai-copywriting-course');
      console.log('Creating course with new price ID...');
      
      // Create the course if it doesn't exist
      await courseRef.set({
        title: 'AI-alapú piac-kutatásos copywriting',
        description: 'Tanuld meg, hogyan használd az AI eszközöket hatékony szövegek írásához.',
        instructorName: 'Eszterházy Márk',
        instructorTitle: 'Digital Marketing Szakértő',
        instructorBio: '10+ év tapasztalat a digitális marketingben és AI copywritingban',
        category: 'Digital Marketing',
        difficulty: 'BEGINNER',
        language: 'hu',
        price: 49990,
        currency: 'HUF',
        thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
        totalDuration: 3360,
        totalLessons: 17,
        status: 'PUBLISHED',
        isFree: false,
        stripePriceId: 'price_1SAbPbHhqyKpFIBMcfdPF1Lh',
        stripeProductId: 'prod_SwFQ50r0KCrxss',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        publishedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('✅ Course created with new price ID');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    // Terminate the app to exit the script
    await admin.app().delete();
    process.exit(0);
  }
}

// Run the update
updateCoursePrice();