'use client'

import React from 'react'

interface ProgressBarProps {
  value: number // 0-100
  className?: string
  height?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
  animated?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className = '',
  height = 'md',
  showLabel = false,
  label,
  color = 'blue',
  animated = true
}) => {
  // Ensure value is between 0 and 100
  const percentage = Math.min(100, Math.max(0, value))
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }
  
  const backgroundColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {percentage}%
          </span>
        </div>
      )}
      <div 
        className={`
          w-full rounded-full overflow-hidden
          ${backgroundColorClasses[color]}
          ${heightClasses[height]}
        `}
      >
        <div 
          className={`
            ${colorClasses[color]}
            ${heightClasses[height]}
            rounded-full
            ${animated ? 'transition-all duration-500 ease-out' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface CircularProgressProps {
  value: number // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
  showLabel?: boolean
  label?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
  className?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 'md',
  strokeWidth = 4,
  showLabel = true,
  label,
  color = 'blue',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, value))
  
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 100
  }
  
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500'
  }
  
  const svgSize = sizeMap[size]
  const center = svgSize / 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={svgSize}
        height={svgSize}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={`${colorClasses[color]} transition-all duration-500 ease-out`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {label || `${percentage}%`}
          </span>
        </div>
      )}
    </div>
  )
}

interface SteppedProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  className?: string
  color?: 'blue' | 'green' | 'yellow' | 'red'
}

export const SteppedProgress: React.FC<SteppedProgressProps> = ({
  currentStep,
  totalSteps,
  labels = [],
  className = '',
  color = 'blue'
}) => {
  const colorClasses = {
    blue: {
      active: 'bg-blue-500 border-blue-500',
      completed: 'bg-blue-500 border-blue-500',
      inactive: 'bg-gray-200 border-gray-300'
    },
    green: {
      active: 'bg-green-500 border-green-500',
      completed: 'bg-green-500 border-green-500',
      inactive: 'bg-gray-200 border-gray-300'
    },
    yellow: {
      active: 'bg-yellow-500 border-yellow-500',
      completed: 'bg-yellow-500 border-yellow-500',
      inactive: 'bg-gray-200 border-gray-300'
    },
    red: {
      active: 'bg-red-500 border-red-500',
      completed: 'bg-red-500 border-red-500',
      inactive: 'bg-gray-200 border-gray-300'
    }
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep
        const isInactive = stepNumber > currentStep
        
        let stepClass = colorClasses[color].inactive
        if (isCompleted) stepClass = colorClasses[color].completed
        if (isActive) stepClass = colorClasses[color].active

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300
                  ${stepClass}
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {stepNumber}
                  </span>
                )}
              </div>
              {labels[index] && (
                <span className="text-xs text-gray-600 mt-1 text-center">
                  {labels[index]}
                </span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`
                  flex-1 h-0.5 mx-2
                  ${isCompleted ? colorClasses[color].completed : 'bg-gray-300'}
                  transition-all duration-300
                `}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}