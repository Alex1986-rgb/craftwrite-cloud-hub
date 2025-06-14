
import { TrendingUp, Users, Award, Shield, Zap, Star, CheckCircle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const InteractiveStatsSection = () => {
  const achievements = [
    {
      icon: Users,
      number: "30+",
      label: "Элитных экспертов",
      description: "Дипломированные специалисты с профильным образованием",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Гарантия уникальности", 
      description: "Проверка Text.ru с предоставлением официальных ссылок",
      color: "text-green-600",
      bgColor: "bg-green-50", 
      borderColor: "border-green-200"
    },
    {
      icon: Award,
      number: "2000+",
      label: "Реализованных проектов",
      description: "Успешно выполненных заказов за последний год",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Zap,
      number: "24ч",
      label: "Скорость выполнения",
      description: "От получения ТЗ до сдачи готового контента",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  const qualityFactors = [
    {
      icon: CheckCircle,
      title: "Многоуровневый контроль",
      description: "Каждый текст проходит 3 этапа проверки качества"
    },
    {
      icon: Globe,
      title: "SEO-оптимизация",
      description: "Профессиональная работа с ключевыми словами и LSI"
    },
    {
      icon: Star,
      title: "Персональный подход",
      description: "Индивидуальный менеджер для каждого проекта"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-primary/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-r from-purple-500/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-lg hover-scale">
            <TrendingUp className="w-5 h-5" />
            Профессиональная статистика
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-black mb-8 text-gradient leading-tight">
            Цифры, говорящие за нас
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Реальные результаты работы команды профессионалов с многолетним опытом в SEO-копирайтинге
          </p>
        </div>

        {/* Interactive achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className={`group text-center p-8 hover-scale hover-glow transition-all duration-500 ${achievement.bgColor} ${achievement.borderColor} border-2 relative overflow-hidden`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="pt-6 relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <achievement.icon className={`w-10 h-10 ${achievement.color}`} />
                </div>
                <div className={`text-4xl font-black mb-3 ${achievement.color}`}>
                  {achievement.number}
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">
                  {achievement.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality assurance section */}
        <div className="bg-gradient-to-r from-card/90 via-card/95 to-card/90 rounded-3xl p-16 shadow-2xl border border-primary/10 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-gradient">
                Гарантии профессионального качества
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Каждый этап работы контролируется опытными редакторами и SEO-специалистами
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {qualityFactors.map((factor, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <factor.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {factor.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStatsSection;
