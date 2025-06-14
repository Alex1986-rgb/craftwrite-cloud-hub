
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Save, Settings, Code, Palette, Search } from "lucide-react";

export default function PageEditor() {
  const [selectedPage, setSelectedPage] = useState("home");
  
  const pages = [
    { id: "home", title: "Главная страница", status: "published", lastModified: "2024-12-14" },
    { id: "about", title: "О нас", status: "published", lastModified: "2024-12-10" },
    { id: "services", title: "Услуги", status: "draft", lastModified: "2024-12-12" },
    { id: "portfolio", title: "Портфолио", status: "published", lastModified: "2024-12-13" },
    { id: "blog", title: "Блог", status: "published", lastModified: "2024-12-14" },
  ];

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? <Badge className="bg-green-100 text-green-800">Опубликовано</Badge>
      : <Badge className="bg-yellow-100 text-yellow-800">Черновик</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Редактор страниц</h1>
          <p className="text-slate-600">Управление контентом и структурой всех страниц сайта</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Предпросмотр
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600">
            <Save className="w-4 h-4 mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список страниц */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Страницы сайта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Поиск страниц..." className="pl-10" />
              </div>
              
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPage === page.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedPage(page.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{page.title}</span>
                    {getStatusBadge(page.status)}
                  </div>
                  <div className="text-xs text-slate-500">
                    Изменено: {new Date(page.lastModified).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Редактор */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Редактирование: {pages.find(p => p.id === selectedPage)?.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Palette className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Контент</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="design">Дизайн</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок страницы</label>
                  <Input placeholder="Введите заголовок страницы" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Содержание</label>
                  <Textarea 
                    placeholder="Основной контент страницы..."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">URL страницы</label>
                    <Input placeholder="/example-page" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Статус</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Опубликовано</option>
                      <option>Черновик</option>
                      <option>Архив</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <Input placeholder="SEO заголовок страницы" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea placeholder="Описание страницы для поисковых систем" rows={3} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ключевые слова</label>
                  <Input placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Open Graph Image</label>
                    <Input placeholder="URL изображения для соцсетей" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Canonical URL</label>
                    <Input placeholder="Каноническая ссылка" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="design" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <Palette className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Визуальный редактор дизайна</p>
                  <p className="text-sm">Здесь будет интерфейс для настройки внешнего вида</p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Настройки страницы</p>
                  <p className="text-sm">Дополнительные параметры и конфигурация</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
