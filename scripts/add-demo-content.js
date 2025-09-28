#!/usr/bin/env node

/**
 * Скрипт для добавления демо-контента в CMS
 * Запуск: node scripts/add-demo-content.js
 */

const API_URL = process.env.API_URL || 'http://localhost:3002'

// Демо-контент: принципы манифеста
const manifestPrinciples = [
  {
    order: 1,
    title: "Принцип Диалога",
    description: "Мы отказываемся от догм и абсолютных истин в музыке. Каждое мнение, стиль, направление заслуживает быть услышанным и рассмотренным. Мы не настаиваем на своей исключительной правоте, создавая пространство для уважительного обмена идеями и творческого спора.",
    isActive: true
  },
  {
    order: 2,
    title: "Демократия Творчества",
    description: "Союз — открытая платформа для всех, кто разделяет наши принципы, вне зависимости от возраста, опыта, школы или жанровых предпочтений. Приветствуется разнообразие: от традиционного джаза до авангарда, фри-джаза, contemporary, джаз-рока, фьюжн, и их взаимодействия с электроникой, хип-хопом, R&B, роком, попом, академической музыкой.",
    isActive: true
  },
  {
    order: 3,
    title: "Авторитет Профессионализма",
    description: "Демократия не означает вседозволенность. Мы признаем авторитет мастерства, глубины знаний, дисциплины и профессиональной этики. Структура управления Союза сочетает коллегиальность в обсуждениях с эффективной исполнительной властью, ответственной за реализацию решений и проектов.",
    isActive: true
  },
  {
    order: 4,
    title: "Свобода Эксперимента",
    description: "Мы считаем необходимым активно расширять пространство для свободного, экспериментального и глубокого искусства (фри-джаз, авангард, импровизационная музыка). Поддержка поиска и риска — основа развития джаза.",
    isActive: true
  },
  {
    order: 5,
    title: "Ориентация на Будущее",
    description: "Привлечение и воспитание новой аудитории — наш приоритет. Мы открыты к современным форматам, технологиям и кросс-культурным проектам, делая джаз актуальным и доступным для молодежи.",
    isActive: true
  }
]

async function addManifestPrinciple(principle) {
  try {
    const response = await fetch(`${API_URL}/api/manifest-principles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(principle)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }
    
    const result = await response.json()
    console.log(`✅ Добавлен принцип: ${principle.title}`)
    return result
  } catch (error) {
    console.error(`❌ Ошибка добавления принципа "${principle.title}":`, error.message)
    return null
  }
}

async function main() {
  console.log('🎵 Добавление демо-контента в Russian Jazz Service...')
  console.log(`📡 Подключение к CMS: ${API_URL}`)
  
  let successCount = 0
  
  for (const principle of manifestPrinciples) {
    const result = await addManifestPrinciple(principle)
    if (result) {
      successCount++
    }
    // Небольшая пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log('')
  console.log('📊 Результат:')
  console.log(`✅ Успешно добавлено: ${successCount} из ${manifestPrinciples.length}`)
  
  if (successCount > 0) {
    console.log('')
    console.log('🚀 Теперь можно:')
    console.log('1. Открыть админку: http://localhost:3002/admin')
    console.log('2. Проверить добавленные принципы')
    console.log('3. Запустить генерацию статики: npm run build:static')
  }
}

main().catch(console.error)
