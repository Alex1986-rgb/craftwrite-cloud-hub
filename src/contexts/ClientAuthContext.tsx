
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  isVerified: boolean;
}

interface ClientAuthContextType {
  client: Client | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Client>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненную сессию
    const savedClient = localStorage.getItem('client_session');
    if (savedClient) {
      try {
        setClient(JSON.parse(savedClient));
      } catch (error) {
        console.error('Error parsing saved client session:', error);
        localStorage.removeItem('client_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Мок данные для демонстрации
      if (email === 'client@example.com' && password === 'password') {
        const clientData: Client = {
          id: 'client-1',
          name: 'Иван Петров',
          email: email,
          phone: '+7 (999) 123-45-67',
          company: 'ООО "Инновации"',
          avatar: '',
          createdAt: '2024-01-15',
          lastLogin: new Date().toISOString(),
          isVerified: true
        };
        
        setClient(clientData);
        localStorage.setItem('client_session', JSON.stringify(clientData));
        
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать в личный кабинет!'
        });
        
        return true;
      } else {
        toast({
          title: 'Ошибка входа',
          description: 'Неверный email или пароль',
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при входе',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const clientData: Client = {
        id: `client-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        avatar: '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isVerified: false
      };
      
      setClient(clientData);
      localStorage.setItem('client_session', JSON.stringify(clientData));
      
      toast({
        title: 'Успешная регистрация',
        description: 'Добро пожаловать! Проверьте email для подтверждения аккаунта.'
      });
      
      return true;
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: 'Произошла ошибка при создании аккаунта',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setClient(null);
    localStorage.removeItem('client_session');
    toast({
      title: 'Выход выполнен',
      description: 'До свидания!'
    });
  };

  const updateProfile = async (data: Partial<Client>): Promise<boolean> => {
    try {
      setLoading(true);
      
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (client) {
        const updatedClient = { ...client, ...data };
        setClient(updatedClient);
        localStorage.setItem('client_session', JSON.stringify(updatedClient));
        
        toast({
          title: 'Профиль обновлен',
          description: 'Изменения успешно сохранены'
        });
        
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить профиль',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Письмо отправлено',
        description: 'Проверьте email для восстановления пароля'
      });
      
      return true;
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить письмо',
        variant: 'destructive'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientAuthContext.Provider
      value={{
        client,
        isAuthenticated: !!client,
        loading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
}
