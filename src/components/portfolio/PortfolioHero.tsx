
import { Search, Award, Target, Briefcase, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PortfolioHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function PortfolioHero({ searchQuery, onSearchChange }: PortfolioHeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Слой динамического градиента и glass */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/8 to-emerald-600/10" />
        {/* Gradient mesh + эффект blur */}
        <div className="absolute -top-24 left-1/4 w-[50vw] h-[40vw] bg-gradient-to-tr from-primary/20 via-purple-300/20 to-blue-400/20 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute -bottom-20 right-1/3 w-[33vw] h-[30vw] bg-gradient-to-br from-emerald-400/15 to-blue-400/10 rounded-full blur-3xl animate-float opacity-35"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md text-purple-700 px-8 py-3 rounded-full text-base font-bold mb-8 border border-purple-200/50 shadow-lg animate-fade-in">
            <Briefcase className="w-5 h-5" />
            Проекты мирового уровня
            <Award className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight font-playfair tracking-tight animate-slide-up">
            Портфолио <br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-playfair">успешных проектов</span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light animate-fade-in">
            Изучите наши <span className="text-primary font-semibold">кейсы</span> и результаты. Более 500 успешных проектов для компаний разного масштаба
          </p>
          <div className="max-w-lg mx-auto relative mb-10 animate-scale-in">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-14 pr-6 py-4 text-xl border-2 border-slate-200 focus:border-primary rounded-full shadow-xl bg-white/90 backdrop-blur"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 glass-effect px-8 py-4 rounded-full shadow-xl border border-slate-200/40">
              <Target className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-slate-700">500+ проектов</span>
            </div>
            <div className="flex items-center gap-2 glass-effect px-8 py-4 rounded-full shadow-xl border border-slate-200/40">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-slate-700">98% довольных клиентов</span>
            </div>
            <div className="flex items-center gap-2 glass-effect px-8 py-4 rounded-full shadow-xl border border-slate-200/40">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-slate-700">Международные награды</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
