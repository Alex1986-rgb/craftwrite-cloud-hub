
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  Search, 
  Play, 
  Settings,
  Zap,
  BookOpen,
  Target
} from "lucide-react";
import { UnifiedButton } from "@/components/unified";

interface Prompt {
  id: string;
  title: string;
  category: string;
  content: string;
  variables: string[];
  status: 'active' | 'draft';
  usageCount: number;
  effectiveness: number;
  lastUsed: string;
}

export default function PromptManager() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("seo-article");
  const [searchQuery, setSearchQuery] = useState("");
  
  const prompts: Prompt[] = [
    {
      id: "seo-article",
      title: "SEO статья",
      category: "Контент-маркетинг",
      content: "Создай SEO-оптимизированную статью на тему '{topic}' объемом {length} символов. Целевая аудитория: {audience}. Включи ключевые слова: {keywords}. Стиль: {tone}.",
      variables: ["{topic}", "{length}", "{audience}", "{keywords}", "{tone}"],
      status: "active",
      usageCount: 47,
      effectiveness: 92,
      lastUsed: "2024-12-14"
    },
    {
      id: "landing-copy",
      title: "Продающий текст лендинга",
      category: "Продажи",
      content: "Напиши продающий текст для лендинга услуги '{service}'. Целевая аудитория: {audience}. Основные преимущества: {benefits}. Включи призыв к действию и адресуй возражения клиентов.",
      variables: ["{service}", "{audience}", "{benefits}"],
      status: "active",
      usageCount: 23,
      effectiveness: 87,
      lastUsed: "2024-12-13"
    },
    {
      id: "email-sequence",
      title: "Email-последовательность",
      category: "Email-маркетинг",
      content: "Создай последовательность из {count} писем для воронки продаж услуги '{service}'. Каждое письмо должно решать определенную задачу: знакомство, построение доверия, преодоление возражений, продажа.",
      variables: ["{count}", "{service}"],
      status: "active",
      usageCount: 15,
      effectiveness: 89,
      lastUsed: "2024-12-12"
    },
    {
      id: "social-post",
      title: "Пост для соцсетей",
      category: "SMM",
      content: "Напиши увлекательный пост для {platform} на тему '{topic}'. Длина: {length} символов. Включи хештеги и призыв к действию. Тон: {tone}.",
      variables: ["{platform}", "{topic}", "{length}", "{tone}"],
      status: "draft",
      usageCount: 8,
      effectiveness: 85,
      lastUsed: "2024-12-11"
    }
  ];

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(prompts.map(p => p.category))];

  const getEffectivenessColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление промптами</h1>
          <p className="text-slate-600">Создание и управление AI-промптами для генерации контента</p>
        </div>
        <div className="flex items-center gap-2">
          <UnifiedButton variant="outline">
            <BookOpen className="w-4 h-4 mr-2" />
            Библиотека
          </UnifiedButton>
          <UnifiedButton className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Новый промпт
          </UnifiedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список промптов */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Промпты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Поиск промптов..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="space-y-1">
                    <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {category}
                    </h4>
                    {filteredPrompts
                      .filter(prompt => prompt.category === category)
                      .map((prompt) => (
                        <div
                          key={prompt.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                            selectedPrompt === prompt.id 
                              ? 'bg-purple-50 border-purple-200' 
                              : 'hover:bg-slate-50 border-slate-200'
                          }`}
                          onClick={() => setSelectedPrompt(prompt.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{prompt.title}</span>
                            <Badge 
                              className={`text-xs ${
                                prompt.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {prompt.status === 'active' ? 'Активен' : 'Черновик'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Использований: {prompt.usageCount}</span>
                            <span className={`px-2 py-1 rounded-full ${getEffectivenessColor(prompt.effectiveness)}`}>
                              {prompt.effectiveness}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Редактор промптов */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {prompts.find(p => p.id === selectedPrompt)?.title || 'Выберите промпт'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4" />
                  Тест
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                  Копировать
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="editor">Редактор</TabsTrigger>
                <TabsTrigger value="variables">Переменные</TabsTrigger>
                <TabsTrigger value="testing">Тестирование</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название промпта</label>
                  <Input placeholder="Введите название промпта" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Категория</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Контент-маркетинг</option>
                    <option>Продажи</option>
                    <option>Email-маркетинг</option>
                    <option>SMM</option>
                    <option>SEO</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Текст промпта</label>
                  <Textarea 
                    placeholder="Введите текст промпта с переменными в фигурных скобках {variable}"
                    rows={10}
                    className="font-mono text-sm"
                    defaultValue={prompts.find(p => p.id === selectedPrompt)?.content}
                  />
                </div>
                
                <div className="flex gap-2">
                  <UnifiedButton>
                    Сохранить промпт
                  </UnifiedButton>
                  <UnifiedButton variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    Оптимизировать AI
                  </UnifiedButton>
                </div>
              </TabsContent>
              
              <TabsContent value="variables" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Переменные в промпте</h3>
                  <div className="space-y-2">
                    {prompts.find(p => p.id === selectedPrompt)?.variables.map((variable, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <code className="bg-slate-200 px-2 py-1 rounded text-sm font-mono">
                          {variable}
                        </code>
                        <Input placeholder="Описание переменной" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <UnifiedButton variant="outline" className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить переменную
                  </UnifiedButton>
                </div>
              </TabsContent>
              
              <TabsContent value="testing" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <Target className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>A/B тестирование промптов</p>
                  <p className="text-sm">Сравните эффективность разных версий</p>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {prompts.find(p => p.id === selectedPrompt)?.usageCount || 0}
                      </div>
                      <div className="text-sm text-slate-600">Использований</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {prompts.find(p => p.id === selectedPrompt)?.effectiveness || 0}%
                      </div>
                      <div className="text-sm text-slate-600">Эффективность</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">4.8</div>
                      <div className="text-sm text-slate-600">Рейтинг</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
