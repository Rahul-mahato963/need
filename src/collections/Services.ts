import type { CollectionConfig } from 'payload'

import { slugify } from '@/lib/slugify'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['name', 'category', 'basePrice', 'sortOrder', 'popular', 'available'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Optional short code. Leave blank to auto-pick by service name.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional service logo/image shown on website cards. Falls back to the icon if empty.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional wide photo shown on this service detail page hero.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'basePrice',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'durationMinutes',
      type: 'number',
      defaultValue: 60,
      min: 15,
      required: true,
    },
    {
      name: 'includes',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this service in popular service sections.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Lower numbers appear first on the website.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.name === 'string') {
          data.slug = slugify(data.name)
        }

        return data
      },
    ],
  },
}
