
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface UnifiedAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(undefined);

export function UnifiedAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // Простая симуляция логина
    console.log('Login attempt:', email);
    setUser({ id: '1', email, name: 'Test User' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (email: string, password: string, name?: string) => {
    // Простая симуляция регистрации
    console.log('Register attempt:', email);
    setUser({ id: '1', email, name: name || 'New User' });
    setIsAuthenticated(true);
  };

  return (
    <UnifiedAuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      register
    }}>
      {children}
    </UnifiedAuthContext.Provider>
  );
}

export function useUnifiedAuth() {
  const context = useContext(UnifiedAuthContext);
  if (context === undefined) {
    throw new Error('useUnifiedAuth must be used within a UnifiedAuthProvider');
  }
  return context;
}
