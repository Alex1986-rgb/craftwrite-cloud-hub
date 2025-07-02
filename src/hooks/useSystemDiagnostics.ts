import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DiagnosticResult {
  check_type: string;
  check_name: string;
  status: 'pass' | 'fail' | 'warning';
  details: Record<string, any>;
  error_message?: string;
}

export function useSystemDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: diagError } = await supabase.rpc('run_system_diagnostics');
      
      if (diagError) throw diagError;
      
      setDiagnostics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run diagnostics');
      console.error('System diagnostics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getOverallStatus = () => {
    if (diagnostics.length === 0) return 'unknown';
    
    const hasFailures = diagnostics.some(d => d.status === 'fail');
    const hasWarnings = diagnostics.some(d => d.status === 'warning');
    
    if (hasFailures) return 'critical';
    if (hasWarnings) return 'warning';
    return 'healthy';
  };

  const getStatusCounts = () => {
    return diagnostics.reduce((acc, diagnostic) => {
      acc[diagnostic.status] = (acc[diagnostic.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const getDiagnosticsByType = (type: string) => {
    return diagnostics.filter(d => d.check_type === type);
  };

  // Auto-run diagnostics on mount
  useEffect(() => {
    runDiagnostics();
  }, []);

  return {
    diagnostics,
    loading,
    error,
    runDiagnostics,
    getOverallStatus,
    getStatusCounts,
    getDiagnosticsByType
  };
}