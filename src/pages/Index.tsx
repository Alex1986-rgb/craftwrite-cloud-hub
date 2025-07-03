
import { useState, useEffect } from "react";
import SimplifiedOrderSection from "@/components/landing/SimplifiedOrderSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CompactFaqSection from "@/components/landing/CompactFaqSection";
import ContactSection from "@/components/landing/ContactSection";
import EnhancedTrustSection from "@/components/landing/EnhancedTrustSection";
import OptimizedPaymentInfo from "@/components/landing/OptimizedPaymentInfo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import RichArticleSection from "@/components/blog/RichArticleSection";
import { homePageArticles } from "@/data/articles/homePageArticles";

import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import ProfessionalHeroSection from "@/components/landing/ProfessionalHeroSection";
import BulkSeoShowcaseSection from "@/components/landing/BulkSeoShowcaseSection";
import TechShowcaseSection from "@/components/landing/TechShowcaseSection";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import EnhancedFooter from "@/components/common/EnhancedFooter";
import FloatingChatButton from "@/components/enhanced/FloatingChatButton";
import PWAInstallPrompt from "@/components/common/PWAInstallPrompt";
import { useEnhancedAnalytics } from "@/hooks/useEnhancedAnalytics";

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
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
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
      
      {/* 1. PROFESSIONAL HERO */}
      <ProfessionalHeroSection />
      
      {/* 2. BULK SEO SHOWCASE */}
      <BulkSeoShowcaseSection />
      
      {/* 3. TECH SHOWCASE */}
      <TechShowcaseSection />
      
      {/* 4. УПРОЩЕННАЯ ФОРМА ЗАКАЗА */}
      <section id="order">
        <SimplifiedOrderSection selectedService={selectedService} />
      </section>
      
      {/* 5. ДОВЕРИЕ И РЕЗУЛЬТАТЫ */}
      <EnhancedTrustSection />
      
      {/* 6. ИНФОРМАЦИЯ ОБ ОПЛАТЕ */}
      <OptimizedPaymentInfo />
      
      {/* 7. ПРОЦЕСС РАБОТЫ */}
      <ProcessSection />
      
      {/* 8. FAQ */}
      <CompactFaqSection />
      
      {/* 9. КОНТАКТЫ */}
      <ContactSection />
      
      {/* 9. ЭКСПЕРТНЫЕ СТАТЬИ */}
      <RichArticleSection 
        articles={homePageArticles}
        sectionTitle="Экспертные материалы по копирайтингу"
        sectionDescription="Проверенные стратегии и кейсы от ведущих специалистов CopyPro Cloud"
      />
      
      {/* ПОДДЕРЖКА И AI */}
      <SupportWidget />
      <HumanLikeAiAssistant />
      <FloatingChatButton />
      <PWAInstallPrompt />
      
      <EnhancedFooter />
      
      {/* SEO TEXT */}
      <div className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-8">
          <SeoTextExpandable text={seoText} />
        </div>
      </div>
    </main>
  );
}
