
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

export type UserRole = 'guest' | 'client' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  company?: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  isVerified: boolean;
}

interface UnifiedAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: UserRole;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  canAccessRole: (role: UserRole) => boolean;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | null>(null);

// Временные учетные данные (позже заменить на Supabase)
const MOCK_USERS = {
  "admin@copypro.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Александр Админов",
      email: "admin@copypro.com",
      role: 'admin' as UserRole,
      createdAt: "2024-01-01",
      lastLogin: new Date().toISOString(),
      isVerified: true
    }
  },
  "client@example.com": {
    password: "password",
    user: {
      id: "2", 
      name: "Иван Петров",
      email: "client@example.com",
      role: 'client' as UserRole,
      phone: "+7 (999) 123-45-67",
      company: "ООО \"Инновации\"",
      createdAt: "2024-01-15",
      lastLogin: new Date().toISOString(),
      isVerified: true
    }
  }
};

export function UnifiedAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверка сохраненной сессии
    try {
      const savedAuth = localStorage.getItem("unified_auth");
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        const sessionTime = new Date(authData.timestamp);
        const now = new Date();
        const hoursPasssed = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursPasssed < 24) {
          setUser(authData.user);
          setCurrentRole(authData.currentRole || authData.user.role);
        } else {
          localStorage.removeItem("unified_auth");
        }
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      localStorage.removeItem("unified_auth");
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      const userData = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      if (!userData || userData.password !== password) {
        throw new Error("Неверные данные для входа");
      }

      const loginRole = role || userData.user.role;
      const authData = {
        user: userData.user,
        currentRole: loginRole,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem("unified_auth", JSON.stringify(authData));
      setUser(userData.user);
      setCurrentRole(loginRole);
      
      toast.success(`Добро пожаловать! Вы вошли как ${loginRole === 'admin' ? 'администратор' : 'клиент'}`);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Ошибка входа: " + (error as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("unified_auth");
    setUser(null);
    setCurrentRole('guest');
    toast.success("Вы вышли из системы");
  };

  const switchRole = (role: UserRole) => {
    if (!canAccessRole(role)) {
      toast.error("У вас нет доступа к этой роли");
      return;
    }

    setCurrentRole(role);
    
    if (user) {
      const authData = {
        user,
        currentRole: role,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("unified_auth", JSON.stringify(authData));
    }

    toast.success(`Переключено в режим: ${role === 'admin' ? 'администратор' : role === 'client' ? 'клиент' : 'гость'}`);
  };

  const canAccessRole = (role: UserRole): boolean => {
    if (!user) return role === 'guest';
    
    switch (user.role) {
      case 'admin':
        return true; // Админы могут переключаться во все роли
      case 'client':
        return role === 'guest' || role === 'client';
      default:
        return role === 'guest';
    }
  };

  const value: UnifiedAuthContextType = {
    user,
    isAuthenticated: !!user,
    currentRole,
    loading,
    login,
    logout,
    switchRole,
    canAccessRole
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
}

export function useUnifiedAuth(): UnifiedAuthContextType {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error("useUnifiedAuth must be used within UnifiedAuthProvider");
  }
  return context;
}
