
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useOrderManagement } from "@/hooks/useOrderManagement";
import OrderStatsCards from "./order/OrderStatsCards";
import OrderFilters from "./order/OrderFilters";
import OrderTable from "./order/OrderTable";
import OrderDetailsModal from "./order/OrderDetailsModal";

export default function OrderManagement() {
  const { 
    orders, 
    loading, 
    searchQuery, 
    statusFilter, 
    priorityFilter,
    selectedOrder,
    searchOrders, 
    setStatusFilter,
    setPriorityFilter,
    setSelectedOrder,
    updateOrderStatus
  } = useOrderManagement();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const orderStats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalValue: orders.reduce((sum, o) => sum + (o.estimated_price || o.final_price || 0) / 100, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление заказами</h1>
          <p className="text-slate-600">Полный контроль над заказами и их статусами</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Создать заказ
        </Button>
      </div>

      {/* Stats Cards */}
      <OrderStatsCards stats={orderStats} />

      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={searchOrders}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
      />

      {/* Orders Table */}
      <OrderTable
        orders={orders}
        searchQuery={searchQuery}
        onStatusChange={handleStatusChange}
        onViewOrder={handleViewOrder}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
