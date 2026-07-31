import Link from 'next/link'

import { loginCustomer } from '../booking-actions'
import {
  cn,
  formErrorClass,
  inputClass,
  labelClass,
  pageHeroClass,
  PageShell,
  primaryActionClass,
  secondaryActionClass,
} from '../components'

export const dynamic = 'force-dynamic'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    next?: string
  }>
}

const loginErrorMessages: Record<string, string> = {
  invalid: 'Email or password is not correct.',
  missing: 'Enter your email and password.',
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const next = params.next?.startsWith('/') ? params.next : '/account/bookings'
  const errorMessage = params.error ? loginErrorMessages[params.error] : undefined

  return (
    <PageShell>
      <section className={pageHeroClass}>
        <div className="mx-auto grid max-w-[520px] gap-5">
          <div>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.02] tracking-[0]">
              Customer login
            </h1>
            <p className="mt-3 text-[#60706b]">
              Log in to book a service and see your booking history.
            </p>
          </div>
          <form action={loginCustomer} className="grid gap-3.5 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[clamp(18px,3vw,28px)]">
            <input name="next" type="hidden" value={next} />
            {errorMessage ? <p className={formErrorClass}>{errorMessage}</p> : null}
            <label className={labelClass}>
              Email
              <input className={inputClass} name="email" required type="email" />
            </label>
            <label className={labelClass}>
              Password
              <input className={inputClass} minLength={8} name="password" required type="password" />
            </label>
            <button className={primaryActionClass} type="submit">
              Log in
            </button>
            <Link className={cn(secondaryActionClass, 'w-full')} href={`/register?next=${encodeURIComponent(next)}`}>
              Create customer account
            </Link>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
