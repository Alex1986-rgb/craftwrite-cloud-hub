
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SystemSetting {
  key: string;
  value: any;
  description?: string;
}

export function useSystemSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('key, value, description');

      if (error) throw error;

      const settingsMap = data.reduce((acc, setting) => {
        try {
          // Parse JSON value
          acc[setting.key] = JSON.parse(setting.value);
        } catch {
          // If not JSON, use as string
          acc[setting.key] = setting.value;
        }
        return acc;
      }, {} as Record<string, any>);

      setSettings(settingsMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
      console.error('Error fetching system settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      const { error } = await supabase
        .from('system_settings')
        .upsert({ key, value: jsonValue }, { onConflict: 'key' });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setting');
      console.error('Error updating setting:', err);
      throw err;
    }
  };

  const getSetting = (key: string, defaultValue?: any) => {
    return settings[key] ?? defaultValue;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSetting,
    getSetting,
    refreshSettings: fetchSettings
  };
}
