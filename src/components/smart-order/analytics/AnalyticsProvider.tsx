
import React, { createContext, useContext, ReactNode } from 'react';
import { useSmartOrderAnalytics } from '@/hooks/useSmartOrderAnalytics';

interface AnalyticsContextType {
  sessionId: string;
  currentStep: number;
  trackStepEnter: (stepNumber: number) => Promise<void>;
  trackStepExit: (stepNumber: number, completed?: boolean) => Promise<void>;
  trackFormAbandon: (abandonStep: number, formData?: any) => Promise<void>;
  trackFormSubmit: (formData: any) => Promise<void>;
  getSessionMetrics: () => any;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const analytics = useSmartOrderAnalytics();

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
