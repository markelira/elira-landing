// Script to create test consultation data for Marketing Sebészet CRM testing

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'elira-landing-ce927'
});

const db = admin.firestore();

const testConsultations = [
  {
    name: 'Kovács Péter',
    phone: '+36201234567',
    email: 'kovacs.peter@example.com',
    occupation: 'cegvezetes',
    status: 'new',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'localhost:3001',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'marketing_sebeszet_test',
    referrer: '',
    consultationType: 'marketing_sebeszet',
    duration: 30,
    adminNotes: '',
    followUpActions: [],
    currentChallenges: []
  },
  {
    name: 'Nagy Anna',
    phone: '+36309876543',
    email: 'nagy.anna@company.hu',
    occupation: 'marketing',
    status: 'contacted',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'localhost:3001',
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: 'marketing_sebeszet_test',
    referrer: '',
    consultationType: 'marketing_sebeszet',
    duration: 30,
    adminNotes: 'Telefonon beszéltünk, érdekes projekt.',
    followUpActions: ['Email küldés árajánlattal'],
    currentChallenges: ['Alacsony konverzió', 'Drága hirdetés']
  },
  {
    name: 'Szabó Gábor',
    phone: '+36705551234',
    email: 'szabo.gabor@startup.com',
    occupation: 'ertekesites',
    status: 'booked',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    bookingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    source: 'localhost:3001',
    utm_source: 'direct',
    utm_medium: 'none',
    utm_campaign: 'marketing_sebeszet_test',
    referrer: '',
    consultationType: 'marketing_sebeszet',
    duration: 30,
    meetingLink: 'https://zoom.us/j/123456789',
    calendarEventId: 'minup_123456',
    adminNotes: 'Konzultáció pénteken 14:00-kor.',
    followUpActions: ['Zoom link küldés', 'Előkészítő anyag'],
    currentChallenges: ['Lead generálás', 'Értékesítési folyamat'],
    businessName: 'StartupXY Kft.',
    businessIndustry: 'Technológia',
    monthlyRevenue: '10k-50k'
  },
  {
    name: 'Tóth Eszter',
    phone: '+36208887777',
    email: 'toth.eszter@consulting.hu',
    occupation: 'hr',
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    bookingDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    source: 'localhost:3001',
    utm_source: 'linkedin',
    utm_medium: 'social',
    utm_campaign: 'marketing_sebeszet_test',
    referrer: 'https://linkedin.com',
    consultationType: 'marketing_sebeszet',
    duration: 30,
    adminNotes: 'Sikeres konzultáció, érdekelt a full service csomag.',
    followUpActions: ['Ajánlat küldés', 'Follow-up hívás'],
    currentChallenges: ['HR brand building', 'Toborzás optimalizálás'],
    businessName: 'HR Solutions Bt.',
    businessIndustry: 'Humán erőforrás',
    monthlyRevenue: '50k-100k',
    consultationOutcome: 'completed',
    leadScore: 9,
    conversionPotential: 'high',
    nextSteps: 'Ajánlat elkészítése teljes marketing csomagra'
  },
  {
    name: 'Kiss Zoltán',
    phone: '+36303334444',
    email: 'kiss.zoltan@ecommerce.hu',
    occupation: 'cegvezetes',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'localhost:3001',
    utm_source: 'google',
    utm_medium: 'organic',
    utm_campaign: 'marketing_sebeszet_test',
    referrer: 'https://google.com',
    consultationType: 'marketing_sebeszet',
    duration: 30,
    adminNotes: 'Lemondta a konzultációt, nem érkezett el.',
    followUpActions: [],
    currentChallenges: [],
    businessName: 'E-commerce Pro Kft.',
    businessIndustry: 'E-kereskedelem',
    consultationOutcome: 'no_show',
    leadScore: 3,
    conversionPotential: 'low'
  }
];

async function createTestConsultations() {
  console.log('🎯 Creating test consultations for Marketing Sebészet CRM...');
  
  try {
    const batch = db.batch();
    
    testConsultations.forEach((consultation, index) => {
      const docId = `test_consultation_${Date.now()}_${index}`;
      const consultationRef = db.collection('consultations').doc(docId);
      batch.set(consultationRef, consultation);
    });
    
    await batch.commit();
    
    console.log(`✅ Successfully created ${testConsultations.length} test consultations`);
    
    // Verify the data
    const snapshot = await db.collection('consultations')
      .where('consultationType', '==', 'marketing_sebeszet')
      .get();
    
    console.log(`📊 Total consultations in database: ${snapshot.size}`);
    
    // Show breakdown by status
    const statusCount = {};
    snapshot.docs.forEach(doc => {
      const status = doc.data().status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    console.log('📈 Status breakdown:', statusCount);
    
  } catch (error) {
    console.error('❌ Error creating test consultations:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createTestConsultations();