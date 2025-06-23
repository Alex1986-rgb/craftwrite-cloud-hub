
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface ProjectFile {
  id: string;
  order_id: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  uploaded_by?: string;
  created_at: string;
}

export function useProjectFiles(orderId?: string) {
  const { user } = useUnifiedAuth();
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    if (!orderId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast.error('Ошибка загрузки файлов');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!orderId || !user) return;

    setUploading(true);
    try {
      // Здесь будет логика загрузки файла в Supabase Storage
      // Пока используем mock URL
      const fileUrl = `https://example.com/files/${file.name}`;

      const { data, error } = await supabase
        .from('project_files')
        .insert({
          order_id: orderId,
          file_name: file.name,
          file_url: fileUrl,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Файл успешно загружен');
      await fetchFiles();
      return data;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error('Ошибка загрузки файла');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('project_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      toast.success('Файл удален');
      await fetchFiles();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error('Ошибка удаления файла');
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchFiles();
    }
  }, [orderId]);

  return {
    files,
    loading,
    uploading,
    fetchFiles,
    uploadFile,
    deleteFile
  };
}
