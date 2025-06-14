
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
import { ArrowRight, Target, Sparkles, Rocket, Shield, Award } from "lucide-react";

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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
        <Seo
          title="О нас — CopyPro Cloud | Команда из 30+ дипломированных SEO-копирайтеров"
          description="Познакомьтесь с командой элитных SEO-копирайтеров CopyPro Cloud. 30+ экспертов с высшим образованием, 5+ лет опыта, 100% уникальность Text.ru. Узнайте о наших принципах и подходе к работе."
        />

        {/* Ultra-Modern Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/12 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/8 via-orange-400/6 to-yellow-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Modern grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-4/5 w-4 h-4 bg-emerald-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="animate-fade-in">
            <AboutHeroSection />
          </div>

          {/* Mission & Values */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MissionSection />
          </div>

          {/* Team Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TeamSection />
          </div>

          {/* Trust Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <TrustSection />
          </div>

          {/* Revolutionary CTA Section */}
          <section className="py-32 relative overflow-hidden">
            {/* Ultra-modern background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-conic from-blue-400/25 via-purple-400/15 to-emerald-400/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-conic from-emerald-400/20 via-blue-400/15 to-purple-400/20 rounded-full blur-2xl animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }}></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-conic from-pink-400/15 via-orange-400/10 to-yellow-400/15 rounded-full blur-3xl animate-spin" style={{ animationDuration: '25s' }}></div>
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
              <div className="relative bg-gradient-to-br from-white/15 via-white/8 to-white/5 rounded-3xl p-20 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden">
                {/* Enhanced glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-400/15 via-blue-400/10 to-purple-400/15 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center">
                  {/* Ultra-modern floating badge */}
                  <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 text-white px-10 py-5 rounded-full text-lg font-bold mb-10 border border-white/30 shadow-2xl backdrop-blur-sm">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <Rocket className="w-7 h-7 text-emerald-400" />
                    Готовы работать с лучшими?
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <h3 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-10 leading-tight tracking-tight">
                    Начните с нами <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">уже сегодня</span>
                  </h3>
                  
                  <p className="text-2xl md:text-3xl text-white/90 mb-14 max-w-5xl mx-auto leading-relaxed font-medium">
                    Присоединяйтесь к сотням довольных клиентов и получите премиальный контент от настоящих профессионалов
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
                    <Button 
                      size="lg" 
                      asChild 
                      className="group relative rounded-full px-16 py-8 text-2xl font-bold shadow-2xl transition-all duration-700 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 border-0 hover:scale-110 hover:-translate-y-3 hover:shadow-emerald-500/30"
                    >
                      <Link to="/order" className="flex items-center gap-4 relative z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-sm"></div>
                        <Target className="w-7 h-7" />
                        Заказать тексты
                        <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-300" />
                      </Link>
                    </Button>
                    
                    <div className="flex items-center gap-4 text-lg text-white/80 bg-white/10 px-10 py-5 rounded-full border border-white/20 backdrop-blur-sm">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                      <Sparkles className="w-6 h-6" />
                      30+ экспертов готовы к работе
                    </div>
                  </div>
                  
                  {/* Ultra-enhanced trust indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="flex items-center justify-center gap-4 text-emerald-300 font-bold text-lg bg-emerald-500/15 px-8 py-4 rounded-2xl border border-emerald-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                      <Shield className="w-6 h-6" />
                      <span>100% гарантия качества</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-blue-300 font-bold text-lg bg-blue-500/15 px-8 py-4 rounded-2xl border border-blue-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                      <Sparkles className="w-6 h-6" />
                      <span>Премиальный сервис</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-purple-300 font-bold text-lg bg-purple-500/15 px-8 py-4 rounded-2xl border border-purple-400/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                      <Award className="w-6 h-6" />
                      <span>Команда экспертов</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Text */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
