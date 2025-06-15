import { useParams, Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ENHANCED_TEXT_EXAMPLES } from "@/data/services/enhancedTextExamples";
import { EnhancedTextExample } from "@/components/examples/EnhancedTextExample";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import EnhancedSeo from "@/components/seo/EnhancedSeo";
import { createServiceStructuredData, createBreadcrumbStructuredData } from "@/utils/seoUtils";
import { 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  Target, 
  FileText, 
  Lightbulb,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  Users,
  Zap
} from "lucide-react";

function EnhancedServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold mb-3">Услуга не найдена</h2>
        <p className="text-gray-600 mb-6">Возможно, страница была перемещена или удалена</p>
        <Button asChild variant="outline">
          <Link to="/#services">Назад к каталогу</Link>
        </Button>
      </div>
    );
  }

  const seoTitle = `${service.name} — профессиональный копирайтинг | CopyPro Cloud`;
  const seoDesc = service.detail.length > 200 ? service.detail.substring(0, 197) + "..." : service.detail;

  const breadcrumbs = [
    { name: "Главная", url: "/" },
    { name: "Услуги", url: "/#services" },
    { name: service.name, url: `/service/${service.slug}` }
  ];

  const structuredData = [
    createServiceStructuredData(service),
    createBreadcrumbStructuredData(breadcrumbs)
  ];

  const formatPrice = () => {
    if (service.price.min === service.price.max) {
      return `${service.price.min} ${service.price.currency}`;
    }
    return `${service.price.min} - ${service.price.max} ${service.price.currency}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "bg-green-100 text-green-800";
      case "Средняя": return "bg-blue-100 text-blue-800";
      case "Сложная": return "bg-orange-100 text-orange-800";
      case "Экспертная": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Получаем расширенные примеры текстов
  const enhancedExamples = ENHANCED_TEXT_EXAMPLES[service.slug] || [];

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <EnhancedSeo
        title={seoTitle}
        description={seoDesc}
        keywords={`${service.name}, копирайтинг, ${service.format}, профессиональные тексты, ${service.tags.join(', ')}`}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span>/</span>
          <Link to="/#services" className="hover:text-blue-600">Услуги</Link>
          <span>/</span>
          <span>{service.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {service.name}
              </h1>
              <Badge variant="outline" className={getDifficultyColor(service.difficulty)}>
                {service.difficulty}
              </Badge>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              {service.detail}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {service.deliveryTime.min === service.deliveryTime.max 
                    ? `${service.deliveryTime.min} ${service.deliveryTime.unit}`
                    : `${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}`
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{service.category}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < service.popularity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-1">({service.popularity}/5)</span>
              </div>
            </div>
          </div>

          <Card className="lg:w-80 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Стоимость</span>
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice()}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400">
                <Link to="/order" className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Заказать услугу
                </Link>
              </Button>
              
              <div className="text-sm text-gray-500 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Гарантия качества</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Бесплатные правки</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Соблюдение сроков</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="examples" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="examples">Примеры</TabsTrigger>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="rules">Правила</TabsTrigger>
          <TabsTrigger value="metrics">Метрики</TabsTrigger>
          <TabsTrigger value="recommendations">Советы</TabsTrigger>
        </TabsList>

        {/* Enhanced Examples Tab */}
        <TabsContent value="examples" className="space-y-6">
          {enhancedExamples.length > 0 ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  🎯 Примеры профессиональных текстов
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Изучите реальные примеры успешных текстов, созданных нашими экспертами. 
                  Каждый пример содержит структурированный контент с заголовками, цитатами, 
                  таблицами и метриками эффективности.
                </p>
              </div>
              
              {enhancedExamples.map((example, index) => (
                <EnhancedTextExample 
                  key={index} 
                  example={example} 
                  serviceSlug={service.slug} 
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Примеры готовятся
                </h3>
                <p className="text-gray-500 mb-6">
                  Профессиональные примеры текстов для этой услуги будут добавлены в ближайшее время
                </p>
                <Button asChild>
                  <Link to="/order">
                    Заказать индивидуальный пример
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Что включено
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  О формате
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Формат</h4>
                    <p className="text-gray-600">{service.format}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Категория</h4>
                    <p className="text-gray-600">{service.category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Сложность</h4>
                    <Badge className={getDifficultyColor(service.difficulty)}>
                      {service.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Популярность</h4>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < service.popularity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500">({service.popularity}/5)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Описание услуги</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{service.seoText}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Основные правила создания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {service.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{rule}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {service.seoMetrics ? (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    SEO показатели
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Средние позиции:</span>
                      <span className="font-semibold text-green-600">{service.seoMetrics.averageRanking}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Рост трафика:</span>
                      <span className="font-semibold text-blue-600">{service.seoMetrics.trafficIncrease}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Конверсия:</span>
                      <span className="font-semibold text-purple-600">{service.seoMetrics.conversionRate}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Органический рост:</span>
                      <span className="font-semibold text-orange-600">{service.seoMetrics.organicGrowth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Ожидаемые результаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">Высокое качество</div>
                      <div className="text-sm text-gray-600">Профессиональное исполнение</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">Быстрый результат</div>
                      <div className="text-sm text-gray-600">Видимые улучшения в короткие сроки</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">Долгосрочный эффект</div>
                      <div className="text-sm text-gray-600">Устойчивый рост показателей</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Метрики будут добавлены после анализа результатов</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Рекомендации для заказа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {service.recs.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Готовы заказать?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Следуя этим рекомендациям, вы получите максимально качественный результат в кратчайшие сроки.
              </p>
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400">
                  <Link to="/order" className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Заказать услугу
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/#services" className="flex items-center gap-2">
                    Другие услуги
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default EnhancedServiceDetailPage;
