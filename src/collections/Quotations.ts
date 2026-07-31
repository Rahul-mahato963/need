import type { CollectionConfig } from 'payload'

const quotationStatuses = [
  { label: 'Submitted by technician', value: 'submitted' },
  { label: 'Reviewed by admin', value: 'reviewed' },
  { label: 'Sent to client', value: 'sent-to-client' },
  { label: 'Accepted by client', value: 'accepted' },
  { label: 'Rejected by client', value: 'rejected' },
]

export const Quotations: CollectionConfig = {
  slug: 'quotations',
  admin: {
    defaultColumns: ['booking', 'technicianName', 'totalAmount', 'status', 'createdAt'],
    description: 'Technician-only quotations submitted after site inspection.',
    group: 'Operations',
    useAsTitle: 'technicianName',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user?.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user?.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user?.collection === 'users'),
  },
  fields: [
    {
      name: 'booking',
      type: 'relationship',
      relationTo: 'bookings',
      required: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'provider',
      type: 'relationship',
      admin: {
        description: 'Admin can link this quotation to the approved provider record.',
      },
      relationTo: 'providers',
    },
    {
      name: 'technicianName',
      type: 'text',
      required: true,
    },
    {
      name: 'technicianPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'inspectionNotes',
      type: 'textarea',
      required: true,
    },
    {
      name: 'lineItems',
      type: 'array',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'amount',
          type: 'number',
          min: 0,
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: 'laborCharge',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'partsCharge',
      type: 'number',
      defaultValue: 0,
      min: 0,
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'submitted',
      options: quotationStatuses,
      required: true,
    },
    {
      name: 'sitePhotos',
      type: 'upload',
      admin: {
        description: 'Optional site or issue photos uploaded by admin.',
      },
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
}
