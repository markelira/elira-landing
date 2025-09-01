'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Upload,
  Grid,
  List,
  Filter,
  X,
  Download,
  Trash2,
  Copy,
  Check,
  Image,
  Video,
  FileText,
  Music,
  File,
  Calendar,
  HardDrive,
  Eye,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { uploadFile } from '@/lib/upload';
import { toast } from 'sonner';
import { FIREBASE_FUNCTIONS_URL } from '@/lib/config';
import { auth } from '@/lib/firebase';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  type: 'image' | 'video' | 'pdf' | 'audio' | 'other';
  size: string;
  mimeType: string;
  uploadedAt: Date;
  uploadedBy: string;
  category: string;
  lessonId?: string;
  courseId?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio
  usage: number; // number of times used
}

interface MediaLibraryProps {
  onSelect?: (file: MediaFile) => void;
  selectable?: boolean;
  allowMultiple?: boolean;
  fileTypes?: string[]; // Filter by file types
  courseId?: string;
  lessonId?: string;
}

export default function MediaLibrary({
  onSelect,
  selectable = false,
  allowMultiple = false,
  fileTypes,
  courseId,
  lessonId,
}: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'pdf' | 'audio' | 'other'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'size'>('newest');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [totalStorage, setTotalStorage] = useState({ used: 0, limit: 5000 }); // in MB

  useEffect(() => {
    fetchMediaFiles();
  }, [courseId, lessonId, filterType, sortBy]);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const params = new URLSearchParams();
      
      if (courseId) params.append('courseId', courseId);
      if (lessonId) params.append('lessonId', lessonId);
      if (filterType !== 'all') params.append('type', filterType);
      params.append('sort', sortBy);

      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/media?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
        setTotalStorage(data.storage || { used: 0, limit: 5000 });
      }
    } catch (error) {
      console.error('Error fetching media files:', error);
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile(file, {
        category: 'misc',
        purpose: 'general',
        entityId: courseId || lessonId,
      });

      if (result.success && result.urls?.original) {
        // Create media file object
        const mediaFile: MediaFile = {
          id: `media_${Date.now()}`,
          name: file.name,
          url: result.urls.original,
          thumbnail: result.urls.thumbnail,
          type: getFileType(file.type),
          size: formatFileSize(file.size),
          mimeType: file.type,
          uploadedAt: new Date(),
          uploadedBy: auth.currentUser?.email || 'unknown',
          category: 'misc',
          courseId,
          lessonId,
          usage: 0,
        };

        setFiles([mediaFile, ...files]);
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/media/${fileId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setFiles(files.filter(f => f.id !== fileId));
        toast.success('File deleted successfully');
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleSelect = (file: MediaFile) => {
    if (!selectable) return;

    if (allowMultiple) {
      const newSelected = new Set(selectedFiles);
      if (newSelected.has(file.id)) {
        newSelected.delete(file.id);
      } else {
        newSelected.add(file.id);
      }
      setSelectedFiles(newSelected);
    } else {
      setSelectedFiles(new Set([file.id]));
      if (onSelect) onSelect(file);
    }
  };

  const handleSelectMultiple = () => {
    if (!onSelect || selectedFiles.size === 0) return;
    
    const selected = files.filter(f => selectedFiles.has(f.id));
    selected.forEach(file => onSelect(file));
    setSelectedFiles(new Set());
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const getFileType = (mimeType: string): MediaFile['type'] => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesFileTypes = !fileTypes || fileTypes.some(type => file.mimeType.includes(type));
    return matchesSearch && matchesType && matchesFileTypes;
  });

  const storagePercentage = (totalStorage.used / totalStorage.limit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Media Library</h2>
          <p className="text-gray-600 mt-1">Manage all your course media files</p>
        </div>
        
        <label className="cursor-pointer">
          <Button disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept={fileTypes?.join(',')}
          />
        </label>
      </div>

      {/* Storage Info */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Storage Usage</span>
          </div>
          <span className="text-sm text-gray-600">
            {totalStorage.used} MB / {totalStorage.limit} MB
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              storagePercentage > 90 ? 'bg-red-500' : storagePercentage > 70 ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${storagePercentage}%` }}
          />
        </div>
      </Card>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="pdf">PDFs</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="size">Size</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Selected Files Actions */}
      {selectable && selectedFiles.size > 0 && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedFiles.size} file{selectedFiles.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedFiles(new Set())}
              >
                Clear Selection
              </Button>
              {allowMultiple && (
                <Button
                  size="sm"
                  onClick={handleSelectMultiple}
                >
                  Use Selected
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Files Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card className="p-12 text-center">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No files found</p>
          <p className="text-sm text-gray-500">
            {searchQuery ? 'Try adjusting your search terms' : 'Upload your first file to get started'}
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map(file => (
            <Card
              key={file.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedFiles.has(file.id)
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleSelect(file)}
            >
              {/* Preview */}
              <div className="aspect-square bg-gray-100 relative">
                {file.type === 'image' && file.thumbnail ? (
                  <img
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
                
                {selectedFiles.has(file.id) && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {file.usage > 0 && (
                  <Badge className="absolute bottom-2 left-2 text-xs">
                    Used {file.usage}x
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{file.size}</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(file.url);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Copy URL"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="View"
                    >
                      <Eye className="w-3 h-3" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFiles.map(file => (
            <Card
              key={file.id}
              className={`p-4 ${
                selectedFiles.has(file.id)
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {selectable && (
                    <input
                      type={allowMultiple ? 'checkbox' : 'radio'}
                      checked={selectedFiles.has(file.id)}
                      onChange={() => handleSelect(file)}
                      className="w-4 h-4"
                    />
                  )}
                  
                  {getFileIcon(file.type)}
                  
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{file.size}</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                      {file.usage > 0 && <span>Used {file.usage} times</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(file.url)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    as="a"
                    href={file.url}
                    target="_blank"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(file.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}