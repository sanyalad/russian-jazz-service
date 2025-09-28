# 📋 Документация проекта Russian Jazz Service

## 🎯 Обзор проекта
Проект представляет собой гибридную архитектуру: статический фронтенд + Next.js CMS (Payload) для управления контентом.

## 📁 Структура проекта

```
russian-jazz-service/
├── admin/                    # Next.js CMS (Payload)
│   ├── src/
│   │   ├── collections/      # Коллекции контента
│   │   ├── payload.config.ts # Конфигурация CMS
│   │   └── app/             # Next.js приложение
│   └── package.json
├── public/                   # Статические файлы
│   ├── index.html           # Главная страница
│   ├── rjs-manifest.html    # Страница манифеста
│   ├── contacts.html         # Страница контактов
│   └── assets/              # Ресурсы
│       ├── css/main.css     # Основные стили
│       ├── js/main.js       # JavaScript функциональность
│       └── video/           # Видео файлы
├── scripts/                 # Скрипты сборки
│   ├── build-homepage.js    # Генерация главной страницы
│   ├── build-static.js      # Генерация статических страниц
│   └── simple-server.js     # Статический сервер
└── package.json             # Корневой package.json
```

## 🎨 Дизайн и стили

### Цветовая схема
- **Темная тема**: Черный фон, белый текст, синие акценты
- **Светлая тема**: Чистый белый фон `#ffffff`, темный текст `#1a1a1a`, синие акценты `#2563eb`

### Анимации
- **Блоки при скролле**: `translateY(50px)` → `translateY(0)` с `opacity: 0` → `opacity: 1`
- **Карточки манифеста**: Разные цвета левой границы с градиентными фонами, анимация при наведении
- **Переходы**: `transition: all 0.8s ease-out`

### Типографика
- **Заголовки**: `font-size: clamp(2.5rem, 4vw, 4rem)`, `font-weight: 700`, `letter-spacing: -0.02em`
- **Светлая тема заголовки**: Темный цвет `#1a1a1a` для лучшей видимости
- **Темная тема заголовки**: Светлый цвет `#a8a8a8` с прозрачностью

### Адаптивность
- **Мобильные устройства**: Специальные медиа-запросы для экранов ≤768px и ≤480px
- **Touch-события**: Оптимизация для iOS Safari
- **Viewport**: `maximum-scale=1.0, user-scalable=no`

## 🔧 Технические детали

### CMS (Payload)
- **База данных**: PostgreSQL
- **Коллекции**: Users, Media, ManifestPrinciple, Events, Artists, HomePage
- **API**: `/api/export-content` для экспорта контента

### Статическая генерация
- **Скрипт**: `scripts/build-homepage.js` генерирует `public/index.html`
- **Сервер**: `scripts/simple-server.js` на порту 8080
- **Контент**: Динамически загружается из CMS

### JavaScript функциональность
- **Переключатель тем**: Сохранение в localStorage с синхронизацией между вкладками
- **Анимации скролла**: `requestAnimationFrame` с дебаунсом
- **Видео управление**: Разное поведение для тем
- **Мобильное меню**: Гамбургер с анимацией
- **Синхронизация тем**: StorageEvent + CustomEvent для всех страниц

## 📱 Мобильная адаптация

### Meta теги
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#000000">
```

### CSS медиа-запросы
- **≤1024px**: Планшеты
- **≤768px**: Мобильные устройства
- **≤480px**: Маленькие экраны

### Адаптивные блоки
- **Заголовки**: Компактные ячейки с ограниченной шириной (max-width: 200px)
- **Текст**: Отступы для предотвращения наложения (margin-left: 20px)
- **Переключатель темы**: Центрирование по вертикали с height: 100%

### Мобильное меню
- **Бургер-кнопка**: Справа в шапке, анимация в крестик
- **Выпадающее меню**: Появляется слева, фиксированное позиционирование
- **Переключатель темы**: Встроен в мобильное меню как нижний пункт
- **Закрытие**: При клике на ссылку или вне меню

## 🎬 Видео файлы

### Структура
```
assets/video/
├── hero-bg.mp4              # Фон главной страницы (темная тема)
├── manifest-bg.mp4         # Фон манифеста (темная тема)
├── promo-video.mp4          # Промо видео
└── webm/                   # WebM версии
    ├── hero-bg.webm
    ├── hero-light-bg.webm   # Фон для светлой темы
    ├── manifest-bg.webm
    └── promo-video.webm
```

### Поведение по темам
- **Темная тема**: Обычное воспроизведение с loop
- **Светлая тема**: Проигрывание до конца, остановка на последнем кадре с обработкой ошибок автовоспроизведения

## 🔄 Резервные копии

### Git команды
```bash
# Создание коммита
git add .
git commit -m "Описание изменений"

# Создание ветки для эксперимента
git checkout -b feature/new-feature

# Возврат к предыдущему состоянию
git checkout HEAD~1

# Просмотр истории
git log --oneline -10
```

### Ручные резервные копии
```bash
# Копирование важных файлов
cp public/assets/css/main.css backup/main.css.$(date +%Y%m%d_%H%M%S)
cp public/index.html backup/index.html.$(date +%Y%m%d_%H%M%S)
cp public/rjs-manifest.html backup/manifest.html.$(date +%Y%m%d_%H%M%S)
```

### Автоматические резервные копии
```bash
# Скрипт для ежедневных бэкапов
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$DATE"
mkdir -p "$BACKUP_DIR"
cp -r public/ "$BACKUP_DIR/"
cp -r admin/src/ "$BACKUP_DIR/admin-src/"
echo "Backup created: $BACKUP_DIR"
```

## 🚀 Команды разработки

### Запуск проекта
```bash
# Запуск CMS
npm run dev:admin

# Генерация статических страниц
npm run build:homepage

# Запуск статического сервера
npm run serve:static
```

### Полный цикл разработки
```bash
# 1. Запуск CMS
npm run dev:admin

# 2. Генерация контента
npm run build:homepage

# 3. Запуск сайта
npm run serve:static

# 4. Открыть в браузере
start http://localhost:8080
```

## 🐛 Известные проблемы и решения

### Проблема: Стили "слетели"
**Решение**: Восстановить CSS из резервной копии или пересоздать на основе других файлов

### Проблема: Видео не проигрывается в светлой теме
**Решение**: Проверить функцию `handleManifestVideoLoad()` в `main.js`

### Проблема: Анимации не работают
**Решение**: Проверить классы `.animate-in` в CSS и функцию `animateOnScroll()` в JS

## 📝 Чек-лист перед деплоем

- [ ] Все стили работают корректно
- [ ] Анимации функционируют на всех устройствах
- [ ] Переключатель тем работает
- [ ] Видео проигрывается правильно
- [ ] Мобильная адаптация проверена
- [ ] Резервная копия создана
- [ ] Git коммит сделан

## 🔗 Полезные ссылки

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Mobile Web Development](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---
*Документация обновлена: $(date)*
