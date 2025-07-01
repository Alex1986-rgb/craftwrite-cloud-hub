
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { pwaManager } from '@/utils/pwaUtils';
import { toast } from 'sonner';

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleInstallAvailable = () => {
      if (!pwaManager.isAppInstalled()) {
        setShowPrompt(true);
      }
    };

    const handleInstalled = () => {
      setShowPrompt(false);
      toast.success('Приложение успешно установлено!');
    };

    const handleUpdateAvailable = () => {
      toast.info('Доступно обновление приложения', {
        action: {
          label: 'Обновить',
          onClick: () => window.location.reload()
        }
      });
    };

    window.addEventListener('pwa:installAvailable', handleInstallAvailable);
    window.addEventListener('pwa:installed', handleInstalled);
    window.addEventListener('pwa:updateAvailable', handleUpdateAvailable);

    // Check initial state
    if (pwaManager.canInstall()) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener('pwa:installAvailable', handleInstallAvailable);
      window.removeEventListener('pwa:installed', handleInstalled);
      window.removeEventListener('pwa:updateAvailable', handleUpdateAvailable);
    };
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    const success = await pwaManager.installApp();
    
    if (success) {
      setShowPrompt(false);
    } else {
      toast.error('Не удалось установить приложение');
    }
    setIsInstalling(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <Card className="shadow-2xl border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Установить приложение</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Установите CopyPro Cloud на главный экран для быстрого доступа и работы офлайн
          </p>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleInstall} 
              disabled={isInstalling}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {isInstalling ? 'Установка...' : 'Установить'}
            </Button>
            <Button variant="outline" onClick={handleDismiss}>
              Позже
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
