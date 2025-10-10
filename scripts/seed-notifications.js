/**
 * Script to seed notification data into Firestore
 *
 * Usage: node scripts/seed-notifications.js <userId>
 *
 * This creates sample notifications for testing the notification system
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
  console.log('Usage: node scripts/seed-notifications.js <userId>');
  process.exit(1);
}

async function seedNotifications() {
  console.log(`🌱 Creating notifications for user: ${userId}`);

  const now = admin.firestore.Timestamp.now();
  const yesterday = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );
  const twoDaysAgo = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  );

  // Sample notifications of different types
  const notifications = [
    {
      userId,
      type: 'consultation_reminder',
      title: 'Előttünk áll a konzultáció',
      message: 'A Marketing Sebészet konzultációd holnap 10:00-kor kezdődik. Készülj fel a megbeszélt témákra!',
      priority: 'high',
      read: false,
      actionUrl: '/dashboard',
      actionText: 'Részletek megtekintése',
      metadata: {
        consultationId: 'sample-consultation-1',
      },
      createdAt: now,
    },
    {
      userId,
      type: 'new_module',
      title: 'Új modul elérhető',
      message: 'A Marketing Sebészet program következő modulja már elérhető számodra: "Buyer Persona Kutatás"',
      priority: 'medium',
      read: false,
      actionUrl: '/courses/ai-copywriting-course/learn',
      actionText: 'Modul megnyitása',
      metadata: {
        courseId: 'ai-copywriting-course',
        moduleId: 'module-2',
      },
      createdAt: yesterday,
    },
    {
      userId,
      type: 'achievement',
      title: 'Teljesítmény feloldva!',
      message: 'Gratulálunk! Elérted a "7 napos sztrík" teljesítményt.',
      priority: 'medium',
      read: false,
      actionUrl: '/dashboard',
      actionText: 'Teljesítmények megtekintése',
      metadata: {
        achievementId: 'week-streak',
        tier: 'bronze',
      },
      createdAt: twoDaysAgo,
    },
    {
      userId,
      type: 'instructor_message',
      title: 'Üzenet Zolitól',
      message: 'Nagyszerű munkát végeztél az első héten! Folytatásként érdemes elolvasni a következő héten...',
      priority: 'medium',
      read: true,
      readAt: yesterday,
      actionUrl: '/dashboard',
      actionText: 'Üzenet elolvasása',
      metadata: {
        instructorId: 'instructor-zoli',
      },
      createdAt: twoDaysAgo,
    },
    {
      userId,
      type: 'system',
      title: 'Rendszer frissítés',
      message: 'Az Elira platformon új funkciók érhetők el: heti összefoglalók és teljesítményrendszer.',
      priority: 'low',
      read: true,
      readAt: twoDaysAgo,
      metadata: {},
      createdAt: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      ),
    },
  ];

  try {
    // Create notifications in subcollection
    const batch = db.batch();

    for (const notification of notifications) {
      const notificationRef = db
        .collection('notifications')
        .doc(userId)
        .collection('items')
        .doc();

      batch.set(notificationRef, {
        ...notification,
        notificationId: notificationRef.id,
      });
    }

    await batch.commit();

    console.log('✅ Successfully created notifications:');
    console.log(`   - ${notifications.length} notifications seeded`);
    console.log(`   - ${notifications.filter(n => !n.read).length} unread`);
    console.log(`   - ${notifications.filter(n => n.read).length} read`);
    console.log('');
    console.log('📋 Notification types:');
    notifications.forEach((n, i) => {
      console.log(`   ${i + 1}. [${n.type}] ${n.title} ${n.read ? '(read)' : '(unread)'}`);
    });
    console.log('');
    console.log('🔔 Visit http://localhost:3001/dashboard to see notifications');

  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
    throw error;
  }
}

// Run the seed function
seedNotifications()
  .then(() => {
    console.log('✅ Notification seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
