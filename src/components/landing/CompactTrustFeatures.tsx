
import { Shield, Users, Clock, Target, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CompactTrustFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "30+ экспертов",
      description: "Только дипломированные SEO-копирайтеры",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: "Антиплагиат Text.ru",
      description: "Бесплатные ссылки на проверки",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      title: "Сроки от 24ч",
      description: "Оперативная работа без компромиссов",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Target,
      title: "SEO-оптимизация",
      description: "Ключи, LSI и технические отчеты",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Award,
      title: "Многолетний опыт",
      description: "Средний стаж 5+ лет",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50"
    },
    {
      icon: CheckCircle,
      title: "Гарантия правок",
      description: "7 дней бесплатных корректировок",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
            Профессионализм & Прозрачность
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Каждая статья нашего сервиса сопровождается отчетом по уникальности на Text.ru. 
            Без компромиссов — только экспертный SEO-контент под ключ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompactTrustFeatures;
