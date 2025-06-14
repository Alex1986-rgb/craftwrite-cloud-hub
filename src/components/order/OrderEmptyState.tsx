
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface OrderEmptyStateProps {
  onResetFilters: () => void;
}

export default function OrderEmptyState({ onResetFilters }: OrderEmptyStateProps) {
  return (
    <div className="text-center py-12 md:py-24 animate-fade-in px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full mb-6 md:mb-8 shadow-lg">
        <Search className="w-8 h-8 md:w-12 md:h-12 text-slate-400" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-slate-600 mb-4 md:mb-6">
        По выбранным фильтрам услуги не найдены
      </div>
      <p className="text-slate-500 mb-6 md:mb-8 max-w-md mx-auto text-base md:text-lg">
        Попробуйте изменить критерии поиска или сбросить все фильтры
      </p>
      <Button 
        variant="outline"
        onClick={onResetFilters}
        className="px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold border-2 border-blue-300/60 hover:border-blue-500 hover:bg-blue-50/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        Сбросить фильтры
      </Button>
    </div>
  );
}
