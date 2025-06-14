
# Руководство по стилизации

## Обзор

CopyProCloud использует Tailwind CSS в сочетании с компонентами shadcn/ui для создания современного и адаптивного дизайна.

## Tailwind CSS

### Конфигурация

Конфигурация Tailwind находится в `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        // ... другие цвета
      }
    }
  }
}
```

### Основные принципы

1. **Mobile-first**: Стили пишутся сначала для мобильных устройств
2. **Utility-first**: Используются утилитарные классы вместо custom CSS
3. **Responsive design**: Адаптивность через брейкпоинты

### Брейкпоинты

```css
/* sm: 640px и выше */
@media (min-width: 640px) { ... }

/* md: 768px и выше */
@media (min-width: 768px) { ... }

/* lg: 1024px и выше */
@media (min-width: 1024px) { ... }

/* xl: 1280px и выше */
@media (min-width: 1280px) { ... }
```

## Цветовая схема

### Основные цвета

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
}
```

### Использование цветов

```tsx
// Основные цвета
<div className="bg-primary text-primary-foreground">
  Основной элемент
</div>

// Вторичные цвета
<div className="bg-secondary text-secondary-foreground">
  Вторичный элемент
</div>

// Приглушенные цвета
<div className="bg-muted text-muted-foreground">
  Приглушенный элемент
</div>
```

## Типографика

### Размеры шрифтов

```tsx
// Заголовки
<h1 className="text-4xl font-bold">Главный заголовок</h1>
<h2 className="text-3xl font-semibold">Подзаголовок</h2>
<h3 className="text-2xl font-medium">Заголовок секции</h3>

// Текст
<p className="text-base">Основной текст</p>
<p className="text-sm text-muted-foreground">Дополнительный текст</p>
<p className="text-xs">Мелкий текст</p>
```

### Адаптивная типографика

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
  Адаптивный заголовок
</h1>
```

## Компоненты

### Кнопки

```tsx
// Основная кнопка
<Button className="bg-primary hover:bg-primary/90">
  Основная кнопка
</Button>

// Вторичная кнопка
<Button variant="outline">
  Вторичная кнопка
</Button>

// Кнопка-призрак
<Button variant="ghost">
  Незаметная кнопка
</Button>
```

### Карточки

```tsx
<Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
  </CardHeader>
  <CardContent>
    Содержимое карточки
  </CardContent>
</Card>
```

### Формы

```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="your@email.com"
      className="transition-all duration-200 focus:ring-2"
    />
  </div>
</div>
```

## Анимации

### CSS анимации

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
```

### Использование анимаций

```tsx
<div className="animate-fade-in">
  Элемент с анимацией появления
</div>

<div className="hover:scale-105 transition-transform duration-200">
  Элемент с hover эффектом
</div>
```

## Адаптивный дизайн

### Сетка

```tsx
// Адаптивная сетка
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</div>
```

### Отступы и размеры

```tsx
// Адаптивные отступы
<div className="p-4 md:p-6 lg:p-8">
  Контент с адаптивными отступами
</div>

// Адаптивные размеры текста
<p className="text-sm md:text-base lg:text-lg">
  Адаптивный текст
</p>
```

### Видимость элементов

```tsx
// Скрыть на мобильных
<div className="hidden md:block">
  Видно только на планшетах и десктопе
</div>

// Показать только на мобильных
<div className="block md:hidden">
  Видно только на мобильных
</div>
```

## Темизация

### CSS переменные

Все цвета определены через CSS переменные, что позволяет легко менять тему:

```css
.dark {
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  /* ... другие цвета для темной темы */
}
```

### Переключение темы

```tsx
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Переключить тему
    </Button>
  );
};
```

## Лучшие практики

### Организация классов

```tsx
// Хорошо: группировка по типу
<div className="
  flex items-center justify-between
  p-4 rounded-lg
  bg-white border border-gray-200
  hover:shadow-md transition-shadow
">

// Плохо: случайный порядок
<div className="bg-white flex transition-shadow border-gray-200 p-4 items-center rounded-lg hover:shadow-md justify-between border">
```

### Переиспользование стилей

```tsx
// Создание переиспользуемых компонентов
const CardContainer = ({ children, className = "" }) => (
  <div className={`p-6 rounded-lg bg-card border shadow-sm ${className}`}>
    {children}
  </div>
);
```

### Условные стили

```tsx
import { cn } from "@/lib/utils";

const Button = ({ variant, className, ...props }) => (
  <button
    className={cn(
      "px-4 py-2 rounded-md font-medium transition-colors",
      variant === "primary" && "bg-primary text-primary-foreground",
      variant === "secondary" && "bg-secondary text-secondary-foreground",
      className
    )}
    {...props}
  />
);
```
