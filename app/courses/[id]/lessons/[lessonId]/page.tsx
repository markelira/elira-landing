import React from 'react'
import LessonPlayerClient from './LessonPlayerClient'

interface Props {
  params: Promise<{
    id: string
    lessonId: string
  }>
}

export const dynamic = 'force-dynamic';

export default async function LessonPlayerPage({ params }: Props) {
  const resolvedParams = await params
  
  return (
    <LessonPlayerClient 
      courseId={resolvedParams.id}
      lessonId={resolvedParams.lessonId}
    />
  )
}