
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Award, 
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  Rocket
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const stats = [
  { number: "500+", label: "Довольных клиентов", icon: Users },
  { number: "2000+", label: "Выполненных проектов", icon: Target },
  { number: "5", label: "Лет на рынке", icon: Calendar },
  { number: "98%", label: "Положительных отзывов", icon: Star }
];

const team = [
  {
    name: "Анна Петрова",
    role: "CEO & Основатель",
    image: "/placeholder.svg",
    description: "15 лет в маркетинге, эксперт по контент-стратегиям"
  },
  {
    name: "Михаил Сидоров",
    role: "Head of SEO",
    image: "/placeholder.svg", 
    description: "Специалист по поисковой оптимизации с 10+ лет опыта"
  },
  {
    name: "Елена Козлова",
    role: "Creative Director",
    image: "/placeholder.svg",
    description: "Креативный директор, отвечает за качество контента"
  },
  {
    name: "Дмитрий Волков",
    role: "Technical Lead",
    image: "/placeholder.svg",
    description: "Руководит технической командой и разработкой"
  }
];

const values = [
  {
    icon: Shield,
    title: "Качество",
    description: "Мы гарантируем высочайшее качество каждого текста"
  },
  {
    icon: Heart,
    title: "Забота о клиентах",
    description: "Ваш успех - наша главная цель и мотивация"
  },
  {
    icon: Lightbulb,
    title: "Инновации",
    description: "Используем передовые технологии и методы"
  },
  {
    icon: Rocket,
    title: "Результат",
    description: "Фокусируемся на измеримых результатах для бизнеса"
  }
];

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold">
                <Users className="w-5 h-5 mr-2" />
                О нас
              </Badge>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Мы создаем контент, который работает
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                CopyPro Cloud — это команда профессионалов, которая помогает бизнесу расти 
                через качественный контент-маркетинг
              </p>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Миссия и ценности */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша миссия</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Делать качественный контент доступным для каждого бизнеса и помогать компаниям 
                достигать своих целей через эффективные текстовые решения
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="py-20 bg-slate-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша команда</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Профессионалы с многолетним опытом в копирайтинге, маркетинге и SEO
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <div className="text-primary font-medium mb-3">{member.role}</div>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Достижения */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Наши достижения</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <Award className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Лучшее агентство 2023</h3>
                <p className="text-muted-foreground">
                  Награда от ассоциации интернет-маркетинга за качество услуг
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">100% рост клиентов</h3>
                <p className="text-muted-foreground">
                  Удвоили количество довольных клиентов за последний год
                </p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Гарантия качества</h3>
                <p className="text-muted-foreground">
                  98% клиентов рекомендуют нас своим партнерам
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы работать с лучшими?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Присоединяйтесь к сотням довольных клиентов и начните получать результаты уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/order" className="flex items-center gap-2">
                  Начать сотрудничество
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/#contact">Связаться с нами</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
