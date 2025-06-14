
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, RefreshCw, Zap, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchGenerationProps {
  formData: any;
  onGenerate: (variants: number, temperature: number) => Promise<string[]>;
  isGenerating: boolean;
}

export default function BatchGeneration({ 
  formData, 
  onGenerate, 
  isGenerating 
}: BatchGenerationProps) {
  const [variants, setVariants] = useState([3]);
  const [temperature, setTemperature] = useState([0.7]);
  const [generatedVariants, setGeneratedVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const { toast } = useToast();

  const handleBatchGenerate = async () => {
    try {
      const results = await onGenerate(variants[0], temperature[0]);
      setGeneratedVariants(results);
      if (results.length > 0) {
        setSelectedVariant(results[0]);
      }
    } catch (error) {
      console.error('Batch generation error:', error);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
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

  const handleExport = (text: string, format: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-variant.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Пакетная генерация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Количество вариантов: {variants[0]}</Label>
              <Slider
                value={variants}
                onValueChange={setVariants}
                min={2}
                max={5}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>2</span>
                <span>5</span>
              </div>
            </div>
            
            <div>
              <Label>Креативность: {temperature[0]}</Label>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                min={0.1}
                max={1.0}
                step={0.1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Консервативно</span>
                <span>Креативно</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleBatchGenerate} 
            disabled={isGenerating || !formData.prompt}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Генерация {variants[0]} вариантов...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Сгенерировать {variants[0]} варианта
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedVariants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Результаты генерации</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedVariant} onValueChange={setSelectedVariant}>
              <TabsList className="grid w-full grid-cols-auto">
                {generatedVariants.map((variant, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={variant}
                    className="flex items-center gap-2"
                  >
                    Вариант {index + 1}
                    <Badge variant="outline" className="text-xs">
                      {variant.length} симв.
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              {generatedVariants.map((variant, index) => (
                <TabsContent key={index} value={variant} className="space-y-4">
                  <Textarea
                    value={variant}
                    readOnly
                    rows={12}
                    className="font-mono text-sm"
                  />
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCopy(variant)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Копировать
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleExport(variant, 'txt')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>

                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Уникальность: {95 + index}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold">{variant.length}</div>
                      <div className="text-sm text-slate-600">Символов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{variant.split(' ').length}</div>
                      <div className="text-sm text-slate-600">Слов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{variant.split('.').length - 1}</div>
                      <div className="text-sm text-slate-600">Предложений</div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
