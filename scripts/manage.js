#!/usr/bin/env node

/**
 * Главный скрипт управления Russian Jazz Service
 * 
 * Команды:
 * - npm run dev:admin     - запуск CMS админки
 * - npm run build:static  - генерация статических страниц
 * - npm run serve:static  - запуск статического сервера
 * - npm run dev:full      - запуск всего проекта
 */

const { spawn } = require('child_process')
const path = require('path')

const commands = {
  'dev:admin': () => {
    console.log('🚀 Запуск CMS админки...')
    const adminProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '..', 'admin'),
      stdio: 'inherit',
      shell: true,
      env: { ...process.env }
    })
    
    adminProcess.on('close', (code) => {
      console.log(`CMS админка завершена с кодом ${code}`)
    })
  },

  'build:static': async () => {
    console.log('📝 Генерация статических страниц...')
    const buildProcess = spawn('node', ['build-static.js'], {
      cwd: path.join(__dirname),
      stdio: 'inherit',
      shell: true
    })
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Статические страницы сгенерированы!')
        console.log('📁 Файлы сохранены в: public/generated/')
      } else {
        console.log(`❌ Ошибка генерации: код ${code}`)
      }
    })
  },

  'serve:static': () => {
    console.log('🌐 Запуск статического сервера...')
    const serveProcess = spawn('npx', ['serve', 'public', '-p', '8080'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    })
    
    serveProcess.on('close', (code) => {
      console.log(`Статический сервер завершен с кодом ${code}`)
    })
  },

  'dev:full': () => {
    console.log('🚀 Запуск полного проекта...')
    console.log('📝 Генерация статических страниц...')
    
    // Сначала генерируем статику
    const buildProcess = spawn('node', ['build-static.js'], {
      cwd: path.join(__dirname),
      stdio: 'inherit',
      shell: true
    })
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Статические страницы готовы!')
        console.log('🚀 Запуск CMS админки...')
        
        // Затем запускаем админку
        const adminProcess = spawn('npm', ['run', 'dev'], {
          cwd: path.join(__dirname, '..', 'admin'),
          stdio: 'inherit',
          shell: true,
          env: { ...process.env }
        })
        
        adminProcess.on('close', (code) => {
          console.log(`Проект завершен с кодом ${code}`)
        })
      } else {
        console.log(`❌ Ошибка генерации статики: код ${code}`)
      }
    })
  }
}

// Получаем команду из аргументов
const command = process.argv[2]

if (commands[command]) {
  commands[command]()
} else {
  console.log('🎵 Russian Jazz Service - Управление проектом')
  console.log('')
  console.log('Доступные команды:')
  console.log('  npm run dev:admin     - Запуск CMS админки (localhost:3001)')
  console.log('  npm run build:static - Генерация статических страниц')
  console.log('  npm run serve:static - Запуск статического сервера (localhost:8080)')
  console.log('  npm run dev:full      - Полный запуск проекта')
  console.log('')
  console.log('Примеры:')
  console.log('  node scripts/manage.js dev:admin')
  console.log('  node scripts/manage.js build:static')
}
