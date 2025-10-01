import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Управление медиафайлами (изображения, видео)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Альтернативный текст для изображения',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Подпись к изображению',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Общее', value: 'general' },
        { label: 'Манифест', value: 'manifest' },
        { label: 'Главная страница', value: 'homepage' },
        { label: 'Видео', value: 'video' },
      ],
      defaultValue: 'general',
      admin: {
        description: 'Категория медиафайла',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'feature',
        width: 1200,
        height: 800,
        position: 'centre',
      },
    ],
  },
}
