
# Развертывание

## Обзор

CopyProCloud поддерживает несколько способов развертывания: через Lovable Platform, статический хостинг и Docker.

## Развертывание через Lovable

### Автоматическое развертывание

1. Откройте проект в Lovable
2. Нажмите кнопку "Publish" в правом верхнем углу
3. Выберите домен или используйте поддомен Lovable
4. Подтвердите публикацию

### Настройка домена

1. Перейдите в Project > Settings > Domains
2. Нажмите "Connect Domain"
3. Следуйте инструкциям для настройки DNS

## Статический хостинг

### Netlify

1. Сборка проекта:
```bash
npm run build
```

2. Подключение к Netlify:
```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Развертывание
netlify deploy --prod --dir=dist
```

3. Настройка переадресации в `public/_redirects`:
```
/*    /index.html   200
```

### Vercel

1. Установка Vercel CLI:
```bash
npm install -g vercel
```

2. Развертывание:
```bash
vercel --prod
```

3. Конфигурация в `vercel.json`:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### GitHub Pages

1. Установка gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавление скриптов в `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Развертывание:
```bash
npm run deploy
```

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### Сборка и запуск

```bash
# Сборка образа
docker build -t copyprocloud .

# Запуск контейнера
docker run -p 80:80 copyprocloud
```

## CI/CD

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Переменные окружения

### Продакшн переменные

```env
VITE_API_URL=https://api.copyprocloud.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_ENVIRONMENT=production
```

### Настройка в различных платформах

#### Netlify
Переменные устанавливаются в Site Settings > Environment Variables

#### Vercel
Переменные устанавливаются в Project Settings > Environment Variables

#### Docker
Переменные передаются через флаг `-e`:
```bash
docker run -e VITE_API_URL=https://api.example.com -p 80:80 copyprocloud
```

## Мониторинг

### Логирование ошибок

Рекомендуется интеграция с сервисами мониторинга:
- Sentry для отслеживания ошибок
- Google Analytics для аналитики
- Hotjar для пользовательского опыта

### Проверка работоспособности

```bash
# Проверка статуса сайта
curl -f https://your-domain.com/health || exit 1
```
