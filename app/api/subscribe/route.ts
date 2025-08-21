import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { addLead } from '@/lib/firestore-operations';
import { sendLeadMagnetEmail } from '@/lib/sendgrid';
import { sendDiscordNotification } from '@/lib/discord';
import { logger } from '@/lib/logger';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  job: z.enum(['Marketing', 'IT/Fejlesztő', 'HR', 'Pénzügy', 'Értékesítés', 'Vezetői pozíció', 'Diák', 'Egyéb']).optional(),
  education: z.enum(['Középiskola', 'Főiskola', 'Egyetem (BSc)', 'Mesterszint (MSc)', 'PhD']).optional(),
  magnetId: z.string().optional(),
  magnetTitle: z.string().optional(),
  magnetSelected: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, name, job, education, magnetId, magnetSelected } = validationResult.data;

    // 1. ALWAYS save to Firebase first (this is critical)
    const leadData = {
      email,
      name,
      magnetSelected: magnetSelected || magnetId || 'none',
      job: job || 'Not specified',
      education: education || 'Not specified',
      selectedMagnets: magnetId ? [magnetId] : [],
    };
    
    let leadId: string | null = null;
    
    try {
      // Save to Firestore
      leadId = await addLead(leadData);
      logger.log('Lead saved to Firebase:', leadId);
    } catch (firestoreError) {
      logger.error('Critical: Failed to save lead to Firestore:', firestoreError);
      return NextResponse.json(
        {
          success: false,
          error: 'Hiba történt az adatok mentése során. Kérjük próbáld újra.',
        },
        { status: 500 }
      );
    }

    // 2. Try SendGrid if configured (but don't fail if not)
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    let emailSent = false;
    
    if (SENDGRID_API_KEY) {
      try {
        // Send email with SendGrid
        const emailResult = await sendLeadMagnetEmail(
          email,
          name,
          magnetSelected || magnetId || 'none'
        );

        if (emailResult.success) {
          emailSent = true;
          logger.log('SendGrid: Email sent successfully to', email);
        } else {
          logger.warn('SendGrid: Failed to send email:', emailResult.error);
        }
      } catch (emailError) {
        logger.error('SendGrid error, but lead saved to Firebase:', emailError);
        // Don't throw - continue anyway
      }
    } else {
      logger.log('SendGrid not configured - lead saved to Firebase only');
    }
    
    // 3. Send Discord notification (non-blocking)
    try {
      const discordResult = await sendDiscordNotification(
        name,
        magnetSelected || magnetId || 'none',
        job,
        education
      );
      
      if (discordResult.success) {
        logger.log('Discord notification sent successfully');
      } else {
        logger.warn('Discord notification failed:', discordResult.error);
      }
    } catch (discordError) {
      logger.error('Discord notification error:', discordError);
      // Don't throw - this is optional functionality
    }
    
    // 4. Always return success if Firebase worked
    const message = emailSent 
      ? '✅ Sikeres regisztráció! Nézd meg az email fiókodat (spam mappát is)!'
      : 'Köszönjük a regisztrációt! Adataidat elmentettük.';
    
    return NextResponse.json({
      success: true,
      message,
      data: {
        id: leadId,
        email,
        emailSent,
      },
    });
    
  } catch (error: any) {
    logger.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Hiba történt. Kérjük próbáld újra.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email subscription endpoint',
    methods: ['POST'],
  });
}