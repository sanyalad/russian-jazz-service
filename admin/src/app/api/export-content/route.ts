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
      depth: 1, // Включаем связанные медиафайлы
    })

    // События и артисты пока не используются
    const events = { docs: [], totalDocs: 0 }
    const artists = { docs: [], totalDocs: 0 }

    // Получаем данные главной страницы
    const homePage = await payload.find({
      collection: 'home-page',
      depth: 2, // Увеличиваем глубину для медиафайлов
      limit: 1,
    })

    return NextResponse.json({
      principles: principles.docs,
      events: events.docs,
      artists: artists.docs,
      homePage: homePage.docs[0] || null,
      lastUpdated: new Date().toISOString(),
      totalPrinciples: principles.totalDocs,
      totalEvents: events.totalDocs,
      totalArtists: artists.totalDocs,
    })
  } catch (error) {
    console.error('Error exporting content:', error)
    return NextResponse.json(
      { 
        error: 'Failed to export content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


