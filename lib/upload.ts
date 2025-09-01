/**
 * File Upload Utilities
 * Client-side helpers for uploading files to Firebase Storage
 */

import { FIREBASE_FUNCTIONS_URL } from './config';

export interface UploadOptions {
  fileName: string;
  fileType: string;
  fileSize: number;
  category: 'course' | 'lesson' | 'profile' | 'misc';
  entityId?: string;
  purpose?: string;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
  onComplete?: (result: UploadResult) => void;
}

export interface UploadResult {
  success: boolean;
  uploadId?: string;
  filePath?: string;
  urls?: {
    original?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload a file to Firebase Storage
 */
export async function uploadFile(
  file: File,
  options: Omit<UploadOptions, 'fileName' | 'fileType' | 'fileSize'>
): Promise<UploadResult> {
  try {
    const { category, entityId, purpose, onProgress, onError, onComplete } = options;
    
    console.log('🚀 Starting file upload:', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      category,
      entityId,
      purpose,
      functionsUrl: FIREBASE_FUNCTIONS_URL
    });
    
    // Validate file
    const validation = validateFile(file, category);
    if (!validation.valid) {
      console.error('❌ File validation failed:', validation.error);
      const error = new Error(validation.error);
      onError?.(error);
      throw error;
    }
    console.log('✅ File validation passed');
    
    // Get auth token
    console.log('🔑 Getting auth token...');
    const token = await getAuthToken();
    if (!token) {
      console.error('❌ No auth token available');
      const error = new Error('Authentication required');
      onError?.(error);
      throw error;
    }
    console.log('✅ Auth token obtained:', token.substring(0, 20) + '...');
    
    // First, let's test if the Firebase Functions endpoint is accessible
    console.log('🧪 Testing Firebase Functions health check...');
    try {
      const healthResponse = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ Firebase Functions health check passed:', healthData);
      } else {
        console.warn('⚠️ Firebase Functions health check failed:', healthResponse.status, healthResponse.statusText);
      }
    } catch (healthError) {
      console.error('❌ Firebase Functions not accessible:', healthError);
      throw new Error('Firebase Functions endpoint not accessible. Make sure emulators are running.');
    }
    
    // Step 1: Generate signed upload URL
    console.log('📡 Making request to generate upload URL...');
    const requestBody = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      category,
      entityId,
      purpose,
    };
    console.log('📦 Request body:', requestBody);
    
    const uploadUrlResponse = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/storage/upload-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('📡 Upload URL response status:', uploadUrlResponse.status, uploadUrlResponse.statusText);
    
    if (!uploadUrlResponse.ok) {
      console.error('❌ Upload URL request failed:', {
        status: uploadUrlResponse.status,
        statusText: uploadUrlResponse.statusText,
        url: `${FIREBASE_FUNCTIONS_URL}/api/storage/upload-url`
      });
      
      let errorData;
      try {
        errorData = await uploadUrlResponse.json();
        console.error('❌ Error response data:', errorData);
      } catch (parseError) {
        console.error('❌ Could not parse error response:', parseError);
        errorData = { error: `HTTP ${uploadUrlResponse.status}: ${uploadUrlResponse.statusText}` };
      }
      
      const error = new Error(errorData.error || 'Failed to get upload URL');
      onError?.(error);
      throw error;
    }
    
    const uploadData = await uploadUrlResponse.json();
    console.log('📦 Upload data received:', uploadData);
    
    // Step 2: Upload file to signed URL
    let uploadResult;
    
    if (uploadData.fields && Object.keys(uploadData.fields).length > 0) {
      // Production: Use signed URL with form fields
      console.log('🔐 Using production signed URL upload');
      const formData = new FormData();
      
      // Add all fields from the signed URL response
      Object.entries(uploadData.fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      // Add the file last (required by GCS)
      formData.append('file', file);
      
      uploadResult = await uploadWithProgress(
        uploadData.signedUrl,
        formData,
        onProgress
      );
    } else {
      // Emulator: Direct upload to HTTP endpoint
      console.log('🧪 Using emulator direct upload');
      uploadResult = await uploadWithProgress(
        uploadData.signedUrl,
        file,
        onProgress
      );
    }
    
    if (!uploadResult.success) {
      const error = new Error('File upload failed');
      onError?.(error);
      throw error;
    }
    
    // Step 3: Confirm upload completion
    const confirmResponse = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/storage/confirm-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        uploadId: uploadData.uploadId,
      }),
    });
    
    if (!confirmResponse.ok) {
      const errorData = await confirmResponse.json();
      const error = new Error(errorData.error || 'Failed to confirm upload');
      onError?.(error);
      throw error;
    }
    
    const confirmData = await confirmResponse.json();
    
    const result: UploadResult = {
      success: true,
      uploadId: uploadData.uploadId,
      filePath: confirmData.filePath,
      urls: confirmData.urls,
    };
    
    onComplete?.(result);
    return result;
    
  } catch (error) {
    console.error('💥 Upload error:', error);
    
    // Enhanced error logging
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('🌐 Network error details:', {
        message: 'This usually indicates a network connectivity issue or CORS problem',
        functionsUrl: FIREBASE_FUNCTIONS_URL,
        possibleCauses: [
          'Firebase emulators not running',
          'CORS configuration issue',
          'Network connectivity problem',
          'Invalid Firebase Functions URL'
        ]
      });
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  files: File[],
  options: Omit<UploadOptions, 'fileName' | 'fileType' | 'fileSize'>
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileOptions = {
      ...options,
      onProgress: (progress: number) => {
        const totalProgress = ((i / files.length) + (progress / 100 / files.length)) * 100;
        options.onProgress?.(totalProgress);
      },
    };
    
    const result = await uploadFile(file, fileOptions);
    results.push(result);
    
    if (!result.success && options.onError) {
      options.onError(new Error(`Failed to upload ${file.name}: ${result.error}`));
    }
  }
  
  return results;
}

/**
 * Get signed URL for file access
 */
export async function getSignedUrl(
  filePath: string,
  expiryMinutes: number = 60
): Promise<string | null> {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(
      `${FIREBASE_FUNCTIONS_URL}/api/storage/signed-url?` + 
      new URLSearchParams({
        filePath,
        expiryMinutes: expiryMinutes.toString(),
      }),
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }
    
    const data = await response.json();
    return data.url;
    
  } catch (error) {
    console.error('Get signed URL error:', error);
    return null;
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/storage/file`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ filePath }),
    });
    
    return response.ok;
    
  } catch (error) {
    console.error('Delete file error:', error);
    return false;
  }
}

/**
 * List files for an entity
 */
export async function listFiles(
  category: string,
  entityId: string,
  purpose?: string
): Promise<any[]> {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const params = new URLSearchParams({
      category,
      entityId,
    });
    
    if (purpose) {
      params.append('purpose', purpose);
    }
    
    const response = await fetch(
      `${FIREBASE_FUNCTIONS_URL}/api/storage/list?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to list files');
    }
    
    const data = await response.json();
    return data.files || [];
    
  } catch (error) {
    console.error('List files error:', error);
    return [];
  }
}

// Helper functions

async function getAuthToken(): Promise<string | null> {
  console.log('🔑 Getting auth token...');
  
  // Get current user's auth token
  if (typeof window !== 'undefined') {
    try {
      console.log('🌐 Window environment detected, importing Firebase auth...');
      const { auth } = await import('./firebase');
      console.log('🔥 Firebase auth imported, checking current user...');
      console.log('🔥 Auth instance config:', {
        currentUser: auth.currentUser,
        config: auth.config,
        app: auth.app.name
      });
      
      const user = auth.currentUser;
      if (user) {
        console.log('✅ User found:', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          providerId: user.providerId,
          isAnonymous: user.isAnonymous
        });
        
        const token = await user.getIdToken(true); // Force refresh
        console.log('✅ Auth token obtained successfully, length:', token.length);
        console.log('🎩 Token preview:', token.substring(0, 50) + '...');
        return token;
      } else {
        console.error('❌ No current user found');
        console.error('👤 Auth state:', {
          currentUser: auth.currentUser,
          authDomain: auth.app.options.authDomain,
          projectId: auth.app.options.projectId
        });
      }
    } catch (error) {
      console.error('❌ Error getting auth token:', error);
    }
  } else {
    console.error('❌ Not in browser environment');
  }
  
  return null;
}

function validateFile(
  file: File,
  category: string
): { valid: boolean; error?: string } {
  // File size limits by category
  const sizeLimits: Record<string, number> = {
    image: 10 * 1024 * 1024, // 10MB
    video: 5 * 1024 * 1024 * 1024, // 5GB
    document: 50 * 1024 * 1024, // 50MB
    audio: 500 * 1024 * 1024, // 500MB
  };
  
  // Allowed file types by category
  const allowedTypes: Record<string, string[]> = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/webm'],
  };
  
  // Determine file category from MIME type
  let fileCategory = 'misc';
  for (const [cat, types] of Object.entries(allowedTypes)) {
    if (types.includes(file.type)) {
      fileCategory = cat;
      break;
    }
  }
  
  // Check file size
  const maxSize = sizeLimits[fileCategory] || 100 * 1024 * 1024; // Default 100MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${formatFileSize(maxSize)}`,
    };
  }
  
  // Check file type for specific categories
  if (category === 'course' || category === 'lesson') {
    // Allow common educational content types
    const educationalTypes = [
      ...allowedTypes.image,
      ...allowedTypes.video,
      ...allowedTypes.document,
      ...allowedTypes.audio,
      'application/zip',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ];
    
    if (!educationalTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed for ${category} uploads`,
      };
    }
  }
  
  return { valid: true };
}

async function uploadWithProgress(
  url: string,
  data: FormData | File,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean }> {
  return new Promise(async (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });
    }
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ success: true });
      } else {
        console.error('❌ Upload failed:', {
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.responseText
        });
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });
    
    if (data instanceof File) {
      // For emulator direct upload - add authentication headers
      console.log('🔐 Adding auth headers for emulator upload...');
      const token = await getAuthToken();
      
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', data.type);
      
      // Add Firebase Auth token for storage rules evaluation
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        console.log('✅ Auth token added to storage upload request');
      } else {
        console.warn('⚠️ No auth token available for storage upload');
      }
      
      xhr.send(data);
    } else {
      // For production signed URL upload
      xhr.open('POST', url);
      xhr.send(data);
    }
  });
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}