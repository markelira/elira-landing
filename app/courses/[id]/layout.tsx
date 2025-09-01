import { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  
  // For MVP, return generic metadata
  // In production, you would fetch course data from API
  return {
    title: 'Online Kurzus | Elira Learning Platform',
    description: 'Fedezd fel prémium online kurzusainkat. Tanulj új készségeket szakértő oktatóktól, saját tempódban.',
    keywords: 'online kurzus, e-learning, képzés, oktatás, tanulás, Elira',
    openGraph: {
      title: 'Online Kurzus | Elira',
      description: 'Fedezd fel prémium online kurzusainkat. Tanulj új készségeket szakértő oktatóktól.',
      type: 'website',
      locale: 'hu_HU',
      siteName: 'Elira'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Online Kurzus | Elira',
      description: 'Fedezd fel prémium online kurzusainkat.'
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default function CourseDetailLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  )
}