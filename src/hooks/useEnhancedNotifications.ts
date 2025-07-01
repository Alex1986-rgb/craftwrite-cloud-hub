
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NotificationHook {
  sendEmailNotification: (params: EmailNotificationParams) => Promise<void>;
  sendPushNotification: (params: PushNotificationParams) => Promise<void>;
  createReminder: (params: ReminderParams) => Promise<void>;
  cancelReminders: (sessionId?: string, userId?: string) => Promise<void>;
  trackNotificationEvent: (notificationId: string, eventType: string) => Promise<void>;
}

interface EmailNotificationParams {
  to: string;
  templateType: 'order_created' | 'order_status_changed' | 'order_completed' | 'form_abandoned' | 'reminder';
  variables: Record<string, any>;
  orderId?: string;
  userId?: string;
}

interface PushNotificationParams {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  url?: string;
}

interface ReminderParams {
  userId?: string;
  sessionId?: string;
  reminderType: 'form_abandoned' | 'order_pending' | 'payment_pending';
  delayMinutes: number;
  metadata?: Record<string, any>;
}

export function useEnhancedNotifications(): NotificationHook {
  const { toast } = useToast();

  const sendEmailNotification = async (params: EmailNotificationParams) => {
    try {
      console.log('Sending email notification:', params);

      const { data, error } = await supabase.functions.invoke('send-email-notification', {
        body: params
      });

      if (error) throw error;

      console.log('Email notification sent successfully:', data);
    } catch (error: any) {
      console.error('Error sending email notification:', error);
      toast({
        title: 'Ошибка отправки email',
        description: error.message || 'Не удалось отправить email-уведомление',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const sendPushNotification = async (params: PushNotificationParams) => {
    try {
      console.log('Sending push notification:', params);

      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: params
      });

      if (error) throw error;

      console.log('Push notification sent successfully:', data);
    } catch (error: any) {
      console.error('Error sending push notification:', error);
      toast({
        title: 'Ошибка отправки push-уведомления',
        description: error.message || 'Не удалось отправить push-уведомление',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const createReminder = async (params: ReminderParams) => {
    try {
      console.log('Creating reminder:', params);

      const { data, error } = await supabase.rpc('create_reminder', {
        p_user_id: params.userId || null,
        p_session_id: params.sessionId || null,
        p_reminder_type: params.reminderType,
        p_delay_minutes: params.delayMinutes,
        p_metadata: params.metadata || {}
      });

      if (error) throw error;

      console.log('Reminder created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  };

  const cancelReminders = async (sessionId?: string, userId?: string) => {
    try {
      console.log('Cancelling reminders:', { sessionId, userId });

      const { data, error } = await supabase.rpc('cancel_reminders', {
        p_session_id: sessionId || null,
        p_user_id: userId || null
      });

      if (error) throw error;

      console.log('Reminders cancelled:', data);
      return data;
    } catch (error: any) {
      console.error('Error cancelling reminders:', error);
      throw error;
    }
  };

  const trackNotificationEvent = async (notificationId: string, eventType: string) => {
    try {
      const { error } = await supabase
        .from('notification_analytics')
        .insert({
          notification_id: notificationId,
          event_type: eventType,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error tracking notification event:', error);
    }
  };

  return {
    sendEmailNotification,
    sendPushNotification,
    createReminder,
    cancelReminders,
    trackNotificationEvent
  };
}
