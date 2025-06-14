
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import OrderForm from "./OrderForm";
import OrderFeatureCards from "./OrderFeatureCards";

interface OrderFormViewProps {
  onBackToCatalog: () => void;
}

export default function OrderFormView({ onBackToCatalog }: OrderFormViewProps) {
  return (
    <main role="main" aria-label="Форма заказа копирайтинг услуг">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" role="presentation" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/15 via-purple-400/12 to-pink-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/15 via-blue-400/12 to-purple-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-yellow-400/10 via-orange-400/8 to-red-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <header className="mb-8 md:mb-12 flex flex-col gap-6 animate-fade-in">
        <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4" aria-label="Навигация по форме заказа">
          <Button 
            variant="outline" 
            onClick={onBackToCatalog}
            className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-blue-200/60 hover:border-blue-400/70 bg-white/90 backdrop-blur-sm hover:bg-white/95 text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-xl"
            aria-label="Вернуться к каталогу услуг"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
            <span className="font-semibold">Вернуться к каталогу</span>
          </Button>
          
          <div 
            className="flex items-center gap-3 text-sm md:text-base text-slate-700 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-xl border border-slate-200/60 shadow-sm"
            role="note"
            aria-label="Информация о каталоге услуг"
          >
            <Sparkles className="w-5 h-5 text-blue-500" aria-hidden="true" />
            <span>Или выберите готовое решение из каталога услуг</span>
          </div>
        </nav>
        
        <section aria-label="Преимущества нашего сервиса">
          <OrderFeatureCards />
        </section>
      </header>
      
      <section 
        className="animate-fade-in" 
        style={{ animationDelay: '0.3s' }} 
        aria-label="Форма для создания заказа"
        role="form"
      >
        <OrderForm />
      </section>
    </main>
  );
}
