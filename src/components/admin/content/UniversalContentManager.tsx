
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  Save, 
  Eye, 
  Search, 
  Plus, 
  Settings, 
  Image, 
  Code, 
  Globe,
  FileText,
  Layout
} from "lucide-react";
import { UnifiedButton } from "@/components/unified";

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'block' | 'text' | 'media';
  status: 'published' | 'draft';
  lastModified: string;
  category: string;
}

export default function UniversalContentManager() {
  const [selectedItem, setSelectedItem] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState("");
  
  const contentItems: ContentItem[] = [
    // Страницы
    { id: "home", title: "Главная страница", type: "page", status: "published", lastModified: "2024-12-14", category: "Страницы" },
    { id: "about", title: "О нас", type: "page", status: "published", lastModified: "2024-12-13", category: "Страницы" },
    { id: "services", title: "Услуги", type: "page", status: "published", lastModified: "2024-12-12", category: "Страницы" },
    { id: "portfolio", title: "Портфолио", type: "page", status: "published", lastModified: "2024-12-11", category: "Страницы" },
    { id: "blog", title: "Блог", type: "page", status: "published", lastModified: "2024-12-10", category: "Страницы" },
    
    // Блоки
    { id: "hero-main", title: "Hero секция (главная)", type: "block", status: "published", lastModified: "2024-12-14", category: "Блоки" },
    { id: "features", title: "Блок преимуществ", type: "block", status: "published", lastModified: "2024-12-13", category: "Блоки" },
    { id: "testimonials", title: "Отзывы клиентов", type: "block", status: "published", lastModified: "2024-12-12", category: "Блоки" },
    { id: "cta", title: "Призыв к действию", type: "block", status: "draft", lastModified: "2024-12-11", category: "Блоки" },
    
    // Тексты
    { id: "seo-copywriting", title: "SEO-копирайтинг (услуга)", type: "text", status: "published", lastModified: "2024-12-10", category: "SEO тексты" },
    { id: "email-marketing", title: "Email-маркетинг (услуга)", type: "text", status: "published", lastModified: "2024-12-09", category: "SEO тексты" },
    { id: "blog-post-1", title: "Как писать продающие тексты", type: "text", status: "published", lastModified: "2024-12-08", category: "Блог" }
  ];

  const filteredItems = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return Globe;
      case 'block': return Layout;
      case 'text': return FileText;
      case 'media': return Image;
      default: return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? <Badge className="bg-green-100 text-green-800">Опубликовано</Badge>
      : <Badge className="bg-yellow-100 text-yellow-800">Черновик</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление контентом</h1>
          <p className="text-slate-600">Универсальный редактор всех элементов сайта</p>
        </div>
        <div className="flex items-center gap-2">
          <UnifiedButton variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Предпросмотр
          </UnifiedButton>
          <UnifiedButton className="bg-gradient-to-r from-green-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Создать новый
          </UnifiedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список контента */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Контент сайта
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Поиск контента..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700 border-b pb-1">
                    {category}
                  </h4>
                  {items.map((item) => {
                    const IconComponent = getTypeIcon(item.type);
                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedItem === item.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'hover:bg-slate-50 border-slate-200'
                        }`}
                        onClick={() => setSelectedItem(item.id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-sm truncate flex-1">{item.title}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {new Date(item.lastModified).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Редактор */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Редактирование: {filteredItems.find(item => item.id === selectedItem)?.title || 'Выберите элемент'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="content">Контент</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="design">Дизайн</TabsTrigger>
                <TabsTrigger value="media">Медиа</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок</label>
                  <Input placeholder="Введите заголовок" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Содержание</label>
                  <Textarea 
                    placeholder="Основной контент..."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-4">
                  <UnifiedButton variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Редактор блоков
                  </UnifiedButton>
                  <UnifiedButton variant="outline">
                    <Code className="w-4 h-4 mr-2" />
                    HTML режим
                  </UnifiedButton>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <Input placeholder="SEO заголовок" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea placeholder="Описание для поисковых систем" rows={3} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ключевые слова</label>
                  <Input placeholder="ключевое слово 1, ключевое слово 2" />
                </div>
              </TabsContent>
              
              <TabsContent value="design" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <Layout className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Визуальный конструктор блоков</p>
                  <p className="text-sm">Перетаскивайте блоки для создания уникального дизайна</p>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <Image className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Медиа-менеджер</p>
                  <p className="text-sm">Загрузка и управление изображениями, видео, документами</p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
