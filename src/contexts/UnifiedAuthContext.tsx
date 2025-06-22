
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

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
  register: (email: string, password: string, name: string, phone?: string, company?: string) => Promise<boolean>;
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | null>(null);

export const UnifiedAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Fetch user profile and role from database
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        return null;
      }

      // Get user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', supabaseUser.id)
        .single();

      if (roleError && roleError.code !== 'PGRST116') {
        console.error('Error fetching role:', roleError);
      }

      const userRole = roleData?.role || 'client';

      const userData: User = {
        id: supabaseUser.id,
        name: profile?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: userRole as UserRole,
        phone: profile?.phone,
        company: profile?.company,
        createdAt: profile?.created_at || supabaseUser.created_at,
        lastLogin: new Date().toISOString(),
        isVerified: supabaseUser.email_confirmed_at ? true : false
      };

      return userData;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          const userData = await fetchUserProfile(session.user);
          if (userData) {
            setUser(userData);
            setCurrentRole(userData.role);
          }
        } else {
          setUser(null);
          setCurrentRole('guest');
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user).then(userData => {
          if (userData) {
            setUser(userData);
            setCurrentRole(userData.role);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (email: string, password: string, name: string, phone?: string, company?: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
            phone: phone,
            company: company
          }
        }
      });

      if (error) throw error;

      // If user is created but not confirmed, show appropriate message
      if (data.user && !data.session) {
        toast.success("Аккаунт создан! Проверьте email для подтверждения регистрации.");
        return true;
      }

      toast.success("Регистрация успешна! Добро пожаловать!");
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Ошибка регистрации: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const userData = await fetchUserProfile(data.user);
        if (userData) {
          setUser(userData);
          setCurrentRole(role || userData.role);
          toast.success(`Добро пожаловать! Вы вошли как ${userData.role === 'admin' ? 'администратор' : 'клиент'}`);
          return true;
        }
      }

      return false;
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Ошибка входа: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setCurrentRole('guest');
      setSession(null);
      toast.success("Вы вышли из системы");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Ошибка выхода: " + error.message);
    }
  };

  const switchRole = (role: UserRole) => {
    if (!canAccessRole(role)) {
      toast.error("У вас нет доступа к этой роли");
      return;
    }

    setCurrentRole(role);
    toast.success(`Переключено в режim: ${role === 'admin' ? 'администратор' : role === 'client' ? 'клиент' : 'гость'}`);
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
    canAccessRole,
    register
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};

export function useUnifiedAuth(): UnifiedAuthContextType {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error("useUnifiedAuth must be used within UnifiedAuthProvider");
  }
  return context;
}
