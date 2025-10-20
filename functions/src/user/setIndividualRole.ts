import * as admin from 'firebase-admin';
import { https } from 'firebase-functions/v2';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';

/**
 * Sets a user's role to STUDENT after individual account registration
 * This ensures individual users are properly distinguished from company users
 */
export const setIndividualUserRole = https.onCall(
  {
    region: 'europe-west1',
    memory: '256MiB'
  },
  async (request: CallableRequest): Promise<{ success: boolean }> => {
    // Verify authentication
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const userId = request.auth.uid;
    const auth = admin.auth();

    try {
      // Set custom claims to STUDENT role
      await auth.setCustomUserClaims(userId, {
        role: 'STUDENT'
      });

      console.log(`✅ Set STUDENT role for user ${userId}`);

      return { success: true };
    } catch (error: any) {
      console.error(`❌ Error setting STUDENT role for user ${userId}:`, error);
      throw new HttpsError('internal', error.message || 'Failed to set user role');
    }
  }
);
