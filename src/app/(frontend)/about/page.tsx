import { contentPageClass, PageShell, ProcessSteps, ServiceHero } from '../components'
import aboutHeroBg from '@/about-hero-bg.png'
import { getSitePages } from '@/lib/need-data'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const pages = await getSitePages()

  return (
    <PageShell>
      <ServiceHero
        copy={pages.about.copy}
        eyebrow={pages.about.eyebrow}
        image={pages.about.heroImage || aboutHeroBg}
        title={pages.about.title}
        variant="about"
      />
      <section className={contentPageClass}>
        {pages.about.body.map((block) => (
          <p className="leading-[1.55] text-[#60706b]" key={block.copy}>{block.copy}</p>
        ))}
        <ProcessSteps steps={pages.about.processSteps} />
      </section>
    </PageShell>
  )
}
