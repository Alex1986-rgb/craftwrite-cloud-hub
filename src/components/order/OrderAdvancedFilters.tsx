
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, DollarSign, TrendingUp, X } from "lucide-react";
import { Service } from "@/data/services";

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

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-slate-50/30 border-0 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Фильтры и поиск
        </h3>
        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
          {filteredServices.length} из {services.length}
        </Badge>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Поиск по названию, описанию или тегам..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 text-base"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Категория</label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white">
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
          <label className="text-sm font-medium text-slate-700">Сложность</label>
          <Select value={difficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className="bg-white">
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
          <label className="text-sm font-medium text-slate-700">Цена</label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая цена</SelectItem>
              <SelectItem value="budget">До 3 000 ₽</SelectItem>
              <SelectItem value="standard">3 000 - 10 000 ₽</SelectItem>
              <SelectItem value="premium">10 000 - 20 000 ₽</SelectItem>
              <SelectItem value="enterprise">От 20 000 ₽</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Popularity */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Популярность</label>
          <Select value={popularity} onValueChange={onPopularityChange}>
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая</SelectItem>
              <SelectItem value="high">Высокая (4-5★)</SelectItem>
              <SelectItem value="medium">Средняя (3★)</SelectItem>
              <SelectItem value="low">Низкая (1-2★)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPopularityChange("high")}
          className="text-xs"
        >
          <Star className="w-3 h-3 mr-1" />
          Популярные
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPriceRangeChange("budget")}
          className="text-xs"
        >
          <DollarSign className="w-3 h-3 mr-1" />
          Бюджетные
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDifficultyChange("Простая")}
          className="text-xs"
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          Простые
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onCategoryChange("Продающие тексты")}
          className="text-xs"
        >
          Продающие
        </Button>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-sm text-slate-600">
            Найдено: {filteredServices.length} услуг
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            Сбросить фильтры
          </Button>
        </div>
      )}
    </Card>
  );
}
