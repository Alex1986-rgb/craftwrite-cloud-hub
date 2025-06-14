
import { useMemo } from "react";
import { Service } from "@/data/types/service";
import OrderPageHero from "./OrderPageHero";
import OrderAdvancedFilters from "./OrderAdvancedFilters";
import OrderServiceCardEnhanced from "./OrderServiceCardEnhanced";
import OrderEmptyState from "./OrderEmptyState";
import OrderSeoSection from "./OrderSeoSection";

interface OrderCatalogViewProps {
  services: Service[];
  searchQuery: string;
  category: string;
  difficulty: string;
  priceRange: string;
  popularity: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onPopularityChange: (value: string) => void;
  onClearFilters: () => void;
  onQuickOrder: () => void;
  onServiceSelect: (serviceName: string) => void;
  onLearnMore: (serviceSlug: string) => void;
}

export default function OrderCatalogView({
  services,
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
  onClearFilters,
  onQuickOrder,
  onServiceSelect,
  onLearnMore
}: OrderCatalogViewProps) {
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = !searchQuery || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = category === "all" || service.category === category;
      const matchesDifficulty = difficulty === "all" || service.difficulty === difficulty;
      
      const matchesPrice = priceRange === "all" || (() => {
        switch (priceRange) {
          case "budget": return service.price.max <= 3000;
          case "standard": return service.price.min >= 3000 && service.price.max <= 10000;
          case "premium": return service.price.min >= 10000 && service.price.max <= 20000;
          case "enterprise": return service.price.min >= 20000;
          default: return true;
        }
      })();

      const matchesPopularity = popularity === "all" || (() => {
        switch (popularity) {
          case "high": return service.popularity >= 4;
          case "medium": return service.popularity === 3;
          case "low": return service.popularity <= 2;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice && matchesPopularity;
    });
  }, [services, searchQuery, category, difficulty, priceRange, popularity]);

  return (
    <main role="main" aria-label="Каталог услуг копирайтинга">
      <header className="animate-fade-in mb-12">
        <OrderPageHero onQuickOrder={onQuickOrder} />
      </header>

      <section 
        className="animate-fade-in mb-8" 
        style={{ animationDelay: '0.2s' }} 
        aria-label="Фильтры и поиск услуг"
        role="search"
      >
        <OrderAdvancedFilters
          services={services}
          filteredServices={filteredServices}
          searchQuery={searchQuery}
          category={category}
          difficulty={difficulty}
          priceRange={priceRange}
          popularity={popularity}
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
          onDifficultyChange={onDifficultyChange}
          onPriceRangeChange={onPriceRangeChange}
          onPopularityChange={onPopularityChange}
          onClearFilters={onClearFilters}
        />
      </section>

      <section 
        className="animate-fade-in" 
        style={{ animationDelay: '0.4s' }} 
        aria-label="Список доступных услуг"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Найдено {filteredServices.length} услуг из {services.length}
        </div>
        
        {filteredServices.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
            role="list"
            aria-label={`Список услуг: ${filteredServices.length} результатов`}
          >
            {filteredServices.map((service, index) => (
              <div
                key={service.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
                role="listitem"
              >
                <OrderServiceCardEnhanced
                  service={service}
                  onSelect={() => onServiceSelect(service.name)}
                  onLearnMore={() => onLearnMore(service.slug)}
                />
              </div>
            ))}
          </div>
        ) : (
          <OrderEmptyState onResetFilters={onClearFilters} />
        )}
      </section>
      
      <OrderSeoSection />
    </main>
  );
}
