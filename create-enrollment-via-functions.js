// Create missing enrollment document via Firebase Functions API
const https = require('https');

async function createEnrollmentViaAPI() {
  const userId = 's3oUvVBfihRNpZIbNVT9NxrZ5f92';
  const courseId = 'ai-copywriting-course';
  
  console.log('🔧 Creating enrollment via Firebase Functions API...');
  
  const data = JSON.stringify({
    userId,
    courseId,
    courseTitle: 'AI Copywriting Mastery Kurzus',
    status: 'active',
    totalLessons: 12,
    progressPercentage: 0
  });
  
  const options = {
    hostname: 'api-5k33v562ya-ew.a.run.app',
    port: 443,
    path: '/api/enrollments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fake-admin-token'
    }
  };
  
  const req = https.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response status:', res.statusCode);
      console.log('Response:', responseData);
      process.exit(0);
    });
  });
  
  req.on('error', (error) => {
    console.error('Error:', error);
    process.exit(1);
  });
  
  req.write(data);
  req.end();
}

createEnrollmentViaAPI();