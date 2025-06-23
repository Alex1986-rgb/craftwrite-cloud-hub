
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface ContentVersion {
  id: string;
  order_id: string;
  version_number: number;
  content: string;
  content_type: 'seo-article' | 'landing' | 'email' | 'social';
  prompt_used?: string;
  ai_model: string;
  quality_score?: number;
  is_active: boolean;
  created_by?: string;
  created_at: string;
}

export function useContentVersions(orderId?: string) {
  const { user, currentRole } = useUnifiedAuth();
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [activeVersion, setActiveVersion] = useState<ContentVersion | null>(null);
  const [loading, setLoading] = useState(false);

  // Получение всех версий для заказа
  const fetchVersions = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_content_versions')
        .select('*')
        .eq('order_id', orderId)
        .order('version_number', { ascending: false });

      if (error) throw error;

      setVersions(data || []);
      
      // Находим активную версию
      const active = data?.find(v => v.is_active);
      setActiveVersion(active || null);
    } catch (error: any) {
      console.error('Error fetching content versions:', error);
      toast.error('Ошибка загрузки версий контента');
    } finally {
      setLoading(false);
    }
  };

  // Создание новой версии
  const createVersion = async (
    orderId: string,
    content: string,
    contentType: ContentVersion['content_type'],
    promptUsed?: string,
    aiModel: string = 'gpt-4.1-2025-04-14'
  ) => {
    if (!user || currentRole !== 'admin') {
      toast.error('Недостаточно прав');
      return null;
    }

    try {
      // Получаем номер следующей версии
      const { data: lastVersion } = await supabase
        .from('generated_content_versions')
        .select('version_number')
        .eq('order_id', orderId)
        .order('version_number', { ascending: false })
        .limit(1)
        .single();

      const nextVersion = (lastVersion?.version_number || 0) + 1;

      // Деактивируем все предыдущие версии
      await supabase
        .from('generated_content_versions')
        .update({ is_active: false })
        .eq('order_id', orderId);

      // Создаем новую версию
      const { data, error } = await supabase
        .from('generated_content_versions')
        .insert({
          order_id: orderId,
          version_number: nextVersion,
          content,
          content_type: contentType,
          prompt_used: promptUsed,
          ai_model: aiModel,
          is_active: true,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast.success(`Создана версия ${nextVersion}`);
      await fetchVersions();
      return data;
    } catch (error: any) {
      console.error('Error creating content version:', error);
      toast.error('Ошибка создания версии');
      return null;
    }
  };

  // Активация определенной версии
  const activateVersion = async (versionId: string) => {
    if (currentRole !== 'admin') {
      toast.error('Недостаточно прав');
      return;
    }

    try {
      const version = versions.find(v => v.id === versionId);
      if (!version) return;

      // Деактивируем все версии для этого заказа
      await supabase
        .from('generated_content_versions')
        .update({ is_active: false })
        .eq('order_id', version.order_id);

      // Активируем выбранную версию
      const { error } = await supabase
        .from('generated_content_versions')
        .update({ is_active: true })
        .eq('id', versionId);

      if (error) throw error;

      toast.success(`Активирована версия ${version.version_number}`);
      await fetchVersions();
    } catch (error: any) {
      console.error('Error activating version:', error);
      toast.error('Ошибка активации версии');
    }
  };

  // Оценка качества версии
  const rateVersion = async (versionId: string, qualityScore: number) => {
    if (currentRole !== 'admin') {
      toast.error('Недостаточно прав');
      return;
    }

    try {
      const { error } = await supabase
        .from('generated_content_versions')
        .update({ quality_score: qualityScore })
        .eq('id', versionId);

      if (error) throw error;

      toast.success('Оценка сохранена');
      await fetchVersions();
    } catch (error: any) {
      console.error('Error rating version:', error);
      toast.error('Ошибка сохранения оценки');
    }
  };

  // Удаление версии
  const deleteVersion = async (versionId: string) => {
    if (currentRole !== 'admin') {
      toast.error('Недостаточно прав');
      return;
    }

    try {
      const version = versions.find(v => v.id === versionId);
      if (!version) return;

      if (version.is_active && versions.length > 1) {
        toast.error('Нельзя удалить активную версию. Сначала активируйте другую.');
        return;
      }

      const { error } = await supabase
        .from('generated_content_versions')
        .delete()
        .eq('id', versionId);

      if (error) throw error;

      toast.success('Версия удалена');
      await fetchVersions();
    } catch (error: any) {
      console.error('Error deleting version:', error);
      toast.error('Ошибка удаления версии');
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchVersions();
    }
  }, [orderId]);

  return {
    versions,
    activeVersion,
    loading,
    fetchVersions,
    createVersion,
    activateVersion,
    rateVersion,
    deleteVersion
  };
}
