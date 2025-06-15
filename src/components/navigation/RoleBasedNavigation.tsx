
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Bot, 
  Edit, 
  CreditCard, 
  BarChart3, 
  Settings,
  FileText,
  MessageSquare,
  Package,
  Briefcase,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUnifiedAuth, UserRole } from "@/contexts/UnifiedAuthContext";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string | number;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  // Гостевая навигация
  { path: "/", icon: Home, label: "Главная", roles: ['guest', 'client', 'admin'] },
  { path: "/prices", icon: CreditCard, label: "Цены", roles: ['guest', 'client', 'admin'] },
  { path: "/portfolio", icon: Briefcase, label: "Портфолио", roles: ['guest', 'client', 'admin'] },
  { path: "/blog", icon: FileText, label: "Блог", roles: ['guest', 'client', 'admin'] },
  { path: "/about", icon: Users, label: "О нас", roles: ['guest', 'client', 'admin'] },
  
  // Клиентская навигация
  { path: "/client", icon: User, label: "Личный кабинет", roles: ['client', 'admin'] },
  { path: "/client/orders", icon: ShoppingCart, label: "Мои заказы", badge: 3, roles: ['client', 'admin'] },
  { path: "/client/documents", icon: FileText, label: "Документы", roles: ['client', 'admin'] },
  { path: "/client/payments", icon: CreditCard, label: "Платежи", roles: ['client', 'admin'] },
  { path: "/client/support", icon: MessageSquare, label: "Поддержка", roles: ['client', 'admin'] },
  
  // Админская навигация
  { path: "/admin", icon: BarChart3, label: "Админ-панель", roles: ['admin'] },
  { path: "/admin/orders", icon: Package, label: "Все заказы", badge: 12, roles: ['admin'] },
  { path: "/admin/clients", icon: Users, label: "Клиенты", roles: ['admin'] },
  { path: "/admin/ai-generator", icon: Bot, label: "AI Генератор", badge: "NEW", roles: ['admin'] },
  { path: "/admin/page-editor", icon: Edit, label: "Редактор", roles: ['admin'] },
  { path: "/admin/analytics", icon: BarChart3, label: "Аналитика", roles: ['admin'] },
  { path: "/admin/settings", icon: Settings, label: "Настройки", roles: ['admin'] },
];

interface RoleBasedNavigationProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export default function RoleBasedNavigation({ 
  className, 
  variant = 'horizontal', 
  showLabels = true 
}: RoleBasedNavigationProps) {
  const { currentRole } = useUnifiedAuth();
  const location = useLocation();

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(currentRole)
  );

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={cn(
      "flex",
      variant === 'horizontal' ? "flex-row items-center gap-1" : "flex-col gap-1",
      className
    )}>
      {filteredItems.map((item) => {
        const isActive = isActiveRoute(item.path);
        
        return (
          <Button
            key={item.path}
            asChild
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "nav-unified-item",
              variant === 'horizontal' ? "rounded-full" : "w-full justify-start rounded-lg",
              isActive && "active"
            )}
          >
            <Link to={item.path} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {showLabels && (
                <>
                  <span className={cn(
                    "font-medium",
                    variant === 'horizontal' && "hidden lg:inline"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge 
                      variant={typeof item.badge === 'string' ? "default" : "secondary"}
                      className="ml-auto text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
