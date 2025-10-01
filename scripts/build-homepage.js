const fs = require('fs')
const path = require('path')

// Конфигурация
const API_URL = process.env.API_URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'generated')

async function fetchContent() {
  try {
    const response = await fetch(`${API_URL}/api/export-content`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching content:', error)
    throw error
  }
}

function generateHomePage(homePageData) {
  // Функция для извлечения текста из richText
  function extractTextFromRichText(richText) {
    if (!richText?.root?.children) return '';
    return richText.root.children
      .map(child => child.children?.map(grandChild => grandChild.text || '').join('') || '')
      .join(' ');
  }

  const aboutText = extractTextFromRichText(homePageData?.aboutText) || 
    'Союз Джазовых Музыкантов Санкт-Петербурга — это объединение музыкантов, которое стремится развивать джазовую культуру в России. Мы создаем пространство для диалога, экспериментов и профессионального роста.';
  
  const principlesText = extractTextFromRichText(homePageData?.principlesText) || 
    'Мы руководствуемся пятью основными принципами, которые определяют нашу деятельность и подход к развитию джазовой культуры в России.';

  const quoteText = homePageData?.quote?.text || 
    '«Идея намного важнее стиля или представлений о стиле, в котором вы пытаетесь играть».';
  
  const quoteAuthor = homePageData?.quote?.author || 
    '— Орнетт Коулман, саксофонист';

  const heroVideoSrc = homePageData?.heroVideo?.url ? 
    `assets/video/${path.basename(homePageData.heroVideo.url)}` : 
    'assets/video/hero-bg.mp4';

  const promoVideoSrc = homePageData?.promoVideo?.url ? 
    `assets/video/${path.basename(homePageData.promoVideo.url)}` : 
    'assets/video/promo-video.mp4';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">
    <meta name="msapplication-navbutton-color" content="#000000">
    <meta name="apple-mobile-web-app-title" content="Russian Jazz Service">
    <title>${homePageData?.title || 'Russian Jazz Service'} — ${homePageData?.subtitle || 'Союз Джазовых Музыкантов СПб'}</title>
    <link rel="stylesheet" href="assets/css/main.css" />
    <script>
        // Предотвращение мерцания темы при загрузке
        (function() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
            } else {
                // Если тема не сохранена, устанавливаем темную по умолчанию
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            // Дополнительная проверка для надежности
            document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
        })();
    </script>
</head>
<body>
    <!-- ШАПКА САЙТА -->
    <header class="site-header">
        <div class="container">
            <div class="logo">
                <a href="index.html">
                    <img src="assets/images/logo.svg" alt="Russian Jazz Service" class="logo-img">
                    <span class="logo-text">${homePageData?.subtitle || 'Союз Джазовых Музыкантов Санкт-Петербурга'}</span>
                </a>
            </div>
            <div class="header-controls">
                <div class="theme-switch desktop-only">
                    <input type="checkbox" id="theme-toggle" class="theme-toggle-input">
                    <label for="theme-toggle" class="theme-toggle-label">
                    </label>
                </div>
                <button class="hamburger" aria-label="Открыть меню">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
            <nav class="main-nav">
                <a href="index.html" class="nav-link">Главная</a>
                <a href="rjs-manifest.html" class="nav-link">Манифест</a>
                <a href="contacts.html" class="nav-link">Контакты</a>
                <div class="mobile-theme-switch">
                    <div class="theme-switch">
                        <input type="checkbox" id="mobile-theme-toggle" class="theme-toggle-input">
                        <label for="mobile-theme-toggle" class="theme-toggle-label">
                            <span class="theme-text">Темная тема</span>
                        </label>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- ОТСТУП ПОД ШАПКУ -->
    <div style="height: 60px"></div>

    <!-- ГЛАВНЫЙ ХЕДЕР С ВИДЕО -->
    <header class="hero">
        <video autoplay muted loop playsinline class="hero-video">
            <source src="${heroVideoSrc}" type="video/mp4" />
            Ваш браузер не поддерживает видео.
        </video>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>${homePageData?.title || 'Russian Jazz Service'}</h1>
            <p>${homePageData?.subtitle || 'Союз Джазовых Музыкантов Санкт-Петербурга'}</p>
            <a href="rjs-manifest.html" class="btn">Манифест</a>
        </div>
    </header>

    <!-- О НАС -->
    <section class="intro-section">
        <div class="container">
            <h2>${homePageData?.aboutTitle || 'О Союзе'}</h2>
            <p>${aboutText}</p>
        </div>
    </section>

    <!-- НАШИ ПРИНЦИПЫ -->
    <section class="intro-section">
        <div class="container">
            <h2><a href="rjs-manifest.html" class="principles-title-link">${homePageData?.principlesTitle || 'Наши принципы'}</a></h2>
            <p>${principlesText}</p>
        </div>
    </section>

    <!-- ЦИТАТА -->
    <section class="intro-section">
        <div class="container">
            <blockquote class="quote">
                <p class="quote-text">${quoteText}</p>
                <cite class="quote-author">${quoteAuthor}</cite>
            </blockquote>
        </div>
    </section>

    <!-- КОНТЕНТ С ВИДЕО -->
    <main>
        <section class="video-section">
            <blockquote class="quote video-quote">
                <p class="quote-text">«Все начинается с инициативы одного человека».</p>
                <cite class="quote-author">— Владимир Фейертаг, музыковед</cite>
            </blockquote>
            <video controls autoplay muted loop poster>
                <source src="${promoVideoSrc}" type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>
        </section>
    </main>

    <footer>
        <p>
            © 2025 Russian Jazz Service — официальный сайт Союза Джазовых Музыкантов СПб
        </p>
        <p>
            <a href="index.html">Главная</a> |
            <a href="rjs-manifest.html">Манифест</a> |
            <a href="contacts.html">Контакты</a>
        </p>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>`;
}

async function main() {
  console.log('🚀 Начинаем генерацию главной страницы...')
  try {
    const content = await fetchContent()
    const homePage = content.homePage || null

    // Генерируем главную страницу
    const homeHtml = generateHomePage(homePage)
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'index.html'), homeHtml)
    console.log('📝 Главная страница обновлена!')

    console.log('✅ Генерация завершена!')
    console.log('🏠 Главная страница:', homePage ? 'обновлена из CMS' : 'использует значения по умолчанию')
  } catch (error) {
    console.error('❌ Ошибка генерации:', error)
    process.exit(1)
  }
}

main()
