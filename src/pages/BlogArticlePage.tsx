import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Share2, BookmarkPlus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import ModernFooter from '@/components/common/ModernFooter';
import { fullExpertArticles } from '@/data/articles/fullExpertArticles';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = fullExpertArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
        <UnifiedHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Статья не найдена</h1>
          <p className="text-slate-600 mb-8">Возможно, статья была перемещена или удалена</p>
          <Link to="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </main>
        <ModernFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
      <UnifiedHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к статьям
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              {/* Header */}
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
                  {article.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4 text-slate-600">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {article.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{article.author}</div>
                        <div className="text-sm">{article.authorRole}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views}
                    </div>
                    <div className="text-slate-500">{article.publishDate}</div>
                  </div>
                </div>
              </header>

              {/* Hero Image */}
              <div className="mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              {/* Stats Section */}
              {article.stats && (
                <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Ключевые показатели</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {article.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                          <div className="text-sm text-slate-600">{stat.metric}</div>
                          <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quote */}
              {article.quote && (
                <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl">
                  <p className="text-lg italic text-slate-700 mb-3">"{article.quote.text}"</p>
                  <footer className="text-sm">
                    <strong className="text-slate-800">{article.quote.author}</strong>
                    {article.quote.role && (
                      <span className="text-slate-600"> — {article.quote.role}</span>
                    )}
                  </footer>
                </blockquote>
              )}

              {/* Content */}
              <div 
                className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-800"
                dangerouslySetInnerHTML={{ 
                  __html: article.fullContent.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<h$&>').replace(/<h(\d+)>/g, '<h$1 class="text-slate-800 font-bold mt-8 mb-4">') 
                }}
              />

              {/* Table */}
              {article.table && (
                <div className="my-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          {article.table.headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-sm font-semibold text-slate-800">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {article.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-slate-50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-6 py-4 text-sm text-slate-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Action Buttons */}
              <Card className="p-4">
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                  <Button className="w-full" variant="outline">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Сохранить
                  </Button>
                </div>
              </Card>

              {/* Related Articles */}
              {article.relatedArticles && (
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Похожие статьи</h3>
                  <div className="space-y-3">
                    {article.relatedArticles.map(relatedSlug => {
                      const relatedArticle = fullExpertArticles.find(a => a.slug === relatedSlug);
                      if (!relatedArticle) return null;
                      
                      return (
                        <Link 
                          key={relatedSlug}
                          to={`/blog/${relatedSlug}`}
                          className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="text-sm font-medium text-slate-800 mb-1">
                            {relatedArticle.title}
                          </div>
                          <div className="text-xs text-slate-600">
                            {relatedArticle.author} • {relatedArticle.readTime}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Author Info */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Об авторе</h3>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{article.author}</div>
                    <div className="text-sm text-slate-600 mb-2">{article.authorRole}</div>
                    <div className="text-xs text-slate-500">{article.authorExperience}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
}