
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, User, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "@/components/ui/sonner";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!credentials.login || !credentials.password) {
      setError("Заполните все поля");
      setLoading(false);
      return;
    }
    
    try {
      await login(credentials.login, credentials.password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неверные данные для входа";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      <Card className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl border-0 relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CopyPro Admin
          </CardTitle>
          <p className="text-slate-600">Панель управления системой</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Логин администратора
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    value={credentials.login}
                    onChange={(e) => setCredentials(prev => ({ ...prev, login: e.target.value }))}
                    className="pl-10 h-12"
                    placeholder="admin@copypro.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 h-12"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Вход в систему...
                </div>
              ) : (
                "Войти в админ-панель"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Защищенная зона • Только для авторизованных пользователей
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Тестовые данные: admin@copypro.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
