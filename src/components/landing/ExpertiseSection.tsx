import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Zap
} from "lucide-react";

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      icon: Target,
      title: "SEO-копирайтинг",
      description: "Глубокая экспертиза в создании контента для поисковых систем",
      achievements: ["5+ лет опыта", "1000+ статей в ТОП-10", "Сертификация Google"],
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Продающие тексты",
      description: "Конверсионный копирайтинг с применением психологии продаж",
      achievements: ["Конверсия до 15%", "300+ лендингов", "A/B-тестирование"],
      color: "green"
    },
    {
      icon: Zap,
      title: "Маркетплейс-контент",
      description: "Специализация на карточках товаров для всех площадок",
      achievements: ["ТОП-3 в поиске", "500+ карточек", "Рост продаж на 40%"],
      color: "purple"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Award className="w-4 h-4 mr-2" />
            Наша экспертиза
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Узкие эксперты, а не универсалы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы не «делаем всё». Мы специализируемся на трёх ключевых направлениях 
            и добиваемся в них исключительных результатов
          </p>
        </div>

        {/* Expertise cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-${area.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <area.icon className={`w-6 h-6 text-${area.color}-600`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {area.description}
                </p>

                <div className="space-y-2">
                  {area.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            Готовы работать с экспертами?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Получите консультацию по вашему проекту и узнайте, 
            как наша экспертиза поможет достичь ваших целей
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/contact">
              Получить консультацию
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;