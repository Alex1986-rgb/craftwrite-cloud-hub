
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  Tag,
  TrendingUp,
  Target,
  Lightbulb
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const categories = [
  { name: "Все статьи", count: 48, color: "bg-primary" },
  { name: "SEO", count: 15, color: "bg-emerald-500" },
  { name: "Копирайтинг", count: 12, color: "bg-blue-500" },
  { name: "Контент-маркетинг", count: 10, color: "bg-purple-500" },
  { name: "Кейсы", count: 8, color: "bg-orange-500" },
  { name: "Советы", count: 6, color: "bg-cyan-500" }
];

const featuredPosts = [
  {
    id: 1,
    title: "10 секретов эффективного SEO-копирайтинга в 2024 году",
    excerpt: "Узнайте, как писать тексты, которые не только нравятся людям, но и высоко ранжируются в поисковых системах.",
    category: "SEO",
    author: "Анна Петрова",
    date: "15 мар 2024",
    readTime: "8 мин",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    title: "Кейс: Как мы увеличили конверсию лендинга на 340%",
    excerpt: "Подробный разбор реального проекта - от постановки задачи до впечатляющих результатов.",
    category: "Кейсы",
    author: "Михаил Сидоров",
    date: "12 мар 2024",
    readTime: "12 мин",
    image: "/placeholder.svg",
    featured: true
  }
];

const regularPosts = [
  {
    id: 3,
    title: "Психология продающих текстов: как влиять на решения клиентов",
    excerpt: "Разбираем психологические триггеры и приемы, которые заставляют покупать.",
    category: "Копирайтинг",
    author: "Елена Козлова",
    date: "10 мар 2024",
    readTime: "6 мин",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Контент-план для социальных сетей: пошаговое руководство",
    excerpt: "Создаем эффективную контент-стратегию для Instagram, Facebook и других платформ.",
    category: "Контент-маркетинг",
    author: "Дмитрий Волков",
    date: "8 мар 2024",
    readTime: "10 мин",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Email-маркетинг 2024: тренды и лучшие практики",
    excerpt: "Что работает в email-маркетинге сегодня и как повысить открываемость писем.",
    category: "Контент-маркетинг",
    author: "Анна Петрова",
    date: "5 мар 2024",
    readTime: "7 мин",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "ТОП-10 ошибок в текстах для сайта",
    excerpt: "Разбираем самые частые ошибки, которые убивают конверсию и отпугивают клиентов.",
    category: "Советы",
    author: "Елена Козлова",
    date: "3 мар 2024",
    readTime: "5 мин",
    image: "/placeholder.svg"
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = [...featuredPosts, ...regularPosts].filter(post => {
    const matchesCategory = selectedCategory === "Все статьи" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold">
                <BookOpen className="w-5 h-5 mr-2" />
                Блог
              </Badge>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Экспертные знания в копирайтинге
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Полезные статьи, кейсы и советы от профессионалов индустрии. 
                Изучайте лучшие практики и развивайте свои навыки
              </p>
            </div>

            {/* Поиск */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Категории */}
        <section className="py-8 bg-white border-b">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Рекомендуемые статьи */}
        {selectedCategory === "Все статьи" && (
          <section className="py-16">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                Рекомендуемые статьи
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-primary" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge>{post.category}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                            Читать далее
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Все статьи */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Все статьи
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => !post.featured || selectedCategory !== "Все статьи").map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Target className="w-12 h-12 text-slate-400" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Статьи не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить критерии поиска</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Хотите больше полезного контента?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Подпишитесь на нашу рассылку и получайте свежие статьи и кейсы первыми
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Ваш email"
                className="bg-white text-gray-900"
              />
              <Button variant="secondary" size="lg">
                Подписаться
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
