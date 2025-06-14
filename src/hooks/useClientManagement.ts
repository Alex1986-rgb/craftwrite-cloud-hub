
import { useState, useCallback } from 'react';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { apiClient } from '@/utils/api';
import { User } from '@/types/global';

interface Client extends User {
  company?: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  registrationDate: string;
  status: 'active' | 'inactive';
}

export function useClientManagement() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { handleAsync } = useErrorHandler();

  // Временные данные (заменить на API вызовы)
  const mockClients: Client[] = [
    {
      id: "CL-001",
      name: "Иван Петров",
      email: "ivan@company.ru",
      phone: "+7 (999) 123-45-67",
      company: "ООО 'Технологии'",
      role: "client",
      totalOrders: 5,
      totalSpent: 85000,
      status: "active",
      lastOrderDate: "2024-12-10",
      registrationDate: "2024-10-15",
      created_at: "2024-10-15T10:00:00Z",
      updated_at: "2024-12-10T15:30:00Z"
    },
    {
      id: "CL-002", 
      name: "Мария Сидорова",
      email: "maria@startup.com",
      phone: "+7 (888) 987-65-43",
      company: "Старт-ап XYZ",
      role: "client",
      totalOrders: 3,
      totalSpent: 45000,
      status: "active",
      lastOrderDate: "2024-12-14",
      registrationDate: "2024-11-01",
      created_at: "2024-11-01T09:15:00Z",
      updated_at: "2024-12-14T12:20:00Z"
    }
  ];

  const loadClients = useCallback(async () => {
    await handleAsync(async () => {
      setLoading(true);
      // TODO: Заменить на реальный API вызов
      // const response = await apiClient.get<Client[]>('/admin/clients');
      // setClients(response.data || []);
      
      // Временная имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 500));
      setClients(mockClients);
      setLoading(false);
    }, 'Ошибка загрузки клиентов');
  }, [handleAsync]);

  const searchClients = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.company && client.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return {
    clients: filteredClients,
    loading,
    searchQuery,
    loadClients,
    searchClients
  };
}
