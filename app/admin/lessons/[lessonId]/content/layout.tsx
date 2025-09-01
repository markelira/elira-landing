export async function generateStaticParams() {
  return [
    { lessonId: 'lesson-1' },
    { lessonId: 'lesson-2' }
  ]
}

export default function AdminLessonContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}