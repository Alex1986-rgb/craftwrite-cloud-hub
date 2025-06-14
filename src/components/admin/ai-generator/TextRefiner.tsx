
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, RefreshCw, ArrowRight, Undo2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextRefinerProps {
  initialText: string;
  onRefine: (text: string, instruction: string, preserveLength: boolean) => Promise<string>;
  isRefining: boolean;
}

interface RefineHistory {
  original: string;
  refined: string;
  instruction: string;
  timestamp: Date;
}

export default function TextRefiner({ 
  initialText, 
  onRefine, 
  isRefining 
}: TextRefinerProps) {
  const [currentText, setCurrentText] = useState(initialText);
  const [instruction, setInstruction] = useState('');
  const [preserveLength, setPreserveLength] = useState(true);
  const [history, setHistory] = useState<RefineHistory[]>([]);
  const { toast } = useToast();

  const quickInstructions = [
    'Сделай текст более убедительным и эмоциональным',
    'Упрости язык для лучшего понимания',
    'Добавь больше конкретных примеров',
    'Сделай текст более формальным и профессиональным',
    'Улучши SEO-оптимизацию и структуру',
    'Добавь больше призывов к действию'
  ];

  const handleRefine = async () => {
    if (!instruction.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите инструкцию для доработки",
        variant: "destructive"
      });
      return;
    }

    try {
      const refinedText = await onRefine(currentText, instruction, preserveLength);
      
      // Сохраняем в историю
      setHistory(prev => [{
        original: currentText,
        refined: refinedText,
        instruction,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]); // Храним последние 10 изменений

      setCurrentText(refinedText);
      setInstruction('');
      
      toast({
        title: "Текст улучшен",
        description: "Доработка успешно завершена"
      });
    } catch (error) {
      console.error('Refine error:', error);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastChange = history[0];
      setCurrentText(lastChange.original);
      setHistory(prev => prev.slice(1));
      
      toast({
        title: "Изменения отменены",
        description: "Возвращен предыдущий вариант текста"
      });
    }
  };

  const handleRestoreFromHistory = (historyItem: RefineHistory) => {
    setCurrentText(historyItem.refined);
    toast({
      title: "Вариант восстановлен",
      description: "Текст заменен на выбранный из истории"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-600" />
            Итеративная доработка
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Текущий текст</Label>
            <Textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              rows={8}
              className="mt-2"
            />
            <div className="text-xs text-slate-500 mt-1">
              {currentText.length} символов, {currentText.split(' ').length} слов
            </div>
          </div>

          <div>
            <Label>Инструкция по доработке</Label>
            <Textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Например: Сделай текст более убедительным и добавь больше эмоций"
              rows={3}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={preserveLength}
                onCheckedChange={setPreserveLength}
              />
              <Label className="text-sm">Сохранить длину текста</Label>
            </div>
            
            <div className="flex gap-2">
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                >
                  <Undo2 className="w-4 h-4 mr-2" />
                  Отменить
                </Button>
              )}
              
              <Button
                onClick={handleRefine}
                disabled={isRefining || !instruction.trim()}
              >
                {isRefining ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Дорабатываю...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Доработать
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-sm text-slate-600">Быстрые инструкции</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {quickInstructions.map((quickInstruction, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-left h-auto p-2 justify-start"
                  onClick={() => setInstruction(quickInstruction)}
                >
                  {quickInstruction}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">История изменений</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Изменение {history.length - index}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <strong>Инструкция:</strong> {item.instruction}
                  </div>
                  
                  <div className="text-xs text-slate-600">
                    {item.original.length} → {item.refined.length} символов
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreFromHistory(item)}
                  >
                    Восстановить этот вариант
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
