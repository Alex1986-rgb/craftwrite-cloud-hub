
# Компоненты

## Структура компонентов

### Общие компоненты (common/)

#### Header
Основной навигационный компонент приложения.

**Props:**
- Без пропсов

**Функциональность:**
- Адаптивная навигация
- Мобильное меню
- Брендинг

#### Footer
Нижний колонтитул с навигацией и копирайтом.

**Props:**
- Без пропсов

### Компоненты формы заказа (order/)

#### OrderForm
Основная форма заказа услуг.

**Props:**
- Без пропсов (использует внутреннее состояние)

**Состояние:**
```typescript
interface OrderFormState {
  name: string;
  email: string;
  service: string;
  details: string;
  additional: Record<string, string>;
}
```

#### OrderFormHeader
Заголовок формы заказа с призывом к действию.

#### OrderProgressIndicator
Индикатор прогресса заполнения формы.

**Props:**
```typescript
interface OrderProgressIndicatorProps {
  currentStep: number;
}
```

#### ServiceSelector
Компонент выбора услуги.

**Props:**
```typescript
interface ServiceSelectorProps {
  services: Service[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
}
```

### UI компоненты (ui/)

#### Button
Переиспользуемый компонент кнопки на основе shadcn/ui.

**Props:**
```typescript
interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

#### Card
Контейнер для группировки контента.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
```

#### Input
Компонент ввода текста.

**Props:**
```typescript
interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
```

#### Textarea
Многострочное поле ввода.

**Props:**
```typescript
interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}
```

### Компоненты лендинга (landing/)

#### HeroSection
Главный блок с призывом к действию.

#### ServicesCatalogSection
Каталог доступных услуг.

#### BenefitsSection
Преимущества сервиса.

#### TestimonialsSection
Отзывы клиентов.

## Правила написания компонентов

### Структура файла компонента

```typescript
import React from 'react';
import { ComponentProps } from './types';

interface ComponentNameProps {
  // описание пропсов
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // логика компонента
  
  return (
    <div className="component-styles">
      {/* JSX */}
    </div>
  );
}
```

### Соглашения по наименованию
- PascalCase для компонентов
- camelCase для пропсов и переменных
- kebab-case для CSS классов

### Типизация
Все компоненты должны быть типизированы с TypeScript.

### Стилизация
Используется Tailwind CSS с модификатором responsive-first.
