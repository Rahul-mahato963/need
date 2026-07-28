import Link from 'next/link'

import {
  contentPageClass,
  eyebrowClass,
  pageHeroClass,
  PageShell,
  primaryActionClass,
} from '../components'
import { getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const pages = await getSitePages()

  return (
    <PageShell>
      <section className={pageHeroClass}>
        <div className="max-w-[1120px]">
          <span className={eyebrowClass}>{pages.contact.eyebrow}</span>
          <h1 className="mt-[18px] max-w-[900px] text-[clamp(2.6rem,6.2vw,5.9rem)] font-black leading-[0.95] tracking-[0] max-[760px]:text-4xl max-[760px]:leading-[1.08]">
            {pages.contact.title}
          </h1>
          <p className="mt-[18px] max-w-[720px] text-[1.12rem] text-[#60706b]">
            {pages.contact.copy}
          </p>
        </div>
      </section>
      <section className={contentPageClass}>
        <div className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
          {pages.contact.cards.map((card) => (
            <article className="grid gap-2 rounded-lg border border-[rgba(23,34,31,0.1)] bg-white p-5" key={card.title}>
              <strong>{card.title}</strong>
              {card.body.split('\n').map((line) => (
                <p className="leading-[1.55] text-[#60706b]" key={line}>{line}</p>
              ))}
              {card.actionHref && card.actionLabel ? (
                <Link className={primaryActionClass} href={card.actionHref}>
                  {card.actionLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
