
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Sparkles, Copy, Wand2, Brain } from 'lucide-react';
import { useSecureAIGeneration } from '@/hooks/useSecureAIGeneration';

export default function AIPromptGenerator() {
  const [serviceType, setServiceType] = useState('seo-article');
  const [customPrompt, setCustomPrompt] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('профессиональный');
  const [length, setLength] = useState(5000);
  const [keywords, setKeywords] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  const { generateText, loading, generatedText } = useSecureAIGeneration();

  const handleGenerate = async () => {
    if (!customPrompt.trim()) {
      toast.error('Введите текст промпта');
      return;
    }

    const keywordsList = keywords.split(',').map(k => k.trim()).filter(k => k);

    await generateText({
      prompt: customPrompt,
      service_type: serviceType,
      target_audience: targetAudience,
      tone,
      length,
      keywords: keywordsList,
      additional_requirements: additionalRequirements
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Скопировано в буфер обмена');
  };

  const generatePromptFromTemplate = async () => {
    try {
      const { data: template } = await supabase
        .from('prompt_templates')
        .select('prompt_template')
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .single();

      if (template) {
        setCustomPrompt(template.prompt_template);
        toast.success('Шаблон загружен');
      }
    } catch (error) {
      toast.error('Ошибка загрузки шаблона');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AI Генератор промптов</h2>
        <p className="text-slate-600">Создавайте качественный контент с помощью ИИ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Форма настроек */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Настройки генерации
            </CardTitle>
            <CardDescription>
              Настройте параметры для генерации контента
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Тип услуги</label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seo-article">SEO-статья</SelectItem>
                  <SelectItem value="landing">Лендинг</SelectItem>
                  <SelectItem value="email">Email-рассылка</SelectItem>
                  <SelectItem value="social">SMM-контент</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Тон</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="профессиональный">Профессиональный</SelectItem>
                    <SelectItem value="дружелюбный">Дружелюбный</SelectItem>
                    <SelectItem value="официальный">Официальный</SelectItem>
                    <SelectItem value="продающий">Продающий</SelectItem>
                    <SelectItem value="экспертный">Экспертный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Объем (символов)</label>
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  min="1000"
                  max="20000"
                  step="500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Целевая аудитория</label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Например: предприниматели, родители, студенты"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ключевые слова</label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Через запятую"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Дополнительные требования</label>
              <Textarea
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Специальные требования к тексту"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={generatePromptFromTemplate} variant="outline" size="sm">
                <Wand2 className="w-4 h-4 mr-2" />
                Загрузить шаблон
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Промпт и генерация */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Промпт и генерация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Промпт</label>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Введите ваш промпт или загрузите шаблон"
                rows={8}
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !customPrompt.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Генерирую...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Сгенерировать текст
                </>
              )}
            </Button>

            {generatedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Сгенерированный текст</Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(generatedText)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Копировать
                  </Button>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700">
                    {generatedText}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
