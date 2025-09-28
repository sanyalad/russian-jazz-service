import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  admin: {
    useAsTitle: 'title',
    singleton: true, // Это делает коллекцию синглтоном - только одна запись
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
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
