"use client";

import { useState, useRef, useCallback } from 'react';
import { Button } from './Button';
import { Progress } from './progress';
import { Card, CardContent } from './Card';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Camera
} from 'lucide-react';
import { uploadFile, type UploadOptions, type FileMetadata } from '@/lib/storage';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUpload?: (url: string, metadata: FileMetadata) => void;
  onError?: (error: Error) => void;
  storagePath: string;
  existingImageUrl?: string;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  compress?: boolean;
  generateThumbnail?: boolean;
  aspectRatio?: number;
  cropPreview?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function ImageUploader({
  onUpload,
  onError,
  storagePath,
  existingImageUrl,
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  compress = true,
  generateThumbnail = false,
  aspectRatio,
  cropPreview = false,
  className = '',
  disabled = false,
  placeholder = 'Kép feltöltése',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    if (disabled || isUploading) return;

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Start upload
    setIsUploading(true);
    setProgress(0);

    const uploadOptions: UploadOptions = {
      allowedTypes,
      maxSizeBytes,
      compress,
      generateThumbnail,
      onProgress: (progress) => {
        setProgress(progress);
      },
      onError: (error) => {
        console.error('Upload error:', error);
        setIsUploading(false);
        setProgress(0);
        setPreview(existingImageUrl || null);
        URL.revokeObjectURL(previewUrl);
        
        toast.error(`Feltöltési hiba: ${error.message}`);
        onError?.(error);
      },
      onComplete: (url, metadata) => {
        setIsUploading(false);
        setProgress(100);
        URL.revokeObjectURL(previewUrl);
        
        toast.success('Kép sikeresen feltöltve');
        onUpload?.(url, metadata!);
      }
    };

    try {
      await uploadFile(file, storagePath, uploadOptions);
    } catch (error) {
      // Error handling is already done in uploadOptions.onError
    }
  }, [
    disabled, 
    isUploading, 
    storagePath, 
    allowedTypes, 
    maxSizeBytes, 
    compress, 
    generateThumbnail, 
    existingImageUrl, 
    onUpload, 
    onError
  ]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled && !isUploading) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    if (disabled || isUploading) return;

    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    } else {
      toast.error('Kérjük, válassz egy képfájlt');
    }
  };

  // Remove image
  const handleRemove = () => {
    if (disabled || isUploading) return;
    
    setPreview(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Calculate aspect ratio for preview
  const previewStyle = aspectRatio ? {
    aspectRatio: aspectRatio.toString(),
    objectFit: cropPreview ? 'cover' as const : 'contain' as const
  } : {};

  return (
    <div className={`space-y-3 ${className}`}>
      <Card 
        className={`transition-all duration-200 ${
          dragOver ? 'border-primary bg-primary/5' : 'border-dashed border-muted-foreground/25'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-muted-foreground/50'}`}
      >
        <CardContent className="p-0">
          {preview ? (
            // Preview mode
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-t-lg"
                style={previewStyle}
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || isUploading}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Csere
                </Button>
                
                <Button
                  variant="destructive" 
                  size="sm"
                  onClick={handleRemove}
                  disabled={disabled || isUploading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Törlés
                </Button>
              </div>

              {/* Upload progress overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 rounded-t-lg flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <div className="w-3/4">
                    <Progress value={progress} className="mb-2" />
                    <p className="text-sm text-center text-muted-foreground">
                      Feltöltés: {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Upload area
            <div
              className={`p-8 text-center transition-all cursor-pointer ${
                disabled ? 'cursor-not-allowed' : 'hover:bg-muted/50'
              }`}
              onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                  <div className="max-w-xs mx-auto">
                    <Progress value={progress} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Feltöltés: {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-base font-medium">{placeholder}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Húzd ide a képet vagy kattints a böngészéshez
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG, GIF, WebP • Maximum {Math.round(maxSizeBytes / (1024 * 1024))}MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status messages */}
      {!isUploading && progress === 100 && preview && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Kép sikeresen feltöltve</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
}