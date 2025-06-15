
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Sparkles, LogOut, User } from "lucide-react";
import { useUnifiedAuth } from "@/contexts/UnifiedAuthContext";
import RoleBasedNavigation from "./RoleBasedNavigation";
import RoleSwitcher from "./RoleSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/#services" },
  { label: "Цены", to: "/prices" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Политика", to: "/privacy" },
];

export default function UnifiedHeader() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, currentRole } = useUnifiedAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-unified w-full z-50 sticky top-0">
      <div className="container max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20 px-4 sm:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 font-bold text-xl md:text-2xl text-primary min-w-0 group"
          onClick={closeMobileMenu}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 gradient-brand-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="gradient-text-brand truncate">
            CopyPro<span className="text-neutral-600">Cloud</span>
          </span>
        </Link>

        {/* Desktop Navigation - добавляем быстрые ссылки */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
              key={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300",
                location.pathname === link.to 
                  ? "bg-blue-100 text-blue-700 font-bold shadow-sm" 
                  : "text-slate-600"
              )}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          
          {/* Роль-зависимая навигация для авторизованных пользователей */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-2 ml-4">
              <RoleBasedNavigation variant="horizontal" />
            </div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <RoleSwitcher />
              
              {/* User Menu */}
              <div className="flex items-center gap-2 px-3 py-2 glass-unified rounded-lg">
                <div className="w-8 h-8 gradient-brand-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-neutral-500">{user?.email}</div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-neutral-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/client">Вход</Link>
              </Button>
              <Button 
                asChild 
                className="btn-unified-primary"
              >
                <Link to="/order">Заказать</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:glass-unified transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-neutral-600" />
          ) : (
            <Menu className="w-6 h-6 text-neutral-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 md:top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] glass-unified border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          {/* Mobile User Info */}
          {isAuthenticated && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 glass-unified rounded-xl">
                <div className="w-10 h-10 gradient-brand-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-neutral-500">{user?.email}</div>
                </div>
              </div>
              
              <RoleSwitcher />
            </div>
          )}

          {/* Mobile Navigation - основные страницы */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Основные страницы
            </h3>
            {navLinks.map((link) => (
              <Button
                asChild
                variant={location.pathname === link.to ? "secondary" : "ghost"}
                size="sm"
                key={link.to}
                className={cn(
                  "w-full justify-start rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                  location.pathname === link.to 
                    ? "bg-blue-100 text-blue-700 font-bold shadow-sm" 
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                )}
                onClick={closeMobileMenu}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Role-based Navigation */}
          {isAuthenticated && (
            <nav className="space-y-2">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                Личный кабинет
              </h3>
              <RoleBasedNavigation 
                variant="vertical" 
                className="space-y-1" 
              />
            </nav>
          )}

          {/* Mobile Actions */}
          <div className="pt-6 border-t border-white/20">
            {isAuthenticated ? (
              <Button 
                onClick={() => { logout(); closeMobileMenu(); }}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  asChild 
                  variant="ghost"
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Link to="/client">Войти</Link>
                </Button>
                <Button 
                  asChild 
                  className="btn-unified-primary w-full"
                  onClick={closeMobileMenu}
                >
                  <Link to="/order">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Заказать тексты
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-white/20 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              Контакты
            </h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>Email: optteem@mail.ru</p>
              <p>Телефон: +7 (925) 733-86-48</p>
              <p>Работаем 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
