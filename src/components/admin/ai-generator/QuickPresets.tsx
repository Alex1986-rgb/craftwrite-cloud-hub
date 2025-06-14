
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Star, Clock, Target, Building2, Heart, Lightbulb, MessageSquare } from "lucide-react";

interface QuickPreset {
  id: string;
  name: string;
  icon: any;
  description: string;
  settings: any;
  popular: boolean;
  category: string;
  color: string;
}

interface QuickPresetsProps {
  onApplyPreset: (preset: any) => void;
}

export default function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  const quickPresets: QuickPreset[] = [
    {
      id: "ultra-quick-seo",
      name: "⚡ Быстрое SEO",
      icon: TrendingUp,
      description: "SEO-статья за 3 минуты с автооптимизацией",
      settings: {
        textType: "seo-article",
        length: [2000],
        tone: "informative",
        audience: "general",
        keywords: "",
        includeEmoji: false,
        includeCTA: false,
        seoOptimized: true
      },
      popular: true,
      category: "seo",
      color: "green"
    },
    {
      id: "viral-social",
      name: "🔥 Вирусный пост",
      icon: Star,
      description: "Контент для максимального охвата в соцсетях",
      settings: {
        textType: "social",
        length: [280],
        tone: "casual",
        audience: "general",
        keywords: "",
        includeEmoji: true,
        includeCTA: false,
        seoOptimized: false
      },
      popular: true,
      category: "social",
      color: "purple"
    },
    {
      id: "conversion-beast",
      name: "💰 Продающий лендинг",
      icon: Zap,
      description: "Максимальная конверсия для продаж",
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
      category: "landing",
      color: "orange"
    },
    {
      id: "email-magnet",
      name: "📧 Email-магнит",
      icon: MessageSquare,
      description: "Письмо с высоким откликом",
      settings: {
        textType: "email",
        length: [600],
        tone: "friendly",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: false
      },
      popular: false,
      category: "email",
      color: "blue"
    },
    {
      id: "b2b-professional",
      name: "🏢 B2B Профи",
      icon: Building2,
      description: "Серьезный контент для бизнеса",
      settings: {
        textType: "blog",
        length: [2000],
        tone: "professional",
        audience: "b2b",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      popular: false,
      category: "business",
      color: "slate"
    },
    {
      id: "lifestyle-warm",
      name: "💖 Lifestyle теплый",
      icon: Heart,
      description: "Душевный контент для образа жизни",
      settings: {
        textType: "blog",
        length: [1200],
        tone: "warm",
        audience: "general",
        keywords: "",
        includeEmoji: true,
        includeCTA: false,
        seoOptimized: false
      },
      popular: false,
      category: "lifestyle",
      color: "pink"
    },
    {
      id: "startup-pitch",
      name: "🚀 Стартап питч",
      icon: Lightbulb,
      description: "Презентация идеи для инвесторов",
      settings: {
        textType: "presentation",
        length: [800],
        tone: "inspiring",
        audience: "investors",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: false
      },
      popular: false,
      category: "business",
      color: "indigo"
    },
    {
      id: "ecommerce-product",
      name: "🛍️ Товар E-com",
      icon: Target,
      description: "Описание товара для интернет-магазина",
      settings: {
        textType: "product",
        length: [500],
        tone: "persuasive",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      popular: true,
      category: "ecommerce",
      color: "emerald"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      slate: "bg-slate-50 border-slate-200 text-slate-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 border-gray-200 text-gray-800";
  };

  const getBadgeColor = (color: string) => {
    const colorMap = {
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
      blue: "bg-blue-100 text-blue-800",
      slate: "bg-slate-100 text-slate-800",
      pink: "bg-pink-100 text-pink-800",
      indigo: "bg-indigo-100 text-indigo-800",
      emerald: "bg-emerald-100 text-emerald-800"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="text-xl font-semibold">Быстрые пресеты</h3>
          <Badge className="bg-orange-100 text-orange-800">
            Мгновенный старт
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickPresets.map((preset) => (
            <Card
              key={preset.id}
              className={`transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer border-2 ${getColorClasses(preset.color)}`}
              onClick={() => onApplyPreset(preset)}
            >
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center">
                    <div className={`p-3 rounded-full ${getBadgeColor(preset.color)}`}>
                      <preset.icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{preset.name}</h4>
                    <p className="text-xs opacity-80 leading-relaxed">{preset.description}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs opacity-70">
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {preset.settings.length[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {preset.settings.tone}
                    </div>
                  </div>

                  {preset.popular && (
                    <Badge className="text-xs bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Популярный
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Совет</span>
          </div>
          <p className="text-xs text-purple-700 leading-relaxed">
            Быстрые пресеты — это ваш путь к мгновенному созданию качественного контента. 
            Каждый пресет настроен профессионалами для максимальной эффективности в своей нише.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
