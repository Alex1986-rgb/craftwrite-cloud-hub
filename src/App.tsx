
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { UnifiedAuthProvider } from "@/contexts/UnifiedAuthContext";

// Import pages
import OptimizedIndex from "@/pages/OptimizedIndex";
import About from "@/pages/About";
import Order from "@/pages/Order";
import AdvancedOrder from "@/pages/AdvancedOrder";
import Prices from "@/pages/Prices";
import Portfolio from "@/pages/Portfolio";
import PortfolioDetail from "@/pages/PortfolioDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Privacy from "@/pages/Privacy";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import EnhancedServiceDetailPage from "@/pages/EnhancedServiceDetailPage";
import FormatDetailPage from "@/pages/FormatDetailPage";
import ClientPanel from "@/pages/ClientPanel";
import AdminPanel from "@/pages/AdminPanel";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancelled from "@/pages/PaymentCancelled";
import NotFound from "@/pages/NotFound";

// Import layout components
import { UnifiedHeader } from "@/components/navigation";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnifiedAuthProvider>
        <div className="min-h-screen bg-background">
          <UnifiedHeader />
          <main>
            <Routes>
              <Route path="/" element={<OptimizedIndex />} />
              <Route path="/about" element={<About />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:slug" element={<AdvancedOrder />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/service/:slug" element={<EnhancedServiceDetailPage />} />
              <Route path="/format/:slug" element={<FormatDetailPage />} />
              <Route path="/client/*" element={<ClientPanel />} />
              <Route path="/admin/*" element={<AdminPanel />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancelled" element={<PaymentCancelled />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </UnifiedAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
