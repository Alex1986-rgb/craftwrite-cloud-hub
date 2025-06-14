
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Rocket, Award, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Экспертность",
    description: "Каждый наш специалист имеет профильное высшее образование и многолетний опыт в SEO-копирайтинге.",
    gradient: "from-blue-600 to-purple-600"
  },
  {
    icon: Heart,
    title: "Качество",
    description: "Мы гарантируем 100% уникальность каждого текста с предоставлением официальных ссылок на проверки Text.ru.",
    gradient: "from-green-600 to-emerald-600"
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Используем современные SEO-методики и актуальные тренды для создания максимально эффективного контента.",
    gradient: "from-orange-600 to-red-600"
  },
  {
    icon: Rocket,
    title: "Скорость",
    description: "Быстрое выполнение заказов от 24 часов без компромиссов в качестве благодаря слаженной команде.",
    gradient: "from-purple-600 to-pink-600"
  }
];

const MissionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Mission statement */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-lg">
            <Award className="w-5 h-5" />
            Наша миссия
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-black mb-8 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Создаем контент,<br />который работает
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            Наша миссия — предоставлять предпринимателям и компаниям эксклюзивный SEO-контент высочайшего качества, 
            который помогает достигать бизнес-целей и укреплять позиции в поиске
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="group p-8 hover:shadow-2xl transition-all duration-500 border-primary/10 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="pt-6 relative z-10">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team highlight */}
        <div className="bg-gradient-to-r from-card/90 via-card/80 to-card/90 rounded-3xl p-12 shadow-2xl border border-primary/20 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-6 py-3 rounded-full text-sm font-bold mb-6 border border-primary/30">
                <Users className="w-5 h-5" />
                Элитная команда
              </div>
              <h3 className="text-4xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                30+ профессионалов с дипломами
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Каждый член нашей команды — это дипломированный специалист с высшим образованием и минимум 5-летним опытом в SEO-копирайтинге. 
                Мы тщательно отбираем экспертов, которые понимают специфику различных ниш и могут создавать контент мирового уровня.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-black text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">С высшим образованием</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-green-600 mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Лет среднего опыта</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-blue-500/5 p-6 rounded-2xl border border-primary/20">
                <h4 className="font-bold text-lg mb-2 text-primary">Строгий отбор</h4>
                <p className="text-muted-foreground">Менее 5% кандидатов проходят наш отбор и становятся частью команды.</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 p-6 rounded-2xl border border-green-500/20">
                <h4 className="font-bold text-lg mb-2 text-green-600">Постоянное развитие</h4>
                <p className="text-muted-foreground">Регулярные тренинги и изучение новых SEO-тенденций для команды.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/5 p-6 rounded-2xl border border-purple-500/20">
                <h4 className="font-bold text-lg mb-2 text-purple-600">Узкая специализация</h4>
                <p className="text-muted-foreground">Каждый эксперт специализируется на определенных тематиках и форматах.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
