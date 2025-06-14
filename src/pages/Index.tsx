
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
      </main>
      <Footer />
    </>
  );
};

export default Index;
