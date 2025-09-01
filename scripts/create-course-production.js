const admin = require('firebase-admin');

// Initialize Firebase Admin for production
const serviceAccount = {
  projectId: 'elira-landing-ce927',
  clientEmail: 'firebase-adminsdk-fbsvc@elira-landing-ce927.iam.gserviceaccount.com',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'elira-landing-ce927',
    storageBucket: 'elira-landing-ce927.firebasestorage.app'
  });
}

const db = admin.firestore();

async function createCourseProduction() {
  try {
    console.log('🚀 Creating ai-copywriting-course for production...');
    
    const courseId = 'ai-copywriting-course';
    
    // Complete course data extracted from homepage components
    const courseData = {
      // Basic info
      title: 'Olvass a vevőid gondolataiban',
      slug: 'ai-copywriting-course',
      description: 'AI-alapú copywriting és marketingkutatás kurzus. Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.',
      shortDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel.',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      
      // Instructor - from ZoliIntroduction component
      instructorId: 'zoltan-somosi',
      instructorName: 'Somosi Zoltán',
      instructorEmail: 'zoltan@elira.hu',
      instructorBio: 'E-mail és trigger marketing specialista a Heureka Groupnál, és doktorandusz a Miskolci Egyetemen, ahol a mesterséges intelligencia és az online marketing hatékonysága a kutatási területem.',
      instructorPhotoUrl: '/IMG_5730.JPG',
      instructorTitle: 'Marketing Specialista & Doktorandusz',
      instructorInstitution: 'Miskolci Egyetem & Heureka Group',
      instructorLinkedIn: 'https://linkedin.com/in/zoltán-somosi-299605226',
      
      // Category
      categoryId: 'ai-marketing',
      categoryName: 'AI Marketing',
      language: 'hu',
      difficulty: 'INTERMEDIATE',
      
      // Media
      thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
      previewVideoUrl: 'https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg',
      
      // Pricing - from PricingSection and Stripe configuration
      price: 9990,
      currency: 'HUF',
      isFree: false,
      stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',
      stripeProductId: 'prod_SwFQ50r0KCrxss',
      
      // Learning objectives - from CourseDetailsSection highlights
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
      
      targetAudience: [
        'Vállalkozók, akik megunta, hogy minden fillért ügynökségekre költ',
        'Marketingesek, akiket a főnök folyamatosan szorít jobb számokért',
        'Akik tisztában vannak vele, hogy lemaradnak az AI forradalomról'
      ],
      
      // Course features - from homepage components
      features: [
        'Buyer persona készítése 5 perc alatt MI segítségével',
        'Fájdalompontok feltárása automatizált módszerekkel',
        'Profitnövelő szövegírás AI-val',
        'MI-sablonok készítése és használata',
        'Konkrét példák és gyakorlatok',
        '7 letölthető PDF sablon',
        'Azonnali hozzáférés',
        '30 napos pénzvisszafizetési garancia'
      ],
      
      // Settings
      certificateEnabled: true,
      
      // Stats - from homepage
      enrollmentCount: 312,
      completionCount: 200,
      averageRating: 4.9,
      totalReviews: 89,
      
      // Content stats - from CourseDetailsSection
      totalModules: 5,
      totalLessons: 17,
      totalDuration: 3360, // 56 minutes in seconds
      totalVideos: 17,
      totalPDFs: 7,
      
      // Timestamps
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      publishedAt: admin.firestore.FieldValue.serverTimestamp(),
      
      // Additional metadata
      isPlus: true,
      isFeatured: true,
      tags: ['AI', 'Copywriting', 'Marketing', 'ChatGPT', 'Email Marketing', 'Facebook Ads'],
      seoKeywords: ['AI copywriting', 'mesterséges intelligencia marketing', 'ChatGPT copywriting', 'buyer persona', 'email marketing'],
      
      // Course value proposition
      courseValue: {
        totalComponentValue: 32000, // From PricingSection calculation
        actualPrice: 9990,
        savings: 22010,
        valueComponents: [
          { text: '5 modul, 17 videó (56 perc)', value: 8000 },
          { text: '7 AI generátor PDF', value: 5000 },
          { text: 'Gyakorlati AI prompt sablonok', value: 3000 },
          { text: 'Doktorandusz oktató szakértelem', value: 12000 },
          { text: 'Magyar piacra szabott tartalom', value: 4000 }
        ]
      }
    };
    
    // Create the course document
    await db.collection('courses').doc(courseId).set(courseData, { merge: true });
    console.log('✅ Course created/updated:', courseId);
    
    console.log('\n🎉 Course creation complete!');
    console.log(`📍 Course ID: ${courseId}`);
    console.log(`💰 Price: ${courseData.price} ${courseData.currency}`);
    console.log(`💳 Stripe Price ID: ${courseData.stripePriceId}`);
    console.log(`🔗 Product ID: ${courseData.stripeProductId}`);
    
  } catch (error) {
    console.error('❌ Error creating course:', error);
  } finally {
    process.exit(0);
  }
}

createCourseProduction();