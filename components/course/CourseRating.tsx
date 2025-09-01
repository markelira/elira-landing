'use client'

import React from 'react'
import { Star } from 'lucide-react'

interface CourseRatingProps {
  rating: number
  reviewCount: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
}

export function CourseRating({ rating, reviewCount, size = 'md', showCount = true }: CourseRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} 
        />
      )
    }
    
    // Half star
    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${sizeClasses[size]} text-gray-300 fill-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} />
          </div>
        </div>
      )
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`} 
          className={`${sizeClasses[size]} text-gray-300 fill-gray-300`} 
        />
      )
    }
    
    return stars
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      {showCount && (
        <div className={`flex items-center gap-1 ${textSizeClasses[size]} text-gray-600`}>
          <span className="font-semibold">{rating.toFixed(1)}</span>
          <span>({reviewCount.toLocaleString('hu-HU')} értékelés)</span>
        </div>
      )}
    </div>
  )
}