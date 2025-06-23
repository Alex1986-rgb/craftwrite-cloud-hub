
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/pricing" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 bg-white/95 border-b border-slate-200/50 backdrop-blur-xl sticky top-0 shadow-sm">
      <div className="container max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20 px-4 sm:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 font-bold text-xl md:text-2xl text-primary min-w-0 group"
          onClick={closeMobileMenu}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
            CopyPro<span className="text-slate-600">Cloud</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
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
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/order">Заказать</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-600" />
          ) : (
            <Menu className="w-6 h-6 text-slate-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 md:top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          {/* Mobile Navigation */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Навигация
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

          {/* Mobile CTA */}
          <div className="pt-6 border-t border-slate-200">
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-xl py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={closeMobileMenu}
            >
              <Link to="/order">
                <Sparkles className="w-5 h-5 mr-2" />
                Заказать тексты
              </Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Контакты
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>Email: info@copyprocloud.ru</p>
              <p>Работаем 24/7</p>
              <p>30+ экспертов готовы к работе</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
