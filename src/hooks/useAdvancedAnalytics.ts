
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface KPIData {
  kpi_name: string;
  kpi_value: number;
  kpi_target?: number;
  unit: string;
  category: string;
  updated_at: string;
}

export interface FinancialAnalytics {
  date: string;
  revenue: number;
  orders_count: number;
  avg_order_value: number;
  conversion_rate: number;
  customer_acquisition_cost: number;
  lifetime_value: number;
  margin_percentage: number;
  refund_rate: number;
}

export interface CustomerAnalytics {
  user_id: string;
  total_orders: number;
  total_spent: number;
  avg_order_value: number;
  lifetime_value: number;
  satisfaction_score?: number;
  churn_probability?: number;
  segment?: string;
  first_order_date?: string;
  last_order_date?: string;
}

export function useAdvancedAnalytics() {
  const [kpis, setKpis] = useState<KPIData[]>([]);
  const [financialData, setFinancialData] = useState<FinancialAnalytics[]>([]);
  const [customerData, setCustomerData] = useState<CustomerAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real-time KPIs
  const fetchKPIs = async () => {
    try {
      const { data, error } = await supabase
        .from('realtime_kpis')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setKpis(data || []);
    } catch (err) {
      console.error('Error fetching KPIs:', err);
      setError('Failed to fetch KPIs');
    }
  };

  // Fetch financial analytics
  const fetchFinancialAnalytics = async (days: number = 30) => {
    try {
      const { data, error } = await supabase
        .from('financial_analytics')
        .select('*')
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;
      setFinancialData(data || []);
    } catch (err) {
      console.error('Error fetching financial analytics:', err);
      setError('Failed to fetch financial analytics');
    }
  };

  // Fetch customer analytics
  const fetchCustomerAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_analytics')
        .select('*')
        .order('total_spent', { ascending: false })
        .limit(100);

      if (error) throw error;
      setCustomerData(data || []);
    } catch (err) {
      console.error('Error fetching customer analytics:', err);
      setError('Failed to fetch customer analytics');
    }
  };

  // Update KPIs manually
  const updateKPIs = async () => {
    try {
      const { error } = await supabase.rpc('update_realtime_kpis');
      if (error) throw error;
      await fetchKPIs();
    } catch (err) {
      console.error('Error updating KPIs:', err);
      setError('Failed to update KPIs');
    }
  };

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchKPIs(),
        fetchFinancialAnalytics(),
        fetchCustomerAnalytics()
      ]);
      setLoading(false);
    };

    loadData();

    // Set up real-time subscriptions
    const kpiSubscription = supabase
      .channel('realtime-kpis')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'realtime_kpis'
      }, () => {
        fetchKPIs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(kpiSubscription);
    };
  }, []);

  return {
    kpis,
    financialData,
    customerData,
    loading,
    error,
    updateKPIs,
    fetchFinancialAnalytics,
    fetchCustomerAnalytics
  };
}
