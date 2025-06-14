
import { Search, BookOpen, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogHeader({ searchQuery, onSearchChange }: BlogHeaderProps) {
  return (
    <section className="text-center mb-16 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-200/50 shadow-lg">
        <BookOpen className="w-5 h-5" />
        Экспертные знания
        <TrendingUp className="w-5 h-5" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
        Блог о копирайтинге <br />
        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">и контент-маркетинге</span>
      </h1>
      
      <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
        Актуальные статьи, профессиональные советы и инсайты от экспертов индустрии для развития ваших навыков
      </p>
      
      <div className="max-w-lg mx-auto relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Поиск статей..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-4 text-lg border-2 border-slate-200 focus:border-primary rounded-full shadow-lg"
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
          <Users className="w-5 h-5 text-emerald-500" />
          <span className="font-semibold text-slate-700">50+ экспертных статей</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-700">Обновления каждую неделю</span>
        </div>
      </div>
    </section>
  );
}
