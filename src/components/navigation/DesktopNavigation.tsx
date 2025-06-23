
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RoleBasedNavigation from "./RoleBasedNavigation";

const navLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/pricing" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contact" },
];

interface DesktopNavigationProps {
  isAuthenticated: boolean;
}

export default function DesktopNavigation({ isAuthenticated }: DesktopNavigationProps) {
  const location = useLocation();

  return (
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
  );
}
