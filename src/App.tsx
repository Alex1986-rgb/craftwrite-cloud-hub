import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnifiedAuthProvider } from '@/contexts/UnifiedAuthContext';
import ProviderErrorBoundary from '@/components/common/ProviderErrorBoundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import './App.css';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioDetail = lazy(() => import('@/pages/PortfolioDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const Prices = lazy(() => import('@/pages/Prices'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const Order = lazy(() => import('@/pages/Order'));
const SeoArticleOrder = lazy(() => import('@/pages/SeoArticleOrder'));
const LandingPageOrder = lazy(() => import('@/pages/LandingPageOrder'));
const EmailCampaignsOrder = lazy(() => import('@/pages/EmailCampaignsOrder'));
const TelegramContentOrder = lazy(() => import('@/pages/TelegramContentOrder'));
const ChatbotScriptsOrder = lazy(() => import('@/pages/ChatbotScriptsOrder'));
const WebsiteTextsOrder = lazy(() => import('@/pages/order/WebsiteTextsOrder'));
const InstagramOrder = lazy(() => import('@/pages/order/InstagramOrder'));
const LinkedInOrder = lazy(() => import('@/pages/order/LinkedInOrder'));
const YouTubeOrder = lazy(() => import('@/pages/order/YouTubeOrder'));
const OzonOrder = lazy(() => import('@/pages/order/OzonOrder'));
const WildberriesOrder = lazy(() => import('@/pages/order/WildberriesOrder'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const ClientPanel = lazy(() => import('@/pages/ClientPanel'));
const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const PaymentCancelled = lazy(() => import('@/pages/PaymentCancelled'));
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ProviderErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UnifiedAuthProvider>
          <Router>
            <div className="min-h-screen bg-background font-inter">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <Routes>
                  {/* Main pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/prices" element={<Prices />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Order pages */}
                  <Route path="/order" element={<Order />} />
                  <Route path="/order/seo-article" element={<SeoArticleOrder />} />
                  <Route path="/order/landing-page" element={<LandingPageOrder />} />
                  <Route path="/order/email-campaigns" element={<EmailCampaignsOrder />} />
                  <Route path="/order/telegram-content" element={<TelegramContentOrder />} />
                  <Route path="/order/chatbot-scripts" element={<ChatbotScriptsOrder />} />
                  <Route path="/order/website-texts" element={<WebsiteTextsOrder />} />
                  <Route path="/order/instagram" element={<InstagramOrder />} />
                  <Route path="/order/linkedin" element={<LinkedInOrder />} />
                  <Route path="/order/youtube" element={<YouTubeOrder />} />
                  <Route path="/order/ozon" element={<OzonOrder />} />
                  <Route path="/order/wildberries" element={<WildberriesOrder />} />
                  
                  {/* Auth and user panels */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/client/*" element={
                    <ProtectedRoute requiredRole="client">
                      <ClientPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/*" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                  
                  {/* Payment pages */}
                  <Route path="/payment/success" element={<PaymentSuccess />} />
                  <Route path="/payment/cancelled" element={<PaymentCancelled />} />
                  
                  {/* Other pages */}
                  <Route path="/track-order" element={<OrderTrackingPage />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  
                  {/* 404 page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </UnifiedAuthProvider>
      </QueryClientProvider>
    </ProviderErrorBoundary>
  );
}

export default App;
