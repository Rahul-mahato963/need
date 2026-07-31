import Link from 'next/link'
import { notFound } from 'next/navigation'

import { emptyStateClass, PageShell, ServiceHero, ServiceIconBadge } from '../../components'
import { getCategory, getServicesByCategory } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

type CategoryPageProps = {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const [category, categoryServices] = await Promise.all([
    getCategory(categorySlug),
    getServicesByCategory(categorySlug),
  ])

  if (!category) notFound()

  return (
    <PageShell>
      <ServiceHero eyebrow={category.name} title={category.description} />
      <section
        className="mx-auto grid max-w-[1120px] gap-3.5 px-[clamp(18px,4vw,56px)] py-[clamp(34px,5vw,64px)]"
        aria-label={`${category.name} services`}
      >
        {categoryServices.length > 0 ? (
          categoryServices.map((service) => (
            <Link
              className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-8 gap-y-4 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white px-7 py-5 shadow-[0_16px_42px_rgba(23,34,31,0.05)] transition hover:border-[rgba(9,107,104,0.28)] hover:shadow-[0_20px_46px_rgba(23,34,31,0.09)] max-[760px]:grid-cols-[52px_minmax(0,1fr)] max-[760px]:px-4 max-[760px]:py-4"
              href={`/services/${category.slug}/${service.slug}`}
              key={service.slug}
            >
              <ServiceIconBadge
                className="!h-11 !w-11 justify-self-center border !shadow-[0_8px_18px_rgba(23,34,31,0.12)]"
                imageSrc={service.logo}
                label={`${service.name} ${service.categoryName} ${service.icon}`}
              />
              <div className="min-w-0">
                <h3 className="text-[1.28rem] font-black leading-tight text-[#17221f]">{service.name}</h3>
                <p className="mt-1 text-[1rem] leading-snug text-[#60706b]">{service.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={emptyStateClass}>Add services to this category in the Payload admin.</p>
        )}
      </section>
    </PageShell>
  )
}
