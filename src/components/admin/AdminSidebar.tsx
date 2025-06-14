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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard", badge: null },
    { path: "/admin/orders", icon: ShoppingCart, label: "Заказы", badge: "12" },
    { path: "/admin/clients", icon: Users, label: "Клиенты", badge: null },
    { path: "/admin/ai-generator", icon: Bot, label: "AI Генератор", badge: "NEW" },
    { path: "/admin/page-editor", icon: Edit, label: "Редактор страниц", badge: null },
    { path: "/admin/payments", icon: CreditCard, label: "Платежи", badge: null },
    { path: "/admin/analytics", icon: BarChart3, label: "Аналитика", badge: null },
    { path: "/admin/settings", icon: Settings, label: "Настройки", badge: null },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">CopyPro</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                        item.badge === "NEW" 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
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
        <Button
          variant="ghost"
          onClick={logout}
          className={`w-full text-slate-400 hover:text-white hover:bg-slate-800 ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Выйти</span>}
        </Button>
      </div>
    </div>
  );
}
