const admin = require('firebase-admin');

// Initialize Firebase Admin for production
if (!admin.apps.length) {
  // Load service account credentials for production
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

const db = admin.firestore();

async function createProductionCourse() {
  try {
    console.log('🌱 Creating production course...');
    
    // Create the AI copywriting course
    const courseId = 'ai-copywriting-course';
    const courseData = {
      title: 'Olvass a vevőid gondolataiban',
      slug: 'ai-copywriting-course',
      description: 'AI-alapú copywriting és marketingkutatás kurzus. Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.',
      shortDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel.',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      
      // Instructor
      instructorId: 'zoltan-somosi',
      instructorName: 'Somosi Zoltán',
      instructorEmail: 'zoltan@elira.hu',
      instructorBio: 'Marketing Specialista & Doktorandusz',
      instructorPhotoUrl: '/IMG_5730.JPG',
      
      // Category
      categoryId: 'ai-marketing',
      categoryName: 'AI Marketing',
      language: 'hu',
      difficulty: 'INTERMEDIATE',
      
      // Media
      thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
      previewVideoUrl: 'https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg',
      
      // Pricing - CRITICAL for Stripe
      price: 89990,
      currency: 'HUF',
      isFree: false,
      stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM', // Existing Stripe price ID
      
      // Learning
      objectives: [
        'Buyer persona kidolgozása 10 perc alatt MI segítségével',
        'Versenytárs analízis automatizálása AI eszközökkel',
        'Pszichológiai triggerek alkalmazása a copywritingban',
        'Email marketing automatizáció készítése',
        'Facebook Ads copy generátor használata',
        'Social media tartalom tervezés AI-val'
      ],
      prerequisites: [
        'Alapvető számítógépes ismeretek',
        'Magyar nyelv magas szintű ismerete',
        'Nyitottság az új technológiák iránt',
        'Vállalkozói vagy marketinges háttér előny'
      ],
      
      // Settings
      certificateEnabled: true,
      isPlus: true,
      
      // Stats
      enrollmentCount: 312,
      completionCount: 89,
      averageRating: 4.9,
      totalReviews: 89,
      
      // Content stats
      totalModules: 5,
      totalLessons: 17,
      totalDuration: 3300, // 55 minutes in seconds
      
      // Timestamps
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save course to production Firestore
    await db.collection('courses').doc(courseId).set(courseData);
    console.log('✅ Production course created:', courseId);
    
    console.log('\n🎉 Production course created successfully!');
    console.log(`📍 Course ID: ${courseId}`);
    console.log(`💰 Price: ${courseData.price} ${courseData.currency}`);
    console.log(`🎫 Stripe Price ID: ${courseData.stripePriceId}`);
    console.log(`🔗 View at: https://elira-landing.vercel.app/courses/${courseId}`);
    
  } catch (error) {
    console.error('❌ Error creating production course:', error);
  } finally {
    process.exit(0);
  }
}

createProductionCourse();