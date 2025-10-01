import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Управление пользователями системы',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      admin: {
        description: 'Имя пользователя',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      admin: {
        description: 'Фамилия пользователя',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Редактор', value: 'editor' },
        { label: 'Автор', value: 'author' },
        { label: 'Читатель', value: 'reader' },
      ],
      defaultValue: 'editor',
      admin: {
        description: 'Роль пользователя в системе',
      },
    },
  ],
}
