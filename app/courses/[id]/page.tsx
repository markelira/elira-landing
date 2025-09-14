import React from 'react'
import CourseDetailClient from './CourseDetailClient'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator'
import { PerformanceProvider } from '@/components/PerformanceProvider'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return [
    { id: 'ai-copywriting-course' }
  ]
}

export default async function CourseDetailPage({ params }: Props) {
  const resolvedParams = await params
  
  return (
    <PerformanceProvider>
      <ScrollProgressIndicator />
      <FloatingNavbar />
      <main className="pt-16 md:pt-0">
        <CourseDetailClient courseId={resolvedParams.id} />
      </main>
      <Footer />
    </PerformanceProvider>
  )
}