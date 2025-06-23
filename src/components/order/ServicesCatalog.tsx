
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Zap, Star, Clock, DollarSign } from "lucide-react";
import { ALL_SERVICES } from "@/data/allServices";
import OrderServiceCard from "./OrderServiceCard";

export default function ServicesCatalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = [...new Set(ALL_SERVICES.map(service => service.category))];
  const difficulties = [...new Set(ALL_SERVICES.map(service => service.difficulty))];

  const filteredAndSortedServices = useMemo(() => {
    let filtered = ALL_SERVICES.filter(service => {
      const matchesSearch = !searchQuery || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || service.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price.min - b.price.min;
        case "price_desc":
          return b.price.min - a.price.min;
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSortBy("popularity");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Каталог услуг
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Выберите подходящую услугу из нашего каталога или создайте индивидуальный заказ
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            onClick={() => navigate('/order')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white group"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Быстрый заказ
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/contact')}
          >
            Консультация специалиста
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2">Поиск услуг</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск по названию, описанию или тегам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Категория</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Сложность</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Сортировка</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">По популярности</SelectItem>
                    <SelectItem value="price_asc">По цене (возр.)</SelectItem>
                    <SelectItem value="price_desc">По цене (убыв.)</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>Найдено услуг: {filteredAndSortedServices.length}</span>
              </div>
              {(searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all" || sortBy !== "popularity") && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Services grid */}
        {filteredAndSortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredAndSortedServices.map((service) => (
              <OrderServiceCard key={service.slug} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Услуги не найдены
              </h3>
              <p className="text-gray-500 mb-6">
                Попробуйте изменить критерии поиска или сбросить фильтры
              </p>
              <div className="space-y-3">
                <Button onClick={handleClearFilters} variant="outline">
                  Сбросить фильтры
                </Button>
                <Button onClick={() => navigate('/order')} className="w-full">
                  Создать индивидуальный заказ
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{ALL_SERVICES.length}</div>
            <div className="text-sm text-gray-600">Всего услуг</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{categories.length}</div>
            <div className="text-sm text-gray-600">Категорий</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.min(...ALL_SERVICES.map(s => s.price.min)).toLocaleString()}₽
            </div>
            <div className="text-sm text-gray-600">Минимальная цена</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Поддержка</div>
          </div>
        </div>
      </div>
    </div>
  );
}
