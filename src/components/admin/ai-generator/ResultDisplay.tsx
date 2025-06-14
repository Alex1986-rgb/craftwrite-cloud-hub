
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Bot, CheckCircle, Copy, Download, RefreshCw } from "lucide-react";
import SaveResultDialog from "./SaveResultDialog";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  generatedText: string;
  setGeneratedText: (text: string) => void;
  selectedContentType?: {
    value: string;
    label: string;
    icon: any;
    description: string;
  };
  formData?: {
    tone: string;
    audience: string;
    keywords: string;
  };
  onSaveResult?: (title: string) => void;
  onRegenerate?: () => void;
}

export default function ResultDisplay({ 
  generatedText, 
  setGeneratedText, 
  selectedContentType,
  formData,
  onSaveResult,
  onRegenerate
}: ResultDisplayProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Скопировано",
        description: "Текст скопирован в буфер обмена"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать текст",
        variant: "destructive"
      });
    }
  };

  const handleExport = (format: string) => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-text.${format === 'txt' ? 'txt' : format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Экспорт завершен",
      description: `Файл сохранен в формате ${format.toUpperCase()}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Сгенерированный текст</CardTitle>
          {generatedText && (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Уникальность: 95%
              </Badge>
              {selectedContentType && (
                <Badge variant="outline">
                  <selectedContentType.icon className="w-4 h-4 mr-1" />
                  {selectedContentType.label}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {generatedText ? (
          <div className="space-y-4">
            <Textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Копировать
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => handleExport('txt')}>
                <Download className="w-4 h-4 mr-2" />
                TXT
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => handleExport('html')}>
                <Download className="w-4 h-4 mr-2" />
                HTML
              </Button>
              
              {onRegenerate && (
                <Button variant="outline" size="sm" onClick={onRegenerate}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Перегенерировать
                </Button>
              )}

              {onSaveResult && formData && (
                <SaveResultDialog
                  generatedText={generatedText}
                  contentType={selectedContentType?.label || 'Неизвестный тип'}
                  parameters={formData}
                  onSave={onSaveResult}
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.length}</div>
                <div className="text-sm text-slate-600">Символов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.split(' ').length}</div>
                <div className="text-sm text-slate-600">Слов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.split('.').length - 1}</div>
                <div className="text-sm text-slate-600">Предложений</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <Bot className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">Готов к генерации</p>
            <p className="text-sm">Заполните параметры и нажмите "Сгенерировать текст"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
