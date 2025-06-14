
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Bot, Zap, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface GenerationProgressProps {
  isGenerating: boolean;
  error: string | null;
  onRetry?: () => void;
  onCancel?: () => void;
}

export default function GenerationProgress({ 
  isGenerating, 
  error, 
  onRetry,
  onCancel 
}: GenerationProgressProps) {
  if (!isGenerating && !error) {
    return null;
  }

  return (
    <Card className={`transition-all duration-300 ${
      error ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'
    }`}>
      <CardContent className="p-4">
        {isGenerating && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="w-5 h-5 text-blue-600 animate-pulse" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Генерация текста</h4>
                <p className="text-sm text-blue-700">
                  AI создает уникальный контент по вашим параметрам...
                </p>
              </div>
              <LoadingSpinner className="text-blue-600" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-blue-600">
                <span>Обработка запроса</span>
                <span>~30-60 сек</span>
              </div>
              <Progress value={undefined} className="h-2" />
            </div>

            {onCancel && (
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  className="text-blue-600 border-blue-200 hover:bg-blue-100"
                >
                  Отменить
                </Button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-red-900">Ошибка генерации</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>

            {onRetry && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="text-red-600 border-red-200 hover:bg-red-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Попробовать снова
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
