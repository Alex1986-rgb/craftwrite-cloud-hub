
import { Shield, FileCheck, ExternalLink, CheckCircle, Globe, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TrustSection = () => {
  const trustFactors = [
    {
      icon: FileCheck,
      title: "100% уникальность",
      description: "Проверка на Text.ru, Advego, Etxt",
      features: ["Оригинальность 95-100%", "Ссылки на проверки", "Гарантия уникальности"]
    },
    {
      icon: Shield,
      title: "Контроль качества",
      description: "Многоуровневая проверка текстов",
      features: ["Редакторская правка", "SEO-анализ", "Финальная вычитка"]
    },
    {
      icon: Globe,
      title: "SEO-оптимизация",
      description: "Профессиональная работа с запросами",
      features: ["Анализ конкурентов", "LSI-слова", "Техническое ТЗ"]
    }
  ];

  return (
    <section className="py-16 bg-muted/40">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-200">
            <Shield className="w-4 h-4" />
            Гарантии качества
          </div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Доверительная система контроля
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Каждый текст проходит строгую проверку на уникальность, качество и соответствие ТЗ. 
            Мы предоставляем полную отчетность по всем этапам работы.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {trustFactors.map((factor, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border-primary/10">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <factor.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{factor.title}</h3>
                <p className="text-muted-foreground mb-4">{factor.description}</p>
                <ul className="space-y-2">
                  {factor.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Блок с примерами проверок */}
        <div className="bg-card rounded-2xl p-8 shadow-xl border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-playfair font-bold mb-4">Прозрачность и доверие</h3>
            <p className="text-muted-foreground">
              Мы предоставляем ссылки на все проверки и отчеты по каждому заказу
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Что вы получаете с каждым заказом:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Ссылка на проверку уникальности в Text.ru</span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Отчет о SEO-анализе и ключевых словах</span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Справка о редакторской проверке</span>
                </li>
                <li className="flex items-start gap-3">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>Гарантийное письмо на 30 дней</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
              <h4 className="font-semibold text-lg mb-4 text-center">Пример отчета</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-card rounded-lg">
                  <span>Уникальность Text.ru:</span>
                  <span className="font-bold text-green-600">98.7%</span>
                </div>
                <div className="flex justify-between p-3 bg-card rounded-lg">
                  <span>SEO-анализ:</span>
                  <span className="font-bold text-blue-600">9.2/10</span>
                </div>
                <div className="flex justify-between p-3 bg-card rounded-lg">
                  <span>Вхождения ключей:</span>
                  <span className="font-bold text-purple-600">Оптимально</span>
                </div>
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Посмотреть пример отчета
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
