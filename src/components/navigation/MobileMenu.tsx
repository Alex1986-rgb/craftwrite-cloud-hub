
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/prices" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contact" },
];

export default function MobileMenu({ isOpen, onClose, isAuthenticated, user, logout }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 md:top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          {/* Navigation */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Навигация
            </h3>
            {navLinks.map((link) => (
              <Button
                asChild
                variant="ghost"
                key={link.to}
                className="w-full justify-start rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                onClick={onClose}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="pt-6 border-t border-slate-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  {user?.name || user?.email}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link to="/login" onClick={onClose}>Войти</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register" onClick={onClose}>Регистрация</Link>
                </Button>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-slate-200">
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl py-4 text-lg shadow-lg"
              onClick={onClose}
            >
              <Link to="/order">Заказать тексты</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
