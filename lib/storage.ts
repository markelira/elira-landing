import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  uploadBytes,
  getMetadata,
  updateMetadata,
  listAll,
  type UploadTaskSnapshot
} from 'firebase/storage';
import { auth } from './firebase';
import { toast } from 'sonner';

export interface UploadOptions {
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
  onComplete?: (url: string, metadata?: any) => void;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  compress?: boolean;
  generateThumbnail?: boolean;
  customMetadata?: { [key: string]: string };
  category?: string;
  purpose?: string;
  lessonId?: string;
  courseId?: string;
}

export interface FileMetadata {
  originalName: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  customMetadata?: { [key: string]: string };
}

const storage = getStorage();

// File type validation
const DEFAULT_ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  pdf: ['application/pdf'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/webm']
};

const DEFAULT_MAX_SIZES = {
  image: 10 * 1024 * 1024,      // 10MB
  pdf: 50 * 1024 * 1024,       // 50MB
  document: 25 * 1024 * 1024,   // 25MB
  video: 500 * 1024 * 1024,     // 500MB
  audio: 100 * 1024 * 1024      // 100MB
};

// Generate unique filename with timestamp
export function generateUniqueFileName(originalName: string, userId?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  const nameWithoutExtension = originalName.replace(`.${extension}`, '');
  const sanitizedName = nameWithoutExtension
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 50);
  
  return `${timestamp}_${randomString}_${sanitizedName}${extension ? `.${extension}` : ''}`;
}

// Validate file type and size
export function validateFile(
  file: File, 
  allowedTypes?: string[], 
  maxSize?: number
): { valid: boolean; error?: string } {
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Nem támogatott fájltípus: ${file.type}. Engedélyezett típusok: ${allowedTypes.join(', ')}`
    };
  }

  // Check file size
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `A fájl túl nagy: ${Math.round(file.size / (1024 * 1024))}MB. Maximum: ${maxSizeMB}MB`
    };
  }

  return { valid: true };
}

// Compress image before upload
export function compressImage(file: File, quality: number = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (max 1920x1920)
      let { width, height } = img;
      const maxSize = 1920;
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw compressed image
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Fallback to original file
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => resolve(file); // Fallback to original file
    img.src = URL.createObjectURL(file);
  });
}

// Generate thumbnail
export function generateThumbnail(file: File, maxSize: number = 300): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      let thumbWidth = width;
      let thumbHeight = height;

      // Calculate thumbnail dimensions
      if (width > height) {
        thumbWidth = maxSize;
        thumbHeight = (height * maxSize) / width;
      } else {
        thumbHeight = maxSize;
        thumbWidth = (width * maxSize) / height;
      }

      canvas.width = thumbWidth;
      canvas.height = thumbHeight;

      ctx?.drawImage(img, 0, 0, thumbWidth, thumbHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const thumbnailFile = new File([blob], `thumb_${file.name}`, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(thumbnailFile);
          } else {
            resolve(file); // Fallback to original file
          }
        },
        file.type,
        0.7
      );
    };

    img.onerror = () => resolve(file); // Fallback to original file
    img.src = URL.createObjectURL(file);
  });
}

// Generic upload function
export async function uploadFile(
  file: File,
  storagePath: string,
  options: UploadOptions = {}
): Promise<{ url: string; metadata: FileMetadata }> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Felhasználónak be kell jelentkeznie a feltöltéshez');
  }

  // Validate file
  const validation = validateFile(file, options.allowedTypes, options.maxSizeBytes);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate unique filename
  const fileName = generateUniqueFileName(file.name, user.uid);
  const fullPath = `${storagePath}/${fileName}`;
  
  // Create storage reference
  const storageRef = ref(storage, fullPath);
  
  let fileToUpload = file;

  // Compress image if requested
  if (options.compress && file.type.startsWith('image/')) {
    try {
      fileToUpload = await compressImage(file);
      toast.info('Kép tömörítése folyamatban...');
    } catch (error) {
      console.warn('Image compression failed, uploading original:', error);
    }
  }

  // Prepare metadata
  const metadata: FileMetadata = {
    originalName: file.name,
    size: fileToUpload.size,
    type: fileToUpload.type,
    uploadedAt: new Date().toISOString(),
    uploadedBy: user.uid,
    customMetadata: options.customMetadata
  };

  return new Promise((resolve, reject) => {
    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload, {
      customMetadata: {
        originalName: file.name,
        uploadedBy: user.uid,
        ...options.customMetadata
      }
    });

    // Track upload progress
    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        options.onProgress?.(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        options.onError?.(error);
        reject(error);
      },
      async () => {
        try {
          // Get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          options.onComplete?.(downloadURL, metadata);
          resolve({ url: downloadURL, metadata });
        } catch (error) {
          options.onError?.(error as Error);
          reject(error);
        }
      }
    );
  });
}

// Course image upload
export async function uploadCourseImage(
  file: File,
  courseId: string,
  options: Omit<UploadOptions, 'allowedTypes' | 'maxSizeBytes'> = {}
): Promise<{ url: string; metadata: FileMetadata; thumbnailUrl?: string }> {
  const result = await uploadFile(file, `courses/${courseId}/images`, {
    ...options,
    allowedTypes: DEFAULT_ALLOWED_TYPES.image,
    maxSizeBytes: DEFAULT_MAX_SIZES.image,
    compress: true
  });

  // Generate thumbnail if requested
  let thumbnailUrl: string | undefined;
  if (options.generateThumbnail) {
    try {
      const thumbnailFile = await generateThumbnail(file);
      const thumbnailResult = await uploadFile(
        thumbnailFile,
        `courses/${courseId}/thumbnails`,
        {
          allowedTypes: DEFAULT_ALLOWED_TYPES.image,
          maxSizeBytes: DEFAULT_MAX_SIZES.image
        }
      );
      thumbnailUrl = thumbnailResult.url;
    } catch (error) {
      console.warn('Thumbnail generation failed:', error);
    }
  }

  return { ...result, thumbnailUrl };
}

// Lesson PDF upload
export async function uploadLessonPDF(
  file: File,
  courseId: string,
  lessonId: string,
  options: Omit<UploadOptions, 'allowedTypes' | 'maxSizeBytes'> = {}
): Promise<{ url: string; metadata: FileMetadata }> {
  return uploadFile(file, `courses/${courseId}/lessons/${lessonId}/pdfs`, {
    ...options,
    allowedTypes: DEFAULT_ALLOWED_TYPES.pdf,
    maxSizeBytes: DEFAULT_MAX_SIZES.pdf
  });
}

// User avatar upload
export async function uploadUserAvatar(
  file: File,
  userId: string,
  options: Omit<UploadOptions, 'allowedTypes' | 'maxSizeBytes'> = {}
): Promise<{ url: string; metadata: FileMetadata }> {
  return uploadFile(file, `users/${userId}/avatar`, {
    ...options,
    allowedTypes: DEFAULT_ALLOWED_TYPES.image,
    maxSizeBytes: DEFAULT_MAX_SIZES.image,
    compress: true
  });
}

// Rich text editor image upload
export async function uploadLessonImage(
  file: File,
  courseId: string,
  lessonId: string,
  options: Omit<UploadOptions, 'allowedTypes' | 'maxSizeBytes'> = {}
): Promise<{ url: string; metadata: FileMetadata }> {
  return uploadFile(file, `courses/${courseId}/lessons/${lessonId}/images`, {
    ...options,
    allowedTypes: DEFAULT_ALLOWED_TYPES.image,
    maxSizeBytes: DEFAULT_MAX_SIZES.image,
    compress: true
  });
}

// Get file URL (for private files)
export async function getFileURL(storagePath: string): Promise<string> {
  const storageRef = ref(storage, storagePath);
  return getDownloadURL(storageRef);
}

// Delete file
export async function deleteFile(storagePath: string): Promise<void> {
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
}

// List files in a directory
export async function listFiles(directoryPath: string): Promise<{ url: string; path: string; metadata: any }[]> {
  const storageRef = ref(storage, directoryPath);
  const result = await listAll(storageRef);
  
  const files = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      const metadata = await getMetadata(item);
      return { url, path: item.fullPath, metadata };
    })
  );

  return files;
}

// Batch upload function
export async function batchUpload(
  files: File[],
  storagePath: string,
  options: UploadOptions & { 
    onBatchProgress?: (completed: number, total: number) => void;
    onFileComplete?: (file: File, result: { url: string; metadata: FileMetadata }) => void;
  } = {}
): Promise<{ url: string; metadata: FileMetadata; file: File }[]> {
  const results: { url: string; metadata: FileMetadata; file: File }[] = [];
  let completed = 0;

  for (const file of files) {
    try {
      const result = await uploadFile(file, storagePath, {
        ...options,
        onProgress: (progress) => {
          // Individual file progress can be handled here
          options.onProgress?.(progress);
        }
      });
      
      results.push({ ...result, file });
      options.onFileComplete?.(file, result);
      
      completed++;
      options.onBatchProgress?.(completed, files.length);
      
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      options.onError?.(error as Error);
    }
  }

  return results;
}

// Upload queue management
class UploadQueue {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private concurrent = 3; // Max concurrent uploads

  add<T>(uploadFunction: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await uploadFunction();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.process();
      }
    });
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.concurrent);
      await Promise.allSettled(batch.map(fn => fn()));
    }

    this.isProcessing = false;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue = [];
  }
}

export const uploadQueue = new UploadQueue();

// Convenience function to add to upload queue
export function queueUpload<T>(uploadFunction: () => Promise<T>): Promise<T> {
  return uploadQueue.add(uploadFunction);
}

// Clean up unused files (call this periodically)
export async function cleanupUnusedFiles(directoryPath: string, referencedUrls: string[]): Promise<number> {
  const files = await listFiles(directoryPath);
  let deletedCount = 0;

  for (const file of files) {
    if (!referencedUrls.includes(file.url)) {
      try {
        await deleteFile(file.path);
        deletedCount++;
      } catch (error) {
        console.error(`Failed to delete unused file ${file.path}:`, error);
      }
    }
  }

  return deletedCount;
}