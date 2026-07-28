import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroEyebrow',
              type: 'text',
              defaultValue: 'One need. We take care.',
              required: true,
            },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Every home service, ready from one place.',
              required: true,
            },
            {
              name: 'heroCopy',
              type: 'textarea',
              defaultValue:
                'Book verified professionals for plumbing, electrical, AC service, cleaning, carpentry, painting, CCTV, pest control, gardening, and maintenance.',
              required: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'primaryActionLabel',
              type: 'text',
              defaultValue: 'Book now',
              required: true,
            },
            {
              name: 'primaryActionHref',
              type: 'text',
              defaultValue: '/book',
              required: true,
            },
            {
              name: 'secondaryActionLabel',
              type: 'text',
              defaultValue: 'View services',
              required: true,
            },
            {
              name: 'secondaryActionHref',
              type: 'text',
              defaultValue: '/services',
              required: true,
            },
            {
              name: 'categoryHighlightsLimit',
              type: 'number',
              defaultValue: 6,
              max: 10,
              min: 1,
              required: true,
            },
          ],
        },
        {
          label: 'Popular Services',
          fields: [
            {
              name: 'popularEyebrow',
              type: 'text',
              defaultValue: 'Popular services',
              required: true,
            },
            {
              name: 'popularTitle',
              type: 'text',
              defaultValue: 'Choose what your home needs today',
              required: true,
            },
            {
              name: 'popularLimit',
              type: 'number',
              defaultValue: 10,
              max: 20,
              min: 1,
              required: true,
            },
          ],
        },
        {
          label: 'Workflow',
          fields: [
            {
              name: 'workflowEyebrow',
              type: 'text',
              defaultValue: 'Coordinated visits',
              required: true,
            },
            {
              name: 'workflowTitle',
              type: 'text',
              defaultValue: 'From request to completion, every job has a clear owner',
              required: true,
            },
            {
              name: 'workflowCopy',
              type: 'textarea',
              defaultValue:
                'NEED keeps service selection, provider assignment, status tracking, payment, and review history organized so customers and providers always know what is next.',
              required: true,
            },
            {
              name: 'processSteps',
              type: 'array',
              defaultValue: [
                { number: '1', title: 'Choose service', copy: 'Pick the category, job, date, and address.' },
                { number: '2', title: 'Get matched', copy: 'A verified provider is assigned for your slot.' },
                { number: '3', title: 'Track job', copy: 'Booking moves through confirmed, in progress, completed.' },
                { number: '4', title: 'Pay & review', copy: 'Complete payment securely and rate the visit.' },
              ],
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'copy',
                  type: 'textarea',
                  required: true,
                },
              ],
              minRows: 1,
            },
            {
              name: 'pipelineStatuses',
              type: 'array',
              defaultValue: [
                { color: 'gold', detail: 'Admin review', label: 'Pending' },
                { color: 'teal', detail: 'Provider assigned', label: 'Confirmed' },
                { color: 'coral', detail: 'Live job', label: 'In progress' },
                { color: 'green', detail: 'Review request', label: 'Completed' },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'detail',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'color',
                  type: 'select',
                  defaultValue: 'gold',
                  options: [
                    { label: 'Gold', value: 'gold' },
                    { label: 'Teal', value: 'teal' },
                    { label: 'Coral', value: 'coral' },
                    { label: 'Green', value: 'green' },
                  ],
                  required: true,
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'pricingEyebrow',
              type: 'text',
              defaultValue: 'Starting prices',
              required: true,
            },
            {
              name: 'pricingTitle',
              type: 'text',
              defaultValue: 'Clear estimates before a provider visits',
              required: true,
            },
            {
              name: 'pricingLimit',
              type: 'number',
              defaultValue: 4,
              max: 12,
              min: 1,
              required: true,
            },
          ],
        },
        {
          label: 'Customer Trust',
          fields: [
            {
              name: 'customerTrustEyebrow',
              type: 'text',
              defaultValue: 'Customer trust',
              required: true,
            },
            {
              name: 'customerTrustTitle',
              type: 'text',
              defaultValue: 'Made for quick, accountable home visits',
              required: true,
            },
            {
              name: 'customerTrustLimit',
              type: 'number',
              defaultValue: 6,
              max: 12,
              min: 1,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
