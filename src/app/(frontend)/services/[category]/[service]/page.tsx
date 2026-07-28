import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  BookingPanel,
  detailCardClass,
  detailGridClass,
  primaryActionClass,
  secondaryActionClass,
  PageShell,
  ServiceHero,
  ServiceIconBadge,
} from '../../../components'
import { formatPrice, getService, getServices, getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

type ServicePageProps = {
  params: Promise<{
    category: string
    service: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { category: categorySlug, service: serviceSlug } = await params
  const [service, services, pages] = await Promise.all([
    getService(categorySlug, serviceSlug),
    getServices(),
    getSitePages(),
  ])

  if (!service) notFound()

  return (
    <PageShell>
      <ServiceHero
        copy={service.description}
        eyebrow={service.categoryName}
        image={service.heroImage}
        title={service.name}
        variant="serviceDetail"
      />
      <section className={detailGridClass}>
        <article className={detailCardClass}>
          <ServiceIconBadge
            className="!h-[58px] !w-[58px] border !shadow-[0_10px_22px_rgba(23,34,31,0.13)]"
            imageSrc={service.logo}
            label={`${service.name} ${service.categoryName} ${service.icon}`}
          />
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0]">
            From {formatPrice(service.basePrice)}
          </h2>
          <p className="mt-4 leading-[1.55] text-[#60706b]">
            {service.durationMinutes} minute standard visit. Final price depends on parts, scope, and site condition.
          </p>
          <ul className="mt-6 grid gap-2.5 pl-5">
            {service.includes.map((item) => (
              <li className="leading-[1.55] text-[#60706b]" key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className={primaryActionClass} href="/book">
              Book this service
            </Link>
            <Link className={secondaryActionClass} href={`/services/${service.category}`}>
              Back to {service.categoryName}
            </Link>
          </div>
        </article>
        <BookingPanel compact content={pages.booking} services={services} />
      </section>
    </PageShell>
  )
}
