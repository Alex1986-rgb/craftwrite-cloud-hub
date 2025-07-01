
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FormProgressProps {
  formData: any;
  onRestore: (data: any) => void;
}

const STORAGE_KEY = 'chatbot-order-draft';

export default function FormProgress({ formData, onRestore }: FormProgressProps) {
  const [hasSavedData, setHasSavedData] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    // Check for existing saved data on mount
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setHasSavedData(true);
    }
  }, []);

  useEffect(() => {
    // Auto-save form data every 30 seconds
    const saveInterval = setInterval(() => {
      if (formData && Object.keys(formData).length > 0) {
        saveFormData();
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [formData]);

  const saveFormData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...formData,
        savedAt: new Date().toISOString()
      }));
      setLastSaved(new Date());
      setHasSavedData(true);
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  };

  const restoreFormData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        onRestore(parsed);
        toast.success('Данные формы восстановлены');
      }
    } catch (error) {
      console.error('Failed to restore form data:', error);
      toast.error('Ошибка при восстановлении данных');
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedData(false);
    setLastSaved(null);
    toast.success('Сохраненные данные очищены');
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Save className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {lastSaved ? `Сохранено: ${lastSaved.toLocaleTimeString()}` : 'Автосохранение'}
          </span>
        </div>
        
        {hasSavedData && (
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            Есть черновик
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={saveFormData}
          className="text-xs"
        >
          <Save className="w-3 h-3 mr-1" />
          Сохранить
        </Button>
        
        {hasSavedData && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={restoreFormData}
            className="text-xs"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Восстановить
          </Button>
        )}
      </div>
    </div>
  );
}
