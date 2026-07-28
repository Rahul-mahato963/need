import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import {
  fallbackCategories,
  fallbackHomePageContent,
  fallbackServices,
  fallbackSitePages,
  fallbackSiteSettings,
  fallbackTestimonials,
} from '@/lib/need-data'

const upsertCategory = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  category: (typeof fallbackCategories)[number],
) => {
  const existing = await payload.find({
    collection: 'categories',
    limit: 1,
    where: {
      slug: {
        equals: category.slug,
      },
    },
  })

  const data = {
    description: category.description,
    featured: category.featured,
    icon: category.icon,
    name: category.name,
    slug: category.slug,
    sortOrder: category.sortOrder,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'categories',
      data,
      id: existing.docs[0].id,
    })
    return existing.docs[0].id
  }

  const created = await payload.create({
    collection: 'categories',
    data,
  })

  return created.id
}

const upsertService = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  categoryIdsBySlug: Map<string, number>,
  service: (typeof fallbackServices)[number],
) => {
  const categoryId = categoryIdsBySlug.get(service.category)

  if (!categoryId) {
    throw new Error(`Missing category for service: ${service.name}`)
  }

  const existing = await payload.find({
    collection: 'services',
    limit: 1,
    where: {
      slug: {
        equals: service.slug,
      },
    },
  })

  const data = {
    available: true,
    basePrice: service.basePrice,
    category: categoryId,
    description: service.description,
    durationMinutes: service.durationMinutes,
    icon: service.icon,
    includes: service.includes.map((item) => ({ item })),
    name: service.name,
    popular: service.popular,
    slug: service.slug,
    sortOrder: service.sortOrder,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'services',
      data,
      id: existing.docs[0].id,
    })
    return
  }

  await payload.create({
    collection: 'services',
    data,
  })
}

const upsertTestimonial = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  testimonial: (typeof fallbackTestimonials)[number],
) => {
  const existing = await payload.find({
    collection: 'testimonials',
    limit: 1,
    where: {
      name: {
        equals: testimonial.name,
      },
    },
  })

  const data = {
    city: testimonial.city,
    featured: true,
    name: testimonial.name,
    quote: testimonial.quote,
    rating: testimonial.rating,
    service: testimonial.service,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'testimonials',
      data,
      id: existing.docs[0].id,
    })
    return
  }

  await payload.create({
    collection: 'testimonials',
    data,
  })
}

const seedHomePage = async (payload: Awaited<ReturnType<typeof getPayload>>) => {
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      categoryHighlightsLimit: fallbackHomePageContent.categoryHighlightsLimit,
      customerTrustEyebrow: fallbackHomePageContent.customerTrust.eyebrow,
      customerTrustLimit: fallbackHomePageContent.customerTrust.limit,
      customerTrustTitle: fallbackHomePageContent.customerTrust.title,
      heroCopy: fallbackHomePageContent.hero.copy,
      heroEyebrow: fallbackHomePageContent.hero.eyebrow,
      heroTitle: fallbackHomePageContent.hero.title,
      pipelineStatuses: fallbackHomePageContent.pipelineStatuses,
      popularEyebrow: fallbackHomePageContent.popular.eyebrow,
      popularLimit: fallbackHomePageContent.popular.limit,
      popularTitle: fallbackHomePageContent.popular.title,
      pricingEyebrow: fallbackHomePageContent.pricing.eyebrow,
      pricingLimit: fallbackHomePageContent.pricing.limit,
      pricingTitle: fallbackHomePageContent.pricing.title,
      primaryActionHref: fallbackHomePageContent.hero.primaryActionHref,
      primaryActionLabel: fallbackHomePageContent.hero.primaryActionLabel,
      processSteps: fallbackHomePageContent.processSteps,
      secondaryActionHref: fallbackHomePageContent.hero.secondaryActionHref,
      secondaryActionLabel: fallbackHomePageContent.hero.secondaryActionLabel,
      workflowCopy: fallbackHomePageContent.workflow.copy,
      workflowEyebrow: fallbackHomePageContent.workflow.eyebrow,
      workflowTitle: fallbackHomePageContent.workflow.title,
    },
  })
}

const seedSiteSettings = async (payload: Awaited<ReturnType<typeof getPayload>>) => {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: fallbackSiteSettings,
  })
}

const seedSitePages = async (payload: Awaited<ReturnType<typeof getPayload>>) => {
  await payload.updateGlobal({
    slug: 'site-pages',
    data: {
      aboutBody: fallbackSitePages.about.body,
      aboutCopy: fallbackSitePages.about.copy,
      aboutEyebrow: fallbackSitePages.about.eyebrow,
      aboutProcessSteps: fallbackSitePages.about.processSteps,
      aboutTitle: fallbackSitePages.about.title,
      bookingButtonLabel: fallbackSitePages.booking.buttonLabel,
      bookingCopy: fallbackSitePages.booking.copy,
      bookingEyebrow: fallbackSitePages.booking.eyebrow,
      bookingNextTitle: fallbackSitePages.booking.nextTitle,
      bookingPanelKicker: fallbackSitePages.booking.panelKicker,
      bookingPanelNote: fallbackSitePages.booking.note,
      bookingPanelTitle: fallbackSitePages.booking.panelTitle,
      bookingProcessSteps: fallbackSitePages.booking.processSteps,
      bookingTitle: fallbackSitePages.booking.title,
      contactCards: fallbackSitePages.contact.cards,
      contactCopy: fallbackSitePages.contact.copy,
      contactEyebrow: fallbackSitePages.contact.eyebrow,
      contactTitle: fallbackSitePages.contact.title,
      kycAdminCopy: fallbackSitePages.kyc.adminCopy,
      kycAdminEyebrow: fallbackSitePages.kyc.adminEyebrow,
      kycAdminStatuses: fallbackSitePages.kyc.adminStatuses.map((label) => ({ label })),
      kycAdminTitle: fallbackSitePages.kyc.adminTitle,
      kycApplicationCopy: fallbackSitePages.kyc.applicationCopy,
      kycApplicationErrorMessage: fallbackSitePages.kyc.applicationErrorMessage,
      kycApplicationEyebrow: fallbackSitePages.kyc.applicationEyebrow,
      kycApplicationNeededCopy: fallbackSitePages.kyc.applicationNeededCopy,
      kycApplicationNeededEyebrow: fallbackSitePages.kyc.applicationNeededEyebrow,
      kycApplicationNeededTitle: fallbackSitePages.kyc.applicationNeededTitle,
      kycApplicationTitle: fallbackSitePages.kyc.applicationTitle,
      kycContinueLabel: fallbackSitePages.kyc.continueLabel,
      kycCopy: fallbackSitePages.kyc.copy,
      kycEyebrow: fallbackSitePages.kyc.eyebrow,
      kycFormKicker: fallbackSitePages.kyc.formKicker,
      kycFormNote: fallbackSitePages.kyc.formNote,
      kycLaterLabel: fallbackSitePages.kyc.laterLabel,
      kycMissingFieldsMessage: fallbackSitePages.kyc.missingFieldsMessage,
      kycPartnerFormLabel: fallbackSitePages.kyc.partnerFormLabel,
      kycSubmitLabel: fallbackSitePages.kyc.submitLabel,
      kycSubmittedCopy: fallbackSitePages.kyc.submittedCopy,
      kycSubmittedEyebrow: fallbackSitePages.kyc.submittedEyebrow,
      kycSubmittedTitle: fallbackSitePages.kyc.submittedTitle,
      kycTitle: fallbackSitePages.kyc.title,
      partnerAvailabilityOptions: fallbackSitePages.partner.availabilityOptions.map((label) => ({ label })),
      partnerCopy: fallbackSitePages.partner.copy,
      partnerEyebrow: fallbackSitePages.partner.eyebrow,
      partnerMissingFieldsMessage: fallbackSitePages.partner.missingFieldsMessage,
      partnerNotesPlaceholder: fallbackSitePages.partner.notesPlaceholder,
      partnerPanelKicker: fallbackSitePages.partner.panelKicker,
      partnerPanelNote: fallbackSitePages.partner.panelNote,
      partnerPanelTitle: fallbackSitePages.partner.panelTitle,
      partnerReviewCopy: fallbackSitePages.partner.reviewCopy,
      partnerReviewEyebrow: fallbackSitePages.partner.reviewEyebrow,
      partnerReviewStatuses: fallbackSitePages.partner.reviewStatuses.map((label) => ({ label })),
      partnerReviewTitle: fallbackSitePages.partner.reviewTitle,
      partnerSubmitLabel: fallbackSitePages.partner.submitLabel,
      partnerTitle: fallbackSitePages.partner.title,
      servicesCopy: fallbackSitePages.services.copy,
      servicesEyebrow: fallbackSitePages.services.eyebrow,
      servicesTitle: fallbackSitePages.services.title,
    },
  })
}

const seed = async () => {
  const payload = await getPayload({ config })
  const categoryIdsBySlug = new Map<string, number>()

  for (const category of fallbackCategories) {
    const categoryId = await upsertCategory(payload, category)
    categoryIdsBySlug.set(category.slug, Number(categoryId))
  }

  for (const service of fallbackServices) {
    await upsertService(payload, categoryIdsBySlug, service)
  }

  for (const testimonial of fallbackTestimonials) {
    await upsertTestimonial(payload, testimonial)
  }

  await seedHomePage(payload)
  await seedSiteSettings(payload)
  await seedSitePages(payload)
}

seed()
  .then(() => {
    console.log('Seeded admin content.')
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
