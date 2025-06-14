
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, CheckCircle, Star } from "lucide-react";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
    {/* Enhanced background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* Trust indicators */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-lg">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">30+ экспертов</span>
        </div>
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-lg">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">100% уникальность</span>
        </div>
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-lg">
          <CheckCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">2000+ проектов</span>
        </div>
      </div>

      {/* Main heading with enhanced typography */}
      <h1 className="text-5xl md:text-7xl font-playfair font-extrabold leading-tight mb-8 tracking-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
          CopyPro Cloud
        </span>
        <br />
        <span className="text-foreground/90 text-4xl md:text-5xl block mt-4">
          SaaS-платформа для полного управления копирайтингом
        </span>
      </h1>

      {/* Enhanced subtitle */}
      <p className="text-xl md:text-2xl text-muted-foreground text-center mb-10 max-w-3xl mx-auto font-medium leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        Профессиональная команда из <span className="text-primary font-bold">30+ дипломированных SEO-копирайтеров</span> создаст уникальные тексты с гарантией качества и <span className="text-green-600 font-bold">100% уникальностью</span>
      </p>

      {/* Call-to-action buttons with enhanced design */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <Button size="lg" className="group px-10 py-6 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0" asChild>
          <Link to="/order" className="flex items-center gap-3">
            Создать заказ
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <Button variant="outline" size="lg" className="group px-10 py-6 rounded-full text-lg font-bold hover:bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Посмотреть портфолио
        </Button>
      </div>

      {/* Enhanced social proof */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1.1s' }}>
        <p className="text-sm text-muted-foreground mb-6">Нам доверяют</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-primary">500+</span>
            <span className="text-sm ml-2">компаний</span>
          </div>
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-green-600">98%</span>
            <span className="text-sm ml-2">довольных клиентов</span>
          </div>
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-blue-600">24/7</span>
            <span className="text-sm ml-2">поддержка</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
