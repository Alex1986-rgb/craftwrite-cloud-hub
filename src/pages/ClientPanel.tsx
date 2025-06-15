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
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Menu, Bell } from 'lucide-react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { RealTimeNotifications } from '@/components/client/notifications/RealTimeNotifications';

function ClientContent() {
  const { isAuthenticated, loading, client } = useClientAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-32 w-32 border-2 border-blue-400 opacity-20"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">Загрузка кабинета...</p>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <ClientLogin />;
  }

  const getBreadcrumbs = () => {
    const path = window.location.pathname;
    if (path === '/client' || path === '/client/') return [];
    if (path.includes('/orders')) return [{ label: 'Заказы' }];
    if (path.includes('/new-order')) return [{ label: 'Новый заказ' }];
    if (path.includes('/documents')) return [{ label: 'Документы' }];
    if (path.includes('/payments')) return [{ label: 'Платежи' }];
    if (path.includes('/support')) return [{ label: 'Поддержка' }];
    if (path.includes('/analytics')) return [{ label: 'Аналитика' }];
    if (path.includes('/notifications')) return [{ label: 'Уведомления' }];
    if (path.includes('/profile')) return [{ label: 'Профиль' }];
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex">
      <ClientSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Enhanced Top header */}
        <header className="glass-card border-0 border-b border-white/20 px-4 lg:px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden glass-card border-0 hover:shadow-glow"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="animate-slide-in-right">
                <h1 className="text-xl font-bold text-gradient">Личный кабинет</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Добро пожаловать, {client?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="relative glass-card border-0 hover:shadow-glow group">
                <Bell className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                  2
                </span>
              </Button>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          {getBreadcrumbs().length > 0 && (
            <div className="mt-3 animate-slide-in-up">
              <Breadcrumbs items={getBreadcrumbs()} />
            </div>
          )}
        </header>
        
        {/* Enhanced Main content */}
        <main className="p-4 lg:p-6">
          <div className="animate-slide-in-up">
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
              <Route path="/help" element={<div className="glass-card p-8 text-center">
                <h2 className="text-2xl font-bold text-gradient mb-4">Помощь</h2>
                <p className="text-slate-600 dark:text-slate-400">Раздел помощи в разработке</p>
              </div>} />
              <Route path="*" element={<Navigate to="/client" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Real-time Notifications */}
      <RealTimeNotifications />
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
