
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Share2, 
  Download, 
  Send, 
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  Image,
  Video
} from 'lucide-react';

interface CMSConnection {
  id: string;
  name: string;
  type: 'wordpress' | 'telegram' | 'vk' | 'facebook' | 'instagram';
  connected: boolean;
  lastSync?: Date;
  config: Record<string, any>;
}

interface PublishJob {
  id: string;
  platform: string;
  title: string;
  status: 'pending' | 'publishing' | 'published' | 'failed';
  scheduledAt?: Date;
  publishedAt?: Date;
}

export default function CMSIntegration() {
  const [connections, setConnections] = useState<CMSConnection[]>([
    {
      id: '1',
      name: 'WordPress Blog',
      type: 'wordpress',
      connected: false,
      config: { url: '', username: '', password: '' }
    },
    {
      id: '2',
      name: 'Telegram Channel',
      type: 'telegram',
      connected: true,
      lastSync: new Date(),
      config: { botToken: '***', channelId: '@mychannel' }
    },
    {
      id: '3',
      name: 'VK Group',
      type: 'vk',
      connected: false,
      config: { accessToken: '', groupId: '' }
    }
  ]);

  const [publishJobs, setPublishJobs] = useState<PublishJob[]>([
    {
      id: '1',
      platform: 'Telegram',
      title: 'Новый пост о копирайтинге',
      status: 'published',
      publishedAt: new Date()
    },
    {
      id: '2',
      platform: 'WordPress',
      title: 'SEO-статья',
      status: 'pending',
      scheduledAt: new Date(Date.now() + 3600000)
    }
  ]);

  const [selectedText, setSelectedText] = useState('');
  const [publishSettings, setPublishSettings] = useState({
    addHashtags: true,
    schedulePublishing: false,
    autoFormat: true,
    includeImages: true
  });

  const handleConnect = (connectionId: string) => {
    setConnections(connections.map(conn => 
      conn.id === connectionId 
        ? { ...conn, connected: !conn.connected, lastSync: new Date() }
        : conn
    ));
  };

  const handlePublish = (platform: string) => {
    const newJob: PublishJob = {
      id: Date.now().toString(),
      platform,
      title: selectedText.slice(0, 50) + '...',
      status: 'publishing'
    };

    setPublishJobs([newJob, ...publishJobs]);

    // Simulate publishing
    setTimeout(() => {
      setPublishJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'published', publishedAt: new Date() }
          : job
      ));
    }, 2000);
  };

  const getStatusIcon = (status: PublishJob['status']) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'publishing': return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <div className="w-4 h-4 border-2 border-yellow-500 rounded-full" />;
    }
  };

  const getStatusBadge = (status: PublishJob['status']) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-100 text-green-800">Опубликовано</Badge>;
      case 'publishing': return <Badge className="bg-blue-100 text-blue-800">Публикуется</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Ошибка</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
    }
  };

  const getPlatformIcon = (type: CMSConnection['type']) => {
    switch (type) {
      case 'wordpress': return <Globe className="w-5 h-5" />;
      case 'telegram': return <Send className="w-5 h-5" />;
      case 'vk': return <Share2 className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            Интеграция с CMS и соцсетями
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connections" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connections">Подключения</TabsTrigger>
              <TabsTrigger value="publish">Публикация</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-4 mt-4">
              {connections.map((connection) => (
                <Card key={connection.id} className="border">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(connection.type)}
                        <div>
                          <h4 className="font-medium">{connection.name}</h4>
                          {connection.lastSync && (
                            <p className="text-sm text-slate-600">
                              Последняя синхронизация: {connection.lastSync.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {connection.connected && (
                          <Badge className="bg-green-100 text-green-800">Подключено</Badge>
                        )}
                        <Button
                          variant={connection.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnect(connection.id)}
                        >
                          {connection.connected ? 'Отключить' : 'Подключить'}
                        </Button>
                      </div>
                    </div>

                    {!connection.connected && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <h5 className="font-medium mb-2">Настройки подключения</h5>
                        {connection.type === 'wordpress' && (
                          <div className="space-y-2">
                            <Input placeholder="URL сайта" />
                            <Input placeholder="Имя пользователя" />
                            <Input type="password" placeholder="Пароль" />
                          </div>
                        )}
                        {connection.type === 'telegram' && (
                          <div className="space-y-2">
                            <Input placeholder="Bot Token" />
                            <Input placeholder="Channel ID" />
                          </div>
                        )}
                        {connection.type === 'vk' && (
                          <div className="space-y-2">
                            <Input placeholder="Access Token" />
                            <Input placeholder="Group ID" />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="publish" className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Текст для публикации</label>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={6}
                  placeholder="Введите или вставьте текст для публикации..."
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Настройки публикации
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Автоматическое форматирование</span>
                    <Switch
                      checked={publishSettings.autoFormat}
                      onCheckedChange={(checked) => 
                        setPublishSettings({...publishSettings, autoFormat: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Добавлять хештеги</span>
                    <Switch
                      checked={publishSettings.addHashtags}
                      onCheckedChange={(checked) => 
                        setPublishSettings({...publishSettings, addHashtags: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Включать изображения</span>
                    <Switch
                      checked={publishSettings.includeImages}
                      onCheckedChange={(checked) => 
                        setPublishSettings({...publishSettings, includeImages: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Отложенная публикация</span>
                    <Switch
                      checked={publishSettings.schedulePublishing}
                      onCheckedChange={(checked) => 
                        setPublishSettings({...publishSettings, schedulePublishing: checked})
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connections.filter(c => c.connected).map((connection) => (
                  <Button
                    key={connection.id}
                    onClick={() => handlePublish(connection.name)}
                    disabled={!selectedText}
                    className="h-16 flex-col gap-2"
                  >
                    {getPlatformIcon(connection.type)}
                    Опубликовать в {connection.name}
                  </Button>
                ))}
              </div>

              {connections.filter(c => c.connected).length === 0 && (
                <div className="text-center py-8 text-slate-600">
                  <Share2 className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>Нет подключенных платформ</p>
                  <p className="text-sm">Подключите CMS или соцсети для публикации</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-4">
              {publishJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-slate-600">
                            {job.platform} • {job.publishedAt?.toLocaleString() || 
                             job.scheduledAt?.toLocaleString() || 'Не запланировано'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(job.status)}
                        {job.status === 'published' && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {publishJobs.length === 0 && (
                <div className="text-center py-8 text-slate-600">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>История публикаций пуста</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
