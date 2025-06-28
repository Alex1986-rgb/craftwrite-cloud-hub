
import { Navigate } from 'react-router-dom';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'client';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'client',
  redirectTo = '/auth'
}: ProtectedRouteProps) {
  const { user, loading, currentRole, canAccessRole } = useUnifiedAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!canAccessRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
