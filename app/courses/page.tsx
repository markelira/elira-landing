'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CoursesPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to home page since course page is no longer accessible
    router.replace('/')
  }, [router])
  
  return null // Return nothing while redirecting
}