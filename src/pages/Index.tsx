
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import InnovativePortfolioSection from "@/components/landing/InnovativePortfolioSection";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import FutureHeroSection from "@/components/landing/FutureHeroSection";
import CompactSocialProofSection from "@/components/landing/CompactSocialProofSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import SmartOrderCTA from "@/components/landing/SmartOrderCTA";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import EnhancedFooter from "@/components/common/EnhancedFooter";
import FloatingChatButton from "@/components/enhanced/FloatingChatButton";
import PWAInstallPrompt from "@/components/common/PWAInstallPrompt";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const seoText = `
CopyPro Cloud — ведущая платформа профессионального копирайтинга в России и СНГ с командой из 50+ сертифицированных экспертов.

Наши ключевые преимущества:
- Команда из 50+ дипломированных SEO-копирайтеров с опытом 5+ лет
- Гарантия 100% уникальности по Text.ru с официальными отчетами
- Экспресс-доставка от 24 часов с сохранением качества
- Глубокая SEO-оптимизация с анализом ТОП-10 конкурентов
- Более 2000 успешных проектов с ростом конверсии клиентов на 40-180%

Полная экосистема контент-маркетинга:
- SEO-статьи и органическое продвижение
- Продающие лендинги и email-воронки
- Контент для соцсетей и мессенджеров
- Описания товаров для маркетплейсов
- Корпоративный и B2B контент

Результаты наших клиентов:
- Рост органического трафика на 120-300% за 6 месяцев
- Увеличение конверсии лендингов на 40-180%
- ROI контент-маркетинга 300-800%

Закажите профессиональный копирайтинг на CopyPro Cloud!
`;

export default function Index() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track landing page view with additional context
    trackEvent({
      action: 'landing_page_view',
      category: 'Page View',
      label: 'Home Page - Future Design',
      custom_parameters: {
        page_type: 'landing',
        user_type: 'anonymous',
        design_version: 'future_v1'
      }
    });
  }, [trackEvent]);

  return (
    <main className="relative overflow-hidden font-primary">
      <UnifiedHeader />
      
      {/* 1. REVOLUTIONARY HERO SECTION */}
      <FutureHeroSection />
      
      {/* 2. SOCIAL PROOF - Enhanced with glass design */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50/30">
        <CompactSocialProofSection />
      </div>
      
      {/* 3. SMART ORDER CTA #1 - Floating glass design */}
      <SmartOrderCTA />
      
      {/* 4. SERVICES - Modern card layout */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <ServicesCatalogSection />
      </div>
      
      {/* 5. PRICING - Neo-morphism design */}
      <div className="py-20 bg-gradient-to-br from-blue-50/30 to-purple-50/20">
        <ModernPricingSection />
      </div>
      
      {/* 6. SMART ORDER CTA #2 */}
      <SmartOrderCTA />
      
      {/* 7. GUARANTEES - Interactive glass cards */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <InteractiveGuaranteesSection />
      </div>
      
      {/* 8. PORTFOLIO - 3D hover effects */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50/30">
        <InnovativePortfolioSection />
      </div>
      
      {/* 9. PROCESS - Timeline with animations */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <ProcessSection />
      </div>
      
      {/* 10. FAQ - Accordion with modern design */}
      <div className="py-20 bg-gradient-to-br from-purple-50/20 to-pink-50/20">
        <FaqSection />
      </div>
      
      {/* 11. FINAL CTA */}
      <SmartOrderCTA />
      
      {/* 12. CONTACT - Glass morphism design */}
      <ContactSection />
      
      {/* 13. SEO TEXT - Modern expandable */}
      <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50/50 to-transparent">
        <div className="glass-card-modern max-w-4xl mx-auto">
          <SeoTextExpandable text={seoText} />
        </div>
      </div>
      
      {/* SUPPORT WIDGETS - Enhanced with modern design */}
      <SupportWidget />
      <HumanLikeAiAssistant />
      <FloatingChatButton />
      <PWAInstallPrompt />
      
      <EnhancedFooter />
    </main>
  );
}
