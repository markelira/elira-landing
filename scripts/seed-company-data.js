/**
 * Seed Company Admin Dashboard Test Data
 *
 * This script creates:
 * - 1 test company
 * - 1 company admin (owner)
 * - 5 test employees
 * - 1 test masterclass with 10 seats
 *
 * Usage:
 *   FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seed-company-data.js
 */

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

// Set emulator environment variables
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'elira-landing-ce927',
  });
}

const db = admin.firestore();
const auth = getAuth();

// Helper to create a random invite token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function seedCompanyData() {
  console.log('🌱 Starting Company Admin Dashboard seed...\n');

  try {
    // Step 1: Create a test user for company owner
    console.log('👤 Creating test company owner...');

    let ownerUser;
    try {
      ownerUser = await auth.getUserByEmail('company-owner@test.com');
      console.log('   ✅ User already exists:', ownerUser.uid);
    } catch (error) {
      ownerUser = await auth.createUser({
        email: 'company-owner@test.com',
        password: 'test123456',
        displayName: 'Test Company Owner',
      });
      console.log('   ✅ Created user:', ownerUser.uid);
    }

    // Step 2: Create test company
    console.log('\n🏢 Creating test company...');

    const companyId = 'test-company-' + Date.now();
    const companyData = {
      name: 'Test Vállalat Kft.',
      slug: 'test-vallalat-kft',
      billingEmail: 'billing@test.com',
      plan: 'trial',
      status: 'active',
      trialEndsAt: admin.firestore.Timestamp.fromDate(addDays(new Date(), 14)),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: ownerUser.uid,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('companies').doc(companyId).set(companyData);
    console.log('   ✅ Created company:', companyId);

    // Step 3: Create company admin
    console.log('\n👨‍💼 Creating company admin...');

    const adminData = {
      userId: ownerUser.uid,
      companyId: companyId,
      email: ownerUser.email,
      name: ownerUser.displayName,
      role: 'owner',
      permissions: {
        canManageEmployees: true,
        canViewReports: true,
      },
      status: 'active',
      addedBy: ownerUser.uid,
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db
      .collection('companies')
      .doc(companyId)
      .collection('admins')
      .doc(ownerUser.uid)
      .set(adminData);

    // Set custom claims for company admin
    await auth.setCustomUserClaims(ownerUser.uid, {
      role: 'COMPANY_ADMIN',
      companyId: companyId,
      companyRole: 'owner',
    });

    console.log('   ✅ Created admin for user:', ownerUser.uid);

    // Step 4: Create test employees
    console.log('\n👥 Creating test employees...');

    const employees = [
      { firstName: 'János', lastName: 'Kovács', email: 'janos.kovacs@test.com', jobTitle: 'Marketing Manager' },
      { firstName: 'Anna', lastName: 'Nagy', email: 'anna.nagy@test.com', jobTitle: 'Sales Director' },
      { firstName: 'Péter', lastName: 'Szabó', email: 'peter.szabo@test.com', jobTitle: 'Content Writer' },
      { firstName: 'Éva', lastName: 'Tóth', email: 'eva.toth@test.com', jobTitle: 'Social Media Manager' },
      { firstName: 'László', lastName: 'Kiss', email: 'laszlo.kiss@test.com', jobTitle: 'Marketing Coordinator' },
    ];

    const employeeIds = [];

    for (const emp of employees) {
      const inviteToken = generateToken();
      const employeeData = {
        companyId: companyId,
        email: emp.email,
        firstName: emp.firstName,
        lastName: emp.lastName,
        fullName: `${emp.firstName} ${emp.lastName}`,
        jobTitle: emp.jobTitle,
        status: 'invited',
        inviteToken: inviteToken,
        inviteExpiresAt: admin.firestore.Timestamp.fromDate(addDays(new Date(), 7)),
        enrolledMasterclasses: [],
        addedBy: ownerUser.uid,
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const employeeRef = await db
        .collection('companies')
        .doc(companyId)
        .collection('employees')
        .add(employeeData);

      employeeIds.push(employeeRef.id);
      console.log(`   ✅ Created employee: ${emp.firstName} ${emp.lastName} (${employeeRef.id})`);
    }

    // Step 5: Accept invites for first 3 employees
    console.log('\n✉️  Accepting invites for first 3 employees...');

    for (let i = 0; i < 3; i++) {
      const emp = employees[i];

      // Create Firebase Auth user
      let empUser;
      try {
        empUser = await auth.getUserByEmail(emp.email);
      } catch (error) {
        empUser = await auth.createUser({
          email: emp.email,
          password: 'test123456',
          displayName: `${emp.firstName} ${emp.lastName}`,
        });
      }

      // Update employee status
      await db
        .collection('companies')
        .doc(companyId)
        .collection('employees')
        .doc(employeeIds[i])
        .update({
          status: 'active',
          userId: empUser.uid,
          inviteAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log(`   ✅ Accepted invite for: ${emp.firstName} ${emp.lastName}`);
    }

    // Step 6: Create test masterclass
    console.log('\n📚 Creating test masterclass...');

    const masterclassData = {
      companyId: companyId,
      masterclassId: 'ai-copywriting-masterclass',
      title: 'AI-Powered Copywriting Masterclass',
      duration: 8,
      seats: {
        purchased: 10,
        used: 0,
        available: 10,
      },
      pricePerSeat: 89990,
      totalPaid: 899900,
      paymentStatus: 'manual',
      startDate: admin.firestore.Timestamp.fromDate(new Date()),
      endDate: admin.firestore.Timestamp.fromDate(addDays(new Date(), 56)), // 8 weeks
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: ownerUser.uid,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const masterclassRef = await db
      .collection('companies')
      .doc(companyId)
      .collection('masterclasses')
      .add(masterclassData);

    console.log('   ✅ Created masterclass:', masterclassRef.id);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ SEED COMPLETE!\n');
    console.log('📋 Summary:');
    console.log(`   Company ID: ${companyId}`);
    console.log(`   Owner Email: company-owner@test.com`);
    console.log(`   Owner Password: test123456`);
    console.log(`   Total Employees: ${employees.length} (3 active, 2 invited)`);
    console.log(`   Masterclass ID: ${masterclassRef.id}`);
    console.log(`   Seats Available: 10`);
    console.log('\n🔗 Quick Links:');
    console.log('   Login: http://localhost:3000/auth');
    console.log('   Dashboard: http://localhost:3000/company/dashboard');
    console.log('   Employees: http://localhost:3000/company/dashboard/employees');
    console.log('   Masterclasses: http://localhost:3000/company/dashboard/masterclasses');
    console.log('\n💡 Next Steps:');
    console.log('   1. Login with: company-owner@test.com / test123456');
    console.log('   2. Visit the dashboard to see your company');
    console.log('   3. Try assigning employees to the masterclass');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Error seeding data:', error);
    throw error;
  }
}

// Run the seed function
seedCompanyData()
  .then(() => {
    console.log('✨ Seed script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seed script failed:', error);
    process.exit(1);
  });
