
import React, { createContext, useContext, ReactNode } from 'react';
import { useSystemSettings } from '@/hooks/useSystemSettings';

interface SystemSettingsContextType {
  settings: Record<string, any>;
  loading: boolean;
  error: string | null;
  getSetting: (key: string, defaultValue?: any) => any;
  updateSetting: (key: string, value: any) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SystemSettingsContext = createContext<SystemSettingsContextType | undefined>(undefined);

interface SystemSettingsProviderProps {
  children: ReactNode;
}

export function SystemSettingsProvider({ children }: SystemSettingsProviderProps) {
  const systemSettings = useSystemSettings();

  return (
    <SystemSettingsContext.Provider value={systemSettings}>
      {children}
    </SystemSettingsContext.Provider>
  );
}

export function useSystemSettingsContext() {
  const context = useContext(SystemSettingsContext);
  if (context === undefined) {
    throw new Error('useSystemSettingsContext must be used within a SystemSettingsProvider');
  }
  return context;
}
