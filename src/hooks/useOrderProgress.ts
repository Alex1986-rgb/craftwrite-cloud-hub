
import { useEffect, useState, useCallback } from "react";
import { SERVICE_QUESTIONS } from "@/data/orderQuestions";

type FormState = {
  name: string;
  email: string;
  service: string;
  details: string;
  additional: Record<string, string>;
};

interface ProgressMetrics {
  totalSteps: number;
  completedSteps: number;
  percentage: number;
  nextStep: string | null;
  isComplete: boolean;
}

export function useOrderProgress(form: FormState) {
  const [showProgressFlash, setShowProgressFlash] = useState(false);
  const [previousProgress, setPreviousProgress] = useState(0);

  // Мемоизированный расчет прогресса для оптимизации производительности
  const calculateProgress = useCallback((): ProgressMetrics => {
    const baseSteps = ['name', 'email', 'service', 'details'];
    let totalSteps = baseSteps.length;
    let completedSteps = 0;
    
    // Базовые поля
    if (form.name.trim()) completedSteps++;
    if (form.email.trim()) completedSteps++;
    if (form.service.trim()) completedSteps++;
    if (form.details.trim()) completedSteps++;
    
    // Дополнительные вопросы для выбранной услуги
    const currentQuestions = SERVICE_QUESTIONS[form.service] || [];
    if (currentQuestions.length > 0) {
      totalSteps += currentQuestions.length;
      currentQuestions.forEach(question => {
        if (form.additional[question.label]?.trim()) {
          completedSteps++;
        }
      });
    }
    
    const percentage = Math.min(Math.round((completedSteps / totalSteps) * 100), 100);
    
    // Определяем следующий шаг
    let nextStep: string | null = null;
    if (!form.name.trim()) nextStep = 'Введите ваше имя';
    else if (!form.email.trim()) nextStep = 'Введите email';
    else if (!form.service.trim()) nextStep = 'Выберите услугу';
    else if (!form.details.trim()) nextStep = 'Опишите задачу';
    else if (currentQuestions.length > 0) {
      const uncompletedQuestion = currentQuestions.find(q => !form.additional[q.label]?.trim());
      if (uncompletedQuestion) {
        nextStep = `Ответьте на вопрос: ${uncompletedQuestion.label}`;
      }
    }
    
    return {
      totalSteps,
      completedSteps,
      percentage,
      nextStep,
      isComplete: percentage === 100
    };
  }, [form]);

  const progressMetrics = calculateProgress();

  // Эффект для отслеживания улучшения прогресса и анимации
  useEffect(() => {
    if (progressMetrics.percentage > previousProgress) {
      // Анонсируем прогресс для screen readers
      const announcement = `Прогресс заполнения: ${progressMetrics.percentage}%`;
      
      // Создаем живое объявление для accessibility
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.textContent = announcement;
      document.body.appendChild(liveRegion);
      
      setTimeout(() => {
        document.body.removeChild(liveRegion);
      }, 1000);
    }
    
    if (progressMetrics.percentage === 100 && previousProgress < 100) {
      setShowProgressFlash(true);
      
      // Объявляем завершение формы
      const completionAnnouncement = document.createElement('div');
      completionAnnouncement.setAttribute('aria-live', 'assertive');
      completionAnnouncement.setAttribute('aria-atomic', 'true');
      completionAnnouncement.className = 'sr-only';
      completionAnnouncement.textContent = 'Форма заполнена полностью! Готово к отправке.';
      document.body.appendChild(completionAnnouncement);
      
      setTimeout(() => {
        document.body.removeChild(completionAnnouncement);
      }, 2000);
    }
    
    setPreviousProgress(progressMetrics.percentage);
  }, [progressMetrics.percentage, previousProgress]);

  // Функция для сброса flash-анимации
  const resetProgressFlash = useCallback(() => {
    setShowProgressFlash(false);
  }, []);

  // Функция для получения статуса доступности
  const getAccessibilityStatus = useCallback(() => {
    return {
      ariaLabel: `Прогресс заполнения формы: ${progressMetrics.completedSteps} из ${progressMetrics.totalSteps} шагов завершено`,
      ariaValueNow: progressMetrics.percentage,
      ariaValueMin: 0,
      ariaValueMax: 100,
      ariaValueText: `${progressMetrics.percentage} процентов завершено`
    };
  }, [progressMetrics]);

  return {
    ...progressMetrics,
    showProgressFlash,
    resetProgressFlash,
    getAccessibilityStatus,
    // Backward compatibility
    calcProgress: () => progressMetrics.percentage,
    setShowProgressFlash
  };
}
