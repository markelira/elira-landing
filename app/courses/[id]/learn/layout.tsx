export async function generateStaticParams() {
  return [
    { id: 'ai-copywriting-course' }
  ]
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}