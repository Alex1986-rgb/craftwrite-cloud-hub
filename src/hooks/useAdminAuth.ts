
import { useState, useEffect, createContext, useContext } from "react";
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

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверка сохраненной сессии
    const savedAuth = localStorage.getItem("admin_auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setUser(authData.user);
      } catch (error) {
        localStorage.removeItem("admin_auth");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
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
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Вы вышли из системы");
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
}
