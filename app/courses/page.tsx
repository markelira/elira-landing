'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CoursesPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Immediately redirect to the AI copywriting course
    router.replace('/courses/ai-copywriting-course')
  }, [router])
  
  return null // Return nothing while redirecting
}