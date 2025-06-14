
import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TeamSection = () => {
  const stats = [
    {
      icon: Users,
      number: "30+",
      label: "Дипломированных копирайтеров",
      description: "Команда профессионалов с высшим образованием"
    },
    {
      icon: GraduationCap,
      number: "5+",
      label: "Лет опыта в среднем",
      description: "Каждый специалист имеет солидный опыт"
    },
    {
      icon: Award,
      number: "100%",
      label: "Проверка качества",
      description: "Каждый текст проходит многоуровневую проверку"
    },
    {
      icon: TrendingUp,
      number: "2000+",
      label: "Выполненных проектов",
      description: "Успешно реализованных заказов за год"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Команда профессионалов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            30 дипломированных SEO-копирайтеров с профильным образованием и многолетним опытом создания текстов высочайшего качества
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <h3 className="font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-xl border border-primary/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Почему наша команда — лучший выбор?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Все копирайтеры имеют профильное образование в области журналистики, филологии или маркетинга</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Регулярное повышение квалификации и изучение новых SEO-трендов</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Узкая специализация каждого автора по тематикам для максимальной экспертности</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Постоянный мониторинг качества и обратная связь от клиентов</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Команда профессионалов за работой"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
