
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Wand2, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BulkTextGenerator() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [textTypes, setTextTypes] = useState<string[]>([]);
  const [generationSettings, setGenerationSettings] = useState({
    language: "ru",
    characterCount: "3000-7000",
    uniqueness: "90%+",
    useTemplate: true,
    useSynonymization: true,
    includeLSI: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationResults, setGenerationResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('product_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Here you would parse CSV/Excel file
      // For now, just showing a toast
      toast({
        title: "Файл загружен",
        description: `Обработан файл: ${file.name}`
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать файл",
        variant: "destructive"
      });
    }
  };

  const startGeneration = async () => {
    if (selectedProducts.length === 0 || textTypes.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите товары и типы текстов",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGenerationResults([]);

    try {
      const totalTasks = selectedProducts.length * textTypes.length;
      let completedTasks = 0;

      for (const productId of selectedProducts) {
        for (const textType of textTypes) {
          // Create generation task
          const { data: task, error: taskError } = await supabase
            .from('generation_logs')
            .insert({
              product_id: productId,
              text_type: textType,
              status: 'pending'
            })
            .select()
            .single();

          if (taskError) throw taskError;

          // Simulate text generation (replace with actual AI generation)
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Update progress
          completedTasks++;
          setProgress((completedTasks / totalTasks) * 100);

          // Mock generated text
          const generatedText = `Сгенерированный ${textType} текст для товара ${productId}...`;

          // Save generated text
          const { error: seoError } = await supabase
            .from('seo_texts')
            .insert({
              product_id: productId,
              type: textType,
              seo_text: generatedText,
              meta_title: `Мета-заголовок для ${textType}`,
              meta_description: `Мета-описание для ${textType}`,
              status: 'completed',
              language: generationSettings.language,
              character_count: generatedText.length
            });

          if (seoError) throw seoError;

          // Update task status
          await supabase
            .from('generation_logs')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString(),
              progress_percent: 100
            })
            .eq('id', task.id);

          setGenerationResults(prev => [...prev, {
            productId,
            textType,
            status: 'completed',
            text: generatedText
          }]);
        }
      }

      toast({
        title: "Генерация завершена",
        description: `Создано ${totalTasks} текстов`
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Ошибка генерации",
        description: "Произошла ошибка при генерации текстов",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportResults = () => {
    // Export logic here
    toast({
      title: "Экспорт",
      description: "Файл с результатами готов к скачиванию"
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Загрузка данных
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Загрузить CSV/Excel файл</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="mt-2"
              />
              <p className="text-sm text-slate-500 mt-1">
                Формат: URL, Название страницы, Категория, Тип текста
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Выбор товаров ({selectedProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedProducts([...selectedProducts, product.id]);
                    } else {
                      setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                    }
                  }}
                />
                <span className="text-sm">{product.page_title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Text Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Типы текстов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['seo', 'landing', 'description', 'technical', 'comparison'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={textTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTextTypes([...textTypes, type]);
                    } else {
                      setTextTypes(textTypes.filter(t => t !== type));
                    }
                  }}
                />
                <span className="text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Настройки генерации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label>Язык</Label>
              <Select 
                value={generationSettings.language} 
                onValueChange={(value) => setGenerationSettings({...generationSettings, language: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Объем текста</Label>
              <Select 
                value={generationSettings.characterCount} 
                onValueChange={(value) => setGenerationSettings({...generationSettings, characterCount: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-3000">1000-3000 символов</SelectItem>
                  <SelectItem value="3000-7000">3000-7000 символов</SelectItem>
                  <SelectItem value="7000+">7000+ символов</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Уникальность</Label>
              <Select 
                value={generationSettings.uniqueness} 
                onValueChange={(value) => setGenerationSettings({...generationSettings, uniqueness: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="80%+">80%+</SelectItem>
                  <SelectItem value="90%+">90%+</SelectItem>
                  <SelectItem value="95%+">95%+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={generationSettings.useTemplate}
                onCheckedChange={(checked) => setGenerationSettings({...generationSettings, useTemplate: checked as boolean})}
              />
              <span className="text-sm">Использовать шаблоны</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={generationSettings.useSynonymization}
                onCheckedChange={(checked) => setGenerationSettings({...generationSettings, useSynonymization: checked as boolean})}
              />
              <span className="text-sm">Синонимизация</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={generationSettings.includeLSI}
                onCheckedChange={(checked) => setGenerationSettings({...generationSettings, includeLSI: checked as boolean})}
              />
              <span className="text-sm">LSI-фразы</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Генерация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isGenerating && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Прогресс генерации</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={startGeneration} 
                disabled={isGenerating || selectedProducts.length === 0 || textTypes.length === 0}
                className="flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                {isGenerating ? "Генерация..." : "Начать генерацию"}
              </Button>

              {generationResults.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={exportResults}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Экспорт результатов
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {generationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Результаты генерации ({generationResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {generationResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {result.textType} - {result.productId}
                    </span>
                    <span className="text-sm text-green-600">{result.status}</span>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{result.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
