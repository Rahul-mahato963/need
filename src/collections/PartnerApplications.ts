import type { CollectionConfig } from 'payload'

export const PartnerApplications: CollectionConfig = {
  slug: 'partner-applications',
  admin: {
    defaultColumns: ['applicantName', 'phone', 'status', 'kycStatus'],
    group: 'Partners',
    useAsTitle: 'applicantName',
  },
  fields: [
    {
      name: 'applicantName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessName',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'serviceArea',
      type: 'text',
      required: true,
    },
    {
      name: 'experienceYears',
      type: 'number',
      min: 0,
    },
    {
      name: 'services',
      type: 'relationship',
      hasMany: true,
      relationTo: 'services',
      required: true,
    },
    {
      name: 'availability',
      type: 'array',
      fields: [
        {
          name: 'option',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      required: true,
    },
    {
      name: 'kycStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
      required: true,
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
}
