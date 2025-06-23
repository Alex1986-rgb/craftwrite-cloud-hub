
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { Navigate } from 'react-router-dom';
import ModernizedClientDashboard from '@/components/modernized/ModernizedClientDashboard';

export default function ClientDashboard() {
  const { user, loading } = useUnifiedAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <ModernizedClientDashboard />;
}
