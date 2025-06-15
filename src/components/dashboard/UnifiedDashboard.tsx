
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Bot,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { useUnifiedAuth, UserRole } from '@/contexts/UnifiedAuthContext';
import { cn } from '@/lib/utils';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalClients: number;
  aiGenerated: number;
  activeOrders: number;
  completedOrders: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  roles: UserRole[];
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function UnifiedDashboard() {
  const { currentRole, user } = useUnifiedAuth();
  
  // Mock data - in real app would come from API
  const [stats] = useState<DashboardStats>({
    totalRevenue: 158340,
    totalOrders: 24,
    totalClients: 187,
    aiGenerated: 156,
    activeOrders: 8,
    completedOrders: 16
  });

  const quickActions: QuickAction[] = [
    {
      id: 'new-order',
      title: 'Новый заказ',
      description: 'Создать заказ на услуги',
      icon: Plus,
      action: () => console.log('Create order'),
      roles: ['client', 'admin'],
      variant: 'primary'
    },
    {
      id: 'ai-generator',
      title: 'AI Генератор',
      description: 'Создать тексты с помощью ИИ',
      icon: Bot,
      action: () => console.log('Open AI generator'),
      roles: ['admin'],
      variant: 'secondary'
    },
    {
      id: 'view-orders',
      title: 'Мои заказы',
      description: 'Просмотр активных заказов',
      icon: ShoppingCart,
      action: () => console.log('View orders'),
      roles: ['client', 'admin']
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      description: 'Статистика и отчеты',
      icon: BarChart3,
      action: () => console.log('View analytics'),
      roles: ['admin']
    },
    {
      id: 'documents',
      title: 'Документы',
      description: 'Договоры и акты',
      icon: FileText,
      action: () => console.log('View documents'),
      roles: ['client', 'admin']
    },
    {
      id: 'clients',
      title: 'Клиенты',
      description: 'Управление клиентами',
      icon: Users,
      action: () => console.log('Manage clients'),
      roles: ['admin']
    }
  ];

  const getStatsForRole = () => {
    if (currentRole === 'admin') {
      return [
        {
          title: 'Общий доход',
          value: `₽${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          change: '+12.5%',
          positive: true,
          gradient: 'from-blue-500 to-blue-600'
        },
        {
          title: 'Всего заказов',
          value: stats.totalOrders.toString(),
          icon: ShoppingCart,
          change: '+8 новых',
          positive: true,
          gradient: 'from-purple-500 to-purple-600'
        },
        {
          title: 'Клиенты',
          value: stats.totalClients.toString(),
          icon: Users,
          change: '+15 новых',
          positive: true,
          gradient: 'from-green-500 to-green-600'
        },
        {
          title: 'AI тексты',
          value: stats.aiGenerated.toString(),
          icon: Bot,
          change: 'за месяц',
          positive: true,
          gradient: 'from-orange-500 to-orange-600'
        }
      ];
    } else {
      return [
        {
          title: 'Активные заказы',
          value: stats.activeOrders.toString(),
          icon: Clock,
          change: 'в работе',
          positive: true,
          gradient: 'from-blue-500 to-blue-600'
        },
        {
          title: 'Завершенные',
          value: stats.completedOrders.toString(),
          icon: CheckCircle,
          change: 'выполнено',
          positive: true,
          gradient: 'from-green-500 to-green-600'
        },
        {
          title: 'Потрачено',
          value: `₽${(stats.totalRevenue * 0.3).toLocaleString()}`,
          icon: DollarSign,
          change: 'всего',
          positive: true,
          gradient: 'from-purple-500 to-purple-600'
        }
      ];
    }
  };

  const filteredActions = quickActions.filter(action => 
    action.roles.includes(currentRole)
  );

  const statsCards = getStatsForRole();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={cn(
        "glass-unified rounded-xl p-6 text-white relative overflow-hidden",
        currentRole === 'admin' 
          ? "bg-gradient-to-r from-blue-600 to-purple-600" 
          : "bg-gradient-to-r from-green-600 to-blue-600"
      )}>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {currentRole === 'admin' ? 'Панель администратора' : 'Личный кабинет'}
          </h1>
          <p className="text-white/90">
            Добро пожаловать, {user?.name}! 
            {currentRole === 'admin' && ` У вас ${stats.activeOrders} активных заказов`}
            {currentRole === 'client' && ` У вас ${stats.activeOrders} заказов в работе`}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className={cn(
            "border-0 text-white relative overflow-hidden",
            `bg-gradient-to-r ${stat.gradient}`
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-unified border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-600" />
            Быстрые действия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActions.map((action) => (
              <div
                key={action.id}
                className="glass-unified rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={action.action}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                    <action.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-unified border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600" />
            Последняя активность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentRole === 'admin' ? (
              <>
                <div className="flex items-center gap-3 p-3 glass-unified rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Заказ #ORD-001 завершен</p>
                    <p className="text-sm text-neutral-600">5 минут назад</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Завершено</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 glass-unified rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Новый заказ от ООО "Технологии"</p>
                    <p className="text-sm text-neutral-600">15 минут назад</p>
                  </div>
                  <Badge>Новый</Badge>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 glass-unified rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Заказ #ORD-002 на проверке</p>
                    <p className="text-sm text-neutral-600">1 час назад</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">На проверке</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 glass-unified rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Заказ #ORD-003 в работе</p>
                    <p className="text-sm text-neutral-600">2 часа назад</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">В работе</Badge>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
