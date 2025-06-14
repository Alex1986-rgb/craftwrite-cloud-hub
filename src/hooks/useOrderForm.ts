
import { useState, useRef, useEffect } from "react";
import { SERVICES, getDefaultAdditional, SERVICE_QUESTIONS } from "@/data/orderQuestions";
import { toast } from "@/hooks/use-toast";

// Полная структура формы заказа
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
  const filteredServices = SERVICES.filter(s =>
    s.toLowerCase().includes(serviceFilter.toLowerCase())
  );

  // ref для автофокуса на поле "Имя"
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Обработка смены услуги (карточка)
  const handleServiceSelect = (service: string) => {
    setForm(f => ({
      ...f,
      service,
      additional: getDefaultAdditional(service)
    }));
  };

  // Обработка ввода уточняющих ответов
  const handleAdditionalChange = (label: string, value: string) => {
    setForm(f => ({
      ...f,
      additional: {
        ...f.additional,
        [label]: value
      }
    }));
  };

  // Обработка текстовых полей
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Сабмит с имитацией отправки
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

  // Дополнительные вопросы для выбранной услуги
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
  };
}

