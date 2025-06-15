
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { UnifiedAuthProvider } from "@/contexts/UnifiedAuthContext";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import OptimizedIndex from "./pages/OptimizedIndex";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import About from "./pages/About";
import Prices from "./pages/Prices";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Privacy from "./pages/Privacy";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import FormatDetailPage from "./pages/FormatDetailPage";
import PaymentCancelled from "./pages/PaymentCancelled";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminPanel from "./pages/AdminPanel";
import ClientPanel from "./pages/ClientPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UnifiedAuthProvider>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col w-full">
          <UnifiedHeader />
          <main className="flex-1">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<OptimizedIndex />} />
              <Route path="/order" element={<Order />} />
              <Route path="/service/:slug" element={<ServiceDetailPage />} />
              <Route path="/format/:slug" element={<FormatDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancelled" element={<PaymentCancelled />} />
              <Route path="/admin/*" element={<AdminPanel />} />
              <Route path="/client/*" element={<ClientPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </UnifiedAuthProvider>
  </QueryClientProvider>
);

export default App;
