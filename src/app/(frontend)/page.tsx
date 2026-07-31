import Image from 'next/image'
import Link from 'next/link'

import {
  CategorySlider,
  cn,
  emptyStateClass,
  eyebrowClass,
  PageShell,
  PopularServiceGrid,
  primaryActionClass,
  ProcessSteps,
  secondaryActionClass,
  sectionClass,
  sectionHeadingClass,
  ServiceIconBadge,
} from './components'
import { getHomeData } from '@/lib/need-data'
import needHeroPoster from '@/img.jpg'

export const dynamic = 'force-dynamic'

const statusColorClasses = {
  coral: 'bg-[#e7664c]',
  gold: 'bg-[#f2bd2b]',
  green: 'bg-[#5f8f45]',
  teal: 'bg-[#58bfb2]',
}

export default async function HomePage() {
  const { categories, homePage, services, testimonials } = await getHomeData()
  const customerTrustCards = testimonials.slice(0, homePage.customerTrust.limit)

  return (
    <PageShell>
      <section
        className="grid min-h-[calc(100svh-84px)] w-full grid-cols-[minmax(420px,1.14fr)_minmax(340px,0.86fr)] items-center gap-[clamp(28px,4vw,72px)] overflow-hidden bg-[#052447] px-[clamp(24px,5vw,86px)] py-[clamp(22px,3vw,42px)] max-[1100px]:grid-cols-1 max-[760px]:block max-[760px]:min-h-0 max-[760px]:p-0"
        aria-label="NEED all services hero"
      >
        <h1 className="sr-only">NEED - All Services at One Place</h1>
        <div className="relative z-[1] flex h-[min(980px,calc(100svh-130px))] w-[min(100%,860px)] justify-center leading-none max-[760px]:block max-[760px]:h-auto max-[760px]:w-full">
          <Image
            alt="NEED all services at one place home and building solutions poster"
            className="block h-full w-full max-w-none object-fill brightness-[0.72] contrast-[1.12] saturate-[1.04] max-[760px]:h-auto max-[760px]:max-h-none"
            placeholder={homePage.hero.image ? 'empty' : 'blur'}
            priority
            sizes="(max-width: 760px) 100vw, 860px"
            src={homePage.hero.image || needHeroPoster}
          />
        </div>
        <div className="relative z-[1] grid max-w-[680px] gap-5 text-white max-[760px]:hidden">
          <span className={cn(eyebrowClass, 'text-[#f2bd2b]')}>{homePage.hero.eyebrow}</span>
          <h2 className="max-w-[760px] text-[clamp(2.5rem,5vw,5.6rem)] font-black leading-[0.96] tracking-[0] text-white">
            {homePage.hero.title}
          </h2>
          <p className="max-w-[620px] text-[1.12rem] text-white/80">
            {homePage.hero.copy}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link className={primaryActionClass} href={homePage.hero.primaryActionHref}>
              {homePage.hero.primaryActionLabel}
            </Link>
            <Link className={cn(secondaryActionClass, 'border-white/20 bg-white/90')} href={homePage.hero.secondaryActionHref}>
              {homePage.hero.secondaryActionLabel}
            </Link>
          </div>
          <div className="mt-2 grid max-w-[620px] grid-cols-3 gap-2.5" aria-label="Service highlights">
            {categories.slice(0, homePage.categoryHighlightsLimit).map((category) => (
              <Link
                className="flex min-h-[70px] items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-[0.9rem] font-[850] text-white"
                href={`/services/${category.slug}`}
                key={category.slug}
              >
                <ServiceIconBadge className="h-[54px] w-[54px] flex-none border" label={`${category.name} ${category.icon}`} />
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategorySlider categories={categories} />

      <section className={sectionClass}>
        <div className={sectionHeadingClass}>
          <span className={eyebrowClass}>{homePage.popular.eyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0]">
            {homePage.popular.title}
          </h2>
        </div>
        <PopularServiceGrid limit={homePage.popular.limit} services={services} />
      </section>

      <section className={cn(sectionClass, 'grid grid-cols-[minmax(0,1fr)_minmax(300px,420px)] items-start gap-[34px] bg-[#eef4f0] max-[1100px]:grid-cols-1')}>
        <div>
          <span className={eyebrowClass}>{homePage.workflow.eyebrow}</span>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0]">
            {homePage.workflow.title}
          </h2>
          <p className="mt-[22px] max-w-[690px] text-[1.12rem] text-[#60706b]">
            {homePage.workflow.copy}
          </p>
          <ProcessSteps steps={homePage.processSteps} />
        </div>
        <aside className="grid gap-2.5 rounded-lg bg-[#17221f] p-4 shadow-[0_24px_70px_rgba(23,34,31,0.12)]" aria-label="Booking pipeline preview">
          {homePage.pipelineStatuses.map((status) => (
            <div
              className="grid grid-cols-[32px_1fr_auto] items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3.5 text-white max-[760px]:grid-cols-[42px_1fr]"
              key={`${status.label}-${status.detail}`}
            >
              <span className={cn('inline-flex h-8 w-8 items-center justify-center rounded-full font-black', statusColorClasses[status.color])} />
              <strong>{status.label}</strong>
              <small className="text-[#c9d5d0] max-[760px]:col-start-2">
                {status.detail}
              </small>
            </div>
          ))}
        </aside>
      </section>

      <section className={cn(sectionClass, 'bg-[#f4eadb]')}>
        <div className={sectionHeadingClass}>
          <span className={eyebrowClass}>{homePage.customerTrust.eyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0]">
            {homePage.customerTrust.title}
          </h2>
        </div>
        {customerTrustCards.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
            {customerTrustCards.map((testimonial) => (
              <figure className="m-0 grid min-h-[300px] gap-4 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[22px]" key={testimonial.name}>
                <div className="grid grid-cols-[58px_1fr] items-center gap-3">
                  <span className="inline-flex h-[58px] w-[58px] overflow-hidden rounded-full border-2 border-[rgba(9,107,104,0.22)] shadow-[0_12px_26px_rgba(23,34,31,0.12)]">
                    {testimonial.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="block h-full w-full object-cover" height={420} src={testimonial.photo} width={420} />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-[#096b68] text-[1.35rem] font-black text-white">
                        {testimonial.name.slice(0, 1)}
                      </span>
                    )}
                  </span>
                  <figcaption className="grid">
                    <strong>{testimonial.name}</strong>
                    <span className="text-[#60706b]">{testimonial.city}</span>
                  </figcaption>
                </div>
                <div className="inline-flex items-center gap-2 justify-self-start rounded-lg border border-[rgba(9,107,104,0.12)] bg-[#eef4f0] px-2.5 py-[7px]" aria-label={`${testimonial.rating} out of 5 rating`}>
                  <strong className="text-[#096b68]">{testimonial.rating}.0</strong>
                  <span className="text-[0.82rem] font-extrabold text-[#60706b]">Rating</span>
                </div>
                <blockquote className="leading-[1.55] text-[#60706b]">{testimonial.quote}</blockquote>
                {testimonial.service ? (
                  <p className="mt-auto border-t border-[rgba(23,34,31,0.08)] pt-3 text-[0.82rem] font-extrabold text-[#5f8f45]">
                    {testimonial.service}
                  </p>
                ) : null}
              </figure>
            ))}
          </div>
        ) : (
          <p className={emptyStateClass}>Add testimonials in the Payload admin to show customer trust.</p>
        )}
      </section>
    </PageShell>
  )
}
