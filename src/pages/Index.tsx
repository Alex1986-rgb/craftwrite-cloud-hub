
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import HeroSection from "@/components/landing/HeroSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import ProcessSection from "@/components/landing/ProcessSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
CopyPro Cloud — современная SaaS-платформа для заказа текстов любого типа от команды из 30+ дипломированных SEO-копирайтеров. Мы специализируемся на создании уникального контента: SEO-статьи, тексты для лендингов, описания товаров, e-mail рассылки, посты для соцсетей и многое другое. 

Наша команда профессионалов:
- 30+ дипломированных копирайтеров с профильным образованием
- Средний опыт работы более 5 лет в SEO-копирайтинге
- Строгая система контроля качества на каждом этапе
- 100% уникальность текстов с проверкой на Text.ru и предоставлением ссылок

Почему выбирают CopyPro Cloud?
- Профессиональная команда с высшим образованием в области журналистики и филологии
- Гарантия уникальности 95-100% с отчетами о проверке
- Многоуровневая система контроля качества
- Персональные менеджеры и прозрачный процесс работы
- SEO-оптимизация под конкретные задачи клиента
- Поддержка множества тематик: IT, бизнес, маркетинг, медицина и другие

Сделайте заказ прямо сейчас — и ваши идеи станут профессиональным текстом от экспертов!
`;

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col pb-8 animate-fade-in">
        <Seo
          title="CopyPro Cloud — 30+ дипломированных SEO-копирайтеров, 100% уникальность"
          description="Профессиональная команда из 30+ дипломированных копирайтеров. Гарантия уникальности 95-100%, проверка на Text.ru, ссылки на все проверки. Заказать тексты от экспертов!"
        />
        {/* Hero Section */}
        <HeroSection />

        {/* Команда профессионалов */}
        <TeamSection />

        {/* Секция доверия и контроля качества */}
        <TrustSection />

        {/* Процесс работы */}
        <ProcessSection />

        {/* Секция "Преимущества" */}
        <BenefitsSection />

        {/* Быстрый call to action */}
        <section className="container max-w-3xl mx-auto mt-12 flex flex-col items-center gap-4 px-4">
          <div className="inline-flex items-center gap-2 p-1 px-4 rounded-full bg-muted/60 text-base">
            <Rocket className="w-5 h-5 text-primary" />
            Платформа №1 для заказа текстов от профессионалов
          </div>
          <h3 className="text-2xl font-playfair font-bold text-primary/90 text-center mt-2 mb-2">
            Готовы к новому уровню контента от экспертов?
          </h3>
          <Button size="lg" asChild className="rounded-full px-8 py-5 mt-2 text-base md:text-lg shadow-lg hover-scale">
            <Link to="/order">Заказать у профессионалов</Link>
          </Button>
        </section>

        {/* Секция "Отзывы" */}
        <TestimonialsSection />

        {/* Секция "Контакты" */}
        <ContactSection />

        {/* SEO-блок — информативный SEO-текст */}
        <SeoTextExpandable text={seoText} />

      </main>
      <Footer />
    </>
  );
};

export default Index;
