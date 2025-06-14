
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const seoText = `
CopyPro Cloud — современная SaaS-платформа для заказа текстов любого типа: SEO-статьи, тексты для лендингов, описания товаров, e-mail рассылки, посты для соцсетей и многое другое. Наш сервис предоставляет профессиональных копирайтеров, актуальные стандарты контента и гибкие возможности для бизнеса любого размера.

Почему выбирают CopyPro Cloud?
- Быстрое выполнение заказов от опытных авторов.
- Контроль качества и SEO-оптимизация под задачи клиента.
- Поддержка множества тематик: IT, бизнес, маркетинг и другие.
- Личный кабинет и автоматизация процесса заказа контента.

Сделайте заказ прямо сейчас — и ваши идеи станут профессиональным текстом!
`;

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col pb-8 animate-fade-in">
        <Seo
          title="CopyPro Cloud — SaaS-платформа для копирайтинга"
          description="Платформа для заказа текстов: статьи, тексты для сайтов, продающие лендинги, быстро и профессионально. Копирайтеры, SEO-оптимизация, контроль качества!"
        />
        {/* Hero Section */}
        <HeroSection />

        {/* Секция "Преимущества" */}
        <BenefitsSection />

        {/* Быстрый call to action */}
        <section className="container max-w-3xl mx-auto mt-12 flex flex-col items-center gap-4 px-4">
          <div className="inline-flex items-center gap-2 p-1 px-4 rounded-full bg-muted/60 text-base">
            <Rocket className="w-5 h-5 text-primary" />
            Платформа №1 для заказа текстов онлайн
          </div>
          <h3 className="text-2xl font-playfair font-bold text-primary/90 text-center mt-2 mb-2">
            Готовы к новому уровню контента?
          </h3>
          <Button size="lg" asChild className="rounded-full px-8 py-5 mt-2 text-base md:text-lg shadow-lg hover-scale">
            <Link to="/order">Попробовать сейчас</Link>
          </Button>
        </section>

        {/* Секция "Отзывы" */}
        <TestimonialsSection />

        {/* Секция "Контакты" */}
        <ContactSection />

        {/* SEO-блок — информативный SEO-текст */}
        <section className="mt-12 max-w-3xl mx-auto bg-muted/40 rounded-xl p-6 mb-10 shadow text-base text-muted-foreground leading-relaxed border border-primary/10">
          <h2 className="text-xl font-bold mb-3 text-primary/80">CopyPro Cloud — экспертные тексты под ваши задачи</h2>
          <div className="whitespace-pre-line">{seoText}</div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;

