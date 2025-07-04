import React, { useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle, TrendingUp, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ModernSeoSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const highlights = [
    {
      icon: Users,
      title: "50+ экспертов",
      description: "Дипломированные копирайтеры с опытом 5+ лет"
    },
    {
      icon: CheckCircle,
      title: "100% уникальность",
      description: "Проверка по Text.ru с официальными отчетами"
    },
    {
      icon: Clock,
      title: "От 24 часов",
      description: "Экспресс-доставка без потери качества"
    },
    {
      icon: TrendingUp,
      title: "40-180% рост",
      description: "Увеличение конверсии у наших клиентов"
    }
  ];

  const results = [
    "Рост органического трафика на 120-300% за 6 месяцев",
    "Увеличение конверсии лендингов на 40-180%",
    "ROI контент-маркетинга 300-800%",
    "Более 2000 успешных проектов"
  ];

  const services = [
    "SEO-статьи и органическое продвижение",
    "Продающие лендинги и email-воронки",
    "Контент для соцсетей и мессенджеров",
    "Описания товаров для маркетплейсов",
    "Корпоративный и B2B контент"
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            CopyPro Cloud — экспертные тексты под ваши задачи
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ведущая платформа профессионального копирайтинга в России и СНГ
          </p>
        </div>

        {/* Key highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Services */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Полная экосистема контент-маркетинга
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Результаты наших клиентов
              </h3>
              <ul className="space-y-3">
                {results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{result}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Expandable detailed content */}
        <div className="mt-12">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mx-auto flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                Скрыть подробности
                <ArrowUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Подробнее о компании
                <ArrowDown className="w-4 h-4" />
              </>
            )}
          </Button>

          {isExpanded && (
            <div className="mt-8 p-8 bg-white rounded-lg shadow-sm border">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  CopyPro Cloud — это команда профессионалов, которая создает тексты, приносящие результат. 
                  Мы специализируемся на всех видах коммерческого контента: от SEO-статей до продающих лендингов.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Наши ключевые преимущества:</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                  <li>Команда из 50+ дипломированных SEO-копирайтеров с опытом 5+ лет</li>
                  <li>Гарантия 100% уникальности по Text.ru с официальными отчетами</li>
                  <li>Экспресс-доставка от 24 часов с сохранением качества</li>
                  <li>Глубокая SEO-оптимизация с анализом ТОП-10 конкурентов</li>
                  <li>Более 2000 успешных проектов с ростом конверсии клиентов на 40-180%</li>
                </ul>

                <p className="text-slate-700 leading-relaxed">
                  Закажите профессиональный копирайтинг на CopyPro Cloud и получите контент, 
                  который не только привлекает внимание, но и конвертирует посетителей в клиентов!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModernSeoSection;