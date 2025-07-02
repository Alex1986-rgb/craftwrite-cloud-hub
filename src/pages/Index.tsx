
import UniversalOrderSection from "@/components/landing/UniversalOrderSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CompactFaqSection from "@/components/landing/CompactFaqSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";


import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import CompactSocialProofSection from "@/components/landing/CompactSocialProofSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import SmartOrderCTA from "@/components/landing/SmartOrderCTA";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import EnhancedFooter from "@/components/common/EnhancedFooter";
import FloatingChatButton from "@/components/enhanced/FloatingChatButton";
import PWAInstallPrompt from "@/components/common/PWAInstallPrompt";
import { useEnhancedAnalytics } from "@/hooks/useEnhancedAnalytics";
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
      
      {/* 1. КОМПАКТНЫЙ HERO - выше сгиба */}
      <ModernHeroSection />
      
      {/* 2. ЕДИНАЯ ФОРМА ЗАКАЗА - основное действие */}
      <section id="order">
        <UniversalOrderSection />
      </section>
      
      {/* 3. СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО + ГАРАНТИИ - объединено */}
      <CompactSocialProofSection />
      <InteractiveGuaranteesSection />
      
      {/* 4. КАК МЫ РАБОТАЕМ - упрощенный процесс */}
      <ProcessSection />
      
      {/* 5. КОМПАКТНЫЕ FAQ - только ключевые */}
      <CompactFaqSection />
      
      {/* 6. ФИНАЛЬНЫЙ КОНТАКТ */}
      <ContactSection />
      
      {/* ПОДДЕРЖКА И AI */}
      <SupportWidget />
      <HumanLikeAiAssistant />
      <FloatingChatButton />
      <PWAInstallPrompt />
      
      <EnhancedFooter />
      
      {/* SEO TEXT - перенесен в подвал */}
      <div className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-8">
          <SeoTextExpandable text={seoText} />
        </div>
      </div>
    </main>
  );
}
