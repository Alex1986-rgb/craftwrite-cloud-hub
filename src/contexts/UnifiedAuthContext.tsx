
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    // Получаем текущего пользователя при загрузке
    const getInitialUser = async () => {
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Auth error:', error);
          return;
        }

        if (authUser) {
          // Получаем профиль пользователя если есть
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          const userData: User = {
            id: authUser.id,
            email: authUser.email || '',
            name: profile?.full_name || authUser.user_metadata?.name || '',
            phone: profile?.phone || authUser.user_metadata?.phone || '',
            role: 'client' // По умолчанию клиент
          };

          setUser(userData);
        }
      } catch (error) {
        console.error('Error getting initial user:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Подписываемся на изменения состояния авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          // Получаем профиль пользователя
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || session.user.user_metadata?.name || '',
            phone: profile?.phone || session.user.user_metadata?.phone || '',
            role: 'client'
          };

          setUser(userData);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Устанавливаем роль пользователя при входе
  useEffect(() => {
    if (user?.role === 'admin') {
      setCurrentRole('admin');
    } else if (user) {
      setCurrentRole('client');
    } else {
      setCurrentRole('guest');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        toast.error('Ошибка входа: ' + error.message);
        return false;
      }

      if (data.user) {
        toast.success('Успешный вход в систему');
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error('Ошибка входа: ' + error.message);
      return false;
    } finally {
      setLoading(false);
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
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
            phone: phone || '',
            company: company || ''
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        toast.error('Ошибка регистрации: ' + error.message);
        return false;
      }

      if (data.user) {
        // Создаем профиль пользователя
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: email,
            full_name: name,
            phone: phone
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        toast.success('Регистрация успешна! Проверьте email для подтверждения');
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast.error('Ошибка регистрации: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast.error('Ошибка выхода');
      } else {
        setUser(null);
        setCurrentRole('guest');
        toast.success('Вы вышли из системы');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Ошибка выхода');
    }
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
