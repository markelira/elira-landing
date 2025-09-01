import React from 'react'
import CourseDetailClient from './CourseDetailClient'

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
  
  return <CourseDetailClient courseId={resolvedParams.id} />
}