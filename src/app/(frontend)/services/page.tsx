import { PageShell, sectionClass, ServiceGrid, ServiceHero } from '../components'
import { getCategories, getServices, getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const [categories, services, pages] = await Promise.all([getCategories(), getServices(), getSitePages()])

  return (
    <PageShell>
      <ServiceHero
        copy={pages.services.copy}
        eyebrow={pages.services.eyebrow}
        image={pages.services.heroImage}
        title={pages.services.title}
      />
      <section className={sectionClass}>
        <ServiceGrid categories={categories} services={services} />
      </section>
    </PageShell>
  )
}
