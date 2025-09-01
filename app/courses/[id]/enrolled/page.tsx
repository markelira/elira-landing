import React from 'react'
import EnrolledClient from './EnrolledClient'

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

export default async function EnrolledPage({ params }: Props) {
  const resolvedParams = await params
  
  return <EnrolledClient courseId={resolvedParams.id} />
}