
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'client' | 'guest';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
}

interface UnifiedAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string, phone?: string, company?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  switchRole: (role: UserRole) => void;
  canAccessRole: (role: UserRole) => boolean;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(undefined);

interface UnifiedAuthProviderProps {
  children: ReactNode;
}

export function UnifiedAuthProvider({ children }: UnifiedAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');

  useEffect(() => {
    // Имитация проверки аутентификации
    const checkAuth = async () => {
      try {
        // Здесь должна быть логика проверки токена/сессии
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Устанавливаем роль пользователя при входе
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        setCurrentRole('admin');
      } else {
        setCurrentRole('client');
      }
    } else {
      setCurrentRole('guest');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Имитация логина
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        phone: '+1234567890',
        role: email.includes('admin') ? 'admin' : 'client'
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name?: string, 
    phone?: string, 
    company?: string
  ): Promise<boolean> => {
    try {
      // Имитация регистрации
      const mockUser: User = {
        id: Math.random().toString(),
        email,
        name: name || 'New User',
        phone,
        role: 'client'
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentRole('guest');
  };

  const switchRole = (role: UserRole) => {
    if (canAccessRole(role)) {
      setCurrentRole(role);
    }
  };

  const canAccessRole = (role: UserRole): boolean => {
    if (!user) return role === 'guest';
    
    // Админ может переключаться на любую роль
    if (user.role === 'admin') return true;
    
    // Клиент может быть только клиентом или гостем
    if (user.role === 'client') return role === 'client' || role === 'guest';
    
    // По умолчанию только гость
    return role === 'guest';
  };

  const value: UnifiedAuthContextType = {
    user,
    isAuthenticated: !!user,
    currentRole,
    login,
    register,
    logout,
    loading,
    switchRole,
    canAccessRole,
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
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
