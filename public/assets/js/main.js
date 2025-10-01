// Плавная прокрутка для всех якорных ссылок

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Плавный скролл по всей странице (опционально)
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
});

// Анимация при скролле для элементов манифеста

console.log("JS загружен");

// main.js
// main.js
// Анимация при скролле для элементов манифеста
let activeIndex = -1;
let isHovering = false;

const items = document.querySelectorAll(".manifest-principles li");

// Обработчики для наведения мыши
if (items.length > 0) {
  items.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      isHovering = true;
      items.forEach((item2, idx) => {
        if (idx === index) {
          item2.classList.add("active");
        } else {
          item2.classList.remove("active");
        }
      });
      activeIndex = index;
    });

    item.addEventListener("mouseout", () => {
      isHovering = false;
    });
  });

  // Обработка скролла с дебаунсом
  let scrollDebounce;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
      if (isHovering) return;

      let minDistance = Infinity;
      let closestIndex = -1;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const distance = Math.abs(rect.top - center);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        items.forEach((item, index) => {
          if (index === closestIndex) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        activeIndex = closestIndex;
      }
    }, 100);
  });
}

// Установка активного класса для текущей страницы
function initActivePageHighlight() {
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", initActivePageHighlight);

// Гамбургер-меню для мобильных устройств
const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");

if (hamburger && mainNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mainNav.classList.toggle("active");
  });

  // Закрыть меню при клике на ссылку
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mainNav.classList.remove("active");
    });
  });
}

// Анимация появления блоков при скролле (оптимизированная для мобильных)
let ticking = false;

function animateOnScroll() {
  const sections = document.querySelectorAll('.intro-section, .quote, .video-section, .manifest-principles li');
  
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionVisible = window.innerWidth <= 768 ? 100 : 150; // Меньше отступ на мобильных
    
    if (sectionTop < window.innerHeight - sectionVisible) {
      section.classList.add('animate-in');
    }
  });
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(animateOnScroll);
    ticking = true;
  }
}

// Оптимизированные обработчики событий
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', requestTick, { passive: true });

// Улучшенная поддержка touch-событий для мобильных
if ('ontouchstart' in window) {
  // Добавляем класс для touch-устройств
  document.documentElement.classList.add('touch-device');
  
  // Оптимизация для iOS Safari
  document.addEventListener('touchstart', function() {}, { passive: true });
}

// ——— ПЕРЕКЛЮЧАТЕЛЬ ТЕМ ——— //
function initThemeToggle() {
  const themeToggleInput = document.querySelector('.theme-toggle-input');
  const mobileThemeToggleInput = document.querySelector('#mobile-theme-toggle');
  
  // Получаем сохраненную тему или устанавливаем темную по умолчанию
  let savedTheme = localStorage.getItem('theme');
  
  // Устанавливаем темную тему по умолчанию только если тема не сохранена
  if (!savedTheme) {
    localStorage.setItem('theme', 'dark');
    savedTheme = 'dark';
  }
  
  // Применяем тему сразу при загрузке страницы
  applyTheme(savedTheme);
  
  // Устанавливаем состояние переключателей
  if (themeToggleInput) {
    themeToggleInput.checked = savedTheme === 'light';
  }
  if (mobileThemeToggleInput) {
    mobileThemeToggleInput.checked = savedTheme === 'light';
  }
  
  // Обновляем текст в мобильном переключателе
  updateMobileThemeText(savedTheme);
  
  // Обновляем видео в зависимости от темы
  updateVideoTheme(savedTheme);
  
  // Обработчик изменения темы для десктопного переключателя
  if (themeToggleInput) {
    themeToggleInput.addEventListener('change', () => {
      const newTheme = themeToggleInput.checked ? 'light' : 'dark';
      updateTheme(newTheme, savedTheme);
      
      // Синхронизируем мобильный переключатель
      if (mobileThemeToggleInput) {
        mobileThemeToggleInput.checked = themeToggleInput.checked;
      }
    });
  }
  
  // Обработчик изменения темы для мобильного переключателя
  if (mobileThemeToggleInput) {
    mobileThemeToggleInput.addEventListener('change', () => {
      const newTheme = mobileThemeToggleInput.checked ? 'light' : 'dark';
      updateTheme(newTheme, savedTheme);
      
      // Синхронизируем десктопный переключатель
      if (themeToggleInput) {
        themeToggleInput.checked = mobileThemeToggleInput.checked;
      }
    });
  }
  
  // Функция для применения темы
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateVideoTheme(theme);
    updateMetaTheme(theme);
    updateMobileThemeText(theme);
  }
  
  function updateTheme(newTheme, oldTheme) {
    // Применяем новую тему
    applyTheme(newTheme);
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', newTheme);
    
    // Уведомляем другие страницы об изменении темы
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'theme',
      newValue: newTheme,
      oldValue: oldTheme
    }));
    
    // Уведомляем текущую вкладку
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: newTheme }
    }));
  }
  
  // Слушаем изменения темы на других страницах
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue) {
      const newTheme = e.newValue;
      applyTheme(newTheme);
      
      // Синхронизируем переключатели
      if (themeToggleInput) {
        themeToggleInput.checked = newTheme === 'light';
      }
      if (mobileThemeToggleInput) {
        mobileThemeToggleInput.checked = newTheme === 'light';
      }
    }
  });
  
  // Слушаем изменения темы в текущей вкладке
  window.addEventListener('themeChanged', (e) => {
    const newTheme = e.detail.theme;
    applyTheme(newTheme);
    
    // Синхронизируем переключатели
    if (themeToggleInput) {
      themeToggleInput.checked = newTheme === 'light';
    }
    if (mobileThemeToggleInput) {
      mobileThemeToggleInput.checked = newTheme === 'light';
    }
  });
  
  // Дополнительная синхронизация при загрузке страницы
  window.addEventListener('load', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);
    
    // Синхронизируем переключатели
    if (themeToggleInput) {
      themeToggleInput.checked = currentTheme === 'light';
    }
    if (mobileThemeToggleInput) {
      mobileThemeToggleInput.checked = currentTheme === 'light';
    }
  });
  
  // Синхронизация при фокусе на окне (когда пользователь возвращается на вкладку)
  window.addEventListener('focus', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);
    
    if (themeToggleInput) {
      themeToggleInput.checked = currentTheme === 'light';
    }
    if (mobileThemeToggleInput) {
      mobileThemeToggleInput.checked = currentTheme === 'light';
    }
  });
}

// Функция для обновления текста в мобильном переключателе
function updateMobileThemeText(theme) {
  const themeText = document.querySelector('.theme-text');
  if (themeText) {
    themeText.textContent = theme === 'light' ? 'Светлая тема' : 'Темная тема';
  }
}


function updateVideoTheme(theme) {
  // Обновляем видео на главной странице
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const videoSrc = theme === 'light' ? 'assets/video/webm/hero-light-bg.webm' : 'assets/video/hero-bg.mp4';
    
    // Удаляем старые обработчики событий
    heroVideo.removeEventListener('loadeddata', handleHeroVideoLoad);
    
    // Добавляем новый обработчик
    heroVideo.addEventListener('loadeddata', handleHeroVideoLoad);
    
    // Устанавливаем новый источник
    heroVideo.src = videoSrc;
  }
  
  // Обновляем видео на странице манифеста
  const manifestVideo = document.querySelector('.manifest-video');
  if (manifestVideo) {
    const videoSrc = theme === 'light' ? 'assets/video/webm/manifest-corner-1.webm' : 'assets/video/manifest-bg.mp4';
    
    // Удаляем старые обработчики событий
    manifestVideo.removeEventListener('loadeddata', handleManifestVideoLoad);
    
    // Добавляем новый обработчик
    manifestVideo.addEventListener('loadeddata', handleManifestVideoLoad);
    
    // Устанавливаем новый источник
    manifestVideo.src = videoSrc;
  }
}

function handleHeroVideoLoad() {
  const heroVideo = this;
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    // Для светлой темы - проигрываем и останавливаем на последнем кадре
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Видео успешно запустилось
        heroVideo.addEventListener('ended', function() {
          // Показываем последний кадр из отдельного файла
          showLastFrame(heroVideo);
        }, { once: true });
      }).catch(() => {
        // Автовоспроизведение заблокировано, показываем последний кадр сразу
        showLastFrame(heroVideo);
      });
    } else {
      // Старые браузеры
      heroVideo.addEventListener('ended', function() {
        showLastFrame(heroVideo);
      }, { once: true });
    }
  } else {
    // Для темной темы - обычное воспроизведение
    heroVideo.currentTime = 0;
    heroVideo.play();
  }
}

function showLastFrame(video) {
  // Показываем последний кадр из отдельного файла
  video.style.backgroundImage = 'url(assets/images/manifest-bg-to-stop/2025-09-27T16-12-37_abstract_fluid_watermarked-vmake-_1__X-Design_050.webp)';
  video.style.backgroundSize = 'cover';
  video.style.backgroundPosition = 'center';
  video.style.backgroundRepeat = 'no-repeat';
  video.style.opacity = '1';
  video.pause();
}

function showWebPFrame(video) {
  // Показываем WebP последнего кадра (для совместимости)
  showLastFrame(video);
}

function handleManifestVideoLoad() {
  const manifestVideo = this;
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    // Для светлой темы - проигрываем и останавливаем на последнем кадре
    manifestVideo.play().then(() => {
      manifestVideo.addEventListener('ended', () => {
        manifestVideo.currentTime = manifestVideo.duration - 0.1;
        manifestVideo.pause();
      });
    });
  } else {
    // Для темной темы - обычное воспроизведение
    manifestVideo.currentTime = 0;
    manifestVideo.play();
  }
}

function updateMetaTheme(theme) {
  const themeColor = theme === 'dark' ? '#000000' : '#ffffff';
  const statusBarStyle = theme === 'dark' ? 'black' : 'default';
  
  // Обновляем meta теги
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.content = themeColor;
  
  let metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!metaStatusBar) {
    metaStatusBar = document.createElement('meta');
    metaStatusBar.name = 'apple-mobile-web-app-status-bar-style';
    document.head.appendChild(metaStatusBar);
  }
  metaStatusBar.content = statusBarStyle;
}

// Синхронизация темы при переходе между страницами
function syncThemeOnNavigation() {
  // Обрабатываем все ссылки навигации
  const navLinks = document.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Сохраняем текущую тему перед переходом
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme) {
        localStorage.setItem('theme', currentTheme);
        
        // Дополнительная проверка через небольшую задержку
        setTimeout(() => {
          localStorage.setItem('theme', currentTheme);
        }, 10);
      }
    });
  });
  
  // Дополнительно сохраняем тему при уходе со страницы
  window.addEventListener('beforeunload', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) {
      localStorage.setItem('theme', currentTheme);
    }
  });
}

// Инициализация переключателя тем
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  syncThemeOnNavigation();
});