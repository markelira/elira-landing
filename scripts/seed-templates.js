/**
 * Script to seed template data into Firestore
 *
 * Usage: node scripts/seed-templates.js
 *
 * This populates the templates collection with sample copywriting templates
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

const templates = [
  // Landing Page Templates
  {
    templateId: 'landing-saas-b2b',
    title: 'B2B SaaS Landing Page',
    description: 'Konverziófókuszú landing page sablon B2B szoftverekhez',
    category: 'landing_pages',
    fileUrl: '/templates/landing-saas-b2b.docx',
    previewImageUrl: '/templates/previews/landing-saas-b2b.png',
    downloadCount: 0,
    tags: ['saas', 'b2b', 'landing-page', 'lead-generation'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'landing-ecommerce',
    title: 'E-commerce Product Landing',
    description: 'Termékoldalak és értékesítési landingelemek készletek',
    category: 'landing_pages',
    fileUrl: '/templates/landing-ecommerce.docx',
    previewImageUrl: '/templates/previews/landing-ecommerce.png',
    downloadCount: 0,
    tags: ['ecommerce', 'product', 'sales', 'conversion'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'landing-webinar',
    title: 'Webinar Regisztrációs Oldal',
    description: 'Esemény és webinar regisztrációs landing page csomag',
    category: 'landing_pages',
    fileUrl: '/templates/landing-webinar.docx',
    previewImageUrl: '/templates/previews/landing-webinar.png',
    downloadCount: 0,
    tags: ['webinar', 'event', 'registration', 'lead-gen'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },

  // Email Campaign Templates
  {
    templateId: 'email-welcome-series',
    title: 'Welcome Email Sorozat',
    description: '5-részes üdvözlő email kampány új feliratkozóknak',
    category: 'email_campaigns',
    fileUrl: '/templates/email-welcome-series.docx',
    previewImageUrl: '/templates/previews/email-welcome-series.png',
    downloadCount: 0,
    tags: ['email', 'welcome', 'onboarding', 'nurture'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'email-abandoned-cart',
    title: 'Elhagyott Kosár Kampány',
    description: '3-lépéses elhagyott kosár visszahozó email szekvencia',
    category: 'email_campaigns',
    fileUrl: '/templates/email-abandoned-cart.docx',
    previewImageUrl: '/templates/previews/email-abandoned-cart.png',
    downloadCount: 0,
    tags: ['email', 'ecommerce', 'cart-recovery', 'automation'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'email-newsletter',
    title: 'Havi Newsletter Sablon',
    description: 'Professzionális hírlevél struktúra és copy framework',
    category: 'email_campaigns',
    fileUrl: '/templates/email-newsletter.docx',
    previewImageUrl: '/templates/previews/email-newsletter.png',
    downloadCount: 0,
    tags: ['email', 'newsletter', 'content', 'engagement'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'email-reactivation',
    title: 'Reaktiválási Kampány',
    description: 'Inaktív ügyfelek visszahozása 4 lépésben',
    category: 'email_campaigns',
    fileUrl: '/templates/email-reactivation.docx',
    previewImageUrl: '/templates/previews/email-reactivation.png',
    downloadCount: 0,
    tags: ['email', 'reactivation', 'winback', 'retention'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },

  // Buyer Persona Templates
  {
    templateId: 'persona-b2b-decision-maker',
    title: 'B2B Döntéshozó Persona',
    description: 'Átfogó buyer persona sablon enterprise vásárlókhoz',
    category: 'buyer_personas',
    fileUrl: '/templates/persona-b2b-decision-maker.docx',
    previewImageUrl: '/templates/previews/persona-b2b-decision-maker.png',
    downloadCount: 0,
    tags: ['persona', 'b2b', 'enterprise', 'research'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'persona-consumer',
    title: 'B2C Fogyasztói Persona',
    description: 'Részletes persona profil B2C közönséghez',
    category: 'buyer_personas',
    fileUrl: '/templates/persona-consumer.docx',
    previewImageUrl: '/templates/previews/persona-consumer.png',
    downloadCount: 0,
    tags: ['persona', 'b2c', 'consumer', 'demographics'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'persona-smb-owner',
    title: 'KKV Tulajdonos Persona',
    description: 'SMB döntéshozói jellemzők és fájdalompontok',
    category: 'buyer_personas',
    fileUrl: '/templates/persona-smb-owner.docx',
    previewImageUrl: '/templates/previews/persona-smb-owner.png',
    downloadCount: 0,
    tags: ['persona', 'smb', 'small-business', 'owner'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },

  // Market Research Templates
  {
    templateId: 'research-competitor-analysis',
    title: 'Versenytárs Elemzési Keretrendszer',
    description: 'Teljes körű competitor research és pozícionálási sablon',
    category: 'market_research',
    fileUrl: '/templates/research-competitor-analysis.docx',
    previewImageUrl: '/templates/previews/research-competitor-analysis.png',
    downloadCount: 0,
    tags: ['research', 'competitive', 'analysis', 'positioning'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'research-customer-interviews',
    title: 'Ügyfélinterjú Útmutató',
    description: 'Strukturált interjú kérdések és dokumentációs sablon',
    category: 'market_research',
    fileUrl: '/templates/research-customer-interviews.docx',
    previewImageUrl: '/templates/previews/research-customer-interviews.png',
    downloadCount: 0,
    tags: ['research', 'interviews', 'customer-insight', 'qualitative'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    templateId: 'research-message-testing',
    title: 'Üzenet Tesztelési Keretrendszer',
    description: 'A/B teszt hipotézisek és kampány validációs sablon',
    category: 'market_research',
    fileUrl: '/templates/research-message-testing.docx',
    previewImageUrl: '/templates/previews/research-message-testing.png',
    downloadCount: 0,
    tags: ['research', 'testing', 'ab-test', 'validation'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

async function seedTemplates() {
  console.log('🌱 Starting template seeding...');

  const batch = db.batch();
  let count = 0;

  for (const template of templates) {
    const ref = db.collection('templates').doc(template.templateId);
    batch.set(ref, template);
    count++;
    console.log(`  ✓ Added: ${template.title}`);
  }

  await batch.commit();

  console.log(`\n✅ Successfully seeded ${count} templates!`);
  console.log('\nTemplate breakdown:');
  console.log(`  - Landing Pages: 3`);
  console.log(`  - Email Campaigns: 4`);
  console.log(`  - Buyer Personas: 3`);
  console.log(`  - Market Research: 3`);

  process.exit(0);
}

// Run seeding
seedTemplates().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
