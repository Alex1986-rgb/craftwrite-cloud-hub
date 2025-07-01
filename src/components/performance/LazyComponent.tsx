
import React, { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback,
  className 
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center p-8 ${className || ''}`}>
      <LoadingSpinner size="lg" text="Загрузка..." />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Hook for lazy loading components
export const useLazyLoad = (componentLoader: () => Promise<any>) => {
  const LazyLoadedComponent = React.lazy(componentLoader);
  
  return (props: any) => (
    <LazyComponent>
      <LazyLoadedComponent {...props} />
    </LazyComponent>
  );
};
