
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
  return (
    <main className="relative overflow-hidden">
      {/* 1. HERO SECTION - Above the fold */}
      <ModernHeroSection />
      
      {/* 2. SOCIAL PROOF - Immediate credibility */}
      <CompactSocialProofSection />
      
      {/* 3. SERVICES - What we offer */}
      <ServicesCatalogSection />
      
      {/* 4. PRICING - Clear value proposition */}
      <ModernPricingSection />
      
      {/* 5. GUARANTEES - Remove risk and build confidence */}
      <InteractiveGuaranteesSection />
      
      {/* 6. PORTFOLIO - Proof of results */}
      <InnovativePortfolioSection />
      
      {/* 7. HOW IT WORKS - Simple process */}
      <ProcessSection />
      
      {/* 8. FAQ - Address concerns */}
      <FaqSection />
      
      {/* 9. FINAL CTA & CONTACT */}
      <ContactSection />
      
      {/* 10. SEO TEXT - Search engine optimization */}
      <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-slate-50/50 to-transparent">
        <SeoTextExpandable text={seoText} />
      </div>
      
      {/* SUPPORT WIDGETS */}
      <SupportWidget />
      <HumanLikeAiAssistant />
    </main>
  );
}
