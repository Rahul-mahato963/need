import Link from 'next/link'

import {
  contentPageClass,
  PageShell,
  primaryActionClass,
  ServiceHero,
} from '../components'
import { getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const pages = await getSitePages()

  return (
    <PageShell>
      <ServiceHero
        copy={pages.contact.copy}
        eyebrow={pages.contact.eyebrow}
        image="/contact-hero-bg.png"
        title={pages.contact.title}
      />
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
