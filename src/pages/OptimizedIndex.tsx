import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import ComprehensiveSeo from "@/components/seo/ComprehensiveSeo";
import { createOrganizationStructuredData, createWebsiteStructuredData, createFAQStructuredData } from "@/utils/seoUtils";
import ModernHeroSection from "@/components/landing/ModernHeroSection";

const seoText = `
CopyPro Cloud — ведущая платформа профессионального копирайтинга в России и СНГ с командой из 50+ сертифицированных экспертов.

Наши ключевые преимущества и достижения:
- Команда из 50+ дипломированных SEO-копирайтеров с профильным образованием и опытом 5+ лет
- Гарантия 100% уникальности по Text.ru, Advego, eTXT с официальными отчетами
- Экспресс-доставка от 24 часов с сохранением премиального качества
- Глубокая SEO-оптимизация с анализом ТОП-10 конкурентов и семантическим ядром 500+ ключей
- Круглосуточная техподдержка и бесплатные правки в течение 30 дней
- Более 5000 успешно реализованных проектов с ростом конверсии клиентов на 40-180%

Полная экосистема контент-маркетинга CopyPro Cloud:

SEO-контент и органическое продвижение:
- Экспертные SEO-статьи 2000-8000 знаков с LSI-оптимизацией
- Кластерные страницы под высокочастотные запросы
- Контент-планы на 6-12 месяцев с календарем публикаций
- Техническое SEO-копирайтинг (Title, Description, H1-H6)

Коммерческий контент и продажи:
- Высококонверсионные лендинги с A/B тестированием
- Продающие email-воронки и автоматизированные последовательности  
- Скрипты для отделов продаж и колл-центров
- Коммерческие предложения с конверсией до 15%

Контент для цифровых каналов:
- Стратегии контент-маркетинга для соцсетей (ВК, Telegram, YouTube)
- Персонализированные email-рассылки с сегментацией аудитории
- Контент для мессенджер-маркетинга (WhatsApp, Telegram-боты)
- UGC-контент и инфлюенсер-коллаборации

E-commerce и маркетплейсы:
- Детальные описания товаров для Wildberries, Ozon, Яндекс.Маркет
- SEO-категории для интернет-магазинов
- Карточки товаров с высоким CTR и конверсией
- A+ контент для Amazon и международных площадок

Корпоративный и B2B контент:
- Технические тексты и регламенты
- Корпоративные блоги и thought leadership статьи  
- Белые книги (white papers) и кейс-стади
- Презентации для инвесторов и партнеров

Специализированный контент:
- Медицинские тексты (при участии врачей-консультантов)
- Юридический контент (проверка практикующими юристами)
- Финансовые материалы (соответствие требованиям ЦБ РФ)
- IT и технологический контент

География работы: Россия, СНГ, Европа, США
Отраслевая экспертиза: IT, e-commerce, финансы, медицина, образование, недвижимость, производство, услуги

Технологический стек и инструменты:
- Семантические анализаторы: Serpstat, Ahrefs, SEMrush
- Проверка уникальности: Text.ru, Advego, eTXT  
- CRM интеграции: AmoCRM, Битрикс24, HubSpot
- Аналитика: Google Analytics, Яндекс.Метрика, Hotjar

Результаты наших клиентов (медианные показатели):
- Рост органического трафика на 120-300% за 6 месяцев
- Увеличение конверсии лендингов на 40-180%
- Повышение времени на сайте на 60-120%
- Снижение показателя отказов на 25-45%
- ROI контент-маркетинга 300-800%

Закажите профессиональный копирайтинг на CopyPro Cloud уже сегодня и получите результат мирового уровня с гарантией качества!
`;

// FAQ данные для структурированной разметки
const faqData = [
  {
    question: "Сколько времени занимает создание SEO-статьи?",
    answer: "Стандартная SEO-статья объемом 2000-4000 слов создается за 2-3 рабочих дня. Экспресс-заказы выполняются за 24 часа с доплатой 50%."
  },
  {
    question: "Какие гарантии качества вы предоставляете?",
    answer: "Мы гарантируем 100% уникальность текста, соответствие техническому заданию, бесплатные правки в течение 30 дней и возврат средств при несоответствии качества."
  },
  {
    question: "Работаете ли вы с узкоспециализированными тематиками?",
    answer: "Да, у нас есть эксперты по медицине, юриспруденции, IT, финансам, промышленности и другим специализированным областям с профильным образованием."
  },
  {
    question: "Можно ли заказать контент-план на несколько месяцев?",
    answer: "Конечно! Мы создаем контент-планы на 3, 6 и 12 месяцев с учетом сезонности, конкурентного анализа и ваших бизнес-целей."
  },
  {
    question: "Какие форматы контента вы создаете?",
    answer: "Мы создаем SEO-статьи, лендинги, email-рассылки, посты для соцсетей, описания товаров, технические тексты, презентации и многое другое."
  }
];

// Структурированные данные для главной страницы
const structuredData = [
  createOrganizationStructuredData(),
  createWebsiteStructuredData(),
  createFAQStructuredData(faqData)
];

export default function OptimizedIndex() {
  return (
    <main className="relative overflow-hidden">
      <ComprehensiveSeo
        title="Профессиональный копирайтинг CopyPro Cloud | SEO-тексты, лендинги, контент-маркетинг"
        description="CopyPro Cloud — ведущая платформа копирайтинга с командой 50+ экспертов. Создаем SEO-тексты, продающие лендинги, email-кампании. Гарантия качества 100%. Заказать от 1000₽"
        keywords="копирайтинг, SEO-тексты, продающие тексты, контент-маркетинг, лендинги, email-маркетинг, тексты для сайта, копирайтер, Москва, Россия"
        structuredData={structuredData}
      />
      
      <ModernHeroSection />
      <InteractiveGuaranteesSection />
      <BenefitsSection />
      <ServicesCatalogSection />
      <ModernPricingSection />
      <ProcessSection />
      <TestimonialsSection />
      <TeamSection />
      <TrustSection />
      <FaqSection />
      <ContactSection />
      
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50/50 to-transparent">
        <SeoTextExpandable text={seoText} />
      </div>
      
      <SupportWidget />
      <HumanLikeAiAssistant />
    </main>
  );
}
