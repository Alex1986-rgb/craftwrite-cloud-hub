
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// Временная система авторизации (позже заменить на Supabase)
const ADMIN_CREDENTIALS = {
  "admin@copypro.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Александр Админов",
      email: "admin@copypro.com",
      role: "Супер-админ"
    }
  }
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверка сохраненной сессии
    try {
      const savedAuth = localStorage.getItem("admin_auth");
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        // Проверяем, что сессия не старше 24 часов
        const sessionTime = new Date(authData.timestamp);
        const now = new Date();
        const hoursPasssed = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursPasssed < 24) {
          setIsAuthenticated(true);
          setUser(authData.user);
        } else {
          localStorage.removeItem("admin_auth");
        }
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      localStorage.removeItem("admin_auth");
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      const adminData = ADMIN_CREDENTIALS[email as keyof typeof ADMIN_CREDENTIALS];
      
      if (!adminData || adminData.password !== password) {
        throw new Error("Неверные данные для входа");
      }

      const authData = {
        user: adminData.user,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem("admin_auth", JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser(adminData.user);
      
      toast.success("Добро пожаловать в админ-панель!");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Вы вышли из системы");
  };

  const value: AdminAuthContextType = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextType {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
