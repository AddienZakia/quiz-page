'use client';

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProgressProvider
          color="#004238"
          height="4px"
          options={{ showSpinner: false }}
        >
          <Toaster position="top-center" richColors />
          {children}
        </ProgressProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
