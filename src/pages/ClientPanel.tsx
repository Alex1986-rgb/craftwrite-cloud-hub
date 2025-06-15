
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import ClientLogin from '@/components/client/ClientLogin';
import ClientDashboard from '@/components/client/ClientDashboard';
import ClientOrders from '@/components/client/ClientOrders';
import ClientNewOrder from '@/components/client/ClientNewOrder';
import ClientDocuments from '@/components/client/ClientDocuments';
import ClientProfile from '@/components/client/ClientProfile';
import ClientSupport from '@/components/client/ClientSupport';
import ClientPayments from '@/components/client/ClientPayments';
import ClientAnalytics from '@/components/client/ClientAnalytics';
import ClientNotifications from '@/components/client/ClientNotifications';
import ClientSidebar from '@/components/client/ClientSidebar';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { Button } from '@/components/ui/button';
import { Menu, Bell } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

function ClientContent() {
  const { isAuthenticated, loading, client } = useClientAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Загрузка кабинета...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <ClientLogin />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ClientSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 lg:ml-64">
        {/* Top header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Личный кабинет</h1>
                <p className="text-sm text-slate-600">
                  Добро пожаловать, {client?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/orders" element={<ClientOrders />} />
            <Route path="/new-order" element={<ClientNewOrder />} />
            <Route path="/documents" element={<ClientDocuments />} />
            <Route path="/payments" element={<ClientPayments />} />
            <Route path="/support" element={<ClientSupport />} />
            <Route path="/analytics" element={<ClientAnalytics />} />
            <Route path="/notifications" element={<ClientNotifications />} />
            <Route path="/profile" element={<ClientProfile />} />
            <Route path="/help" element={<div>Помощь</div>} />
            <Route path="*" element={<Navigate to="/client" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function ClientPanel() {
  return (
    <ErrorBoundary>
      <ClientAuthProvider>
        <ClientContent />
      </ClientAuthProvider>
    </ErrorBoundary>
  );
}
