import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ModernPortfolioHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ModernPortfolioHero({ searchQuery, onSearchChange }: ModernPortfolioHeroProps) {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-8 text-slate-900 leading-tight tracking-tight">
            Портфолио
          </h1>
          <p className="text-2xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            Изучите наши кейсы и результаты работы
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-16 pr-8 py-6 text-xl border-2 border-slate-200 focus:border-primary rounded-2xl shadow-lg bg-white/95 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}