
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
import { Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
CopyPro Cloud — современная SaaS-платформа для заказа текстов любого типа от команды из 30+ дипломированных SEO-копирайтеров. Мы специализируемся на создании уникального контента: SEO-статьи, тексты для лендингов, описания товаров, e-mail рассылки, посты для соцсетей и многое другое. 

Наша команда профессионалов:
- 30+ дипломированных копирайтеров с профильным образованием
- Опыт 5+ лет каждого из экспертов
- Все тексты проходят уникальность на Text.ru, предоставляем ссылки на проверки
- Строгая система контроля качества на каждом этапе

Почему выбирают CopyPro Cloud?
- Профессионалы с высшим образованием и SEO-экспертизой
- Гарантия уникальности 100% с выдачей отчетов и ссылок
- Многоуровневая система контроля качества
- Прозрачность процессов и персональные менеджеры
- SEO-оптимизация под индивидуальные задачи клиентов
- Поддерживаем IT, бизнес, маркетинг, медицину и другие сферы

Сделайте заказ прямо сейчас — и ваши идеи станут профессиональным текстом от SEO-экспертов!
`;

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        <Seo
          title="CopyPro Cloud — 30+ дипломированных SEO-копирайтеров, 100% уникальность"
          description="Профессиональная команда SEO-копирайтеров. Гарантия уникальности 100%, проверка на Text.ru, выдаём ссылки на каждую проверку. Заказать тексты — довериться экспертам!"
        />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="animate-fade-in">
            <HeroSection />
          </div>
          {/* Команда профессионалов */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TeamSection />
          </div>
          {/* Секция доверия и контроля качества */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TrustSection />
          </div>
          {/* Процесс работы */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <ProcessSection />
          </div>
          {/* Секция Преимущества */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <BenefitsSection />
          </div>
          {/* Premium Call to Action Section */}
          <section className="py-20 relative">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="relative bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary/20">
                    <Rocket className="w-5 h-5" />
                    CopyProCloud — только эксперты
                  </div>
                  <h3 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
                    Готовы к <span className="text-green-600">идеально уникальному</span> контенту?
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    Станьте клиентом №1 в отрасли — ваши тексты будут созданы дипломированными SEO-копирайтерами c официальной ссылкой на антиплагиат Text.ru!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" asChild className="group rounded-full px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                      <Link to="/order" className="flex items-center gap-2">
                        Заказать у профессионалов
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      30+ экспертов онлайн
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Секция Отзывы */}
          <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
            <TestimonialsSection />
          </div>
          {/* Секция Контакты */}
          <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <ContactSection />
          </div>
          {/* SEO-блок — информативный SEO-текст */}
          <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
