
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderManagement from "@/components/admin/OrderManagement";
import ClientManagement from "@/components/admin/ClientManagement";
import AITextGenerator from "@/components/admin/AITextGenerator";
import PageEditor from "@/components/admin/PageEditor";
import PaymentManager from "@/components/admin/PaymentManager";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import SettingsPanel from "@/components/admin/SettingsPanel";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { lazy, Suspense } from "react";

// Ленивая загрузка компонентов
const UniversalContentManager = lazy(() => import("@/components/admin/content/UniversalContentManager"));
const PromptManager = lazy(() => import("@/components/admin/prompts/PromptManager"));
const DynamicPricingManager = lazy(() => import("@/components/admin/pricing/DynamicPricingManager"));
const AdminContentManager = lazy(() => import("@/components/admin/AdminContentManager"));
const LaunchDashboard = lazy(() => import("@/components/admin/LaunchDashboard"));
const ProductionLaunchManager = lazy(() => import("@/components/admin/ProductionLaunchManager"));
const SEOSetupManager = lazy(() => import("@/components/admin/SEOSetupManager"));
const MarketingCampaignManager = lazy(() => import("@/components/admin/MarketingCampaignManager"));

function AdminContent() {
  const { isAuthenticated, loading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="launch" element={<ProductionLaunchManager />} />
              <Route path="seo-setup" element={<SEOSetupManager />} />
              <Route path="marketing" element={<MarketingCampaignManager />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="clients" element={<ClientManagement />} />
              <Route path="ai-generator" element={<AITextGenerator />} />
              <Route path="page-editor" element={<PageEditor />} />
              <Route path="content-manager" element={<UniversalContentManager />} />
              <Route path="automation" element={<AdminContentManager />} />
              <Route path="prompts" element={<PromptManager />} />
              <Route path="pricing" element={<DynamicPricingManager />} />
              <Route path="payments" element={<PaymentManager />} />
              <Route path="analytics" element={<AnalyticsPanel />} />
              <Route path="settings" element={<SettingsPanel />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <AdminContent />
      </AdminAuthProvider>
    </ErrorBoundary>
  );
}
