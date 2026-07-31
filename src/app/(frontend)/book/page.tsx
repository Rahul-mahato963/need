import Link from 'next/link'

import {
  BookingPanel,
  cn,
  detailCardClass,
  PageShell,
  secondaryActionClass,
} from '../components'
import { getServices, getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function BookPage() {
  const [services, pages] = await Promise.all([getServices(), getSitePages()])

  return (
    <PageShell>
      <section className="bg-[#f6f3ed] px-[clamp(18px,4vw,56px)] py-[clamp(28px,5vw,58px)]">
        <h1 className="sr-only">{pages.booking.title}</h1>
        <div className="mx-auto grid max-w-[1120px] grid-cols-[minmax(0,1fr)_minmax(300px,420px)] items-start gap-4 max-[1000px]:grid-cols-1">
        <BookingPanel content={pages.booking} services={services} />
          <aside className={cn(detailCardClass, 'grid gap-5 shadow-[0_18px_48px_rgba(23,34,31,0.08)]')}>
            <div>
              <h2 className="text-[clamp(1.7rem,3vw,2.45rem)] font-black leading-[1.05] tracking-[0]">
                {pages.booking.nextTitle}
              </h2>
            </div>
            <ol className="grid gap-4">
              {pages.booking.processSteps.map((step) => (
                <li className="grid grid-cols-[38px_minmax(0,1fr)] gap-3" key={`${step.number}-${step.title}`}>
                  <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#f2bd2b] text-[0.92rem] font-black text-[#17221f]">
                    {step.number}
                  </span>
                  <span>
                    <strong className="block leading-tight text-[#17221f]">{step.title}</strong>
                    <span className="mt-1 block leading-[1.5] text-[#60706b]">{step.copy}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link className={cn(secondaryActionClass, 'w-full !border-[#096b68] !bg-[#096b68] !text-white')} href="/account/bookings">
              View my bookings
            </Link>
            <Link className={cn(secondaryActionClass, 'w-full !border-[#f2bd2b] !bg-[#f2bd2b] !text-[#17221f]')} href="/technician/quotation">
              Technicians only: send quotation
            </Link>
          </aside>
        </div>
      </section>
    </PageShell>
  )
}
