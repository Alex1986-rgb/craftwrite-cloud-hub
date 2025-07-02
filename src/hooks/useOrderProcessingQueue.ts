import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QueueItem {
  id: string;
  order_id: string;
  processing_step: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  attempts: number;
  max_attempts: number;
  error_message?: string;
  scheduled_at: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export function useOrderProcessingQueue() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: queueError } = await supabase
        .from('order_processing_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (queueError) throw queueError;
      
      setQueueItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch queue');
      console.error('Order processing queue error:', err);
    } finally {
      setLoading(false);
    }
  };

  const processQueue = async () => {
    try {
      setError(null);
      
      const { error: processError } = await supabase.rpc('process_order_queue');
      
      if (processError) throw processError;
      
      // Refresh queue after processing
      await fetchQueue();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process queue');
      console.error('Queue processing error:', err);
    }
  };

  const addToQueue = async (orderId: string, step: string) => {
    try {
      setError(null);
      
      const { error: insertError } = await supabase
        .from('order_processing_queue')
        .insert({
          order_id: orderId,
          processing_step: step
        });
      
      if (insertError) throw insertError;
      
      await fetchQueue();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to queue');
      console.error('Add to queue error:', err);
    }
  };

  const getQueueStats = () => {
    return queueItems.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const getPendingItems = () => {
    return queueItems.filter(item => item.status === 'pending');
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchQueue();
  }, []);

  return {
    queueItems,
    loading,
    error,
    fetchQueue,
    processQueue,
    addToQueue,
    getQueueStats,
    getPendingItems
  };
}