/**
 * Update AI Copywriting Course data from FeaturedMasterclassSpotlight
 * For EMULATOR use only
 */

const admin = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

if (!admin.apps.length) {
  admin.initializeApp({ projectId: 'elira-landing-ce927' });
}

const db = admin.firestore();
const courseId = 'ai-copywriting-course';

async function updateCourseData() {
  console.log('📝 Updating AI Copywriting Course data...\n');

  const courseData = {
    title: 'Olvass a vevőid gondolataiban',
    slug: 'ai-copywriting-course',
    shortDescription: 'Kutatás-alapú kampányok, konkrét eredmények',
    description: '30 nap múlva minden marketing szöveged konkrét piackutatáson fog alapulni, nem találgatáson. Pontosan tudni fogod, milyen fájdalompontokat kell megszólítanod, milyen nyelvet használj, és hogyan írj ajánlatokat, amik után a vevők jelentkeznek. Működő kampánysablonokkal, amik a te termékedre vannak szabva - nem általános elméletekkel.',

    // Instructor info
    instructorId: 'zoltan-somosi',
    instructorName: 'Somosi Zoltán',
    instructorEmail: 'zoltan@elira.hu',
    instructorBio: 'Marketing Specialista & Doktorandusz',
    instructorPhotoUrl: '/IMG_5730.JPG',

    // Category
    categoryId: 'ai-marketing',
    categoryName: 'AI Marketing',

    // Pricing
    price: 89990,
    currency: 'HUF',
    originalPrice: 89990,
    isFree: false,
    stripePriceId: 'price_1S0MvyHhqyKpFIBMQdiSPodM',

    // Course stats (these will be kept from existing data)
    totalModules: 5,
    totalLessons: 17,
    totalDuration: 3360, // 56 minutes total

    // Learning objectives from FeaturedMasterclassSpotlight
    objectives: [
      'Marketing anyagaid konkrét piackutatáson alapulnak - nem találgatáson vagy érzéseken',
      'Landing oldalaid, email kampányaid és ajánlataid ugyanazt a vevői nyelvet beszélik',
      'Minden kampányodnál pontosan tudod: mit mondj, kinek, milyen sorrendben',
      'Mérhető javulás: több kattintás, több jelentkező, több vásárló - dokumentáltan',
      'Saját piac kutatás kész: tudod pontosan ki a vevőd és mit akar hallani',
      'Működő kampánysablonok a te termékeidre kitöltve - nem üres formák'
    ],

    prerequisites: [
      'Alapvető számítógépes ismeretek',
      'Magyar nyelv magas szintű ismerete',
      'Nyitottság az új technológiák iránt',
      'Vállalkozói vagy marketinges háttér előny'
    ],

    // Settings
    status: 'PUBLISHED',
    published: true,
    visibility: 'PUBLIC',
    language: 'hu',
    difficulty: 'INTERMEDIATE',
    certificateEnabled: true,
    enableDiscussion: true,
    enableQA: true,

    // Media
    thumbnailUrl: '/Cover_Olvass_a_vevőid_gondolataiban-min.png',
    previewVideoUrl: 'https://player.mux.com/tTZjKcQAhn0233X1jBoj4UARa2nEKnEDRarPGZNUJ2Gg',

    // Analytics
    enrollmentCount: 312,
    completionCount: 0,
    averageRating: 4.9,
    totalReviews: 89,
    totalRevenue: 0,

    // Timestamps
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection('courses').doc(courseId).update(courseData);

    console.log('✅ Course updated successfully!');
    console.log(`   Title: ${courseData.title}`);
    console.log(`   Description: ${courseData.shortDescription}`);
    console.log(`   Price: ${courseData.price.toLocaleString('hu-HU')} ${courseData.currency}`);
    console.log(`   Instructor: ${courseData.instructorName}`);
    console.log(`   Total Modules: ${courseData.totalModules}`);
    console.log(`   Total Lessons: ${courseData.totalLessons}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating course:', error);
    process.exit(1);
  }
}

updateCourseData();
