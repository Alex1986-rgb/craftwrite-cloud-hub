
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Star, Clock } from "lucide-react";

interface QuickPreset {
  id: string;
  name: string;
  icon: any;
  description: string;
  settings: any;
  popular: boolean;
  category: string;
}

interface QuickPresetsProps {
  onApplyPreset: (preset: any) => void;
}

export default function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  const quickPresets: QuickPreset[] = [
    {
      id: "quick-seo",
      name: "Быстрое SEO",
      icon: TrendingUp,
      description: "SEO-оптимизированная статья за 5 минут",
      settings: {
        textType: "seo-article",
        length: [2500],
        tone: "informative",
        audience: "general",
        keywords: "",
        includeEmoji: false,
        includeCTA: false,
        seoOptimized: true
      },
      popular: true,
      category: "seo"
    },
    {
      id: "quick-landing",
      name: "Продающий лендинг",
      icon: Zap,
      description: "Конверсионная страница для продаж",
      settings: {
        textType: "landing",
        length: [1500],
        tone: "persuasive",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      popular: true,
      category: "landing"
    },
    {
      id: "quick-social",
      name: "Вирусный пост",
      icon: Star,
      description: "Контент для социальных сетей",
      settings: {
        textType: "social",
        length: [300],
        tone: "casual",
        audience: "general",
        keywords: "",
        includeEmoji: true,
        includeCTA: false,
        seoOptimized: false
      },
      popular: true,
      category: "social"
    },
    {
      id: "quick-email",
      name: "Email-рассылка",
      icon: Clock,
      description: "Эффективное письмо для подписчиков",
      settings: {
        textType: "email",
        length: [800],
        tone: "friendly",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: false
      },
      popular: false,
      category: "email"
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold">Быстрые пресеты</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => onApplyPreset(preset)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <preset.icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium truncate">{preset.name}</h4>
                    {preset.popular && (
                      <Badge className="text-xs bg-orange-100 text-orange-800">
                        Популярный
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{preset.description}</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {preset.settings.length[0]} символов
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {preset.settings.tone}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
