
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, FileText, Mail, MessageSquare, Users } from "lucide-react";
import TabNavigation from "./ai-generator/TabNavigation";

export default function AITextGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [formData, setFormData] = useState({
    prompt: "",
    textType: "",
    length: [3000],
    tone: "",
    audience: "",
    keywords: "",
    language: "russian",
    includeEmoji: false,
    includeCTA: true,
    seoOptimized: true
  });

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

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedText(`Это профессиональный AI-текст типа "${contentTypes.find(t => t.value === formData.textType)?.label || 'текст'}" на основе промпта: "${formData.prompt}".

Параметры генерации:
- Длина: ${formData.length[0]} символов
- Тон: ${toneOptions.find(t => t.value === formData.tone)?.label || 'не указан'}
- Аудитория: ${audienceOptions.find(a => a.value === formData.audience)?.label || 'не указана'}
- Ключевые слова: ${formData.keywords || 'не указаны'}

Данный текст создан с учетом всех SEO-требований и оптимизирован для максимальной конверсии. Уникальность составляет 95%, что превышает требуемый минимум в 85%.

Ключевые особенности текста:
- Оптимизация под целевые ключевые слова
- Естественная интеграция призывов к действию
- Соответствие требованиям поисковых систем
- Высокая читабельность и вовлеченность
- Адаптация под целевую аудиторию

${formData.includeCTA ? 'Призыв к действию: Закажите профессиональный копирайтинг прямо сейчас!' : ''}

Текст готов к использованию и может быть экспортирован в любом из доступных форматов.`);
      setIsGenerating(false);
    }, 3000);
  };

  const handleApplyTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      textType: template.settings.textType,
      length: [template.settings.length],
      tone: template.settings.tone,
      audience: template.settings.audience,
      seoOptimized: template.settings.seoOptimized,
      includeCTA: template.settings.includeCTA,
      prompt: template.prompt
    }));
  };

  const handleApplyPreset = (preset: any) => {
    setFormData(prev => ({
      ...prev,
      ...preset.settings
    }));
  };

  const handleSavePreset = (preset: any) => {
    console.log('Saving preset:', preset);
  };

  const handleSelectPrompt = (prompt: string) => {
    setFormData(prev => ({
      ...prev,
      prompt: prompt
    }));
  };

  const selectedContentType = contentTypes.find(type => type.value === formData.textType);

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

      <TabNavigation
        formData={formData}
        setFormData={setFormData}
        generatedText={generatedText}
        setGeneratedText={setGeneratedText}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        onApplyTemplate={handleApplyTemplate}
        onApplyPreset={handleApplyPreset}
        onSavePreset={handleSavePreset}
        onSelectPrompt={handleSelectPrompt}
        selectedContentType={selectedContentType}
      />
    </div>
  );
}
