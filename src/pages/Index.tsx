
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import HeroSection from "@/components/landing/HeroSection";
import ProfessionalStatsSection from "@/components/landing/ProfessionalStatsSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import ProcessSection from "@/components/landing/ProcessSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Sparkles, Target, Shield, Award, Zap } from "lucide-react";
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        <Seo
          title="CopyPro Cloud — Элитная команда из 30+ дипломированных SEO-копирайтеров | 100% уникальность Text.ru"
          description="Профессиональная команда элитных SEO-копирайтеров с высшим образованием. Гарантия уникальности 100%, официальные проверки Text.ru, ссылки на каждую проверку. Заказать premium тексты от экспертов!"
        />

        {/* Enhanced Modern Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/10 via-orange-400/8 to-yellow-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Modern grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-emerald-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section with enhanced animations */}
          <div className="animate-fade-in">
            <HeroSection />
          </div>

          {/* Professional Stats Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ProfessionalStatsSection />
          </div>

          {/* Team Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <TeamSection />
          </div>

          {/* Trust Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <TrustSection />
          </div>

          {/* Process Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <ProcessSection />
          </div>

          {/* Benefits Section */}
          <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
            <BenefitsSection />
          </div>

          {/* Premium Call to Action Section - Completely Redesigned */}
          <section className="py-32 relative overflow-hidden">
            {/* Ultra-modern background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-conic from-blue-400/20 via-purple-400/10 to-pink-400/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-conic from-emerald-400/15 via-blue-400/10 to-purple-400/15 rounded-full blur-2xl animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl p-16 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center">
                  {/* Floating badge with modern design */}
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 text-white px-8 py-4 rounded-full text-base font-bold mb-8 border border-white/30 shadow-2xl backdrop-blur-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                    CopyPro Cloud — Элитное качество
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  
                  <h3 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
                    Готовы к <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">революции</span> в контенте?
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                    Присоединяйтесь к лидерам отрасли — ваши тексты создадут дипломированные SEO-эксперты с гарантированными ссылками на проверки Text.ru!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                    <Button 
                      size="lg" 
                      asChild 
                      className="group relative rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all duration-700 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 border-0 hover:scale-110 hover:-translate-y-2 hover:shadow-emerald-500/25"
                    >
                      <Link to="/order" className="flex items-center gap-3 relative z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-sm"></div>
                        <Target className="w-6 h-6" />
                        Заказать у элитных экспертов
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </Button>
                    
                    <div className="flex items-center gap-3 text-base text-white/70 bg-white/10 px-8 py-4 rounded-full border border-white/20 backdrop-blur-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      30+ экспертов готовы к работе
                    </div>
                  </div>
                  
                  {/* Enhanced trust indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 text-emerald-300 font-semibold bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
                      <Shield className="w-5 h-5" />
                      <span>100% уникальность гарантирована</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-blue-300 font-semibold bg-blue-500/10 px-6 py-3 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                      <Zap className="w-5 h-5" />
                      <span>Ссылки на проверки Text.ru</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-purple-300 font-semibold bg-purple-500/10 px-6 py-3 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                      <Award className="w-5 h-5" />
                      <span>Дипломированные эксперты</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <TestimonialsSection />
          </div>

          {/* Contact Section */}
          <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <ContactSection />
          </div>

          {/* SEO Text */}
          <div className="animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
