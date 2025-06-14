
import { useState, useRef, useEffect } from "react";
import { SERVICES, getDefaultAdditional, SERVICE_QUESTIONS } from "@/data/orderQuestions";
import { toast } from "@/hooks/use-toast";
import { createValidationRules, getFormCompletionPercentage, isFormValid as checkFormValidity } from "@/utils/enhancedFormValidation";

export function useOrderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    details: "",
    additional: getDefaultAdditional("")
  });
  const [loading, setLoading] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("");
  
  const filteredServices = SERVICES.filter(s =>
    s.toLowerCase().includes(serviceFilter.toLowerCase())
  );

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Фокус на имени при загрузке для улучшения доступности
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Создаем правила валидации
  const validationRules = createValidationRules(form);
  const formProgress = getFormCompletionPercentage(validationRules);
  const isFormValid = checkFormValidity(validationRules);

  // Вычисляем текущий шаг для отслеживания прогресса
  const getCurrentStep = () => {
    if (!form.name.trim() || !form.email.trim()) return 0;
    if (!form.service) return 1;
    if (!form.details.trim()) return 2;
    return 3;
  };

  const handleServiceSelect = (service: string) => {
    setForm(f => ({
      ...f,
      service,
      additional: getDefaultAdditional(service)
    }));
    
    // Announce service selection for screen readers
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const announcement = new SpeechSynthesisUtterance(`Выбрана услуга: ${service}`);
      announcement.volume = 0; // Silent announcement for accessibility
      window.speechSynthesis.speak(announcement);
    }
  };

  const handleAdditionalChange = (label: string, value: string) => {
    setForm(f => ({
      ...f,
      additional: {
        ...f.additional,
        [label]: value
      }
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      const errors = validationRules.filter(rule => !rule.isValid);
      toast({
        title: "Ошибки в форме",
        description: `Исправьте ${errors.length} ошибок перед отправкой`,
        variant: "destructive"
      });
      
      // Focus on first invalid field for accessibility
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
      
      return;
    }

    setLoading(true);
    console.log("Submitting order with accessibility features:", {
      ...form,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });

    // Имитация отправки с улучшенным UX
    setTimeout(() => {
      toast({
        title: "Заказ успешно отправлен!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение 1 рабочего дня.",
      });
      
      // Announce success for screen readers
      const successMsg = document.createElement('div');
      successMsg.setAttribute('aria-live', 'assertive');
      successMsg.setAttribute('aria-atomic', 'true');
      successMsg.className = 'sr-only';
      successMsg.textContent = 'Заказ успешно отправлен! Мы свяжемся с вами в течение рабочего дня.';
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 3000);
      
      // Сброс формы
      setForm({
        name: "",
        email: "",
        service: "",
        details: "",
        additional: getDefaultAdditional("")
      });
      
      // Return focus to name input
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
      
      setLoading(false);
    }, 1500);
  };

  const currentQuestions = SERVICE_QUESTIONS[form.service] || [];

  return {
    form,
    setForm,
    loading,
    serviceFilter,
    setServiceFilter,
    filteredServices,
    handleServiceSelect,
    handleAdditionalChange,
    handleChange,
    handleSubmit,
    currentQuestions,
    nameInputRef,
    validationRules,
    formProgress,
    isFormValid,
    currentStep: getCurrentStep(),
  };
}
