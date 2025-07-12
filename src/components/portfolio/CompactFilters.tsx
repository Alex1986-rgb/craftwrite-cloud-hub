import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List } from "lucide-react";

interface CompactFiltersProps {
  categories: Array<{ name: string; count: number }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function CompactFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange
}: CompactFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category.name
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {category.name}
            <Badge 
              className={`ml-2 ${
                selectedCategory === category.name 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className={`rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-600'}`}
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className={`rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-600'}`}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}