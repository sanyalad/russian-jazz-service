#!/usr/bin/env node

/**
 * Простой статический сервер для Russian Jazz Service
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 8080
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return mimeTypes[ext] || 'application/octet-stream'
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>404 - Страница не найдена</h1>
          <p><a href="/">← Вернуться на главную</a></p>
        </body>
        </html>
      `)
      return
    }

    const mimeType = getMimeType(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url)
  let pathname = parsedUrl.pathname

  // Если запрашивается корень, отдаем index.html
  if (pathname === '/') {
    pathname = '/index.html'
  }

  const filePath = path.join(PUBLIC_DIR, pathname)

  // Проверяем, что файл находится в публичной директории
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/html' })
    res.end('<h1>403 - Forbidden</h1>')
    return
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>404 - Страница не найдена</h1>
          <p><a href="/">← Вернуться на главную</a></p>
        </body>
        </html>
      `)
      return
    }

    serveFile(res, filePath)
  })
})

server.listen(PORT, () => {
  console.log('🌐 Статический сервер запущен!')
  console.log(`📁 Обслуживает папку: ${PUBLIC_DIR}`)
  console.log(`🔗 Локальный адрес: http://localhost:${PORT}`)
  console.log(`🌍 Сетевой адрес: http://192.168.0.102:${PORT}`)
  console.log('')
  console.log('📄 Доступные страницы:')
  console.log(`   • Главная: http://localhost:${PORT}/`)
  console.log(`   • Манифест: http://localhost:${PORT}/rjs-manifest.html`)
  console.log(`   • Контакты: http://localhost:${PORT}/contacts.html`)
  console.log(`   • Результат: http://localhost:${PORT}/result.html`)
  console.log(`   • Сгенерированный манифест: http://localhost:${PORT}/generated/manifest.html`)
  console.log('')
  console.log('Нажмите Ctrl+C для остановки сервера')
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Порт ${PORT} уже используется. Попробуйте другой порт.`)
  } else {
    console.log('❌ Ошибка сервера:', err.message)
  }
})
