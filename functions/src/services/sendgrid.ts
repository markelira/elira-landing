import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL || 'info@elira.hu';

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Lead magnet configurations with actual Google Drive links
const leadMagnetConfig: Record<string, { subject: string; title: string; downloadLink: string }> = {
  'chatgpt-prompts': {
    subject: '🤖 ChatGPT Prompt Gyűjteményed megérkezett!',
    title: 'ChatGPT Prompt Sablon Gyűjtemény',
    downloadLink: 'https://docs.google.com/document/d/1bYIGKirCUk4WJHpps4ZLUoz_i_k29IKljPY5RDm_2Gs/edit?usp=sharing'
  },
  'linkedin-calendar': {
    subject: '📈 30 Napos LinkedIn Naptárad itt van!',
    title: '30 Napos LinkedIn Növekedési Naptár',
    downloadLink: 'https://docs.google.com/document/d/1eaT1T49BVeIuQlQ4nIi1qGQpa0C45Yt5w7WBVGBUVOY/edit?usp=sharing'
  },
  'email-templates': {
    subject: '📧 Email Marketing Sablonok letöltése',
    title: 'Email Marketing Sablon Könyvtár',
    downloadLink: 'https://docs.google.com/document/d/1-MMaUdR6az1pmnBBkehNTweMv-GCNaZ0M3UFPvEyTVQ/edit?usp=sharing'
  },
  'tiktok-guide': {
    subject: '🎬 TikTok Algoritmus Guide megérkezett!',
    title: 'TikTok Algoritmus Hack Guide',
    downloadLink: 'https://docs.google.com/document/d/1nWukecop6ysWiuZikxkpBCoQ-8gGprGICuKc8rlGFcI/edit?usp=sharing'
  },
  'automation-workflows': {
    subject: '⚡ Marketing Automatizáció Tervezők',
    title: 'Marketing Automatizáció Munkafolyamat Tervezők',
    downloadLink: 'https://docs.google.com/document/d/1Eu51JxcLmg5AArut64al8vNlcEveS7au5n8Li_n2mSg/edit?usp=sharing'
  },
  // Course access confirmation
  'course-access': {
    subject: '🎉 Kurzus hozzáférés aktiválva - Kezdjük el!',
    title: 'AI-alapú piac-kutatásos copywriting kurzus',
    downloadLink: 'https://elira.hu/dashboard/course'
  },
  // Default/fallback
  'none': {
    subject: '🎯 Üdvözlünk az Elira közösségben!',
    title: 'Köszönjük a regisztrációt!',
    downloadLink: 'https://elira.hu'
  }
};

export async function sendLeadMagnetEmail(
  to: string,
  name: string,
  magnetType: string
): Promise<{ success: boolean; error?: string }> {
  // Check if SendGrid is configured
  if (!sendgridApiKey) {
    console.log('SendGrid not configured - skipping email send');
    return { success: false, error: 'SendGrid not configured' };
  }

  // Get magnet configuration or use default
  const magnet = leadMagnetConfig[magnetType] || leadMagnetConfig['none'];
  
  const msg = {
    to,
    from: sendgridFromEmail,
    subject: magnet.subject,
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
            .content h2 {
              color: #1f2937;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .content h3 {
              color: #0d9488;
              font-size: 20px;
              margin: 20px 0;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .button { 
              display: inline-block; 
              padding: 16px 40px; 
              background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%); 
              color: white; 
              text-decoration: none; 
              border-radius: 30px; 
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
              transition: transform 0.2s;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .link-box {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              word-break: break-all;
              font-family: monospace;
              font-size: 14px;
              color: #6b7280;
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
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Köszönjük, ${name}! 🎉</h1>
            </div>
            
            <div class="content">
              <h2>Itt a kért anyagod:</h2>
              <h3>📚 ${magnet.title}</h3>
              
              <p>Örülünk, hogy csatlakoztál hozzánk! Az alábbi gombra kattintva azonnal letöltheted a kért anyagot:</p>
              
              <div class="button-container">
                <a href="${magnet.downloadLink}?utm_source=email&utm_medium=button&utm_campaign=${magnetType}&utm_content=${encodeURIComponent(to)}" class="button">
                  📥 Letöltés Most
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px;">
                <strong>Nem működik a gomb?</strong> Másold be ezt a linket a böngésződbe:
              </p>
              <div class="link-box">
                ${magnet.downloadLink}?utm_source=email&utm_medium=textlink&utm_campaign=${magnetType}&utm_content=${encodeURIComponent(to)}
              </div>
              
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
                Ha nem te kérted ezt az emailt, kérlek hagyd figyelmen kívül.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`SendGrid: Email sent successfully to ${to} (${magnetType})`);
    return { success: true };
  } catch (error: any) {
    console.error('SendGrid error:', error);
    
    // Log specific error details
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    
    return { 
      success: false, 
      error: error.message || 'Failed to send email' 
    };
  }
}

// Optional: Send welcome email without lead magnet
export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  return sendLeadMagnetEmail(to, name, 'none');
}