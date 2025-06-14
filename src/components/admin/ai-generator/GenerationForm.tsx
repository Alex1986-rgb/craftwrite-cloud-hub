
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Wand2, RefreshCw, FileText, Mail, MessageSquare, Users } from "lucide-react";

interface FormData {
  prompt: string;
  textType: string;
  length: number[];
  tone: string;
  audience: string;
  keywords: string;
  language: string;
  includeEmoji: boolean;
  includeCTA: boolean;
  seoOptimized: boolean;
}

interface GenerationFormProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function GenerationForm({ formData, setFormData, onGenerate, isGenerating }: GenerationFormProps) {
  const contentTypes = [
    { value: "seo-article", label: "SEO-статья", icon: FileText, description: "Статья для поискового продвижения" },
    { value: "landing", label: "Лендинг", icon: Users, description: "Продающая страница" },
    { value: "email", label: "Email-рассылка", icon: Mail, description: "Письмо для подписчиков" },
    { value: "social", label: "Соцсети", icon: MessageSquare, description: "Пост для социальных сетей" },
    { value: "product", label: "Описание товара", icon: FileText, description: "Коммерческое описание" },
    { value: "blog", label: "Блог-пост", icon: FileText, description: "Информационная статья" },
    { value: "press-release", label: "Пресс-релиз", icon: FileText, description: "Новостное сообщение" }
  ];

  const toneOptions = [
    { value: "professional", label: "Профессиональный" },
    { value: "friendly", label: "Дружелюбный" },
    { value: "formal", label: "Официальный" },
    { value: "casual", label: "Неформальный" },
    { value: "persuasive", label: "Убедительный" },
    { value: "informative", label: "Информативный" }
  ];

  const audienceOptions = [
    { value: "b2b", label: "B2B (бизнес)" },
    { value: "b2c", label: "B2C (потребители)" },
    { value: "experts", label: "Эксперты" },
    { value: "beginners", label: "Новички" },
    { value: "general", label: "Широкая аудитория" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Параметры генерации
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Тип контента */}
        <div>
          <label className="block text-sm font-medium mb-3">Тип контента</label>
          <div className="grid grid-cols-1 gap-2">
            {contentTypes.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.textType === type.value 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, textType: type.value }))}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <type.icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-slate-500">{type.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Описание задачи */}
        <div>
          <label className="block text-sm font-medium mb-2">Описание задачи</label>
          <Textarea
            placeholder="Опишите, какой текст нужно создать. Укажите тему, целевую аудиторию, ключевые слова..."
            value={formData.prompt}
            onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
            rows={4}
          />
        </div>

        {/* Ключевые слова */}
        <div>
          <label className="block text-sm font-medium mb-2">Ключевые слова</label>
          <Input
            placeholder="копирайтинг, SEO, контент-маркетинг"
            value={formData.keywords}
            onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
          />
        </div>

        {/* Длина текста */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Объем текста: {formData.length[0]} символов
          </label>
          <Slider
            value={formData.length}
            onValueChange={(value) => setFormData(prev => ({ ...prev, length: value }))}
            max={10000}
            min={500}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>500</span>
            <span>5000</span>
            <span>10000</span>
          </div>
        </div>

        {/* Тон и аудитория */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Тон</label>
            <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тон" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Аудитория</label>
            <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Целевая аудитория" />
              </SelectTrigger>
              <SelectContent>
                {audienceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Дополнительные настройки */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium text-sm">Дополнительные настройки</h4>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="seo-optimized" className="text-sm">SEO-оптимизация</Label>
            <Switch
              id="seo-optimized"
              checked={formData.seoOptimized}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, seoOptimized: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="include-cta" className="text-sm">Включить призыв к действию</Label>
            <Switch
              id="include-cta"
              checked={formData.includeCTA}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeCTA: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="include-emoji" className="text-sm">Использовать эмодзи</Label>
            <Switch
              id="include-emoji"
              checked={formData.includeEmoji}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeEmoji: checked }))}
            />
          </div>
        </div>

        <Button 
          onClick={onGenerate}
          disabled={isGenerating || !formData.prompt || !formData.textType}
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
  );
}
