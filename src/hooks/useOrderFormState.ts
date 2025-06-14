
import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { SERVICES } from "@/data/services";

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

  const getSelectedService = () => {
    return SERVICES.find(service => service.name === form.service);
  };

  const calculateEstimatedPrice = () => {
    const selectedService = getSelectedService();
    if (!selectedService) return 5000;

    const basePrice = selectedService.price.min;
    
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

    const finalPrice = Math.round(basePrice * deadlineMultiplier) + additionalServicesCost;
    
    // Ensure minimum price
    return Math.max(finalPrice, selectedService.price.min);
  };

  const getEstimatedDeliveryTime = () => {
    const selectedService = getSelectedService();
    if (!selectedService) return "3-5 дней";

    let { min, max, unit } = selectedService.deliveryTime;
    
    // Adjust for deadline
    if (form.deadline === "urgent") {
      min = Math.max(1, Math.ceil(min / 2));
      max = Math.max(2, Math.ceil(max / 2));
    } else if (form.deadline === "express") {
      min = 1;
      max = 1;
      unit = "день";
    }

    return min === max ? `${min} ${unit}` : `${min}-${max} ${unit}`;
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
    calculateEstimatedPrice,
    getEstimatedDeliveryTime,
    getSelectedService
  };
}
