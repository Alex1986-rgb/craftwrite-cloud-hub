
import React, { useEffect } from 'react';
import { useAnalytics } from '../analytics/AnalyticsProvider';
import { useEnhancedNotifications } from '@/hooks/useEnhancedNotifications';

interface EnhancedSmartOrderAnalyticsProps {
  children: React.ReactNode;
}

export default function EnhancedSmartOrderAnalytics({ children }: EnhancedSmartOrderAnalyticsProps) {
  const analytics = useAnalytics();
  const notifications = useEnhancedNotifications();

  useEffect(() => {
    // Создаем напоминание при входе на страницу
    const createAbandonmentReminder = async () => {
      try {
        await notifications.createReminder({
          sessionId: analytics.sessionId,
          reminderType: 'form_abandoned',
          delayMinutes: 30,
          metadata: {
            entry_time: new Date().toISOString(),
            current_step: analytics.currentStep
          }
        });
        console.log('🔔 Abandonment reminder created for session:', analytics.sessionId);
      } catch (error) {
        console.error('Failed to create abandonment reminder:', error);
      }
    };

    createAbandonmentReminder();

    // Отслеживаем покидание страницы
    const handleBeforeUnload = async () => {
      if (analytics.currentStep < 5) {
        try {
          // Создаем напоминание о незавершенной форме
          await notifications.createReminder({
            sessionId: analytics.sessionId,
            reminderType: 'form_abandoned',
            delayMinutes: 60,
            metadata: {
              abandoned_at: new Date().toISOString(),
              abandoned_step: analytics.currentStep,
              session_metrics: analytics.getSessionMetrics()
            }
          });
        } catch (error) {
          console.error('Failed to create abandonment reminder:', error);
        }
      }
    };

    // Отслеживаем скрытие вкладки
    const handleVisibilityChange = () => {
      if (document.hidden && analytics.currentStep < 5) {
        handleBeforeUnload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [analytics.sessionId, analytics.currentStep]);

  // Отменяем напоминания при завершении формы
  useEffect(() => {
    if (analytics.currentStep === 5) {
      const cancelReminders = async () => {
        try {
          await notifications.cancelReminders(analytics.sessionId);
          console.log('🔔 Reminders cancelled for completed session:', analytics.sessionId);
        } catch (error) {
          console.error('Failed to cancel reminders:', error);
        }
      };

      cancelReminders();
    }
  }, [analytics.currentStep]);

  return <>{children}</>;
}
