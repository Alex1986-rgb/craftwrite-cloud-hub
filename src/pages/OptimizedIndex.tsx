
import OptimizedHeader from "@/components/common/OptimizedHeader";
import Footer from "@/components/common/Footer";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import LazySection from "@/components/common/LazySection";
import SectionSkeleton from "@/components/common/SectionSkeleton";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import EnhancedSeo from "@/components/seo/EnhancedSeo";
import { createFAQStructuredData } from "@/utils/seoUtils";
import { lazy, Suspense } from "react";

// Optimized lazy loading with better chunking
const BenefitsSection = lazy(() => import("@/components/landing/BenefitsSection"));
const ServicesCatalogSection = lazy(() => import("@/components/landing/ServicesCatalogSection"));
const ModernPricingSection = lazy(() => import("@/components/landing/ModernPricingSection"));
const InnovativePortfolioSection = lazy(() => import("@/components/landing/InnovativePortfolioSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/landing/ContactSection"));
const CombinedStatsSection = lazy(() => import("@/components/landing/CombinedStatsSection"));

const optimizedSeoText = `
CopyPro Cloud — лидирующая платформа профессионального копирайтинга с командой из 30+ сертифицированных экспертов.

🚀 Ключевые преимущества:
• Команда из 30+ дипломированных SEO-копирайтеров с опытом 5+ лет
• Гарантия 100% уникальности по Text.ru с официальными отчетами  
• Экспресс-доставка от 24 часов с премиальным качеством
• Глубокая SEO-оптимизация с анализом конкурентов
• Круглосуточная поддержка и бесплатные правки 30 дней
• 2000+ успешных проектов с ростом конверсии до 180%

📝 Полный спектр услуг:
✓ SEO-статьи и контент-планы
✓ Коммерческие лендинги и email-воронки  
✓ Контент для соцсетей и мессенджеров
✓ Описания для маркетплейсов
✓ Корпоративный и B2B контент
✓ Специализированный контент (медицина, юриспруденция, IT)

📈 Результаты клиентов:
• Рост органического трафика на 120-300%
• Увеличение конверсии на 40-180%
• ROI контент-маркетинга 300-800%

Заказывайте профессиональный копирайтинг уже сегодня!
`;

// FAQ данные для structured data
const faqData = [
  {
    question: "Какие гарантии качества вы предоставляете?",
    answer: "Мы гарантируем 100% уникальность текстов по Text.ru, соответствие ТЗ и бесплатные правки в течение 30 дней."
  },
  {
    question: "Сколько времени занимает выполнение заказа?",
    answer: "Стандартные заказы выполняются за 3-5 рабочих дней. Экспресс-заказы готовы за 24-48 часов."
  },
  {
    question: "Можно ли получить образцы работ?",
    answer: "Да, вы можете ознакомиться с нашим портфолио и получить образцы работ в вашей тематике."
  },
  {
    question: "Какие форматы текстов вы создаете?",
    answer: "Мы создаем SEO-статьи, лендинги, описания товаров, контент для соцсетей, email-рассылки и многое другое."
  }
];

export default function OptimizedIndex() {
  const structuredData = [
    createFAQStructuredData(faqData),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CopyPro Cloud",
      "url": "https://copypro-cloud.lovable.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://copypro-cloud.lovable.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <EnhancedSeo
        title="CopyPro Cloud — Профессиональный копирайтинг и SEO-тексты | 30+ экспертов"
        description="Заказать профессиональные SEO-тексты от команды из 30+ сертифицированных копирайтеров. Гарантия уникальности, экспресс-доставка от 24 часов. 2000+ успешных проектов."
        keywords="копирайтинг, SEO тексты, контент маркетинг, написание статей, профессиональные тексты"
        structuredData={structuredData}
      />
      
      <OptimizedHeader />
      <main className="relative overflow-hidden">
        {/* Hero - критически важная секция загружается сразу */}
        <ModernHeroSection />
        
        {/* Оптимизированные lazy-loaded секции с улучшенными skeleton screens */}
        <LazySection 
          fallback={<SectionSkeleton height="350px" />} 
          rootMargin="150px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="350px" />}>
            <CombinedStatsSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="500px" />}
          rootMargin="100px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <BenefitsSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="650px" />}
          rootMargin="100px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="650px" />}>
            <ServicesCatalogSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="750px" />}
          rootMargin="50px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="750px" />}>
            <ModernPricingSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="600px" />}
          rootMargin="50px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="600px" />}>
            <InnovativePortfolioSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="500px" />}
          rootMargin="50px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <TestimonialsSection />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<SectionSkeleton height="400px" />}
          rootMargin="50px"
          className="will-change-transform"
        >
          <Suspense fallback={<SectionSkeleton height="400px" />}>
            <ContactSection />
          </Suspense>
        </LazySection>
        
        {/* Оптимизированный SEO блок */}
        <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/30">
          <SeoTextExpandable text={optimizedSeoText} />
        </div>
      </main>
      <Footer />
      
      {/* Support Widget */}
      <SupportWidget />
      
      {/* Human-Like AI Assistant */}
      <HumanLikeAiAssistant />
    </>
  );
}
