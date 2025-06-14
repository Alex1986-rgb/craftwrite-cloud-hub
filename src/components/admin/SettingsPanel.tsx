
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Shield, Bell, CreditCard, Bot, Save, Key } from "lucide-react";

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: "CopyPro",
    siteUrl: "https://copypro.ru",
    adminEmail: "admin@copypro.ru",
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    aiAutoGeneration: true,
    plagiarismCheck: true,
    stripePublicKey: "",
    stripeSecretKey: "",
    openaiApiKey: "",
    textruApiKey: ""
  });

  const handleSave = () => {
    console.log("Сохранение настроек:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Настройки системы</h1>
          <p className="text-slate-600">Конфигурация всех компонентов и интеграций</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-blue-600">
          <Save className="w-4 h-4 mr-2" />
          Сохранить все
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="ai">AI Настройки</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Основные настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название сайта</label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL сайта</label>
                  <Input
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email администратора</label>
                <Input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Автоматическое резервное копирование</label>
                  <p className="text-sm text-slate-500">Ежедневное создание бэкапов системы</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Ключи и интеграции
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={settings.openaiApiKey}
                  onChange={(e) => setSettings({...settings, openaiApiKey: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Text.ru API Key</label>
                <Input
                  type="password"
                  placeholder="Ключ для проверки уникальности"
                  value={settings.textruApiKey}
                  onChange={(e) => setSettings({...settings, textruApiKey: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stripe Public Key</label>
                  <Input
                    type="password"
                    placeholder="pk_..."
                    value={settings.stripePublicKey}
                    onChange={(e) => setSettings({...settings, stripePublicKey: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stripe Secret Key</label>
                  <Input
                    type="password"
                    placeholder="sk_..."
                    value={settings.stripeSecretKey}
                    onChange={(e) => setSettings({...settings, stripeSecretKey: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Настройки уведомлений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Email уведомления</label>
                  <p className="text-sm text-slate-500">Получать уведомления на email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">SMS уведомления</label>
                  <p className="text-sm text-slate-500">Получать SMS о важных событиях</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Безопасность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Изменить пароль администратора</label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="password" placeholder="Новый пароль" />
                  <Input type="password" placeholder="Подтвердить пароль" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Двухфакторная аутентификация</label>
                <Button variant="outline">Настроить 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Настройки AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Автоматическая генерация текстов</label>
                  <p className="text-sm text-slate-500">Включить AI для автоматического создания черновиков</p>
                </div>
                <Switch
                  checked={settings.aiAutoGeneration}
                  onCheckedChange={(checked) => setSettings({...settings, aiAutoGeneration: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Проверка на плагиат</label>
                  <p className="text-sm text-slate-500">Автоматическая проверка уникальности через Text.ru</p>
                </div>
                <Switch
                  checked={settings.plagiarismCheck}
                  onCheckedChange={(checked) => setSettings({...settings, plagiarismCheck: checked})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Минимальная уникальность (%)</label>
                <Input type="number" defaultValue="85" min="70" max="100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
