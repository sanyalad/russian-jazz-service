import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Получаем все принципы манифеста
    const principles = await payload.find({
      collection: 'manifest-principles',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    // Получаем все события
    const events = await payload.find({
      collection: 'events',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: '-date',
    })

    // Получаем всех артистов
    const artists = await payload.find({
      collection: 'artists',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'name',
    })

    // Получаем данные главной страницы
    const homePage = await payload.find({
      collection: 'home-page',
      depth: 1,
      limit: 1,
    })

    return NextResponse.json({
      principles: principles.docs,
      events: events.docs,
      artists: artists.docs,
      homePage: homePage.docs[0] || null,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error exporting content:', error)
    return NextResponse.json(
      { error: 'Failed to export content' },
      { status: 500 }
    )
  }
}


