
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import OrderPage from "@/pages/OrderPage";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import Footer from "@/components/common/Footer";
import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
              <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
              <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
              <Route path="/terms" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
              <Route path="/privacy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
              <Route path="/order" element={<PageLayout><OrderPage /></PageLayout>} />
            </Routes>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
