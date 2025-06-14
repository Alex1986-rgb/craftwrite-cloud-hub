
import { TrendingUp, Users, Award, Shield, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProfessionalStatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "30+",
      label: "Дипломированных экспертов",
      description: "Каждый специалист с профильным высшим образованием",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Award,
      number: "5+",
      label: "Лет среднего опыта",
      description: "Многолетняя экспертиза в SEO-копирайтинге",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Гарантия уникальности",
      description: "Проверка Text.ru + предоставление ссылок",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      icon: TrendingUp,
      number: "2000+",
      label: "Успешных проектов",
      description: "Реализованных заказов за последний год",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-lg">
            <Star className="w-5 h-5" />
            Профессиональная экспертиза
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-black mb-8 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Команда элитных <br />SEO-копирайтеров
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            Только дипломированные специалисты с многолетним опытом создания 
            <span className="text-primary font-bold"> премиального SEO-контента</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group text-center p-8 hover:shadow-2xl transition-all duration-500 border-primary/10 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="pt-6 relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className={`text-4xl font-black mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional guarantees */}
        <div className="bg-gradient-to-r from-card/90 via-card/80 to-card/90 rounded-3xl p-12 shadow-2xl border border-primary/20 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Профессиональные гарантии качества
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Каждый текст создается по строгим стандартам качества с полной отчетностью
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Дипломированные эксперты</h4>
              <p className="text-sm text-muted-foreground">Только специалисты с профильным высшим образованием</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Проверка уникальности</h4>
              <p className="text-sm text-muted-foreground">Официальные ссылки на проверки Text.ru к каждому заказу</p>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Многоуровневый контроль</h4>
              <p className="text-sm text-muted-foreground">Редакторская правка и финальная проверка качества</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStatsSection;
