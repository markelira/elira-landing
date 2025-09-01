"use client";

import { useState, useRef, useCallback } from 'react';
import { Button } from './button';
import { Progress } from './progress';
import { Card, CardContent } from './card';
import { 
  Upload, 
  X, 
  FileText, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Download,
  Eye
} from 'lucide-react';
import { uploadFile, type UploadOptions, type FileMetadata } from '@/lib/storage';
import { toast } from 'sonner';

interface PDFUploaderProps {
  onUpload?: (url: string, metadata: FileMetadata) => void;
  onError?: (error: Error) => void;
  storagePath: string;
  existingPDFUrl?: string;
  existingPDFName?: string;
  maxSizeBytes?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showPreview?: boolean;
}

export default function PDFUploader({
  onUpload,
  onError,
  storagePath,
  existingPDFUrl,
  existingPDFName,
  maxSizeBytes = 50 * 1024 * 1024, // 50MB default
  className = '',
  disabled = false,
  placeholder = 'PDF fájl feltöltése',
  showPreview = true,
}: PDFUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    name: string;
    size: number;
  } | null>(
    existingPDFUrl ? {
      url: existingPDFUrl,
      name: existingPDFName || 'document.pdf',
      size: 0
    } : null
  );
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    if (disabled || isUploading) return;

    // Validate PDF
    if (file.type !== 'application/pdf') {
      toast.error('Csak PDF fájlok engedélyezettek');
      return;
    }

    if (file.size > maxSizeBytes) {
      const maxSizeMB = Math.round(maxSizeBytes / (1024 * 1024));
      toast.error(`A fájl túl nagy. Maximum: ${maxSizeMB}MB`);
      return;
    }

    // Start upload
    setIsUploading(true);
    setProgress(0);

    const uploadOptions: UploadOptions = {
      allowedTypes: ['application/pdf'],
      maxSizeBytes,
      onProgress: (progress) => {
        setProgress(progress);
      },
      onError: (error) => {
        console.error('Upload error:', error);
        setIsUploading(false);
        setProgress(0);
        
        toast.error(`Feltöltési hiba: ${error.message}`);
        onError?.(error);
      },
      onComplete: (url, metadata) => {
        setIsUploading(false);
        setProgress(100);
        
        setUploadedFile({
          url,
          name: file.name,
          size: file.size
        });
        
        toast.success('PDF sikeresen feltöltve');
        onUpload?.(url, metadata!);
      },
      customMetadata: {
        originalName: file.name,
        fileSize: file.size.toString()
      }
    };

    try {
      await uploadFile(file, storagePath, uploadOptions);
    } catch (error) {
      // Error handling is already done in uploadOptions.onError
    }
  }, [disabled, isUploading, storagePath, maxSizeBytes, onUpload, onError]);

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
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove PDF
  const handleRemove = () => {
    if (disabled || isUploading) return;
    
    setUploadedFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Card 
        className={`transition-all duration-200 ${
          dragOver ? 'border-primary bg-primary/5' : 'border-dashed border-muted-foreground/25'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-muted-foreground/50'}`}
      >
        <CardContent className="p-0">
          {uploadedFile ? (
            // PDF preview mode
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm truncate">{uploadedFile.name}</h4>
                    <div className="flex gap-2">
                      {showPreview && uploadedFile.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(uploadedFile.url, '_blank')}
                          disabled={disabled}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || isUploading}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemove}
                        disabled={disabled || isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {uploadedFile.size > 0 && (
                      <span>{formatFileSize(uploadedFile.size)} • </span>
                    )}
                    <span>PDF dokumentum</span>
                  </div>
                  
                  {/* Upload progress */}
                  {isUploading && (
                    <div className="mt-3">
                      <Progress value={progress} className="mb-2" />
                      <p className="text-xs text-muted-foreground">
                        Feltöltés: {Math.round(progress)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
                  <div className="flex justify-center">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <FileText className="h-10 w-10 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-medium">{placeholder}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Húzd ide a PDF fájlt vagy kattints a böngészéshez
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF dokumentum • Maximum {Math.round(maxSizeBytes / (1024 * 1024))}MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status messages */}
      {!isUploading && progress === 100 && uploadedFile && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>PDF sikeresen feltöltve</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
}