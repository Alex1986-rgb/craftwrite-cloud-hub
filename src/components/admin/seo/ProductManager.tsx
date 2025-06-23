
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Upload, Search, Filter, Trash2, Edit } from "lucide-react";
import ProductForm from "./ProductForm";
import ProductFilters from "./ProductFilters";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  page_url: string;
  page_title: string;
  category: string;
  manufacturer?: string;
  filters: any;
  link_slots: any[];
  created_at: string;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('product_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.page_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('product_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchProducts();
      toast({
        title: "Успешно",
        description: "Товар удален"
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        variant: "destructive"
      });
    }
  };

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Управление товарами ({filteredProducts.length})</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить товар
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Поиск по названию, категории, производителю..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {showFilters && (
            <ProductFilters
              onFilterChange={(filters) => {
                // Apply filters logic here
                console.log('Filters applied:', filters);
              }}
            />
          )}

          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-4">
              <span className="text-sm text-blue-700">
                Выбрано: {selectedProducts.length} товаров
              </span>
              <Button size="sm" variant="outline">
                Массовая генерация
              </Button>
              <Button size="sm" variant="outline">
                Экспорт
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) => 
                    handleProductSelect(product.id, checked as boolean)
                  }
                />
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{product.page_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">URL:</p>
                  <p className="text-sm font-mono">{product.page_url}</p>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.manufacturer && (
                    <Badge variant="outline">{product.manufacturer}</Badge>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  Создан: {new Date(product.created_at).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <ProductForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}
