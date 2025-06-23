
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "@/pages/HomePage"
import About from "@/pages/About";
import Services from "@/pages/Services";
import ContactPage from "@/pages/ContactPage";
import Portfolio from "@/pages/Portfolio";
import BlogPage from "@/pages/BlogPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import OrderPage from "@/pages/OrderPage";
import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import BulkSeoOptimization from "./pages/BulkSeoOptimization";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/bulk-seo" element={<BulkSeoOptimization />} />
            </Routes>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
