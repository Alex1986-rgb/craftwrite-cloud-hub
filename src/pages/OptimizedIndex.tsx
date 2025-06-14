
import OptimizedHeader from "@/components/common/OptimizedHeader";
import Footer from "@/components/common/Footer";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import LazySection from "@/components/common/LazySection";
import SectionSkeleton from "@/components/common/SectionSkeleton";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import SupportWidget from "@/components/common/SupportWidget";
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

export default function OptimizedIndex() {
  return (
    <>
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
    </>
  );
}
