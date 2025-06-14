
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, Target, Clock, Zap, Users, 
  FileText, Star, Calendar, Activity
} from "lucide-react";
import { EnhancedGenerationHistoryItem } from "./EnhancedGenerationHistory";

interface GenerationAnalyticsProps {
  history: EnhancedGenerationHistoryItem[];
}

export default function GenerationAnalytics({ history }: GenerationAnalyticsProps) {
  const analytics = useMemo(() => {
    if (history.length === 0) return null;

    const totalGenerations = history.length;
    const totalWords = history.reduce((sum, item) => sum + item.wordCount, 0);
    const totalViews = history.reduce((sum, item) => sum + item.metadata.performance.views, 0);
    const totalCost = history.reduce((sum, item) => sum + item.metadata.cost, 0);
    const avgGenerationTime = history.reduce((sum, item) => sum + item.metadata.generationTime, 0) / totalGenerations;

    // Анализ по типам контента
    const contentTypeStats = history.reduce((acc, item) => {
      acc[item.contentType] = (acc[item.contentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Анализ качества
    const avgSeoScore = history.reduce((sum, item) => sum + item.metadata.quality.seoScore, 0) / totalGenerations;
    const avgReadabilityScore = history.reduce((sum, item) => sum + item.metadata.quality.readabilityScore, 0) / totalGenerations;
    const avgUniquenessScore = history.reduce((sum, item) => sum + item.metadata.quality.uniquenessScore, 0) / totalGenerations;

    // Анализ по тону
    const toneStats = history.reduce((acc, item) => {
      acc[item.parameters.tone] = (acc[item.parameters.tone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Анализ по аудитории
    const audienceStats = history.reduce((acc, item) => {
      acc[item.parameters.audience] = (acc[item.parameters.audience] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Анализ активности по дням
    const dailyStats = history.reduce((acc, item) => {
      const date = item.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Топ тегов
    const tagStats = history.reduce((acc, item) => {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topTags = Object.entries(tagStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    // Самые популярные результаты
    const popularResults = [...history]
      .sort((a, b) => b.metadata.performance.views - a.metadata.performance.views)
      .slice(0, 5);

    // Лучшие по качеству
    const highQualityResults = [...history]
      .sort((a, b) => {
        const qualityA = (a.metadata.quality.seoScore + a.metadata.quality.readabilityScore + a.metadata.quality.uniquenessScore) / 3;
        const qualityB = (b.metadata.quality.seoScore + b.metadata.quality.readabilityScore + b.metadata.quality.uniquenessScore) / 3;
        return qualityB - qualityA;
      })
      .slice(0, 5);

    // Анализ трендов за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentGenerations = history.filter(item => item.createdAt >= thirtyDaysAgo);
    const recentTrend = recentGenerations.length;

    return {
      overview: {
        totalGenerations,
        totalWords,
        totalViews,
        totalCost,
        avgGenerationTime,
        recentTrend
      },
      quality: {
        avgSeoScore,
        avgReadabilityScore,
        avgUniquenessScore
      },
      distribution: {
        contentTypeStats,
        toneStats,
        audienceStats,
        dailyStats
      },
      insights: {
        topTags,
        popularResults,
        highQualityResults
      }
    };
  }, [history]);

  if (!analytics) {
    return (
      <Card>
        <CardContent className="text-center py-8 text-slate-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium mb-2">Недостаточно данных</p>
          <p className="text-sm">Сгенерируйте больше контента для получения аналитики</p>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const getPercentageColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Обзорная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">
              {analytics.overview.totalGenerations}
            </div>
            <div className="text-sm text-slate-600">Всего генераций</div>
            <div className="text-xs text-green-600 mt-1">
              +{analytics.overview.recentTrend} за 30 дней
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">
              {analytics.overview.totalWords.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Слов создано</div>
            <div className="text-xs text-slate-500 mt-1">
              ~{Math.round(analytics.overview.totalWords / analytics.overview.totalGenerations)} в среднем
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-600">
              {analytics.overview.totalViews}
            </div>
            <div className="text-sm text-slate-600">Просмотров</div>
            <div className="text-xs text-slate-500 mt-1">
              ~{Math.round(analytics.overview.totalViews / analytics.overview.totalGenerations)} на текст
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">
              {analytics.overview.avgGenerationTime.toFixed(1)}с
            </div>
            <div className="text-sm text-slate-600">Среднее время</div>
            <div className="text-xs text-slate-500 mt-1">
              {formatCurrency(analytics.overview.totalCost)} потрачено
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Анализ качества */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Анализ качества
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getPercentageColor(analytics.quality.avgSeoScore)}`}>
                {analytics.quality.avgSeoScore.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600 mb-2">Средний SEO</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${analytics.quality.avgSeoScore}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-bold ${getPercentageColor(analytics.quality.avgReadabilityScore)}`}>
                {analytics.quality.avgReadabilityScore.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600 mb-2">Читаемость</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${analytics.quality.avgReadabilityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-bold ${getPercentageColor(analytics.quality.avgUniquenessScore)}`}>
                {analytics.quality.avgUniquenessScore.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600 mb-2">Уникальность</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${analytics.quality.avgUniquenessScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Распределение по типам и параметрам */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Типы контента</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.distribution.contentTypeStats)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => {
                  const percentage = (count / analytics.overview.totalGenerations) * 100;
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Тон текстов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.distribution.toneStats)
                .sort(([,a], [,b]) => b - a)
                .map(([tone, count]) => {
                  const percentage = (count / analytics.overview.totalGenerations) * 100;
                  return (
                    <div key={tone} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{tone}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Топ теги и результаты */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Популярные теги</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analytics.insights.topTags.map(([tag, count]) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Лучшие результаты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.insights.highQualityResults.slice(0, 3).map((item) => {
                const avgQuality = (
                  item.metadata.quality.seoScore + 
                  item.metadata.quality.readabilityScore + 
                  item.metadata.quality.uniquenessScore
                ) / 3;
                
                return (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-600">
                        {item.metadata.performance.views} просмотров
                      </div>
                    </div>
                    <Badge className={`${getPercentageColor(avgQuality)} border-current`}>
                      {avgQuality.toFixed(0)}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Активность по времени */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Активность по дням
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.distribution.dailyStats)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .slice(0, 7)
              .map(([date, count]) => {
                const maxCount = Math.max(...Object.values(analytics.distribution.dailyStats));
                const percentage = (count / maxCount) * 100;
                
                return (
                  <div key={date} className="flex items-center gap-4">
                    <span className="text-sm w-24">
                      {new Date(date).toLocaleDateString('ru-RU', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
