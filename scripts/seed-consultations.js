/**
 * Script to seed consultation data into Firestore
 *
 * Usage: node scripts/seed-consultations.js <userId>
 *
 * This creates a sample consultation for the specified user
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../elira-landing-ce927-firebase-adminsdk-fbsvc-9e1935180c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();

// Get userId from command line args
const userId = process.argv[2];

if (!userId) {
  console.error('❌ Error: Please provide a userId as an argument');
  console.log('Usage: node scripts/seed-consultations.js <userId>');
  process.exit(1);
}

async function seedConsultation() {
  console.log(`🌱 Creating consultation for user: ${userId}`);

  const consultationRef = db.collection('consultations').doc();

  // Schedule consultation for 3 days from now at 10 AM
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + 3);
  scheduledDate.setHours(10, 0, 0, 0);

  const consultation = {
    consultationId: consultationRef.id,
    courseId: 'ai-copywriting-course',
    userId: userId,
    instructorId: 'instructor-zoli',
    instructorName: 'Zoli',
    scheduledAt: admin.firestore.Timestamp.fromDate(scheduledDate),
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    meetingPlatform: 'google_meet',
    prepTasks: [
      {
        taskId: '1',
        title: 'Nézd meg a 1-3. videókat a masterclass-ban',
        description: 'A konzultáció előtt fontos, hogy megismerkedj az alapokkal',
        completed: false,
        completedAt: null,
      },
      {
        taskId: '2',
        title: 'Töltsd ki a buyer persona sablont',
        description: 'Legalább egy buyer persona elkészítése a konzultáció előtt',
        completed: false,
        completedAt: null,
      },
      {
        taskId: '3',
        title: 'Küldd be kérdéseidet 24 órával előtte',
        description: 'Így tudjuk hatékonyan kihasználni a konzultációs időt',
        completed: false,
        completedAt: null,
      },
    ],
    notes: null,
    attendanceStatus: 'pending',
    remindersSent: {
      '24h': false,
      '1h': false,
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await consultationRef.set(consultation);

  console.log(`✅ Consultation created successfully!`);
  console.log(`   ID: ${consultationRef.id}`);
  console.log(`   Scheduled: ${scheduledDate.toLocaleString('hu-HU')}`);
  console.log(`   Meeting: ${consultation.meetingLink}`);

  // Also create a notification
  const notificationRef = db
    .collection('notifications')
    .doc(userId)
    .collection('items')
    .doc();

  const notification = {
    notificationId: notificationRef.id,
    userId: userId,
    type: 'consultation',
    title: 'Konzultáció ütemezve',
    message: `A következő konzultációd ${scheduledDate.toLocaleDateString('hu-HU')} ${scheduledDate.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}-kor lesz.`,
    priority: 'high',
    actionUrl: '/dashboard',
    actionLabel: 'Részletek megtekintése',
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    metadata: {
      consultationId: consultationRef.id,
      scheduledAt: admin.firestore.Timestamp.fromDate(scheduledDate),
    },
  };

  await notificationRef.set(notification);

  console.log(`✅ Notification created successfully!`);

  process.exit(0);
}

// Run seeding
seedConsultation().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
