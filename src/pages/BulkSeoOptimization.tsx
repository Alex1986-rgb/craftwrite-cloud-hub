
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductManager from "@/components/admin/seo/ProductManager";
import BulkTextGenerator from "@/components/admin/seo/BulkTextGenerator";
import AutolinksManager from "@/components/admin/seo/AutolinksManager";
import SeoTemplatesManager from "@/components/admin/seo/SeoTemplatesManager";
import { ShoppingBag, Wand2, Link, FileText } from "lucide-react";

export default function BulkSeoOptimization() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Массовая SEO-оптимизация
          </h1>
          <p className="text-slate-600 text-lg">
            Интеллектуальное управление карточками товаров и автоматическая генерация SEO-текстов
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="generation" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Генерация
            </TabsTrigger>
            <TabsTrigger value="autolinks" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Автолинки
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Шаблоны
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="generation">
            <BulkTextGenerator />
          </TabsContent>

          <TabsContent value="autolinks">
            <AutolinksManager />
          </TabsContent>

          <TabsContent value="templates">
            <SeoTemplatesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
