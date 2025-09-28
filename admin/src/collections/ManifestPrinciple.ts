import type { CollectionConfig } from 'payload'

export const ManifestPrinciple: CollectionConfig = {
  slug: 'manifest-principles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Порядок отображения принципа',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Заголовок принципа',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Описание принципа',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Отображать ли принцип на сайте',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Автоматически устанавливаем порядок если не указан
        if (!data.order) {
          data.order = Date.now()
        }
        return data
      },
    ],
  },
}


