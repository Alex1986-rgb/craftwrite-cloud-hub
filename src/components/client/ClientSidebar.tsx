import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GlassCard } from '@/components/ui/glass-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  FileText,
  Plus,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Download,
  BarChart3,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { useClientAuth } from '@/contexts/ClientAuthContext';

interface ClientSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ClientSidebar({ isOpen, onToggle }: ClientSidebarProps) {
  const { client, logout } = useClientAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Главная', href: '/client', icon: Home },
    { name: 'Мои заказы', href: '/client/orders', icon: FileText, badge: '2' },
    { name: 'Новый заказ', href: '/client/new-order', icon: Plus },
    { name: 'Документы', href: '/client/documents', icon: Download },
    { name: 'Платежи', href: '/client/payments', icon: CreditCard },
    { name: 'Поддержка', href: '/client/support', icon: MessageSquare, badge: '1' },
    { name: 'Аналитика', href: '/client/analytics', icon: BarChart3 },
    { name: 'Уведомления', href: '/client/notifications', icon: Bell, badge: '2' },
    {
      icon: Briefcase,
      label: 'Рабочее пространство',
      href: '/client/workspace',
      badge: 'NEW'
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 glass-card border-r border-white/20 z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-3 animate-slide-in-right">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-gradient">TextCraft</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden glass-card border-0 hover:shadow-glow"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Enhanced User info */}
          <div className="p-4 border-b border-white/20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-0 h-auto glass-card border-0 hover:shadow-glow">
                  <div className="flex items-center gap-3 w-full p-3 animate-scale-in-center">
                    <Avatar className="w-10 h-10 ring-2 ring-white/20">
                      <AvatarImage src={client?.avatar} />
                      <AvatarFallback className="gradient-primary text-white">
                        {client?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{client?.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{client?.email}</div>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card border-white/20" align="start">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem asChild>
                  <Link to="/client/profile" className="hover:bg-white/10">
                    <Settings className="w-4 h-4 mr-2" />
                    Настройки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/client/help" className="hover:bg-white/10">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Помощь
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem onClick={logout} className="text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`stagger-item flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'glass-card border border-blue-200/30 text-blue-600 dark:text-blue-400 shadow-glow'
                    : 'text-slate-700 dark:text-slate-300 hover:glass-card hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive(item.href) ? 'text-blue-600 dark:text-blue-400' : ''
                }`} />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center animate-pulse shadow-glow">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Enhanced Footer */}
          <div className="p-4 border-t border-white/20">
            <GlassCard className="p-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-glow"></div>
                <span className="text-slate-600 dark:text-slate-400">Статус: Онлайн</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Последняя активность: сейчас
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </>
  );
}
