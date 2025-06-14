
# API Документация

## Обзор

CopyProCloud использует RESTful API для взаимодействия с внешними сервисами и обработки заказов.

## Базовые эндпоинты

### Заказы

#### POST /api/orders
Создание нового заказа.

**Запрос:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "service": "SEO-статья",
  "details": "Описание проекта...",
  "additional": {
    "wordCount": "1000",
    "deadline": "7 дней"
  }
}
```

**Ответ:**
```json
{
  "success": true,
  "orderId": "order_123456",
  "message": "Заказ успешно создан"
}
```

#### GET /api/orders/:id
Получение информации о заказе.

**Ответ:**
```json
{
  "id": "order_123456",
  "status": "pending",
  "service": "SEO-статья",
  "createdAt": "2024-01-15T10:00:00Z",
  "estimatedCompletion": "2024-01-22T10:00:00Z"
}
```

### Платежи

#### POST /api/payments/create-session
Создание сессии оплаты Stripe.

**Запрос:**
```json
{
  "orderId": "order_123456",
  "amount": 5000,
  "currency": "rub"
}
```

**Ответ:**
```json
{
  "sessionId": "cs_test_123456",
  "url": "https://checkout.stripe.com/pay/cs_test_123456"
}
```

## Обработка ошибок

### Коды ошибок

| Код | Описание |
|-----|----------|
| 400 | Неверный запрос |
| 401 | Не авторизован |
| 403 | Доступ запрещен |
| 404 | Не найдено |
| 500 | Внутренняя ошибка сервера |

### Формат ошибки

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Некорректные данные",
    "details": {
      "field": "email",
      "message": "Неверный формат email"
    }
  }
}
```

## Аутентификация

В текущей версии аутентификация не требуется для публичных эндпоинтов.

## Ограничения

- Лимит запросов: 100 запросов в минуту
- Максимальный размер запроса: 1MB
- Поддерживаемые форматы: JSON

## SDK и клиенты

### JavaScript/TypeScript

```typescript
import { OrderAPI } from './api/orders';

const orderApi = new OrderAPI();

// Создание заказа
const order = await orderApi.create({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  service: 'SEO-статья',
  details: 'Описание проекта...'
});
```

## Веб-хуки

### Уведомления о статусе заказа

**URL:** `POST /webhooks/order-status`

**Payload:**
```json
{
  "orderId": "order_123456",
  "status": "completed",
  "timestamp": "2024-01-22T10:00:00Z"
}
```

## Тестирование API

### Локальная разработка

API эмулируется через mock-сервисы в режиме разработки.

### Тестовые данные

```typescript
const testOrder = {
  name: "Test User",
  email: "test@example.com",
  service: "Тестовая услуга",
  details: "Тестовое описание"
};
```
