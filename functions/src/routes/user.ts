import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { UserProfileResponse, LinkDownloadsRequest } from '../../../src/types/auth';

const db = admin.firestore();

// Get user profile
export const getProfileHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid } = req.query;

    if (!uid || typeof uid !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid uid'
      });
      return;
    }

    // Get user document
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const userData = userDoc.data();
    if (!userData) {
      res.status(404).json({
        success: false,
        error: 'User data not found'
      });
      return;
    }

    // Format response
    const profile: UserProfileResponse = {
      uid: userData.uid,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      courseAccess: userData.courseAccess || false,
      linkedDownloads: userData.linkedDownloads || [],
      createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      lastLogin: userData.lastLogin?.toDate?.()?.toISOString() || new Date().toISOString()
    };

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile'
    });
  }
};

// Link additional downloads to user account
export const linkDownloadsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid, email }: LinkDownloadsRequest = req.body;

    if (!uid || !email) {
      res.status(400).json({
        success: false,
        error: 'Missing uid or email'
      });
      return;
    }

    // Verify user exists
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    // Find leads with this email that aren't already linked
    const leadsQuery = db.collection('leads')
      .where('email', '==', email)
      .where('linkedUserId', '==', null);
    
    const leadsSnapshot = await leadsQuery.get();
    
    if (leadsSnapshot.empty) {
      res.json({
        success: true,
        linkedCount: 0,
        message: 'No new downloads found to link'
      });
      return;
    }

    // Link the leads to the user
    const batch = db.batch();
    const newLinkedIds: string[] = [];

    leadsSnapshot.forEach(doc => {
      batch.update(doc.ref, {
        linkedUserId: uid,
        linkedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      newLinkedIds.push(doc.id);
    });

    // Update user's linked downloads list
    const currentUser = userDoc.data();
    const existingLinkedDownloads = currentUser?.linkedDownloads || [];
    const updatedLinkedDownloads = [...existingLinkedDownloads, ...newLinkedIds];

    batch.update(userDoc.ref, {
      linkedDownloads: updatedLinkedDownloads
    });

    await batch.commit();

    res.json({
      success: true,
      linkedCount: newLinkedIds.length,
      totalLinked: updatedLinkedDownloads.length
    });
  } catch (error) {
    console.error('Link downloads error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to link downloads'
    });
  }
};

// Update user profile
export const updateProfileHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid, updates } = req.body;

    if (!uid) {
      res.status(400).json({
        success: false,
        error: 'Missing uid'
      });
      return;
    }

    // Allowed fields to update
    const allowedUpdates = ['firstName', 'lastName'];
    const sanitizedUpdates: any = {};

    for (const [key, value] of Object.entries(updates)) {
      if (allowedUpdates.includes(key) && typeof value === 'string') {
        sanitizedUpdates[key] = value;
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      res.status(400).json({
        success: false,
        error: 'No valid updates provided'
      });
      return;
    }

    // Update user document
    await db.collection('users').doc(uid).update({
      ...sanitizedUpdates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
};