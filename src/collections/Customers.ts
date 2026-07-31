import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    defaultColumns: ['email', 'createdAt'],
    group: 'Customers',
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true

      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user } }) => Boolean(user?.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user?.collection === 'users'),
  },
  fields: [],
}
