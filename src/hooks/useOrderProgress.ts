
import { useEffect, useState } from "react";
import { SERVICE_QUESTIONS } from "@/data/orderQuestions";

type FormState = {
  name: string;
  email: string;
  service: string;
  details: string;
  additional: Record<string, string>;
};

export function useOrderProgress(form: FormState) {
  // Flash-флаг для OrderProgressBar
  const [showProgressFlash, setShowProgressFlash] = useState(false);

  // Логика прогресса перенесена сюда
  function calcProgress() {
    let steps = 4; // name, email, service, details
    let score = 0;
    if (form.name.trim()) score++;
    if (form.email.trim()) score++;
    if (form.service.trim()) score++;
    if (form.details.trim()) score++;
    // дополнительные вопросы, если есть
    const currentQuestions = SERVICE_QUESTIONS[form.service] || [];
    if (currentQuestions.length > 0) {
      steps += currentQuestions.length;
      currentQuestions.forEach(q => {
        if (form.additional[q.label] && form.additional[q.label].trim()) score++;
      });
    }
    let percent = Math.round((score / steps) * 100);
    if (percent > 100) percent = 100;
    return percent;
  }

  // Следить, когда прогресс станет 100%, чтобы запустить flash
  useEffect(() => {
    if (calcProgress() === 100) {
      setShowProgressFlash(true);
    }
    // eslint-disable-next-line
  }, [
    form.name,
    form.email,
    form.service,
    form.details,
    form.additional
  ]);

  return {
    calcProgress,
    showProgressFlash,
    setShowProgressFlash
  };
}
