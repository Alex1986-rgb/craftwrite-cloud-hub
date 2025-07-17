
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Eye,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

interface KanbanOrder {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  amount: number;
  deadline: string;
  manager: string;
  progress: number;
  tags: string[];
}

const kanbanColumns = [
  { id: 'new', title: 'Новые', icon: PlayCircle, color: 'blue' },
  { id: 'in_progress', title: 'В работе', icon: Clock, color: 'yellow' },
  { id: 'review', title: 'На проверке', icon: Eye, color: 'purple' },
  { id: 'completed', title: 'Завершены', icon: CheckCircle, color: 'green' }
];

export function OrderKanban() {
  const [orders] = useState<KanbanOrder[]>([
    {
      id: 'ORD-001',
      title: 'SEO-статья для блога',
      description: 'Статья о современных трендах в маркетинге',
      status: 'in_progress',
      priority: 'high',
      amount: 8500,
      deadline: '2024-12-20',
      manager: 'Анна Петрова',
      progress: 75,
      tags: ['SEO', 'Маркетинг']
    },
    {
      id: 'ORD-002',
      title: 'Лендинг для курсов',
      description: 'Продающая страница для онлайн-курсов',
      status: 'review',
      priority: 'medium',
      amount: 25000,
      deadline: '2024-12-18',
      manager: 'Сергей Иванов',
      progress: 90,
      tags: ['Лендинг', 'Конверсия']
    },
    {
      id: 'ORD-003',
      title: 'Email-кампания',
      description: 'Серия из 5 писем для автоворонки',
      status: 'completed',
      priority: 'medium',
      amount: 12000,
      deadline: '2024-12-15',
      manager: 'Мария Сидорова',
      progress: 100,
      tags: ['Email', 'Автоматизация']
    },
    {
      id: 'ORD-004',
      title: 'Контент для соцсетей',
      description: 'Контент-план на месяц для Instagram',
      status: 'new',
      priority: 'low',
      amount: 15000,
      deadline: '2024-12-25',
      manager: 'Елена Козлова',
      progress: 0,
      tags: ['SMM', 'Instagram']
    }
  ]);

  const getPriorityColor = (priority: KanbanOrder['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getColumnIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'yellow': return 'text-yellow-600';
      case 'purple': return 'text-purple-600';
      case 'green': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-slide-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Kanban заказов</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Визуальное управление проектами
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kanbanColumns.map((column, columnIndex) => {
          const columnOrders = getOrdersByStatus(column.id);
          const IconComponent = column.icon;
          
          return (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: `${columnIndex * 100}ms` }}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconComponent className={`w-5 h-5 ${getColumnIconColor(column.color)}`} />
                    {column.title}
                    <Badge variant="secondary" className="ml-auto">
                      {columnOrders.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Column Cards */}
              <div className="space-y-4">
                {columnOrders.map((order, orderIndex) => {
                  const daysLeft = getDaysUntilDeadline(order.deadline);
                  
                  return (
                    <Card 
                      key={order.id} 
                      className="glass-card border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-slide-in-up"
                      style={{ animationDelay: `${(columnIndex * 100) + (orderIndex * 50)}ms` }}
                    >
                      <CardContent className="p-4">
                        {/* Order Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-sm group-hover:text-blue-600 transition-colors">
                              {order.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {order.id}
                            </p>
                          </div>
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                          {order.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {order.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        {order.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Прогресс</span>
                              <span>{order.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${order.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Order Info */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs">
                            <DollarSign className="w-3 h-3 text-green-600" />
                            <span className="font-medium">₽{order.amount.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span>{new Date(order.deadline).toLocaleDateString('ru-RU')}</span>
                            {daysLeft <= 3 && daysLeft > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {daysLeft} дн.
                              </Badge>
                            )}
                            {daysLeft <= 0 && (
                              <Badge variant="destructive" className="text-xs">
                                Просрочен
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-xs">
                                {order.manager.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{order.manager}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:shadow-glow">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Чат
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:shadow-glow">
                            <Eye className="w-3 h-3 mr-1" />
                            Детали
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
