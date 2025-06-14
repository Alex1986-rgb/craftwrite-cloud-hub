
import { CheckCircle, Zap, Shield, Users, Target, Award, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Users,
    title: "30+ экспертов",
    description: "Только дипломированные SEO-копирайтеры для вашего проекта."
  },
  {
    icon: Shield,
    title: "Антиплагиат Text.ru",
    description: "Бесплатно предоставляем ссылки на проверки для каждой статьи."
  },
  {
    icon: Award,
    title: "Многолетний опыт",
    description: "Средний стаж наших специалистов — 5+ лет в нише SEO-копирайтинга."
  },
  {
    icon: Zap,
    title: "Сроки от 24ч",
    description: "Оперативная работа: от одного дня без компромиссов по качеству."
  },
  {
    icon: Target,
    title: "Глубокая SEO-оптимизация",
    description: "Работа по ключам клиента, тематический LSI и выдача технических отчетов."
  },
  {
    icon: CheckCircle,
    title: "Гарантия правок",
    description: "Правки и корректировки по пожеланию в течение 7 дней после сдачи."
  }
];

const BenefitsSection = () => (
  <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
    </div>

    <div className="container max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary/20">
          <ExternalLink className="w-4 h-4" />
          Почему нам доверяют заказчики
        </div>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Профессионализм & Прозрачность
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Каждая статья нашего сервиса сопровождается отчетом по уникальности на Text.ru. <b>Без компромиссов — только экспертный SEO-контент под ключ.</b>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={benefit.title} className="group hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Trust counters */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 border border-primary/20">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">2000+</div>
            <div className="text-sm text-muted-foreground">Выполненных заказов</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-sm text-muted-foreground">Уникальность статей</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">24ч</div>
            <div className="text-sm text-muted-foreground">Средний срок сдачи</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-600">30+</div>
            <div className="text-sm text-muted-foreground">Экспертов в штате</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground/75 text-right mt-2">Официальные ссылки на проверки доступны по вашему заказу</div>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
