import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, DollarSign, TrendingUp, X, Target, Zap, Award, Users } from "lucide-react";
import { Service } from "@/data/types/service";

interface OrderAdvancedFiltersProps {
  services: Service[];
  filteredServices: Service[];
  searchQuery: string;
  category: string;
  difficulty: string;
  priceRange: string;
  popularity: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onPriceRangeChange: (range: string) => void;
  onPopularityChange: (popularity: string) => void;
  onClearFilters: () => void;
}

export default function OrderAdvancedFilters({
  services,
  filteredServices,
  searchQuery,
  category,
  difficulty,
  priceRange,
  popularity,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  onPriceRangeChange,
  onPopularityChange,
  onClearFilters
}: OrderAdvancedFiltersProps) {
  const categories = Array.from(new Set(services.map(s => s.category)));
  const difficulties = Array.from(new Set(services.map(s => s.difficulty)));
  
  const hasActiveFilters = category !== "all" || difficulty !== "all" || 
                          priceRange !== "all" || popularity !== "all" || searchQuery;

  const getFilterCount = () => {
    let count = 0;
    if (category !== "all") count++;
    if (difficulty !== "all") count++;
    if (priceRange !== "all") count++;
    if (popularity !== "all") count++;
    if (searchQuery) count++;
    return count;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-slate-50/30 border-0 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Умные фильтры
            </h3>
            <p className="text-sm text-slate-600">Найдите идеальную услугу для вашего проекта</p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {getFilterCount()} активных
              </Badge>
            )}
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {filteredServices.length} из {services.length}
            </Badge>
          </div>
        </div>

        {/* Enhanced search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Поиск по названию, описанию, тегам..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-3 text-base border-2 border-slate-200 focus:border-blue-400 transition-colors rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Enhanced filters grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Категория
            </label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-white border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" />
              Сложность
            </label>
            <Select value={difficulty} onValueChange={onDifficultyChange}>
              <SelectTrigger className="bg-white border-2 border-slate-200 hover:border-orange-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сложность</SelectItem>
                {difficulties.map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              Бюджет
            </label>
            <Select value={priceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="bg-white border-2 border-slate-200 hover:border-green-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой бюджет</SelectItem>
                <SelectItem value="budget">До 5 000 ₽</SelectItem>
                <SelectItem value="standard">5 000 - 15 000 ₽</SelectItem>
                <SelectItem value="premium">15 000 - 30 000 ₽</SelectItem>
                <SelectItem value="enterprise">От 30 000 ₽</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Popularity */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Рейтинг
            </label>
            <Select value={popularity} onValueChange={onPopularityChange}>
              <SelectTrigger className="bg-white border-2 border-slate-200 hover:border-yellow-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любой рейтинг</SelectItem>
                <SelectItem value="high">Высокий (4-5★)</SelectItem>
                <SelectItem value="medium">Средний (3★)</SelectItem>
                <SelectItem value="low">Низкий (1-2★)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced quick filters */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-500" />
            Быстрые фильтры
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPopularityChange("high")}
              className="text-xs hover:bg-yellow-50 hover:border-yellow-300 transition-all"
            >
              <Star className="w-3 h-3 mr-1" />
              Популярные
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPriceRangeChange("budget")}
              className="text-xs hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              Бюджетные
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDifficultyChange("Простая")}
              className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Простые
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCategoryChange("Продающие тексты")}
              className="text-xs hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <Target className="w-3 h-3 mr-1" />
              Продающие
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCategoryChange("E-commerce")}
              className="text-xs hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <Users className="w-3 h-3 mr-1" />
              E-commerce
            </Button>
          </div>
        </div>

        {/* Enhanced results summary */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">
              Найдено услуг: {filteredServices.length}
            </span>
            {filteredServices.length > 0 && (
              <div className="text-xs text-slate-500">
                Средняя стоимость: {Math.round(filteredServices.reduce((sum, s) => sum + s.price.min, 0) / filteredServices.length).toLocaleString()} ₽
              </div>
            )}
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all gap-1"
            >
              <X className="w-4 h-4" />
              Сбросить все
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
