import type { CollectionConfig } from 'payload'

const bookingStatuses = [
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    defaultColumns: ['service', 'customer', 'scheduledDate', 'timeSlot', 'status', 'locationMapLink'],
    group: 'Operations',
    useAsTitle: 'serviceName',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user && ['customers', 'users'].includes(user.collection)),
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.collection === 'users') return true

      return {
        customer: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user } }) => Boolean(user?.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user?.collection === 'users'),
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'serviceName',
      type: 'text',
      required: true,
    },
    {
      name: 'estimatedPrice',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'scheduledDate',
      type: 'date',
      required: true,
    },
    {
      name: 'timeSlot',
      type: 'select',
      options: [
        { label: '09:00 - 11:00', value: '09:00' },
        { label: '10:00 - 12:00', value: '10:00' },
        { label: '14:00 - 16:00', value: '14:00' },
        { label: '17:00 - 19:00', value: '17:00' },
      ],
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'locationLatitude',
      type: 'number',
      admin: {
        description: 'Optional GPS latitude shared from the booking form.',
      },
      max: 90,
      min: -90,
    },
    {
      name: 'locationLongitude',
      type: 'number',
      admin: {
        description: 'Optional GPS longitude shared from the booking form.',
      },
      max: 180,
      min: -180,
    },
    {
      name: 'locationMapLink',
      type: 'text',
      admin: {
        description: 'Open this link to view the customer location on Google Maps.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: bookingStatuses,
      required: true,
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (!data || operation !== 'create' || !req.user) {
          return data
        }

        if (req.user.collection === 'customers') {
          data.customer = req.user.id
        }

        if (typeof data.service === 'number') {
          const service = await req.payload.findByID({
            collection: 'services',
            id: data.service,
            depth: 0,
            req,
          })

          data.serviceName = service.name
          data.estimatedPrice = service.basePrice
        }

        return data
      },
    ],
  },
}
