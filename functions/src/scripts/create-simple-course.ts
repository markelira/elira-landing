import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export async function createSimpleCourse() {
  try {
    console.log('Creating simple ai-copywriting-course...');
    
    const courseId = 'ai-copywriting-course';
    
    // Simple course data that matches the API expectations
    const courseData = {
      title: 'AI-alapú piac-kutatásos copywriting',
      description: 'Tanuld meg, hogyan használd az AI eszközöket hatékony szövegek írásához.',
      instructorName: 'Eszterházy Márk',
      instructorTitle: 'Digital Marketing Szakértő',
      instructorBio: '10+ év tapasztalat a digitális marketingben és AI copywritingban',
      category: 'Digital Marketing',
      difficulty: 'BEGINNER',
      language: 'hu',
      price: 9990,
      currency: 'HUF',
      thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
      totalDuration: 3360,
      totalLessons: 17,
      status: 'PUBLISHED',
      isFree: false,
      stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',
      stripeProductId: 'prod_SwFQ50r0KCrxss',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    await db.collection('courses').doc(courseId).set(courseData);
    console.log('✅ Course created:', courseId);
    
    return {
      success: true,
      courseId: courseId,
      message: 'Simple course created successfully'
    };
  } catch (error) {
    console.error('Error creating simple course:', error);
    throw error;
  }
}