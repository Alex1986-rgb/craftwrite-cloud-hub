
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
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Blog = lazy(() => import('@/pages/Blog'));
const Prices = lazy(() => import('@/pages/Prices'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const Order = lazy(() => import('@/pages/Order'));
const SmartOrder = lazy(() => import('@/pages/SmartOrder'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
    try {
      // Track app initialization
      trackEvent({
        action: 'app_initialized',
        category: 'App',
        label: 'CopyPro Cloud'
      });
    } catch (error) {
      console.warn('Failed to track app initialization:', error);
    }
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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/smart-order" element={<SmartOrder />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
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
