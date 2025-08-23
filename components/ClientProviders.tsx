'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Lazy load performance monitor (client-side only)
const PerformanceMonitor = dynamic(
  () => import('@/components/PerformanceMonitor').then(mod => mod.PerformanceMonitor),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PerformanceMonitor />
    </>
  );
}