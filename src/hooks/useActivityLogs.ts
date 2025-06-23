
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export function useActivityLogs() {
  const { user, currentRole } = useUnifiedAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (limit = 50) => {
    if (currentRole !== 'admin') return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setLogs(data || []);
    } catch (error: any) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (
    action: string,
    entityType?: string,
    entityId?: string,
    details?: any
  ) => {
    try {
      await supabase.rpc('log_activity', {
        p_action: action,
        p_entity_type: entityType,
        p_entity_id: entityId,
        p_details: details
      });
    } catch (error: any) {
      console.error('Error logging activity:', error);
    }
  };

  useEffect(() => {
    if (currentRole === 'admin') {
      fetchLogs();
    }
  }, [currentRole]);

  return {
    logs,
    loading,
    fetchLogs,
    logActivity
  };
}
