/**
 * Storage Management API Routes
 * Handles file uploads, signed URLs, and asset management for courses
 */

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import path from 'path';

const db = admin.firestore();
const storage = admin.storage();

// Log environment variables at module load time
console.log('📦 Storage module loading, environment:', {
  FIREBASE_STORAGE_EMULATOR_HOST: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
  NODE_ENV: process.env.NODE_ENV,
});

const bucket = storage.bucket();

// Verify bucket configuration
console.log('🪣 Bucket initialized:', {
  bucketName: bucket.name,
  baseUrl: bucket.baseUrl,
  // Don't log the entire bucket object as it's huge
});

// File type configurations
const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  presentation: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  spreadsheet: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  archive: ['application/zip', 'application/x-rar-compressed', 'application/x-tar'],
};

const MAX_FILE_SIZES = {
  image: 100 * 1024 * 1024, // 100MB
  video: 5 * 1024 * 1024 * 1024, // 5GB
  audio: 500 * 1024 * 1024, // 500MB
  document: 50 * 1024 * 1024, // 50MB
  presentation: 100 * 1024 * 1024, // 100MB
  spreadsheet: 50 * 1024 * 1024, // 50MB
  archive: 500 * 1024 * 1024, // 500MB
};

// Image optimization settings
const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200 },
  small: { width: 640, height: 480 },
  medium: { width: 1024, height: 768 },
  large: { width: 1920, height: 1080 },
};

/**
 * Generate signed upload URL
 * POST /api/storage/upload-url
 */
export const generateUploadUrlHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { 
      fileName, 
      fileType, 
      fileSize,
      category, // 'course', 'lesson', 'profile', etc.
      entityId, // courseId, lessonId, etc.
      purpose // 'thumbnail', 'video', 'resource', etc.
    } = req.body;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!fileName || !fileType || !fileSize || !category) {
      res.status(400).json({ 
        success: false, 
        error: 'fileName, fileType, fileSize, and category are required' 
      });
      return;
    }
    
    // Validate file type
    const fileCategory = getFileCategory(fileType);
    if (!fileCategory) {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid file type' 
      });
      return;
    }
    
    // Check file size
    const maxSize = MAX_FILE_SIZES[fileCategory as keyof typeof MAX_FILE_SIZES];
    if (fileSize > maxSize) {
      res.status(400).json({ 
        success: false, 
        error: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB` 
      });
      return;
    }
    
    // Check permissions based on category
    if (category === 'course' || category === 'lesson') {
      if (!entityId) {
        // Allow course uploads without entityId for course creation (thumbnails, etc.)
        // But only for certain purposes like thumbnails and promo videos
        if (category === 'course' && (purpose === 'thumbnail' || purpose === 'promo' || purpose === 'temp')) {
          console.log(`✅ Allowing course ${purpose} upload without entityId for course creation`);
        } else {
          res.status(400).json({ 
            success: false, 
            error: 'Entity ID is required for course/lesson uploads (except during course creation)' 
          });
          return;
        }
      } else {
        // Verify user has permission to upload to this course
        const hasPermission = await checkCoursePermissions(userId, entityId);
        if (!hasPermission) {
          res.status(403).json({ 
            success: false, 
            error: 'Insufficient permissions to upload to this course' 
          });
          return;
        }
      }
    }
    
    // Generate unique file path
    const fileId = uuidv4();
    const extension = path.extname(fileName);
    const sanitizedFileName = path.basename(fileName, extension).replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = Date.now();
    
    // Create upload reference first (needed for both emulator and production)
    const uploadRef = db.collection('uploads').doc();
    
    let filePath = '';
    switch (category) {
      case 'course':
        if (entityId) {
          filePath = `courses/${entityId}/${purpose || 'assets'}/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
        } else {
          // For course creation without entityId, use temp folder with userId
          filePath = `courses/temp/${userId}/${purpose || 'assets'}/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
        }
        break;
      case 'lesson':
        if (entityId) {
          // For PDF uploads, use the path expected by storage rules: courses/{courseId}/lessons/{lessonId}/pdfs/*
          const pathPurpose = purpose === 'pdf' ? 'pdfs' : (purpose || 'content');
          // For lesson uploads during course creation, we need to determine the courseId
          // For now, use a temp structure that matches storage rules
          filePath = `courses/temp/${userId}/lessons/${entityId}/${pathPurpose}/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
        } else {
          // For lesson creation without entityId, use temp folder with userId
          filePath = `lessons/temp/${userId}/${purpose || 'content'}/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
        }
        break;
      case 'profile':
        filePath = `profiles/${userId}/avatar/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
        break;
      default:
        filePath = `misc/${category}/${timestamp}_${fileId}_${sanitizedFileName}${extension}`;
    }
    
    // Check if we're running in emulator mode
    const isEmulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
    const bucketName = bucket.name;
    
    console.log('🗋 Environment check:', {
      isEmulator: !!isEmulator,
      emulatorHost: isEmulator,
      bucketName: bucketName,
      filePath: filePath,
      nodeEnv: process.env.NODE_ENV
    });
    
    // Store upload metadata (common for both emulator and production)
    await uploadRef.set({
      id: uploadRef.id,
      userId,
      fileName: sanitizedFileName + extension,
      originalFileName: fileName,
      fileType,
      fileSize,
      fileCategory,
      category,
      entityId: entityId || null,
      purpose: purpose || null,
      filePath,
      status: 'pending',
      signedUrlExpiry: new Date(Date.now() + 15 * 60 * 1000),
      createdAt: FieldValue.serverTimestamp(),
    });
    
    if (isEmulator) {
      // For emulator, use simple HTTP endpoint (no signing required)
      const emulatorUrl = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?uploadType=media`;
      const publicUrl = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
      
      console.log('✅ Emulator upload URL generated:', {
        emulatorUrl,
        publicUrl,
        filePath
      });
      
      res.json({
        success: true,
        uploadId: uploadRef.id,
        signedUrl: emulatorUrl,
        fields: {}, // No fields needed for direct upload
        filePath,
        publicUrl,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      });
      return;
    }
    
    // Production: Generate signed URL for upload
    console.log('🔐 Generating production signed URL...');
    const file = bucket.file(filePath);
    const [signedUrl] = await file.generateSignedPostPolicyV4({
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      conditions: [
        ['content-length-range', 0, fileSize],
        ['starts-with', '$Content-Type', fileType],
      ],
      fields: {
        'x-goog-meta-uploaded-by': userId,
        'x-goog-meta-category': category,
        'x-goog-meta-entity-id': entityId || '',
        'x-goog-meta-purpose': purpose || '',
      },
    });
    
    // Upload metadata already stored above
    
    res.json({
      success: true,
      uploadId: uploadRef.id,
      signedUrl: signedUrl.url,
      fields: signedUrl.fields,
      filePath,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
  } catch (error) {
    console.error('Generate upload URL error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate upload URL' 
    });
  }
};

/**
 * Confirm file upload completion
 * POST /api/storage/confirm-upload
 */
export const confirmUploadHandler = async (req: Request, res: Response): Promise<void> => {
  console.log('🔍 confirmUploadHandler called');
  console.log('🌍 Environment at confirm time:', {
    FIREBASE_STORAGE_EMULATOR_HOST: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
  });
  
  try {
    const userId = (req as any).user?.uid;
    const { uploadId } = req.body;
    
    console.log('📝 Confirm upload request:', { userId, uploadId });
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!uploadId) {
      res.status(400).json({ success: false, error: 'Upload ID is required' });
      return;
    }
    
    // Get upload record
    console.log('📚 Fetching upload record from Firestore...');
    const uploadDoc = await db.collection('uploads').doc(uploadId).get();
    if (!uploadDoc.exists) {
      console.error('❌ Upload record not found:', uploadId);
      res.status(404).json({ success: false, error: 'Upload not found' });
      return;
    }
    
    const uploadData = uploadDoc.data();
    console.log('✅ Upload data retrieved:', {
      filePath: uploadData?.filePath,
      fileCategory: uploadData?.fileCategory,
      status: uploadData?.status,
    });
    
    // Verify ownership
    if (uploadData?.userId !== userId) {
      console.error('❌ Unauthorized access attempt:', { expectedUserId: uploadData?.userId, actualUserId: userId });
      res.status(403).json({ success: false, error: 'Unauthorized' });
      return;
    }
    
    const isEmulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
    console.log('🧪 Emulator check in confirmUploadHandler:', { isEmulator: !!isEmulator, value: isEmulator });
    let metadata: any = {};
    
    if (isEmulator) {
      // For emulator, skip file existence check and metadata retrieval to avoid signing issues
      console.log('🧪 Emulator: skipping file existence check and metadata retrieval');
      metadata = {
        size: uploadData?.fileSize || 0,
        contentType: uploadData?.fileType || 'application/octet-stream',
        md5Hash: 'emulator-hash',
      };
    } else {
      // For production, check if file exists and get metadata
      const file = bucket.file(uploadData?.filePath || '');
      const [exists] = await file.exists();
      
      if (!exists) {
        res.status(400).json({ 
          success: false, 
          error: 'File not found in storage' 
        });
        return;
      }
      
      const [metadataResponse] = await file.getMetadata();
      metadata = metadataResponse;
    }
    
    // Update upload record
    console.log('📝 Updating upload record in Firestore...');
    try {
      await uploadDoc.ref.update({
        status: 'completed',
        actualFileSize: metadata.size,
        contentType: metadata.contentType,
        md5Hash: metadata.md5Hash,
        completedAt: FieldValue.serverTimestamp(),
      });
      console.log('✅ Upload record updated successfully');
    } catch (updateError) {
      console.error('❌ Failed to update upload record:', updateError);
      throw updateError;
    }
    
    // Process file based on type
    let processedFiles: any = {};
    
    console.log('🔍 About to process file, category:', uploadData?.fileCategory);
    
    if (uploadData?.fileCategory === 'image') {
      // Generate thumbnails for images
      console.log('📸 Processing image file...');
      processedFiles = await processImage(uploadData?.filePath || '');
    } else if (uploadData?.fileCategory === 'video') {
      // For videos, we'd typically trigger a separate video processing job
      // For now, just mark as ready
      console.log('🎥 Processing video file...');
      if (isEmulator) {
        const bucketName = 'elira-landing-ce927.firebasestorage.app';
        processedFiles.original = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(uploadData?.filePath || '')}?alt=media`;
      } else {
        processedFiles.original = await getSignedUrl(uploadData?.filePath || '');
      }
    } else {
      // For other files, just provide the signed URL
      console.log('📄 Processing other file type...');
      if (isEmulator) {
        const bucketName = 'elira-landing-ce927.firebasestorage.app';
        processedFiles.original = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(uploadData?.filePath || '')}?alt=media`;
      } else {
        processedFiles.original = await getSignedUrl(uploadData?.filePath || '');
      }
    }
    
    console.log('✅ File processing completed:', processedFiles);
    
    res.json({
      success: true,
      message: 'Upload confirmed successfully',
      uploadId,
      filePath: uploadData?.filePath || '',
      urls: processedFiles,
    });
  } catch (error) {
    console.error('Confirm upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to confirm upload' 
    });
  }
};

/**
 * Get signed URL for file access
 * GET /api/storage/signed-url
 */
export const getSignedUrlHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { filePath, expiryMinutes = 60 } = req.query;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!filePath || typeof filePath !== 'string') {
      res.status(400).json({ success: false, error: 'File path is required' });
      return;
    }
    
    // Check permissions based on file path
    const hasAccess = await checkFileAccess(userId, filePath);
    if (!hasAccess) {
      res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions to access this file' 
      });
      return;
    }
    
    // Generate signed URL
    const signedUrl = await getSignedUrl(filePath, Number(expiryMinutes));
    
    res.json({
      success: true,
      url: signedUrl,
      expiresAt: new Date(Date.now() + Number(expiryMinutes) * 60 * 1000),
    });
  } catch (error) {
    console.error('Get signed URL error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate signed URL' 
    });
  }
};

/**
 * Delete file from storage
 * DELETE /api/storage/file
 */
export const deleteFileHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { filePath } = req.body;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!filePath) {
      res.status(400).json({ success: false, error: 'File path is required' });
      return;
    }
    
    // Check permissions
    const hasPermission = await checkFileDeletePermission(userId, filePath);
    if (!hasPermission) {
      res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions to delete this file' 
      });
      return;
    }
    
    // Delete file and any variants (thumbnails, etc.)
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    
    if (!exists) {
      res.status(404).json({ success: false, error: 'File not found' });
      return;
    }
    
    // Delete main file
    await file.delete();
    
    // Delete thumbnails if it's an image
    if (filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const basePath = filePath.replace(/\.[^/.]+$/, '');
      const thumbnailPaths = Object.keys(IMAGE_SIZES).map(size => `${basePath}_${size}.webp`);
      
      for (const thumbPath of thumbnailPaths) {
        try {
          await bucket.file(thumbPath).delete();
        } catch (err) {
          // Thumbnail might not exist, ignore error
        }
      }
    }
    
    // Update upload record if exists
    const uploadsSnapshot = await db.collection('uploads')
      .where('filePath', '==', filePath)
      .limit(1)
      .get();
    
    if (!uploadsSnapshot.empty) {
      await uploadsSnapshot.docs[0].ref.update({
        status: 'deleted',
        deletedAt: FieldValue.serverTimestamp(),
        deletedBy: userId,
      });
    }
    
    res.json({
      success: true,
      message: 'File deleted successfully',
      filePath,
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete file' 
    });
  }
};

/**
 * List files for an entity
 * GET /api/storage/list
 */
export const listFilesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { category, entityId, purpose } = req.query;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!category || !entityId) {
      res.status(400).json({ 
        success: false, 
        error: 'Category and entity ID are required' 
      });
      return;
    }
    
    // Check permissions
    if (category === 'course' || category === 'lesson') {
      const hasPermission = await checkCoursePermissions(userId, entityId as string);
      if (!hasPermission) {
        res.status(403).json({ 
          success: false, 
          error: 'Insufficient permissions' 
        });
        return;
      }
    }
    
    // Query uploads
    let query = db.collection('uploads')
      .where('category', '==', category)
      .where('entityId', '==', entityId)
      .where('status', '==', 'completed');
    
    if (purpose) {
      query = query.where('purpose', '==', purpose);
    }
    
    const uploadsSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const files: any[] = [];
    for (const doc of uploadsSnapshot.docs) {
      const data = doc.data();
      const signedUrl = await getSignedUrl(data.filePath, 60);
      
      files.push({
        id: doc.id,
        fileName: data.fileName,
        originalFileName: data.originalFileName,
        fileType: data.fileType,
        fileSize: data.actualFileSize || data.fileSize,
        fileCategory: data.fileCategory,
        purpose: data.purpose,
        url: signedUrl,
        uploadedAt: data.completedAt?.toDate() || data.createdAt?.toDate(),
        uploadedBy: data.userId,
      });
    }
    
    res.json({
      success: true,
      files,
      total: files.length,
    });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to list files' 
    });
  }
};

// Helper functions

function getFileCategory(mimeType: string): string | null {
  for (const [category, types] of Object.entries(ALLOWED_FILE_TYPES)) {
    if (types.includes(mimeType)) {
      return category;
    }
  }
  return null;
}

async function checkCoursePermissions(userId: string, entityId: string): Promise<boolean> {
  try {
    // Check if user is admin
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role === 'ADMIN') {
      return true;
    }
    
    // Check if it's a course ID
    const courseDoc = await db.collection('courses').doc(entityId).get();
    if (courseDoc.exists) {
      const courseData = courseDoc.data();
      return courseData?.instructorId === userId;
    }
    
    // Check if it's a lesson ID (need to check parent course)
    const lessonDoc = await db.collection('lessons').doc(entityId).get();
    if (lessonDoc.exists) {
      const lessonData = lessonDoc.data();
      const courseDoc = await db.collection('courses').doc(lessonData?.courseId).get();
      const courseData = courseDoc.data();
      return courseData?.instructorId === userId;
    }
    
    return false;
  } catch (error) {
    console.error('Check course permissions error:', error);
    return false;
  }
}

async function checkFileAccess(userId: string, filePath: string): Promise<boolean> {
  try {
    // Check if user is admin
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role === 'ADMIN') {
      return true;
    }
    
    // Parse file path to determine access
    if (filePath.startsWith('profiles/')) {
      // Users can access their own profile files
      return filePath.startsWith(`profiles/${userId}/`);
    }
    
    if (filePath.startsWith('courses/') || filePath.startsWith('lessons/')) {
      // Extract entity ID from path
      const pathParts = filePath.split('/');
      if (pathParts.length >= 2) {
        const entityId = pathParts[1];
        return await checkCoursePermissions(userId, entityId);
      }
    }
    
    return false;
  } catch (error) {
    console.error('Check file access error:', error);
    return false;
  }
}

async function checkFileDeletePermission(userId: string, filePath: string): Promise<boolean> {
  try {
    // Check if user is admin
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role === 'ADMIN') {
      return true;
    }
    
    // Check upload record
    const uploadsSnapshot = await db.collection('uploads')
      .where('filePath', '==', filePath)
      .where('userId', '==', userId)
      .limit(1)
      .get();
    
    return !uploadsSnapshot.empty;
  } catch (error) {
    console.error('Check delete permission error:', error);
    return false;
  }
}

async function getSignedUrl(filePath: string, expiryMinutes: number = 60): Promise<string> {
  // Check if we're running in emulator mode
  const isEmulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  console.log('🔍 getSignedUrl called with:', { filePath, isEmulator: !!isEmulator, emulatorHost: isEmulator });
  
  if (isEmulator) {
    // For emulator, use direct HTTP URL without signing
    // Use hardcoded bucket name to avoid any admin SDK calls
    const bucketName = 'elira-landing-ce927.firebasestorage.app';
    const emulatorPublicUrl = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
    console.log('🧪 Emulator: returning direct public URL:', emulatorPublicUrl);
    return emulatorPublicUrl;
  }
  
  // For production, use signed URLs
  const file = bucket.file(filePath);
  const [signedUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + expiryMinutes * 60 * 1000,
  });
  return signedUrl;
}

async function processImage(filePath: string): Promise<any> {
  console.log('🎨 processImage function started');
  console.log('🌍 processImage environment check:', {
    FIREBASE_STORAGE_EMULATOR_HOST: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    typeof: typeof process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    truthiness: !!process.env.FIREBASE_STORAGE_EMULATOR_HOST,
  });
  
  try {
    const isEmulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
    console.log('🔍 processImage called with:', { 
      filePath, 
      isEmulator: !!isEmulator,
      emulatorValue: isEmulator 
    });
    
    if (isEmulator) {
      // For emulator, skip everything and just return a simple structure
      console.log('🧪 Emulator: completely skipping image processing and URL generation');
      const bucketName = 'elira-landing-ce927.firebasestorage.app';
      const directUrl = `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
      console.log('✅ Emulator: returning direct URL without any signing:', directUrl);
      return {
        original: directUrl,
      };
    }
    
    // For production, do full image processing
    const file = bucket.file(filePath);
    const [buffer] = await file.download();
    
    const basePath = filePath.replace(/\.[^/.]+$/, '');
    const urls: any = {};
    
    // Generate original URL
    urls.original = await getSignedUrl(filePath);
    
    // Generate thumbnails
    for (const [sizeName, dimensions] of Object.entries(IMAGE_SIZES)) {
      const thumbnailPath = `${basePath}_${sizeName}.webp`;
      
      const processedImage = await sharp(buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 85 })
        .toBuffer();
      
      const thumbnailFile = bucket.file(thumbnailPath);
      await thumbnailFile.save(processedImage, {
        metadata: {
          contentType: 'image/webp',
        },
      });
      
      urls[sizeName] = await getSignedUrl(thumbnailPath);
    }
    
    return urls;
  } catch (error) {
    console.error('Process image error:', error);
    // Return original URL even if processing fails
    const isEmulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
    if (isEmulator) {
      const bucketName = 'elira-landing-ce927.firebasestorage.app';
      return {
        original: `http://127.0.0.1:9199/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`,
      };
    } else {
      return {
        original: await getSignedUrl(filePath),
      };
    }
  }
}