'use client'

import React, { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
  }
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      {/* Native Share (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Megosztás"
        >
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>
      )}
      
      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
        title="Megosztás Facebook-on"
      >
        <Facebook className="w-5 h-5 text-blue-600" />
      </a>
      
      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
        title="Megosztás Twitter-en"
      >
        <Twitter className="w-5 h-5 text-sky-600" />
      </a>
      
      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
        title="Megosztás LinkedIn-en"
      >
        <Linkedin className="w-5 h-5 text-blue-700" />
      </a>
      
      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-lg transition-all ${
          copied 
            ? 'bg-green-100 hover:bg-green-200' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        title={copied ? 'Másolva!' : 'Link másolása'}
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Link className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </div>
  )
}