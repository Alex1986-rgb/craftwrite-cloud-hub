
import { useState, useCallback } from 'react';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { toast } from '@/components/ui/sonner';

interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  service: string;
  status: 'new' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  amount: number;
  deadline: string;
  createdAt: string;
  description: string;
  aiGenerated: boolean;
}

export function useOrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { handleAsync } = useErrorHandler();

  // Временные данные для демонстрации
  const mockOrders: Order[] = [
    {
      id: "ORD-001",
      clientName: "ООО 'Инновационные технологии'",
      clientEmail: "tech@company.ru",
      service: "SEO-статья",
      status: "in_progress",
      priority: "high",
      amount: 8500,
      deadline: "2024-12-20",
      createdAt: "2024-12-14",
      description: "Статья о внедрении AI в бизнес-процессы, 3000 знаков",
      aiGenerated: false
    },
    {
      id: "ORD-002",
      clientName: "ИП Петров Алексей",
      clientEmail: "petrov@business.ru",
      service: "Продающий лендинг",
      status: "completed",
      priority: "medium",
      amount: 25000,
      deadline: "2024-12-15",
      createdAt: "2024-12-10",
      description: "Лендинг для курсов по маркетингу",
      aiGenerated: true
    },
    {
      id: "ORD-003",
      clientName: "Старт-ап XYZ",
      clientEmail: "hello@startupxyz.com",
      service: "Email-кампания",
      status: "new",
      priority: "urgent",
      amount: 12000,
      deadline: "2024-12-18",
      createdAt: "2024-12-14",
      description: "Серия из 5 писем для email-рассылки",
      aiGenerated: false
    },
    {
      id: "ORD-004",
      clientName: "Мария Сидорова",
      clientEmail: "maria@startup.com",
      service: "Контент-стратегия",
      status: "review",
      priority: "medium",
      amount: 15000,
      deadline: "2024-12-22",
      createdAt: "2024-12-12",
      description: "Разработка контент-стратегии на 3 месяца",
      aiGenerated: true
    },
    {
      id: "ORD-005",
      clientName: "ООО 'Цифровые решения'",
      clientEmail: "digital@solutions.ru",
      service: "SMM-тексты",
      status: "cancelled",
      priority: "low",
      amount: 6000,
      deadline: "2024-12-16",
      createdAt: "2024-12-08",
      description: "Тексты для социальных сетей на месяц",
      aiGenerated: false
    }
  ];

  const loadOrders = useCallback(async () => {
    await handleAsync(async () => {
      setLoading(true);
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(mockOrders);
      setLoading(false);
    }, 'Ошибка загрузки заказов');
  }, [handleAsync]);

  const searchOrders = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: string) => {
    await handleAsync(async () => {
      // TODO: Заменить на реальный API вызов
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as Order['status'] }
          : order
      ));
      toast.success(`Статус заказа ${orderId} изменен`);
    }, 'Ошибка обновления статуса заказа');
  }, [handleAsync]);

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return {
    orders: filteredOrders,
    loading,
    searchQuery,
    statusFilter,
    priorityFilter,
    selectedOrder,
    loadOrders,
    searchOrders,
    setStatusFilter,
    setPriorityFilter,
    setSelectedOrder,
    updateOrderStatus
  };
}
