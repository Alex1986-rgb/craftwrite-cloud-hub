
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Bot, 
  Edit, 
  CreditCard, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  Cog,
  Rocket
} from "lucide-react";
import { UnifiedButton } from "@/components/unified";
import { useUnifiedAuth } from "@/contexts/UnifiedAuthContext";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { logout } = useUnifiedAuth();

  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard", badge: null },
    { path: "/admin/launch", icon: Rocket, label: "🚀 Запуск системы", badge: "READY" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Заказы", badge: "12" },
    { path: "/admin/clients", icon: Users, label: "Клиенты", badge: null },
    { path: "/admin/content-manager", icon: Edit, label: "Контент-менеджер", badge: "NEW" },
    { path: "/admin/automation", icon: Cog, label: "Автоматизация", badge: "AI" },
    { path: "/admin/prompts", icon: Bot, label: "Промпты", badge: "HOT" },
    { path: "/admin/pricing", icon: CreditCard, label: "Ценообразование", badge: null },
    { path: "/admin/ai-generator", icon: Bot, label: "AI Генератор", badge: null },
    { path: "/admin/page-editor", icon: Edit, label: "Редактор страниц", badge: null },
    { path: "/admin/payments", icon: CreditCard, label: "Платежи", badge: null },
    { path: "/admin/analytics", icon: BarChart3, label: "Аналитика", badge: null },
    { path: "/admin/settings", icon: Settings, label: "Настройки", badge: null },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full glass-unified border-r border-white/20 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-brand-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">CopyPro</span>
            </div>
          )}
          <UnifiedButton
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-neutral-400 hover:text-white"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </UnifiedButton>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`nav-unified-item ${isActive ? 'active' : ''}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                        item.badge === "NEW" 
                          ? 'bg-success text-white' 
                          : 'bg-brand-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">
        <UnifiedButton
          variant="ghost"
          onClick={logout}
          className={`w-full text-neutral-400 hover:text-white ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Выйти</span>}
        </UnifiedButton>
      </div>
    </div>
  );
}
