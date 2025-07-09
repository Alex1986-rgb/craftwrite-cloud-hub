
import { useState, useEffect } from "react";
import CoreServicesSection from "@/components/landing/CoreServicesSection";
import SimplifiedOrderSection from "@/components/landing/SimplifiedOrderSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CompactFaqSection from "@/components/landing/CompactFaqSection";
import ModernContactSection from "@/components/landing/ModernContactSection";
import EnhancedTrustSection from "@/components/landing/EnhancedTrustSection";
import OptimizedPaymentInfo from "@/components/landing/OptimizedPaymentInfo";
import ModernSeoSection from "@/components/landing/ModernSeoSection";
import RichArticleSection from "@/components/blog/RichArticleSection";
import { homePageArticles } from "@/data/articles/homePageArticles";

import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import SmartOrderSection from "@/components/landing/SmartOrderSection";
import AnimatedStatsSection from "@/components/landing/AnimatedStatsSection";
import CleanProcessSection from "@/components/landing/CleanProcessSection";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import ModernFooter from "@/components/common/ModernFooter";
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
    <main className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
      <UnifiedHeader />
      
      {/* Hero Section */}
      <ModernHeroSection />
      
      {/* Order Section */}
      <SmartOrderSection />
      
      {/* Stats & Trust */}
      <AnimatedStatsSection />
      
      {/* Process Overview */}
      <CleanProcessSection />
      
      {/* Payment Information */}
      <OptimizedPaymentInfo />
      
      {/* FAQ */}
      <CompactFaqSection />
      
      {/* Expert Articles */}
      <RichArticleSection 
        articles={homePageArticles}
        sectionTitle="Экспертные материалы по копирайтингу"
        sectionDescription="Проверенные стратегии и кейсы от ведущих специалистов CopyPro Cloud"
      />
      
      {/* Contact */}
      <ModernContactSection />
      
      {/* Support & AI */}
      <SupportWidget />
      <HumanLikeAiAssistant />
      <FloatingChatButton />
      <PWAInstallPrompt />
      
      {/* SEO Content */}
      <ModernSeoSection />
      
      <ModernFooter />
    </main>
  );
}
