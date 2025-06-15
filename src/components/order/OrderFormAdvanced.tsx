import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Globe, Zap, Plus } from "lucide-react";

interface OrderFormAdvancedProps {
  additionalServices: string[];
  onAdditionalServicesChange: (services: string[]) => void;
  targetAudience: string;
  onTargetAudienceChange: (audience: string) => void;
  seoKeywords: string;
  onSeoKeywordsChange: (keywords: string) => void;
  preferredStyle: string;
  onPreferredStyleChange: (style: string) => void;
  additionalRequirements: string;
  onAdditionalRequirementsChange: (requirements: string) => void;
  variant?: 'public' | 'client';
}

const additionalServiceOptions = [
  { id: "seo-optimization", label: "SEO-оптимизация", price: 2000, icon: Target },
  { id: "urgency", label: "Срочное выполнение", price: 3000, icon: Zap },
  { id: "multiple-variants", label: "Несколько вариантов", price: 1500, icon: Plus },
  { id: "consultation", label: "Консультация специалиста", price: 1000, icon: Sparkles },
  { id: "localization", label: "Локализация", price: 2500, icon: Globe },
];

const styleOptions = [
  "Деловой",
  "Дружелюбный", 
  "Экспертный",
  "Продающий",
  "Информационный",
  "Креативный",
  "Минималистичный",
  "Эмоциональный"
];

export default function OrderFormAdvanced({
  additionalServices,
  onAdditionalServicesChange,
  targetAudience,
  onTargetAudienceChange,
  seoKeywords,
  onSeoKeywordsChange,
  preferredStyle,
  onPreferredStyleChange,
  additionalRequirements,
  onAdditionalRequirementsChange,
  variant = 'public'
}: OrderFormAdvancedProps) {
  const handleServiceToggle = (serviceId: string) => {
    const updated = additionalServices.includes(serviceId)
      ? additionalServices.filter(id => id !== serviceId)
      : [...additionalServices, serviceId];
    onAdditionalServicesChange(updated);
  };

  const calculateAdditionalCost = () => {
    return additionalServices.reduce((total, serviceId) => {
      const service = additionalServiceOptions.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Дополнительные параметры
      </h3>

      {/* Additional Services */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Дополнительные услуги
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalServiceOptions.map((service) => {
            const Icon = service.icon;
            const isSelected = additionalServices.includes(service.id);
            
            return (
              <div key={service.id} className="relative">
                <Label
                  htmlFor={service.id}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-slate-200 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={service.id}
                      checked={isSelected}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-slate-500"}`} />
                        <span className="font-medium">{service.label}</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        +{service.price.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            );
          })}
        </div>

        {additionalServices.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Доплата за доп. услуги:</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                +{calculateAdditionalCost().toLocaleString()} ₽
              </Badge>
            </div>
          </div>
        )}
      </Card>

      {/* Target Audience */}
      <div className="space-y-2">
        <Label htmlFor="target-audience" className="text-sm font-medium">
          Целевая аудитория
        </Label>
        <Input
          id="target-audience"
          value={targetAudience}
          onChange={(e) => onTargetAudienceChange(e.target.value)}
          placeholder="Например: предприниматели 25-45 лет, интересующиеся IT"
          className="w-full"
        />
        <p className="text-xs text-slate-500">
          Опишите вашу целевую аудиторию для более точного позиционирования
        </p>
      </div>

      {/* SEO Keywords */}
      <div className="space-y-2">
        <Label htmlFor="seo-keywords" className="text-sm font-medium">
          Ключевые слова для SEO
        </Label>
        <Textarea
          id="seo-keywords"
          value={seoKeywords}
          onChange={(e) => onSeoKeywordsChange(e.target.value)}
          placeholder="копирайтинг, контент-маркетинг, тексты для сайта"
          rows={3}
          className="w-full"
        />
        <p className="text-xs text-slate-500">
          Укажите ключевые слова через запятую (если требуется SEO-оптимизация)
        </p>
      </div>

      {/* Preferred Style */}
      <div className="space-y-2">
        <Label htmlFor="preferred-style" className="text-sm font-medium">
          Предпочитаемый стиль изложения
        </Label>
        <Select value={preferredStyle} onValueChange={onPreferredStyleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите стиль" />
          </SelectTrigger>
          <SelectContent>
            {styleOptions.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Additional Requirements */}
      <div className="space-y-2">
        <Label htmlFor="additional-requirements" className="text-sm font-medium">
          Дополнительные требования
        </Label>
        <Textarea
          id="additional-requirements"
          value={additionalRequirements}
          onChange={(e) => onAdditionalRequirementsChange(e.target.value)}
          placeholder="Любые особые пожелания, требования к структуре, примеры..."
          rows={4}
          className="w-full"
        />
      </div>
    </div>
  );
}
