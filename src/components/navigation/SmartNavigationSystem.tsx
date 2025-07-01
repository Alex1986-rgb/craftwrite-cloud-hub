
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles, 
  Bell, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Zap,
  Award,
  Users
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  priority?: number;
}

const mainNavigation: NavigationItem[] = [
  { label: 'Главная', path: '/', icon: Star, priority: 1 },
  { label: 'Услуги', path: '/services', icon: Zap, priority: 2 },
  { label: 'Портфолио', path: '/portfolio', icon: Award, priority: 3 },
  { label: 'Цены', path: '/prices', priority: 4 },
  { label: 'О нас', path: '/about', icon: Users, priority: 5 },
  { label: 'Блог', path: '/blog', priority: 6 },
  { label: 'Контакты', path: '/contact', priority: 7 }
];

export default function SmartNavigationSystem() {
  const location = useLocation();
  const { trackInteraction } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Smart scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smart breadcrumbs generator
  const generateBreadcrumbs = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Главная', path: '/' }];
    
    let currentPath = '';
    pathParts.forEach((part) => {
      currentPath += `/${part}`;
      const navItem = mainNavigation.find(item => item.path === currentPath);
      if (navItem) {
        breadcrumbs.push({ label: navItem.label, path: currentPath });
      } else {
        breadcrumbs.push({ 
          label: part.charAt(0).toUpperCase() + part.slice(1), 
          path: currentPath 
        });
      }
    });
    
    return breadcrumbs;
  };

  // Predictive search suggestions
  const getSearchSuggestions = (query: string) => {
    if (!query) return [];
    
    const suggestions = [
      'SEO копирайтинг',
      'Контент для сайта',
      'Продающие тексты',
      'Email рассылки',
      'Социальные сети',
      'Техническое задание'
    ].filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    
    return suggestions.slice(0, 3);
  };

  const handleNavClick = (item: NavigationItem) => {
    trackInteraction('smart_nav', 'click', { 
      item: item.label, 
      priority: item.priority 
    });
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackInteraction('smart_search', 'submit', { query: searchQuery });
    setIsSearchOpen(false);
  };

  const breadcrumbs = generateBreadcrumbs();
  const suggestions = getSearchSuggestions(searchQuery);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-[60] opacity-0 animate-fade-in">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Smart Header */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "glass-card-modern shadow-2xl border-b border-white/20" 
          : "bg-white/95 backdrop-blur-xl border-b border-slate-200/50"
      )}>
        <div className="container max-w-7xl mx-auto px-4">
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={() => handleNavClick({ label: 'Logo', path: '/' })}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CopyPro<span className="text-slate-700">Cloud</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {mainNavigation.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Button
                    key={item.path}
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "rounded-xl px-4 py-3 font-semibold transition-all duration-300 relative group",
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md" 
                        : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                    )}
                  >
                    <Link 
                      to={item.path}
                      onClick={() => handleNavClick(item)}
                      className="flex items-center gap-2"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                      {item.badge && (
                        <Badge className="bg-red-500 text-xs px-1 py-0">
                          {item.badge}
                        </Badge>
                      )}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </Button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Smart Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsSearchOpen(true);
                  trackInteraction('smart_search', 'open');
                }}
                className="hidden sm:flex rounded-full hover:bg-blue-50"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex rounded-full hover:bg-blue-50 relative"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </Button>

              {/* Smart Order CTA */}
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link 
                  to="/smart-order"
                  onClick={() => trackInteraction('smart_order_cta', 'click', { location: 'header' })}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Умный заказ
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden rounded-xl p-3"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Smart Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <div className="flex items-center gap-2 py-3 text-sm text-slate-600 border-t border-slate-200/50">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                  <Link
                    to={crumb.path}
                    className={cn(
                      "hover:text-blue-600 transition-colors duration-200",
                      index === breadcrumbs.length - 1 
                        ? "text-blue-600 font-semibold" 
                        : "hover:underline"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden absolute top-16 left-0 w-full glass-card-modern border-t border-white/20 transition-all duration-300",
          isMobileMenuOpen 
            ? "opacity-100 visible transform translate-y-0" 
            : "opacity-0 invisible transform -translate-y-4"
        )}>
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-2 mb-6">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Button
                    key={item.path}
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start rounded-xl px-4 py-4 font-semibold transition-all duration-300",
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700" 
                        : "hover:bg-blue-50 hover:text-blue-600"
                    )}
                  >
                    <Link 
                      to={item.path}
                      onClick={() => handleNavClick(item)}
                      className="flex items-center gap-3"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.label}
                      {item.badge && (
                        <Badge className="bg-red-500 text-xs ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Smart Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-60 flex items-start justify-center pt-20">
          <div className="glass-card-modern w-full max-w-2xl mx-4 p-6 animate-scale-in">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center gap-4 mb-4">
                <Search className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  placeholder="Поиск по сайту, услугам, статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg bg-transparent outline-none placeholder-slate-500"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </form>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium">Популярные запросы:</p>
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    className="w-full justify-start rounded-lg hover:bg-blue-50"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      trackInteraction('search_suggestion', 'click', { suggestion });
                    }}
                  >
                    <Search className="w-4 h-4 mr-3 text-blue-500" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
