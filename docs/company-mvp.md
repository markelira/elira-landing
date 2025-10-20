# 🏗️ COMPANY ADMIN DASHBOARD - MVP DEVELOPMENT PLAN

> **Status:** Ready to Build with Critical Revisions
> **Confidence:** 82% | **Timeline:** 6 weeks MVP | **Team:** 1 Full-Stack Dev
> **Last Updated:** 2025-01-19

---

## 🎯 EXECUTIVE SUMMARY

### MVP Strategy: Launch in 6 Weeks

This is a **simplified, production-ready MVP** that focuses on core value delivery while cutting non-essential features. We can onboard first 10-20 companies, validate product-market fit, then iterate.

**What's IN the MVP:**
- ✅ Company registration (manual billing, no Stripe)
- ✅ Employee invitation & acceptance
- ✅ Manual seat assignment (admin enters seat count)
- ✅ Basic progress dashboard (tables only, no fancy charts)
- ✅ CSV export (instead of PDF reports)
- ✅ Manual email reminders (click button to send)

**What's OUT (Add Later):**
- ❌ Automated Stripe checkout (use manual invoicing for MVP)
- ❌ Automated cron jobs (use manual refresh button)
- ❌ Fancy charts (just tables with progress bars)
- ❌ PDF reports (CSV only)
- ❌ Styled email templates (plain text emails)
- ❌ At-risk auto-detection (manual review)

### Critical Fixes Required Before Building

**🔴 MUST FIX (Blocking - 2 days):**

1. **Add Firestore Transaction to Seat Allocation** (2 hours)
   - Problem: Race condition can oversell seats
   - Impact: Revenue loss, angry customers

2. **Add Webhook Idempotency Check** (4 hours)
   - Problem: Duplicate Stripe events cause double-charging
   - Impact: Financial loss (when we add Stripe post-MVP)

3. **Fix Permission Escalation** (2 hours)
   - Problem: Admin can make themselves owner
   - Impact: Security breach

4. **Add Rate Limiting (Firebase App Check)** (4 hours)
   - Problem: DDoS, cost explosion
   - Impact: Service outage, huge bills

5. **Create Firestore Composite Indexes** (4 hours)
   - Problem: Queries will fail in production
   - Impact: Dashboard broken

**🟡 SHOULD FIX (Important - 3 days):**

6. Change dashboard refresh to 5 minutes (from 30 seconds)
7. Add pagination to employee list
8. Implement basic caching strategy
9. Set up CI/CD pipeline

**Total Pre-Work: 5 days before coding**

---

## 📐 TECH STACK (MVP)

```yaml
Frontend:
  Framework: Next.js 14 (App Router)
  Language: TypeScript (strict mode)
  UI: Tailwind CSS + shadcn/ui
  State: React Context + SWR (5-minute cache)
  Forms: React Hook Form + Zod validation
  Charts: NONE (MVP uses tables only)

Backend:
  Platform: Firebase (Firestore + Cloud Functions + Auth)
  Runtime: Node.js 20
  Language: TypeScript

Email:
  Service: SendGrid (free tier - 100 emails/day)
  Templates: Plain text (no fancy HTML)

Payments:
  MVP: Manual invoicing (add Stripe in v2)

File Storage:
  Firebase Storage (for CSV exports)
```

### Why Firebase for MVP?

- ✅ **Zero DevOps** - No servers to manage
- ✅ **Fast Development** - 6 weeks vs 10+ weeks
- ✅ **Auto-Scaling** - Handles 10 or 10,000 users
- ✅ **Real-Time** - Dashboard updates automatically
- ✅ **Free Tier** - $0 for first 10-20 companies

**Estimated Costs:**
- 10 companies: $6/month
- 50 companies: $30/month
- 100 companies: $90/month

**Migration Path:** After 500 companies or $500/month costs, evaluate PostgreSQL migration.

---

## 📊 DATABASE SCHEMA (MVP - SIMPLIFIED)

### Core Collections

```typescript
// ============================================
// COLLECTION: companies
// ============================================
interface Company {
  id: string;
  name: string;
  slug: string; // URL-friendly
  billingEmail: string;

  // MVP: Skip these fields
  // industry, size, website, logo, billingAddress, taxId

  plan: 'trial'; // MVP only supports trial
  status: 'active' | 'suspended';
  trialEndsAt: Date; // 14 days

  // Stripe fields (for post-MVP)
  stripeCustomerId?: string;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}

// ============================================
// SUBCOLLECTION: companies/{id}/admins
// ============================================
interface CompanyAdmin {
  userId: string;
  companyId: string;
  email: string;
  name: string;

  role: 'owner' | 'admin'; // MVP: Only 2 roles
  permissions: {
    canManageEmployees: boolean;
    canViewReports: boolean;
    // MVP: Skip purchase/billing permissions
  };

  status: 'active' | 'invited';
  inviteToken?: string;
  inviteExpiresAt?: Date;

  addedBy: string;
  addedAt: Date;
}

// ============================================
// SUBCOLLECTION: companies/{id}/employees
// ============================================
interface CompanyEmployee {
  id: string;
  userId?: string; // null until they accept
  companyId: string;

  email: string;
  firstName: string;
  lastName: string;
  fullName: string;

  jobTitle?: string; // Optional

  status: 'invited' | 'active' | 'left';
  inviteToken?: string;
  inviteExpiresAt?: Date;

  // MVP: Simple enrollment tracking
  enrolledMasterclasses: {
    masterclassId: string;
    enrolledAt: Date;
  }[];

  addedBy: string;
  addedAt: Date;
}

// ============================================
// SUBCOLLECTION: companies/{id}/masterclasses
// ============================================
interface CompanyMasterclass {
  id: string;
  companyId: string;
  masterclassId: string; // Reference to global masterclass

  title: string; // Denormalized
  duration: number; // weeks

  seats: {
    purchased: number;
    used: number;
    available: number; // purchased - used
  };

  // MVP: Manual pricing (no Stripe)
  pricePerSeat: number;
  totalPaid: number;
  paymentStatus: 'pending' | 'paid' | 'manual'; // MVP defaults to 'manual'

  startDate: Date;
  endDate: Date;

  status: 'scheduled' | 'active' | 'completed';

  // MVP: Skip settings, metrics (add later)

  createdAt: Date;
  createdBy: string;
}

// ============================================
// COLLECTION: userProgress (extends existing)
// ============================================
interface UserMasterclassProgress {
  id: string; // userId_masterclassId
  userId: string;
  masterclassId: string;

  // Company context
  isCompanySponsored: boolean;
  companyId?: string;
  companyMasterclassId?: string;

  // Progress
  currentModule: number; // 1-8
  overallProgress: number; // 0-100

  // MVP: Simple tracking
  lastActivityDate: Date;
  totalTimeSpent: number; // minutes

  // Status (computed daily by cron - post-MVP)
  // MVP: Compute on-demand when dashboard loads
  computedStatus: 'on_track' | 'at_risk' | 'completed';

  enrolledAt: Date;
  completedAt?: Date;
  certificateIssued: boolean;
}
```

### Critical Firestore Indexes

```json
{
  "indexes": [
    {
      "collectionGroup": "employees",
      "queryScope": "COLLECTION_GROUP",
      "fields": [
        { "fieldPath": "companyId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "addedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionId": "userProgress",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "companyMasterclassId", "order": "ASCENDING" },
        { "fieldPath": "computedStatus", "order": "ASCENDING" }
      ]
    },
    {
      "collectionId": "userProgress",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "companyId", "order": "ASCENDING" },
        { "fieldPath": "lastActivityDate", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 🔐 SECURITY RULES (WITH CRITICAL FIXES)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ========================================
    // HELPER FUNCTIONS
    // ========================================

    function isAuthenticated() {
      return request.auth != null;
    }

    function isCompanyAdmin(companyId) {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/companies/$(companyId)/admins/$(request.auth.uid));
    }

    function hasPermission(companyId, permission) {
      let adminDoc = get(/databases/$(database)/documents/companies/$(companyId)/admins/$(request.auth.uid));
      return adminDoc.data.permissions[permission] == true;
    }

    function isEmployee(companyId) {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/companies/$(companyId)/employees/$(request.auth.uid));
    }

    // 🔴 FIX: Prevent permission escalation
    function canAssignRole(currentRole, targetRole) {
      // Only owners can create owners
      return targetRole != 'owner' || currentRole == 'owner';
    }

    // ========================================
    // COMPANIES
    // ========================================

    match /companies/{companyId} {
      allow read: if isCompanyAdmin(companyId) || isEmployee(companyId);
      allow create: if isAuthenticated() && request.resource.data.createdBy == request.auth.uid;
      allow update: if isCompanyAdmin(companyId);
      allow delete: if false; // No deletion in MVP

      // Admins subcollection
      match /admins/{adminId} {
        allow read: if isCompanyAdmin(companyId);

        // 🔴 FIX: Check role escalation on create
        allow create: if isCompanyAdmin(companyId) &&
          canAssignRole(
            get(/databases/$(database)/documents/companies/$(companyId)/admins/$(request.auth.uid)).data.role,
            request.resource.data.role
          );

        allow update: if isCompanyAdmin(companyId) && adminId == request.auth.uid;
        allow delete: if false; // No deletion in MVP
      }

      // Employees subcollection
      match /employees/{employeeId} {
        // 🔴 FIX: Employees can ONLY read their own record
        allow read: if isCompanyAdmin(companyId) ||
          (isAuthenticated() && get(/databases/$(database)/documents/companies/$(companyId)/employees/$(employeeId)).data.userId == request.auth.uid);

        allow create, update: if isCompanyAdmin(companyId) &&
          hasPermission(companyId, 'canManageEmployees');

        allow delete: if false; // Soft delete only
      }

      // Masterclasses subcollection
      match /masterclasses/{masterclassId} {
        allow read: if isCompanyAdmin(companyId);
        allow create, update: if isCompanyAdmin(companyId);
        allow delete: if false;
      }
    }

    // ========================================
    // USER PROGRESS
    // ========================================

    match /userProgress/{progressId} {
      allow read: if request.auth.uid == resource.data.userId ||
        (resource.data.companyId != null && isCompanyAdmin(resource.data.companyId));

      allow update: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🚀 MVP IMPLEMENTATION ROADMAP (6 WEEKS)

### Sprint 0: Setup (5 days - CRITICAL FIXES)

**Goal:** Fix critical issues, set up infrastructure

#### Day 1-2: Critical Security Fixes
- [ ] Add Firestore transaction to `enrollEmployeesInMasterclass` function
- [ ] Add webhook idempotency check (for post-MVP Stripe)
- [ ] Fix permission escalation in security rules
- [ ] Update security rules (employees can't list other employees)

#### Day 3-4: Infrastructure
- [ ] Set up Firebase project (Production + Staging)
- [ ] Enable Firebase App Check for rate limiting
- [ ] Create Firestore composite indexes
- [ ] Set up Firebase emulators locally
- [ ] Create seed data script (1 company, 10 employees)

#### Day 5: CI/CD
- [ ] GitHub repository setup
- [ ] GitHub Actions workflow (type check, lint, test)
- [ ] Auto-deploy to Firebase Staging on PR

**Deliverable:** `npm run dev` works, all security fixes applied

---

### Week 1-2: Company Registration + Auth

**Goal:** Company can register and log in to empty dashboard

#### Tasks

**Backend (Week 1)**
- [ ] `createCompany` Cloud Function
  - Input validation (Zod)
  - Slug generation (unique check)
  - Create company document
  - Set creator as owner admin
  - Send plain text welcome email

- [ ] Auth system
  - Firebase Auth setup
  - `useAuth` React hook
  - Protected route middleware

**Frontend (Week 2)**
- [ ] Company registration page
  - Form with validation
  - Error handling
  - Success redirect

- [ ] Login/Logout pages
  - Simple email/password login
  - Password reset flow

- [ ] Empty dashboard shell
  - Layout with sidebar
  - Header with company name
  - Empty state message

**Acceptance Criteria:**
- ✅ User can register company
- ✅ Receives welcome email (plain text)
- ✅ Can log in and see empty dashboard
- ✅ Security rules prevent unauthorized access

**Demo:** Live demo with real email sent

---

### Week 3-4: Employee Management

**Goal:** Admin can invite employees, employee can accept

#### Tasks

**Backend**
- [ ] `addEmployee` Cloud Function
  - Create employee document
  - Generate secure invite token (crypto.randomBytes)
  - Set 7-day expiration
  - Send invitation email (plain text)
  - Check for duplicate email

- [ ] `verifyEmployeeInvite` Function
  - Find invite by token
  - Check expiration
  - Return employee details

- [ ] `acceptEmployeeInvite` Function
  - **Use transaction** (prevent double-use)
  - Validate email matches
  - Link userId to employee
  - Mark as active
  - Delete token

**Frontend**
- [ ] Add employee form (simple)
  - Name, email, job title
  - Validation
  - Success message

- [ ] Employee list view (with pagination)
  - Table with 50 employees per page
  - Status badges
  - Search by name/email

- [ ] Accept invite page
  - Token verification
  - Sign up / log in flow
  - Error states (expired, invalid)

**Acceptance Criteria:**
- ✅ Admin can add employee
- ✅ Employee receives invite email
- ✅ Employee can accept invite
- ✅ Expired invites show error
- ✅ Duplicate emails prevented
- ✅ Pagination works with 100+ employees

**Demo:** Invite real email, accept on phone

---

### Week 5: Manual Seat Management

**Goal:** Admin can manually assign masterclass seats

#### Tasks

**Backend**
- [ ] `createCompanyMasterclass` Function (manual mode)
  - Admin inputs: masterclass, seat count, start date
  - Create company masterclass document
  - Set `paymentStatus: 'manual'`
  - No Stripe integration (MVP)

- [ ] `enrollEmployeesInMasterclass` Function
  - **Critical: Use Firestore transaction**
  - Check available seats atomically
  - Batch enroll employees
  - Create userProgress documents
  - Send enrollment emails (plain text)

**Frontend**
- [ ] Manual masterclass setup page
  - Select masterclass from dropdown
  - Enter seat count
  - Choose start date
  - "Create" button (no payment)

- [ ] Assign employees page
  - Multi-select checkboxes
  - Seat count validation
  - Bulk assign button

**Acceptance Criteria:**
- ✅ Admin can create masterclass enrollment
- ✅ Seat count tracked correctly
- ✅ **Race condition handled** (transaction test)
- ✅ Employees enrolled successfully
- ✅ Enrollment emails sent

**Demo:** Enroll 10 employees, verify seat count

---

### Week 6: Basic Dashboard + CSV Export

**Goal:** Admin sees employee progress in simple table

#### Tasks

**Backend**
- [ ] `getCompanyDashboard` Function
  - Fetch employees + progress
  - **Compute metrics on-demand** (no cron in MVP)
  - Calculate on-track vs at-risk (simple logic)
  - Cache for 5 minutes (SWR)

- [ ] `generateCSVReport` Function
  - Gather company data
  - Generate CSV string
  - Upload to Firebase Storage
  - Return download URL

**Frontend**
- [ ] Dashboard page (SIMPLE)
  - 4 metric cards (enrolled, active, completed, at-risk)
  - Employee table with progress bars
  - Status badges (on-track, at-risk, completed)
  - Last activity timestamp
  - "Send Reminder" button (manual)

- [ ] CSV export button
  - Click to download
  - Loading spinner
  - Success message

**Acceptance Criteria:**
- ✅ Dashboard loads in <2 seconds (100 employees)
- ✅ Metrics accurate
- ✅ CSV exports correctly
- ✅ Manual reminder button works

**Demo:** Load test with 100 fake employees, export CSV

---

## 🔧 CRITICAL CODE FIXES

### Fix 1: Transaction-Safe Seat Allocation

```typescript
// functions/src/company/enrollEmployees.ts

export const enrollEmployeesInMasterclass = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }

  const { companyId, masterclassId, employeeIds } = data;
  const userId = context.auth.uid;

  // 🔴 FIX: Use Firestore transaction to prevent race condition
  return await db.runTransaction(async (transaction) => {
    // 1. Verify admin permission (read in transaction)
    const adminDoc = await transaction.get(
      db.collection('companies').doc(companyId).collection('admins').doc(userId)
    );

    if (!adminDoc.exists || !adminDoc.data()?.permissions.canManageEmployees) {
      throw new functions.https.HttpsError('permission-denied', 'No permission');
    }

    // 2. Get company masterclass (read in transaction)
    const masterclassQuery = await db
      .collection('companies').doc(companyId)
      .collection('masterclasses')
      .where('masterclassId', '==', masterclassId)
      .limit(1)
      .get();

    if (masterclassQuery.empty) {
      throw new functions.https.HttpsError('not-found', 'Masterclass not found');
    }

    const masterclassDoc = masterclassQuery.docs[0];
    const masterclass = await transaction.get(masterclassDoc.ref);
    const masterclassData = masterclass.data()!;

    // 3. Check available seats ATOMICALLY
    if (employeeIds.length > masterclassData.seats.available) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `Only ${masterclassData.seats.available} seats available`
      );
    }

    // 4. Update seat count in SAME transaction
    transaction.update(masterclassDoc.ref, {
      'seats.used': admin.firestore.FieldValue.increment(employeeIds.length),
      'seats.available': admin.firestore.FieldValue.increment(-employeeIds.length),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 5. Create progress documents (in transaction)
    for (const employeeId of employeeIds) {
      const employeeRef = db
        .collection('companies').doc(companyId)
        .collection('employees').doc(employeeId);

      const employeeDoc = await transaction.get(employeeRef);
      if (!employeeDoc.exists) continue;

      const employee = employeeDoc.data()!;

      // Update employee enrollments
      transaction.update(employeeRef, {
        enrolledMasterclasses: admin.firestore.FieldValue.arrayUnion({
          masterclassId: masterclassDoc.id,
          enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        }),
      });

      // Create user progress
      const progressRef = db
        .collection('userProgress')
        .doc(`${employee.userId}_${masterclassId}`);

      transaction.set(progressRef, {
        userId: employee.userId,
        masterclassId,
        isCompanySponsored: true,
        companyId,
        companyMasterclassId: masterclassDoc.id,
        currentModule: 1,
        overallProgress: 0,
        lastActivityDate: admin.firestore.FieldValue.serverTimestamp(),
        totalTimeSpent: 0,
        computedStatus: 'on_track',
        enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        certificateIssued: false,
      });
    }

    return { success: true, enrolledCount: employeeIds.length };
  });
});
```

### Fix 2: Invite Token Security (Transaction)

```typescript
// functions/src/company/acceptEmployeeInvite.ts

export const acceptEmployeeInvite = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }

  const { token } = data;
  const userId = context.auth.uid;

  // 🔴 FIX: Use transaction to prevent double-use of token
  return await db.runTransaction(async (transaction) => {
    // Find employee by token
    const employeeQuery = await db
      .collectionGroup('employees')
      .where('inviteToken', '==', token)
      .limit(1)
      .get();

    if (employeeQuery.empty) {
      throw new functions.https.HttpsError('not-found', 'Invalid invite');
    }

    const employeeDoc = employeeQuery.docs[0];
    const employee = await transaction.get(employeeDoc.ref);
    const employeeData = employee.data()!;

    // Check if already accepted (in transaction)
    if (employeeData.status !== 'invited') {
      throw new functions.https.HttpsError('failed-precondition', 'Invite already used');
    }

    // Verify email matches
    if (employeeData.email.toLowerCase() !== context.auth.token.email.toLowerCase()) {
      throw new functions.https.HttpsError('permission-denied', 'Email mismatch');
    }

    // Update ATOMICALLY (prevents race condition)
    transaction.update(employeeDoc.ref, {
      userId,
      status: 'active',
      inviteAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
      inviteToken: admin.firestore.FieldValue.delete(),
      inviteExpiresAt: admin.firestore.FieldValue.delete(),
    });

    return { success: true, companyId: employeeData.companyId };
  });
});
```

### Fix 3: Dashboard with 5-Minute Cache

```typescript
// app/company/[companyId]/masterclass/[masterclassId]/dashboard/page.tsx

'use client';

import useSWR from 'swr';

export default function Dashboard({ params }) {
  // 🔴 FIX: 5-minute cache instead of 30 seconds (90% cost reduction)
  const { data, error, mutate } = useSWR(
    ['dashboard', params.companyId, params.masterclassId],
    () => fetchDashboard(params.companyId, params.masterclassId),
    {
      refreshInterval: 300000, // 5 minutes (was 30 seconds)
      revalidateOnFocus: false, // Don't refetch on tab focus
    }
  );

  async function fetchDashboard(companyId: string, masterclassId: string) {
    const getDashboard = httpsCallable(functions, 'getCompanyDashboard');
    const result = await getDashboard({ companyId, masterclassId });
    return result.data;
  }

  // Manual refresh button
  async function handleRefresh() {
    await mutate();
  }

  return (
    <div>
      <button onClick={handleRefresh}>🔄 Refresh</button>
      {/* Dashboard content */}
    </div>
  );
}
```

---

## 📦 DELIVERABLES CHECKLIST

### Week 6 (MVP Launch)

**Code:**
- [ ] All 5 critical security fixes applied
- [ ] Firebase project deployed (staging + production)
- [ ] GitHub repository with CI/CD
- [ ] All Cloud Functions deployed
- [ ] Firestore indexes created
- [ ] Security rules deployed

**Features:**
- [ ] Company registration works
- [ ] Employee invitation works
- [ ] Manual seat assignment works
- [ ] Dashboard shows progress (simple table)
- [ ] CSV export works
- [ ] Manual reminder email works

**Testing:**
- [ ] Unit tests for critical functions (transactions)
- [ ] Manual testing with 10 test companies
- [ ] Load test dashboard with 100 employees (<2s load time)
- [ ] Security rules tested (permission escalation blocked)

**Documentation:**
- [ ] README with setup instructions
- [ ] Admin user guide (basic)
- [ ] API documentation (key functions)

**Deployment:**
- [ ] Production Firebase project live
- [ ] Domain configured (company.elira.hu)
- [ ] SSL certificate
- [ ] Email sending working (SendGrid)

---

## 💰 MVP COST ESTIMATE

### Development Costs
- **1 Full-Stack Dev × 6 weeks × $100/hour × 40 hours/week = $24,000**
- Add 20% buffer = **$28,800 total**

### Monthly Operating Costs (MVP)
| Service | Cost |
|---------|------|
| Firebase (10 companies) | $6/month |
| SendGrid (100 emails/day) | $0 (free tier) |
| Domain + SSL | $12/year |
| **Total** | **$6-10/month** |

### Scale Costs
| Companies | Firebase | SendGrid | Total/Month |
|-----------|----------|----------|-------------|
| 10 | $6 | $0 | $6 |
| 50 | $30 | $15 | $45 |
| 100 | $90 | $15 | $105 |

---

## 🎯 SUCCESS METRICS (MVP)

### Week 1 Post-Launch
- [ ] 10 companies signed up
- [ ] 100+ employees invited
- [ ] Zero critical bugs
- [ ] Dashboard loads <2 seconds
- [ ] 100% email deliverability

### Month 1
- [ ] 20 companies
- [ ] 500+ employees
- [ ] <$30/month Firebase costs
- [ ] 80%+ employee activation rate
- [ ] Customer satisfaction survey (NPS >50)

### Month 3 (Evaluate Full Build)
- [ ] 50 companies
- [ ] 2,500+ employees
- [ ] <$100/month costs
- [ ] Product-market fit validated
- [ ] Decision: Build full version or pivot

---

## 🚀 POST-MVP ROADMAP (Months 2-6)

### v2.0 Features (4 weeks)
- [ ] Automated Stripe checkout
- [ ] Fancy dashboard charts (Recharts)
- [ ] PDF reports
- [ ] Styled email templates
- [ ] At-risk auto-detection (daily cron)
- [ ] Automated weekly reminders

### v3.0 Scale (6 weeks)
- [ ] Redis caching layer
- [ ] Pagination everywhere
- [ ] Advanced reporting
- [ ] Admin roles (owner, admin, manager, viewer)
- [ ] Audit logs
- [ ] Data export (GDPR)

### v4.0 Enterprise (8 weeks)
- [ ] SSO integration (Google Workspace, Microsoft)
- [ ] Custom branding per company
- [ ] Advanced analytics
- [ ] API for integrations
- [ ] Mobile app
- [ ] Multi-language support

---

## ❓ QUESTIONS FOR STAKEHOLDERS

Before starting MVP:

1. **Budget:** Can we spend $28K on MVP development?
2. **Timeline:** Is 6 weeks acceptable, or do we need faster?
3. **First Customers:** Do we have 5-10 companies ready to test?
4. **Manual Work:** Can someone manually invoice customers for MVP? (no Stripe)
5. **Support:** Who handles customer support during MVP?

---

## 📝 NEXT STEPS

1. **This Week:** Review this plan, get stakeholder approval
2. **Next Week:** Fix 5 critical issues (Sprint 0)
3. **Week 1-2:** Build company registration
4. **Week 3-4:** Build employee management
5. **Week 5:** Build seat assignment
6. **Week 6:** Build dashboard + export
7. **Launch:** 10 test companies, gather feedback
8. **Iterate:** Build v2.0 based on feedback

---

**Last Updated:** 2025-01-19
**Status:** Ready to Build
**Next Review:** After Sprint 0 (critical fixes complete)
