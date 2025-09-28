#!/usr/bin/env node

/**
 * Скрипт для генерации статических страниц из CMS
 * Запуск: node scripts/build-static.js
 */

const fs = require('fs')
const path = require('path')

// Конфигурация
const API_URL = process.env.API_URL || 'http://localhost:3003'
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'generated')

async function fetchContent() {
  try {
    const response = await fetch(`${API_URL}/api/export-content`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching content:', error)
    process.exit(1)
  }
}

function generateManifestHTML(principles) {
  const principlesHTML = principles
    .map((principle, index) => `
      <li data-number="${index + 1}">
        <div class="card-header">
          <span class="number">${index + 1}.</span>
          <strong>${principle.title}</strong>
        </div>
        <p>${principle.description}</p>
      </li>
    `)
    .join('')

  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <title>Манифест — Russian Jazz Service</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="stylesheet" href="assets/css/main.css" />
  </head>
  <body>
    <!-- ШАПКА САЙТА -->
    <header class="site-header">
      <div class="container">
        <div class="logo">
          <a href="../index.html">Союз Джазовых Музыкантов Санкт-Петербурга</a>
        </div>
        <button class="hamburger" aria-label="Открыть меню">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <nav class="main-nav">
          <a href="../index.html" class="nav-link">Главная</a>
          <a href="manifest.html" class="nav-link">Манифест</a>
          <a href="../contacts.html" class="nav-link">Контакты</a>
        </nav>
      </div>
    </header>

    <!-- ОТСТУП ПОД ШАПКУ -->
    <div style="height: 60px"></div>

    <!-- ГЛАВНЫЙ ХЕДЕР С ВИДЕО -->
    <header class="manifest-header">
      <video autoplay muted loop playsinline class="manifest-video">
        <source src="assets/video/webm/manifest-bg.webm" type="video/webm" />
        Ваш браузер не поддерживает видео.
      </video>
      <div class="manifest-overlay"></div>
      <div class="manifest-content-header">
        <h1>Манифест</h1>
        <p>Русской Службы Джаза</p>
        <p>(Manifesto of the Russian Jazz Service)</p>
        <a href="../index.html" class="btn">← Назад на главную</a>
      </div>
    </header>

    <!-- КОНТЕНТ МАНИФЕСТА -->
    <main class="manifest-content">
      <ol class="manifest-principles">
        ${principlesHTML}
      </ol>

      <div class="manifest-footer">
        <p>
          Этот манифест — основа деятельности Ассоциации "Союз Джазовых
          Музыкантов Санкт-Петербурга".
        </p>
        <a href="../index.html" class="btn">Вернуться на главную</a>
      </div>
    </main>

    <footer>
      <p>© 2025 Russian Jazz Service</p>
    </footer>
    <script src="assets/js/main.js"></script>
  </body>
</html>`
}

async function main() {
  console.log('🚀 Начинаем генерацию статических страниц...')
  
  // Создаем директорию для вывода
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Получаем контент из CMS
  console.log('📡 Получаем контент из CMS...')
  const content = await fetchContent()
  
  // Генерируем HTML для манифеста
  console.log('📝 Генерируем HTML для манифеста...')
  const manifestHTML = generateManifestHTML(content.principles)
  
  // Сохраняем файлы
  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.html'), manifestHTML)
  
  // Сохраняем JSON для других целей
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'content.json'), 
    JSON.stringify(content, null, 2)
  )
  
  console.log('✅ Генерация завершена!')
  console.log(`📁 Файлы сохранены в: ${OUTPUT_DIR}`)
  console.log(`📊 Сгенерировано принципов: ${content.principles.length}`)
  console.log(`🎵 Сгенерировано событий: ${content.events.length}`)
  console.log(`👥 Сгенерировано артистов: ${content.artists.length}`)
}

main().catch(console.error)


