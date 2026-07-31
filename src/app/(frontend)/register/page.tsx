import Link from 'next/link'

import { registerCustomer } from '../booking-actions'
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

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string
    next?: string
  }>
}

const registerErrorMessages: Record<string, string> = {
  exists: 'This email already has an account. Log in instead.',
  invalid: 'Enter a valid email and a password with at least 8 characters.',
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const next = params.next?.startsWith('/') ? params.next : '/account/bookings'
  const errorMessage = params.error ? registerErrorMessages[params.error] : undefined

  return (
    <PageShell>
      <section className={pageHeroClass}>
        <div className="mx-auto grid max-w-[520px] gap-5">
          <div>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.02] tracking-[0]">
              Create customer account
            </h1>
            <p className="mt-3 text-[#60706b]">
              Use this account to submit bookings and track their status.
            </p>
          </div>
          <form action={registerCustomer} className="grid gap-3.5 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-[clamp(18px,3vw,28px)]">
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
              Create account
            </button>
            <Link className={cn(secondaryActionClass, 'w-full')} href={`/login?next=${encodeURIComponent(next)}`}>
              Already have an account
            </Link>
          </form>
        </div>
      </section>
    </PageShell>
  )
}
