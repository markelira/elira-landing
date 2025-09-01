'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { Toaster } from 'sonner'
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

// Lazy load performance monitor (client-side only)
const PerformanceMonitor = dynamic(
  () => import('@/components/PerformanceMonitor').then(mod => mod.PerformanceMonitor),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        retry: (failureCount, error: any) => {
          if (error?.status === 404 || error?.status === 401) {
            return false
          }
          return failureCount < 3
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" />
        {children}
        {/* Temporarily disabled PerformanceMonitor to fix infinite loop */}
        {/* <PerformanceMonitor /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}