import type { CollectionConfig } from 'payload'

export const PartnerKYCSubmissions: CollectionConfig = {
  slug: 'partner-kyc-submissions',
  admin: {
    defaultColumns: ['partnerApplication', 'bankName', 'status'],
    group: 'Partners',
    useAsTitle: 'bankAccountName',
  },
  fields: [
    {
      name: 'partnerApplication',
      type: 'relationship',
      relationTo: 'partner-applications',
      required: true,
    },
    {
      name: 'govtIdNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'govtIdFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bankAccountName',
      type: 'text',
      required: true,
    },
    {
      name: 'bankName',
      type: 'text',
      required: true,
    },
    {
      name: 'accountNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'ifscCode',
      type: 'text',
      required: true,
    },
    {
      name: 'partnerPhoto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Verified', value: 'verified' },
        { label: 'Rejected', value: 'rejected' },
      ],
      required: true,
    },
  ],
}
