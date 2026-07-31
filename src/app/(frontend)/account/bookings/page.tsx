import config from '@payload-config'
import Link from 'next/link'
import { headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { logoutCustomer } from '../../booking-actions'
import {
  cn,
  emptyStateClass,
  pageHeroClass,
  PageShell,
  primaryActionClass,
  secondaryActionClass,
  sectionClass,
} from '../../components'
import { formatPrice } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

type BookingsPageProps = {
  searchParams: Promise<{
    created?: string
  }>
}

type BookingDoc = {
  id: number
  address: string
  createdAt: string
  estimatedPrice: number
  locationMapLink?: string | null
  phone: string
  scheduledDate: string
  serviceName: string
  status: 'cancelled' | 'completed' | 'confirmed' | 'in-progress' | 'pending'
  timeSlot: string
}

const statusClass: Record<BookingDoc['status'], string> = {
  cancelled: 'bg-[#fdece8] text-[#a7341f]',
  completed: 'bg-[#e8f4ec] text-[#236334]',
  confirmed: 'bg-[#e8f3fb] text-[#0b5480]',
  'in-progress': 'bg-[#fff4d4] text-[#795600]',
  pending: 'bg-[#eef4f0] text-[#096b68]',
}

const statusLabel: Record<BookingDoc['status'], string> = {
  cancelled: 'Cancelled',
  completed: 'Completed',
  confirmed: 'Confirmed',
  'in-progress': 'In progress',
  pending: 'Pending',
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

export default async function CustomerBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams
  const payload = await getPayload({ config })
  const headers = await nextHeaders()
  const auth = await payload.auth({ headers })

  if (!auth.user || auth.user.collection !== 'customers') {
    redirect('/login?next=/account/bookings')
  }

  const req = await createLocalReq({ user: auth.user }, payload)
  const result = await payload.find({
    collection: 'bookings',
    depth: 0,
    limit: 50,
    overrideAccess: false,
    req,
    sort: '-createdAt',
  })
  const bookings = result.docs as BookingDoc[]

  return (
    <PageShell>
      <section className={pageHeroClass}>
        <div className="mx-auto flex max-w-[1120px] items-start justify-between gap-5 max-[760px]:grid">
          <div>
            <h1 className="text-[clamp(2.4rem,5vw,4.8rem)] font-black leading-[1.02] tracking-[0]">
              My bookings
            </h1>
            <p className="mt-3 max-w-[680px] text-[#60706b]">
              Track your service requests from review to completion.
            </p>
          </div>
          <form action={logoutCustomer}>
            <button className={cn(secondaryActionClass, 'cursor-pointer')} type="submit">
              Log out
            </button>
          </form>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="mx-auto grid max-w-[1120px] gap-4">
          {params.created ? (
            <p className="rounded-md bg-[#e8f4ec] px-3 py-[11px] text-[0.92rem] font-extrabold text-[#236334]">
              Booking request submitted. We will review it and confirm the provider.
            </p>
          ) : null}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <article
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[18px] shadow-[0_16px_42px_rgba(23,34,31,0.05)] max-[760px]:grid-cols-1"
                key={booking.id}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-[1.25rem] font-black leading-tight">{booking.serviceName}</h2>
                    <span className={cn('rounded-md px-2.5 py-1 text-[0.8rem] font-black', statusClass[booking.status])}>
                      {statusLabel[booking.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-[#60706b]">
                    {formatDate(booking.scheduledDate)} at {booking.timeSlot}
                  </p>
                  <p className="mt-2 leading-[1.55] text-[#60706b]">{booking.address}</p>
                  <p className="mt-1 text-[0.9rem] font-bold text-[#60706b]">{booking.phone}</p>
                  {booking.locationMapLink ? (
                    <a
                      className="mt-2 inline-flex font-black text-[#096b68]"
                      href={booking.locationMapLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open shared location
                    </a>
                  ) : null}
                </div>
                <div className="grid content-start gap-3 justify-self-end text-right max-[760px]:justify-self-start max-[760px]:text-left">
                  <strong className="text-[1.12rem] text-[#096b68]">{formatPrice(booking.estimatedPrice)}</strong>
                  <Link className={secondaryActionClass} href="/book">
                    Book again
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className={cn(emptyStateClass, 'grid gap-3')}>
              <p>No booking requests yet.</p>
              <Link className={primaryActionClass} href="/book">
                Book a service
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}
