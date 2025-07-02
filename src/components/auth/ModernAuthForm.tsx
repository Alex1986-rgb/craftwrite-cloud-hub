import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, UserCheck, Mail, Lock, Phone, User, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { ModernSelect } from '@/components/ui/modern-select';

interface ModernAuthFormProps {
  onLogin?: (email: string, password: string, role: string) => Promise<void>;
  onRegister?: (data: RegisterData) => Promise<void>;
  onForgotPassword?: (email: string) => Promise<void>;
  loading?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  role: string;
}

export default function ModernAuthForm({
  onLogin,
  onRegister,
  onForgotPassword,
  loading = false
}: ModernAuthFormProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'client'
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'client'
  });

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');

  // Errors state
  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});
  const [registerErrors, setRegisterErrors] = useState<{ [key: string]: string }>({});
  const [forgotErrors, setForgotErrors] = useState<{ [key: string]: string }>({});

  const roleOptions = [
    { value: 'client', label: 'Клиент', description: 'Заказчик контента' },
    { value: 'admin', label: 'Администратор', description: 'Управление системой' }
  ];

  // Валидация полей
  const validateField = (name: string, value: string, formType: 'login' | 'register' | 'forgot'): string | null => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email обязателен';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Введите корректный email';
        return null;
      case 'password':
        if (!value.trim()) return 'Пароль обязателен';
        if (formType === 'register' && value.length < 8) return 'Пароль должен содержать минимум 8 символов';
        if (formType === 'register' && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Пароль должен содержать строчные, заглавные буквы и цифры';
        }
        return null;
      case 'confirmPassword':
        if (value !== registerData.password) return 'Пароли не совпадают';
        return null;
      case 'name':
        if (!value.trim()) return 'Имя обязательно';
        if (value.length < 2) return 'Имя должно содержать минимум 2 символа';
        return null;
      case 'phone':
        if (value && !/^\+?[1-9]\d{9,14}$/.test(value.replace(/\s/g, ''))) {
          return 'Введите корректный номер телефона';
        }
        return null;
      default:
        return null;
    }
  };

  // Обработчики изменения данных
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Обработчики отправки форм
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: { [key: string]: string } = {};
    Object.entries(loginData).forEach(([key, value]) => {
      if (key !== 'role') {
        const error = validateField(key, value, 'login');
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      toast({
        title: "Ошибки в форме",
        description: "Пожалуйста, исправьте отмеченные ошибки",
        variant: "destructive"
      });
      return;
    }

    try {
      await onLogin?.(loginData.email, loginData.password, loginData.role);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: { [key: string]: string } = {};
    Object.entries(registerData).forEach(([key, value]) => {
      if (key !== 'role') {
        const error = validateField(key, value, 'register');
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      toast({
        title: "Ошибки в форме",
        description: "Пожалуйста, исправьте отмеченные ошибки",
        variant: "destructive"
      });
      return;
    }

    try {
      await onRegister?.(registerData);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateField('email', forgotEmail, 'forgot');
    if (error) {
      setForgotErrors({ email: error });
      toast({
        title: "Ошибка",
        description: error,
        variant: "destructive"
      });
      return;
    }

    try {
      await onForgotPassword?.(forgotEmail);
      toast({
        title: "Письмо отправлено",
        description: "Проверьте почту для восстановления пароля"
      });
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto form-modern">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl">
          <Shield className="w-6 h-6 text-primary" />
          Авторизация
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
            <TabsTrigger value="forgot">Восстановление</TabsTrigger>
          </TabsList>

          {/* Форма входа */}
          <TabsContent value="login" className="space-y-6 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <EnhancedFormField
                id="login-email"
                name="email"
                type="email"
                label="Email"
                placeholder="your@email.com"
                icon={Mail}
                value={loginData.email}
                onChange={handleLoginChange}
                error={loginErrors.email}
                success={loginData.email.includes('@') && !loginErrors.email}
                required
                validationRules={[(value) => validateField('email', value, 'login')]}
                realTimeValidation
                autoSave
                onAutoSave={(value) => localStorage.setItem('login_email', value)}
              />

              <EnhancedFormField
                id="login-password"
                name="password"
                type="password"
                label="Пароль"
                placeholder="••••••••"
                icon={Lock}
                value={loginData.password}
                onChange={handleLoginChange}
                error={loginErrors.password}
                success={loginData.password.length > 0 && !loginErrors.password}
                required
                showPasswordToggle
                validationRules={[(value) => validateField('password', value, 'login')]}
                realTimeValidation
              />

              <ModernSelect
                options={roleOptions}
                value={loginData.role}
                onValueChange={(value) => setLoginData(prev => ({ ...prev, role: value as string }))}
                label="Роль"
                placeholder="Выберите роль"
                searchable={false}
              />

              <Button
                type="submit"
                className="submit-button-enhanced"
                disabled={loading}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="form-spinner" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-5 h-5" />
                      Войти
                    </>
                  )}
                </div>
              </Button>
            </form>
          </TabsContent>

          {/* Форма регистрации */}
          <TabsContent value="register" className="space-y-6 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <EnhancedFormField
                id="register-name"
                name="name"
                type="text"
                label="Полное имя"
                placeholder="Иван Иванов"
                icon={User}
                value={registerData.name}
                onChange={handleRegisterChange}
                error={registerErrors.name}
                success={registerData.name.length > 0 && !registerErrors.name}
                required
                validationRules={[(value) => validateField('name', value, 'register')]}
                realTimeValidation
              />

              <EnhancedFormField
                id="register-email"
                name="email"
                type="email"
                label="Email"
                placeholder="your@email.com"
                icon={Mail}
                value={registerData.email}
                onChange={handleRegisterChange}
                error={registerErrors.email}
                success={registerData.email.includes('@') && !registerErrors.email}
                required
                validationRules={[(value) => validateField('email', value, 'register')]}
                realTimeValidation
              />

              <EnhancedFormField
                id="register-phone"
                name="phone"
                type="tel"
                label="Телефон (необязательно)"
                placeholder="+7 (999) 123-45-67"
                icon={Phone}
                value={registerData.phone}
                onChange={handleRegisterChange}
                error={registerErrors.phone}
                success={registerData.phone.length > 0 && !registerErrors.phone}
                validationRules={[(value) => validateField('phone', value, 'register')]}
                realTimeValidation
              />

              <EnhancedFormField
                id="register-password"
                name="password"
                type="password"
                label="Пароль"
                placeholder="••••••••"
                icon={Lock}
                value={registerData.password}
                onChange={handleRegisterChange}
                error={registerErrors.password}
                success={registerData.password.length >= 8 && !registerErrors.password}
                required
                showPasswordToggle
                validationRules={[(value) => validateField('password', value, 'register')]}
                realTimeValidation
                tooltip="Минимум 8 символов, включая строчные, заглавные буквы и цифры"
              />

              <EnhancedFormField
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                label="Подтверждение пароля"
                placeholder="••••••••"
                icon={Lock}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                error={registerErrors.confirmPassword}
                success={registerData.confirmPassword === registerData.password && registerData.confirmPassword.length > 0}
                required
                showPasswordToggle
                validationRules={[(value) => validateField('confirmPassword', value, 'register')]}
                realTimeValidation
              />

              <ModernSelect
                options={roleOptions}
                value={registerData.role}
                onValueChange={(value) => setRegisterData(prev => ({ ...prev, role: value as string }))}
                label="Роль"
                placeholder="Выберите роль"
                searchable={false}
              />

              <Button
                type="submit"
                className="submit-button-enhanced"
                disabled={loading}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="form-spinner" />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      Зарегистрироваться
                    </>
                  )}
                </div>
              </Button>
            </form>
          </TabsContent>

          {/* Форма восстановления пароля */}
          <TabsContent value="forgot" className="space-y-6 mt-6">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-lg font-semibold">Забыли пароль?</h3>
                <p className="text-sm text-muted-foreground">
                  Введите email для получения ссылки восстановления
                </p>
              </div>

              <EnhancedFormField
                id="forgot-email"
                name="email"
                type="email"
                label="Email"
                placeholder="your@email.com"
                icon={Mail}
                value={forgotEmail}
                onChange={(e) => {
                  setForgotEmail(e.target.value);
                  if (forgotErrors.email) {
                    setForgotErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                error={forgotErrors.email}
                success={forgotEmail.includes('@') && !forgotErrors.email}
                required
                validationRules={[(value) => validateField('email', value, 'forgot')]}
                realTimeValidation
              />

              <Button
                type="submit"
                className="submit-button-enhanced"
                disabled={loading}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="form-spinner" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Отправить ссылку
                    </>
                  )}
                </div>
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setActiveTab('login')}
              >
                Вернуться к входу
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}