import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Share2, BookmarkPlus, Star, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fullExpertArticles } from '@/data/articles/fullExpertArticles';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = fullExpertArticles.find(a => a.slug === slug);

  // Parse markdown content
  const parsedContent = useMemo(() => {
    if (!article?.fullContent) return '';
    
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    // Process markdown and add anchor links to headings
    let html = marked.parse(article.fullContent) as string;
    
    // Add CSS classes to HTML elements
    html = html
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-slate-800 mt-12 mb-6 border-b-2 border-blue-500 pb-2">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-5 border-b border-slate-200 pb-2">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-blue-600 mt-8 mb-4">')
      .replace(/<h4>/g, '<h4 class="text-lg font-semibold text-purple-600 mt-6 mb-3">')
      .replace(/<p>/g, '<p class="text-slate-700 leading-relaxed mb-6">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside text-slate-700 mb-6 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside text-slate-700 mb-6 space-y-2">')
      .replace(/<li>/g, '<li class="leading-relaxed">')
      .replace(/<strong>/g, '<strong class="font-semibold text-slate-800">')
      .replace(/<em>/g, '<em class="italic text-slate-600">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 rounded-r-lg italic text-slate-700">')
      .replace(/<code>/g, '<code class="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono">')
      .replace(/<pre>/g, '<pre class="bg-slate-800 text-slate-100 p-4 rounded-lg mb-6 overflow-x-auto">')
      .replace(/<table>/g, '<table class="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 mb-8">')
      .replace(/<thead>/g, '<thead class="bg-gradient-to-r from-blue-500 to-purple-600">')
      .replace(/<th>/g, '<th class="border border-slate-200 px-4 py-3 text-left font-semibold text-white text-sm">')
      .replace(/<td>/g, '<td class="border border-slate-200 px-4 py-3 text-slate-700 text-sm">')
      .replace(/<tr>/g, '<tr class="hover:bg-blue-50 transition-colors">');
    
    return DOMPurify.sanitize(html);
  }, [article?.fullContent]);

  // Generate table of contents
  const tableOfContents = useMemo(() => {
    if (!article?.fullContent) return [];
    
    const headings = [];
    const lines = article.fullContent.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^(#{1,4})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const slug = text.toLowerCase().replace(/[^\w\u0400-\u04FF]+/g, '-').replace(/^-+|-+$/g, '');
        headings.push({ level, text, slug });
      }
    });
    
    return headings;
  }, [article?.fullContent]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Статья не найдена</h1>
          <p className="text-slate-600 mb-8">Возможно, статья была перемещена или удалена</p>
          <Link to="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
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
                className="article-content max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
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
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Содержание
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.slug}`}
                        className={`block text-sm hover:text-blue-600 transition-colors ${
                          heading.level === 1 ? 'font-semibold text-slate-800' :
                          heading.level === 2 ? 'font-medium text-slate-700 ml-2' :
                          heading.level === 3 ? 'text-slate-600 ml-4' :
                          'text-slate-500 ml-6'
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </Card>
              )}

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
                          to={`/article/${relatedSlug}`}
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
    </div>
  );
}