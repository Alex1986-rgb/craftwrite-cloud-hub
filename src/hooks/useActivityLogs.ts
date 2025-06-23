
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

export function useActivityLogs() {
  const { user } = useUnifiedAuth();

  const logActivity = async (
    action: string,
    entityType?: string,
    entityId?: string,
    details?: Record<string, any>
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('log_activity', {
        p_action: action,
        p_entity_type: entityType,
        p_entity_id: entityId,
        p_details: details ? JSON.stringify(details) : null
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return { logActivity };
}
