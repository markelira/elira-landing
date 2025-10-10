import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

/**
 * Authentication middleware that extracts user info from Firebase auth token
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('🔒 Authentication middleware running...');
    console.log('🌍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      AUTH_EMULATOR: process.env.FIREBASE_AUTH_EMULATOR_HOST,
      GCLOUD_PROJECT: process.env.GCLOUD_PROJECT
    });
    
    const authHeader = req.headers.authorization;
    console.log('🔑 Auth header present:', !!authHeader);
    console.log('🔑 Auth header preview:', authHeader?.substring(0, 50) + '...');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ Missing or invalid auth header format');
      res.status(401).json({
        success: false,
        error: 'Authentication required - missing or invalid token format'
      });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];
    console.log('🎟️ ID token extracted, length:', idToken?.length);
    console.log('🎟️ Token preview:', idToken?.substring(0, 50) + '...');
    
    if (!idToken) {
      console.warn('⚠️ Empty ID token');
      res.status(401).json({
        success: false,
        error: 'Authentication required - empty token'
      });
      return;
    }

    try {
      console.log('🔍 Verifying Firebase ID token...');
      console.log('🔧 Firebase Admin Auth instance:', typeof admin.auth());
      
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('✅ Token verified successfully for user:', decodedToken.uid);
      console.log('🎫 Decoded token details:', {
        uid: decodedToken.uid,
        email: decodedToken.email,
        iss: decodedToken.iss,
        aud: decodedToken.aud
      });
      
      // Add user info to request object
      (req as any).user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        authTime: decodedToken.auth_time,
        iss: decodedToken.iss,
        aud: decodedToken.aud,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
      };
      
      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      console.error('❌ Error details:', {
        message: (error as any).message,
        code: (error as any).code,
        type: typeof error
      });
      res.status(401).json({
        success: false,
        error: 'Invalid or expired authentication token'
      });
      return;
    }
  } catch (error) {
    console.error('💥 Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication service error'
    });
    return;
  }
};

/**
 * Optional authentication middleware - allows requests with or without auth
 * SECURITY: Always verifies tokens in production
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];

      if (idToken) {
        try {
          // SECURITY: Always verify tokens in production
          if (process.env.NODE_ENV === 'production') {
            // Production: ALWAYS verify token signature
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log('✅ Production token verified for user:', decodedToken.uid);
            (req as any).user = {
              uid: decodedToken.uid,
              email: decodedToken.email,
              emailVerified: decodedToken.email_verified,
            };
          } else {
            // Development: Only decode without verification if explicitly in emulator mode
            const isEmulator = process.env.FIREBASE_AUTH_EMULATOR_HOST &&
                              process.env.NODE_ENV === 'development';

            if (isEmulator) {
              console.warn('⚠️ DEVELOPMENT MODE: Using emulator - tokens not cryptographically verified');
              const decoded = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
              (req as any).user = {
                uid: decoded.uid || decoded.user_id,
                email: decoded.email,
                emailVerified: decoded.email_verified,
              };
            } else {
              // Verify token even in development if not in emulator
              const decodedToken = await admin.auth().verifyIdToken(idToken);
              console.log('✅ Development token verified for user:', decodedToken.uid);
              (req as any).user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified,
              };
            }
          }
        } catch (error) {
          console.warn('⚠️ Optional auth failed, continuing without user');
          // Don't log error details in production
          if (process.env.NODE_ENV !== 'production') {
            console.warn('⚠️ Error details:', {
              message: (error as any).message,
              code: (error as any).code
            });
          }
        }
      }
    }

    next();
  } catch (error) {
    console.error('💥 Optional auth middleware error');
    // Don't expose error details in production
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    next(); // Continue even if optional auth fails
  }
};