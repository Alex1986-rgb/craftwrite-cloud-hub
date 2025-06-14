
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
  Zap,
  Star,
  Globe,
  Clock,
  DollarSign
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
  },
  4: {
    title: "Email-кампания для фитнес-клуба FitLife",
    category: "Email-маркетинг",
    client: "FitLife Club",
    duration: "2 месяца",
    date: "Апрель 2024",
    description: "Создание автоматизированной email-воронки для фитнес-клуба: welcome-серия, реактивация неактивных клиентов, допродажи персональных тренировок.",
    challenge: "Низкая лояльность клиентов, высокий churn rate (45%), слабые продажи дополнительных услуг.",
    solution: "Разработали персонализированные email-сценарии, внедрили сегментацию по поведению, создали мотивационный контент.",
    results: [
      "Open rate 45% (среднее в фитнесе 22%)",
      "Click rate 12% (среднее 3%)",
      "Снижение churn rate до 28%",
      "Рост продаж персональных тренировок на 280%",
      "Увеличение LTV клиента на 65%"
    ],
    metrics: {
      openRate: "45%",
      clickRate: "12%",
      churnReduction: "-38%",
      ptSales: "+280%"
    },
    technologies: ["Email-автоматизация", "Сегментация", "A/B тестирование", "Персонализация"],
    tags: ["Email", "Фитнес", "Автоворонка", "Retention"],
    testimonial: {
      text: "Наши клиенты стали более вовлеченными, а продажи выросли в разы!",
      author: "Елена Кузнецова",
      position: "Директор по маркетингу FitLife Club"
    }
  },
  5: {
    title: "SEO-статьи для юридической компании LegalPro",
    category: "SEO-статьи",
    client: "LegalPro",
    duration: "4 месяца",
    date: "Май 2024",
    description: "Комплексная SEO-оптимизация сайта юридической компании: создание экспертных статей, оптимизация существующих страниц, построение тематических кластеров.",
    challenge: "Жесткая конкуренция в юридической нише, низкая видимость в поиске, недостаток экспертного контента.",
    solution: "Провели семантический анализ, создали контент-план на 50+ статей, оптимизировали техническую часть SEO.",
    results: [
      "Вход в ТОП-10 по 85% целевых запросов",
      "Рост органического трафика на 200%",
      "Увеличение заявок через сайт на 60%",
      "Позиция №1 по запросу 'юридические услуги'",
      "Рост узнаваемости бренда на 120%"
    ],
    metrics: {
      topPositions: "85%",
      organicGrowth: "+200%",
      leads: "+60%",
      brandAwareness: "+120%"
    },
    technologies: ["SEO", "Контент-кластеры", "Техническое SEO", "E-A-T оптимизация"],
    tags: ["SEO", "Юриспруденция", "B2B", "Экспертность"],
    testimonial: {
      text: "Стали лидерами в своей нише благодаря качественному контенту.",
      author: "Андрей Морозов",
      position: "Управляющий партнер LegalPro"
    }
  },
  6: {
    title: "Продающие тексты для SaaS-платформы CloudTech",
    category: "SaaS-копирайтинг",
    client: "CloudTech",
    duration: "3 месяца",
    date: "Июнь 2024",
    description: "Создание продающих материалов для B2B SaaS-платформы: лендинги для разных сегментов, email-последовательности, кейсы, презентации для продаж.",
    challenge: "Сложность объяснения технического продукта, длинный цикл продаж, низкая конверсия trial-to-paid.",
    solution: "Упростили коммуникацию продукта, создали value-ориентированные материалы, разработали nurturing-последовательности.",
    results: [
      "Конверсия trial-to-paid выросла с 8% до 22%",
      "Сократили цикл продаж на 35%",
      "Увеличили средний чек на 40%",
      "Рост MRR на 180%",
      "Повышение NPS с 7.2 до 8.9"
    ],
    metrics: {
      trialConversion: "+175%",
      salesCycle: "-35%",
      averageCheck: "+40%",
      mrrGrowth: "+180%"
    },
    technologies: ["B2B копирайтинг", "Value proposition", "Sales enablement", "Product marketing"],
    tags: ["SaaS", "B2B", "Tech", "Продажи"],
    testimonial: {
      text: "Наконец-то наши клиенты понимают ценность нашего продукта!",
      author: "Максим Родионов",
      position: "Head of Growth CloudTech"
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
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/5 to-background">
          <div className="container max-w-4xl mx-auto px-4 pt-32 pb-20 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-white">
                  Проект не найден
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  Извините, запрашиваемый проект не существует или был перемещен.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Вернуться к портфолио
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-slate-50/30 to-primary/5">
        {/* Hero секция */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <div className="mb-12">
              <Button variant="outline" asChild className="mb-8 hover:bg-white/80 border-2">
                <Link to="/portfolio" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Вернуться к портфолио
                </Link>
              </Button>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 text-lg border-0">
                  {project.category}
                </Badge>
                <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{project.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{project.client}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-playfair font-bold mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Метрики */}
        <section className="py-20 bg-white/60 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Ключевые результаты
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(project.metrics).map(([key, value], index) => (
                <Card key={key} className="group p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white to-slate-50/50 border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {key === 'conversion' && 'Конверсия'}
                      {key === 'traffic' && 'Трафик'}
                      {key === 'time' && 'Время на сайте'}
                      {key === 'bounce' && 'Показатель отказов'}
                      {key === 'leadCost' && 'Стоимость лида'}
                      {key === 'sales' && 'Продажи'}
                      {key === 'leads' && 'Заявки'}
                      {key === 'investment' && 'Инвестиции'}
                      {key === 'users' && 'Пользователи'}
                      {key === 'openRate' && 'Open Rate'}
                      {key === 'clickRate' && 'Click Rate'}
                      {key === 'churnReduction' && 'Снижение Churn'}
                      {key === 'ptSales' && 'Продажи PT'}
                      {key === 'topPositions' && 'ТОП позиции'}
                      {key === 'organicGrowth' && 'Органический рост'}
                      {key === 'brandAwareness' && 'Узнаваемость'}
                      {key === 'trialConversion' && 'Trial конверсия'}
                      {key === 'salesCycle' && 'Цикл продаж'}
                      {key === 'averageCheck' && 'Средний чек'}
                      {key === 'mrrGrowth' && 'Рост MRR'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Детали проекта */}
        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Вызов */}
              <Card className="group p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-playfair font-bold text-red-700">Вызов</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.challenge}
                </p>
              </Card>

              {/* Решение */}
              <Card className="group p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-playfair font-bold text-blue-700">Решение</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.solution}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Результаты */}
        <section className="py-20 bg-gradient-to-br from-emerald-50/50 to-green-50/50">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 flex items-center justify-center gap-4">
              <Award className="w-12 h-12 text-primary" />
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Достигнутые результаты
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.results.map((result, index) => (
                <div key={index} className="group flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex-shrink-0 p-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="text-foreground font-medium text-lg">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Технологии */}
        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Использованные технологии
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {project.technologies.map((tech, index) => (
                <Badge key={tech} className="group px-8 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="relative z-10">{tech}</span>
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Отзыв клиента */}
        <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
          </div>
          
          <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Отзыв клиента</h2>
            
            <blockquote className="text-2xl md:text-3xl italic mb-12 leading-relaxed font-light">
              "{project.testimonial.text}"
            </blockquote>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <div className="font-semibold text-2xl mb-2">{project.testimonial.author}</div>
              <div className="opacity-90 text-lg">{project.testimonial.position}</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-gradient-to-br from-slate-900 via-primary/10 to-background relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Хотите такие же результаты?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Обсудим ваш проект и покажем, как наш опыт поможет достичь ваших целей
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link to="/order" className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Начать проект
                  <ExternalLink className="w-6 h-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <Link to="/portfolio" className="flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  Все кейсы
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
