
import { Search } from "lucide-react";

export default function BlogEmptyState() {
  return (
    <div className="text-center py-16">
      <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Статьи не найдены</h3>
      <p className="text-muted-foreground">Попробуйте изменить критерии поиска</p>
    </div>
  );
}
