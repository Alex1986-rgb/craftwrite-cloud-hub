
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetail from "@/pages/BlogDetail";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import OrderPage from "@/pages/OrderPage";
import AuthPage from "@/pages/AuthPage";
import ClientDashboard from "@/components/client/ClientDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import Footer from "@/components/common/Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import missing page components
import SeoArticleOrder from "@/pages/SeoArticleOrder";
import LandingPageOrder from "@/pages/LandingPageOrder";
import EmailCampaignsOrder from "@/pages/EmailCampaignsOrder";
import TelegramContentOrder from "@/pages/TelegramContentOrder";
import ChatbotScriptsOrder from "@/pages/ChatbotScriptsOrder";
import PortfolioDetail from "@/pages/PortfolioDetail";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import Prices from "@/pages/Prices";
import SpecializedOrderPage from "@/pages/order/SpecializedOrderPage";
import OzonOrder from "@/pages/order/OzonOrder";
import LinkedInOrder from "@/pages/order/LinkedInOrder";
import InstagramOrder from "@/pages/order/InstagramOrder";
import YouTubeOrder from "@/pages/order/YouTubeOrder";
import WildberriesOrder from "@/pages/order/WildberriesOrder";
import WebsiteTextsOrder from "@/pages/order/WebsiteTextsOrder";

const queryClient = new QueryClient();

// Layout wrapper for pages that need header/footer
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UnifiedAuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Toaster />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
                  <Route path="/service/:serviceId" element={<PageLayout><Services /></PageLayout>} />
                  <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
                  <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
                  <Route path="/blog/:slug" element={<PageLayout><BlogDetail /></PageLayout>} />
                  <Route path="/terms" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
                  <Route path="/privacy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
                  <Route path="/order" element={<PageLayout><OrderPage /></PageLayout>} />
                  <Route path="/order/:serviceId" element={<PageLayout><SpecializedOrderPage /></PageLayout>} />
                  <Route path="/order/seo-article" element={<PageLayout><SeoArticleOrder /></PageLayout>} />
                  <Route path="/order/landing-page" element={<PageLayout><LandingPageOrder /></PageLayout>} />
                  <Route path="/order/email-campaigns" element={<PageLayout><EmailCampaignsOrder /></PageLayout>} />
                  <Route path="/order/telegram-content" element={<PageLayout><TelegramContentOrder /></PageLayout>} />
                  <Route path="/order/chatbot-scripts" element={<PageLayout><ChatbotScriptsOrder /></PageLayout>} />
                  <Route path="/order/ozon" element={<PageLayout><OzonOrder /></PageLayout>} />
                  <Route path="/order/linkedin" element={<PageLayout><LinkedInOrder /></PageLayout>} />
                  <Route path="/order/instagram" element={<PageLayout><InstagramOrder /></PageLayout>} />
                  <Route path="/order/youtube" element={<PageLayout><YouTubeOrder /></PageLayout>} />
                  <Route path="/order/wildberries" element={<PageLayout><WildberriesOrder /></PageLayout>} />
                  <Route path="/order/website-texts" element={<PageLayout><WebsiteTextsOrder /></PageLayout>} />
                  <Route path="/portfolio" element={<PageLayout><Portfolio /></PageLayout>} />
                  <Route path="/portfolio/:id" element={<PageLayout><PortfolioDetail /></PageLayout>} />
                  <Route path="/prices" element={<PageLayout><Prices /></PageLayout>} />
                  <Route path="/auth" element={<PageLayout><AuthPage /></PageLayout>} />
                  <Route path="/client" element={<ClientDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </UnifiedAuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
