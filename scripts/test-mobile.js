#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📱 Тестирование мобильной адаптации...\n');

// Проверяем наличие необходимых файлов
const filesToCheck = [
  'public/index.html',
  'public/assets/css/main.css',
  'public/assets/js/main.js'
];

console.log('🔍 Проверка файлов:');
filesToCheck.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Проверяем CSS на наличие мобильных медиа-запросов
console.log('\n📱 Проверка CSS медиа-запросов:');
const cssContent = fs.readFileSync('public/assets/css/main.css', 'utf8');

const mediaQueries = [
  '@media (max-width: 1024px)',
  '@media (max-width: 768px)', 
  '@media (max-width: 480px)'
];

mediaQueries.forEach(query => {
  const exists = cssContent.includes(query);
  console.log(`   ${exists ? '✅' : '❌'} ${query}`);
});

// Проверяем HTML на наличие мобильных meta тегов
console.log('\n📱 Проверка HTML meta тегов:');
const htmlContent = fs.readFileSync('public/index.html', 'utf8');

const metaTags = [
  'apple-mobile-web-app-capable',
  'apple-mobile-web-app-status-bar-style',
  'mobile-web-app-capable',
  'theme-color',
  'user-scalable=no'
];

metaTags.forEach(tag => {
  const exists = htmlContent.includes(tag);
  console.log(`   ${exists ? '✅' : '❌'} ${tag}`);
});

// Проверяем JavaScript на оптимизации
console.log('\n📱 Проверка JavaScript оптимизаций:');
const jsContent = fs.readFileSync('public/assets/js/main.js', 'utf8');

const jsOptimizations = [
  'requestAnimationFrame',
  'passive: true',
  'ontouchstart',
  'touch-device'
];

jsOptimizations.forEach(opt => {
  const exists = jsContent.includes(opt);
  console.log(`   ${exists ? '✅' : '❌'} ${opt}`);
});

console.log('\n🎯 Рекомендации для тестирования:');
console.log('   1. Откройте http://localhost:8080 в браузере');
console.log('   2. Используйте инструменты разработчика (F12)');
console.log('   3. Переключитесь в режим мобильного устройства');
console.log('   4. Протестируйте на разных размерах экрана:');
console.log('      • iPhone SE (375x667)');
console.log('      • iPhone 12 Pro (390x844)');
console.log('      • iPad (768x1024)');
console.log('      • Samsung Galaxy S20 (360x800)');
console.log('   5. Проверьте touch-взаимодействия');
console.log('   6. Убедитесь в плавности анимаций');

console.log('\n✅ Тест завершен!');
