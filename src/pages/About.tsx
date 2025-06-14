
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MissionSection from "@/components/about/MissionSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Sparkles } from "lucide-react";

const seoText = `
CopyPro Cloud — команда элитных SEO-копирайтеров с высшим образованием и многолетним опытом. 
Мы создаем эксклюзивный контент для бизнеса любого масштаба: от стартапов до крупных корпораций.

О нашей команде:
- 30+ дипломированных специалистов с профильным образованием
- Средний опыт каждого эксперта — 5+ лет в SEO-копирайтинге  
- Строгий отбор: менее 5% кандидатов становятся частью команды
- Узкая специализация по тематикам и форматам контента
- Постоянное обучение и изучение новых SEO-тенденций

Наши принципы работы:
- Экспертность: только профессионалы с образованием и опытом
- Качество: 100% уникальность с предоставлением ссылок на проверки Text.ru  
- Скорость: быстрое выполнение заказов от 24 часов без потери качества
- Прозрачность: полная отчетность по каждому этапу работы
- Ответственность: гарантия правок и доработок по вашим пожеланиям

Доверьте свой контент профессионалам — выберите CopyPro Cloud!
`;

const About = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background relative overflow-hidden">
        <Seo
          title="О нас — CopyPro Cloud | Команда из 30+ дипломированных SEO-копирайтеров"
          description="Познакомьтесь с командой элитных SEO-копирайтеров CopyPro Cloud. 30+ экспертов с высшим образованием, 5+ лет опыта, 100% уникальность Text.ru. Узнайте о наших принципах и подходе к работе."
        />

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="animate-fade-in">
            <AboutHeroSection />
          </div>

          {/* Mission & Values */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <MissionSection />
          </div>

          {/* Team Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <TeamSection />
          </div>

          {/* Trust Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <TrustSection />
          </div>

          {/* Enhanced CTA Section */}
          <section className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/3 to-blue-500/5"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
            </div>

            <div className="container max-w-5xl mx-auto px-4 relative z-10">
              <div className="relative bg-gradient-to-br from-card/95 via-card/90 to-card/85 rounded-3xl p-16 border border-primary/20 backdrop-blur-lg shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/15 to-purple-500/10 text-primary px-8 py-4 rounded-full text-base font-bold mb-8 border border-primary/30 shadow-lg">
                    <Sparkles className="w-6 h-6" />
                    Готовы работать с лучшими?
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-playfair font-black bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 leading-tight">
                    Начните с нами уже сегодня
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
                    Присоединяйтесь к сотням довольных клиентов и получите премиальный контент от настоящих профессионалов
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button 
                      size="lg" 
                      asChild 
                      className="group rounded-full px-12 py-7 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-r from-primary via-purple-600 to-blue-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 hover:scale-105 hover:-translate-y-1"
                    >
                      <Link to="/order" className="flex items-center gap-3">
                        <Target className="w-6 h-6" />
                        Заказать тексты
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Text */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
