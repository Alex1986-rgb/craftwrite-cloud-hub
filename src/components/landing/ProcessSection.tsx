
import React, { useState } from "react";
import { Clock, UserCheck, FileText, Zap, CheckCircle, RefreshCw, Play, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "./process/ProcessSteps";
import { ProcessAdvantages } from "./process/ProcessAdvantages";

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      icon: UserCheck,
      title: "Анализ требований",
      description: "Детальное изучение ТЗ и подбор специалиста под тематику",
      time: "30 мин",
      details: "Анализируем целевую аудиторию, конкурентов и специфику ниши",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: FileText,
      title: "Создание текста",
      description: "Написание уникального контента с учетом SEO-требований",
      time: "1-3 дня",
      details: "Структурируем контент, прорабатываем LSI-ключи и эмоциональные триггеры",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: RefreshCw,
      title: "Проверка качества",
      description: "Редакторская правка, проверка уникальности и SEO-анализ",
      time: "2-4 часа",
      details: "Многоуровневая проверка: уникальность, читаемость, SEO-соответствие",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Zap,
      title: "Доставка результата",
      description: "Готовый текст с отчетами и гарантией качества",
      time: "Мгновенно",
      details: "Предоставляем файлы, отчеты по уникальности и SEO-рекомендации",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  const advantages = [
    { icon: Star, title: "Персональный менеджер", desc: "Курирует ваш заказ от начала до завершения" },
    { icon: CheckCircle, title: "Промежуточные отчеты", desc: "Уведомления о статусе на каждом этапе" },
    { icon: RefreshCw, title: "Возможность правок", desc: "Бесплатные доработки в течение 7 дней" }
  ];

  const playAnimation = () => {
    setIsPlaying(true);
    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
      }, index * 800);
    });
    
    setTimeout(() => {
      setActiveStep(null);
      setIsPlaying(false);
    }, steps.length * 800 + 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-green-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 text-lg mb-6 shadow-lg">
            <Clock className="w-5 h-5 mr-2" />
            Четкий процесс работы
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Как мы создаем идеальные тексты
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Отлаженный процесс с контролем на каждом этапе гарантирует высокое качество 
            и соблюдение всех требований к тексту
          </p>

          <Button 
            onClick={playAnimation}
            disabled={isPlaying}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? 'Демонстрация...' : 'Посмотреть процесс'}
          </Button>
        </div>

        <ProcessSteps
          steps={steps}
          activeStep={activeStep}
          isPlaying={isPlaying}
          onStepHover={setActiveStep}
          onStepLeave={() => setActiveStep(null)}
        />

        <ProcessAdvantages advantages={advantages} />
      </div>
    </section>
  );
};

export default ProcessSection;
