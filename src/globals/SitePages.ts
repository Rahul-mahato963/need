import type { GlobalConfig } from 'payload'

const processStepDefaults = [
  { copy: 'Pick the category, job, date, and address.', number: '1', title: 'Choose service' },
  { copy: 'A verified provider is assigned for your slot.', number: '2', title: 'Get matched' },
  { copy: 'Booking moves through confirmed, in progress, completed.', number: '3', title: 'Track job' },
  { copy: 'Complete payment securely and rate the visit.', number: '4', title: 'Pay & review' },
]

const createProcessStepsField = (name: string, defaultValue = processStepDefaults) => ({
  name,
  type: 'array' as const,
  defaultValue,
  fields: [
    {
      name: 'number',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'copy',
      type: 'textarea' as const,
      required: true,
    },
  ],
  minRows: 1,
})

export const SitePages: GlobalConfig = {
  slug: 'site-pages',
  label: 'Site Pages',
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
          label: 'Services',
          fields: [
            {
              name: 'servicesEyebrow',
              type: 'text',
              defaultValue: 'Services',
              required: true,
            },
            {
              name: 'servicesTitle',
              type: 'text',
              defaultValue: 'Browse every service category managed from the NEED admin.',
              required: true,
            },
            {
              name: 'servicesCopy',
              type: 'textarea',
            },
            {
              name: 'servicesHeroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'aboutEyebrow',
              type: 'text',
              defaultValue: 'About NEED',
              required: true,
            },
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'A services platform designed for reliable home care and clean operations.',
              required: true,
            },
            {
              name: 'aboutCopy',
              type: 'textarea',
              defaultValue:
                'NEED connects households with verified providers across essential home services, from urgent repairs to planned maintenance visits.',
              required: true,
            },
            {
              name: 'aboutHeroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'aboutBody',
              type: 'array',
              defaultValue: [
                {
                  copy:
                    'NEED connects households with verified providers across essential home services, from urgent repairs to planned maintenance visits.',
                },
                {
                  copy:
                    'The operating model is intentionally practical: verify the provider, confirm the slot, keep the job accountable, and make the customer experience feel simple.',
                },
              ],
              fields: [
                {
                  name: 'copy',
                  type: 'textarea',
                  required: true,
                },
              ],
              minRows: 1,
            },
            createProcessStepsField('aboutProcessSteps'),
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEyebrow',
              type: 'text',
              defaultValue: 'Contact',
              required: true,
            },
            {
              name: 'contactTitle',
              type: 'text',
              defaultValue: 'Need a provider, partnership, or support callback?',
              required: true,
            },
            {
              name: 'contactCopy',
              type: 'textarea',
              defaultValue: 'Reach the NEED team for home service requests, provider onboarding, or admin help.',
              required: true,
            },
            {
              name: 'contactCards',
              type: 'array',
              defaultValue: [
                {
                  body: '+91 90000 00000\nsupport@needservices.in',
                  title: 'Customer care',
                },
                {
                  actionHref: '/partner',
                  actionLabel: 'Start request',
                  body: 'Apply with skills, service area, ID verification, and availability.',
                  title: 'Provider onboarding',
                },
                {
                  body: 'Launching across Hyderabad, Secunderabad, Gachibowli, Kondapur, and nearby zones.',
                  title: 'Service area',
                },
              ],
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'actionLabel',
                  type: 'text',
                },
                {
                  name: 'actionHref',
                  type: 'text',
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Booking',
          fields: [
            {
              name: 'bookingEyebrow',
              type: 'text',
              defaultValue: 'Booking flow',
              required: true,
            },
            {
              name: 'bookingTitle',
              type: 'text',
              defaultValue: 'Select a service, choose a slot, and send the request to NEED operations.',
              required: true,
            },
            {
              name: 'bookingCopy',
              type: 'textarea',
              defaultValue:
                'The team reviews each request, confirms the provider, and keeps the booking status moving until the visit is complete.',
              required: true,
            },
            {
              name: 'bookingPanelKicker',
              type: 'text',
              defaultValue: 'Instant estimate',
              required: true,
            },
            {
              name: 'bookingPanelTitle',
              type: 'text',
              defaultValue: 'Book a verified expert',
              required: true,
            },
            {
              name: 'bookingButtonLabel',
              type: 'text',
              defaultValue: 'Confirm request',
              required: true,
            },
            {
              name: 'bookingPanelNote',
              type: 'textarea',
              defaultValue: 'No payment is collected until your request is reviewed.',
              required: true,
            },
            {
              name: 'bookingNextTitle',
              type: 'text',
              defaultValue: 'What happens next',
              required: true,
            },
            createProcessStepsField('bookingProcessSteps'),
          ],
        },
        {
          label: 'Partner',
          fields: [
            {
              name: 'partnerEyebrow',
              type: 'text',
              defaultValue: 'Partner onboarding',
              required: true,
            },
            {
              name: 'partnerTitle',
              type: 'text',
              defaultValue: 'Join NEED as a trusted service partner.',
              required: true,
            },
            {
              name: 'partnerCopy',
              type: 'textarea',
              defaultValue:
                'Share your contact details, service area, and the work you can handle. Admin can review each application and manage it from Payload.',
              required: true,
            },
            {
              name: 'partnerHeroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'partnerPanelKicker',
              type: 'text',
              defaultValue: 'Partner request',
              required: true,
            },
            {
              name: 'partnerPanelTitle',
              type: 'text',
              defaultValue: 'Tell us what you provide',
              required: true,
            },
            {
              name: 'partnerMissingFieldsMessage',
              type: 'textarea',
              defaultValue: 'Please fill the required details and select at least one service.',
              required: true,
            },
            {
              name: 'partnerAvailabilityOptions',
              type: 'array',
              defaultValue: [
                { label: 'Weekdays' },
                { label: 'Weekends' },
                { label: 'Morning' },
                { label: 'Afternoon' },
                { label: 'Evening' },
                { label: 'Emergency calls' },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              minRows: 1,
            },
            {
              name: 'partnerNotesPlaceholder',
              type: 'text',
              defaultValue: 'Verification details, tools, team size, or special service experience',
              required: true,
            },
            {
              name: 'partnerSubmitLabel',
              type: 'text',
              defaultValue: 'Submit application',
              required: true,
            },
            {
              name: 'partnerPanelNote',
              type: 'textarea',
              defaultValue: 'Admin can update status, notes, and service fit after review.',
              required: true,
            },
            {
              name: 'partnerReviewEyebrow',
              type: 'text',
              defaultValue: 'Admin workflow',
              required: true,
            },
            {
              name: 'partnerReviewTitle',
              type: 'text',
              defaultValue: 'Review, approve, and manage providers by service.',
              required: true,
            },
            {
              name: 'partnerReviewCopy',
              type: 'textarea',
              defaultValue:
                'Applications are stored with selected services, contact information, area, availability, and review status. Approved applicants can be added to Providers with matching skills.',
              required: true,
            },
            {
              name: 'partnerReviewStatuses',
              type: 'array',
              defaultValue: [{ label: 'New' }, { label: 'Contacted' }, { label: 'Approved' }, { label: 'Rejected' }],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              minRows: 1,
            },
          ],
        },
        {
          label: 'Partner KYC',
          fields: [
            {
              name: 'kycEyebrow',
              type: 'text',
              defaultValue: 'Partner KYC',
              required: true,
            },
            {
              name: 'kycTitle',
              type: 'text',
              defaultValue: 'Submit KYC for partner approval.',
              required: true,
            },
            {
              name: 'kycCopy',
              type: 'textarea',
              defaultValue: 'Upload your ID photo, bank details, and one clear partner photo for admin review.',
              required: true,
            },
            {
              name: 'kycSubmittedEyebrow',
              type: 'text',
              defaultValue: 'Submitted',
              required: true,
            },
            {
              name: 'kycSubmittedTitle',
              type: 'text',
              defaultValue: 'KYC details received.',
              required: true,
            },
            {
              name: 'kycSubmittedCopy',
              type: 'textarea',
              defaultValue:
                'NEED operations can now review the government ID, bank details, and photo from the admin panel.',
              required: true,
            },
            {
              name: 'kycApplicationEyebrow',
              type: 'text',
              defaultValue: 'Application submitted',
              required: true,
            },
            {
              name: 'kycApplicationTitle',
              type: 'text',
              defaultValue: 'Complete KYC now.',
              required: true,
            },
            {
              name: 'kycApplicationCopy',
              type: 'textarea',
              defaultValue:
                'Your partner application is saved. Finish KYC now to speed up approval, or return later with your documents.',
              required: true,
            },
            {
              name: 'kycContinueLabel',
              type: 'text',
              defaultValue: 'Continue KYC',
              required: true,
            },
            {
              name: 'kycLaterLabel',
              type: 'text',
              defaultValue: 'Do it later',
              required: true,
            },
            {
              name: 'kycFormKicker',
              type: 'text',
              defaultValue: 'KYC request',
              required: true,
            },
            {
              name: 'kycMissingFieldsMessage',
              type: 'textarea',
              defaultValue: 'Please fill all KYC fields and upload both images.',
              required: true,
            },
            {
              name: 'kycSubmitLabel',
              type: 'text',
              defaultValue: 'Submit KYC',
              required: true,
            },
            {
              name: 'kycFormNote',
              type: 'textarea',
              defaultValue: 'Your uploaded files are stored for admin verification.',
              required: true,
            },
            {
              name: 'kycApplicationNeededEyebrow',
              type: 'text',
              defaultValue: 'Application needed',
              required: true,
            },
            {
              name: 'kycApplicationNeededTitle',
              type: 'text',
              defaultValue: 'Start with the partner application first.',
              required: true,
            },
            {
              name: 'kycApplicationNeededCopy',
              type: 'textarea',
              defaultValue:
                'KYC must be linked to a partner application so admin can review the service profile and verification details together.',
              required: true,
            },
            {
              name: 'kycApplicationErrorMessage',
              type: 'textarea',
              defaultValue: 'We could not find that partner application.',
              required: true,
            },
            {
              name: 'kycPartnerFormLabel',
              type: 'text',
              defaultValue: 'Go to partner form',
              required: true,
            },
            {
              name: 'kycAdminEyebrow',
              type: 'text',
              defaultValue: 'Admin record',
              required: true,
            },
            {
              name: 'kycAdminTitle',
              type: 'text',
              defaultValue: 'KYC stays connected to the original application.',
              required: true,
            },
            {
              name: 'kycAdminCopy',
              type: 'textarea',
              defaultValue:
                'Admin can open the KYC submission, inspect the uploaded ID and photo, check bank details, and update verification status.',
              required: true,
            },
            {
              name: 'kycAdminStatuses',
              type: 'array',
              defaultValue: [
                { label: 'Submitted' },
                { label: 'Under Review' },
                { label: 'Verified' },
                { label: 'Rejected' },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              minRows: 1,
            },
          ],
        },
      ],
    },
  ],
}
