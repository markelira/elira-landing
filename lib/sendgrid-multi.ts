import sgMail from '@sendgrid/mail';
import { logger } from './logger';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Lead magnet configurations with actual Google Drive links
const leadMagnetConfig: Record<string, { subject: string; title: string; downloadLink: string; description: string }> = {
  'chatgpt-prompts': {
    subject: '🤖 ChatGPT Prompt Gyűjteményed megérkezett!',
    title: 'ChatGPT Prompt Sablon Gyűjtemény',
    downloadLink: 'https://docs.google.com/document/d/1bYIGKirCUk4WJHpps4ZLUoz_i_k29IKljPY5RDm_2Gs/edit?usp=sharing',
    description: '100+ bevált prompt template kategóriákban rendszerezve'
  },
  'linkedin-calendar': {
    subject: '📈 30 Napos LinkedIn Naptárad itt van!',
    title: '30 Napos LinkedIn Növekedési Naptár',
    downloadLink: 'https://docs.google.com/document/d/1eaT1T49BVeIuQlQ4nIi1qGQpa0C45Yt5w7WBVGBUVOY/edit?usp=sharing',
    description: '0-ról 1000 követőig egy hónap alatt strukturált tervvel'
  },
  'email-templates': {
    subject: '📧 Email Marketing Sablonok letöltése',
    title: 'Email Marketing Sablon Könyvtár',
    downloadLink: 'https://docs.google.com/document/d/1-MMaUdR6az1pmnBBkehNTweMv-GCNaZ0M3UFPvEyTVQ/edit?usp=sharing',
    description: 'Bevált email sablonok minden helyzethez'
  },
  'tiktok-guide': {
    subject: '🎬 TikTok Algoritmus Guide megérkezett!',
    title: 'TikTok Algoritmus Hack Guide',
    downloadLink: 'https://docs.google.com/document/d/1nWukecop6ysWiuZikxkpBCoQ-8gGprGICuKc8rlGFcI/edit?usp=sharing',
    description: 'Hogyan menjél virálisra a magyar TikTok-on'
  },
  'automation-workflows': {
    subject: '⚡ Marketing Automatizáció Tervezők',
    title: 'Marketing Automatizáció Munkafolyamat Tervezők',
    downloadLink: 'https://docs.google.com/document/d/1Eu51JxcLmg5AArut64al8vNlcEveS7au5n8Li_n2mSg/edit?usp=sharing',
    description: 'Kész workflow-k ami 10+ órát spórolnak hetente'
  }
};

export async function sendMultipleMagnetsEmail(
  to: string,
  name: string,
  magnetIds: string[]
): Promise<{ success: boolean; error?: string }> {
  // Check if SendGrid is configured
  if (!SENDGRID_API_KEY) {
    logger.log('SendGrid not configured - skipping email send');
    return { success: false, error: 'SendGrid not configured' };
  }

  // Get magnet configurations
  const selectedMagnets = magnetIds.map(id => leadMagnetConfig[id]).filter(Boolean);
  
  if (selectedMagnets.length === 0) {
    return { success: false, error: 'No valid magnets selected' };
  }

  // Generate download links with tracking
  const magnetLinks = selectedMagnets.map((magnet, index) => ({
    ...magnet,
    trackingLink: `${magnet.downloadLink}?utm_source=email&utm_medium=multi_button&utm_campaign=${magnetIds[index]}&utm_content=${encodeURIComponent(to)}`
  }));

  const subject = selectedMagnets.length === 1 
    ? selectedMagnets[0].subject
    : `🎉 ${selectedMagnets.length} ingyenes anyagod megérkezett!`;

  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'info@elira.hu',
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background-color: #f3f4f6;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content { 
              padding: 40px 30px; 
            }
            .magnet-card {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 20px;
              margin: 20px 0;
              transition: all 0.2s;
            }
            .magnet-card:hover {
              box-shadow: 0 4px 12px rgba(13, 148, 136, 0.1);
              border-color: #0d9488;
            }
            .magnet-header {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
            }
            .magnet-icon {
              font-size: 24px;
              margin-right: 12px;
            }
            .magnet-title {
              font-size: 18px;
              font-weight: 600;
              color: #1f2937;
              margin: 0;
            }
            .magnet-description {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 16px;
            }
            .download-button { 
              display: inline-block; 
              padding: 12px 24px; 
              background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); 
              color: white; 
              text-decoration: none; 
              border-radius: 8px; 
              font-weight: 600;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
              transition: transform 0.2s;
            }
            .download-button:hover {
              transform: translateY(-1px);
            }
            .summary-box {
              background: #f0fdfa;
              border: 2px solid #0d9488;
              border-radius: 12px;
              padding: 20px;
              margin: 30px 0;
              text-align: center;
            }
            .summary-box h3 {
              color: #0d9488;
              margin-top: 0;
              font-size: 20px;
            }
            .divider {
              height: 1px;
              background: #e5e7eb;
              margin: 40px 0;
            }
            .next-steps {
              background: #f0fdfa;
              border-left: 4px solid #0d9488;
              padding: 20px;
              margin: 30px 0;
              border-radius: 0 8px 8px 0;
            }
            .next-steps h4 {
              color: #0d9488;
              margin-top: 0;
            }
            .next-steps ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .next-steps li {
              margin: 10px 0;
            }
            .next-steps a {
              color: #0891b2;
              font-weight: 600;
              text-decoration: none;
            }
            .next-steps a:hover {
              text-decoration: underline;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              background: #f9fafb;
              color: #6b7280; 
              font-size: 14px; 
            }
            .footer p {
              margin: 5px 0;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #0d9488;
              text-decoration: none;
              font-weight: 500;
            }
            @media (max-width: 600px) {
              .content, .header {
                padding: 30px 20px;
              }
              .magnet-card {
                padding: 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Köszönjük, ${name}! 🎉</h1>
            </div>
            
            <div class="content">
              ${selectedMagnets.length === 1 ? `
                <h2>Itt a kért anyagod:</h2>
              ` : `
                <div class="summary-box">
                  <h3>🎊 ${selectedMagnets.length} fantasztikus anyag vár rád!</h3>
                  <p>Minden PDF-et külön gombbal tölthetsz le alább</p>
                </div>
              `}
              
              ${magnetLinks.map(magnet => `
                <div class="magnet-card">
                  <div class="magnet-header">
                    <div class="magnet-icon">📚</div>
                    <h3 class="magnet-title">${magnet.title}</h3>
                  </div>
                  <p class="magnet-description">${magnet.description}</p>
                  <a href="${magnet.trackingLink}" class="download-button">
                    📥 Letöltés Most
                  </a>
                </div>
              `).join('')}
              
              <div class="divider"></div>
              
              <div class="next-steps">
                <h4>🚀 Mi a következő lépés?</h4>
                <ul>
                  <li>
                    <strong>Csatlakozz a Discord közösségünkhöz</strong><br>
                    1000+ lelkes marketinges vár rád!<br>
                    <a href="https://discord.gg/mcUyZXGERT">→ Belépek a Discord-ra</a>
                  </li>
                  <li>
                    <strong>Kövesd a LinkedIn oldalunkat</strong><br>
                    Napi tippek és trükkök<br>
                    <a href="https://linkedin.com/company/elira">→ LinkedIn követés</a>
                  </li>
                </ul>
              </div>
              
              <p style="text-align: center; margin-top: 30px; color: #6b7280;">
                <em>Ha bármilyen kérdésed van, válaszolj erre az emailre!</em>
              </p>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="https://discord.gg/mcUyZXGERT">Discord</a>
                <a href="https://linkedin.com/company/elira">LinkedIn</a>
              </div>
              <p><strong>© 2025 Elira - Minden jog fenntartva</strong></p>
              <p>Email: hello@elira.hu | Web: elira.hu</p>
              <p style="font-size: 12px; margin-top: 20px;">
                Ha nem te kérted ezt az emailt, kérleg hagyd figyelmen kívül.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    logger.log(`SendGrid: Multi-magnet email sent successfully to ${to} (${magnetIds.length} PDFs: ${magnetIds.join(', ')})`);
    return { success: true };
  } catch (error: any) {
    logger.error('SendGrid multi-magnet error:', error);
    
    // Log specific error details
    if (error.response) {
      logger.error('SendGrid response error:', error.response.body);
    }
    
    return { 
      success: false, 
      error: error.message || 'Failed to send multi-magnet email' 
    };
  }
}