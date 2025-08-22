// Get Discord webhook URL from environment variables
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

// Lead magnet display names in Hungarian
const magnetNames: Record<string, string> = {
  'chatgpt-prompts': '🤖 ChatGPT Prompt Gyűjtemény',
  'linkedin-calendar': '📈 30 Napos LinkedIn Naptár',
  'email-templates': '📧 Email Marketing Sablonok',
  'tiktok-guide': '🎬 TikTok Algoritmus Guide',
  'automation-workflows': '⚡ Marketing Automatizáció',
  'none': '📚 Általános tartalom'
};

// Job/Career display names
const jobNames: Record<string, string> = {
  'Marketing': '📊 Marketing',
  'IT/Fejlesztő': '💻 IT/Fejlesztő',
  'HR': '👥 HR',
  'Pénzügy': '💰 Pénzügy',
  'Értékesítés': '💼 Értékesítés',
  'Vezetői pozíció': '👔 Vezetői pozíció',
  'Diák': '🎓 Diák',
  'Egyéb': '🔄 Egyéb',
  'Not specified': '❓ Nem adta meg'
};

export async function sendDiscordNotification(
  name: string,
  magnetSelected: string,
  job?: string,
  education?: string
): Promise<{ success: boolean; error?: any }> {
  // Check if Discord webhook is configured
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Discord webhook URL not configured');
    return { success: false, error: 'Discord not configured' };
  }

  try {
    // Create a rich embed message
    const message = {
      content: null, // No plain text content, using embed
      embeds: [{
        title: "🎉 Új Elira Tag Csatlakozott!",
        description: `**${name}** most regisztrált és letöltötte az ingyenes anyagokat!`,
        color: 0x0d9488, // Teal color matching the brand
        fields: [
          {
            name: "👤 Név",
            value: name || 'Ismeretlen',
            inline: true
          },
          {
            name: "📚 Letöltött anyag",
            value: magnetNames[magnetSelected] || magnetSelected || 'Általános',
            inline: true
          },
          {
            name: "💼 Szakterület",
            value: jobNames[job || 'Not specified'] || job || 'Nem adta meg',
            inline: true
          },
          {
            name: "🎓 Végzettség",
            value: education || 'Nem adta meg',
            inline: true
          },
          {
            name: "⏰ Csatlakozás időpontja",
            value: new Date().toLocaleString('hu-HU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Budapest'
            }),
            inline: false
          }
        ],
        footer: {
          text: "Elira Landing Page • Automatikus értesítés",
          icon_url: "https://elira.hu/favicon.ico"
        },
        timestamp: new Date().toISOString(),
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/YOUR_CHANNEL/celebration.gif" // You can add a celebration GIF here
        }
      }],
      // Optional: Add components (buttons)
      components: [{
        type: 1,
        components: [
          {
            type: 2,
            style: 5, // Link button
            label: "Üdvözöld őt a Discord-on",
            url: "https://discord.gg/mcUyZXGERT",
            emoji: {
              name: "👋"
            }
          }
        ]
      }]
    };

    // Send to Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    // Discord returns 204 No Content on success
    if (response.ok || response.status === 204) {
      console.log('Discord notification sent successfully for:', name);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error(`Discord webhook failed: ${response.status} - ${errorText}`);
      return { 
        success: false, 
        error: `Discord webhook failed: ${response.status}`
      };
    }
  } catch (error) {
    console.error('Discord webhook error:', error);
    // Don't throw - this shouldn't break the main flow
    return { success: false, error };
  }
}

// Optional: Send a simple text notification (lighter version)
export async function sendSimpleDiscordNotification(
  message: string
): Promise<{ success: boolean; error?: any }> {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message
      })
    });

    if (response.ok || response.status === 204) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `Discord webhook failed: ${response.status}`
      };
    }
  } catch (error) {
    console.error('Discord webhook error:', error);
    return { success: false, error };
  }
}

// Send activity notification for other events
export async function sendDiscordActivity(
  type: 'download' | 'join_discord' | 'question',
  userName: string,
  details?: string
): Promise<{ success: boolean; error?: any }> {
  const activityMessages = {
    download: `📥 **${userName}** éppen letöltött egy anyagot`,
    join_discord: `💬 **${userName}** belépett a Discord szerverünkre!`,
    question: `❓ **${userName}** kérdést tett fel`
  };

  const colors = {
    download: 0x3b82f6, // Blue
    join_discord: 0x7c3aed, // Purple
    question: 0xf59e0b // Amber
  };

  try {
    const message = {
      embeds: [{
        description: activityMessages[type],
        color: colors[type],
        fields: details ? [{
          name: "Részletek",
          value: details,
          inline: false
        }] : [],
        footer: {
          text: `Elira • ${new Date().toLocaleTimeString('hu-HU', { timeZone: 'Europe/Budapest' })}`
        }
      }]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    return { 
      success: response.ok || response.status === 204 
    };
  } catch (error) {
    console.error('Discord activity notification error:', error);
    return { success: false, error };
  }
}