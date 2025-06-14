
# Установка и настройка

## Системные требования

- Node.js 18+ или выше
- npm 9+ или yarn
- Git

## Локальная установка

### 1. Клонирование репозитория

```bash
git clone <ваш-git-url>
cd copyprocloud
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск проекта в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

### 4. Сборка для продакшена

```bash
npm run build
```

### 5. Предварительный просмотр продакшен сборки

```bash
npm run preview
```

## Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
# Опционально - для интеграции с внешними сервисами
VITE_API_URL=your_api_url_here
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
```

## Настройка IDE

### VS Code

Рекомендуемые расширения:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

### Настройка Prettier

Файл `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Отладка

### Доступные команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Предпросмотр
npm run preview

# Линтинг
npm run lint

# Проверка типов
npm run type-check
```

### Решение частых проблем

1. **Ошибки TypeScript**: Убедитесь, что все зависимости установлены
2. **Ошибки Tailwind CSS**: Проверьте конфигурацию в `tailwind.config.ts`
3. **Проблемы с маршрутизацией**: Убедитесь, что все маршруты правильно настроены в `App.tsx`
