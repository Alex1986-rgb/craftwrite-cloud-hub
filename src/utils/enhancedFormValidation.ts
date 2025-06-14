
export interface ValidationRule {
  field: string;
  message: string;
  isValid: boolean;
}

export const createValidationRules = (form: {
  name: string;
  email: string;
  service: string;
  details: string;
}): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  // Валидация имени
  if (!form.name.trim()) {
    rules.push({
      field: "name",
      message: "Имя обязательно для заполнения",
      isValid: false
    });
  } else if (form.name.trim().length < 2) {
    rules.push({
      field: "name", 
      message: "Имя должно содержать минимум 2 символа",
      isValid: false
    });
  } else {
    rules.push({
      field: "name",
      message: "Имя корректно",
      isValid: true
    });
  }

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    rules.push({
      field: "email",
      message: "Email обязателен для заполнения",
      isValid: false
    });
  } else if (!emailRegex.test(form.email)) {
    rules.push({
      field: "email",
      message: "Введите корректный email адрес",
      isValid: false
    });
  } else {
    rules.push({
      field: "email",
      message: "Email корректен",
      isValid: true
    });
  }

  // Валидация услуги
  if (!form.service.trim()) {
    rules.push({
      field: "service",
      message: "Выберите тип услуги",
      isValid: false
    });
  } else {
    rules.push({
      field: "service",
      message: "Услуга выбрана",
      isValid: true
    });
  }

  // Валидация описания
  if (!form.details.trim()) {
    rules.push({
      field: "details",
      message: "Опишите детали вашего проекта",
      isValid: false
    });
  } else if (form.details.trim().length < 20) {
    rules.push({
      field: "details",
      message: "Описание должно содержать минимум 20 символов для лучшего понимания задачи",
      isValid: false
    });
  } else if (form.details.trim().length > 2000) {
    rules.push({
      field: "details",
      message: "Описание слишком длинное (максимум 2000 символов)",
      isValid: false
    });
  } else {
    rules.push({
      field: "details",
      message: "Описание проекта детальное и понятное",
      isValid: true
    });
  }

  return rules;
};

export const getFormCompletionPercentage = (rules: ValidationRule[]): number => {
  const validRules = rules.filter(rule => rule.isValid);
  return Math.round((validRules.length / rules.length) * 100);
};

export const isFormValid = (rules: ValidationRule[]): boolean => {
  return rules.every(rule => rule.isValid);
};
