
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminPanel() {
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
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/ai-generator" element={<AITextGenerator />} />
            <Route path="/page-editor" element={<PageEditor />} />
            <Route path="/payments" element={<PaymentManager />} />
            <Route path="/analytics" element={<AnalyticsPanel />} />
            <Route path="/settings" element={<SettingsPanel />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
