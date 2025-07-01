
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BellOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function PushNotificationSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Проверяем поддержку push-уведомлений
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const subscribeToPush = async () => {
    setIsLoading(true);
    try {
      // Запрашиваем разрешение
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast({
          title: 'Разрешение не предоставлено',
          description: 'Для получения уведомлений необходимо разрешение в браузере',
          variant: 'destructive'
        });
        return;
      }

      // Регистрируем Service Worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      // Создаем подписку
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BKJKZJZJZKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJKJK'
        )
      });

      // Сохраняем подписку в базе данных
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('push_subscriptions')
          .insert({
            user_id: user.id,
            endpoint: subscription.endpoint,
            p256dh_key: arrayBufferToBase64(subscription.getKey('p256dh')!),
            auth_key: arrayBufferToBase64(subscription.getKey('auth')!)
          });

        if (error) throw error;
      }

      setIsSubscribed(true);
      toast({
        title: 'Подписка активирована',
        description: 'Теперь вы будете получать push-уведомления'
      });

    } catch (error) {
      console.error('Error subscribing to push:', error);
      toast({
        title: 'Ошибка подписки',
        description: 'Не удалось подписаться на уведомления',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Удаляем подписку из базы данных
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('push_subscriptions')
            .update({ is_active: false })
            .eq('user_id', user.id)
            .eq('endpoint', subscription.endpoint);
        }
      }

      setIsSubscribed(false);
      toast({
        title: 'Подписка отменена',
        description: 'Push-уведомления отключены'
      });

    } catch (error) {
      console.error('Error unsubscribing from push:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось отменить подписку',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Push-уведомления
          </CardTitle>
          <CardDescription>
            Ваш браузер не поддерживает push-уведомления
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Push-уведомления
        </CardTitle>
        <CardDescription>
          Получайте уведомления о статусе заказов прямо в браузере
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={isSubscribed ? unsubscribeFromPush : subscribeToPush}
          disabled={isLoading}
          variant={isSubscribed ? 'destructive' : 'default'}
          className="w-full"
        >
          {isLoading ? 'Обработка...' : isSubscribed ? 'Отключить уведомления' : 'Включить уведомления'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Утилитарные функции
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
