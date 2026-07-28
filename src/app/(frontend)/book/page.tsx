import {
  BookingPanel,
  detailCardClass,
  detailGridClass,
  eyebrowClass,
  pageHeroClass,
  PageShell,
  ProcessSteps,
} from '../components'
import { getServices, getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function BookPage() {
  const [services, pages] = await Promise.all([getServices(), getSitePages()])

  return (
    <PageShell>
      <section className={pageHeroClass}>
        <div className="max-w-[1120px]">
          <span className={eyebrowClass}>{pages.booking.eyebrow}</span>
          <h1 className="mt-[18px] max-w-[900px] text-[clamp(2.6rem,6.2vw,5.9rem)] font-black leading-[0.95] tracking-[0] max-[760px]:text-4xl max-[760px]:leading-[1.08]">
            {pages.booking.title}
          </h1>
          <p className="mt-[18px] max-w-[720px] text-[1.12rem] text-[#60706b]">
            {pages.booking.copy}
          </p>
        </div>
      </section>
      <section className={detailGridClass}>
        <BookingPanel content={pages.booking} services={services} />
        <article className={detailCardClass}>
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[0]">{pages.booking.nextTitle}</h2>
          <ProcessSteps steps={pages.booking.processSteps} />
        </article>
      </section>
    </PageShell>
  )
}
