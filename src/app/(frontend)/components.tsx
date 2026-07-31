import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CategorySlider } from './CategorySlider'
import { BookingLocationPicker } from './BookingLocationPicker'
import { submitBooking } from './booking-actions'
import { InstallAppButton } from './InstallAppButton'
import {
  formatPrice,
  getSiteSettings,
  type NeedBookingPanelContent,
  type NeedCategory,
  type NeedProcessStep,
  type NeedService,
  type NeedSiteSettings,
} from '@/lib/need-data'
import { visitingServiceCharge } from '@/lib/pricing'
import serviceHeroBg from '@/service-hero-bg.png'

export { CategorySlider }

export const cn = (...classes: Array<false | null | string | undefined>) =>
  classes.filter(Boolean).join(' ')

export const eyebrowClass =
  'inline-flex text-[0.78rem] font-black uppercase tracking-[0.12em] text-[#e7664c]'

export const primaryActionClass =
  'inline-flex min-h-[46px] items-center justify-center rounded-md bg-[#096b68] px-[18px] py-3 font-[850] text-white'

export const secondaryActionClass =
  'inline-flex min-h-[46px] items-center justify-center rounded-md border border-[#dbe5df] bg-white px-[18px] py-3 font-[850] text-[#17221f]'

export const sectionClass = 'px-[clamp(18px,4vw,56px)] py-[clamp(56px,7vw,98px)]'

export const sectionHeadingClass = 'mb-7 grid max-w-[800px] gap-3'

export const pageHeroClass = 'bg-[#eef4f0] px-[clamp(18px,4vw,56px)] py-[clamp(46px,7vw,86px)]'

export const contentPageClass =
  'mx-auto grid max-w-[1120px] gap-[22px] px-[clamp(18px,4vw,56px)] py-[clamp(34px,5vw,64px)]'

export const detailGridClass =
  'mx-auto grid max-w-[1120px] grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-4 px-[clamp(18px,4vw,56px)] py-[clamp(34px,5vw,64px)] max-[1100px]:grid-cols-1'

export const detailCardClass =
  'rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[clamp(22px,4vw,34px)]'

export const emptyStateClass =
  'rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[18px] text-[#60706b]'

export const formPanelClass =
  'grid min-w-0 gap-3.5 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[clamp(18px,3vw,28px)] text-[#17221f] shadow-[0_24px_70px_rgba(23,34,31,0.12)]'

export const labelClass = 'grid gap-[7px] text-[0.82rem] font-extrabold text-[#17221f]'

export const inputClass =
  'min-h-11 w-full min-w-0 rounded-md border border-[#e5ddd0] bg-[#f6f3ed] px-3 py-[11px] text-[#17221f]'

export const textareaClass = cn(inputClass, 'resize-y')

export const panelHeadingClass = 'mb-1 grid gap-0.5'

export const panelKickerClass = 'text-[0.86rem] text-[#60706b]'

export const panelTitleClass = 'text-[1.35rem] font-bold leading-tight'

export const panelNoteClass = 'text-[0.86rem] leading-[1.45] text-[#60706b]'

export const formTwoColumnClass = 'grid grid-cols-2 gap-3.5 max-[760px]:grid-cols-1'

export const formErrorClass = 'rounded-md bg-[#fdece8] px-3 py-[11px] text-[0.92rem] font-extrabold text-[#a7341f]'

export const formSuccessClass =
  'rounded-md bg-[#e8f4ec] px-3 py-[11px] text-[0.92rem] font-extrabold text-[#236334]'

export const partnerHeroClass = cn(
  pageHeroClass,
  'bg-[#052447] text-white max-[760px]:px-[18px] max-[760px]:py-11',
)

export const partnerReviewCardClass = cn(detailCardClass, 'grid gap-4')

export const partnerAdminStepsClass = 'mt-2 grid gap-2.5'

export const partnerAdminStepClass =
  'rounded-md border border-[rgba(9,107,104,0.12)] bg-[#eef4f0] px-3 py-[11px] font-black text-[#064e4b]'

const brandClass = 'inline-flex items-center gap-2.5 font-black tracking-[0]'
const brandMarkClass =
  'inline-flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#17221f]/15 bg-[#f2bd2b] text-[#8a5a00]'
const navLinkClass =
  'text-[0.95rem] font-bold text-white/82 transition hover:text-white max-[760px]:inline-flex max-[760px]:min-h-[38px] max-[760px]:min-w-0 max-[760px]:items-center max-[760px]:justify-center max-[760px]:overflow-hidden max-[760px]:!whitespace-normal max-[760px]:rounded-md max-[760px]:border max-[760px]:border-white/10 max-[760px]:bg-white/10 max-[760px]:px-1 max-[760px]:py-1.5 max-[760px]:text-center max-[760px]:text-[clamp(0.64rem,2.9vw,0.76rem)] max-[760px]:leading-[1.05] max-[760px]:text-white'
const headerButtonClass =
  'inline-flex min-h-[46px] items-center justify-center whitespace-nowrap rounded-md bg-[#096b68] px-[18px] py-3 font-[850] text-white max-[760px]:min-h-[38px] max-[760px]:w-full max-[760px]:px-2.5 max-[760px]:py-[9px] max-[760px]:text-[0.82rem]'

export function SiteHeader({ settings }: { settings: NeedSiteSettings }) {
  return (
    <header className="site-header sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-5 border-b border-white/10 bg-[#171717]/95 px-[clamp(18px,4vw,56px)] py-[18px] text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md max-[760px]:static max-[760px]:w-full max-[760px]:items-stretch max-[760px]:gap-2.5 max-[760px]:overflow-hidden max-[760px]:px-4 max-[760px]:py-3.5">
      <div className="site-header-brand-row contents max-[760px]:flex max-[760px]:items-center max-[760px]:gap-2.5">
        <Link className={cn(brandClass, 'max-[760px]:justify-self-start')} href="/" aria-label={`${settings.brandName} home`}>
          <span className={brandMarkClass}>{settings.brandInitial}</span>
          <span>{settings.brandName}</span>
        </Link>
        <InstallAppButton className="max-[760px]:w-auto max-[760px]:justify-self-start max-[760px]:px-3" />
      </div>
      <nav className="site-nav flex items-center justify-center gap-[clamp(14px,3vw,30px)] max-[760px]:grid max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:grid-cols-[repeat(3,minmax(0,1fr))] max-[760px]:gap-2 max-[760px]:pb-1" aria-label="Primary navigation">
        {settings.navLinks.map((link) => (
          <Link className={navLinkClass} href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>
        ))}
        <Link className={cn(navLinkClass, 'min-[761px]:hidden max-[760px]:!border-[#096b68] max-[760px]:!bg-[#096b68] max-[760px]:!text-white')} href={settings.primaryActionHref}>
          Book now
        </Link>
        <Link className={cn(navLinkClass, 'min-[761px]:hidden max-[760px]:!border-[#f2bd2b] max-[760px]:!bg-[#f2bd2b] max-[760px]:!text-[#17221f]')} href={settings.secondaryActionHref}>
          <span>
            Service
            <br />
            Partner
          </span>
        </Link>
      </nav>
      <div className="flex items-center gap-2.5 justify-self-end max-[760px]:hidden">
        <Link className={headerButtonClass} href={settings.primaryActionHref}>
          {settings.primaryActionLabel}
        </Link>
        <Link className={cn(headerButtonClass, 'bg-[#f2bd2b] text-[#17221f] max-[760px]:col-span-2')} href={settings.secondaryActionHref}>
          {settings.secondaryActionLabel}
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter({ settings }: { settings: NeedSiteSettings }) {
  return (
    <footer className="flex items-start justify-between gap-7 bg-[#17221f] px-[clamp(18px,4vw,56px)] py-[34px] text-white max-[760px]:grid">
      <div>
        <Link className={brandClass} href="/">
          <span className={brandMarkClass}>{settings.brandInitial}</span>
          <span>{settings.brandName}</span>
        </Link>
        <p className="mt-3 max-w-[460px] text-[#c9d5d0]">
          {settings.footerCopy}
        </p>
      </div>
      <div className="flex flex-wrap gap-[18px]">
        {settings.footerLinks.map((link) => (
          <Link className="font-bold text-white" href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>
        ))}
      </div>
    </footer>
  )
}

export async function PageShell({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <>
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
    </>
  )
}

export function ServiceHero({
  copy,
  eyebrow,
  image = serviceHeroBg,
  title,
  variant = 'service',
}: {
  copy?: string
  eyebrow: string
  image?: StaticImageData | string
  title: string
  variant?: 'about' | 'service' | 'serviceDetail'
}) {
  const hasDynamicImage = typeof image === 'string'
  const isProjectServiceHeroImage = typeof image === 'string' && image.startsWith('/service-heroes/')
  const shouldCropServiceImage = isProjectServiceHeroImage && image !== '/service-heroes/watchman-security.png'

  if (variant === 'serviceDetail') {
    return (
      <section className="overflow-hidden bg-[#052447] px-[clamp(18px,4vw,56px)] py-[clamp(28px,5vw,64px)] text-white max-[520px]:px-3">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,0.72fr)_minmax(540px,1.25fr)] items-center gap-[clamp(24px,4vw,54px)] max-[1020px]:grid-cols-1">
          <div className="relative z-[1] max-w-[720px] py-[clamp(14px,3vw,34px)] max-[920px]:order-2 max-[920px]:py-0">
            <span className={cn(eyebrowClass, 'text-[#f2bd2b]')}>{eyebrow}</span>
            <h1 className="mt-[18px] text-[clamp(2.4rem,5.2vw,5.25rem)] font-black leading-[0.98] tracking-[0] text-white shadow-black/30 [text-shadow:0_14px_34px_rgba(0,0,0,0.26)] max-[760px]:text-[clamp(2rem,9vw,2.8rem)] max-[760px]:leading-[1.06]">
              {title}
            </h1>
            {copy ? (
              <p className="mt-[18px] max-w-[660px] text-[1.08rem] leading-[1.55] text-white/86 max-[760px]:text-[0.98rem]">
                {copy}
              </p>
            ) : null}
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#0b315f] max-[1020px]:order-1 max-[520px]:aspect-[1.18/1]">
            <Image
              alt=""
              aria-hidden="true"
              className={cn(
                'z-0 object-center',
                shouldCropServiceImage
                  ? 'origin-top scale-[1.24] object-cover object-top'
                  : isProjectServiceHeroImage
                    ? 'object-cover'
                    : 'object-contain',
              )}
              fill
              placeholder={hasDynamicImage ? 'empty' : 'blur'}
              priority
              sizes="(max-width: 520px) calc(100vw - 24px), (max-width: 1020px) calc(100vw - 40px), 720px"
              src={image}
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(5,36,71,0)_52%,rgba(5,36,71,0.26)_100%)]" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative grid min-h-[clamp(300px,34vw,460px)] items-end overflow-hidden bg-[#052447] px-[clamp(18px,4vw,56px)] pb-[clamp(38px,6vw,76px)] pt-[clamp(74px,10vw,132px)] text-white max-[760px]:min-h-[420px] max-[760px]:px-5 max-[760px]:pb-[38px] max-[760px]:pt-[116px]">
      <Image
        alt=""
        aria-hidden="true"
        className={cn(
          'z-0 object-cover object-center saturate-[1.08] contrast-[1.08]',
          variant === 'about' ? 'max-[760px]:object-[72%_center]' : 'max-[760px]:object-[68%_center]',
        )}
        fill
        placeholder={hasDynamicImage ? 'empty' : 'blur'}
        priority
        sizes="100vw"
        src={image}
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,36,71,0.93)_0%,rgba(5,36,71,0.72)_48%,rgba(5,36,71,0.34)_100%),linear-gradient(0deg,rgba(5,36,71,0.48),rgba(5,36,71,0.1))] max-[760px]:bg-[linear-gradient(180deg,rgba(5,36,71,0.28)_0%,rgba(5,36,71,0.78)_46%,rgba(5,36,71,0.95)_100%),linear-gradient(90deg,rgba(5,36,71,0.68),rgba(5,36,71,0.28))]" />
      <div className="relative z-[2] max-w-[1120px] text-white">
        <span className={cn(eyebrowClass, 'text-[#f2bd2b]')}>{eyebrow}</span>
        <h1 className="mt-[18px] max-w-[900px] text-[clamp(2.6rem,6.2vw,5.9rem)] font-black leading-[0.95] tracking-[0] text-white shadow-black/30 [text-shadow:0_14px_34px_rgba(0,0,0,0.34)] max-[760px]:text-[clamp(1.86rem,8.5vw,2.55rem)] max-[760px]:leading-[1.06]">
          {title}
        </h1>
        {copy ? <p className="mt-[18px] max-w-[720px] text-[1.12rem] text-white/85 max-[760px]:text-[0.98rem] max-[760px]:leading-[1.45]">{copy}</p> : null}
      </div>
    </section>
  )
}

export function ServiceGrid({
  categories,
  services,
}: {
  categories: NeedCategory[]
  services: NeedService[]
}) {
  if (categories.length === 0) {
    return <p className={emptyStateClass}>Add service categories in the Payload admin to show them here.</p>
  }

  return (
    <div className="grid grid-cols-5 gap-3.5 max-[1100px]:grid-cols-2 max-[760px]:grid-cols-1">
      {categories.map((category) => {
        const count = services.filter((service) => service.category === category.slug).length

        return (
          <Link
            className="grid min-h-[226px] gap-3 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[18px]"
            href={`/services/${category.slug}`}
            key={category.slug}
          >
            <ServiceIconBadge className="h-[84px] w-[84px]" label={`${category.name} ${category.icon}`} />
            <span className="text-[1.08rem] font-black leading-[1.15]">{category.name}</span>
            <span className="text-[0.92rem] leading-[1.55] text-[#60706b]">{category.description}</span>
            <span className="mt-auto text-[0.83rem] font-black text-[#5f8f45]">{count} services</span>
          </Link>
        )
      })}
    </div>
  )
}

type PopularIconKind =
  | 'ac'
  | 'carpentry'
  | 'cleaning'
  | 'cctv'
  | 'electrical'
  | 'gardening'
  | 'maintenance'
  | 'painting'
  | 'pest'
  | 'plumbing'
  | 'default'

const toServiceIconKind = (value: string): PopularIconKind => {
  const normalizedValue = value.toLowerCase()

  if (normalizedValue.includes('ac') || normalizedValue.includes('air condition')) return 'ac'
  if (normalizedValue.includes('carpent') || normalizedValue.includes('furniture') || normalizedValue.includes('wood'))
    return 'carpentry'
  if (normalizedValue.includes('clean') || normalizedValue.includes('wash')) return 'cleaning'
  if (normalizedValue.includes('cctv') || normalizedValue.includes('camera') || normalizedValue.includes('security'))
    return 'cctv'
  if (normalizedValue.includes('electric') || normalizedValue.includes('fan') || normalizedValue.includes('light'))
    return 'electrical'
  if (normalizedValue.includes('garden') || normalizedValue.includes('plant') || normalizedValue.includes('lawn'))
    return 'gardening'
  if (normalizedValue.includes('maintenance') || normalizedValue.includes('repair')) return 'maintenance'
  if (normalizedValue.includes('paint')) return 'painting'
  if (normalizedValue.includes('pest') || normalizedValue.includes('termite')) return 'pest'
  if (normalizedValue.includes('plumb') || normalizedValue.includes('leak') || normalizedValue.includes('bathroom'))
    return 'plumbing'

  return 'default'
}

const toShortDescription = (description: string) => {
  const cleanDescription = description.trim()

  if (cleanDescription.length <= 72) {
    return cleanDescription
  }

  return `${cleanDescription.slice(0, 69).trimEnd()}...`
}

const serviceIconImages: Record<PopularIconKind, string> = {
  ac: '/service-icons/ac.svg',
  carpentry: '/service-icons/carpentry.svg',
  cleaning: '/service-icons/cleaning.svg',
  cctv: '/service-icons/cctv.svg',
  default: '/service-icons/maintenance.svg',
  electrical: '/service-icons/electrical.svg',
  gardening: '/service-icons/gardening.svg',
  maintenance: '/service-icons/maintenance.svg',
  painting: '/service-icons/painting.svg',
  pest: '/service-icons/pest.svg',
  plumbing: '/service-icons/plumbing.svg',
}

const serviceAccentClass: Record<PopularIconKind, string> = {
  ac: 'border-[#23a7b0]',
  carpentry: 'border-[#e7664c]',
  cleaning: 'border-[#f2bd2b]',
  cctv: 'border-[#2d85e3]',
  default: 'border-[#e7664c]',
  electrical: 'border-[#2d85e3]',
  gardening: 'border-[#7fbf38]',
  maintenance: 'border-[#e7664c]',
  painting: 'border-[#f2bd2b]',
  pest: 'border-[#7fbf38]',
  plumbing: 'border-[#23a7b0]',
}

export function ServiceIconBadge({
  className,
  imageSrc,
  label,
}: {
  className?: string
  imageSrc?: string
  label: string
}) {
  const iconKind = toServiceIconKind(label)
  const iconImageSrc = imageSrc || serviceIconImages[iconKind]

  return (
    <span
      className={cn(
        'relative z-[1] inline-flex h-[78px] w-[78px] items-center justify-center overflow-hidden rounded-full border-2 bg-[#052447] p-0 shadow-[0_14px_30px_rgba(23,34,31,0.16)]',
        serviceAccentClass[iconKind],
        className,
      )}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-2 z-[2] rounded-full border border-white/25" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="block h-full w-full object-cover" height={180} src={iconImageSrc} width={180} />
    </span>
  )
}

export function PopularServiceGrid({
  limit = 10,
  services,
}: {
  limit?: number
  services: NeedService[]
}) {
  const popularServices = services.filter((service) => service.popular).slice(0, limit)

  if (popularServices.length === 0) {
    return <p className={emptyStateClass}>Add services in the Payload admin to show popular services.</p>
  }

  return (
    <div className="grid grid-cols-[repeat(5,minmax(150px,1fr))] gap-4 pb-1 max-[1100px]:grid-cols-2 max-[760px]:grid-cols-1">
      {popularServices.map((service) => {
        const iconLabel = `${service.name} ${service.categoryName} ${service.icon}`

        return (
          <Link
            aria-label={`${service.name}, ${service.categoryName}`}
            className="relative grid min-h-[238px] min-w-0 grid-rows-[auto_1fr] gap-[13px] overflow-hidden rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[18px] transition hover:-translate-y-0.5 hover:border-[rgba(9,107,104,0.36)] hover:shadow-[0_18px_42px_rgba(23,34,31,0.1)] focus-visible:-translate-y-0.5 focus-visible:border-[rgba(9,107,104,0.36)] focus-visible:shadow-[0_18px_42px_rgba(23,34,31,0.1)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(242,189,43,0.72)] after:absolute after:-right-[38px] after:-top-[42px] after:z-0 after:h-[92px] after:w-[126px] after:rotate-[10deg] after:bg-[linear-gradient(135deg,rgba(242,189,43,0.22),rgba(9,107,104,0))]"
            href={`/services/${service.category}/${service.slug}`}
            key={service.slug}
          >
            <ServiceIconBadge className="z-[1] h-[92px] w-[92px]" imageSrc={service.logo} label={iconLabel} />
            <div className="relative z-[1] grid min-w-0 gap-2">
              <h3 className="text-[1.08rem] font-black leading-[1.16]">{service.name}</h3>
              <p className="line-clamp-2 text-[0.84rem] leading-[1.42] text-[#60706b]">
                {toShortDescription(service.description)}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function BookingPanel({
  compact = false,
  content = {
    buttonLabel: 'Confirm request',
    note: 'No payment is collected until your request is reviewed.',
    panelKicker: 'Instant estimate',
    panelTitle: 'Book a verified expert',
  },
  returnTo = '/book',
  selectedServiceId,
  services = [],
}: {
  compact?: boolean
  content?: NeedBookingPanelContent
  returnTo?: string
  selectedServiceId?: number
  services?: NeedService[]
}) {
  const serviceOptions = services
  const hasServices = serviceOptions.length > 0
  const defaultServiceId = selectedServiceId ?? serviceOptions[0]?.id ?? ''

  return (
    <form action={submitBooking} className={cn(formPanelClass, compact && 'max-w-[430px] max-[1100px]:max-w-none')}>
      <input name="returnTo" type="hidden" value={returnTo} />
      <div className={panelHeadingClass}>
        <span className={panelKickerClass}>{content.panelKicker}</span>
        <strong className={panelTitleClass}>{content.panelTitle}</strong>
      </div>
      <label className={labelClass}>
        Service
        <select className={inputClass} disabled={!hasServices} name="service" defaultValue={defaultServiceId} required>
          {hasServices ? (
            serviceOptions.map((service) => (
              <option key={service.slug} value={service.id}>
                {service.name}
              </option>
            ))
          ) : (
            <option value="">Add services in admin</option>
          )}
        </select>
      </label>
      <div className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-[rgba(9,107,104,0.14)] bg-[#eef4f0] px-3 py-2.5">
        <span className="text-[0.86rem] font-extrabold text-[#17221f]">Visiting service charge</span>
        <strong className="text-[1rem] text-[#096b68]">{formatPrice(visitingServiceCharge)}</strong>
      </div>
      <div className={formTwoColumnClass}>
        <label className={labelClass}>
          Date
          <input className={inputClass} name="date" required type="date" />
        </label>
        <label className={labelClass}>
          Time slot
          <select className={inputClass} name="time" defaultValue="10:00" required>
            <option value="09:00">09:00 - 11:00</option>
            <option value="10:00">10:00 - 12:00</option>
            <option value="14:00">14:00 - 16:00</option>
            <option value="17:00">17:00 - 19:00</option>
          </select>
        </label>
      </div>
      <label className={labelClass}>
        Phone
        <input className={inputClass} name="phone" placeholder="+91 98765 43210" required type="tel" />
      </label>
      <label className={labelClass}>
        Address
        <textarea className={textareaClass} name="address" placeholder="Flat, street, area, city" required rows={compact ? 3 : 4} />
      </label>
      <BookingLocationPicker />
      <button className={cn(primaryActionClass, 'w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60')} disabled={!hasServices} type="submit">
        {content.buttonLabel}
      </button>
      <p className={panelNoteClass}>{content.note}</p>
    </form>
  )
}

const defaultProcessSteps: NeedProcessStep[] = [
  { copy: 'Pick the category, job, date, and address.', number: '1', title: 'Choose service' },
  { copy: 'A verified provider is assigned for your slot.', number: '2', title: 'Get matched' },
  { copy: 'Booking moves through confirmed, in progress, completed.', number: '3', title: 'Track job' },
  { copy: 'Complete payment securely and rate the visit.', number: '4', title: 'Pay & review' },
]

export function ProcessSteps({ steps = defaultProcessSteps }: { steps?: NeedProcessStep[] }) {
  const visibleSteps = steps.length > 0 ? steps : defaultProcessSteps

  return (
    <div className="mt-7 grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
      {visibleSteps.map((step) => (
        <div className="grid gap-2 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[18px]" key={`${step.number}-${step.title}`}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2bd2b] font-black">{step.number}</span>
          <strong>{step.title}</strong>
          <p className="leading-[1.55] text-[#60706b]">{step.copy}</p>
        </div>
      ))}
    </div>
  )
}
