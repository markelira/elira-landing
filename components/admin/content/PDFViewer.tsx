'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  X, 
  Save, 
  ZoomIn,
  ZoomOut,
  Maximize,
  Eye,
  Lock,
  Unlock,
  Info,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { uploadFile } from '@/lib/upload';
import { toast } from 'sonner';

interface PDFViewerProps {
  lessonId: string;
  content?: {
    pdfUrl?: string;
    title?: string;
    description?: string;
    totalPages?: number;
    fileSize?: string;
    allowDownload?: boolean;
    allowPrint?: boolean;
    requireCompletion?: boolean;
    minimumViewTime?: number; // in seconds
    watermark?: boolean;
    watermarkText?: string;
  };
  onSave: (content: any) => Promise<void>;
}

export default function PDFViewer({ lessonId, content = {}, onSave }: PDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState(content.pdfUrl || '');
  const [title, setTitle] = useState(content.title || '');
  const [description, setDescription] = useState(content.description || '');
  const [totalPages, setTotalPages] = useState(content.totalPages || 0);
  const [fileSize, setFileSize] = useState(content.fileSize || '');
  const [settings, setSettings] = useState({
    allowDownload: content.allowDownload ?? true,
    allowPrint: content.allowPrint ?? true,
    requireCompletion: content.requireCompletion ?? false,
    minimumViewTime: content.minimumViewTime || 0,
    watermark: content.watermark ?? false,
    watermarkText: content.watermarkText || '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Kérlek, tölts fel egy PDF fájlt');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast.error('A PDF fájl maximum 50MB lehet');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadFile(file, {
        category: 'lesson',
        purpose: 'pdf',
        entityId: lessonId,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success && result.urls?.original) {
        setPdfUrl(result.urls.original);
        setTitle(file.name.replace('.pdf', ''));
        
        // Calculate file size
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        setFileSize(`${sizeInMB} MB`);
        
        toast.success('PDF sikeresen feltöltve');
      }
    } catch (error) {
      console.error('PDF upload error:', error);
      toast.error('PDF feltöltése sikertelen');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title || 'document.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSave = async () => {
    if (!pdfUrl) {
      toast.error('Please upload a PDF file first');
      return;
    }

    setSaving(true);
    try {
      const contentData = {
        pdfUrl,
        title,
        description,
        totalPages,
        fileSize,
        ...settings,
        lastModified: new Date().toISOString(),
      };

      await onSave(contentData);
      toast.success('PDF tartalom sikeresen mentve');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('PDF tartalom mentése sikertelen');
    } finally {
      setSaving(false);
    }
  };

  const zoomOptions = [
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
    { value: 125, label: '125%' },
    { value: 150, label: '150%' },
    { value: 200, label: '200%' },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">PDF dokumentum</h3>
        
        {pdfUrl ? (
          <div className="space-y-4">
            {/* PDF Preview */}
            <div className="border rounded-lg overflow-hidden">
              {/* PDF Controls */}
              <div className="bg-gray-100 border-b px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages || '?'}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages || currentPage + 1, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setZoom(Math.max(50, zoom - 25))}
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <select
                        value={zoom}
                        onChange={(e) => setZoom(parseInt(e.target.value))}
                        className="px-2 py-1 text-sm border rounded"
                      >
                        {zoomOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setZoom(Math.min(200, zoom + 25))}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {settings.allowDownload && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(pdfUrl, '_blank')}
                    >
                      <Maximize className="w-4 h-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="bg-gray-50 p-4" style={{ height: '600px' }}>
                <iframe
                  src={`${pdfUrl}#page=${currentPage}&zoom=${zoom}`}
                  className="w-full h-full rounded"
                  title={title}
                />
              </div>
            </div>

            {/* PDF Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  PDF feltöltve
                </Badge>
                {fileSize && (
                  <span className="text-sm text-gray-600">
                    File size: {fileSize}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPdfUrl('');
                  setTitle('');
                  setDescription('');
                  setTotalPages(0);
                  setFileSize('');
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Remove PDF
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
                  Uploading PDF... {uploadProgress}%
                </p>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload PDF or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF files only (max 50MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handlePDFUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}
      </Card>

      {/* PDF Details */}
      {pdfUrl && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dokumentum részletek</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Document Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the document content..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Total Pages
              </label>
              <Input
                type="number"
                value={totalPages}
                onChange={(e) => setTotalPages(parseInt(e.target.value) || 0)}
                placeholder="Number of pages in the document"
                min={1}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Settings */}
      {pdfUrl && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">PDF beállítások</h3>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.allowDownload}
                    onChange={(e) => setSettings({ ...settings, allowDownload: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Allow Download</span>
                    <p className="text-sm text-gray-600">Students can download the PDF file</p>
                  </div>
                </div>
                {settings.allowDownload ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.allowPrint}
                    onChange={(e) => setSettings({ ...settings, allowPrint: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Allow Printing</span>
                    <p className="text-sm text-gray-600">Students can print the document</p>
                  </div>
                </div>
                {settings.allowPrint ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.requireCompletion}
                    onChange={(e) => setSettings({ ...settings, requireCompletion: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Require Completion</span>
                    <p className="text-sm text-gray-600">Students must view all pages to mark as complete</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.watermark}
                    onChange={(e) => setSettings({ ...settings, watermark: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium">Add Watermark</span>
                    <p className="text-sm text-gray-600">Display watermark on PDF pages</p>
                  </div>
                </div>
              </label>
            </div>

            {settings.watermark && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Watermark Text
                </label>
                <Input
                  value={settings.watermarkText}
                  onChange={(e) => setSettings({ ...settings, watermarkText: e.target.value })}
                  placeholder="e.g., CONFIDENTIAL, Student Name, etc."
                />
              </div>
            )}

            {settings.requireCompletion && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum View Time (seconds)
                </label>
                <Input
                  type="number"
                  value={settings.minimumViewTime}
                  onChange={(e) => setSettings({ ...settings, minimumViewTime: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min={0}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum time students must spend viewing the document
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Info Box */}
      {pdfUrl && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900">PDF Best Practices</h4>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>• Keep file sizes under 10MB for faster loading</li>
                <li>• Use clear, readable fonts and good contrast</li>
                <li>• Include bookmarks for easy navigation in long documents</li>
                <li>• Consider adding a table of contents for documents over 10 pages</li>
                <li>• Ensure text is selectable for better accessibility</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || !pdfUrl}
          className="px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Mentés...' : 'PDF tartalom mentése'}
        </Button>
      </div>
    </div>
  );
}