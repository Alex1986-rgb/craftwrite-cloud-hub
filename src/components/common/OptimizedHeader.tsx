
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const mainNavLinks = [
  { label: "Услуги", to: "/#services" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Цены", to: "/prices" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
];

export default function OptimizedHeader() {
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
      <div className="container max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        {/* Компактный логотип */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl text-primary group"
          onClick={closeMobileMenu}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CopyPro<span className="text-slate-600">Cloud</span>
          </span>
        </Link>

        {/* Упрощенная навигация */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNavLinks.map((link) => (
            <Button
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
              key={link.to}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                location.pathname === link.to 
                  ? "bg-blue-100 text-blue-700 font-bold" 
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Компактный CTA */}
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            className="hidden sm:flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-xl px-6 py-2 shadow-lg transition-all duration-300"
          >
            <Link to="/order">Заказать</Link>
          </Button>

          {/* Мобильное меню */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Оптимизированное мобильное меню */}
      {isMobileMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="lg:hidden fixed top-16 right-0 w-72 max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300">
            <div className="p-6 space-y-4">
              <nav className="space-y-2">
                {mainNavLinks.map((link) => (
                  <Button
                    asChild
                    variant="ghost"
                    key={link.to}
                    className="w-full justify-start rounded-xl px-4 py-3 text-base font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={closeMobileMenu}
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </Button>
                ))}
              </nav>
              
              <div className="pt-4 border-t border-slate-200">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl py-3"
                  onClick={closeMobileMenu}
                >
                  <Link to="/order">Заказать тексты</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
