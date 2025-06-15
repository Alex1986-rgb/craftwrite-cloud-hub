
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  FileText,
  Plus,
  CreditCard,
  MessageSquare,
  BarChart3,
  Bell,
  Menu,
  Briefcase,
  Download
} from 'lucide-react';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Главная', href: '/client', icon: Home },
    { name: 'Рабочее пространство', href: '/client/workspace', icon: Briefcase, badge: 'NEW' },
    { name: 'Мои заказы', href: '/client/orders', icon: FileText, badge: '2' },
    { name: 'Новый заказ', href: '/client/new-order', icon: Plus },
    { name: 'Документы', href: '/client/documents', icon: Download },
    { name: 'Платежи', href: '/client/payments', icon: CreditCard },
    { name: 'Поддержка', href: '/client/support', icon: MessageSquare, badge: '1' },
    { name: 'Аналитика', href: '/client/analytics', icon: BarChart3 },
    { name: 'Уведомления', href: '/client/notifications', icon: Bell, badge: '2' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="glass-card border-0">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 glass-card border-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-bold text-gradient">TextCraft</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'glass-card border border-blue-200/30 text-blue-600 dark:text-blue-400 shadow-glow'
                      : 'text-slate-700 dark:text-slate-300 hover:glass-card hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
