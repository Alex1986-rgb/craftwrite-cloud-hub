import ModernHeroSection from "@/components/landing/ModernHeroSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ProfessionalStatsSection from "@/components/landing/ProfessionalStatsSection";
import FaqSection from "@/components/landing/FaqSection";
import TeamSection from "@/components/landing/TeamSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import Footer from "@/components/common/Footer";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      <main className="relative overflow-hidden">
        {/* 1. Главный экран с призывом к действию */}
        <ModernHeroSection />
        
        {/* 2. Каталог услуг */}
        <ServicesCatalogSection />
        
        {/* 3. Цены */}
        <ModernPricingSection />
        
        {/* 4. Процесс работы */}
        <ProcessSection />
        
        {/* 5. Кейсы и результаты */}
        <CaseStudiesSection />
        
        {/* 6. Статистика */}
        <ProfessionalStatsSection />
        
        {/* 7. Отзывы клиентов */}
        <TestimonialsSection />
        
        {/* 8. Команда */}
        <TeamSection />
        
        {/* 9. Частые вопросы */}
        <FaqSection />
        
        {/* 10. Контакты */}
        <ContactSection />
        
        {/* 11. SEO-текст */}
        <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50/50 to-transparent">
          <SeoTextExpandable text={seoText} />
        </div>
        
        {/* Виджеты поддержки */}
        <SupportWidget />
        <HumanLikeAiAssistant />
      </main>
      <Footer />
    </div>
  );
}
