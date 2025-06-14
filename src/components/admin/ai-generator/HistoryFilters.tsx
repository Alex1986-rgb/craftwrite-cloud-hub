
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar, Tag } from "lucide-react";
import { EnhancedGenerationHistoryItem } from "./EnhancedGenerationHistory";

interface HistoryFiltersProps {
  filters: {
    search: string;
    contentType: string;
    dateRange: string;
    status: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  history: EnhancedGenerationHistoryItem[];
}

export default function HistoryFilters({ filters, onFiltersChange, history }: HistoryFiltersProps) {
  const contentTypes = [...new Set(history.map(item => item.contentType))];
  const statusOptions = [...new Set(history.map(item => item.status))];
  
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      contentType: "all",
      dateRange: "all",
      status: "all",
      sortBy: "recent"
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.contentType !== "all") count++;
    if (filters.dateRange !== "all") count++;
    if (filters.status !== "all") count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Строка поиска */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Поиск по названию, содержанию или тегам..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Фильтры */}
      <div className="flex items-center gap-4 flex-wrap">
        <Select value={filters.contentType} onValueChange={(value) => updateFilter('contentType', value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Тип контента" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            {contentTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>
                <span className="capitalize">{status}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все время</SelectItem>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Недавние</SelectItem>
            <SelectItem value="popular">Популярные</SelectItem>
            <SelectItem value="quality">По качеству</SelectItem>
            <SelectItem value="name">По названию</SelectItem>
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" />
            Очистить фильтры
            <Badge className="ml-2 bg-red-100 text-red-800">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>

      {/* Активные фильтры */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-600">Активные фильтры:</span>
          
          {filters.search && (
            <Badge variant="outline" className="gap-1">
              <Search className="w-3 h-3" />
              {filters.search}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => updateFilter('search', '')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filters.contentType !== "all" && (
            <Badge variant="outline" className="gap-1">
              <Tag className="w-3 h-3" />
              {filters.contentType}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => updateFilter('contentType', 'all')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filters.status !== "all" && (
            <Badge variant="outline" className="gap-1">
              <Filter className="w-3 h-3" />
              <span className="capitalize">{filters.status}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => updateFilter('status', 'all')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filters.dateRange !== "all" && (
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              {filters.dateRange}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => updateFilter('dateRange', 'all')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
