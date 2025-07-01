
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FunnelStep {
  stepNumber: number;
  stepName: string;
  enteredAt: Date;
  exitedAt?: Date;
  timeSpent?: number;
  completed: boolean;
  abandonedAt?: Date;
}

export interface AnalyticsEvent {
  sessionId: string;
  userId?: string;
  eventType: 'step_enter' | 'step_exit' | 'step_complete' | 'form_abandon' | 'form_submit';
  stepNumber: number;
  stepName: string;
  timestamp: Date;
  timeSpent?: number;
  formData?: any;
  userAgent: string;
  url: string;
}

export function useSmartOrderAnalytics() {
  const [sessionId] = useState(() => generateSessionId());
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStartTime, setStepStartTime] = useState<Date>(new Date());
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([]);
  const sessionStartTime = useRef<Date>(new Date());

  const STEP_NAMES = {
    1: 'Service Selection',
    2: 'Project Details', 
    3: 'Requirements',
    4: 'Pricing',
    5: 'Contact Info'
  };

  // Отслеживание входа на шаг
  const trackStepEnter = async (stepNumber: number) => {
    const now = new Date();
    setCurrentStep(stepNumber);
    setStepStartTime(now);

    // Обновляем массив шагов
    setFunnelSteps(prev => {
      const updated = [...prev];
      const existingStepIndex = updated.findIndex(s => s.stepNumber === stepNumber);
      
      if (existingStepIndex >= 0) {
        updated[existingStepIndex] = {
          ...updated[existingStepIndex],
          enteredAt: now,
          exitedAt: undefined,
          abandonedAt: undefined
        };
      } else {
        updated.push({
          stepNumber,
          stepName: STEP_NAMES[stepNumber as keyof typeof STEP_NAMES],
          enteredAt: now,
          completed: false
        });
      }
      
      return updated;
    });

    // Отправляем событие в аналитику
    await sendAnalyticsEvent({
      sessionId,
      eventType: 'step_enter',
      stepNumber,
      stepName: STEP_NAMES[stepNumber as keyof typeof STEP_NAMES],
      timestamp: now,
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    console.log(`🔍 Analytics: Entered step ${stepNumber} - ${STEP_NAMES[stepNumber as keyof typeof STEP_NAMES]}`);
  };

  // Отслеживание выхода с шага
  const trackStepExit = async (stepNumber: number, completed: boolean = false) => {
    const now = new Date();
    const timeSpent = now.getTime() - stepStartTime.getTime();

    setFunnelSteps(prev => {
      const updated = [...prev];
      const stepIndex = updated.findIndex(s => s.stepNumber === stepNumber);
      
      if (stepIndex >= 0) {
        updated[stepIndex] = {
          ...updated[stepIndex],
          exitedAt: now,
          timeSpent,
          completed
        };
      }
      
      return updated;
    });

    await sendAnalyticsEvent({
      sessionId,
      eventType: completed ? 'step_complete' : 'step_exit',
      stepNumber,
      stepName: STEP_NAMES[stepNumber as keyof typeof STEP_NAMES],
      timestamp: now,
      timeSpent,
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    console.log(`🔍 Analytics: ${completed ? 'Completed' : 'Exited'} step ${stepNumber}, time spent: ${Math.round(timeSpent / 1000)}s`);
  };

  // Отслеживание отказа от формы
  const trackFormAbandon = async (abandonStep: number, formData?: any) => {
    const now = new Date();
    const sessionDuration = now.getTime() - sessionStartTime.current.getTime();

    setFunnelSteps(prev => {
      const updated = [...prev];
      const stepIndex = updated.findIndex(s => s.stepNumber === abandonStep);
      
      if (stepIndex >= 0) {
        updated[stepIndex] = {
          ...updated[stepIndex],
          abandonedAt: now
        };
      }
      
      return updated;
    });

    await sendAnalyticsEvent({
      sessionId,
      eventType: 'form_abandon',
      stepNumber: abandonStep,
      stepName: STEP_NAMES[abandonStep as keyof typeof STEP_NAMES],
      timestamp: now,
      timeSpent: sessionDuration,
      formData: sanitizeFormData(formData),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    console.log(`🔍 Analytics: Form abandoned at step ${abandonStep}, session duration: ${Math.round(sessionDuration / 1000)}s`);
  };

  // Отслеживание успешной отправки формы
  const trackFormSubmit = async (formData: any) => {
    const now = new Date();
    const sessionDuration = now.getTime() - sessionStartTime.current.getTime();

    await sendAnalyticsEvent({
      sessionId,
      eventType: 'form_submit',
      stepNumber: 5,
      stepName: 'Form Completed',
      timestamp: now,
      timeSpent: sessionDuration,
      formData: sanitizeFormData(formData),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    console.log(`🔍 Analytics: Form submitted successfully, total session: ${Math.round(sessionDuration / 1000)}s`);
  };

  // Отправка события в базу данных
  const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
    try {
      const { error } = await supabase
        .from('smart_order_analytics')
        .insert({
          session_id: event.sessionId,
          user_id: event.userId || null,
          event_type: event.eventType,
          step_number: event.stepNumber,
          step_name: event.stepName,
          timestamp: event.timestamp.toISOString(),
          time_spent: event.timeSpent || null,
          form_data: event.formData || null,
          user_agent: event.userAgent,
          url: event.url
        });

      if (error) {
        console.error('Analytics error:', error);
      }
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  };

  // Получение метрик текущей сессии
  const getSessionMetrics = () => {
    const totalTime = new Date().getTime() - sessionStartTime.current.getTime();
    const completedSteps = funnelSteps.filter(s => s.completed).length;
    const averageStepTime = funnelSteps.length > 0 
      ? funnelSteps.reduce((sum, step) => sum + (step.timeSpent || 0), 0) / funnelSteps.length
      : 0;

    return {
      sessionId,
      totalTime,
      completedSteps,
      totalSteps: 5,
      completionRate: (completedSteps / 5) * 100,
      averageStepTime: Math.round(averageStepTime / 1000), // в секундах
      currentStep,
      stepHistory: funnelSteps
    };
  };

  // Автоматическое отслеживание покидания страницы
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStep < 5) {
        // Синхронная отправка при покидании страницы
        navigator.sendBeacon('/api/analytics/abandon', JSON.stringify({
          sessionId,
          stepNumber: currentStep,
          timestamp: new Date().toISOString()
        }));
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && currentStep < 5) {
        trackFormAbandon(currentStep);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentStep, sessionId]);

  return {
    sessionId,
    currentStep,
    funnelSteps,
    trackStepEnter,
    trackStepExit,
    trackFormAbandon,
    trackFormSubmit,
    getSessionMetrics
  };
}

// Утилиты
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function sanitizeFormData(data: any) {
  if (!data) return null;
  
  // Удаляем чувствительные данные перед сохранением
  const sanitized = { ...data };
  delete sanitized.contactEmail;
  delete sanitized.contactPhone;
  delete sanitized.contactName;
  
  return {
    serviceType: sanitized.serviceType,
    characterCount: sanitized.characterCount,
    totalPrice: sanitized.totalPrice,
    hasProjectTitle: !!sanitized.projectTitle,
    hasTargetAudience: !!sanitized.targetAudience,
    keywordsCount: sanitized.keywords?.length || 0,
    additionalServicesCount: sanitized.additionalServices?.length || 0
  };
}
