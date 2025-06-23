
import { useState, useCallback } from 'react';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useEnhancedOrders, EnhancedOrder } from '@/hooks/useEnhancedOrders';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

export function useOrderManagement() {
  const { currentRole } = useUnifiedAuth();
  const { orders, loading: ordersLoading, updateOrderStatus, assignOrderToAdmin, updateOrderPriority } = useEnhancedOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<EnhancedOrder | null>(null);
  const { handleAsync } = useErrorHandler();

  const searchOrders = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await handleAsync(async () => {
      await updateOrderStatus(orderId, newStatus);
    }, 'Ошибка обновления статуса заказа');
  };

  const handleAssignOrder = async (orderId: string, adminId: string) => {
    if (currentRole !== 'admin') return;
    
    await handleAsync(async () => {
      await assignOrderToAdmin(orderId, adminId);
    }, 'Ошибка назначения заказа');
  };

  const handlePriorityChange = async (orderId: string, priority: string) => {
    if (currentRole !== 'admin') return;
    
    await handleAsync(async () => {
      await updateOrderPriority(orderId, priority);
    }, 'Ошибка обновления приоритета');
  };

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.contact_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return {
    orders: filteredOrders,
    loading: ordersLoading,
    searchQuery,
    statusFilter,
    priorityFilter,
    selectedOrder,
    searchOrders,
    setStatusFilter,
    setPriorityFilter,
    setSelectedOrder,
    updateOrderStatus: handleStatusChange,
    assignOrderToAdmin: handleAssignOrder,
    updateOrderPriority: handlePriorityChange
  };
}
