
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Wand2, Download, Copy, RefreshCw, CheckCircle } from "lucide-react";

export default function AITextGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [textType, setTextType] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Симуляция генерации текста
    setTimeout(() => {
      setGeneratedText(`Это сгенерированный AI текст на основе промпта: "${prompt}". 

Данный текст создан с учетом всех SEO-требований и оптимизирован для максимальной конверсии. Уникальность составляет 95%, что превышает требуемый минимум в 85%.

Ключевые особенности текста:
- Оптимизация под целевые ключевые слова
- Естественная интеграция призывов к действию
- Соответствие требованиям поисковых систем
- Высокая читабельность и вовлеченность

Текст готов к использованию и может быть экспортирован в любом из доступных форматов.`);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Генератор текстов</h1>
          <p className="text-slate-600">Создание профессиональных текстов с помощью искусственного интеллекта</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Bot className="w-4 h-4 mr-2" />
          GPT-4 Turbo
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Настройки генерации */}
        <Card>
          <CardHeader>
            <CardTitle>Параметры генерации</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Тип текста</label>
              <Select value={textType} onValueChange={setTextType}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип текста" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seo-article">SEO-статья</SelectItem>
                  <SelectItem value="landing">Лендинг</SelectItem>
                  <SelectItem value="email">Email-рассылка</SelectItem>
                  <SelectItem value="social">Соцсети</SelectItem>
                  <SelectItem value="product">Описание товара</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Описание задачи</label>
              <Textarea
                placeholder="Опишите, какой текст нужно создать. Укажите тему, целевую аудиторию, ключевые слова..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Объем (знаков)</label>
                <Input type="number" placeholder="3000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Тон</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="formal">Официальный</SelectItem>
                    <SelectItem value="casual">Неформальный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Сгенерировать текст
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Результат */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Сгенерированный текст</CardTitle>
              {generatedText && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Уникальность: 95%
                </Badge>
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
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    HTML
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Bot className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Здесь появится сгенерированный текст</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
