
import { useState } from "react";
import { useUnifiedAuth } from "@/contexts/UnifiedAuthContext";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import UserMenu from "./UserMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function UnifiedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useUnifiedAuth();

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
        <Logo onLogoClick={closeMobileMenu} />

        {/* Desktop Navigation */}
        <DesktopNavigation isAuthenticated={isAuthenticated} />

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
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
    </header>
  );
}
