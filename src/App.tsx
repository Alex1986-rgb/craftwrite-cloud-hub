
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UnifiedAuthProvider } from '@/contexts/UnifiedAuthContext';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import PublicLayout from '@/layouts/PublicLayout';
import ClientLayout from '@/layouts/ClientLayout';
import AdminPanel from '@/pages/AdminPanel';
import PricingPage from '@/pages/PricingPage';
import BlogPage from '@/pages/BlogPage';
import ServicePage from '@/pages/ServicePage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OrderTrackingPage from '@/pages/OrderTrackingPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import PasswordResetPage from '@/pages/PasswordResetPage';
import PasswordUpdatePage from '@/pages/PasswordUpdatePage';
import EmailVerificationPage from '@/pages/EmailVerificationPage';
import ClientDashboard from '@/pages/ClientDashboard';
import OrderPage from '@/pages/OrderPage';
import ChatbotScriptsOrder from '@/pages/ChatbotScriptsOrder';
import SeoArticleOrder from '@/pages/SeoArticleOrder';
import LandingPageOrder from '@/pages/LandingPageOrder';
import EmailCampaignsOrder from '@/pages/EmailCampaignsOrder';
import TelegramContentOrder from '@/pages/TelegramContentOrder';
import SpecializedOrderPage from '@/pages/order/SpecializedOrderPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnifiedAuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/service/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><RegistrationPage /></PublicLayout>} />
            <Route path="/order-tracking" element={<PublicLayout><OrderTrackingPage /></PublicLayout>} />
            
            {/* Specialized order pages */}
            <Route path="/order/seo-article" element={<PublicLayout><SeoArticleOrder /></PublicLayout>} />
            <Route path="/order/landing-page" element={<PublicLayout><LandingPageOrder /></PublicLayout>} />
            <Route path="/order/email-campaigns" element={<PublicLayout><EmailCampaignsOrder /></PublicLayout>} />
            <Route path="/order/telegram-content" element={<PublicLayout><TelegramContentOrder /></PublicLayout>} />
            <Route path="/order/instagram-posts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/wildberries-cards" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/ozon-cards" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/youtube-scripts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/linkedin-posts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/website-texts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/avito-ads" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/press-releases" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/chatbot-scripts" element={<PublicLayout><ChatbotScriptsOrder /></PublicLayout>} />
            <Route path="/order/survey-questionnaires" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/product-descriptions" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/business-proposals" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/case-studies" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/white-papers" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/speech-scripts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            
            {/* General service route */}
            <Route path="/order/:serviceId" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            
            <Route path="/terms" element={<PublicLayout><TermsOfServicePage /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
            <Route path="/password-reset" element={<PublicLayout><PasswordResetPage /></PublicLayout>} />
            <Route path="/password-update/:token" element={<PublicLayout><PasswordUpdatePage /></PublicLayout>} />
            <Route path="/email-verification/:token" element={<PublicLayout><EmailVerificationPage /></PublicLayout>} />

            <Route path="/client" element={<ClientLayout><ClientDashboard /></ClientLayout>} />
            <Route path="/client/order/:id" element={<ClientLayout><OrderPage /></ClientLayout>} />

            <Route path="/admin/*" element={<AdminPanel />} />

            <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          </Routes>
          <Toaster />
        </div>
      </UnifiedAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
