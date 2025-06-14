
interface ValidationRule {
  field: string;
  message: string;
  isValid: boolean;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  details: string;
  additional: Record<string, string>;
}

export function createValidationRules(form: FormData): ValidationRule[] {
  const rules: ValidationRule[] = [];

  // Name validation
  rules.push({
    field: "Имя",
    message: form.name.trim() ? "Имя заполнено корректно" : "Введите ваше имя",
    isValid: form.name.trim().length >= 2
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  rules.push({
    field: "Email",
    message: emailRegex.test(form.email) ? "Email заполнен корректно" : "Введите корректный email адрес",
    isValid: emailRegex.test(form.email)
  });

  // Service validation
  rules.push({
    field: "Услуга",
    message: form.service ? "Услуга выбрана" : "Выберите тип услуги",
    isValid: Boolean(form.service)
  });

  // Details validation
  rules.push({
    field: "Описание",
    message: form.details.trim().length >= 20 ? "Описание заполнено подробно" : "Добавьте более подробное описание (минимум 20 символов)",
    isValid: form.details.trim().length >= 20
  });

  return rules;
}

export function getFormCompletionPercentage(validationRules: ValidationRule[]): number {
  const validRules = validationRules.filter(rule => rule.isValid);
  return Math.round((validRules.length / validationRules.length) * 100);
}

export function isFormValid(validationRules: ValidationRule[]): boolean {
  return validationRules.every(rule => rule.isValid);
}
