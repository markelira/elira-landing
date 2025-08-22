'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Maximize2, Eye } from 'lucide-react';
import Image from 'next/image';
import useAnalytics from '@/hooks/useAnalytics';

interface Preview {
  thumbnail: string;
  pages: number;
  fileSize: string;
  screenshots: string[];
  sampleContent: string;
}

interface MagnetPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  preview: Preview;
  title: string;
  magnetId: string;
  onDownload: () => void;
}

const MagnetPreview: React.FC<MagnetPreviewProps> = ({
  isOpen,
  onClose,
  preview,
  title,
  magnetId,
  onDownload
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const { track } = useAnalytics();

  const handlePrevious = () => {
    setCurrentPage((prev) => 
      prev === 0 ? preview.screenshots.length - 1 : prev - 1
    );
    track('preview_navigation', { 
      magnet: magnetId, 
      direction: 'previous', 
      page: currentPage 
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => 
      prev === preview.screenshots.length - 1 ? 0 : prev + 1
    );
    track('preview_navigation', { 
      magnet: magnetId, 
      direction: 'next', 
      page: currentPage 
    });
  };

  const handleDownloadClick = () => {
    track('preview_modal_download', { magnet: magnetId });
    onDownload();
  };

  const handleClose = () => {
    track('preview_modal_close', { magnet: magnetId });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {title}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>{preview.pages} oldal</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>{preview.fileSize}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>PDF formátum</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleDownloadClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white 
                           rounded-full font-medium hover:bg-teal-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Letöltés
                </motion.button>
                
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors 
                           rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)]">
              
              {/* Preview Area */}
              <div className="flex-1 relative bg-gray-50 flex items-center justify-center min-h-[400px]">
                {preview.screenshots.length > 0 ? (
                  <>
                    {/* Main Preview Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                      <div className="relative max-w-2xl max-h-full shadow-lg rounded-lg overflow-hidden">
                        <Image
                          src={preview.screenshots[currentPage]}
                          alt={`${title} - ${currentPage + 1}. oldal`}
                          width={1440}
                          height={920}
                          className="w-full h-auto object-contain"
                          onLoad={() => setImageLoading(false)}
                          onError={() => setImageLoading(false)}
                        />
                        
                        {imageLoading && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="text-gray-400">
                              <Eye className="w-8 h-8 mx-auto mb-2" />
                              <span className="text-sm">Betöltés...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    {preview.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevious}
                          className="absolute left-4 top-1/2 -translate-y-1/2 
                                   p-3 bg-white/90 rounded-full shadow-lg 
                                   hover:bg-white transition-all duration-200
                                   text-gray-700 hover:text-gray-900"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 
                                   p-3 bg-white/90 rounded-full shadow-lg 
                                   hover:bg-white transition-all duration-200
                                   text-gray-700 hover:text-gray-900"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Page Indicator */}
                    {preview.screenshots.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
                                    bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                        {currentPage + 1} / {preview.screenshots.length}
                      </div>
                    )}
                  </>
                ) : (
                  // Fallback if no screenshots
                  <div className="text-center text-gray-400">
                    <Maximize2 className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Előnézet hamarosan</p>
                    <p className="text-sm">A PDF részletes előnézete elkészítés alatt</p>
                  </div>
                )}
              </div>

              {/* Sidebar with details */}
              <div className="w-full lg:w-80 p-6 border-l border-gray-200 bg-white overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Sample Content */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Tartalom minta
                    </h4>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 
                                  rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-700 font-mono leading-relaxed">
                        {preview.sampleContent}
                      </p>
                    </div>
                  </div>

                  {/* File Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Fájl részletek
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Oldalak:</span>
                        <span className="font-medium">{preview.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Méret:</span>
                        <span className="font-medium">{preview.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Formátum:</span>
                        <span className="font-medium">PDF</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleDownloadClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 
                               px-4 py-3 bg-gradient-to-r from-teal-700 to-cyan-600 
                               text-white font-semibold rounded-lg
                               hover:shadow-lg transition-all duration-200"
                    >
                      <Download className="w-4 h-4" />
                      Letöltöm Ingyen
                    </motion.button>
                    
                    <button
                      onClick={handleClose}
                      className="w-full px-4 py-2 text-gray-600 border border-gray-300 
                               rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Bezárás
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MagnetPreview;