'use client'

import React from 'react'
import { X } from 'lucide-react'

interface VideoPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
  courseTitle: string
}

export function VideoPreviewModal({ isOpen, onClose, videoUrl, courseTitle }: VideoPreviewModalProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4">
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Video Content */}
          <div className="relative aspect-video bg-gray-900">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <p className="text-white/70">Demo videó hamarosan elérhető</p>
                  <p className="text-white/50 text-sm mt-2">{courseTitle}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}