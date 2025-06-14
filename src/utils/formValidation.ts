
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const getValidationErrors = (form: {
  name: string;
  email: string;
  service: string;
  details: string;
}): string[] => {
  const errors: string[] = [];

  if (!validateRequired(form.name)) {
    errors.push("Имя обязательно для заполнения");
  }

  if (!validateRequired(form.email)) {
    errors.push("Email обязателен для заполнения");
  } else if (!validateEmail(form.email)) {
    errors.push("Введите корректный email");
  }

  if (!validateRequired(form.service)) {
    errors.push("Выберите услугу");
  }

  if (!validateRequired(form.details)) {
    errors.push("Опишите детали проекта");
  } else if (!validateMinLength(form.details, 10)) {
    errors.push("Описание проекта должно содержать минимум 10 символов");
  }

  return errors;
};
