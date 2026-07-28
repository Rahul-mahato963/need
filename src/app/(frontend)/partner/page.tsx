import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import {
  detailGridClass,
  emptyStateClass,
  eyebrowClass,
  formErrorClass,
  formPanelClass,
  formTwoColumnClass,
  inputClass,
  labelClass,
  panelHeadingClass,
  panelKickerClass,
  panelNoteClass,
  panelTitleClass,
  partnerAdminStepClass,
  partnerAdminStepsClass,
  partnerHeroClass,
  partnerReviewCardClass,
  primaryActionClass,
  textareaClass,
  PageShell,
} from '../components'
import { getServices, getSitePages } from '@/lib/need-data'
import partnerHeroBg from '@/partner-hero-bg.png'

export const dynamic = 'force-dynamic'

type PartnerPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const choiceFieldClass = 'm-0 grid min-w-0 gap-2.5 border-0 p-0'
const choiceLegendClass = 'pb-[7px] text-[0.82rem] font-extrabold text-[#17221f]'
const choiceGridClass = 'grid grid-cols-2 gap-2.5 max-[760px]:grid-cols-1'
const choiceClass =
  'grid min-h-[54px] cursor-pointer grid-cols-[18px_1fr] items-center gap-2.5 rounded-md border border-[#e5ddd0] bg-[#f6f3ed] px-3 py-2.5'
const compactChoiceClass =
  'grid min-h-11 cursor-pointer grid-cols-[18px_1fr] items-center gap-2.5 rounded-md border border-[#e5ddd0] bg-[#f6f3ed] px-3 py-2.5'
const checkboxClass = 'h-4 min-h-4 w-4 accent-[#096b68]'

const toOptionalString = (value: FormDataEntryValue | null) => {
  if (typeof value !== 'string') return undefined

  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : undefined
}

const toRequiredString = (value: FormDataEntryValue | null) => toOptionalString(value) ?? ''

async function submitPartnerApplication(formData: FormData) {
  'use server'

  const applicantName = toRequiredString(formData.get('applicantName'))
  const phone = toRequiredString(formData.get('phone'))
  const email = toRequiredString(formData.get('email'))
  const serviceArea = toRequiredString(formData.get('serviceArea'))
  const selectedServices = formData
    .getAll('services')
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0)

  if (!applicantName || !phone || !email || !serviceArea || selectedServices.length === 0) {
    redirect('/partner?error=missing')
  }

  const experienceYearsValue = toOptionalString(formData.get('experienceYears'))
  const experienceYears = experienceYearsValue ? Number(experienceYearsValue) : undefined
  const selectedAvailability = formData
    .getAll('availability')
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean)

  const payload = await getPayload({ config })

  const application = await payload.create({
    collection: 'partner-applications',
    data: {
      applicantName,
      availability: selectedAvailability.map((option) => ({ option })),
      businessName: toOptionalString(formData.get('businessName')),
      email,
      experienceYears: Number.isFinite(experienceYears) ? experienceYears : undefined,
      kycStatus: 'pending',
      message: toOptionalString(formData.get('message')),
      phone,
      serviceArea,
      services: selectedServices,
      status: 'new',
    },
  })

  redirect(`/partner/kyc?application=${application.id}`)
}

export default async function PartnerPage({ searchParams }: PartnerPageProps) {
  const [services, pages, params] = await Promise.all([getServices(), getSitePages(), searchParams])
  const hasMissingFields = params?.error === 'missing'

  return (
    <PageShell>
      <section className={`${partnerHeroClass} relative isolate grid min-h-[clamp(420px,44vw,560px)] items-center overflow-hidden`}>
        <Image
          alt=""
          aria-hidden="true"
          className="z-0 object-cover object-[70%_18%] saturate-[1.1] contrast-[1.1] max-[760px]:object-[72%_12%]"
          fill
          placeholder={pages.partner.heroImage ? 'empty' : 'blur'}
          priority
          sizes="100vw"
          src={pages.partner.heroImage || partnerHeroBg}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,36,71,0.97)_0%,rgba(5,36,71,0.84)_38%,rgba(5,36,71,0.34)_66%,rgba(5,36,71,0.08)_100%),linear-gradient(0deg,rgba(5,36,71,0.34),rgba(5,36,71,0.02))] max-[760px]:bg-[linear-gradient(90deg,rgba(5,36,71,0.94)_0%,rgba(5,36,71,0.74)_46%,rgba(5,36,71,0.18)_100%),linear-gradient(180deg,rgba(5,36,71,0.08)_0%,rgba(5,36,71,0.48)_58%,rgba(5,36,71,0.94)_100%)]" />
        <div className="relative z-[2] max-w-[1120px] max-[760px]:max-w-80">
          <span className={`${eyebrowClass} text-[#f2bd2b]`}>{pages.partner.eyebrow}</span>
          <h1 className="mt-[18px] max-w-[900px] text-[clamp(2.6rem,6.2vw,5.9rem)] font-black leading-[0.95] tracking-[0] text-white max-[760px]:text-[clamp(1.86rem,8.6vw,2.12rem)] max-[760px]:leading-[1.1]">
            {pages.partner.title}
          </h1>
          <p className="mt-[18px] max-w-[760px] text-[1.08rem] text-white/80 max-[760px]:max-w-80 max-[760px]:text-[0.96rem] max-[760px]:leading-[1.48]">
            {pages.partner.copy}
          </p>
        </div>
      </section>
      <section className={`${detailGridClass} items-start max-[760px]:gap-3 max-[760px]:px-3.5 max-[760px]:pb-10 max-[760px]:pt-[22px]`}>
        <form action={submitPartnerApplication} className={formPanelClass}>
          <div className={panelHeadingClass}>
            <span className={panelKickerClass}>{pages.partner.panelKicker}</span>
            <strong className={panelTitleClass}>{pages.partner.panelTitle}</strong>
          </div>

          {hasMissingFields ? (
            <p className={formErrorClass} role="alert">
              {pages.partner.missingFieldsMessage}
            </p>
          ) : null}

          <div className={formTwoColumnClass}>
            <label className={labelClass}>
              Full name
              <input className={inputClass} autoComplete="name" name="applicantName" required type="text" />
            </label>
            <label className={labelClass}>
              Business name
              <input className={inputClass} autoComplete="organization" name="businessName" type="text" />
            </label>
          </div>

          <div className={formTwoColumnClass}>
            <label className={labelClass}>
              Phone
              <input className={inputClass} autoComplete="tel" name="phone" required type="tel" />
            </label>
            <label className={labelClass}>
              Email
              <input className={inputClass} autoComplete="email" name="email" required type="email" />
            </label>
          </div>

          <div className={formTwoColumnClass}>
            <label className={labelClass}>
              Service area
              <input className={inputClass} name="serviceArea" required type="text" />
            </label>
            <label className={labelClass}>
              Experience
              <input className={inputClass} min={0} name="experienceYears" placeholder="Years" type="number" />
            </label>
          </div>

          <fieldset className={choiceFieldClass}>
            <legend className={choiceLegendClass}>Services you can provide</legend>
            {services.length > 0 ? (
              <div className={choiceGridClass}>
                {services.map((service) => (
                  <label className={choiceClass} key={service.id}>
                    <input className={checkboxClass} name="services" type="checkbox" value={service.id} />
                    <span className="grid min-w-0 gap-px">
                      <strong className="text-[0.92rem] leading-[1.22]">{service.name}</strong>
                      <small className="text-[0.78rem] font-extrabold text-[#60706b]">{service.categoryName}</small>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className={emptyStateClass}>Add services in the Payload admin before accepting partners.</p>
            )}
          </fieldset>

          <fieldset className={choiceFieldClass}>
            <legend className={choiceLegendClass}>Availability</legend>
            <div className={choiceGridClass}>
              {pages.partner.availabilityOptions.map((option) => (
                <label className={compactChoiceClass} key={option}>
                  <input className={checkboxClass} name="availability" type="checkbox" value={option} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={labelClass}>
            Notes
            <textarea
              className={textareaClass}
              name="message"
              placeholder={pages.partner.notesPlaceholder}
              rows={4}
            />
          </label>

          <button className={`${primaryActionClass} mt-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`} disabled={services.length === 0} type="submit">
            {pages.partner.submitLabel}
          </button>
          <p className={panelNoteClass}>{pages.partner.panelNote}</p>
        </form>

        <article className={partnerReviewCardClass}>
          <span className={eyebrowClass}>{pages.partner.reviewEyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0] max-[760px]:max-w-[300px] max-[760px]:text-[1.7rem] max-[760px]:leading-[1.12]">
            {pages.partner.reviewTitle}
          </h2>
          <p className="leading-[1.55] text-[#60706b] max-[760px]:max-w-[300px]">
            {pages.partner.reviewCopy}
          </p>
          <div className={partnerAdminStepsClass}>
            {pages.partner.reviewStatuses.map((status) => (
              <span className={partnerAdminStepClass} key={status}>{status}</span>
            ))}
          </div>
        </article>
      </section>
    </PageShell>
  )
}
