
import './index.css';

import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext";
import { SystemSettingsProvider } from "./components/enhanced/SystemSettingsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { performanceMonitor } from "@/utils/performanceUtils";
import { useEffect } from "react";
import AnalyticsTracker from "@/components/common/AnalyticsTracker";

// Import all pages
import Index from "./pages/Index";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Services from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import EnhancedServiceDetailPage from "./pages/EnhancedServiceDetailPage";
import FormatDetailPage from "./pages/FormatDetailPage";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Prices from "./pages/Prices";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import AuthPage from "./pages/AuthPage";
import ClientDashboard from "./pages/ClientDashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import OrderTrackingPage from "./pages/OrderTrackingPage";

// Specialized order pages
import SeoArticleOrder from "./pages/SeoArticleOrder";
import SeoArticleOrderModern from "./pages/SeoArticleOrderModern";
import LandingPageOrder from "./pages/LandingPageOrder";
import EmailCampaignsOrder from "./pages/EmailCampaignsOrder";
import ChatbotScriptsOrder from "./pages/ChatbotScriptsOrder";
import TelegramContentOrder from "./pages/TelegramContentOrder";
import BulkSeoOptimization from "./pages/BulkSeoOptimization";

// Mobile order pages - использую default импорты
import InstagramOrder from "./pages/order/InstagramOrder";
import LinkedInOrder from "./pages/order/LinkedInOrder";
import YouTubeOrder from "./pages/order/YouTubeOrder";
import WebsiteTextsOrder from "./pages/order/WebsiteTextsOrder";
import WildberriesOrder from "./pages/order/WildberriesOrder";
import OzonOrder from "./pages/order/OzonOrder";

// Payment pages
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import TestPage from "./pages/TestPage";
import SmartOrder from "./pages/SmartOrder";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="copypro-theme">
        <TooltipProvider>
          <SystemSettingsProvider>
            <UnifiedAuthProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
                  <AnalyticsTracker />
                  <Routes>
                    {/* Main pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/track-order" element={<OrderTrackingPage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:slug" element={<ServiceDetailPage />} />
                    <Route path="/service/:slug" element={<EnhancedServiceDetailPage />} />
                    <Route path="/format/:slug" element={<FormatDetailPage />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<Privacy />} />

                    {/* Auth pages */}
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/client" element={<ClientDashboard />} />
                    <Route path="/admin" element={<AdminPanel />} />

                    {/* Specialized order pages */}
                    <Route path="/order/seo-article" element={<SeoArticleOrder />} />
                    <Route path="/order/seo-article-modern" element={<SeoArticleOrderModern />} />
                    <Route path="/order/landing-page" element={<LandingPageOrder />} />
                    <Route path="/order/email-campaigns" element={<EmailCampaignsOrder />} />
                    <Route path="/order/chatbot-scripts" element={<ChatbotScriptsOrder />} />
                    <Route path="/order/telegram-content" element={<TelegramContentOrder />} />
                    <Route path="/order/bulk-seo" element={<BulkSeoOptimization />} />

                    {/* Mobile order pages */}
                    <Route path="/order/instagram" element={<InstagramOrder />} />
                    <Route path="/order/linkedin" element={<LinkedInOrder />} />
                    <Route path="/order/youtube" element={<YouTubeOrder />} />
                    <Route path="/order/website-texts" element={<WebsiteTextsOrder />} />
                    <Route path="/order/wildberries" element={<WildberriesOrder />} />
                    <Route path="/order/ozon" element={<OzonOrder />} />

                    {/* Payment pages */}
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/payment-cancelled" element={<PaymentCancelled />} />

                    {/* Test pages */}
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/smart-order" element={<SmartOrder />} />

                    {/* 404 page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Toaster />
              </Router>
            </UnifiedAuthProvider>
          </SystemSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
