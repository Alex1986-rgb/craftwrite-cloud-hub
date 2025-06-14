
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogEmptyStateProps {
  onReset: () => void;
}

export default function BlogEmptyState({ onReset }: BlogEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Статьи не найдены</h3>
      <p className="text-muted-foreground mb-6">Попробуйте изменить критерии поиска</p>
      <Button onClick={onReset} variant="outline" className="flex items-center gap-2 mx-auto">
        <RotateCcw className="w-4 h-4" />
        Сбросить фильтры
      </Button>
    </div>
  );
}
