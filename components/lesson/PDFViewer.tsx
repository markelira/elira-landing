"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Search,
  Bookmark,
  BookmarkPlus,
  Maximize2,
  Minimize2,
  Loader2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title?: string;
  onProgressUpdate?: (progress: number) => void;
  enableBookmarks?: boolean;
  enableSearch?: boolean;
  enableDownload?: boolean;
}

interface Bookmark {
  page: number;
  title: string;
  timestamp: Date;
}

export default function PDFViewer({
  url,
  title = 'PDF Document',
  onProgressUpdate,
  enableBookmarks = true,
  enableSearch = true,
  enableDownload = true,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Calculate reading progress
  useEffect(() => {
    if (numPages > 0) {
      const progress = Math.round((currentPage / numPages) * 100);
      setReadingProgress(progress);
      onProgressUpdate?.(progress);
    }
  }, [currentPage, numPages, onProgressUpdate]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(`pdf-bookmarks-${url}`);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [url]);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks: Bookmark[]) => {
    localStorage.setItem(`pdf-bookmarks-${url}`, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError('PDF betöltése sikertelen');
    setIsLoading(false);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  const rotate = () => setRotation(prev => (prev + 90) % 360);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Add bookmark
  const addBookmark = () => {
    const bookmarkTitle = prompt('Könyvjelző név:', `${title} - ${currentPage}. oldal`);
    if (bookmarkTitle) {
      const newBookmark: Bookmark = {
        page: currentPage,
        title: bookmarkTitle,
        timestamp: new Date(),
      };
      const newBookmarks = [...bookmarks, newBookmark];
      saveBookmarks(newBookmarks);
      toast.success('Könyvjelző hozzáadva');
    }
  };

  // Remove bookmark
  const removeBookmark = (index: number) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    saveBookmarks(newBookmarks);
    toast.success('Könyvjelző törölve');
  };

  // Search functionality
  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // This is a simplified search - in a real implementation,
      // you'd use PDF.js text extraction capabilities
      const results = [];
      for (let i = 1; i <= numPages; i++) {
        // Mock search results for demonstration
        if (Math.random() > 0.7) {
          results.push({
            page: i,
            text: `Found "${term}" on page ${i}`,
          });
        }
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Keresési hiba történt');
    } finally {
      setIsSearching(false);
    }
  }, [numPages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const downloadPDF = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success('PDF letöltése megkezdődött');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Letöltési hiba történt');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            prevPage();
            break;
          case 'ArrowRight':
            nextPage();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, numPages]);

  if (error) {
    return (
      <Card className="p-8">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">PDF betöltési hiba</h3>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`pdf-viewer ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
    >
      {/* Toolbar */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  min="1"
                  max={numPages}
                />
                <span className="text-sm text-muted-foreground">
                  / {numPages || '...'}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="text-sm min-w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={resetZoom}>
                100%
              </Button>
            </div>

            {/* Tools */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={rotate}>
                <RotateCw className="h-4 w-4" />
              </Button>

              {enableBookmarks && (
                <Button variant="outline" size="sm" onClick={addBookmark}>
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              )}

              {enableDownload && (
                <Button variant="outline" size="sm" onClick={downloadPDF}>
                  <Download className="h-4 w-4" />
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {readingProgress > 0 && (
            <div className="mt-4">
              <Progress value={readingProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-center">
                Olvasási haladás: {readingProgress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="w-64 space-y-4">
          {/* Search */}
          {enableSearch && (
            <Card>
              <CardContent className="p-4">
                <form onSubmit={handleSearch} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Keresés a PDF-ben..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="sm" disabled={isSearching}>
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </form>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-2 bg-muted rounded cursor-pointer hover:bg-muted/80"
                        onClick={() => goToPage(result.page)}
                      >
                        <p className="text-xs text-muted-foreground">
                          {result.page}. oldal
                        </p>
                        <p className="text-sm">{result.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Bookmarks */}
          {enableBookmarks && bookmarks.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Könyvjelzők</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBookmarks(!showBookmarks)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>

                {showBookmarks && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {bookmarks.map((bookmark, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => goToPage(bookmark.page)}
                        >
                          <p className="text-sm font-medium">{bookmark.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {bookmark.page}. oldal
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBookmark(index)}
                        >
                          <span className="text-xs">×</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* PDF Document */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="flex justify-center">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">PDF betöltése...</p>
                </div>
              )}

              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                error={null}
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  loading={
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center py-8 text-red-500">
                      <FileText className="h-6 w-6 mr-2" />
                      Oldal betöltési hiba
                    </div>
                  }
                />
              </Document>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}