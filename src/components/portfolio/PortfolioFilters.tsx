
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

type Category = {
  name: string;
  count: number;
};

type PortfolioFiltersProps = {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function PortfolioFilters({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: PortfolioFiltersProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
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
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
