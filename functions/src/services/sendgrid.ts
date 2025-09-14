import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL || 'info@elira.hu';

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Lead magnet configurations with actual Google Drive links - EXACTLY matching VideoSelectionModal
const leadMagnetConfig: Record<string, { subject: string; title: string; downloadLink: string }> = {
  // Video Modal Options - IDs and links must match VideoSelectionModal.tsx exactly
  'target-audience': {
    subject: '🎯 Ingyenes videó: Pontos célzás, biztos találat!',
    title: 'Pontos célzás, biztos találat találj célba a célcsoportodnál',
    downloadLink: 'https://drive.google.com/file/d/1mTNEST9mCDkIRQQ_l9XKY4iI8tQVbLzt/view?usp=sharing'
  },
  'know-customer': {
    subject: '🤝 Ingyenes videó: Alkoss hidat közted és a vevő között!',
    title: 'Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet',
    downloadLink: 'https://drive.google.com/file/d/1hrsgXjFcsXXrP6HZWaPS4scQebIL_wMT/view?usp=sharing'
  },
  'market-research': {
    subject: '🗺️ Ingyenes videó: Ha nem ismered a vevődet, elveszíted a piacot!',
    title: 'Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!',
    downloadLink: 'https://drive.google.com/file/d/11sLzjKUcK4QDTBxPeRLA878RR4L7Ch6b/view?usp=sharing'
  },
  'psychology': {
    subject: '❤️ Ingyenes videó: Érintsd meg a szívét, aztán a fejét!',
    title: 'Érintsd meg a szívét, aztán a fejét - így nyersz örökre vásárlót',
    downloadLink: 'https://drive.google.com/file/d/1j_TG2D-sNC8gui8lXTAH9xbcUazDNXyP/view?usp=sharing'
  },
  'email-marketing': {
    subject: '📧 Ingyenes videó: A piac nem vár - AI E-mail marketing!',
    title: 'A piac nem vár - így használd az AI-t E-mail marketingre, hogy te legyél a győztes',
    downloadLink: 'https://drive.google.com/file/d/1o8pzoGq2sXP3Z4SkVnK8fGJUJaE9J7LO/view?usp=sharing'
  },
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

// Special function for video modal emails with enhanced template
export async function sendVideoEmail(
  to: string,
  name: string,
  magnetType: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  // Check if SendGrid is configured
  if (!sendgridApiKey) {
    console.log('SendGrid not configured - skipping email send');
    return { success: false, error: 'SendGrid not configured' };
  }

  // Get magnet configuration or use default
  const magnet = leadMagnetConfig[magnetType] || leadMagnetConfig['none'];
  
  console.log(`[SendGrid] Sending video email for magnetType: ${magnetType}`);
  console.log(`[SendGrid] Using video data:`, {
    title: magnet.title,
    downloadLink: magnet.downloadLink
  });
  
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
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header { 
              background: #1a1a1a;
              color: #ffffff; 
              padding: 20px; 
              text-align: center;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .content { 
              padding: 30px 25px; 
            }
            .video-title {
              font-size: 20px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 20px 0;
              line-height: 1.4;
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .button { 
              display: inline-block; 
              padding: 12px 30px; 
              background: #e60012; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: 500;
              font-size: 16px;
            }
            .direct-link {
              background: #f8f9fa;
              border: 1px solid #dee2e6;
              border-radius: 4px;
              padding: 15px;
              margin: 20px 0;
              font-family: monospace;
              font-size: 14px;
              color: #495057;
              word-break: break-all;
            }
            .footer { 
              text-align: center; 
              padding: 20px; 
              background: #f8f9fa;
              color: #6c757d; 
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">ELIRA</div>
              <div>elira.hu</div>
            </div>
            
            <div class="content">
              <p>Szia ${name}!</p>
              
              <p>Itt a videód amit kértél:</p>
              
              <div class="video-title">${magnet.title}</div>
              
              <div class="button-container">
                <a href="${magnet.downloadLink}" class="button">
                  Videó megtekintése
                </a>
              </div>
              
              <p><strong>Közvetlen link:</strong></p>
              <div class="direct-link">
                ${magnet.downloadLink}
              </div>
              
              <p>Üdv,<br>Elira</p>
            </div>
            
            <div class="footer">
              <p>elira.hu | info@elira.hu</p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`SendGrid: Video email sent successfully to ${to} (${magnetType})`);
    return { success: true };
  } catch (error: any) {
    console.error('SendGrid video email error:', error);
    
    // Log specific error details
    if (error.response) {
      console.error('SendGrid response error:', error.response.body);
    }
    
    return { 
      success: false, 
      error: error.message || 'Failed to send video email' 
    };
  }
}

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
              font-family: Georgia, 'Times New Roman', Times, serif; 
              line-height: 1.7; 
              color: #2d3748; 
              margin: 0;
              padding: 0;
              background-color: #f7fafc;
            }
            .container { 
              max-width: 650px; 
              margin: 0 auto; 
              background: #ffffff;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
              border: 1px solid #e2e8f0;
            }
            .header { 
              background: #1a202c;
              color: #ffffff; 
              padding: 50px 40px; 
              text-align: center; 
              border-bottom: 3px solid #c6181e;
            }
            .header-crest {
              width: 60px;
              height: 60px;
              margin: 0 auto 20px;
              background: #c6181e;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 28px;
              font-weight: bold;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 400;
              letter-spacing: -0.5px;
              font-family: Georgia, serif;
            }
            .header-subtitle {
              font-size: 16px;
              color: #cbd5e0;
              margin-top: 8px;
              font-style: italic;
            }
            .content { 
              padding: 50px 40px; 
            }
            .salutation {
              font-size: 18px;
              color: #2d3748;
              margin-bottom: 30px;
              font-style: italic;
            }
            .academic-seal {
              text-align: center;
              margin: 40px 0;
              padding: 30px;
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
              border: 2px solid #c6181e;
              border-radius: 8px;
            }
            .seal-icon {
              font-size: 48px;
              margin-bottom: 15px;
              display: block;
            }
            .resource-title {
              font-size: 24px;
              font-weight: 500;
              color: #1a202c;
              margin: 20px 0;
              font-family: Georgia, serif;
              line-height: 1.4;
            }
            .academic-note {
              background: #fffbf0;
              border-left: 4px solid #ed8936;
              padding: 20px;
              margin: 30px 0;
              font-style: italic;
              color: #744210;
            }
            .button-container {
              text-align: center;
              margin: 40px 0;
            }
            .button { 
              display: inline-block; 
              padding: 18px 40px; 
              background: #c6181e; 
              color: white; 
              text-decoration: none; 
              border-radius: 6px; 
              font-weight: 500;
              font-size: 17px;
              font-family: Georgia, serif;
              letter-spacing: 0.5px;
              border: 1px solid #a0171c;
              transition: all 0.3s ease;
            }
            .button:hover {
              background: #a0171c;
              box-shadow: 0 5px 15px rgba(198, 24, 30, 0.3);
            }
            .link-reference {
              background: #f7fafc;
              border: 1px solid #e2e8f0;
              border-radius: 4px;
              padding: 20px;
              margin: 25px 0;
              font-family: 'Courier New', monospace;
              font-size: 13px;
              color: #4a5568;
              word-break: break-all;
            }
            .academic-recommendations {
              background: #e6fffa;
              border: 1px solid #81e6d9;
              border-radius: 6px;
              padding: 25px;
              margin: 35px 0;
            }
            .academic-recommendations h4 {
              color: #234e52;
              margin-top: 0;
              font-size: 18px;
              font-weight: 500;
            }
            .academic-recommendations ul {
              margin: 15px 0;
              padding-left: 25px;
            }
            .academic-recommendations li {
              margin: 15px 0;
              line-height: 1.6;
            }
            .academic-recommendations a {
              color: #234e52;
              font-weight: 500;
              text-decoration: underline;
            }
            .signature-block {
              margin-top: 50px;
              padding-top: 30px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
            }
            .signature-block p {
              margin: 8px 0;
              color: #4a5568;
            }
            .footer { 
              text-align: center; 
              padding: 40px 30px; 
              background: #1a202c;
              color: #cbd5e0; 
              font-size: 14px; 
            }
            .footer p {
              margin: 8px 0;
            }
            .footer-seal {
              width: 40px;
              height: 40px;
              background: #c6181e;
              border-radius: 50%;
              margin: 0 auto 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
            }
            @media (max-width: 650px) {
              .content, .header {
                padding: 30px 20px;
              }
              .academic-seal {
                padding: 20px 15px;
              }
              .resource-title {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-crest">E</div>
              <h1>ELIRA ACADEMY</h1>
              <div class="header-subtitle">Advanced Marketing & Business Strategy Institute</div>
            </div>
            
            <div class="content">
              <div class="salutation">Kedves ${name},</div>
              
              <p>Köszönjük érdeklődését az Elira Academy oktatási programjai iránt. Az Ön által kért szakmai anyag elkészült és rendelkezésére áll.</p>
              
              <div class="academic-seal">
                <div class="seal-icon">📚</div>
                <div class="resource-title">${magnet.title}</div>
                <p style="margin: 15px 0; color: #4a5568; font-weight: 500;">
                  Professzionális Üzletfejlesztési Anyag
                </p>
              </div>
              
              <div class="academic-note">
                <strong>Szakmai megjegyzés:</strong> Ez az anyag az Elira Academy kutatási és fejlesztési programjának eredménye. A tartalom gyakorlati alkalmazásra készült, és azonnali implementációt tesz lehetővé az Ön üzleti területén.
              </div>
              
              <p>Az anyag azonnali letöltése az alábbi hivatkozás segítségével:</p>
              
              <div class="button-container">
                <a href="${magnet.downloadLink}?utm_source=email&utm_medium=button&utm_campaign=${magnetType}&utm_content=${encodeURIComponent(to)}" class="button">
                  ANYAG LETÖLTÉSE
                </a>
              </div>
              
              <p style="color: #4a5568; font-size: 15px; text-align: center;">
                <strong>Alternatív elérhetőség:</strong>
              </p>
              <div class="link-reference">
                ${magnet.downloadLink}?utm_source=email&utm_medium=textlink&utm_campaign=${magnetType}&utm_content=${encodeURIComponent(to)}
              </div>
              
              <div class="academic-recommendations">
                <h4>🎯 Ajánlott Következő Lépések</h4>
                <ul>
                  <li>
                    <strong>Csatlakozzon szakmai közösségünkhöz</strong><br>
                    1000+ marketing szakember és üzlettulajdonos aktív közössége<br>
                    <a href="https://discord.gg/mcUyZXGERT">→ Discord Közösség</a>
                  </li>
                  <li>
                    <strong>Kövesse szakmai aktivitásainkat</strong><br>
                    Naprakész iparági információk és esettanulmányok<br>
                    <a href="https://linkedin.com/company/elira">→ LinkedIn Oldal</a>
                  </li>
                  <li>
                    <strong>Implementálja a megszerzett tudást</strong><br>
                    A letöltött anyagok gyakorlati alkalmazása az Ön vállalkozásában
                  </li>
                </ul>
              </div>
              
              <div class="signature-block">
                <p><strong>Tisztelettel,</strong></p>
                <p><strong>Az Elira Academy Szakmai Csapata</strong></p>
                <p style="font-style: italic; color: #4a5568;">Advanced Marketing & Business Strategy Institute</p>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-seal">E</div>
              <p><strong>ELIRA ACADEMY</strong></p>
              <p>Advanced Marketing & Business Strategy Institute</p>
              <p style="margin-top: 20px;">
                Email: info@elira.hu | Web: elira.hu
              </p>
              <p style="font-size: 12px; margin-top: 20px; color: #9ca3af;">
                © 2025 Elira Academy - Minden jog fenntartva<br>
                Ez az email az Ön kérésére lett elküldve. Ha nem Ön kérte, kérjük hagyja figyelmen kívül.
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