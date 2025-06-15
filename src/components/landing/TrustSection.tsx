
import { Shield, Users, Clock, Target, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustSection = () => {
  const trustFeatures = [
    {
      icon: Users,
      title: "30+ экспертов",
      description: "Дипломированные SEO-копирайтеры",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50/80"
    },
    {
      icon: Shield,
      title: "Text.ru проверки",
      description: "Бесплатные ссылки на уникальность",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50/80"
    },
    {
      icon: Clock,
      title: "Сроки от 24ч",
      description: "Быстро без потери качества",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50/80"
    },
    {
      icon: Target,
      title: "SEO-оптимизация",
      description: "Ключи, LSI, технические отчеты",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50/80"
    },
    {
      icon: Award,
      title: "Опыт 5+ лет",
      description: "Средний стаж специалистов",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50/80"
    },
    {
      icon: CheckCircle,
      title: "Гарантия правок",
      description: "7 дней бесплатных корректировок",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50/80"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-200">
            <Shield className="w-4 h-4" />
            Почему нам доверяют
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
            Профессионализм & Прозрачность
          </h2>
          
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Каждая статья сопровождается отчетом по уникальности на Text.ru. 
            Только экспертный SEO-контент под ключ.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-4 text-center relative">
                  {/* Gradient overlay на hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${feature.bgColor} group-hover:scale-110 transition-all duration-300 shadow-md`}>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-tight">
                    {feature.description}
                  </p>

                  {/* Accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
