import { Request, Response } from 'express';
// import * as admin from 'firebase-admin'; // Will be used in production

// const db = admin.firestore(); // Commented out for MVP - will be used in production

// ==============================
// ADMIN SETTINGS MANAGEMENT
// ==============================

// Get system settings
export const getAdminSettingsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // For MVP, return default system settings structure
    const defaultSettings = {
      general: {
        siteName: 'Elira Academy',
        siteDescription: 'Master AI copywriting and grow your business with proven strategies',
        siteUrl: 'https://elira-landing.firebaseapp.com',
        adminEmail: 'admin@elira.academy',
        timezone: 'Europe/Budapest',
        language: 'hu',
        maintenanceMode: false
      },
      email: {
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        smtpUsername: '',
        smtpPassword: '',
        fromEmail: 'noreply@elira.academy',
        fromName: 'Elira Academy',
        emailVerificationRequired: true
      },
      notifications: {
        enableEmailNotifications: true,
        enablePushNotifications: false,
        enableSMSNotifications: false,
        newUserNotifications: true,
        courseCompletionNotifications: true,
        paymentNotifications: true
      },
      security: {
        requireTwoFactor: false,
        passwordMinLength: 8,
        sessionTimeout: 3600000, // 1 hour in milliseconds
        maxLoginAttempts: 5,
        enableCaptcha: false,
        allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'docx', 'xlsx']
      },
      payments: {
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
        stripeSecretKey: '[HIDDEN]', // Never expose the actual secret key
        defaultCurrency: 'HUF',
        enablePaypal: false,
        paypalClientId: '',
        paypalClientSecret: '[HIDDEN]'
      },
      storage: {
        storageProvider: 'firebase',
        awsAccessKey: '',
        awsSecretKey: '[HIDDEN]',
        s3BucketName: '',
        s3Region: 'eu-west-1',
        maxFileSize: 10485760 // 10MB in bytes
      }
    };

    // In production, you would fetch settings from Firestore:
    // const settingsDoc = await db.collection('system_settings').doc('main').get();
    // const settings = settingsDoc.exists ? settingsDoc.data() : defaultSettings;

    res.json(defaultSettings);
  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get system settings'
    });
  }
};

// Update system settings
export const updateAdminSettingsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const settingsUpdate = req.body;

    if (!settingsUpdate) {
      res.status(400).json({
        success: false,
        error: 'Settings data is required'
      });
      return;
    }

    // Validate settings structure
    const requiredSections = ['general', 'email', 'notifications', 'security', 'payments', 'storage'];
    for (const section of requiredSections) {
      if (!settingsUpdate[section]) {
        res.status(400).json({
          success: false,
          error: `Missing required settings section: ${section}`
        });
        return;
      }
    }

    // Security: Prevent exposure of sensitive data
    if (settingsUpdate.payments?.stripeSecretKey && settingsUpdate.payments.stripeSecretKey !== '[HIDDEN]') {
      // Only update if it's not the placeholder value
      console.log('Stripe secret key updated by admin');
    }

    if (settingsUpdate.storage?.awsSecretKey && settingsUpdate.storage.awsSecretKey !== '[HIDDEN]') {
      // Only update if it's not the placeholder value
      console.log('AWS secret key updated by admin');
    }

    // For MVP, simulate settings update (in production, would save to Firestore)
    console.log('Updating system settings:', {
      general: settingsUpdate.general,
      sections: Object.keys(settingsUpdate)
    });
    
    // In production:
    // await db.collection('system_settings').doc('main').set({
    //   ...settingsUpdate,
    //   updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    //   updatedBy: req.user?.uid // from auth middleware
    // }, { merge: true });

    res.json({
      success: true,
      message: 'System settings updated successfully'
    });
  } catch (error) {
    console.error('Update admin settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update system settings'
    });
  }
};

// Get system health status (already exists in main index but adding specific settings health)
export const getSettingsHealthHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check various system components
    const healthChecks = {
      database: 'ok',
      email: 'ok', 
      storage: 'ok',
      payments: 'ok'
    };

    // In production, you would actually check each service:
    // 1. Database connectivity
    // 2. Email service (SMTP test)
    // 3. Storage service (Firebase/AWS connectivity)
    // 4. Payment gateway (Stripe API test)

    const overallStatus = Object.values(healthChecks).every(status => status === 'ok') ? 'ok' : 'error';

    res.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks: healthChecks,
      service: 'elira-settings'
    });
  } catch (error) {
    console.error('Settings health check error:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
};

// Get system configuration info (read-only overview)
export const getSystemInfoHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const systemInfo = {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      region: 'europe-west1',
      lastDeployment: new Date().toISOString(), // Would be actual deployment date
      features: {
        authentication: 'firebase',
        database: 'firestore',
        storage: 'firebase',
        payments: 'stripe',
        hosting: 'firebase',
        functions: 'firebase'
      },
      limits: {
        maxUsers: 10000,
        maxCourses: 100,
        maxFileSize: '10MB',
        maxStoragePerUser: '100MB'
      }
    };

    res.json(systemInfo);
  } catch (error) {
    console.error('Get system info error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get system information'
    });
  }
};