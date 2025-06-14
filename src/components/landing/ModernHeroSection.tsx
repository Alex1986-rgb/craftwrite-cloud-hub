
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, BadgeCheck, Users, Star, Award, Zap, Shield } from "lucide-react";

const ModernHeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background via-primary/3 to-purple-500/5 overflow-hidden">
    {/* Enhanced animated background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/12 to-pink-500/8 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/12 to-cyan-500/8 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-primary/40 rounded-full animate-float"></div>
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-500/50 rounded-full animate-float animation-delay-700"></div>
      <div className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-blue-500/40 rounded-full animate-float animation-delay-1500"></div>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto text-center">
      {/* Premium trust badges with enhanced animations */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="floating-badge group hover:bg-primary/20 transition-all duration-300">
          <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
          30+ дипломированных SEO-экспертов
        </div>
        <div className="floating-badge bg-green-50 text-green-700 border-green-200 hover:bg-green-100 group">
          <BadgeCheck className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
          100% уникальность Text.ru
        </div>
        <div className="floating-badge bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 group">
          <Award className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
          2000+ успешных проектов
        </div>
      </div>

      {/* Modern hero heading with enhanced typography */}
      <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h1 className="text-7xl md:text-9xl font-playfair font-black leading-none mb-8 tracking-tight">
          <span className="block text-elite-gradient hover:scale-105 transition-transform duration-700 cursor-default">
            CopyPro Cloud
          </span>
        </h1>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground/90 leading-tight mb-6">
            Элитная платформа профессионального 
            <span className="text-gradient font-bold block md:inline md:ml-2">
              SEO-копирайтинга нового поколения
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Революционный подход к созданию контента силами команды из 
            <span className="text-primary font-semibold">30+ дипломированных экспертов</span> 
            с гарантированной уникальностью и официальными отчетами
          </p>
        </div>
      </div>

      {/* Enhanced value proposition grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="bg-glass p-6 rounded-2xl hover-scale hover-glow group">
          <Zap className="w-8 h-8 text-primary mb-3 mx-auto group-hover:animate-pulse" />
          <h3 className="font-bold text-lg mb-2">Скорость 24ч</h3>
          <p className="text-sm text-muted-foreground">От заказа до готового премиального контента</p>
        </div>
        <div className="bg-glass p-6 rounded-2xl hover-scale hover-glow group">
          <Shield className="w-8 h-8 text-green-600 mb-3 mx-auto group-hover:animate-pulse" />
          <h3 className="font-bold text-lg mb-2">Гарантия качества</h3>
          <p className="text-sm text-muted-foreground">Официальные ссылки на каждую проверку</p>
        </div>
        <div className="bg-glass p-6 rounded-2xl hover-scale hover-glow group">
          <Award className="w-8 h-8 text-purple-600 mb-3 mx-auto group-hover:animate-pulse" />
          <h3 className="font-bold text-lg mb-2">Элитная команда</h3>
          <p className="text-sm text-muted-foreground">Только профильное высшее образование</p>
        </div>
      </div>

      {/* Premium CTA section */}
      <div className="mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="btn-elite text-xl px-16 py-8 rounded-full group relative overflow-hidden" 
            asChild
          >
            <Link to="/order" className="flex items-center gap-4">
              <span className="relative z-10">Заказать у профессионалов</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-12 py-8 rounded-full text-xl font-bold bg-glass hover:bg-card/90 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 hover-scale"
          >
            <Play className="w-7 h-7 mr-3 group-hover:scale-125 transition-transform duration-300" />
            Портфолио работ
          </Button>
        </div>
        
        {/* Trust indicators with real-time effect */}
        <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
            </div>
            <span>Эксперты онлайн</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
          <span>🔒 Безопасная оплата</span>
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
          <span>⚡ Мгновенный старт</span>
        </div>
      </div>

      {/* Enhanced stats with animated counters */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="text-sm text-muted-foreground/80 mb-8 font-medium">
          Доверие лидеров рынка — наша репутация:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: "2000+", label: "проектов", gradient: "from-primary to-blue-600" },
            { number: "100%", label: "уникальность*", gradient: "from-green-600 to-emerald-600" },
            { number: "30+", label: "экспертов", gradient: "from-blue-600 to-purple-600" },
            { number: "24ч", label: "от заказа", gradient: "from-purple-600 to-pink-600" }
          ].map((stat, index) => (
            <div key={index} className="group bg-glass px-8 py-6 rounded-2xl hover-scale hover-glow">
              <div className={`font-black text-3xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-6 italic max-w-2xl mx-auto">
          *Официальные ссылки на проверки Text.ru прилагаются к каждому заказу. 
          Мы гарантируем полную прозрачность процесса контроля качества.
        </p>
      </div>
    </div>
  </section>
);

export default ModernHeroSection;
