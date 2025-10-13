'use client';

import { FileQuestion } from 'lucide-react';
import { emptyStateStyles } from '@/lib/blog-design-tokens';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={emptyStateStyles.container}>
      <FileQuestion className={emptyStateStyles.icon} />
      <h3 className={emptyStateStyles.title}>{title}</h3>
      <p className={emptyStateStyles.description}>{description}</p>
    </div>
  );
}
