
# Мобильные приложения

## Обзор

CopyProCloud использует Capacitor для создания нативных мобильных приложений для iOS и Android на основе веб-версии.

## Установка Capacitor

Capacitor уже настроен в проекте. Конфигурация находится в `capacitor.config.ts`.

## Конфигурация

### capacitor.config.ts

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f9730c1071cc46fd86f6ac0e86541c6e',
  appName: 'CopyProCloud',
  webDir: 'dist',
  server: {
    url: 'https://your-domain.com',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};
```

## Подготовка к сборке

### 1. Сборка веб-версии

```bash
npm run build
```

### 2. Синхронизация с нативными платформами

```bash
npx cap sync
```

## Android

### Требования

- Android Studio
- Java JDK 17+
- Android SDK (API 22+)

### Настройка

1. Добавление Android платформы:
```bash
npx cap add android
```

2. Открытие в Android Studio:
```bash
npx cap open android
```

3. Конфигурация в `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Сборка

#### Debug сборка
```bash
npx cap run android
```

#### Release сборка
1. В Android Studio: Build > Generate Signed Bundle / APK
2. Выберите тип сборки (APK или Bundle)
3. Настройте подпись приложения

### Тестирование

```bash
# Запуск на эмуляторе
npx cap run android

# Запуск на физическом устройстве
npx cap run android --target your-device-id
```

## iOS

### Требования

- macOS
- Xcode 14+
- iOS Deployment Target 13.0+
- Apple Developer Account (для публикации)

### Настройка

1. Добавление iOS платформы:
```bash
npx cap add ios
```

2. Открытие в Xcode:
```bash
npx cap open ios
```

3. Настройка Bundle Identifier в Xcode
4. Настройка подписи приложения

### Конфигурация Info.plist

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### Сборка

#### Debug сборка
```bash
npx cap run ios
```

#### Release сборка
1. В Xcode: Product > Archive
2. Следуйте инструкциям для загрузки в App Store Connect

## Плагины

### Установленные плагины

- `@capacitor/splash-screen` - экран загрузки
- `@capacitor/status-bar` - настройка статус бара
- `@capacitor/keyboard` - управление клавиатурой

### Добавление новых плагинов

```bash
npm install @capacitor/camera
npx cap sync
```

### Использование плагинов

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
};
```

## Отладка

### Веб-отладка
```bash
# Запуск на эмуляторе с отладкой
npx cap run android --livereload --external

# Для iOS
npx cap run ios --livereload --external
```

### Логирование

```typescript
import { CapacitorHttp } from '@capacitor/core';

// Логирование в нативной консоли
console.log('Debug message');
```

### Chrome DevTools

1. Откройте `chrome://inspect` в Chrome
2. Найдите ваше устройство в списке
3. Нажмите "Inspect" для отладки WebView

## Публикация

### Google Play Store

1. Создайте подписанный APK/Bundle
2. Загрузите в Google Play Console
3. Заполните метаданные приложения
4. Пройдите процесс проверки

### Apple App Store

1. Создайте архив в Xcode
2. Загрузите в App Store Connect
3. Заполните метаданные приложения
4. Отправьте на проверку

## Оптимизация

### Производительность

- Используйте lazy loading для больших компонентов
- Оптимизируйте изображения
- Минимизируйте размер bundle

### Размер приложения

```bash
# Анализ размера bundle
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets/*.js
```

### Кэширование

Настройте стратегию кэширования в Service Worker для оффлайн работы.

## Troubleshooting

### Частые проблемы

1. **Проблемы с CORS**: Настройте `server.allowNavigation` в конфигурации
2. **Проблемы с клавиатурой**: Используйте плагин `@capacitor/keyboard`
3. **Проблемы с иконками**: Убедитесь, что иконки правильного размера

### Логи

```bash
# Android логи
adb logcat

# iOS логи (через Xcode Console)
```
