// Test script to verify CRM data fetching functionality

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

async function testCRMDataFetch() {
  console.log('🧪 Testing CRM data fetching functionality...\n');
  
  try {
    // Test 1: Get all consultations
    console.log('📋 Test 1: Fetching all consultations');
    const allConsultationsSnapshot = await db.collection('consultations')
      .where('consultationType', '==', 'marketing_sebeszet')
      .orderBy('createdAt', 'desc')
      .get();
    
    console.log(`✅ Found ${allConsultationsSnapshot.size} total consultations`);
    
    // Test 2: Get consultations by status
    const statuses = ['new', 'contacted', 'booked', 'completed', 'cancelled'];
    const statusCounts = {};
    
    for (const status of statuses) {
      const statusSnapshot = await db.collection('consultations')
        .where('consultationType', '==', 'marketing_sebeszet')
        .where('status', '==', status)
        .get();
      
      statusCounts[status] = statusSnapshot.size;
    }
    
    console.log('📊 Test 2: Status breakdown:', statusCounts);
    
    // Test 3: Calculate stats like the CRM would
    const consultations = allConsultationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const stats = {
      total: consultations.length,
      new: statusCounts.new,
      contacted: statusCounts.contacted,
      booked: statusCounts.booked,
      completed: statusCounts.completed,
      cancelled: statusCounts.cancelled,
      conversionRate: consultations.length > 0 ? (statusCounts.completed / consultations.length) * 100 : 0,
      bookingRate: consultations.length > 0 ? ((statusCounts.booked + statusCounts.completed) / consultations.length) * 100 : 0
    };
    
    console.log('📈 Test 3: Calculated CRM stats:');
    console.log(`  - Total consultations: ${stats.total}`);
    console.log(`  - Conversion rate: ${stats.conversionRate.toFixed(1)}%`);
    console.log(`  - Booking rate: ${stats.bookingRate.toFixed(1)}%`);
    
    // Test 4: Show sample consultation data
    console.log('\n👤 Test 4: Sample consultation data:');
    consultations.slice(0, 2).forEach((consultation, index) => {
      console.log(`\n  Consultation ${index + 1}:`);
      console.log(`    - Name: ${consultation.name}`);
      console.log(`    - Email: ${consultation.email}`);
      console.log(`    - Status: ${consultation.status}`);
      console.log(`    - Occupation: ${consultation.occupation}`);
      console.log(`    - UTM Source: ${consultation.utm_source || 'N/A'}`);
      console.log(`    - Admin Notes: ${consultation.adminNotes || 'None'}`);
      console.log(`    - Lead Score: ${consultation.leadScore || 'Not set'}`);
    });
    
    // Test 5: Test filtering functionality
    console.log('\n🔍 Test 5: Filter testing');
    
    // Filter by email (simulating search)
    const searchResults = consultations.filter(c => 
      c.name.toLowerCase().includes('kovács') || 
      c.email.toLowerCase().includes('kovacs')
    );
    console.log(`  - Search results for 'kovács': ${searchResults.length} found`);
    
    // Filter by date range (this week)
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - 7);
    
    const thisWeekConsultations = consultations.filter(c => {
      const createdAt = c.createdAt && c.createdAt.toDate ? c.createdAt.toDate() : new Date(c.createdAt);
      return createdAt >= thisWeekStart;
    });
    console.log(`  - This week's consultations: ${thisWeekConsultations.length}`);
    
    // Test 6: Revenue potential calculation
    const activePipeline = statusCounts.booked + statusCounts.completed;
    const revenuePotential = activePipeline * 150000; // 150k HUF per project
    
    console.log('\n💰 Test 6: Revenue calculations');
    console.log(`  - Active pipeline: ${activePipeline} projects`);
    console.log(`  - Revenue potential: ${(revenuePotential / 1000000).toFixed(1)}M HUF`);
    
    console.log('\n✅ All CRM data fetching tests completed successfully!');
    console.log('🎯 The admin dashboard should display real data from Firebase.');
    
  } catch (error) {
    console.error('❌ Error testing CRM data fetch:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testCRMDataFetch();