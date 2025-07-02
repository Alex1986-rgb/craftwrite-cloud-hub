
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEnhancedAnalytics } from './useEnhancedAnalytics';
import { toast } from 'sonner';

interface OrderTrackingResult {
  orders: any[];
  loading: boolean;
  error: string | null;
  searchOrders: (query: string) => Promise<void>;
  getOrderById: (id: string) => Promise<any>;
  clearResults: () => void;
}

export function useOrderTracking(): OrderTrackingResult {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useEnhancedAnalytics();

  const searchOrders = useCallback(async (query: string) => {
    if (!query?.trim()) {
      setError('Введите номер заказа или email для поиска');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Track search attempt
      trackEvent({
        action: 'order_tracking_search',
        category: 'Order Tracking',
        label: query.includes('@') ? 'email_search' : 'id_search'
      });

      let searchQuery = supabase
        .from('orders')
        .select(`
          *,
          payments:payments(
            id,
            amount,
            payment_status,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      // Determine search strategy
      const trimmedQuery = query.trim().toLowerCase();
      
      if (trimmedQuery.includes('@')) {
        // Email search
        searchQuery = searchQuery.eq('contact_email', trimmedQuery);
      } else if (trimmedQuery.startsWith('+')) {
        // Phone search
        searchQuery = searchQuery.eq('contact_phone', query.trim());
      } else if (trimmedQuery.length > 20) {
        // Likely a full UUID
        searchQuery = searchQuery.eq('id', query.trim());
      } else {
        // Partial ID search or order number
        searchQuery = searchQuery.or(
          `id.ilike.${trimmedQuery}%,contact_name.ilike.%${trimmedQuery}%,service_name.ilike.%${trimmedQuery}%`
        );
      }

      const { data, error: searchError } = await searchQuery.limit(10);

      if (searchError) {
        console.error('Search error:', searchError);
        throw new Error('Ошибка при поиске заказов');
      }

      if (!data || data.length === 0) {
        setError('Заказы не найдены. Проверьте правильность введенных данных.');
        setOrders([]);
        
        trackEvent({
          action: 'order_tracking_no_results',
          category: 'Order Tracking',
          label: 'no_results_found'
        });
      } else {
        setOrders(data);
        setError(null);
        
        trackEvent({
          action: 'order_tracking_success',
          category: 'Order Tracking',
          label: 'results_found',
          value: data.length
        });

        toast.success(`Найдено заказов: ${data.length}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при поиске';
      setError(errorMessage);
      setOrders([]);
      
      trackEvent({
        action: 'order_tracking_error',
        category: 'Order Tracking',
        label: 'search_error'
      });

      toast.error('Ошибка поиска заказов');
    } finally {
      setLoading(false);
    }
  }, [trackEvent]);

  const getOrderById = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          payments:payments(*),
          project_files:project_files(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      trackEvent({
        action: 'order_details_viewed',
        category: 'Order Tracking',
        label: 'order_detail_access',
        custom_parameters: {
          order_id: id
        }
      });

      return data;
    } catch (err) {
      console.error('Error fetching order:', err);
      throw err;
    }
  }, [trackEvent]);

  const clearResults = useCallback(() => {
    setOrders([]);
    setError(null);
  }, []);

  return {
    orders,
    loading,
    error,
    searchOrders,
    getOrderById,
    clearResults
  };
}
