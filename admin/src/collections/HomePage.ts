import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  admin: {
    useAsTitle: 'title',
    description: 'Управление контентом главной страницы',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Russian Jazz Service',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'Союз Джазовых Музыкантов Санкт-Петербурга',
    },
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Video',
    },
    {
      name: 'aboutTitle',
      type: 'text',
      required: true,
      defaultValue: 'О Союзе',
    },
    {
      name: 'aboutText',
      type: 'richText',
      required: true,
      defaultValue: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Союз Джазовых Музыкантов Санкт-Петербурга — это объединение музыкантов, которое стремится развивать джазовую культуру в России. Мы создаем пространство для диалога, экспериментов и профессионального роста.'
                }
              ]
            }
          ]
        }
      },
      admin: {
        description: 'Описание о союзе джазовых музыкантов',
      },
    },
    {
      name: 'principlesTitle',
      type: 'text',
      required: true,
      defaultValue: 'Наши принципы',
    },
    {
      name: 'principlesText',
      type: 'richText',
      required: true,
      defaultValue: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Мы руководствуемся пятью основными принципами, которые определяют нашу деятельность и подход к развитию джазовой культуры в России.'
                }
              ]
            }
          ]
        }
      },
      admin: {
        description: 'Описание принципов работы союза',
      },
    },
    {
      name: 'promoVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Promo Video',
    },
    {
      name: 'quote',
      type: 'group',
      defaultValue: {
        text: '«Идея намного важнее стиля или представлений о стиле, в котором вы пытаетесь играть».',
        author: '— Орнетт Коулман, саксофонист'
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: '«Идея намного важнее стиля или представлений о стиле, в котором вы пытаетесь играть».',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          defaultValue: '— Орнетт Коулман, саксофонист',
        },
      ],
    },
  ],
}
