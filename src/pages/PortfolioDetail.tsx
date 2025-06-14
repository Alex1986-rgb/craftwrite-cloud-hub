
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  BarChart3, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award,
  ExternalLink,
  Calendar,
  Target,
  Zap
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const portfolioDetails = {
  1: {
    title: "Интернет-магазин электроники TechStore",
    category: "E-commerce",
    client: "TechStore",
    duration: "3 месяца",
    date: "Январь 2024",
    description: "Полное переписывание контента для интернет-магазина электроники с фокусом на SEO-оптимизацию и повышение конверсии. Создали структурированный контент для 500+ товаров, категорий и информационных страниц.",
    challenge: "Низкая конверсия (1.2%), слабые позиции в поисковой выдаче, высокий показатель отказов (78%). Контент не соответствовал поисковым запросам пользователей.",
    solution: "Провели комплексный анализ конкурентов, исследование аудитории, создали новую контент-стратегию с фокусом на пользовательские потребности и SEO-требования.",
    results: [
      "Увеличение конверсии с 1.2% до 4.14% (+245%)",
      "Рост органического трафика на 180%",
      "Повышение времени на сайте с 1:24 до 2:18 (+65%)",
      "Снижение показателя отказов до 45%",
      "Выход в ТОП-10 по 156 ключевым запросам",
      "Рост продаж на 320% за период"
    ],
    metrics: {
      conversion: "+245%",
      traffic: "+180%",
      time: "+65%",
      bounce: "-42%"
    },
    technologies: ["SEO", "Контент-маркетинг", "UX-копирайтинг", "A/B тестирование"],
    tags: ["SEO", "Конверсия", "E-commerce", "UX"],
    testimonial: {
      text: "CopyPro Cloud полностью трансформировали наш сайт. Результаты превзошли все ожидания!",
      author: "Михаил Петров",
      position: "Директор по маркетингу TechStore"
    }
  },
  2: {
    title: "Лендинг курсов программирования CodeAcademy",
    category: "Лендинги",
    client: "CodeAcademy",
    duration: "1 месяц",
    date: "Март 2024",
    description: "Создание высококонверсионного лендинга для онлайн-школы программирования с применением психологических триггеров и современных техник копирайтинга.",
    challenge: "Низкая конверсия в заявку (2.3%), высокая стоимость привлечения клиента, недоверие к онлайн-образованию.",
    solution: "Разработали эмоциональную воронку продаж, добавили социальные доказательства, создали убедительную структуру с четкими CTA.",
    results: [
      "Конверсия в заявку выросла до 18.5%",
      "Снижение стоимости лида на 40%",
      "Рост продаж курсов на 320%",
      "Увеличение количества заявок в 8 раз",
      "Время на странице увеличилось на 156%"
    ],
    metrics: {
      conversion: "18.5%",
      leadCost: "-40%",
      sales: "+320%",
      leads: "+800%"
    },
    technologies: ["Лендинг", "Психология продаж", "CRO", "Storytelling"],
    tags: ["Лендинг", "Образование", "Конверсия", "CRO"],
    testimonial: {
      text: "Невероятный результат! Теперь наш лендинг работает как часы.",
      author: "Анна Сидорова",
      position: "Основатель CodeAcademy"
    }
  },
  3: {
    title: "Контент-стратегия для FinTech стартапа",
    category: "Контент-маркетинг",
    client: "PayFlow",
    duration: "6 месяцев",
    date: "Февраль 2024",
    description: "Разработка комплексной контент-стратегии для финтех-стартапа: от лендинга до блога и email-рассылок. Создание доверия в сфере финансовых технологий.",
    challenge: "Недоверие к новому бренду в финансовой сфере, сложность объяснения технических продуктов, низкая узнаваемость.",
    solution: "Создали образовательный контент, демонстрирующий экспертность, разработали понятные объяснения сложных продуктов, добавили кейсы и отзывы.",
    results: [
      "Привлечение $2M инвестиций",
      "Регистрация 10,000+ пользователей",
      "Конверсия лендинга 8.2%",
      "Органический трафик вырос на 450%",
      "Email open rate 34% (среднее 18%)",
      "Упоминания в ТОП медиа"
    ],
    metrics: {
      investment: "$2M",
      users: "10K+",
      conversion: "8.2%",
      traffic: "+450%"
    },
    technologies: ["Контент-стратегия", "Email-маркетинг", "PR", "SEO"],
    tags: ["FinTech", "Стартап", "Инвестиции", "B2B"],
    testimonial: {
      text: "Без их контент-стратегии мы бы не смогли привлечь инвестиции.",
      author: "Дмитрий Волков",
      position: "CEO PayFlow"
    }
  }
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : null;
  const project = projectId && projectId in portfolioDetails ? portfolioDetails[projectId as keyof typeof portfolioDetails] : null;

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50 py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
            <p className="text-muted-foreground mb-8">Извините, запрашиваемый проект не существует.</p>
            <Button asChild>
              <Link to="/portfolio">Вернуться к портфолио</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="mb-8">
              <Button variant="outline" asChild className="mb-6">
                <Link to="/portfolio" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Вернуться к портфолио
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-primary/10 text-primary px-4 py-2">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  {project.duration}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Метрики */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ключевые результаты</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(project.metrics).map(([key, value]) => (
                <Card key={key} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {key === 'conversion' && 'Конверсия'}
                    {key === 'traffic' && 'Трафик'}
                    {key === 'time' && 'Время на сайте'}
                    {key === 'bounce' && 'Показатель отказов'}
                    {key === 'leadCost' && 'Стоимость лида'}
                    {key === 'sales' && 'Продажи'}
                    {key === 'leads' && 'Заявки'}
                    {key === 'investment' && 'Инвестиции'}
                    {key === 'users' && 'Пользователи'}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Детали проекта */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Вызов */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold">Вызов</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </Card>

              {/* Решение */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-8 h-8 text-blue-500" />
                  <h3 className="text-2xl font-bold">Решение</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Результаты */}
        <section className="py-16 bg-slate-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Достигнутые результаты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Технологии */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Использованные технологии</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="px-6 py-3 text-lg">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Отзыв клиента */}
        <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Отзыв клиента</h2>
            <blockquote className="text-2xl italic mb-8 leading-relaxed">
              "{project.testimonial.text}"
            </blockquote>
            <div>
              <div className="font-semibold text-xl">{project.testimonial.author}</div>
              <div className="opacity-90">{project.testimonial.position}</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Хотите такие же результаты?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Обсудим ваш проект и покажем, как наш опыт поможет достичь ваших целей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/order" className="flex items-center gap-2">
                  Начать проект
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/portfolio">Все кейсы</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
