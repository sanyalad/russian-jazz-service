import type { CollectionConfig } from 'payload'

export const ManifestPrinciple: CollectionConfig = {
  slug: 'manifest-principles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'createdAt'],
    description: 'Управление принципами манифеста',
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
      defaultValue: {
        root: {
          children: [
            {
              children: [
                {
                  text: 'Описание принципа будет добавлено здесь.'
                }
              ]
            }
          ]
        }
      },
      admin: {
        description: 'Описание принципа',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Изображение для карточки принципа',
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


