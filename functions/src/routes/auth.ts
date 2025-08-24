import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { RegisterRequest, RegisterResponse, GoogleAuthRequest } from '../../../src/types/auth';
import { sendLeadMagnetEmail } from '../services/sendgrid';

const db = admin.firestore();

// Helper function to link existing downloads to user account
async function linkExistingDownloads(email: string, uid: string): Promise<string[]> {
  try {
    // Query leads collection for matching emails
    const leadsQuery = db.collection('leads').where('email', '==', email);
    const leadsSnapshot = await leadsQuery.get();
    
    const linkedDownloadIds: string[] = [];
    
    // Update each lead to include the user ID
    const batch = db.batch();
    leadsSnapshot.forEach(doc => {
      batch.update(doc.ref, { 
        linkedUserId: uid,
        linkedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      linkedDownloadIds.push(doc.id);
    });
    
    if (!leadsSnapshot.empty) {
      await batch.commit();
    }
    
    return linkedDownloadIds;
  } catch (error) {
    console.error('Error linking downloads:', error);
    return [];
  }
}

// Helper function to create user document
async function createUserDocument(uid: string, userData: any, linkedDownloads: string[]) {
  const userDoc = {
    uid,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    courseAccess: false,
    linkedDownloads,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('users').doc(uid).set(userDoc);
  return userDoc;
}

// Register endpoint
export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password }: RegisterRequest = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
      return;
    }

    // Verify the user was created by Firebase Auth (they should include uid in request)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized - missing auth token'
      });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid auth token'
      });
      return;
    }

    const uid = decodedToken.uid;

    // Check if user document already exists
    const existingUser = await db.collection('users').doc(uid).get();
    if (existingUser.exists) {
      res.status(400).json({
        success: false,
        error: 'User already exists'
      });
      return;
    }

    // Link existing downloads
    const linkedDownloads = await linkExistingDownloads(email, uid);

    // Create user document in Firestore
    await createUserDocument(uid, { firstName, lastName, email }, linkedDownloads);

    // Send welcome email if they have linked downloads
    if (linkedDownloads.length > 0) {
      try {
        await sendLeadMagnetEmail(email, firstName, 'none');
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the registration for email issues
      }
    }

    const response: RegisterResponse = {
      success: true,
      uid,
      linkedDownloads: linkedDownloads.length > 0 ? linkedDownloads : undefined
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
};

// Google OAuth callback handler
export const googleCallbackHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken, email, firstName, lastName }: GoogleAuthRequest & {
      email: string;
      firstName: string;
      lastName: string;
    } = req.body;

    // Verify the Google ID token
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid Google token'
      });
      return;
    }

    const uid = decodedToken.uid;

    // Check if user document already exists
    const existingUser = await db.collection('users').doc(uid).get();
    
    if (existingUser.exists) {
      // Update last login for existing user
      await db.collection('users').doc(uid).update({
        lastLogin: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({
        success: true,
        uid,
        isNewUser: false
      });
      return;
    }

    // New user - link existing downloads and create profile
    const linkedDownloads = await linkExistingDownloads(email, uid);

    // Create user document
    await createUserDocument(uid, { firstName, lastName, email }, linkedDownloads);

    // Send welcome email
    if (linkedDownloads.length > 0) {
      try {
        await sendLeadMagnetEmail(email, firstName, 'none');
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
    }

    res.json({
      success: true,
      uid,
      isNewUser: true,
      linkedDownloads: linkedDownloads.length > 0 ? linkedDownloads : undefined
    });
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({
      success: false,
      error: 'Google authentication failed'
    });
  }
};

// Update last login
export const updateLoginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid } = req.body;

    if (!uid) {
      res.status(400).json({
        success: false,
        error: 'Missing uid'
      });
      return;
    }

    // Update last login timestamp
    await db.collection('users').doc(uid).update({
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Update login error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update login'
    });
  }
};