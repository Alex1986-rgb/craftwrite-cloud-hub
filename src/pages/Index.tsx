
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import InnovativePortfolioSection from "@/components/landing/InnovativePortfolioSection";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import CompactSocialProofSection from "@/components/landing/CompactSocialProofSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import SmartOrderCTA from "@/components/landing/SmartOrderCTA";
import ExpertiseSection from "@/components/landing/ExpertiseSection";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import EnhancedFooter from "@/components/common/EnhancedFooter";
import FloatingChatButton from "@/components/enhanced/FloatingChatButton";
import PWAInstallPrompt from "@/components/common/PWAInstallPrompt";
import { useEnhancedAnalytics } from "@/hooks/useEnhancedAnalytics";
import { useEffect } from "react";

const seoText = `
CopyPro Cloud — узкоспециализированная студия SEO-копирайтинга и продающего контента с командой из 15+ экспертов.

Наша экспертиза и специализация:
- SEO-копирайтинг: 5+ лет опыта, сертификация Google, 1000+ статей в ТОП-10
- Продающие лендинги: конверсия до 15%, 300+ проектов, профессиональное A/B-тестирование  
- Email-маркетинг: автоматизация, сегментация, рост retention на 60%
- Маркетплейс-контент: специализация на Wildberries/Ozon, товары в ТОП-3 поиска

Мы НЕ универсалы. Мы эксперты в трёх направлениях:
✓ SEO-статьи для роста органического трафика
✓ Продающие лендинги и email-воронки  
✓ Карточки товаров для маркетплейсов

Результаты наших клиентов:
- Рост органического трафика на 120-300% за 6 месяцев
- Увеличение конверсии лендингов на 40-180%
- Попадание товаров в ТОП-3 поиска на маркетплейсах
- ROI контент-маркетинга 300-800%

Выберите экспертов, а не универсалов. Закажите на CopyPro Cloud!
`;

export default function Index() {
  const { trackEvent } = useEnhancedAnalytics();

  useEffect(() => {
    // Track landing page view with additional context
    trackEvent({
      action: 'landing_page_view',
      category: 'Page View',
      label: 'Home Page',
      custom_parameters: {
        page_type: 'landing',
        user_type: 'anonymous'
      }
    });
  }, [trackEvent]);

  return (
    <main className="relative overflow-hidden">
      <UnifiedHeader />
      
      {/* 1. HERO SECTION - Above the fold */}
      <ModernHeroSection />
      
      {/* 2. SOCIAL PROOF - Immediate credibility */}
      <CompactSocialProofSection />
      
      {/* 3. EXPERTISE - Positioning as experts, not generalists */}
      <ExpertiseSection />
      
      {/* 4. CORE SERVICES - Only top 4 services */}
      <ServicesCatalogSection />
      
      {/* 5. SMART ORDER CTA - After services */}
      <SmartOrderCTA />
      
      {/* 6. GUARANTEES - Remove risk and build confidence */}
      <InteractiveGuaranteesSection />
      
      {/* 7. PRICING - Clear value proposition */}
      <ModernPricingSection />
      
      {/* 8. PORTFOLIO - Proof of results */}
      <InnovativePortfolioSection />
      
      {/* 9. FAQ - Address concerns */}
      <FaqSection />
      
      {/* 10. FINAL CTA & CONTACT */}
      <ContactSection />
      
      {/* 13. SEO TEXT - Search engine optimization */}
      <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-slate-50/50 to-transparent">
        <SeoTextExpandable text={seoText} />
      </div>
      
      {/* SUPPORT WIDGETS */}
      <SupportWidget />
      <HumanLikeAiAssistant />
      <FloatingChatButton />
      <PWAInstallPrompt />
      
      <EnhancedFooter />
    </main>
  );
}
