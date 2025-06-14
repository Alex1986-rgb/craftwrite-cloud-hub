
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List, TrendingUp, Filter, Sparkles } from "lucide-react";

interface SmartFiltersProps {
  categories: Array<{ name: string; count: number }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalProjects: number;
  filteredProjects: number;
}

export default function SmartFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalProjects,
  filteredProjects
}: SmartFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});

  // Анимированные счетчики
  useEffect(() => {
    categories.forEach(category => {
      let start = 0;
      const end = category.count;
      const duration = 1000;
      const increment = end / (duration / 16);

      const animate = () => {
        start += increment;
        if (start < end) {
          setAnimatedCounts(prev => ({ ...prev, [category.name]: Math.floor(start) }));
          requestAnimationFrame(animate);
        } else {
          setAnimatedCounts(prev => ({ ...prev, [category.name]: end }));
        }
      };
      animate();
    });
  }, [categories]);

  return (
    <div className="space-y-6 mb-12">
      {/* Stats Dashboard */}
      <Card className="p-6 glass-effect border-0 shadow-xl bg-gradient-to-br from-white/95 to-blue-50/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl">
            <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{totalProjects}</div>
            <div className="text-sm text-slate-600 font-medium">Всего проектов</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl">
            <div className="inline-flex p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">98%</div>
            <div className="text-sm text-slate-600 font-medium">Успешность</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-2xl">
            <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl mb-3">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{filteredProjects}</div>
            <div className="text-sm text-slate-600 font-medium">Найдено</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl">
            <div className="inline-flex p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">500%</div>
            <div className="text-sm text-slate-600 font-medium">Средний ROI</div>
          </div>
        </div>
      </Card>

      {/* Search & View Controls */}
      <Card className="p-6 glass-effect border-0 shadow-xl bg-gradient-to-br from-white/95 to-slate-50/50">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-lg relative">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors duration-200" />
              <Input
                type="text"
                placeholder="Поиск проектов, технологий, результатов..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-12 pr-6 py-3 text-lg border-2 border-slate-200/50 focus:border-primary rounded-2xl shadow-lg bg-white/90 backdrop-blur transition-all duration-300"
              />
              {searchQuery && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {filteredProjects} найдено
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`rounded-xl transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Сетка
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`rounded-xl transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              Список
            </Button>
          </div>
        </div>
      </Card>

      {/* Category Pills */}
      <Card className="p-6 glass-effect border-0 shadow-xl bg-gradient-to-br from-white/95 to-purple-50/30">
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/25'
                  : 'bg-white/80 backdrop-blur text-slate-700 hover:bg-white border border-slate-200/50 hover:border-primary/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{category.name}</span>
                <Badge
                  className={`font-bold transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20'
                  }`}
                >
                  {animatedCounts[category.name] || 0}
                </Badge>
              </div>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                selectedCategory === category.name ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              } bg-gradient-to-r from-primary/5 to-purple-500/5`}></div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
