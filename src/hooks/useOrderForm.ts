
import { useState, useRef, useEffect } from "react";
import { SERVICES, getDefaultAdditional, SERVICE_QUESTIONS } from "@/data/orderQuestions";
import { toast } from "@/hooks/use-toast";
import { getValidationErrors } from "@/utils/formValidation";

export function useOrderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICES[0],
    details: "",
    additional: getDefaultAdditional(SERVICES[0])
  });
  const [loading, setLoading] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  
  const filteredServices = SERVICES.filter(s =>
    s.toLowerCase().includes(serviceFilter.toLowerCase())
  );

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Валидация формы в реальном времени
  useEffect(() => {
    const validationErrors = getValidationErrors(form);
    setErrors(validationErrors);
  }, [form]);

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
    
    const validationErrors = getValidationErrors(form);
    if (validationErrors.length > 0) {
      toast({
        title: "Ошибки в форме",
        description: validationErrors.join(", "),
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log("Submitting order:", form);

    setTimeout(() => {
      toast({
        title: "Заказ отправлен!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение 1 рабочего дня.",
      });
      setForm({
        name: "",
        email: "",
        service: SERVICES[0],
        details: "",
        additional: getDefaultAdditional(SERVICES[0])
      });
      setLoading(false);
    }, 1300);
  };

  const currentQuestions = SERVICE_QUESTIONS[form.service] || [];
  const isFormValid = errors.length === 0;

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
    errors,
    isFormValid,
  };
}
