import config from '@payload-config'
import { getPayload } from 'payload'

export type NeedCategory = {
  id: number
  name: string
  slug: string
  icon: string
  description: string
  featured: boolean
  sortOrder: number
}

export type NeedService = {
  id: number
  name: string
  slug: string
  category: string
  categoryId: number
  categoryName: string
  icon: string
  heroImage?: string
  logo?: string
  description: string
  basePrice: number
  durationMinutes: number
  includes: string[]
  popular: boolean
  sortOrder: number
}

export type NeedTestimonial = {
  id: number
  name: string
  city: string
  rating: number
  quote: string
  photo?: string
  service?: string
}

export type NeedProcessStep = {
  number: string
  title: string
  copy: string
}

export type NeedPipelineStatus = {
  label: string
  detail: string
  color: 'coral' | 'gold' | 'green' | 'teal'
}

export type NeedLink = {
  href: string
  label: string
}

export type NeedTextBlock = {
  copy: string
}

export type NeedContactCard = {
  actionHref?: string
  actionLabel?: string
  body: string
  title: string
}

export type NeedBookingPanelContent = {
  buttonLabel: string
  note: string
  panelKicker: string
  panelTitle: string
}

export type NeedHomePageContent = {
  categoryHighlightsLimit: number
  customerTrust: {
    eyebrow: string
    limit: number
    title: string
  }
  hero: {
    copy: string
    eyebrow: string
    image?: string
    primaryActionHref: string
    primaryActionLabel: string
    secondaryActionHref: string
    secondaryActionLabel: string
    title: string
  }
  pipelineStatuses: NeedPipelineStatus[]
  popular: {
    eyebrow: string
    limit: number
    title: string
  }
  pricing: {
    eyebrow: string
    limit: number
    title: string
  }
  processSteps: NeedProcessStep[]
  workflow: {
    copy: string
    eyebrow: string
    title: string
  }
}

export type NeedSiteSettings = {
  brandInitial: string
  brandName: string
  footerCopy: string
  footerLinks: NeedLink[]
  navLinks: NeedLink[]
  primaryActionHref: string
  primaryActionLabel: string
  secondaryActionHref: string
  secondaryActionLabel: string
}

export type NeedSitePagesContent = {
  about: {
    body: NeedTextBlock[]
    copy: string
    eyebrow: string
    heroImage?: string
    processSteps: NeedProcessStep[]
    title: string
  }
  booking: NeedBookingPanelContent & {
    copy: string
    eyebrow: string
    nextTitle: string
    processSteps: NeedProcessStep[]
    title: string
  }
  contact: {
    cards: NeedContactCard[]
    copy: string
    eyebrow: string
    title: string
  }
  kyc: {
    adminCopy: string
    adminEyebrow: string
    adminStatuses: string[]
    adminTitle: string
    applicationCopy: string
    applicationErrorMessage: string
    applicationEyebrow: string
    applicationNeededCopy: string
    applicationNeededEyebrow: string
    applicationNeededTitle: string
    applicationTitle: string
    continueLabel: string
    copy: string
    eyebrow: string
    formKicker: string
    formNote: string
    laterLabel: string
    missingFieldsMessage: string
    partnerFormLabel: string
    submitLabel: string
    submittedCopy: string
    submittedEyebrow: string
    submittedTitle: string
    title: string
  }
  partner: {
    availabilityOptions: string[]
    copy: string
    eyebrow: string
    heroImage?: string
    missingFieldsMessage: string
    notesPlaceholder: string
    panelKicker: string
    panelNote: string
    panelTitle: string
    reviewCopy: string
    reviewEyebrow: string
    reviewStatuses: string[]
    reviewTitle: string
    submitLabel: string
    title: string
  }
  services: {
    copy?: string
    eyebrow: string
    heroImage?: string
    title: string
  }
}

type FeaturedFilter = {
  featuredOnly?: boolean
}

type AvailableFilter = {
  availableOnly?: boolean
}

type MediaLike = {
  sizes?: {
    thumbnail?: {
      url?: string | null
    } | null
  } | null
  url?: string | null
}

type CategoryDoc = {
  id: number
  name: string
  slug: string
  icon?: string | null
  description: string
  featured?: boolean | null
  sortOrder?: number | null
}

type ServiceDoc = {
  id: number
  name: string
  slug: string
  category?: number | CategoryDoc | null
  heroImage?: number | MediaLike | null
  icon?: string | null
  logo?: number | MediaLike | null
  description: string
  basePrice: number
  durationMinutes: number
  includes?: { item?: string | null }[] | null
  popular?: boolean | null
  sortOrder?: number | null
}

type TestimonialDoc = {
  id: number
  name: string
  city: string
  rating: number
  quote: string
  photo?: number | MediaLike | null
  service?: string | null
}

type HomePageDoc = {
  categoryHighlightsLimit?: number | null
  customerTrustEyebrow?: string | null
  customerTrustLimit?: number | null
  customerTrustTitle?: string | null
  heroCopy?: string | null
  heroEyebrow?: string | null
  heroImage?: number | MediaLike | null
  heroTitle?: string | null
  pipelineStatuses?: {
    color?: NeedPipelineStatus['color'] | null
    detail?: string | null
    label?: string | null
  }[] | null
  popularEyebrow?: string | null
  popularLimit?: number | null
  popularTitle?: string | null
  pricingEyebrow?: string | null
  pricingLimit?: number | null
  pricingTitle?: string | null
  primaryActionHref?: string | null
  primaryActionLabel?: string | null
  processSteps?: {
    copy?: string | null
    number?: string | null
    title?: string | null
  }[] | null
  secondaryActionHref?: string | null
  secondaryActionLabel?: string | null
  workflowCopy?: string | null
  workflowEyebrow?: string | null
  workflowTitle?: string | null
}

type SiteSettingsDoc = {
  brandInitial?: string | null
  brandName?: string | null
  footerCopy?: string | null
  footerLinks?: Partial<NeedLink>[] | null
  navLinks?: Partial<NeedLink>[] | null
  primaryActionHref?: string | null
  primaryActionLabel?: string | null
  secondaryActionHref?: string | null
  secondaryActionLabel?: string | null
}

type SitePagesDoc = {
  aboutBody?: { copy?: string | null }[] | null
  aboutCopy?: string | null
  aboutEyebrow?: string | null
  aboutHeroImage?: number | MediaLike | null
  aboutProcessSteps?: HomePageDoc['processSteps']
  aboutTitle?: string | null
  bookingButtonLabel?: string | null
  bookingCopy?: string | null
  bookingEyebrow?: string | null
  bookingNextTitle?: string | null
  bookingPanelKicker?: string | null
  bookingPanelNote?: string | null
  bookingPanelTitle?: string | null
  bookingProcessSteps?: HomePageDoc['processSteps']
  bookingTitle?: string | null
  contactCards?: {
    actionHref?: string | null
    actionLabel?: string | null
    body?: string | null
    title?: string | null
  }[] | null
  contactCopy?: string | null
  contactEyebrow?: string | null
  contactTitle?: string | null
  kycAdminCopy?: string | null
  kycAdminEyebrow?: string | null
  kycAdminStatuses?: { label?: string | null }[] | null
  kycAdminTitle?: string | null
  kycApplicationCopy?: string | null
  kycApplicationErrorMessage?: string | null
  kycApplicationEyebrow?: string | null
  kycApplicationNeededCopy?: string | null
  kycApplicationNeededEyebrow?: string | null
  kycApplicationNeededTitle?: string | null
  kycApplicationTitle?: string | null
  kycContinueLabel?: string | null
  kycCopy?: string | null
  kycEyebrow?: string | null
  kycFormKicker?: string | null
  kycFormNote?: string | null
  kycLaterLabel?: string | null
  kycMissingFieldsMessage?: string | null
  kycPartnerFormLabel?: string | null
  kycSubmitLabel?: string | null
  kycSubmittedCopy?: string | null
  kycSubmittedEyebrow?: string | null
  kycSubmittedTitle?: string | null
  kycTitle?: string | null
  partnerAvailabilityOptions?: { label?: string | null }[] | null
  partnerCopy?: string | null
  partnerEyebrow?: string | null
  partnerHeroImage?: number | MediaLike | null
  partnerMissingFieldsMessage?: string | null
  partnerNotesPlaceholder?: string | null
  partnerPanelKicker?: string | null
  partnerPanelNote?: string | null
  partnerPanelTitle?: string | null
  partnerReviewCopy?: string | null
  partnerReviewEyebrow?: string | null
  partnerReviewStatuses?: { label?: string | null }[] | null
  partnerReviewTitle?: string | null
  partnerSubmitLabel?: string | null
  partnerTitle?: string | null
  servicesCopy?: string | null
  servicesEyebrow?: string | null
  servicesHeroImage?: number | MediaLike | null
  servicesTitle?: string | null
}

const serviceHeroImages: Record<string, string> = {
  'ac-service': '/service-heroes/ac-service.jpg',
  carpentry: '/service-heroes/carpentry.jpg',
  'cctv-security': '/service-heroes/cctv-security.jpg',
  cleaning: '/service-heroes/cleaning.jpg',
  electrical: '/service-heroes/electrical.jpg',
  gardening: '/service-heroes/gardening.jpg',
  maintenance: '/service-heroes/maintenance.jpg',
  painting: '/service-heroes/painting.jpg',
  'pest-control': '/service-heroes/pest-control.jpg',
  plumbing: '/service-heroes/plumbing.jpg',
}

const serviceHeroImageOverrides: Record<string, string> = {
  'watchman-security-services': '/service-heroes/watchman-security.png',
}

const toServiceHeroImage = (categorySlug: string, serviceSlug?: string) =>
  (serviceSlug ? serviceHeroImageOverrides[serviceSlug] : undefined) ??
  serviceHeroImages[categorySlug] ??
  '/service-heroes/all-services.png'

export const fallbackCategories: NeedCategory[] = [
  {
    description: 'AC cleaning, gas checks, installation, servicing, and seasonal maintenance.',
    featured: true,
    icon: 'AC',
    id: 1,
    name: 'AC Service',
    slug: 'ac-service',
    sortOrder: 10,
  },
  {
    description: 'Camera setup, wiring, DVR/NVR configuration, and security checks.',
    featured: true,
    icon: 'CCTV',
    id: 2,
    name: 'CCTV & Security',
    slug: 'cctv-security',
    sortOrder: 20,
  },
  {
    description: 'Furniture fixes, fittings, shelves, door alignment, and custom repairs.',
    featured: true,
    icon: 'CP',
    id: 3,
    name: 'Carpentry',
    slug: 'carpentry',
    sortOrder: 30,
  },
  {
    description: 'Home cleaning, deep cleaning, kitchen, bathroom, and move-in service.',
    featured: true,
    icon: 'CL',
    id: 4,
    name: 'Cleaning',
    slug: 'cleaning',
    sortOrder: 40,
  },
  {
    description: 'Wiring, switches, lights, fans, appliance points, and safety checks.',
    featured: true,
    icon: 'EL',
    id: 5,
    name: 'Electrical',
    slug: 'electrical',
    sortOrder: 50,
  },
  {
    description: 'Inspections, small repairs, planned upkeep, and office support.',
    featured: true,
    icon: 'MT',
    id: 6,
    name: 'Maintenance',
    slug: 'maintenance',
    sortOrder: 60,
  },
  {
    description: 'Texture finishes, room repainting, wall prep, masking, and clean finishing.',
    featured: true,
    icon: 'PT',
    id: 7,
    name: 'Painting',
    slug: 'painting',
    sortOrder: 70,
  },
  {
    description: 'Leak repair, tap fitting, bathroom fixtures, drainage, and pipe work.',
    featured: true,
    icon: 'PL',
    id: 8,
    name: 'Plumbing in tirupati',
    slug: 'plumbing',
    sortOrder: 80,
  },
  {
    description: 'Termite, cockroach, ant, mosquito, and general pest treatments.',
    featured: true,
    icon: 'PC',
    id: 9,
    name: 'Pest Control',
    slug: 'pest-control',
    sortOrder: 90,
  },
  {
    description: 'Balcony plants, lawn care, trimming, cleaning, and watering support.',
    featured: true,
    icon: 'GD',
    id: 10,
    name: 'Gardening',
    slug: 'gardening',
    sortOrder: 100,
  },
]

export const fallbackServices: NeedService[] = [
  {
    basePrice: 599,
    category: 'ac-service',
    categoryId: 1,
    categoryName: 'AC Service',
    description: 'Indoor and outdoor AC cleaning with cooling check and drainage inspection.',
    durationMinutes: 90,
    heroImage: '/service-heroes/ac-service.jpg',
    icon: 'AC',
    id: 101,
    includes: ['Indoor unit cleaning', 'Outdoor coil dusting', 'Cooling performance check'],
    name: 'Split AC Deep Service',
    popular: true,
    slug: 'split-ac-deep-service',
    sortOrder: 10,
  },
  {
    basePrice: 999,
    category: 'cctv-security',
    categoryId: 2,
    categoryName: 'CCTV & Security',
    description: 'Install and configure one CCTV camera with mobile viewing support.',
    durationMinutes: 120,
    heroImage: '/service-heroes/cctv-security.jpg',
    icon: 'CCTV',
    id: 102,
    includes: ['Camera mounting', 'Cable routing check', 'Mobile app setup'],
    name: 'CCTV Camera Setup',
    popular: true,
    slug: 'cctv-camera-setup',
    sortOrder: 20,
  },
  {
    basePrice: 1499,
    category: 'cctv-security',
    categoryId: 2,
    categoryName: 'CCTV & Security',
    description: 'Verified watchman and security guard support for apartments, shops, events, and gated homes.',
    durationMinutes: 480,
    heroImage: '/service-heroes/watchman-security.png',
    icon: 'SEC',
    id: 111,
    includes: ['Identity-verified guard', 'Entry and visitor log', 'Shift handover note'],
    name: 'Watchman & Security Services',
    popular: true,
    slug: 'watchman-security-services',
    sortOrder: 25,
  },
  {
    basePrice: 799,
    category: 'carpentry',
    categoryId: 3,
    categoryName: 'Carpentry',
    description: 'Repair hinges, shelves, fittings, handles, and minor woodwork issues.',
    durationMinutes: 90,
    heroImage: '/service-heroes/carpentry.jpg',
    icon: 'CP',
    id: 103,
    includes: ['Inspection', 'Minor fitting repair', 'Clean finish'],
    name: 'Furniture Repair',
    popular: true,
    slug: 'furniture-repair',
    sortOrder: 30,
  },
  {
    basePrice: 1299,
    category: 'cleaning',
    categoryId: 4,
    categoryName: 'Cleaning',
    description: 'Kitchen and bathroom deep cleaning with stain removal and surface sanitation.',
    durationMinutes: 180,
    heroImage: '/service-heroes/cleaning.jpg',
    icon: 'CL',
    id: 104,
    includes: ['Surface cleaning', 'Sink and fixture cleaning', 'Floor scrub'],
    name: 'Bathroom Deep Clean',
    popular: true,
    slug: 'bathroom-deep-clean',
    sortOrder: 40,
  },
  {
    basePrice: 499,
    category: 'electrical',
    categoryId: 5,
    categoryName: 'Electrical',
    description: 'Fan, light, switch, and socket inspection with small repair support.',
    durationMinutes: 60,
    heroImage: '/service-heroes/electrical.jpg',
    icon: 'EL',
    id: 105,
    includes: ['Point inspection', 'Minor wiring check', 'Safety check'],
    name: 'Fan and Light Repair',
    popular: true,
    slug: 'fan-light-repair',
    sortOrder: 50,
  },
  {
    basePrice: 1299,
    category: 'maintenance',
    categoryId: 6,
    categoryName: 'Maintenance',
    description: 'Scheduled inspection and small repairs across plumbing, electrical, and fittings.',
    durationMinutes: 120,
    heroImage: '/service-heroes/maintenance.jpg',
    icon: 'MT',
    id: 106,
    includes: ['Inspection', 'Small repair list', 'Admin follow-up'],
    name: 'Office Maintenance',
    popular: true,
    slug: 'office-maintenance',
    sortOrder: 60,
  },
  {
    basePrice: 1499,
    category: 'painting',
    categoryId: 7,
    categoryName: 'Painting',
    description: 'Single-room repainting with wall prep, masking, and clean finishing.',
    durationMinutes: 240,
    heroImage: '/service-heroes/painting.jpg',
    icon: 'PT',
    id: 107,
    includes: ['Wall prep', 'Masking', 'One room repaint'],
    name: 'Room Repaint',
    popular: true,
    slug: 'room-repaint',
    sortOrder: 70,
  },
  {
    basePrice: 399,
    category: 'plumbing',
    categoryId: 8,
    categoryName: 'Plumbing in tirupati',
    description: 'Tap, leak, drainage, and bathroom fitting checks with minor repair support.',
    durationMinutes: 60,
    heroImage: '/service-heroes/plumbing.jpg',
    icon: 'PL',
    id: 108,
    includes: ['Leak check', 'Minor fitting', 'Drainage check'],
    name: 'Emergency Leak Repair',
    popular: true,
    slug: 'emergency-leak-repair',
    sortOrder: 80,
  },
  {
    basePrice: 899,
    category: 'pest-control',
    categoryId: 9,
    categoryName: 'Pest Control',
    description: 'Cockroach, ant, and general pest treatment for kitchens and common home areas.',
    durationMinutes: 90,
    heroImage: '/service-heroes/pest-control.jpg',
    icon: 'PC',
    id: 109,
    includes: ['Site inspection', 'Targeted spray treatment', 'Safety guidance'],
    name: 'General Pest Treatment',
    popular: true,
    slug: 'general-pest-treatment',
    sortOrder: 90,
  },
  {
    basePrice: 699,
    category: 'gardening',
    categoryId: 10,
    categoryName: 'Gardening',
    description: 'Balcony garden cleaning, plant trimming, watering check, and basic soil care.',
    durationMinutes: 75,
    heroImage: '/service-heroes/gardening.jpg',
    icon: 'GD',
    id: 110,
    includes: ['Plant trimming', 'Pot and area cleanup', 'Watering setup check'],
    name: 'Balcony Garden Care',
    popular: true,
    slug: 'balcony-garden-care',
    sortOrder: 100,
  },
]

export const fallbackTestimonials: NeedTestimonial[] = [
  {
    city: 'Gachibowli, Tirupati',
    id: 1,
    name: 'Sara Khan',
    photo: '/customer-photos/sara-khan.svg',
    quote: 'NEED handled cleaning and plumbing on the same day. Simple, professional, and no chasing.',
    rating: 5,
    service: 'Bathroom deep clean',
  },
  {
    city: 'Secunderabad',
    id: 2,
    name: 'Rahul Mehta',
    photo: '/customer-photos/rahul-mehta.svg',
    quote: 'The pricing was clear, the electrician arrived on time, and the booking status was easy to track.',
    rating: 5,
    service: 'Fan and light installation',
  },
  {
    city: 'Hyderabad',
    id: 3,
    name: 'Ananya Rao',
    photo: '/customer-photos/ananya-rao.svg',
    quote: 'Booked an AC service in the morning and had a verified technician at home before lunch.',
    rating: 5,
    service: 'AC service',
  },
]

export const fallbackHomePageContent: NeedHomePageContent = {
  categoryHighlightsLimit: 6,
  customerTrust: {
    eyebrow: 'Customer trust',
    limit: 6,
    title: 'Made for quick, accountable home visits',
  },
  hero: {
    copy:
      'Book verified professionals for plumbing, electrical, AC service, cleaning, carpentry, painting, CCTV, pest control, gardening, and maintenance.',
    eyebrow: 'One need. We take care.',
    primaryActionHref: '/book',
    primaryActionLabel: 'Book now',
    secondaryActionHref: '/services',
    secondaryActionLabel: 'View services',
    title: 'Every home service, ready from one place.',
  },
  pipelineStatuses: [
    { color: 'gold', detail: 'Admin review', label: 'Pending' },
    { color: 'teal', detail: 'Provider assigned', label: 'Confirmed' },
    { color: 'coral', detail: 'Live job', label: 'In progress' },
    { color: 'green', detail: 'Review request', label: 'Completed' },
  ],
  popular: {
    eyebrow: 'Popular services',
    limit: 11,
    title: 'Choose what your home needs today',
  },
  pricing: {
    eyebrow: 'Starting prices',
    limit: 4,
    title: 'Clear estimates before a provider visits',
  },
  processSteps: [
    { copy: 'Pick the category, job, date, and address.', number: '1', title: 'Choose service' },
    { copy: 'A verified provider is assigned for your slot.', number: '2', title: 'Get matched' },
    { copy: 'Booking moves through confirmed, in progress, completed.', number: '3', title: 'Track job' },
    { copy: 'Complete payment securely and rate the visit.', number: '4', title: 'Pay & review' },
  ],
  workflow: {
    copy:
      'NEED keeps service selection, provider assignment, status tracking, payment, and review history organized so customers and providers always know what is next.',
    eyebrow: 'Coordinated visits',
    title: 'From request to completion, every job has a clear owner',
  },
}

export const fallbackSiteSettings: NeedSiteSettings = {
  brandInitial: 'N',
  brandName: 'NEED',
  footerCopy: 'Reliable home services for busy households, from urgent fixes to planned upkeep.',
  footerLinks: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book' },
    { href: '/partner', label: 'Join  as a service Partner' },
  ],
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  primaryActionHref: '/book',
  primaryActionLabel: 'Book now',
  secondaryActionHref: '/partner',
  secondaryActionLabel: 'Join  as a service Partner',
}

export const fallbackSitePages: NeedSitePagesContent = {
  about: {
    body: [
      {
        copy:
          'NEED connects households with verified providers across essential home services, from urgent repairs to planned maintenance visits.',
      },
      {
        copy:
          'The operating model is intentionally practical: verify the provider, confirm the slot, keep the job accountable, and make the customer experience feel simple.',
      },
    ],
    copy:
      'NEED connects households with verified providers across essential home services, from urgent repairs to planned maintenance visits.',
    eyebrow: 'About NEED',
    processSteps: fallbackHomePageContent.processSteps,
    title: 'A services platform designed for reliable home care and clean operations.',
  },
  booking: {
    buttonLabel: 'Confirm request',
    copy:
      'The team reviews each request, confirms the provider, and keeps the booking status moving until the visit is complete.',
    eyebrow: 'Booking flow',
    nextTitle: 'What happens next',
    note: 'No payment is collected until your request is reviewed.',
    panelKicker: 'Instant estimate',
    panelTitle: 'Book a verified expert',
    processSteps: fallbackHomePageContent.processSteps,
    title: 'Select a service, choose a slot, and send the request to NEED operations.',
  },
  contact: {
    cards: [
      { body: '+91 90000 00000\nsupport@needservices.in', title: 'Customer care' },
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
    copy: 'Reach the NEED team for home service requests, provider onboarding, or admin help.',
    eyebrow: 'Contact',
    title: 'Need a provider, partnership, or support callback?',
  },
  kyc: {
    adminCopy:
      'Admin can open the KYC submission, inspect the uploaded ID and photo, check bank details, and update verification status.',
    adminEyebrow: 'Admin record',
    adminStatuses: ['Submitted', 'Under Review', 'Verified', 'Rejected'],
    adminTitle: 'KYC stays connected to the original application.',
    applicationCopy:
      'Your partner application is saved. Finish KYC now to speed up approval, or return later with your documents.',
    applicationErrorMessage: 'We could not find that partner application.',
    applicationEyebrow: 'Application submitted',
    applicationNeededCopy:
      'KYC must be linked to a partner application so admin can review the service profile and verification details together.',
    applicationNeededEyebrow: 'Application needed',
    applicationNeededTitle: 'Start with the partner application first.',
    applicationTitle: 'Complete KYC now.',
    continueLabel: 'Continue KYC',
    copy: 'Upload your ID photo, bank details, and one clear partner photo for admin review.',
    eyebrow: 'Partner KYC',
    formKicker: 'KYC request',
    formNote: 'Your uploaded files are stored for admin verification.',
    laterLabel: 'Do it later',
    missingFieldsMessage: 'Please fill all KYC fields and upload both images.',
    partnerFormLabel: 'Go to partner form',
    submitLabel: 'Submit KYC',
    submittedCopy:
      'NEED operations can now review the government ID, bank details, and photo from the admin panel.',
    submittedEyebrow: 'Submitted',
    submittedTitle: 'KYC details received.',
    title: 'Submit KYC for partner approval.',
  },
  partner: {
    availabilityOptions: ['Weekdays', 'Weekends', 'Morning', 'Afternoon', 'Evening', 'Emergency calls'],
    copy:
      'Share your contact details, service area, and the work you can handle. Admin can review each application and manage it from Payload.',
    eyebrow: 'Partner onboarding',
    missingFieldsMessage: 'Please fill the required details and select at least one service.',
    notesPlaceholder: 'Verification details, tools, team size, or special service experience',
    panelKicker: 'Partner request',
    panelNote: 'Admin can update status, notes, and service fit after review.',
    panelTitle: 'Tell us what you provide',
    reviewCopy:
      'Applications are stored with selected services, contact information, area, availability, and review status. Approved applicants can be added to Providers with matching skills.',
    reviewEyebrow: 'Admin workflow',
    reviewStatuses: ['New', 'Contacted', 'Approved', 'Rejected'],
    reviewTitle: 'Review, approve, and manage providers by service.',
    submitLabel: 'Submit application',
    title: 'Join NEED as a trusted service partner.',
  },
  services: {
    eyebrow: 'Services',
    title: 'Browse every service category managed from the NEED admin.',
  },
}

const getPayloadClient = () => getPayload({ config })

const toFallbackIcon = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

const serviceLogoRules = [
  { logo: 'AC', patterns: ['ac', 'air conditioner', 'air conditioning', 'hvac'] },
  { logo: 'PL', patterns: ['plumb', 'pipe', 'tap', 'leak'] },
  { logo: 'EL', patterns: ['electric', 'wiring', 'switch', 'light'] },
  { logo: 'CL', patterns: ['clean', 'deep clean', 'wash'] },
  { logo: 'CP', patterns: ['carpent', 'wood', 'furniture'] },
  { logo: 'PT', patterns: ['paint', 'wall'] },
  { logo: 'CCTV', patterns: ['cctv', 'camera', 'security'] },
  { logo: 'PC', patterns: ['pest', 'termite', 'insect'] },
  { logo: 'GD', patterns: ['garden', 'lawn', 'plant'] },
  { logo: 'MT', patterns: ['maintenance', 'repair', 'handyman'] },
] as const

const toServiceLogo = (name: string) => {
  const normalizedName = name.toLowerCase()
  const match = serviceLogoRules.find((rule) =>
    rule.patterns.some((pattern) => normalizedName.includes(pattern)),
  )

  return match?.logo ?? toFallbackIcon(name)
}

const isCategory = (category: ServiceDoc['category']): category is CategoryDoc =>
  typeof category === 'object' && category !== null

const isMedia = (media: unknown): media is MediaLike => typeof media === 'object' && media !== null

const toMediaURL = (
  media: MediaLike | number | null | undefined,
  { preferOriginal = false }: { preferOriginal?: boolean } = {},
) => {
  if (!isMedia(media)) {
    return undefined
  }

  return preferOriginal
    ? media.url || media.sizes?.thumbnail?.url || undefined
    : media.sizes?.thumbnail?.url || media.url || undefined
}

const toText = (value: string | null | undefined, fallback: string) => value?.trim() || fallback

const toBoundedNumber = (value: number | null | undefined, fallback: number, min: number, max: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback
  }

  return Math.min(Math.max(Math.round(value), min), max)
}

const sortBySortOrder = <T extends { name: string; sortOrder: number }>(items: T[]) =>
  [...items].sort((first, second) => first.sortOrder - second.sortOrder || first.name.localeCompare(second.name))

const toLinks = (links: Partial<NeedLink>[] | null | undefined, fallback: NeedLink[]) => {
  const mappedLinks = links
    ?.map((link) => ({
      href: link.href?.trim() ?? '',
      label: link.label?.trim() ?? '',
    }))
    .filter((link) => link.href && link.label)

  return mappedLinks && mappedLinks.length > 0 ? mappedLinks : fallback
}

const toTextBlocks = (blocks: { copy?: string | null }[] | null | undefined, fallback: NeedTextBlock[]) => {
  const mappedBlocks = blocks
    ?.map((block) => ({ copy: block.copy?.trim() ?? '' }))
    .filter((block) => block.copy)

  return mappedBlocks && mappedBlocks.length > 0 ? mappedBlocks : fallback
}

const toContactCards = (cards: SitePagesDoc['contactCards']) => {
  const mappedCards = cards
    ?.map((card) => ({
      actionHref: card.actionHref?.trim() || undefined,
      actionLabel: card.actionLabel?.trim() || undefined,
      body: card.body?.trim() ?? '',
      title: card.title?.trim() ?? '',
    }))
    .filter((card) => card.body && card.title)

  return mappedCards && mappedCards.length > 0 ? mappedCards : fallbackSitePages.contact.cards
}

const toStringList = (
  items: { label?: string | null }[] | null | undefined,
  fallback: string[],
) => {
  const mappedItems = items?.map((item) => item.label?.trim() ?? '').filter(Boolean)

  return mappedItems && mappedItems.length > 0 ? mappedItems : fallback
}

const toNeedCategory = (category: CategoryDoc): NeedCategory => ({
  description: category.description,
  featured: category.featured ?? false,
  icon: category.icon || toFallbackIcon(category.name),
  id: category.id,
  name: category.name,
  slug: category.slug,
  sortOrder: category.sortOrder ?? 0,
})

const toNeedService = (service: ServiceDoc): NeedService | null => {
  if (!isCategory(service.category)) {
    return null
  }

  const categorySlug = service.category.slug

  return {
    basePrice: service.basePrice,
    category: categorySlug,
    categoryId: service.category.id,
    categoryName: service.category.name,
    description: service.description,
    durationMinutes: service.durationMinutes,
    heroImage: toMediaURL(service.heroImage, { preferOriginal: true }) || toServiceHeroImage(categorySlug, service.slug),
    icon: service.icon || toServiceLogo(service.name),
    id: service.id,
    includes: (service.includes?.map((include) => include.item).filter(Boolean) as string[] | undefined) ?? [],
    logo: toMediaURL(service.logo),
    name: service.name,
    popular: service.popular ?? true,
    slug: service.slug,
    sortOrder: service.sortOrder ?? 0,
  }
}

const toNeedTestimonial = (testimonial: TestimonialDoc): NeedTestimonial => ({
  city: testimonial.city,
  id: testimonial.id,
  name: testimonial.name,
  photo: toMediaURL(testimonial.photo),
  quote: testimonial.quote,
  rating: testimonial.rating,
  service: testimonial.service ?? undefined,
})

const isNeedService = (service: NeedService | null): service is NeedService => Boolean(service)

const toProcessSteps = (steps: HomePageDoc['processSteps']) => {
  const mappedSteps = steps
    ?.map((step) => ({
      copy: step.copy?.trim() ?? '',
      number: step.number?.trim() ?? '',
      title: step.title?.trim() ?? '',
    }))
    .filter((step) => step.copy && step.number && step.title)

  return mappedSteps && mappedSteps.length > 0 ? mappedSteps : fallbackHomePageContent.processSteps
}

const toPipelineStatuses = (statuses: HomePageDoc['pipelineStatuses']) => {
  const mappedStatuses = statuses
    ?.map((status) => ({
      color: status.color ?? 'gold',
      detail: status.detail?.trim() ?? '',
      label: status.label?.trim() ?? '',
    }))
    .filter((status) => status.detail && status.label)

  return mappedStatuses && mappedStatuses.length > 0
    ? mappedStatuses
    : fallbackHomePageContent.pipelineStatuses
}

const toHomePageContent = (homePage?: HomePageDoc | null): NeedHomePageContent => ({
  categoryHighlightsLimit: toBoundedNumber(
    homePage?.categoryHighlightsLimit,
    fallbackHomePageContent.categoryHighlightsLimit,
    1,
    10,
  ),
  customerTrust: {
    eyebrow: toText(homePage?.customerTrustEyebrow, fallbackHomePageContent.customerTrust.eyebrow),
    limit: toBoundedNumber(homePage?.customerTrustLimit, fallbackHomePageContent.customerTrust.limit, 1, 12),
    title: toText(homePage?.customerTrustTitle, fallbackHomePageContent.customerTrust.title),
  },
  hero: {
    copy: toText(homePage?.heroCopy, fallbackHomePageContent.hero.copy),
    eyebrow: toText(homePage?.heroEyebrow, fallbackHomePageContent.hero.eyebrow),
    image: toMediaURL(homePage?.heroImage, { preferOriginal: true }),
    primaryActionHref: toText(homePage?.primaryActionHref, fallbackHomePageContent.hero.primaryActionHref),
    primaryActionLabel: toText(homePage?.primaryActionLabel, fallbackHomePageContent.hero.primaryActionLabel),
    secondaryActionHref: toText(homePage?.secondaryActionHref, fallbackHomePageContent.hero.secondaryActionHref),
    secondaryActionLabel: toText(homePage?.secondaryActionLabel, fallbackHomePageContent.hero.secondaryActionLabel),
    title: toText(homePage?.heroTitle, fallbackHomePageContent.hero.title),
  },
  pipelineStatuses: toPipelineStatuses(homePage?.pipelineStatuses),
  popular: {
    eyebrow: toText(homePage?.popularEyebrow, fallbackHomePageContent.popular.eyebrow),
    limit: toBoundedNumber(homePage?.popularLimit, fallbackHomePageContent.popular.limit, 1, 20),
    title: toText(homePage?.popularTitle, fallbackHomePageContent.popular.title),
  },
  pricing: {
    eyebrow: toText(homePage?.pricingEyebrow, fallbackHomePageContent.pricing.eyebrow),
    limit: toBoundedNumber(homePage?.pricingLimit, fallbackHomePageContent.pricing.limit, 1, 12),
    title: toText(homePage?.pricingTitle, fallbackHomePageContent.pricing.title),
  },
  processSteps: toProcessSteps(homePage?.processSteps),
  workflow: {
    copy: toText(homePage?.workflowCopy, fallbackHomePageContent.workflow.copy),
    eyebrow: toText(homePage?.workflowEyebrow, fallbackHomePageContent.workflow.eyebrow),
    title: toText(homePage?.workflowTitle, fallbackHomePageContent.workflow.title),
  },
})

const toSiteSettings = (settings?: SiteSettingsDoc | null): NeedSiteSettings => ({
  brandInitial: toText(settings?.brandInitial, fallbackSiteSettings.brandInitial).slice(0, 2),
  brandName: toText(settings?.brandName, fallbackSiteSettings.brandName),
  footerCopy: toText(settings?.footerCopy, fallbackSiteSettings.footerCopy),
  footerLinks: toLinks(settings?.footerLinks, fallbackSiteSettings.footerLinks),
  navLinks: toLinks(settings?.navLinks, fallbackSiteSettings.navLinks),
  primaryActionHref: toText(settings?.primaryActionHref, fallbackSiteSettings.primaryActionHref),
  primaryActionLabel: toText(settings?.primaryActionLabel, fallbackSiteSettings.primaryActionLabel),
  secondaryActionHref: toText(settings?.secondaryActionHref, fallbackSiteSettings.secondaryActionHref),
  secondaryActionLabel: toText(settings?.secondaryActionLabel, fallbackSiteSettings.secondaryActionLabel),
})

const toSitePages = (pages?: SitePagesDoc | null): NeedSitePagesContent => ({
  about: {
    body: toTextBlocks(pages?.aboutBody, fallbackSitePages.about.body),
    copy: toText(pages?.aboutCopy, fallbackSitePages.about.copy),
    eyebrow: toText(pages?.aboutEyebrow, fallbackSitePages.about.eyebrow),
    heroImage: toMediaURL(pages?.aboutHeroImage, { preferOriginal: true }),
    processSteps: toProcessSteps(pages?.aboutProcessSteps),
    title: toText(pages?.aboutTitle, fallbackSitePages.about.title),
  },
  booking: {
    buttonLabel: toText(pages?.bookingButtonLabel, fallbackSitePages.booking.buttonLabel),
    copy: toText(pages?.bookingCopy, fallbackSitePages.booking.copy),
    eyebrow: toText(pages?.bookingEyebrow, fallbackSitePages.booking.eyebrow),
    nextTitle: toText(pages?.bookingNextTitle, fallbackSitePages.booking.nextTitle),
    note: toText(pages?.bookingPanelNote, fallbackSitePages.booking.note),
    panelKicker: toText(pages?.bookingPanelKicker, fallbackSitePages.booking.panelKicker),
    panelTitle: toText(pages?.bookingPanelTitle, fallbackSitePages.booking.panelTitle),
    processSteps: toProcessSteps(pages?.bookingProcessSteps),
    title: toText(pages?.bookingTitle, fallbackSitePages.booking.title),
  },
  contact: {
    cards: toContactCards(pages?.contactCards),
    copy: toText(pages?.contactCopy, fallbackSitePages.contact.copy),
    eyebrow: toText(pages?.contactEyebrow, fallbackSitePages.contact.eyebrow),
    title: toText(pages?.contactTitle, fallbackSitePages.contact.title),
  },
  kyc: {
    adminCopy: toText(pages?.kycAdminCopy, fallbackSitePages.kyc.adminCopy),
    adminEyebrow: toText(pages?.kycAdminEyebrow, fallbackSitePages.kyc.adminEyebrow),
    adminStatuses: toStringList(pages?.kycAdminStatuses, fallbackSitePages.kyc.adminStatuses),
    adminTitle: toText(pages?.kycAdminTitle, fallbackSitePages.kyc.adminTitle),
    applicationCopy: toText(pages?.kycApplicationCopy, fallbackSitePages.kyc.applicationCopy),
    applicationErrorMessage: toText(
      pages?.kycApplicationErrorMessage,
      fallbackSitePages.kyc.applicationErrorMessage,
    ),
    applicationEyebrow: toText(pages?.kycApplicationEyebrow, fallbackSitePages.kyc.applicationEyebrow),
    applicationNeededCopy: toText(
      pages?.kycApplicationNeededCopy,
      fallbackSitePages.kyc.applicationNeededCopy,
    ),
    applicationNeededEyebrow: toText(
      pages?.kycApplicationNeededEyebrow,
      fallbackSitePages.kyc.applicationNeededEyebrow,
    ),
    applicationNeededTitle: toText(
      pages?.kycApplicationNeededTitle,
      fallbackSitePages.kyc.applicationNeededTitle,
    ),
    applicationTitle: toText(pages?.kycApplicationTitle, fallbackSitePages.kyc.applicationTitle),
    continueLabel: toText(pages?.kycContinueLabel, fallbackSitePages.kyc.continueLabel),
    copy: toText(pages?.kycCopy, fallbackSitePages.kyc.copy),
    eyebrow: toText(pages?.kycEyebrow, fallbackSitePages.kyc.eyebrow),
    formKicker: toText(pages?.kycFormKicker, fallbackSitePages.kyc.formKicker),
    formNote: toText(pages?.kycFormNote, fallbackSitePages.kyc.formNote),
    laterLabel: toText(pages?.kycLaterLabel, fallbackSitePages.kyc.laterLabel),
    missingFieldsMessage: toText(
      pages?.kycMissingFieldsMessage,
      fallbackSitePages.kyc.missingFieldsMessage,
    ),
    partnerFormLabel: toText(pages?.kycPartnerFormLabel, fallbackSitePages.kyc.partnerFormLabel),
    submitLabel: toText(pages?.kycSubmitLabel, fallbackSitePages.kyc.submitLabel),
    submittedCopy: toText(pages?.kycSubmittedCopy, fallbackSitePages.kyc.submittedCopy),
    submittedEyebrow: toText(pages?.kycSubmittedEyebrow, fallbackSitePages.kyc.submittedEyebrow),
    submittedTitle: toText(pages?.kycSubmittedTitle, fallbackSitePages.kyc.submittedTitle),
    title: toText(pages?.kycTitle, fallbackSitePages.kyc.title),
  },
  partner: {
    availabilityOptions: toStringList(
      pages?.partnerAvailabilityOptions,
      fallbackSitePages.partner.availabilityOptions,
    ),
    copy: toText(pages?.partnerCopy, fallbackSitePages.partner.copy),
    eyebrow: toText(pages?.partnerEyebrow, fallbackSitePages.partner.eyebrow),
    heroImage: toMediaURL(pages?.partnerHeroImage, { preferOriginal: true }),
    missingFieldsMessage: toText(
      pages?.partnerMissingFieldsMessage,
      fallbackSitePages.partner.missingFieldsMessage,
    ),
    notesPlaceholder: toText(pages?.partnerNotesPlaceholder, fallbackSitePages.partner.notesPlaceholder),
    panelKicker: toText(pages?.partnerPanelKicker, fallbackSitePages.partner.panelKicker),
    panelNote: toText(pages?.partnerPanelNote, fallbackSitePages.partner.panelNote),
    panelTitle: toText(pages?.partnerPanelTitle, fallbackSitePages.partner.panelTitle),
    reviewCopy: toText(pages?.partnerReviewCopy, fallbackSitePages.partner.reviewCopy),
    reviewEyebrow: toText(pages?.partnerReviewEyebrow, fallbackSitePages.partner.reviewEyebrow),
    reviewStatuses: toStringList(pages?.partnerReviewStatuses, fallbackSitePages.partner.reviewStatuses),
    reviewTitle: toText(pages?.partnerReviewTitle, fallbackSitePages.partner.reviewTitle),
    submitLabel: toText(pages?.partnerSubmitLabel, fallbackSitePages.partner.submitLabel),
    title: toText(pages?.partnerTitle, fallbackSitePages.partner.title),
  },
  services: {
    copy: pages?.servicesCopy?.trim() || undefined,
    eyebrow: toText(pages?.servicesEyebrow, fallbackSitePages.services.eyebrow),
    heroImage: toMediaURL(pages?.servicesHeroImage, { preferOriginal: true }),
    title: toText(pages?.servicesTitle, fallbackSitePages.services.title),
  },
})

export const getCategories = async ({ featuredOnly = true }: FeaturedFilter = {}) => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      sort: ['sortOrder', 'name'],
      where: featuredOnly
        ? {
            featured: {
              equals: true,
            },
          }
        : undefined,
    })
    const categories = (result.docs as CategoryDoc[]).map(toNeedCategory)

    return categories.length > 0 ? sortBySortOrder(categories) : fallbackCategories
  } catch {
    return fallbackCategories
  }
}

export const getCategory = async (slug: string) => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    const category = (result.docs as CategoryDoc[])[0]

    return category ? toNeedCategory(category) : fallbackCategories.find((item) => item.slug === slug) ?? null
  } catch {
    return fallbackCategories.find((item) => item.slug === slug) ?? null
  }
}

export const getServices = async ({ availableOnly = true }: AvailableFilter = {}) => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 200,
      sort: ['sortOrder', 'name'],
      where: availableOnly
        ? {
            available: {
              equals: true,
            },
          }
        : undefined,
    })
    const services = (result.docs as ServiceDoc[]).map(toNeedService).filter(isNeedService)

    return services.length > 0 ? sortBySortOrder(services) : fallbackServices
  } catch {
    return fallbackServices
  }
}

export const getServicesByCategory = async (categorySlug: string) => {
  try {
    const payload = await getPayloadClient()
    const categoryResult = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: categorySlug,
        },
      },
    })
    const category = (categoryResult.docs as CategoryDoc[])[0]

    if (!category) {
      return fallbackServices.filter((service) => service.category === categorySlug)
    }

    const serviceResult = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 200,
      sort: ['sortOrder', 'name'],
      where: {
        and: [
          {
            category: {
              equals: category.id,
            },
          },
          {
            available: {
              equals: true,
            },
          },
        ],
      },
    })
    const services = (serviceResult.docs as ServiceDoc[]).map(toNeedService).filter(isNeedService)

    return services.length > 0 ? sortBySortOrder(services) : fallbackServices.filter((service) => service.category === categorySlug)
  } catch {
    return fallbackServices.filter((service) => service.category === categorySlug)
  }
}

export const getService = async (categorySlug: string, serviceSlug: string) => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'services',
      depth: 1,
      limit: 1,
      where: {
        and: [
          {
            slug: {
              equals: serviceSlug,
            },
          },
          {
            available: {
              equals: true,
            },
          },
        ],
      },
    })
    const service = (result.docs as ServiceDoc[])[0] ? toNeedService((result.docs as ServiceDoc[])[0]) : null

    if (!service || service.category !== categorySlug) {
      return fallbackServices.find((item) => item.category === categorySlug && item.slug === serviceSlug) ?? null
    }

    return service
  } catch {
    return fallbackServices.find((item) => item.category === categorySlug && item.slug === serviceSlug) ?? null
  }
}

export const getTestimonials = async ({ featuredOnly = true }: FeaturedFilter = {}) => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'testimonials',
      depth: 1,
      limit: 20,
      sort: '-createdAt',
      where: featuredOnly
        ? {
            featured: {
              equals: true,
            },
          }
        : undefined,
    })
    const testimonials = (result.docs as TestimonialDoc[]).map(toNeedTestimonial)

    return testimonials.length > 0 ? testimonials : fallbackTestimonials
  } catch {
    return fallbackTestimonials
  }
}

export const getHomePageContent = async () => {
  try {
    const payload = await getPayloadClient()
    const homePage = await payload.findGlobal({
      slug: 'home-page',
      depth: 1,
    })

    return toHomePageContent(homePage as HomePageDoc)
  } catch {
    return fallbackHomePageContent
  }
}

export const getSiteSettings = async () => {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
    })

    return toSiteSettings(settings as SiteSettingsDoc)
  } catch {
    return fallbackSiteSettings
  }
}

export const getSitePages = async () => {
  try {
    const payload = await getPayloadClient()
    const pages = await payload.findGlobal({
      slug: 'site-pages',
      depth: 1,
    })

    return toSitePages(pages as SitePagesDoc)
  } catch {
    return fallbackSitePages
  }
}

export const getHomeData = async () => {
  const [categories, services, testimonials, homePage] = await Promise.all([
    getCategories(),
    getServices(),
    getTestimonials(),
    getHomePageContent(),
  ])

  return {
    categories,
    homePage,
    services,
    testimonials,
  }
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount)
