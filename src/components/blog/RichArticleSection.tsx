import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  User, 
  Eye, 
  ArrowRight, 
  Quote, 
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Star,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  views: string;
  image: string;
  tags: string[];
  stats?: {
    metric: string;
    value: string;
    change: string;
  }[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  slug: string;
}

interface RichArticleSectionProps {
  articles: Article[];
  sectionTitle: string;
  sectionDescription: string;
}

export default function RichArticleSection({ 
  articles, 
  sectionTitle, 
  sectionDescription 
}: RichArticleSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Star className="w-4 h-4" />
            Экспертные материалы
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className={`group cursor-pointer transition-all duration-500 hover:shadow-xl border-0 bg-card/80 backdrop-blur-sm ${
                hoveredCard === article.id ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard(article.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Article Image */}
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    #{index + 1}
                  </Badge>
                </div>

                {/* View Count */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <User className="w-3 h-3" />
                  {article.author}
                  <Separator orientation="vertical" className="h-3" />
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>

                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </CardTitle>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Statistics Table (if exists) */}
                {article.stats && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Ключевые показатели
                    </h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {article.stats.map((stat, i) => (
                        <div key={i} className="text-xs">
                          <div className="font-bold text-primary">{stat.value}</div>
                          <div className="text-muted-foreground">{stat.metric}</div>
                          <div className="text-green-600 text-[10px]">{stat.change}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quote (if exists) */}
                {article.quote && (
                  <div className="mb-4 p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <Quote className="w-4 h-4 text-primary mb-2" />
                    <p className="text-sm italic text-foreground mb-2">
                      "{article.quote.text}"
                    </p>
                    <div className="text-xs text-muted-foreground">
                      — {article.quote.author}, {article.quote.role}
                    </div>
                  </div>
                )}

                {/* Data Table (if exists) */}
                {article.table && (
                  <div className="mb-4 overflow-hidden rounded-lg border">
                    <table className="w-full text-xs">
                      <thead className="bg-muted">
                        <tr>
                          {article.table.headers.map((header, i) => (
                            <th key={i} className="px-2 py-1.5 text-left font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {article.table.rows.map((row, i) => (
                          <tr key={i} className="border-t">
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 py-1.5 text-muted-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  asChild
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <Link to={`/blog/${article.slug}`} className="flex items-center justify-center gap-2">
                    Читать полностью
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Нужен качественный контент для вашего бизнеса?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Наши эксперты создадут уникальные тексты, которые привлекут клиентов и увеличат продажи
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3" asChild>
              <Link to="/order">
                <Target className="w-4 h-4 mr-2" />
                Заказать контент
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3" asChild>
              <Link to="/portfolio">
                <Award className="w-4 h-4 mr-2" />
                Посмотреть портфолио
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}