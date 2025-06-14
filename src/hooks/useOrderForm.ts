
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

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Создаем правила валидации
  const validationRules = createValidationRules(form);
  const formProgress = getFormCompletionPercentage(validationRules);
  const isFormValid = checkFormValidity(validationRules);

  // Вычисляем текущий шаг
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
      return;
    }

    setLoading(true);
    console.log("Submitting order:", form);

    // Имитация отправки
    setTimeout(() => {
      toast({
        title: "Заказ отправлен!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение 1 рабочего дня.",
      });
      
      // Сброс формы
      setForm({
        name: "",
        email: "",
        service: "",
        details: "",
        additional: getDefaultAdditional("")
      });
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
