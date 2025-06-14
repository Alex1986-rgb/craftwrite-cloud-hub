
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface Category {
  name: string;
  count: number;
}

interface BlogCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function BlogCategories({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: BlogCategoriesProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="flex items-center gap-2"
            >
              <Tag className="w-4 h-4" />
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
