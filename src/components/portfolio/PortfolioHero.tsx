
import { Award, Target, Briefcase, TrendingUp } from "lucide-react";

export default function PortfolioHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-purple-200/50 shadow-lg">
            <Briefcase className="w-5 h-5" />
            Проекты мирового уровня
            <Award className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Портфолио <br />
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">успешных проектов</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Изучите наши кейсы и результаты. Более 500 успешных проектов для компаний разного масштаба
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
              <Target className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-slate-700">500+ проектов</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-slate-700">98% довольных клиентов</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-slate-700">Международные награды</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
