
import { Shield, Users, Clock, Target, Award, CheckCircle, Zap, FileCheck, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CompactTrustFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "30+ экспертов",
      description: "Только дипломированные SEO-копирайтеры",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50/80"
    },
    {
      icon: Shield,
      title: "Антиплагиат Text.ru",
      description: "Бесплатные ссылки на проверки",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50/80"
    },
    {
      icon: Zap,
      title: "Сроки от 24ч",
      description: "Оперативная работа без компромиссов",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50/80"
    },
    {
      icon: Target,
      title: "SEO-оптимизация",
      description: "Ключи, LSI и технические отчеты",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50/80"
    },
    {
      icon: Star,
      title: "Многолетний опыт",
      description: "Средний стаж 5+ лет",
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
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">Почему нам доверяют заказчики</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
            Профессионализм & Прозрачность
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Каждая статья нашего сервиса сопровождается отчетом по уникальности на Text.ru. 
            Без компромиссов — только экспертный SEO-контент под ключ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-6 text-center relative">
                  {/* Gradient overlay на hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${feature.bgColor} group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
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
