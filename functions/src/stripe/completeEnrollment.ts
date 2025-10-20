/**
 * Complete Stripe Enrollment
 * Called after successful Stripe payment to:
 * 1. Create enrollment record
 * 2. Send welcome email
 * 3. Generate invoice (async)
 * 4. Log analytics
 */

import { https } from 'firebase-functions/v2';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const db = admin.firestore();

// Lazy-load Stripe to avoid initialization errors during deployment
function getStripe() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    throw new HttpsError('failed-precondition', 'Stripe not configured');
  }
  return require('stripe')(stripeKey);
}

interface CompleteEnrollmentInput {
  sessionId: string;
  courseId: string;
  userId?: string;
}

export const completeStripeEnrollment = https.onCall(
  {
    region: 'europe-west1',
    memory: '512MiB',
    maxInstances: 10,
    timeoutSeconds: 60,
  },
  async (request: CallableRequest<CompleteEnrollmentInput>) => {
    const { sessionId, courseId, userId } = request.data;

    if (!sessionId || !courseId) {
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    try {
      // 1. Verify Stripe session
      console.log(`[Complete Enrollment] Verifying session: ${sessionId}`);
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status !== 'paid') {
        throw new HttpsError(
          'failed-precondition',
          'Payment not completed'
        );
      }

      const customerEmail = session.customer_details?.email;
      const amountPaid = session.amount_total;
      const currency = session.currency;

      // 2. Get course details
      const courseDoc = await db.collection('course-content').doc(courseId).get();
      if (!courseDoc.exists) {
        throw new HttpsError('not-found', 'Course not found');
      }

      const courseData = courseDoc.data();
      const courseTitle = courseData?.title || 'Masterclass';
      const instructorName = courseData?.instructorName;
      const thumbnailUrl = courseData?.thumbnailUrl;

      // 3. Check if enrollment already exists (prevent duplicates)
      const userIdToUse = userId || request.auth?.uid;
      if (!userIdToUse) {
        throw new HttpsError('unauthenticated', 'User must be authenticated');
      }

      const existingEnrollment = await db
        .collection('user-enrollments')
        .where('userId', '==', userIdToUse)
        .where('courseId', '==', courseId)
        .limit(1)
        .get();

      let enrollmentId: string;

      if (existingEnrollment.empty) {
        // 4. Create enrollment record
        console.log(`[Complete Enrollment] Creating enrollment for user ${userIdToUse}`);

        const enrollmentData = {
          userId: userIdToUse,
          courseId,
          courseTitle,
          enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentStatus: 'paid',
          paymentMethod: 'stripe',
          stripeSessionId: sessionId,
          amountPaid,
          currency,
          status: 'active',
          progress: 0,
          completedLessons: [],
          lastAccessedAt: admin.firestore.FieldValue.serverTimestamp(),
          certificateGenerated: false,
        };

        const enrollmentRef = await db.collection('user-enrollments').add(enrollmentData);
        enrollmentId = enrollmentRef.id;

        // 5. Create progress tracking document
        const progressId = `${userIdToUse}_${courseId}`;
        await db.collection('userProgress').doc(progressId).set({
          userId: userIdToUse,
          courseId,
          enrollmentId,
          progress: 0,
          completedModules: [],
          currentModule: 1,
          startedAt: admin.firestore.FieldValue.serverTimestamp(),
          lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
          status: 'in-progress',
        });

        console.log(`[Complete Enrollment] Enrollment created: ${enrollmentId}`);
      } else {
        enrollmentId = existingEnrollment.docs[0].id;
        console.log(`[Complete Enrollment] Enrollment already exists: ${enrollmentId}`);
      }

      // 6. Send welcome email
      console.log(`[Complete Enrollment] Sending welcome email to ${customerEmail}`);
      await sendWelcomeEmail(customerEmail || '', {
        firstName: session.customer_details?.name?.split(' ')[0] || 'Kedves Tanulónk',
        courseTitle,
        instructorName,
        dashboardUrl: `${process.env.APP_URL || 'https://elira.hu'}/dashboard`,
        courseUrl: `${process.env.APP_URL || 'https://elira.hu'}/courses/${courseId}`,
      });

      // 7. Log analytics event
      await db.collection('analytics-events').add({
        event: 'enrollment_completed',
        userId: userIdToUse,
        courseId,
        enrollmentId,
        sessionId,
        amountPaid,
        currency,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 8. Generate invoice (async - don't wait for it)
      generateInvoiceAsync(enrollmentId, customerEmail || '', {
        courseTitle,
        amountPaid,
        currency,
        invoiceNumber: `INV-${Date.now()}`,
      }).catch((err) => {
        console.error('[Complete Enrollment] Invoice generation failed:', err);
        // Don't throw - invoice is not critical for enrollment
      });

      // 9. Return success with course details
      return {
        success: true,
        enrollmentId,
        courseId,
        courseTitle,
        instructorName,
        thumbnailUrl,
        welcomeVideoUrl: courseData?.welcomeVideoUrl,
        firstLessonPreviewUrl: courseData?.firstLessonPreviewUrl,
        message: 'Enrollment completed successfully',
      };
    } catch (error: any) {
      console.error('[Complete Enrollment] Error:', error);

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', error.message);
    }
  }
);

/**
 * Send welcome email via SendGrid
 */
async function sendWelcomeEmail(
  to: string,
  data: {
    firstName: string;
    courseTitle: string;
    instructorName?: string;
    dashboardUrl: string;
    courseUrl: string;
  }
) {
  const sgMail = require('@sendgrid/mail');
  const functions = require('firebase-functions');

  const sendgridApiKey = functions.config().sendgrid?.api_key || process.env.SENDGRID_API_KEY;

  if (!sendgridApiKey) {
    console.error('[Welcome Email] SendGrid API key not configured');
    return { success: false };
  }

  sgMail.setApiKey(sendgridApiKey);

  const subject = `🎉 Üdvözlünk a ${data.courseTitle} kurzuson!`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Üdvözlünk az Elirán!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                🎉 Gratulálunk!
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Sikeres beiratkozás
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Szia <strong>${data.firstName}</strong>,
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Üdvözlünk a <strong>${data.courseTitle}</strong> kurzuson! 🚀
              </p>

              ${data.instructorName ? `
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Az oktatód <strong>${data.instructorName}</strong> - tapasztalt szakértő, aki végigkísér a tanulás során.
              </p>
              ` : ''}

              <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 16px 20px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1b5e20; font-size: 15px; line-height: 1.6;">
                  <strong>✨ Jó hír!</strong> Azonnal hozzáférhetsz az összes tartalomhoz. Nincs várakozás - kezdheted azonnal!
                </p>
              </div>

              <p style="margin: 20px 0 10px; color: #333333; font-size: 16px; font-weight: 600;">
                Mit kapsz:
              </p>

              <ul style="margin: 0 0 25px; padding-left: 20px; color: #333333; font-size: 15px; line-height: 1.8;">
                <li>✅ Azonnali hozzáférés az összes leckéhez</li>
                <li>✅ Életfogytiglani hozzáférés - tanulj a saját tempódban</li>
                <li>✅ Közösségi támogatás és Q&A sessionök</li>
                <li>✅ Letölthető anyagok és gyakorlati feladatok</li>
                <li>✅ Oklevél sikeres teljesítés után</li>
              </ul>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${data.courseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                      Kezdd el most! 🚀
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px 20px; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                  <strong>💡 Tipp:</strong> A legjobb eredmény érdekében szánj napi 15-30 percet a tanulásra. A folyamatos gyakorlás a siker kulcsa!
                </p>
              </div>

              <p style="margin: 25px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Készen állsz? Kezdjük! 💪
              </p>
            </td>
          </tr>

          <!-- Dashboard Link -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 15px; color: #666666; font-size: 14px;">
                Vagy látogasd meg a dashboardod:
              </p>
              <a href="${data.dashboardUrl}" style="color: #667eea; text-decoration: underline; font-weight: 600;">
                ${data.dashboardUrl}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                Kérdésed van? Írj nekünk:<br>
                <a href="mailto:info@elira.hu" style="color: #667eea; text-decoration: none; font-weight: 600;">info@elira.hu</a>
              </p>
              <p style="margin: 15px 0 0; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Elira. Minden jog fenntartva.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const textContent = `
Szia ${data.firstName},

Gratulálunk! Sikeresen beiratkoztál a ${data.courseTitle} kurzusra! 🎉

${data.instructorName ? `Az oktatód ${data.instructorName} - tapasztalt szakértő, aki végigkísér a tanulás során.` : ''}

✨ Jó hír! Azonnal hozzáférhetsz az összes tartalomhoz.

Mit kapsz:
✅ Azonnali hozzáférés az összes leckéhez
✅ Életfogytiglani hozzáférés
✅ Közösségi támogatás és Q&A sessionök
✅ Letölthető anyagok és gyakorlatok
✅ Oklevél sikeres teljesítés után

Kezdd el most: ${data.courseUrl}

Dashboard: ${data.dashboardUrl}

💡 Tipp: A legjobb eredmény érdekében szánj napi 15-30 percet a tanulásra.

Kérdésed van? Írj nekünk: info@elira.hu

Üdvözlettel,
Az Elira csapata
  `.trim();

  try {
    await sgMail.send({
      to,
      from: {
        email: 'info@elira.hu',
        name: 'Elira Masterclass',
      },
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Welcome Email] Sent successfully to ${to}`);
    return { success: true };
  } catch (error: any) {
    console.error('[Welcome Email] Error:', error);
    if (error.response) {
      console.error('[Welcome Email] SendGrid error:', error.response.body);
    }
    return { success: false, message: error.message };
  }
}

/**
 * Generate invoice asynchronously (don't block enrollment)
 */
async function generateInvoiceAsync(
  enrollmentId: string,
  customerEmail: string,
  data: {
    courseTitle: string;
    amountPaid: number;
    currency: string;
    invoiceNumber: string;
  }
) {
  try {
    console.log(`[Invoice] Generating for enrollment ${enrollmentId}`);

    // Store invoice metadata in Firestore
    await db.collection('invoices').add({
      enrollmentId,
      customerEmail,
      courseTitle: data.courseTitle,
      amountPaid: data.amountPaid,
      currency: data.currency,
      invoiceNumber: data.invoiceNumber,
      status: 'pending',
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`[Invoice] Invoice record created for ${data.invoiceNumber}`);

    // TODO: Generate PDF invoice and send email
    // This can be done with a separate Cloud Function triggered by Firestore write
  } catch (error) {
    console.error('[Invoice] Error:', error);
    throw error;
  }
}
