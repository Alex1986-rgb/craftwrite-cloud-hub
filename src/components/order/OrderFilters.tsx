import { Card } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { FILTERS, FORMATS, LANGS, TOPICS } from "@/data/orderFilters";

interface OrderFiltersProps {
  category: string;
  format: string;
  lang: string;
  topic: string;
  filteredCount: number;
  onCategoryChange: (value: string) => void;
  onFormatChange: (value: string) => void;
  onLangChange: (value: string) => void;
  onTopicChange: (value: string) => void;
}

export default function OrderFilters({
  category,
  format,
  lang,
  topic,
  filteredCount,
  onCategoryChange,
  onFormatChange,
  onLangChange,
  onTopicChange
}: OrderFiltersProps) {
  return (
    <Card className="p-4 md:p-10 mb-8 md:mb-16 shadow-2xl border-0 bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/20 backdrop-blur-lg relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
      <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl shadow-lg">
            <Filter className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
          <h3 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Умные фильтры поиска
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-bold mb-2 md:mb-4 text-slate-700">Категория</label>
            <select
              value={category}
              onChange={e => onCategoryChange(e.target.value)}
              className="w-full rounded-xl md:rounded-2xl border-2 border-slate-200/50 px-3 py-2 md:px-6 md:py-4 text-sm bg-white/90 backdrop-blur-sm hover:border-blue-300/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg font-medium"
            >
              {FILTERS.map(option => 
                <option value={option.value} key={option.value}>{option.label}</option>
              )}
            </select>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-bold mb-2 md:mb-4 text-slate-700">Формат</label>
            <select
              value={format}
              onChange={e => onFormatChange(e.target.value)}
              className="w-full rounded-xl md:rounded-2xl border-2 border-slate-200/50 px-3 py-2 md:px-6 md:py-4 text-sm bg-white/90 backdrop-blur-sm hover:border-blue-300/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg font-medium"
            >
              {FORMATS.map(option => 
                <option value={option.value} key={option.value}>{option.label}</option>
              )}
            </select>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-bold mb-2 md:mb-4 text-slate-700">Язык</label>
            <select
              value={lang}
              onChange={e => onLangChange(e.target.value)}
              className="w-full rounded-xl md:rounded-2xl border-2 border-slate-200/50 px-3 py-2 md:px-6 md:py-4 text-sm bg-white/90 backdrop-blur-sm hover:border-blue-300/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg font-medium"
            >
              {LANGS.map(option => 
                <option value={option.value} key={option.value}>{option.label}</option>
              )}
            </select>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-bold mb-2 md:mb-4 text-slate-700">Тематика</label>
            <select
              value={topic}
              onChange={e => onTopicChange(e.target.value)}
              className="w-full rounded-xl md:rounded-2xl border-2 border-slate-200/50 px-3 py-2 md:px-6 md:py-4 text-sm bg-white/90 backdrop-blur-sm hover:border-blue-300/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg font-medium"
            >
              {TOPICS.map(option => 
                <option value={option.value} key={option.value}>{option.label}</option>
              )}
            </select>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            <span className="text-slate-600 font-medium text-sm md:text-lg">
              Найдено услуг: <span className="font-bold text-blue-600 text-lg md:text-xl">{filteredCount}</span>
            </span>
          </div>
          <div className="flex gap-1 md:gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
