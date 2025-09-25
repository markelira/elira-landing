// Simple test to verify Firebase data without complex indexes

const admin = require('firebase-admin');

// Check if already initialized
if (!admin.apps.length) {
  const serviceAccount = require('../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'elira-landing-ce927'
  });
}

const db = admin.firestore();

async function testSimpleFetch() {
  console.log('🧪 Testing simple data fetching...\n');
  
  try {
    // Test 1: Get all documents from consultations collection (no complex query)
    console.log('📋 Test 1: Fetching all consultations (simple query)');
    const allConsultationsSnapshot = await db.collection('consultations').get();
    
    console.log(`✅ Found ${allConsultationsSnapshot.size} total consultations in database`);
    
    if (allConsultationsSnapshot.size > 0) {
      console.log('\n👤 Sample consultation data:');
      
      allConsultationsSnapshot.docs.slice(0, 3).forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n  Consultation ${index + 1} (ID: ${doc.id}):`);
        console.log(`    - Name: ${data.name}`);
        console.log(`    - Email: ${data.email}`);
        console.log(`    - Status: ${data.status}`);
        console.log(`    - Occupation: ${data.occupation}`);
        console.log(`    - Type: ${data.consultationType}`);
        console.log(`    - Created: ${data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : 'Server timestamp') : 'Unknown'}`);
        console.log(`    - UTM Source: ${data.utm_source || 'N/A'}`);
        console.log(`    - Notes: ${data.adminNotes || 'None'}`);
      });
      
      // Count by status manually
      const consultations = allConsultationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const statusCount = {};
      consultations.forEach(c => {
        if (c.consultationType === 'marketing_sebeszet') {
          statusCount[c.status] = (statusCount[c.status] || 0) + 1;
        }
      });
      
      console.log('\n📊 Marketing Sebészet consultations by status:', statusCount);
      
      const marketingConsultations = consultations.filter(c => c.consultationType === 'marketing_sebeszet');
      const stats = {
        total: marketingConsultations.length,
        ...statusCount,
        conversionRate: marketingConsultations.length > 0 ? ((statusCount.completed || 0) / marketingConsultations.length) * 100 : 0,
        bookingRate: marketingConsultations.length > 0 ? (((statusCount.booked || 0) + (statusCount.completed || 0)) / marketingConsultations.length) * 100 : 0
      };
      
      console.log('\n📈 CRM Dashboard Stats:');
      console.log(`  - Total Marketing Sebészet consultations: ${stats.total}`);
      console.log(`  - New: ${stats.new || 0}`);
      console.log(`  - Contacted: ${stats.contacted || 0}`);  
      console.log(`  - Booked: ${stats.booked || 0}`);
      console.log(`  - Completed: ${stats.completed || 0}`);
      console.log(`  - Cancelled: ${stats.cancelled || 0}`);
      console.log(`  - Conversion rate: ${stats.conversionRate.toFixed(1)}%`);
      console.log(`  - Booking rate: ${stats.bookingRate.toFixed(1)}%`);
      
      console.log('\n✅ Real data is successfully stored in Firebase!');
      console.log('🎯 The CRM will fetch this real data once indexes are created.');
      
    } else {
      console.log('⚠️ No consultations found in database');
    }
    
  } catch (error) {
    console.error('❌ Error testing simple fetch:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testSimpleFetch();