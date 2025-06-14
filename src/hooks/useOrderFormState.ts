
import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface OrderFormState {
  // Basic info
  name: string;
  email: string;
  phone?: string;
  
  // Service details
  service: string;
  details: string;
  
  // Advanced options
  deadline: string;
  additionalServices: string[];
  targetAudience: string;
  seoKeywords: string;
  preferredStyle: string;
  additionalRequirements: string;
  
  // Additional questions
  additional: Record<string, string>;
}

export function useOrderFormState() {
  const [form, setForm] = useState<OrderFormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
    deadline: "standard",
    additionalServices: [],
    targetAudience: "",
    seoKeywords: "",
    preferredStyle: "",
    additionalRequirements: "",
    additional: {}
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Calculate completed steps based on form data
  useEffect(() => {
    const completed: number[] = [];
    
    if (form.name.trim() && form.email.trim()) {
      completed.push(1);
    }
    
    if (form.service) {
      completed.push(2);
    }
    
    if (form.details.trim()) {
      completed.push(3);
    }
    
    if (form.deadline) {
      completed.push(4);
    }

    setCompletedSteps(completed);
    
    // Auto-advance to next step
    const nextStep = completed.length + 1;
    if (nextStep <= 5 && nextStep > currentStep) {
      setCurrentStep(nextStep);
    }
  }, [form, currentStep]);

  const updateForm = (updates: Partial<OrderFormState>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Заказ успешно отправлен!",
        description: "Мы свяжемся с вами в течение 1 рабочего дня",
      });
      
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        details: "",
        deadline: "standard",
        additionalServices: [],
        targetAudience: "",
        seoKeywords: "",
        preferredStyle: "",
        additionalRequirements: "",
        additional: {}
      });
      setCurrentStep(1);
      setCompletedSteps([]);
      
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = (): boolean => {
    return Boolean(
      form.name.trim() && 
      form.email.trim() && 
      form.service && 
      form.details.trim()
    );
  };

  const calculateEstimatedPrice = () => {
    const servicePrices: Record<string, number> = {
      "SEO-статья": 3000,
      "Лендинг": 8000,
      "Описание товара": 1500,
      "Пост в соцсети": 800,
      "Email-рассылка": 2500,
      "Презентация": 5000,
      "Веб-контент": 4000,
      "Техническая документация": 6000,
    };

    const basePrice = servicePrices[form.service] || 5000;
    
    // Deadline multiplier
    let deadlineMultiplier = 1;
    if (form.deadline === "urgent") deadlineMultiplier = 1.5;
    if (form.deadline === "express") deadlineMultiplier = 2;

    // Additional services cost
    const additionalServicesCost = form.additionalServices.reduce((total, serviceId) => {
      const costs: Record<string, number> = {
        "seo-optimization": 2000,
        "urgency": 3000,
        "multiple-variants": 1500,
        "consultation": 1000,
        "localization": 2500,
      };
      return total + (costs[serviceId] || 0);
    }, 0);

    return Math.round(basePrice * deadlineMultiplier) + additionalServicesCost;
  };

  return {
    form,
    currentStep,
    completedSteps,
    loading,
    nameInputRef,
    updateForm,
    setCurrentStep,
    handleSubmit,
    isFormValid,
    calculateEstimatedPrice
  };
}
