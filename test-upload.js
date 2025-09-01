const admin = require('firebase-admin');

// Configure for Firebase emulators
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

// Initialize Firebase Admin SDK for emulator
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927'
  });
}

async function testUploadEndpoint() {
  try {
    console.log('🧪 Testing upload endpoint...');

    // Get the admin user
    const userRecord = await admin.auth().getUser('admin-user-emulator');
    console.log('✅ Found admin user:', userRecord.uid);

    // Create a custom token for the user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    console.log('✅ Created custom token');

    // Convert to ID token (this would normally be done client-side)
    // For testing, we'll make the API call directly with the user ID
    
    // Test the upload URL generation endpoint
    const response = await fetch('http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api/api/storage/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${customToken}`, // This won't work directly, but let's see the error
      },
      body: JSON.stringify({
        fileName: 'test.jpg',
        fileType: 'image/jpeg',
        fileSize: 1000,
        category: 'course',
        purpose: 'thumbnail'
      })
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.text();
    console.log('📡 Response body:', responseData);

    if (response.ok) {
      console.log('🎉 Upload endpoint test successful!');
      const data = JSON.parse(responseData);
      console.log('✅ Received upload data:', data);
    } else {
      console.log('❌ Upload endpoint test failed');
    }

  } catch (error) {
    console.error('💥 Test error:', error);
  }
  
  process.exit(0);
}

testUploadEndpoint();