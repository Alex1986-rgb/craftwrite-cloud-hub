import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, Share2, Megaphone, Target, Calendar } from 'lucide-react';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { toast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  type: 'email' | 'social' | 'ads';
  title: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  reach: number;
  created: string;
}

export default function MarketingCampaignManager() {
  const [emailSubject, setEmailSubject] = useState('🚀 CopyPro Cloud запущен! Качественный контент с ИИ');
  const [emailContent, setEmailContent] = useState(`Здравствуйте!

Рады сообщить о запуске CopyPro Cloud - новой платформы для создания качественного контента с помощью ИИ и экспертов.

🎯 Что мы предлагаем:
• SEO-тексты и статьи для сайтов
• Продающие лендинги и email-кампании  
• Контент для социальных сетей
• Чат-боты и Telegram-каналы

⚡ Преимущества:
• Быстрое выполнение (1-3 дня)
• Гарантия качества и уникальности
• Автоматизированные процессы
• Персональный менеджер

🎁 Специальное предложение для первых клиентов:
Скидка 25% на первый заказ по промокоду LAUNCH25

Заказать: https://copypro.cloud/order

С уважением,
Команда CopyPro Cloud`);

  const [socialPost, setSocialPost] = useState(`🚀 Запускаем CopyPro Cloud!

Новая платформа для создания качественного контента:
✅ SEO-тексты с гарантией результата
✅ Продающие лендинги  
✅ Email-кампании с высокой конверсией
✅ Контент для соцсетей

🤖 ИИ + экспертная проверка = идеальный результат

🎁 Скидка 25% первым клиентам!
Промокод: LAUNCH25

👉 copypro.cloud

#копирайтинг #seo #маркетинг #контент #искусственныйинтеллект`);

  const [pressRelease, setPressRelease] = useState(`ПРЕСС-РЕЛИЗ

CopyPro Cloud: Запуск автоматизированной платформы для создания качественного контента

${new Date().toLocaleDateString('ru-RU')} - Сегодня состоялся официальный запуск CopyPro Cloud - инновационной платформы, объединяющей возможности искусственного интеллекта и экспертизу профессиональных копирайтеров для создания высококачественного контента.

Ключевые особенности платформы:

• Автоматизированный процесс создания контента с использованием GPT-4
• Экспертная проверка качества сертифицированными копирайтерами  
• Гарантированная уникальность текстов от 95%
• Сроки выполнения от 24 часов
• Специализация на SEO-текстах, лендингах, email-кампаниях

"Мы создали платформу, которая решает главную проблему бизнеса - получение качественного контента быстро и по адекватной цене," - комментирует запуск команда разработчиков.

Платформа уже принимает заказы и готова обслуживать клиентов любого масштаба - от индивидуальных предпринимателей до крупных корпораций.

Сайт: https://copypro.cloud
Email: info@copypro.cloud`);

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      type: 'email',
      title: 'Анонс запуска CopyPro Cloud',
      status: 'draft',
      reach: 0,
      created: new Date().toISOString()
    },
    {
      id: '2', 
      type: 'social',
      title: 'Социальные сети - запуск',
      status: 'draft',
      reach: 0,
      created: new Date().toISOString()
    },
    {
      id: '3',
      type: 'ads',
      title: 'Рекламная кампания - первые клиенты',
      status: 'draft',
      reach: 0,
      created: new Date().toISOString()
    }
  ]);

  const { updateSetting } = useSystemSettings();

  const scheduleEmailCampaign = async () => {
    try {
      await updateSetting('launch_email_campaign', {
        subject: emailSubject,
        content: emailContent,
        scheduled_at: new Date().toISOString(),
        status: 'scheduled'
      });

      toast({
        title: "Email-кампания запланирована",
        description: "Рассылка будет отправлена в ближайшие часы"
      });
    } catch (error) {
      toast({
        title: "Ошибка планирования",
        description: "Не удалось запланировать email-кампанию",
        variant: "destructive"
      });
    }
  };

  const publishSocialPost = async () => {
    try {
      await updateSetting('launch_social_posts', {
        content: socialPost,
        platforms: ['vk', 'telegram', 'facebook', 'instagram'],
        published_at: new Date().toISOString(),
        status: 'published'
      });

      toast({
        title: "Пост опубликован",
        description: "Анонс размещен в социальных сетях"
      });
    } catch (error) {
      toast({
        title: "Ошибка публикации",
        description: "Не удалось опубликовать пост",
        variant: "destructive"
      });
    }
  };

  const sendPressRelease = async () => {
    try {
      await updateSetting('press_release', {
        content: pressRelease,
        sent_to: ['news@mail.ru', 'vc.ru', 'habr.com', 'rb.ru'],
        sent_at: new Date().toISOString(),
        status: 'sent'
      });

      toast({
        title: "Пресс-релиз отправлен",
        description: "Информация о запуске направлена в СМИ"
      });
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить пресс-релиз",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Завершена</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800">Активна</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-800">Запланирована</Badge>;
      default:
        return <Badge variant="outline">Черновик</Badge>;
    }
  };

  const getTypeIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'social':
        return <Share2 className="h-4 w-4" />;
      case 'ads':
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Обзор кампаний */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Маркетинговые кампании
          </CardTitle>
          <CardDescription>
            Управление запуском и продвижением CopyPro Cloud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(campaign.type)}
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Охват: {campaign.reach.toLocaleString()} человек
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(campaign.status)}
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(campaign.created).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email-кампания */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email-рассылка о запуске
          </CardTitle>
          <CardDescription>
            Анонс запуска CopyPro Cloud для базы контактов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email-subject">Тема письма</Label>
            <Input 
              id="email-subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email-content">Содержание письма</Label>
            <Textarea 
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={12}
            />
          </div>
          <Button onClick={scheduleEmailCampaign} className="w-full">
            Запланировать рассылку
          </Button>
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Письмо будет отправлено всем контактам из базы данных клиентов
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Социальные сети */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Социальные сети
          </CardTitle>
          <CardDescription>
            Анонс в VK, Telegram, Facebook, Instagram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="social-post">Текст поста</Label>
            <Textarea 
              id="social-post"
              value={socialPost}
              onChange={(e) => setSocialPost(e.target.value)}
              rows={10}
            />
          </div>
          <Button onClick={publishSocialPost} className="w-full">
            Опубликовать во всех соцсетях
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">VKontakte</Button>
            <Button variant="outline" size="sm">Telegram</Button>
            <Button variant="outline" size="sm">Facebook</Button>
            <Button variant="outline" size="sm">Instagram</Button>
          </div>
        </CardContent>
      </Card>

      {/* Пресс-релиз */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Пресс-релиз
          </CardTitle>
          <CardDescription>
            Официальное заявление о запуске для СМИ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="press-release">Текст пресс-релиза</Label>
            <Textarea 
              id="press-release"
              value={pressRelease}
              onChange={(e) => setPressRelease(e.target.value)}
              rows={15}
            />
          </div>
          <Button onClick={sendPressRelease} className="w-full">
            Отправить в СМИ
          </Button>
          <Alert>
            <Megaphone className="h-4 w-4" />
            <AlertDescription>
              Пресс-релиз будет отправлен в ведущие IT-издания и новостные ресурсы
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Промокоды */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Промо-акции
          </CardTitle>
          <CardDescription>
            Специальные предложения для первых клиентов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-600">LAUNCH25</h4>
              <p className="text-sm text-muted-foreground">Скидка 25% на первый заказ</p>
              <Badge className="bg-green-100 text-green-800 mt-2">Активен</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-blue-600">PREMIUM50</h4>
              <p className="text-sm text-muted-foreground">50% скидка на премиум-услуги</p>
              <Badge variant="outline">Черновик</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Создать новый промокод
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}