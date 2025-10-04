# 🚀 Чек-лист для деплоя Russian Jazz Service

## ✅ Подготовка к деплою

### 1. Git настройка (после установки Git)
```bash
# Настройка пользователя
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"

# Проверка статуса
git status

# Добавление файлов
git add .
git commit -m "Initial commit - готов к деплою"

# Создание репозитория на GitHub и подключение
git remote add origin https://github.com/ваш-логин/russian-jazz-service.git
git branch -M main
git push -u origin main
```

### 2. Настройка базы данных
**Варианты:**
- **Railway** (рекомендуется): https://railway.app
- **Supabase**: https://supabase.com
- **Neon**: https://neon.tech

**Получите connection string вида:**
```
postgresql://username:password@host:5432/database_name
```

### 3. Переменные окружения для продакшена
Создайте файл `admin/.env.production`:
```env
# Database
DATABASE_URI=postgresql://username:password@your-db-host:5432/russian_jazz_service

# Payload - сгенерируйте новый секретный ключ
PAYLOAD_SECRET=your-production-secret-key-here

# Next.js
NEXTAUTH_SECRET=your-production-nextauth-secret-here
NEXTAUTH_URL=https://your-domain.com

# Server URL для API
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### 4. Генерация секретных ключей
```bash
# Для PAYLOAD_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Для NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Развертывание на Vercel

### Шаг 1: Подключение репозитория
1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите ваш репозиторий `russian-jazz-service`

### Шаг 2: Настройка проекта CMS
1. **Root Directory**: `admin`
2. **Framework Preset**: Next.js
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Шаг 3: Переменные окружения в Vercel
Добавьте в настройках проекта:
- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SERVER_URL`

### Шаг 4: Развертывание статических файлов
**Вариант A: Отдельный проект Vercel**
1. Создайте новый проект Vercel
2. **Root Directory**: `public`
3. **Framework Preset**: Other
4. **Build Command**: `echo "Static files"`
5. **Output Directory**: `.`

**Вариант B: Netlify**
1. Зайдите на https://netlify.com
2. Подключите репозиторий
3. **Base directory**: `public`
4. **Publish directory**: `public`

## 🔄 Автоматизация обновлений

### GitHub Actions для генерации статики
Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy Static Site
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build static pages
        run: npm run build:static
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./public
```

## 🌐 Настройка домена

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

## 📊 Мониторинг

### Vercel Analytics
- Включите в настройках проекта
- Получайте метрики производительности

### Google Analytics
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

## 🛠️ Команды для проверки

### Локальная проверка
```bash
# Установка зависимостей
npm install

# Генерация статических страниц
npm run build:static

# Проверка локально
npm run serve:static
```

### Проверка CMS
```bash
cd admin
npm run build
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
