
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import InteractiveStatsSection from "@/components/landing/InteractiveStatsSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import ProcessSection from "@/components/landing/ProcessSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Sparkles, Target, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
CopyPro Cloud — элитная SaaS-платформа для заказа профессиональных текстов от команды из 30+ дипломированных SEO-копирайтеров. Мы специализируемся на создании эксклюзивного контента высочайшего качества: SEO-статьи, тексты для лендингов, описания товаров, e-mail рассылки, посты для соцсетей и многое другое.

Наша команда элитных профессионалов:
- 30+ дипломированных копирайтеров с профильным высшим образованием
- Средний опыт каждого эксперта 5+ лет в SEO-копирайтинге
- Все тексты проходят строгую проверку уникальности на Text.ru
- Предоставляем официальные ссылки на проверки к каждому заказу
- Многоуровневая система контроля качества на каждом этапе

Почему выбирают CopyPro Cloud?
- Элитные профессионалы с высшим образованием и глубокой SEO-экспертизой
- Абсолютная гарантия уникальности 100% с выдачей официальных отчетов
- Прозрачная многоуровневая система контроля качества
- Полная прозрачность процессов и персональные менеджеры проектов
- Индивидуальная SEO-оптимизация под уникальные задачи клиентов
- Экспертиза в IT, бизнесе, маркетинге, медицине и других сложных сферах

Доверьте создание контента профессионалам — закажите тексты от SEO-экспертов CopyPro Cloud!
`;

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        <Seo
          title="CopyPro Cloud — Элитная команда из 30+ дипломированных SEO-копирайтеров | 100% уникальность Text.ru"
          description="Профессиональная команда элитных SEO-копирайтеров с высшим образованием. Гарантия уникальности 100%, официальные проверки Text.ru, ссылки на каждую проверку. Заказать premium тексты от экспертов!"
        />

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-primary/5 to-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/3 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-cyan-500/3 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          {/* Enhanced grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="relative z-10">
          {/* Modern Hero Section */}
          <div className="animate-fade-in">
            <ModernHeroSection />
          </div>

          {/* Interactive Stats Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <InteractiveStatsSection />
          </div>

          {/* Команда профессионалов */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TeamSection />
          </div>

          {/* Секция доверия и контроля качества */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <TrustSection />
          </div>

          {/* Процесс работы */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <ProcessSection />
          </div>

          {/* Секция Преимущества */}
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <BenefitsSection />
          </div>

          {/* Enhanced Premium Call to Action Section */}
          <section className="py-28 relative overflow-hidden">
            {/* Advanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-purple-500/2 to-blue-500/3"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-primary/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/8 to-transparent rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
              <div className="relative bg-gradient-to-br from-card/95 via-card/90 to-card/85 rounded-3xl p-16 border border-primary/20 backdrop-blur-lg shadow-2xl overflow-hidden hover-glow">
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/15 to-purple-500/10 text-primary px-8 py-4 rounded-full text-base font-bold mb-8 border border-primary/30 shadow-lg hover-scale">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    CopyPro Cloud — Элитное качество нового уровня
                  </div>
                  
                  <h3 className="text-5xl md:text-7xl font-playfair font-black text-elite-gradient mb-8 leading-tight hover-scale">
                    Готовы к <span className="text-green-600">революционному</span> контенту?
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
                    Присоединяйтесь к лидерам цифрового рынка — ваши тексты создадут дипломированные SEO-эксперты 
                    с гарантированными ссылками на проверки Text.ru и полной отчетностью!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                    <Button 
                      size="lg" 
                      asChild 
                      className="btn-elite text-xl px-16 py-8 rounded-full relative overflow-hidden group"
                    >
                      <Link to="/order" className="flex items-center gap-4">
                        <Target className="w-7 h-7 relative z-10" />
                        <span className="relative z-10">Заказать у элитных экспертов</span>
                        <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-300 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </Link>
                    </Button>
                    
                    <div className="flex items-center gap-4 text-base text-muted-foreground bg-glass px-8 py-4 rounded-full border border-border/50 hover-scale">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
                      </div>
                      <span className="font-medium">30+ экспертов готовы к работе</span>
                    </div>
                  </div>
                  
                  {/* Enhanced trust indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
                    <div className="flex items-center justify-center gap-3 text-green-600 font-semibold bg-green-50 px-6 py-3 rounded-full border border-green-200">
                      <Star className="w-4 h-4 fill-current" />
                      100% уникальность гарантирована
                    </div>
                    <div className="flex items-center justify-center gap-3 text-blue-600 font-semibold bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
                      <Shield className="w-4 h-4" />
                      Ссылки на проверки Text.ru
                    </div>
                    <div className="flex items-center justify-center gap-3 text-purple-600 font-semibold bg-purple-50 px-6 py-3 rounded-full border border-purple-200">
                      <Award className="w-4 h-4" />
                      Дипломированные эксперты
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Секция Отзывы */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <TestimonialsSection />
          </div>

          {/* Секция Контакты */}
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <ContactSection />
          </div>

          {/* SEO-блок — информативный SEO-текст */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
