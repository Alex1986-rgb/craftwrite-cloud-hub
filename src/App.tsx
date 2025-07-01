
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnifiedAuthProvider } from '@/contexts/UnifiedAuthContext';
import ProviderErrorBoundary from '@/components/common/ProviderErrorBoundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect } from 'react';
import './App.css';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function AppContent() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track app initialization
    trackEvent({
      action: 'app_initialized',
      category: 'App',
      label: 'CopyPro Cloud'
    });
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-background font-inter">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Страница не найдена</h1>
                <p>Запрошенная страница не существует.</p>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="copypro-ui-theme">
      <ProviderErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <UnifiedAuthProvider>
            <Router>
              <AppContent />
            </Router>
          </UnifiedAuthProvider>
        </QueryClientProvider>
      </ProviderErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
