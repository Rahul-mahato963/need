import type { CollectionConfig } from 'payload'

export const Providers: CollectionConfig = {
  slug: 'providers',
  admin: {
    defaultColumns: ['providerName', 'phone', 'status'],
    group: 'Partners',
    useAsTitle: 'providerName',
  },
  fields: [
    {
      name: 'providerName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'serviceArea',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      type: 'relationship',
      hasMany: true,
      relationTo: 'services',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Inactive', value: 'inactive' },
      ],
      required: true,
    },
  ],
}
