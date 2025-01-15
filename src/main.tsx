import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/router.tsx';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { queryClient } from './apis';
import { ErrorBoundary } from 'react-error-boundary';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { DeferredLoader, ErrorFallback } from './components';
import { AuthProvider } from './contexts/auth';
import { AlertProvider } from '@/components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <NuqsAdapter>
                <Suspense fallback={<DeferredLoader />}>
                  <AuthProvider>
                    <AlertProvider>
                      <RouterProvider router={router} />
                    </AlertProvider>
                  </AuthProvider>
                </Suspense>
              </NuqsAdapter>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
