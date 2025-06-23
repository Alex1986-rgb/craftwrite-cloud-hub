
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import RoleBasedNavigation from "./RoleBasedNavigation";
import RoleSwitcher from "./RoleSwitcher";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/pricing" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
}

export default function MobileMenu({ isOpen, onClose, isAuthenticated, user, logout }: MobileMenuProps) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 md:top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] glass-unified border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
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
                onClick={onClose}
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
                onClick={() => { logout(); onClose(); }}
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
                  onClick={onClose}
                >
                  <Link to="/login">Войти</Link>
                </Button>
                <Button 
                  asChild 
                  className="btn-unified-primary w-full"
                  onClick={onClose}
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

          {/* Additional Links */}
          <div className="pt-6 border-t border-white/20 space-y-2">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Дополнительно
            </h3>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={onClose}>
              <Link to="/order-tracking">Отследить заказ</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={onClose}>
              <Link to="/terms">Условия использования</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start" onClick={onClose}>
              <Link to="/privacy">Политика конфиденциальности</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
