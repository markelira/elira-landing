'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Link, 
  Play, 
  Settings, 
  Clock, 
  FileText, 
  X, 
  Save,
  Video,
  Youtube,
  Monitor,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { uploadFile } from '@/lib/upload';
import { toast } from 'sonner';

interface VideoEditorProps {
  lessonId: string;
  content?: {
    videoUrl?: string;
    videoType?: 'upload' | 'youtube' | 'vimeo' | 'embed';
    duration?: number;
    thumbnail?: string;
    captions?: Array<{
      language: string;
      url: string;
    }>;
    settings?: {
      autoplay?: boolean;
      showControls?: boolean;
      allowDownload?: boolean;
      allowSpeedControl?: boolean;
      startTime?: number;
      endTime?: number;
    };
  };
  onSave: (content: any) => Promise<void>;
}

export default function VideoEditor({ lessonId, content = {}, onSave }: VideoEditorProps) {
  const [videoType, setVideoType] = useState<'upload' | 'youtube' | 'vimeo' | 'embed'>(
    content.videoType || 'upload'
  );
  const [videoUrl, setVideoUrl] = useState(content.videoUrl || '');
  const [thumbnail, setThumbnail] = useState(content.thumbnail || '');
  const [duration, setDuration] = useState(content.duration || 0);
  const [captions, setCaptions] = useState(content.captions || []);
  const [settings, setSettings] = useState(content.settings || {
    autoplay: false,
    showControls: true,
    allowDownload: true,
    allowSpeedControl: true,
    startTime: 0,
    endTime: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  const videoTypes = [
    { value: 'upload', label: 'Videó feltöltés', icon: <Upload className="w-4 h-4" /> },
    { value: 'youtube', label: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
    { value: 'vimeo', label: 'Vimeo', icon: <Video className="w-4 h-4" /> },
    { value: 'embed', label: 'Beágyazás URL', icon: <Monitor className="w-4 h-4" /> },
  ];

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) { // 500MB limit
      toast.error('Video file must be less than 500MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await uploadFile(file, {
        category: 'lesson',
        purpose: 'video',
        entityId: lessonId,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success && result.urls?.original) {
        setVideoUrl(result.urls.original);
        
        // Extract video duration from file if possible
        const videoElement = document.createElement('video');
        videoElement.src = result.urls.original;
        videoElement.onloadedmetadata = () => {
          setDuration(Math.floor(videoElement.duration));
        };
        
        toast.success('Video uploaded successfully');
      }
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file, {
        category: 'lesson',
        purpose: 'thumbnail',
        entityId: lessonId,
      });

      if (result.success && result.urls?.original) {
        setThumbnail(result.urls.original);
        toast.success('Thumbnail uploaded successfully');
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      toast.error('Failed to upload thumbnail');
    }
  };

  const handleCaptionUpload = async (e: React.ChangeEvent<HTMLInputElement>, language: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file, {
        category: 'lesson',
        purpose: 'caption',
        entityId: lessonId,
      });

      if (result.success && result.urls?.original) {
        setCaptions(prev => [
          ...prev.filter(c => c.language !== language),
          { language, url: result.urls?.original || '' }
        ]);
        toast.success('Caption uploaded successfully');
      }
    } catch (error) {
      console.error('Caption upload error:', error);
      toast.error('Failed to upload caption');
    }
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?]*)/);
    return match ? match[1] : null;
  };

  const extractVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentData = {
        videoUrl,
        videoType,
        duration,
        thumbnail,
        captions,
        settings,
      };

      await onSave(contentData);
      toast.success('Video content saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save video content');
    } finally {
      setSaving(false);
    }
  };

  const getEmbedUrl = () => {
    switch (videoType) {
      case 'youtube':
        const youtubeId = extractYouTubeId(videoUrl);
        return youtubeId 
          ? `https://www.youtube.com/embed/${youtubeId}?${settings.autoplay ? 'autoplay=1&' : ''}${settings.showControls ? '' : 'controls=0&'}${settings.startTime ? `start=${settings.startTime}&` : ''}${settings.endTime ? `end=${settings.endTime}` : ''}`
          : '';
      case 'vimeo':
        const vimeoId = extractVimeoId(videoUrl);
        return vimeoId 
          ? `https://player.vimeo.com/video/${vimeoId}?${settings.autoplay ? 'autoplay=1&' : ''}${!settings.showControls ? 'controls=0&' : ''}`
          : '';
      default:
        return videoUrl;
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Type Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Videó forrása</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {videoTypes.map(type => (
            <button
              key={type.value}
              onClick={() => setVideoType(type.value as any)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                videoType === type.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type.icon}
              <span className="font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Upload Video */}
        {videoType === 'upload' && (
          <div>
            {videoUrl ? (
              <div className="space-y-4">
                <video
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg"
                />
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Video uploaded
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVideoUrl('')}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                {uploading ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload video or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, WebM, or OGG (max 500MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        )}

        {/* YouTube/Vimeo/Embed URL */}
        {videoType !== 'upload' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {videoType === 'youtube' ? 'YouTube' : videoType === 'vimeo' ? 'Vimeo' : 'Video'} URL
              </label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={
                  videoType === 'youtube'
                    ? 'https://www.youtube.com/watch?v=...'
                    : videoType === 'vimeo'
                    ? 'https://vimeo.com/...'
                    : 'https://example.com/video.mp4'
                }
              />
            </div>
            
            {videoUrl && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl()}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Video Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Videó beállítások</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Duration (seconds)
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              placeholder="Enter video duration"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Thumbnail Image
            </label>
            {thumbnail ? (
              <div className="flex items-center space-x-2">
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="w-20 h-12 object-cover rounded"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setThumbnail('')}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload thumbnail</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {(videoType === 'youtube' || videoType === 'vimeo') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Time (seconds)
                </label>
                <Input
                  type="number"
                  value={settings.startTime}
                  onChange={(e) => setSettings({ ...settings, startTime: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  End Time (seconds)
                </label>
                <Input
                  type="number"
                  value={settings.endTime}
                  onChange={(e) => setSettings({ ...settings, endTime: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={(e) => setSettings({ ...settings, autoplay: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Autoplay video when lesson loads</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.showControls}
              onChange={(e) => setSettings({ ...settings, showControls: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Show video controls</span>
          </label>

          {videoType === 'upload' && (
            <>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.allowDownload}
                  onChange={(e) => setSettings({ ...settings, allowDownload: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Allow video download</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.allowSpeedControl}
                  onChange={(e) => setSettings({ ...settings, allowSpeedControl: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Allow playback speed control</span>
              </label>
            </>
          )}
        </div>
      </Card>

      {/* Captions/Subtitles */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          <FileText className="w-5 h-5 inline mr-2" />
          Feliratok és alcímek
        </h3>
        
        <div className="space-y-4">
          {['en', 'es', 'fr', 'de', 'pt'].map(lang => {
            const caption = captions.find(c => c.language === lang);
            const langNames = {
              en: 'English',
              es: 'Spanish',
              fr: 'French',
              de: 'German',
              pt: 'Portuguese',
            };
            
            return (
              <div key={lang} className="flex items-center justify-between">
                <span className="text-sm font-medium">{langNames[lang as keyof typeof langNames]}</span>
                {caption ? (
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCaptions(captions.filter(c => c.language !== lang))}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      Upload .vtt file
                    </span>
                    <input
                      type="file"
                      accept=".vtt"
                      onChange={(e) => handleCaptionUpload(e, lang)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Upload WebVTT (.vtt) files for captions. Captions improve accessibility and help non-native speakers.
        </p>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || !videoUrl}
          className="px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Mentés...' : 'Videó tartalom mentése'}
        </Button>
      </div>
    </div>
  );
}