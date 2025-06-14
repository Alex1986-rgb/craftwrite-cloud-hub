
import { CheckCircle, Zap, Shield, Users, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Users,
    title: "Широкий выбор типов текстов",
    description: "От SEO-статей до email-рассылок и постов для соцсетей"
  },
  {
    icon: Award,
    title: "Профессиональные копирайтеры",
    description: "30+ дипломированных специалистов с профильным образованием"
  },
  {
    icon: Zap,
    title: "Быстрое выполнение",
    description: "Получите готовый текст от 1 до 3 рабочих дней"
  },
  {
    icon: Shield,
    title: "Проверка уникальности и качества",
    description: "100% уникальность с предоставлением ссылок на проверки"
  },
  {
    icon: Target,
    title: "SEO-оптимизация",
    description: "Профессиональная работа с ключевыми словами и LSI"
  },
  {
    icon: CheckCircle,
    title: "Гарантия качества",
    description: "Многоуровневая система контроля и возможность правок"
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
          <Award className="w-4 h-4" />
          Преимущества платформы
        </div>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Почему выбирают CopyPro Cloud
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Мы создали платформу, которая объединяет лучших экспертов и современные технологии для создания текстов высочайшего качества
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

      {/* Additional trust elements */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 border border-primary/20">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">2000+</div>
            <div className="text-sm text-muted-foreground">Выполненных проектов</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600">98%</div>
            <div className="text-sm text-muted-foreground">Уникальность текстов</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">24ч</div>
            <div className="text-sm text-muted-foreground">Средний срок выполнения</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-600">30+</div>
            <div className="text-sm text-muted-foreground">Экспертов в команде</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BenefitsSection;
