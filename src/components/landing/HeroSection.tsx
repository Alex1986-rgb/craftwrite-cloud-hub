
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, BadgeCheck, Users, Star, Award } from "lucide-react";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center pt-32 pb-28 px-4 bg-gradient-to-br from-background via-primary/5 to-purple-500/10 overflow-hidden">
    {/* Enhanced background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[15%] left-1/4 w-80 h-80 bg-gradient-to-r from-primary/20 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/15 to-pink-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-bounce animation-delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-bounce animation-delay-1500"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-500/30 rounded-full animate-bounce animation-delay-700"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* Premium trust badges */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Users className="w-5 h-5" />
          30+ дипломированных SEO-экспертов
        </div>
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-green-100 to-green-50 border border-green-200 text-green-700 font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <BadgeCheck className="w-5 h-5 text-green-600" />
          100% уникальность Text.ru
        </div>
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-700 font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Award className="w-5 h-5 text-amber-600" />
          2000+ проектов
        </div>
      </div>

      {/* Main heading with enhanced typography */}
      <h1 className="text-6xl md:text-8xl font-playfair font-black leading-none mb-8 tracking-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <span className="block bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 transition-all duration-500">
          CopyPro Cloud
        </span>
        <span className="text-foreground/90 text-3xl md:text-4xl font-medium block mt-6 leading-tight">
          Элитная платформа <br />
          <span className="text-primary font-bold">профессионального SEO-копирайтинга</span>
        </span>
      </h1>

      {/* Enhanced subtitle */}
      <div className="max-w-4xl mx-auto mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium leading-relaxed">
          Создаём <span className="text-primary font-bold">эксклюзивный контент</span> силами команды из 30+ дипломированных SEO-копирайтеров
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 text-lg">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <Star className="w-5 h-5 fill-current" />
            Антиплагиат Text.ru
          </div>
          <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <Award className="w-5 h-5" />
            Гарантия качества
          </div>
          <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
          <div className="flex items-center gap-2 text-purple-600 font-semibold">
            <Users className="w-5 h-5" />
            Профильное образование
          </div>
        </div>
      </div>

      {/* Enhanced CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <Button 
          size="lg" 
          className="group px-12 py-7 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-r from-primary via-purple-600 to-blue-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 border-0 hover:scale-105 hover:-translate-y-1" 
          asChild
        >
          <Link to="/order" className="flex items-center gap-3">
            Заказать у профессионалов
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="group px-12 py-7 rounded-full text-xl font-bold hover:bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-xl"
        >
          <Play className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform duration-300" />
          Портфолио работ
        </Button>
      </div>

      {/* Enhanced trust indicators */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="text-sm text-muted-foreground/80 mb-6 font-medium">Доверие профессионалов — наша репутация:</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="font-black text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">2000+</span>
            <span className="text-sm ml-2 text-muted-foreground font-medium">проектов</span>
          </div>
          <div className="group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="font-black text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">100%</span>
            <span className="text-sm ml-2 text-muted-foreground font-medium">уникальность*</span>
          </div>
          <div className="group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">30+</span>
            <span className="text-sm ml-2 text-muted-foreground font-medium">экспертов</span>
          </div>
          <div className="group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="font-black text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24ч</span>
            <span className="text-sm ml-2 text-muted-foreground font-medium">от заказа</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/60 mt-4 italic">*Официальные ссылки на проверки Text.ru прилагаются к каждому заказу</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
