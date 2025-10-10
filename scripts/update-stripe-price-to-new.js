#!/usr/bin/env node

/**
 * Update Stripe Price ID to new price
 * Updates ai-copywriting-course to use price_1SGGmxHhqyKpFIBM2f3kM13h
 */

const admin = require('firebase-admin');
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

const NEW_PRICE_ID = 'price_1SGGmxHhqyKpFIBM2f3kM13h';
const NEW_PRICE = 89990;
const COURSE_ID = 'ai-copywriting-course';

async function updateCoursePrice() {
  try {
    console.log('🔄 Starting course price update...\n');

    // Get the course document
    const courseRef = db.collection('courses').doc(COURSE_ID);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      console.error(`❌ Course ${COURSE_ID} not found!`);
      console.log('\n📋 Available courses:');
      const coursesSnapshot = await db.collection('courses').get();
      coursesSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.title} (${data.price} ${data.currency})`);
      });
      process.exit(1);
    }

    const courseData = courseDoc.data();
    console.log('📚 Current course data:');
    console.log(`  ID: ${COURSE_ID}`);
    console.log(`  Title: ${courseData.title}`);
    console.log(`  Current Price: ${courseData.price} ${courseData.currency}`);
    console.log(`  Current Stripe Price ID: ${courseData.stripePriceId}`);
    console.log('');

    // Update the course
    console.log('🔄 Updating to:');
    console.log(`  New Price: ${NEW_PRICE} HUF`);
    console.log(`  New Stripe Price ID: ${NEW_PRICE_ID}`);
    console.log('');

    await courseRef.update({
      stripePriceId: NEW_PRICE_ID,
      price: NEW_PRICE,
      currency: 'HUF',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Course updated successfully!');
    console.log('');

    // Verify the update
    const updatedDoc = await courseRef.get();
    const updatedData = updatedDoc.data();
    console.log('✅ Verification:');
    console.log(`  Price: ${updatedData.price} ${updatedData.currency}`);
    console.log(`  Stripe Price ID: ${updatedData.stripePriceId}`);
    console.log('');
    console.log('🎉 All done! The course now uses the new price.');

  } catch (error) {
    console.error('❌ Error updating course:', error);
    console.error('Stack:', error.stack);
  } finally {
    // Terminate the app to exit the script
    await admin.app().delete();
    process.exit(0);
  }
}

updateCoursePrice();
