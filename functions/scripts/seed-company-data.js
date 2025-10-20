/**
 * Seed Company Data Script
 * Creates test data for Company Admin Dashboard MVP
 *
 * Usage:
 * - With Firebase Emulator: FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seed-company-data.js
 * - With Production (CAREFUL!): node scripts/seed-company-data.js --production
 */

const admin = require('firebase-admin');
const crypto = require('crypto');

// Check environment first
const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
const isProduction = process.argv.includes('--production');

// Initialize Firebase Admin
if (!admin.apps.length) {
  if (emulatorHost) {
    // Running against emulator - no credentials needed
    admin.initializeApp({
      projectId: 'elira-landing-ce927',
    });
  } else {
    // Running against production - use default credentials
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
}

const db = admin.firestore();

if (isProduction && !emulatorHost) {
  console.error('⚠️  WARNING: You are about to seed data to PRODUCTION!');
  console.error('⚠️  This script should only be run against the emulator.');
  console.error('⚠️  Use FIRESTORE_EMULATOR_HOST=localhost:8080 to run against emulator.');
  console.error('⚠️  To force production, use --production flag (NOT RECOMMENDED).');
  process.exit(1);
}

if (emulatorHost) {
  console.log(`✅ Running against Firebase Emulator: ${emulatorHost}`);
} else {
  console.log('⚠️  Running against PRODUCTION (use emulator for testing!)');
}

/**
 * Seed Data Configuration
 */
const SEED_DATA = {
  company: {
    name: 'Test Company Kft.',
    billingEmail: 'billing@testcompany.hu',
  },
  owner: {
    userId: 'test-owner-001',
    email: 'owner@testcompany.hu',
    name: 'János Kovács',
  },
  employees: [
    {
      email: 'nagy.eva@testcompany.hu',
      firstName: 'Éva',
      lastName: 'Nagy',
      jobTitle: 'Marketing Manager',
      status: 'invited', // Not accepted yet
    },
    {
      email: 'toth.peter@testcompany.hu',
      firstName: 'Péter',
      lastName: 'Tóth',
      jobTitle: 'Sales Representative',
      status: 'active', // Already accepted
      userId: 'test-employee-002',
    },
    {
      email: 'horvath.anna@testcompany.hu',
      firstName: 'Anna',
      lastName: 'Horváth',
      jobTitle: 'Content Creator',
      status: 'active',
      userId: 'test-employee-003',
    },
    {
      email: 'szabo.istvan@testcompany.hu',
      firstName: 'István',
      lastName: 'Szabó',
      jobTitle: 'Business Development',
      status: 'invited',
    },
    {
      email: 'kiss.katalin@testcompany.hu',
      firstName: 'Katalin',
      lastName: 'Kiss',
      jobTitle: 'Marketing Coordinator',
      status: 'active',
      userId: 'test-employee-005',
    },
    {
      email: 'varga.gabor@testcompany.hu',
      firstName: 'Gábor',
      lastName: 'Varga',
      jobTitle: 'Sales Manager',
      status: 'active',
      userId: 'test-employee-006',
    },
    {
      email: 'molnar.zsuzsanna@testcompany.hu',
      firstName: 'Zsuzsanna',
      lastName: 'Molnár',
      jobTitle: 'Digital Marketing Specialist',
      status: 'invited',
    },
    {
      email: 'nemeth.laszlo@testcompany.hu',
      firstName: 'László',
      lastName: 'Németh',
      jobTitle: 'Account Executive',
      status: 'active',
      userId: 'test-employee-008',
    },
    {
      email: 'farkas.eszter@testcompany.hu',
      firstName: 'Eszter',
      lastName: 'Farkas',
      jobTitle: 'Content Writer',
      status: 'active',
      userId: 'test-employee-009',
    },
    {
      email: 'balogh.tamas@testcompany.hu',
      firstName: 'Tamás',
      lastName: 'Balogh',
      jobTitle: 'Marketing Analyst',
      status: 'invited',
    },
  ],
  masterclass: {
    masterclassId: 'ai-copywriting-masterclass', // Reference to existing masterclass
    totalSeats: 15,
    usedSeats: 0,
  },
};

/**
 * Generate company slug
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Main seed function
 */
async function seedCompanyData() {
  console.log('\n🌱 Starting seed data creation...\n');

  try {
    // 1. Create Company
    console.log('📦 Creating company...');
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const companyData = {
      name: SEED_DATA.company.name,
      slug: generateSlug(SEED_DATA.company.name),
      billingEmail: SEED_DATA.company.billingEmail,
      plan: 'trial',
      status: 'active',
      trialEndsAt: admin.firestore.Timestamp.fromDate(trialEndsAt),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: SEED_DATA.owner.userId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const companyRef = await db.collection('companies').add(companyData);
    const companyId = companyRef.id;
    console.log(`✅ Company created with ID: ${companyId}`);

    // 2. Create Owner Admin
    console.log('\n👤 Creating owner admin...');
    const ownerData = {
      userId: SEED_DATA.owner.userId,
      companyId,
      email: SEED_DATA.owner.email,
      name: SEED_DATA.owner.name,
      role: 'owner',
      permissions: {
        canManageEmployees: true,
        canManageBilling: true,
        canViewReports: true,
      },
      status: 'active',
      addedBy: SEED_DATA.owner.userId,
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db
      .collection('companies')
      .doc(companyId)
      .collection('admins')
      .doc(SEED_DATA.owner.userId)
      .set(ownerData);

    console.log(`✅ Owner admin created: ${SEED_DATA.owner.name}`);

    // 3. Create Employees
    console.log(`\n👥 Creating ${SEED_DATA.employees.length} employees...\n`);
    const employeeIds = [];

    for (const emp of SEED_DATA.employees) {
      const inviteToken =
        emp.status === 'invited' ? crypto.randomBytes(32).toString('hex') : undefined;
      const inviteExpiresAt =
        emp.status === 'invited'
          ? (() => {
              const expiresAt = new Date();
              expiresAt.setDate(expiresAt.getDate() + 7);
              return admin.firestore.Timestamp.fromDate(expiresAt);
            })()
          : undefined;

      const employeeData = {
        userId: emp.userId,
        companyId,
        email: emp.email.toLowerCase(),
        firstName: emp.firstName,
        lastName: emp.lastName,
        fullName: `${emp.firstName} ${emp.lastName}`,
        jobTitle: emp.jobTitle,
        status: emp.status,
        inviteToken,
        inviteExpiresAt,
        enrolledMasterclasses: [],
        addedBy: SEED_DATA.owner.userId,
        addedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Remove undefined fields
      Object.keys(employeeData).forEach((key) =>
        employeeData[key] === undefined ? delete employeeData[key] : {}
      );

      const employeeRef = await db
        .collection('companies')
        .doc(companyId)
        .collection('employees')
        .add(employeeData);

      employeeIds.push(employeeRef.id);

      const statusEmoji = emp.status === 'active' ? '✅' : '📧';
      console.log(
        `${statusEmoji} ${emp.firstName} ${emp.lastName} (${emp.status}${
          inviteToken ? `, token: ${inviteToken.substring(0, 8)}...` : ''
        })`
      );
    }

    // 4. Create Company Masterclass
    console.log('\n📚 Creating masterclass assignment...');
    const masterclassData = {
      companyId,
      masterclassId: SEED_DATA.masterclass.masterclassId,
      title: 'AI Copywriting Masterclass', // This should match the actual masterclass
      seats: {
        total: SEED_DATA.masterclass.totalSeats,
        used: SEED_DATA.masterclass.usedSeats,
        available:
          SEED_DATA.masterclass.totalSeats - SEED_DATA.masterclass.usedSeats,
      },
      purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
      purchasedBy: SEED_DATA.owner.userId,
      expiresAt: null, // No expiration for MVP
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const masterclassRef = await db
      .collection('companies')
      .doc(companyId)
      .collection('masterclasses')
      .add(masterclassData);

    console.log(
      `✅ Masterclass created with ID: ${masterclassRef.id} (${SEED_DATA.masterclass.totalSeats} seats available)`
    );

    // 5. Create User Progress for Active Employees (simulate some enrolled)
    console.log('\n📊 Creating user progress for active employees...\n');
    const activeEmployees = SEED_DATA.employees.filter(
      (emp) => emp.status === 'active' && emp.userId
    );

    // Enroll first 3 active employees
    for (let i = 0; i < Math.min(3, activeEmployees.length); i++) {
      const emp = activeEmployees[i];
      const progressId = `${emp.userId}_${SEED_DATA.masterclass.masterclassId}`;

      const progressData = {
        userId: emp.userId,
        masterclassId: SEED_DATA.masterclass.masterclassId,
        isCompanySponsored: true,
        companyId: companyId,
        companyMasterclassId: masterclassRef.id,
        currentModule: Math.floor(Math.random() * 3) + 1, // Random progress 1-3
        overallProgress: Math.floor(Math.random() * 40) + 10, // Random 10-50%
        lastActivityDate: admin.firestore.FieldValue.serverTimestamp(),
        totalTimeSpent: Math.floor(Math.random() * 300) + 60, // Random 60-360 minutes
        computedStatus: ['on_track', 'ahead', 'behind'][Math.floor(Math.random() * 3)],
        enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        certificateIssued: false,
      };

      await db.collection('userProgress').doc(progressId).set(progressData);

      // Update employee enrollment
      await db
        .collection('companies')
        .doc(companyId)
        .collection('employees')
        .doc(employeeIds[SEED_DATA.employees.indexOf(emp)])
        .update({
          enrolledMasterclasses: admin.firestore.FieldValue.arrayUnion({
            masterclassId: masterclassRef.id,
            enrolledAt: new Date().toISOString(), // Use ISO string instead of serverTimestamp in array
          }),
        });

      console.log(
        `✅ ${emp.firstName} ${emp.lastName} enrolled (${progressData.overallProgress}% progress)`
      );
    }

    // Update seat count
    await db
      .collection('companies')
      .doc(companyId)
      .collection('masterclasses')
      .doc(masterclassRef.id)
      .update({
        'seats.used': Math.min(3, activeEmployees.length),
        'seats.available':
          SEED_DATA.masterclass.totalSeats - Math.min(3, activeEmployees.length),
      });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 SEED DATA CREATION COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n📦 Company ID: ${companyId}`);
    console.log(`📦 Company Slug: ${companyData.slug}`);
    console.log(`👤 Owner: ${SEED_DATA.owner.name} (${SEED_DATA.owner.email})`);
    console.log(`👥 Employees: ${SEED_DATA.employees.length} created`);
    console.log(
      `   - Active: ${SEED_DATA.employees.filter((e) => e.status === 'active').length}`
    );
    console.log(
      `   - Invited: ${SEED_DATA.employees.filter((e) => e.status === 'invited').length}`
    );
    console.log(`📚 Masterclass: ${SEED_DATA.masterclass.masterclassId}`);
    console.log(`   - Total Seats: ${SEED_DATA.masterclass.totalSeats}`);
    console.log(`   - Used Seats: ${Math.min(3, activeEmployees.length)}`);
    console.log(
      `   - Available Seats: ${SEED_DATA.masterclass.totalSeats - Math.min(3, activeEmployees.length)}`
    );
    console.log(`📊 Enrolled Employees: ${Math.min(3, activeEmployees.length)}`);
    console.log('\n✅ You can now test the Company Admin Dashboard!\n');
  } catch (error) {
    console.error('\n❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedCompanyData()
  .then(() => {
    console.log('✅ Seed script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  });
