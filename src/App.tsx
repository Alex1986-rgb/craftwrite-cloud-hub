
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import About from '@/pages/About';
import Portfolio from '@/pages/Portfolio';
import BlogDetail from '@/pages/BlogDetail';
import PortfolioDetail from '@/pages/PortfolioDetail';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentCancelled from '@/pages/PaymentCancelled';
import ChatbotOrderTracking from '@/pages/ChatbotOrderTracking';
import FormatDetailPage from '@/pages/FormatDetailPage';
import AdvancedOrder from '@/pages/AdvancedOrder';
import Order from '@/pages/Order';

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
            {/* Главная страница */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            
            {/* Основные публичные страницы */}
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
            <Route path="/prices" element={<Navigate to="/pricing" replace />} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
            <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
            <Route path="/portfolio/:id" element={<PublicLayout><PortfolioDetail /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/service/:slug" element={<PublicLayout><ServicePage /></PublicLayout>} />
            <Route path="/format/:slug" element={<PublicLayout><FormatDetailPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            
            {/* Основная страница заказов */}
            <Route path="/order" element={<PublicLayout><Order /></PublicLayout>} />
            
            {/* Аутентификация */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><RegistrationPage /></PublicLayout>} />
            <Route path="/password-reset" element={<PublicLayout><PasswordResetPage /></PublicLayout>} />
            <Route path="/password-update/:token" element={<PublicLayout><PasswordUpdatePage /></PublicLayout>} />
            <Route path="/email-verification/:token" element={<PublicLayout><EmailVerificationPage /></PublicLayout>} />
            
            {/* Отслеживание заказов */}
            <Route path="/order-tracking" element={<PublicLayout><OrderTrackingPage /></PublicLayout>} />
            <Route path="/chatbot-order-tracking" element={<PublicLayout><ChatbotOrderTracking /></PublicLayout>} />
            
            {/* Специализированные страницы заказов */}
            <Route path="/order/seo-article" element={<PublicLayout><SeoArticleOrder /></PublicLayout>} />
            <Route path="/order/landing-page" element={<PublicLayout><LandingPageOrder /></PublicLayout>} />
            <Route path="/order/email-campaigns" element={<PublicLayout><EmailCampaignsOrder /></PublicLayout>} />
            <Route path="/order/telegram-content" element={<PublicLayout><TelegramContentOrder /></PublicLayout>} />
            <Route path="/order/chatbot-scripts" element={<PublicLayout><ChatbotScriptsOrder /></PublicLayout>} />
            <Route path="/order/instagram-posts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/wildberries-cards" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/ozon-cards" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/youtube-scripts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/linkedin-posts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/website-texts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/avito-ads" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/press-releases" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/survey-questionnaires" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/product-descriptions" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/business-proposals" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/case-studies" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/white-papers" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/speech-scripts" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            <Route path="/order/advanced/:slug" element={<PublicLayout><AdvancedOrder /></PublicLayout>} />
            
            {/* Общий роут для заказов */}
            <Route path="/order/:serviceId" element={<PublicLayout><SpecializedOrderPage /></PublicLayout>} />
            
            {/* Платежи */}
            <Route path="/payment/success" element={<PublicLayout><PaymentSuccess /></PublicLayout>} />
            <Route path="/payment/cancelled" element={<PublicLayout><PaymentCancelled /></PublicLayout>} />
            
            {/* Юридические страницы */}
            <Route path="/terms" element={<PublicLayout><TermsOfServicePage /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />

            {/* Клиентская панель */}
            <Route path="/client" element={<ClientLayout><ClientDashboard /></ClientLayout>} />
            <Route path="/client/order/:id" element={<ClientLayout><OrderPage /></ClientLayout>} />

            {/* Админ панель */}
            <Route path="/admin/*" element={<AdminPanel />} />

            {/* 404 */}
            <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          </Routes>
          <Toaster />
        </div>
      </UnifiedAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
