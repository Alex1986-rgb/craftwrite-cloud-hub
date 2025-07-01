
import { useState } from "react";
import { useUnifiedAuth } from "@/contexts/UnifiedAuthContext";
import { useTranslation } from 'react-i18next';
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import UserMenu from "./UserMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function UnifiedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useUnifiedAuth();
  const { t } = useTranslation();
  const { trackInteraction } = useAnalytics();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    trackInteraction('search', 'open');
  };

  const handleSmartOrderClick = () => {
    trackInteraction('smart_order_button', 'click', { location: 'header' });
  };

  return (
    <header className="w-full z-50 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl sticky top-0 shadow-sm">
      <div className="container max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20 px-4 sm:px-6">
        {/* Logo */}
        <Logo onLogoClick={closeMobileMenu} />

        {/* Desktop Navigation */}
        <DesktopNavigation isAuthenticated={isAuthenticated} />

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearchOpen}
            className="rounded-full"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Smart Order CTA */}
          <Button 
            asChild 
            onClick={handleSmartOrderClick}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link to="/smart-order">
              <Sparkles className="w-4 h-4 mr-2" />
              Умный заказ
            </Link>
          </Button>

          {isAuthenticated && <NotificationCenter />}
          <ThemeToggle />
          <LanguageSwitcher />
          <UserMenu 
            isAuthenticated={isAuthenticated} 
            user={user} 
            logout={logout} 
          />
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton 
          isOpen={isMobileMenuOpen} 
          onToggle={toggleMobileMenu} 
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по сайту..."
                className="flex-1 text-lg outline-none bg-transparent"
                autoFocus
              />
              <Button 
                variant="ghost" 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Поиск по услугам, статьям и FAQ
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
