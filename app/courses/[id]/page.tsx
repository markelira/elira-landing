import React from 'react'
import CourseDetailClient from './CourseDetailClient'
import { PremiumHeader } from '@/components/PremiumHeader'
import { PremiumFooter } from '@/components/PremiumFooter'
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
      <PremiumHeader />
      <main>
        <CourseDetailClient courseId={resolvedParams.id} />
      </main>
      <PremiumFooter />
    </PerformanceProvider>
  )
}