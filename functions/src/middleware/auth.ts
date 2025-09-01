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
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      
      if (idToken) {
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          (req as any).user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            emailVerified: decodedToken.email_verified,
          };
        } catch (error) {
          console.warn('⚠️ Optional auth failed, continuing without user:', error);
        }
      }
    }
    
    next();
  } catch (error) {
    console.error('💥 Optional auth middleware error:', error);
    next(); // Continue even if optional auth fails
  }
};