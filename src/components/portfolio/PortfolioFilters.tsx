
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Category = {
  name: string;
  count: number;
};

type PortfolioFiltersProps = {
  categories: Category[];
  industries: Category[];
  selectedCategory: string;
  selectedIndustry: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onIndustryChange: (industry: string) => void;
  onSearchChange: (query: string) => void;
  totalProjects: number;
  filteredCount: number;
};

export default function PortfolioFilters({ 
  categories, 
  industries,
  selectedCategory, 
  selectedIndustry,
  searchQuery,
  onCategoryChange,
  onIndustryChange,
  onSearchChange,
  totalProjects,
  filteredCount
}: PortfolioFiltersProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Показано {filteredCount} из {totalProjects} проектов
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Фильтр по категориям:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => onCategoryChange(category.name)}
                className="flex items-center gap-2"
              >
                {category.name === "all" ? "Все" : category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Фильтр по отраслям:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <Button
                key={industry.name}
                variant={selectedIndustry === industry.name ? "default" : "outline"}
                onClick={() => onIndustryChange(industry.name)}
                className="flex items-center gap-2"
              >
                {industry.name === "all" ? "Все" : industry.name}
                <Badge variant="secondary" className="ml-1">
                  {industry.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
