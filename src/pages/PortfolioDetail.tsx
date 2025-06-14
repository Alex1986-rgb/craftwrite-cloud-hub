import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SmartNavigation from "@/components/portfolio/SmartNavigation";
import CompactProjectHero from "@/components/portfolio/CompactProjectHero";
import OptimizedProjectMetrics from "@/components/portfolio/OptimizedProjectMetrics";
import ProjectTextExamples from "@/components/portfolio/ProjectTextExamples";
import ProjectDetails from "@/components/portfolio/ProjectDetails";
import ProjectResults from "@/components/portfolio/ProjectResults";
import ProjectTechnologies from "@/components/portfolio/ProjectTechnologies";
import ProjectTestimonial from "@/components/portfolio/ProjectTestimonial";
import MinimalProjectCTA from "@/components/portfolio/MinimalProjectCTA";

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
      <SmartNavigation />
      <main className="min-h-screen bg-white">
        <CompactProjectHero project={project} />
        <OptimizedProjectMetrics metrics={project.metrics} />
        <ProjectTextExamples />
        <ProjectDetails challenge={project.challenge} solution={project.solution} />
        <ProjectResults results={project.results} />
        <ProjectTechnologies technologies={project.technologies} />
        <ProjectTestimonial testimonial={project.testimonial} />
        <MinimalProjectCTA />
      </main>
      <Footer />
    </>
  );
}
