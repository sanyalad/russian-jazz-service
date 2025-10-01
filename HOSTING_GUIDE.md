# 🚀 Руководство по размещению на хостинге

## 📋 Варианты хостинга

### 1. **Бесплатные варианты**
- **Vercel** (рекомендуется) - для CMS и статики
- **Netlify** - для статики
- **GitHub Pages** - только для статики
- **Firebase Hosting** - для статики

### 2. **Платные варианты**
- **DigitalOcean** - VPS с полным контролем
- **AWS** - масштабируемое решение
- **Heroku** - простое развертывание
- **Railway** - современная платформа

## 🎯 Рекомендуемый подход: Vercel

### Преимущества:
- ✅ Бесплатный план
- ✅ Автоматический деплой из Git
- ✅ Поддержка Next.js (CMS)
- ✅ CDN для статических файлов
- ✅ SSL сертификаты
- ✅ Простота настройки

## 📦 Подготовка к деплою

### 1. Создайте репозиторий на GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/russian-jazz-service.git
git push -u origin main
```

### 2. Настройте переменные окружения
Создайте файл `.env.production` в папке `admin/`:
```env
DATABASE_URI=your-production-database-url
PAYLOAD_SECRET=your-production-secret-key
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### 3. Настройте базу данных
- **Рекомендуется**: PostgreSQL на Railway, Supabase или Neon
- **Альтернатива**: SQLite для простых случаев

## 🚀 Развертывание на Vercel

### Шаг 1: Подключите репозиторий
1. Зайдите на [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите ваш репозиторий

### Шаг 2: Настройте проект
1. **Root Directory**: `admin`
2. **Framework Preset**: Next.js
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Шаг 3: Добавьте переменные окружения
В настройках проекта добавьте:
- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

### Шаг 4: Настройте домен
1. В настройках проекта перейдите в "Domains"
2. Добавьте ваш домен
3. Настройте DNS записи

## 📁 Развертывание статических файлов

### Вариант A: Отдельный проект Vercel
1. Создайте новый проект Vercel
2. **Root Directory**: `public`
3. **Framework Preset**: Other
4. **Build Command**: `echo "Static files"`
5. **Output Directory**: `.`

### Вариант B: Netlify
1. Зайдите на [netlify.com](https://netlify.com)
2. Подключите репозиторий
3. **Base directory**: `public`
4. **Publish directory**: `public`

## 🔄 Автоматизация обновлений

### 1. GitHub Actions для генерации статики
Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:static
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 2. Webhook для обновления статики
Добавьте в CMS webhook, который будет:
1. Генерировать новые статические страницы
2. Обновлять статический хостинг

## 🗄️ Настройка базы данных

### PostgreSQL на Railway
1. Зайдите на [railway.app](https://railway.app)
2. Создайте новый проект
3. Добавьте PostgreSQL
4. Скопируйте connection string
5. Добавьте в переменные окружения

### Supabase (альтернатива)
1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Получите connection string
4. Настройте переменные окружения

## 🔧 Настройка домена

### 1. Покупка домена
- **Рекомендуется**: Namecheap, GoDaddy, или регистратор в вашей стране

### 2. Настройка DNS
Добавьте записи:
```
A     @     76.76.19.61    (Vercel IP)
CNAME www   cname.vercel-dns.com
```

### 3. SSL сертификат
Vercel автоматически выдаст SSL сертификат

## 📊 Мониторинг и аналитика

### 1. Vercel Analytics
- Включите в настройках проекта
- Получайте метрики производительности

### 2. Google Analytics
Добавьте в `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Команды для деплоя

### Локальная подготовка
```bash
# Установка зависимостей
npm install

# Генерация статических страниц
npm run build:static

# Проверка локально
npm run serve:static
```

### Проверка перед деплоем
```bash
# Проверка CMS
cd admin && npm run build

# Проверка статики
npm run test:mobile
```

## 🚨 Устранение проблем

### Проблема: CMS не запускается
**Решение**: Проверьте переменные окружения и базу данных

### Проблема: Статические файлы не обновляются
**Решение**: Проверьте webhook и GitHub Actions

### Проблема: Домен не работает
**Решение**: Проверьте DNS записи и SSL сертификат

## 💰 Стоимость

### Бесплатные планы
- **Vercel**: 100GB bandwidth, 100 deployments/month
- **Netlify**: 100GB bandwidth, 300 build minutes/month
- **Railway**: $5 credit monthly
- **Supabase**: 500MB database, 50MB file storage

### Платные планы (при необходимости)
- **Vercel Pro**: $20/month
- **Netlify Pro**: $19/month
- **Railway**: $5-20/month
- **Supabase Pro**: $25/month

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все переменные окружения настроены
3. Проверьте статус базы данных
4. Обратитесь к документации Vercel

---

**Удачного деплоя! 🚀**
