import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, Share2, FileText, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportService } from "@/services/export";

interface ExportManagerProps {
  text: string;
  title?: string;
  contentType?: string;
}

export default function ExportManager({ text, title = "Сгенерированный текст", contentType }: ExportManagerProps) {
  const [exportFormat, setExportFormat] = useState("txt");
  const [emailSettings, setEmailSettings] = useState({
    to: "",
    subject: title,
    includeAttachment: true
  });
  const [cmsSettings, setCmsSettings] = useState({
    platform: "",
    endpoint: "",
    apiKey: "",
    postTitle: title,
    postStatus: "draft"
  });
  const [socialSettings, setSocialSettings] = useState({
    platform: "",
    caption: "",
    schedulePost: false,
    scheduleTime: ""
  });
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportFormats = [
    { value: "txt", label: "Текстовый файл (.txt)", icon: FileText },
    { value: "pdf", label: "PDF документ (.pdf)", icon: File },
    { value: "docx", label: "Word документ (.docx)", icon: File },
    { value: "md", label: "Markdown (.md)", icon: FileText },
    { value: "html", label: "HTML файл (.html)", icon: FileText }
  ];

  const cmsOptions = [
    { value: "wordpress", label: "WordPress" },
    { value: "drupal", label: "Drupal" },
    { value: "custom", label: "Собственная CMS" }
  ];

  const socialPlatforms = [
    { value: "telegram", label: "Telegram" },
    { value: "vk", label: "ВКонтакте" },
    { value: "facebook", label: "Facebook" }
  ];

  const handleFileExport = async () => {
    if (!text.trim()) {
      toast({
        title: "Ошибка",
        description: "Нет текста для экспорта",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.exportFile(text, title, exportFormat);
      toast({
        title: "Экспорт завершен",
        description: `Файл сохранен в формате ${exportFormat.toUpperCase()}`
      });
    } catch (error) {
      toast({
        title: "Ошибка экспорта",
        description: "Не удалось экспортировать файл",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmailSend = async () => {
    if (!emailSettings.to || !text.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните email получателя и убедитесь, что есть текст для отправки",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.sendEmail({
        to: emailSettings.to,
        subject: emailSettings.subject,
        text: text,
        includeAttachment: emailSettings.includeAttachment,
        format: exportFormat
      });
      toast({
        title: "Email отправлен",
        description: `Текст отправлен на ${emailSettings.to}`
      });
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить email",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCMSPublish = async () => {
    if (!cmsSettings.platform || !text.trim()) {
      toast({
        title: "Ошибка",
        description: "Выберите CMS платформу и убедитесь, что есть текст для публикации",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.publishToCMS({
        platform: cmsSettings.platform,
        endpoint: cmsSettings.endpoint,
        apiKey: cmsSettings.apiKey,
        title: cmsSettings.postTitle,
        content: text,
        status: cmsSettings.postStatus
      });
      toast({
        title: "Опубликовано в CMS",
        description: `Контент успешно опубликован в ${cmsSettings.platform}`
      });
    } catch (error) {
      toast({
        title: "Ошибка публикации",
        description: "Не удалось опубликовать в CMS",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSocialPost = async () => {
    if (!socialSettings.platform || !text.trim()) {
      toast({
        title: "Ошибка",
        description: "Выберите социальную сеть и убедитесь, что есть текст для публикации",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.postToSocial({
        platform: socialSettings.platform,
        content: text,
        caption: socialSettings.caption,
        schedulePost: socialSettings.schedulePost,
        scheduleTime: socialSettings.scheduleTime
      });
      toast({
        title: "Опубликовано в соцсети",
        description: `Пост успешно опубликован в ${socialSettings.platform}`
      });
    } catch (error) {
      toast({
        title: "Ошибка публикации",
        description: "Не удалось опубликовать в социальной сети",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const selectedFormat = exportFormats.find(f => f.value === exportFormat);

  return (
    <div className="space-y-6">
      {/* Экспорт файлов */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Экспорт файлов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Формат экспорта</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center gap-2">
                      <format.icon className="w-4 h-4" />
                      {format.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleFileExport} 
            disabled={isExporting || !text.trim()}
            className="w-full"
          >
            {selectedFormat && <selectedFormat.icon className="w-4 h-4 mr-2" />}
            {isExporting ? "Экспортирую..." : `Скачать ${exportFormat.toUpperCase()}`}
          </Button>
        </CardContent>
      </Card>

      {/* Email интеграция */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email интеграция
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email получателя</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={emailSettings.to}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Тема письма</Label>
            <Input
              placeholder="Тема письма"
              value={emailSettings.subject}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={emailSettings.includeAttachment}
              onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, includeAttachment: checked }))}
            />
            <Label>Прикрепить файл</Label>
          </div>

          <Button 
            onClick={handleEmailSend} 
            disabled={isExporting || !text.trim() || !emailSettings.to}
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            {isExporting ? "Отправляю..." : "Отправить по Email"}
          </Button>
        </CardContent>
      </Card>

      {/* CMS интеграция */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Интеграция с CMS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>CMS платформа</Label>
            <Select value={cmsSettings.platform} onValueChange={(value) => setCmsSettings(prev => ({ ...prev, platform: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите CMS" />
              </SelectTrigger>
              <SelectContent>
                {cmsOptions.map((cms) => (
                  <SelectItem key={cms.value} value={cms.value}>
                    {cms.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {cmsSettings.platform && (
            <>
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input
                  placeholder="https://your-cms.com/api"
                  value={cmsSettings.endpoint}
                  onChange={(e) => setCmsSettings(prev => ({ ...prev, endpoint: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>API ключ</Label>
                <Input
                  type="password"
                  placeholder="Ваш API ключ"
                  value={cmsSettings.apiKey}
                  onChange={(e) => setCmsSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Заголовок поста</Label>
                <Input
                  placeholder="Заголовок"
                  value={cmsSettings.postTitle}
                  onChange={(e) => setCmsSettings(prev => ({ ...prev, postTitle: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Статус публикации</Label>
                <Select value={cmsSettings.postStatus} onValueChange={(value) => setCmsSettings(prev => ({ ...prev, postStatus: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="published">Опубликовано</SelectItem>
                    <SelectItem value="private">Приватно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button 
            onClick={handleCMSPublish} 
            disabled={isExporting || !text.trim() || !cmsSettings.platform}
            className="w-full"
          >
            <FileText className="w-4 h-4 mr-2" />
            {isExporting ? "Публикую..." : "Опубликовать в CMS"}
          </Button>
        </CardContent>
      </Card>

      {/* Социальные сети */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Социальные сети
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Социальная сеть</Label>
            <Select value={socialSettings.platform} onValueChange={(value) => setSocialSettings(prev => ({ ...prev, platform: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите платформу" />
              </SelectTrigger>
              <SelectContent>
                {socialPlatforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {socialSettings.platform && (
            <>
              <div className="space-y-2">
                <Label>Подпись к посту</Label>
                <Textarea
                  placeholder="Дополнительная подпись..."
                  value={socialSettings.caption}
                  onChange={(e) => setSocialSettings(prev => ({ ...prev, caption: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={socialSettings.schedulePost}
                  onCheckedChange={(checked) => setSocialSettings(prev => ({ ...prev, schedulePost: checked }))}
                />
                <Label>Запланировать публикацию</Label>
              </div>

              {socialSettings.schedulePost && (
                <div className="space-y-2">
                  <Label>Время публикации</Label>
                  <Input
                    type="datetime-local"
                    value={socialSettings.scheduleTime}
                    onChange={(e) => setSocialSettings(prev => ({ ...prev, scheduleTime: e.target.value }))}
                  />
                </div>
              )}
            </>
          )}

          <Button 
            onClick={handleSocialPost} 
            disabled={isExporting || !text.trim() || !socialSettings.platform}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {isExporting ? "Публикую..." : "Опубликовать в соцсети"}
          </Button>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика контента</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{text.length}</div>
              <div className="text-sm text-slate-600">Символов</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{text.split(' ').length}</div>
              <div className="text-sm text-slate-600">Слов</div>
            </div>
          </div>
          
          {contentType && (
            <div className="mt-4 flex justify-center">
              <Badge variant="outline">{contentType}</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
