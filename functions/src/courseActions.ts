/**
 * Course Management Cloud Functions
 * Simplified version for course creation wizard integration
 */

import * as admin from 'firebase-admin';
import { https } from 'firebase-functions/v2';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import Mux from '@mux/mux-node';
import { z } from 'zod';

// Initialize services
const db = admin.firestore();

// Initialize Mux client (with environment check)
const muxClient = process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET 
  ? new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    })
  : null;

// Validation schemas (keeping for potential future use)

const CoursePublishSchema = z.object({
  courseId: z.string().min(1),
  publishedAt: z.date().optional(),
});

const CourseDeleteSchema = z.object({
  courseId: z.string().min(1),
  confirmTitle: z.string().min(1),
});

// Helper function to check user permissions
async function checkUserPermissions(
  uid: string,
  requiredRoles: string[] = ['ADMIN', 'INSTRUCTOR']
): Promise<{ user: any; hasPermission: boolean }> {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = userDoc.data();
    
    if (!userData) {
      return { user: null, hasPermission: false };
    }

    const hasPermission = requiredRoles.includes(userData.role);
    return { user: userData, hasPermission };
  } catch (error) {
    console.error('Error checking user permissions:', error);
    return { user: null, hasPermission: false };
  }
}

/**
 * Create a new course (simplified version)
 */
export const createCourse = https.onCall(
  { 
    region: 'europe-west1',
    memory: '1GiB',
    timeoutSeconds: 540,
  },
  async (request: CallableRequest): Promise<{ success: boolean; courseId?: string; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      // Permission check
      const { hasPermission } = await checkUserPermissions(request.auth.uid);
      if (!hasPermission) {
        throw new HttpsError('permission-denied', 'Nincs jogosultságod kurzus létrehozásához');
      }

      // Basic validation
      const { basicInfo, modules, lessons, settings } = request.data;
      
      if (!basicInfo?.title) {
        throw new HttpsError('invalid-argument', 'Kurzus címe kötelező');
      }

      // Create course document
      const courseRef = db.collection('courses').doc();
      const courseId = courseRef.id;
      const now = admin.firestore.Timestamp.now();

      // Prepare simplified course data
      const course = {
        id: courseId,
        basicInfo: {
          title: basicInfo.title,
          slug: basicInfo.slug || basicInfo.title.toLowerCase().replace(/\s+/g, '-'),
          description: basicInfo.description || '',
          shortDescription: basicInfo.shortDescription,
          categoryId: basicInfo.categoryId,
          subcategoryId: basicInfo.subcategoryId,
          tags: basicInfo.tags || [],
          language: basicInfo.language || 'hu',
          difficulty: basicInfo.difficulty || 'BEGINNER',
          thumbnailUrl: basicInfo.thumbnailUrl,
          previewVideoUrl: basicInfo.previewVideoUrl,
        },
        publishing: {
          status: 'DRAFT',
          createdAt: now,
          updatedAt: now,
          instructorId: request.auth.uid,
          pricing: settings?.isFree ? 
            { isFree: true, price: 0, currency: 'HUF' } :
            { isFree: false, price: settings?.price || 0, currency: settings?.currency || 'HUF' },
          settings: {
            visibility: settings?.visibility || 'PUBLIC',
            allowComments: true,
            allowReviews: true,
            showProgress: true,
          },
          enrollment: {
            maxStudents: settings?.maxStudents,
            currentStudents: 0,
          },
          certificate: {
            enabled: settings?.certificateEnabled || false,
            passingGrade: 70,
          },
        },
        curriculum: {
          totalModules: modules?.length || 0,
          totalLessons: Object.values(lessons || {}).flat().length,
        },
        metadata: {
          objectives: settings?.objectives || [],
          prerequisites: settings?.prerequisites || [],
        },
        stats: {
          views: 0,
          enrollments: 0,
          completions: 0,
          averageRating: 0,
          totalReviews: 0,
          lastActivityAt: now,
        },
      };

      // Save to Firestore
      await courseRef.set(course);

      console.log(`Course created successfully: ${courseId}`);
      return { success: true, courseId };

    } catch (error) {
      console.error('Error creating course:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Kurzus létrehozása sikertelen');
    }
  }
);

/**
 * Update an existing course
 */
export const updateCourse = https.onCall(
  { 
    region: 'europe-west1',
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (request: CallableRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { courseId, ...updateData } = request.data;
      
      if (!courseId) {
        throw new HttpsError('invalid-argument', 'Kurzus azonosító szükséges');
      }

      // Get course and check permissions
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
      
      if (!courseDoc.exists) {
        throw new HttpsError('not-found', 'Kurzus nem található');
      }

      const courseData = courseDoc.data();
      
      // Check if user owns the course or is admin
      const { hasPermission } = await checkUserPermissions(request.auth.uid);
      if (!hasPermission && courseData?.publishing?.instructorId !== request.auth.uid) {
        throw new HttpsError('permission-denied', 'Nincs jogosultságod a kurzus szerkesztéséhez');
      }

      // Update the course
      await courseRef.update({
        ...updateData,
        'publishing.updatedAt': admin.firestore.Timestamp.now(),
      });

      console.log(`Course updated successfully: ${courseId}`);
      return { success: true };

    } catch (error) {
      console.error('Error updating course:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Kurzus frissítése sikertelen');
    }
  }
);

/**
 * Publish a course
 */
export const publishCourse = https.onCall(
  { 
    region: 'europe-west1',
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (request: CallableRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      // Validate input
      const validationResult = CoursePublishSchema.safeParse(request.data);
      if (!validationResult.success) {
        throw new HttpsError('invalid-argument', 'Érvénytelen adatok');
      }

      const { courseId, publishedAt } = validationResult.data;

      // Get course and check permissions
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
      
      if (!courseDoc.exists) {
        throw new HttpsError('not-found', 'Kurzus nem található');
      }

      const courseData = courseDoc.data();
      
      // Check permissions
      const { hasPermission } = await checkUserPermissions(request.auth.uid);
      if (!hasPermission && courseData?.publishing?.instructorId !== request.auth.uid) {
        throw new HttpsError('permission-denied', 'Nincs jogosultságod a kurzus közzétételéhez');
      }

      // Update course status
      await courseRef.update({
        'publishing.status': 'PUBLISHED',
        'publishing.publishedAt': publishedAt ? admin.firestore.Timestamp.fromDate(publishedAt) : admin.firestore.Timestamp.now(),
        'publishing.updatedAt': admin.firestore.Timestamp.now(),
      });

      console.log(`Course published successfully: ${courseId}`);
      return { success: true };

    } catch (error) {
      console.error('Error publishing course:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Kurzus közzététele sikertelen');
    }
  }
);

/**
 * Delete a course
 */
export const deleteCourse = https.onCall(
  { 
    region: 'europe-west1',
    memory: '1GiB',
    timeoutSeconds: 300,
  },
  async (request: CallableRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      // Validate input
      const validationResult = CourseDeleteSchema.safeParse(request.data);
      if (!validationResult.success) {
        throw new HttpsError('invalid-argument', 'Érvénytelen adatok');
      }

      const { courseId, confirmTitle } = validationResult.data;

      // Get course and check permissions
      const courseRef = db.collection('courses').doc(courseId);
      const courseDoc = await courseRef.get();
      
      if (!courseDoc.exists) {
        throw new HttpsError('not-found', 'Kurzus nem található');
      }

      const courseData = courseDoc.data();
      
      // Verify title confirmation
      if (confirmTitle !== courseData?.basicInfo?.title) {
        throw new HttpsError('invalid-argument', 'A kurzus címének megerősítése nem megfelelő');
      }

      // Check permissions
      const { hasPermission } = await checkUserPermissions(request.auth.uid);
      if (!hasPermission && courseData?.publishing?.instructorId !== request.auth.uid) {
        throw new HttpsError('permission-denied', 'Nincs jogosultságod a kurzus törléséhez');
      }

      // Delete course
      await courseRef.delete();

      console.log(`Course deleted successfully: ${courseId}`);
      return { success: true };

    } catch (error) {
      console.error('Error deleting course:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Kurzus törlése sikertelen');
    }
  }
);

/**
 * Get courses by instructor
 */
export const getCoursesByInstructor = https.onCall(
  { 
    region: 'europe-west1',
    memory: '512MiB',
    timeoutSeconds: 30,
  },
  async (request: CallableRequest): Promise<{ success: boolean; courses?: any[]; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { instructorId } = request.data;
      
      // Use current user if no instructorId provided
      const targetInstructorId = instructorId || request.auth.uid;

      // Check permissions (users can only see their own courses unless admin)
      if (targetInstructorId !== request.auth.uid) {
        const { hasPermission } = await checkUserPermissions(request.auth.uid, ['ADMIN']);
        if (!hasPermission) {
          throw new HttpsError('permission-denied', 'Nincs jogosultságod mások kurzusainak megtekintéséhez');
        }
      }

      // Build query
      const query = db.collection('courses')
        .where('publishing.instructorId', '==', targetInstructorId)
        .orderBy('publishing.updatedAt', 'desc')
        .limit(20);

      // Execute query
      const snapshot = await query.get();
      const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return { success: true, courses };

    } catch (error) {
      console.error('Error getting courses by instructor:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Kurzusok lekérése sikertelen');
    }
  }
);

/**
 * Get Mux upload URL
 */
export const getMuxUploadUrl = https.onCall(
  { 
    region: 'europe-west1',
    memory: '256MiB',
    timeoutSeconds: 30,
  },
  async (request: CallableRequest): Promise<{ success: boolean; url?: string; id?: string; assetId?: string; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      // Check permissions
      const { hasPermission } = await checkUserPermissions(request.auth.uid);
      if (!hasPermission) {
        throw new HttpsError('permission-denied', 'Nincs jogosultságod videó feltöltéshez');
      }

      // Check if Mux is configured
      if (!muxClient) {
        // Return test URL for development
        const testId = `test_${Date.now()}`;
        return {
          success: true,
          url: `http://localhost:5001/elira-landing-ce927/europe-west1/api/testVideoUpload`,
          id: testId,
          assetId: testId,
        };
      }

      // Create Mux upload
      const upload = await muxClient.video.uploads.create({
        cors_origin: process.env.FRONTEND_URL || '*',
        new_asset_settings: {
          playback_policy: ['public'],
          mp4_support: 'standard',
        },
      });

      return {
        success: true,
        url: upload.url,
        id: upload.id,
        assetId: upload.id,
      };

    } catch (error) {
      console.error('Error creating Mux upload URL:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Videó feltöltés inicializálása sikertelen');
    }
  }
);

/**
 * Get Mux asset status
 */
export const getMuxAssetStatus = https.onCall(
  { 
    region: 'europe-west1',
    memory: '256MiB',
    timeoutSeconds: 10,
  },
  async (request: CallableRequest): Promise<{ success: boolean; status?: string; playbackId?: string; errors?: any[]; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { assetId } = request.data;
      
      if (!assetId) {
        throw new HttpsError('invalid-argument', 'Asset ID szükséges');
      }

      // Check if it's a test asset
      if (assetId.startsWith('test_')) {
        return {
          success: true,
          status: 'ready',
          playbackId: `mock_playback_${assetId}`,
          errors: [],
        };
      }

      // Check if Mux is configured
      if (!muxClient) {
        throw new HttpsError('unavailable', 'Mux nincs beállítva');
      }

      // Get asset from Mux
      const asset = await muxClient.video.assets.retrieve(assetId);

      return {
        success: true,
        status: asset.status,
        playbackId: asset.playback_ids?.[0]?.id,
        errors: Array.isArray(asset.errors) ? asset.errors : [],
      };

    } catch (error) {
      console.error('Error getting Mux asset status:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Asset státusz lekérése sikertelen');
    }
  }
);

/**
 * Test video upload for development
 */
export const testVideoUpload = https.onCall(
  { 
    region: 'europe-west1',
    memory: '256MiB',
    timeoutSeconds: 5,
  },
  async (request: CallableRequest): Promise<{ success: boolean; assetId?: string; playbackId?: string; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { assetId } = request.data;

      // Simulate successful upload
      const mockPlaybackId = `mock_playback_${Date.now()}`;

      console.log('🧪 Test video upload simulation:', { assetId, playbackId: mockPlaybackId });

      return {
        success: true,
        assetId: assetId || `mock_asset_${Date.now()}`,
        playbackId: mockPlaybackId,
      };

    } catch (error) {
      console.error('Error in test video upload:', error);
      throw new HttpsError('internal', 'Test videó feltöltés sikertelen');
    }
  }
);

/**
 * Process uploaded file (placeholder)
 */
export const processUploadedFile = https.onCall(
  { 
    region: 'europe-west1',
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (request: CallableRequest): Promise<{ success: boolean; metadata?: any; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { filePath, fileType } = request.data;
      
      if (!filePath || !fileType) {
        throw new HttpsError('invalid-argument', 'Fájl elérési út és típus szükséges');
      }

      // Basic metadata
      const metadata = {
        filePath,
        fileType,
        processedAt: admin.firestore.Timestamp.now(),
        processedBy: request.auth.uid,
      };

      return {
        success: true,
        metadata,
      };

    } catch (error) {
      console.error('Error processing uploaded file:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Fájl feldolgozása sikertelen');
    }
  }
);

/**
 * Generate course completion certificate (placeholder)
 */
export const generateCourseCertificate = https.onCall(
  { 
    region: 'europe-west1',
    memory: '1GiB',
    timeoutSeconds: 120,
  },
  async (request: CallableRequest): Promise<{ success: boolean; certificateUrl?: string; certificateId?: string; error?: string }> => {
    try {
      // Authentication check
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Hitelesítés szükséges');
      }

      const { courseId, studentId } = request.data;
      
      if (!courseId || !studentId) {
        throw new HttpsError('invalid-argument', 'Kurzus és diák azonosító szükséges');
      }

      // Check if user is requesting their own certificate or is admin
      if (studentId !== request.auth.uid) {
        const { hasPermission } = await checkUserPermissions(request.auth.uid, ['ADMIN']);
        if (!hasPermission) {
          throw new HttpsError('permission-denied', 'Nincs jogosultságod mások tanúsítványához');
        }
      }

      // Generate certificate placeholder
      const certificateId = `cert_${courseId}_${studentId}_${Date.now()}`;
      const certificateUrl = `https://certificates.example.com/${certificateId}.pdf`;

      console.log(`Certificate generated (placeholder): ${certificateId}`);
      
      return {
        success: true,
        certificateUrl,
        certificateId,
      };

    } catch (error) {
      console.error('Error generating certificate:', error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError('internal', 'Tanúsítvány kiállítása sikertelen');
    }
  }
);