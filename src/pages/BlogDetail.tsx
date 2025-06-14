import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2,
  BookOpen,
  TrendingUp,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { blogPosts } from "@/data/blogPosts";

export default function BlogDetail() {
  const { id } = useParams();
  const postId = id ? parseInt(id, 10) : null;
  const post = postId ? blogPosts.find(p => p.id === postId) : null;

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50 py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
            <p className="text-muted-foreground mb-8">Извините, запрашиваемая статья не существует.</p>
            <Button asChild>
              <Link to="/blog">Вернуться к блогу</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = post.relatedPosts.map(id => blogPosts.find(p => p.id === id)).filter(Boolean);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <Button variant="outline" asChild className="mb-8">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Вернуться к блогу
              </Link>
            </Button>

            <div className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Изображение статьи */}
        <section className="py-8">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Контент статьи */}
        <section className="py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:mb-2 prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Card>
          </div>
        </section>

        {/* Автор */}
        <section className="py-16 bg-slate-50/50">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                  <p className="text-muted-foreground mb-4">
                    Эксперт по {post.category.toLowerCase()} с 8-летним опытом. 
                    Помог более чем 200 компаниям улучшить свои результаты.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      <BookOpen className="w-3 h-3 mr-1" />
                      15+ статей
                    </Badge>
                    <Badge variant="outline">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      200+ клиентов
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Похожие статьи */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Похожие статьи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3">{relatedPost.category}</Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {relatedPost.readTime}
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/blog/${relatedPost.id}`}>Читать</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Нужны тексты для вашего бизнеса?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получите профессиональный контент, который приводит клиентов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/order">Заказать контент</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/#contact">Получить консультацию</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
