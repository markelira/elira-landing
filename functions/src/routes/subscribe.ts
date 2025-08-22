import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import { sendLeadMagnetEmail } from '../services/sendgrid';
import { sendDiscordNotification } from '../services/discord';

// Get Firestore instance
const db = admin.firestore();

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional(),
  magnetId: z.string().optional(),
  magnetTitle: z.string().optional(),
  magnetSelected: z.string().optional(),
});

interface LeadData {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  magnetSelected: string;
  job: string;
  education: string;
  selectedMagnets: string[];
  source: string;
  status: string;
}

// Add lead to Firestore
async function addLead(leadData: LeadData): Promise<string> {
  const docData = {
    ...leadData,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  
  const docRef = await db.collection('leads').add(docData);
  
  // Also add to subscribers collection for compatibility
  await db.collection('subscribers').add({
    firstName: leadData.firstName,
    lastName: leadData.lastName,
    email: leadData.email,
    occupation: leadData.job,
    education: leadData.education,
    selectedMagnets: leadData.selectedMagnets,
    subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'website',
    status: 'active'
  });
  
  return docRef.id;
}

export async function subscribeHandler(req: Request, res: Response) {
  console.log('Subscribe handler called with:', req.body);
  
  try {
    // Validate input
    const validationResult = subscribeSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.issues);
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.issues,
      });
    }

    const { email, firstName, lastName, job, education, magnetId, magnetSelected } = validationResult.data;
    console.log('Processing subscription for:', email);

    // 1. ALWAYS save to Firebase first (this is critical)
    const leadData = {
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      magnetSelected: magnetSelected || magnetId || 'none',
      job: job || 'Not specified',
      education: education || 'Not specified',
      selectedMagnets: magnetId ? [magnetId] : [],
      source: 'website',
      status: 'active'
    };
    
    let leadId: string | null = null;
    
    try {
      // Save to Firestore
      leadId = await addLead(leadData);
      console.log('Lead saved to Firebase:', leadId);
    } catch (firestoreError) {
      console.error('Critical: Failed to save lead to Firestore:', firestoreError);
      return res.status(500).json({
        success: false,
        error: 'Hiba történt az adatok mentése során. Kérjük próbáld újra.',
      });
    }

    // 2. Try SendGrid if configured (but don't fail if not)
    let emailSent = false;
    
    try {
      // Send email with SendGrid
      const emailResult = await sendLeadMagnetEmail(
        email,
        `${firstName} ${lastName}`,
        magnetSelected || magnetId || 'none'
      );

      if (emailResult.success) {
        emailSent = true;
        console.log('SendGrid: Email sent successfully to', email);
      } else {
        console.warn('SendGrid: Failed to send email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('SendGrid error, but lead saved to Firebase:', emailError);
      // Don't throw - continue anyway
    }
    
    // 3. Send Discord notification (non-blocking)
    try {
      const discordResult = await sendDiscordNotification(
        `${firstName} ${lastName}`,
        magnetSelected || magnetId || 'none',
        job,
        education
      );
      
      if (discordResult.success) {
        console.log('Discord notification sent successfully');
      } else {
        console.warn('Discord notification failed:', discordResult.error);
      }
    } catch (discordError) {
      console.error('Discord notification error:', discordError);
      // Don't throw - this is optional functionality
    }
    
    // 4. Always return success if Firebase worked
    const message = emailSent 
      ? '✅ Sikeres regisztráció! Nézd meg az email fiókodat (spam mappát is)!'
      : 'Köszönjük a regisztrációt! Adataidat elmentettük.';
    
    return res.json({
      success: true,
      message,
      data: {
        id: leadId,
        email,
        emailSent,
      },
    });
    
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false, 
      error: 'Hiba történt. Kérjük próbáld újra.' 
    });
  }
}