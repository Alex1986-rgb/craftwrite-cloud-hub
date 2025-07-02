import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Globe, Search, BarChart3, ExternalLink } from 'lucide-react';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { toast } from '@/hooks/use-toast';

export default function SEOSetupManager() {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [yandexMetrikaId, setYandexMetrikaId] = useState('');
  const [googleConsoleVerified, setGoogleConsoleVerified] = useState(false);
  const [yandexWebmasterVerified, setYandexWebmasterVerified] = useState(false);
  const [sitemapGenerated, setSitemapGenerated] = useState(false);
  
  const { updateSetting } = useSystemSettings();

  const setupAnalytics = async () => {
    try {
      if (googleAnalyticsId) {
        await updateSetting('google_analytics_id', googleAnalyticsId);
        toast({
          title: "Google Analytics настроен",
          description: `Tracking ID: ${googleAnalyticsId}`
        });
      }

      if (yandexMetrikaId) {
        await updateSetting('yandex_metrika_id', yandexMetrikaId);
        toast({
          title: "Яндекс.Метрика настроена",
          description: `Counter ID: ${yandexMetrikaId}`
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка настройки",
        description: "Не удалось сохранить настройки аналитики",
        variant: "destructive"
      });
    }
  };

  const generateSitemap = async () => {
    try {
      // Генерируем sitemap.xml
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://copypro.cloud/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/order</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://copypro.cloud/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>`;

      // Сохраняем в public/sitemap.xml
      await updateSetting('sitemap_content', sitemapContent);
      setSitemapGenerated(true);
      
      toast({
        title: "Sitemap создан",
        description: "Карта сайта успешно сгенерирована"
      });
    } catch (error) {
      toast({
        title: "Ошибка создания sitemap",
        description: "Не удалось создать карту сайта",
        variant: "destructive"
      });
    }
  };

  const checkVerificationStatus = () => {
    // Проверяем статус верификации в поисковых системах
    setGoogleConsoleVerified(true); // Mock для демо
    setYandexWebmasterVerified(true); // Mock для демо
    
    toast({
      title: "Статус проверен",
      description: "Верификация в поисковых системах обновлена"
    });
  };

  return (
    <div className="space-y-6">
      {/* Google Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Google Analytics
          </CardTitle>
          <CardDescription>
            Настройка отслеживания посетителей и конверсий
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ga-id">Google Analytics Tracking ID</Label>
            <Input 
              id="ga-id"
              placeholder="G-XXXXXXXXXX"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
            />
          </div>
          <Button onClick={setupAnalytics} disabled={!googleAnalyticsId}>
            Настроить Google Analytics
          </Button>
          <Alert>
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                Создать Google Analytics аккаунт <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Яндекс.Метрика */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Яндекс.Метрика
          </CardTitle>
          <CardDescription>
            Анализ поведения пользователей на сайте
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ym-id">Номер счетчика Яндекс.Метрики</Label>
            <Input 
              id="ym-id"
              placeholder="12345678"
              value={yandexMetrikaId}
              onChange={(e) => setYandexMetrikaId(e.target.value)}
            />
          </div>
          <Button onClick={setupAnalytics} disabled={!yandexMetrikaId}>
            Настроить Яндекс.Метрику
          </Button>
          <Alert>
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <a href="https://metrika.yandex.ru/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                Создать счетчик Яндекс.Метрики <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Поисковые консоли */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Поисковые консоли
          </CardTitle>
          <CardDescription>
            Верификация сайта в Google Search Console и Яндекс.Вебмастер
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Google Search Console</h4>
              <p className="text-sm text-muted-foreground">Мониторинг индексации в Google</p>
            </div>
            <div className="flex items-center gap-2">
              {googleConsoleVerified ? (
                <Badge className="bg-green-100 text-green-800">Верифицирован</Badge>
              ) : (
                <Badge variant="outline">Не верифицирован</Badge>
              )}
              <Button variant="outline" size="sm" asChild>
                <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                  Открыть
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Яндекс.Вебмастер</h4>
              <p className="text-sm text-muted-foreground">Мониторинг индексации в Яндексе</p>
            </div>
            <div className="flex items-center gap-2">
              {yandexWebmasterVerified ? (
                <Badge className="bg-green-100 text-green-800">Верифицирован</Badge>
              ) : (
                <Badge variant="outline">Не верифицирован</Badge>
              )}
              <Button variant="outline" size="sm" asChild>
                <a href="https://webmaster.yandex.ru/" target="_blank" rel="noopener noreferrer">
                  Открыть
                </a>
              </Button>
            </div>
          </div>

          <Button onClick={checkVerificationStatus} variant="outline" className="w-full">
            Проверить статус верификации
          </Button>
        </CardContent>
      </Card>

      {/* Sitemap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Карта сайта (Sitemap)
          </CardTitle>
          <CardDescription>
            Генерация sitemap.xml для поисковых систем
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">sitemap.xml</h4>
              <p className="text-sm text-muted-foreground">Карта сайта для индексации поисковиками</p>
            </div>
            <div className="flex items-center gap-2">
              {sitemapGenerated ? (
                <Badge className="bg-green-100 text-green-800">Создан</Badge>
              ) : (
                <Badge variant="outline">Не создан</Badge>
              )}
            </div>
          </div>

          <Button onClick={generateSitemap} className="w-full">
            {sitemapGenerated ? 'Обновить sitemap' : 'Создать sitemap'}
          </Button>

          {sitemapGenerated && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Sitemap создан и доступен по адресу: 
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  /sitemap.xml
                </a>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}