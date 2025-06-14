
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, BadgeCheck, Users } from "lucide-react";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center pt-28 pb-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
    {/* Decor backgrounds */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[18%] left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      {/* --- Новая эмблема + Команда SEO-копирайтеров --- */}
      <div className="flex justify-center items-center gap-4 mb-7 opacity-0 animate-fade-in" style={{ animationDelay: '0.25s' }}>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-base shadow-lg">
          <Users className="w-5 h-5" />
          30+ дипломированных SEO-копирайтеров
        </span>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 font-medium text-base">
          <BadgeCheck className="w-5 h-5 text-green-600" />
          Проверка уникальности Text.ru
        </span>
      </div>
      {/* Главный заголовок */}
      <h1 className="text-5xl md:text-7xl font-playfair font-extrabold leading-tight mb-7 tracking-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.45s' }}>
        <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
          CopyPro Cloud
        </span>
        <br />
        <span className="text-foreground/90 text-4xl md:text-5xl block mt-4">
          Экспертная SaaS-платформа SEO-копирайтинга
        </span>
      </h1>
      {/* Подзаголовок — новая формулировка */}
      <p className="text-xl md:text-2xl text-muted-foreground text-center mb-10 max-w-2xl mx-auto font-medium leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '0.62s' }}>
        Профи-копирайтинг для вашего бизнеса: только дипломированные SEO-копирайтеры. <br />Все тексты проходят <span className="text-green-600 font-bold">антиплагиат на Text.ru</span> и мы предоставляем ссылки на проверки!
      </p>
      {/* Кнопки */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <Button size="lg" className="group px-10 py-6 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0" asChild>
          <Link to="/order" className="flex items-center gap-3">
            Заказать у экспертов
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="group px-10 py-6 rounded-full text-lg font-bold hover:bg-card/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Портфолио работ
        </Button>
      </div>
      {/* Микро-доверие */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="text-sm text-muted-foreground mb-4">Наши KPI:</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-primary">2000+</span>
            <span className="text-sm ml-2">проектов</span>
          </div>
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-green-600">100%</span>
            <span className="text-sm ml-2">уникальность*</span>
          </div>
          <div className="bg-card/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-border/50">
            <span className="font-bold text-blue-600">30+</span>
            <span className="text-sm ml-2">экспертов</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">*Ссылки на проверки по запросу к заказу</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
