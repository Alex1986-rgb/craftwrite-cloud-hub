import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll detection for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header className={cn(
      "w-full z-50 sticky top-0 transition-all duration-500",
      isScrolled 
        ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-slate-200/80" 
        : "bg-white/95 backdrop-blur-lg border-b border-slate-200/50"
    )}>
      <div className="container max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        {/* Enhanced logo with better animations */}
        <Link 
          to="/" 
          className="flex items-center gap-3 font-bold text-xl text-primary group"
          onClick={closeMobileMenu}
        >
          <div className={cn(
            "w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-500",
            "group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-glow"
          )}>
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CopyPro<span className="text-slate-700 font-semibold">Cloud</span>
          </span>
        </Link>

        {/* Enhanced navigation with better hover effects */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNavLinks.map((link, index) => (
            <Button
              asChild
              variant={location.pathname === link.to ? "secondary" : "ghost"}
              size="sm"
              key={link.to}
              className={cn(
                "rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 relative overflow-hidden group",
                location.pathname === link.to 
                  ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md" 
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={link.to} className="relative z-10">
                {link.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Enhanced CTA and mobile menu */}
        <div className="flex items-center gap-4">
          <Button 
            asChild 
            className={cn(
              "hidden sm:flex font-bold rounded-xl px-8 py-3 shadow-lg transition-all duration-500 relative overflow-hidden group",
              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500",
              "hover:scale-105 hover:shadow-glow"
            )}
          >
            <Link to="/order" className="flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4" />
              Заказать
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </Button>

          {/* Enhanced mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              "lg:hidden p-3 rounded-xl transition-all duration-300 relative",
              "hover:bg-slate-100 hover:scale-110 active:scale-95",
              isMobileMenuOpen && "bg-slate-100"
            )}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-5">
              <Menu className={cn(
                "w-5 h-5 text-slate-600 absolute transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              )} />
              <X className={cn(
                "w-5 h-5 text-slate-600 absolute transition-all duration-300",
                isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced mobile menu with better animations */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-40 transition-all duration-500",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeMobileMenu} />
        <div className={cn(
          "absolute top-16 right-0 w-80 max-w-[90vw] bg-white/98 backdrop-blur-xl border-l border-slate-200 shadow-2xl transition-all duration-500",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-8 space-y-6">
            <nav className="space-y-3">
              {mainNavLinks.map((link, index) => (
                <Button
                  asChild
                  variant="ghost"
                  key={link.to}
                  className={cn(
                    "w-full justify-start rounded-xl px-5 py-4 text-base font-semibold transition-all duration-300",
                    "text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600",
                    "hover:scale-105 hover:shadow-md"
                  )}
                  onClick={closeMobileMenu}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={link.to} className="flex items-center gap-3">
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
            
            <div className="pt-6 border-t border-slate-200">
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl py-4 text-lg shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                onClick={closeMobileMenu}
              >
                <Link to="/order" className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Заказать тексты
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
