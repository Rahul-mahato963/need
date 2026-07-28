import Link from 'next/link'

import type { NeedCategory } from '@/lib/need-data'

export function CategorySlider({ categories }: { categories: NeedCategory[] }) {
  if (categories.length === 0) {
    return null
  }

  const tickerItems = [0, 1, 2].flatMap((group) =>
    categories.map((category) => ({
      ...category,
      key: `${group}-${category.slug}`,
    })),
  )

  return (
    <section className="overflow-hidden border-y border-t-white/15 border-b-[rgba(2,92,44,0.35)] bg-[#027538] text-white" aria-label="Service categories">
      <div className="w-full overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max flex-nowrap will-change-transform motion-safe:animate-[category-ticker_22s_linear_infinite] motion-reduce:animate-none">
          {tickerItems.map((category, index) => (
            <Link
              aria-hidden={index >= categories.length ? true : undefined}
              className="flex min-h-[74px] flex-none items-center border-l border-white/10 px-[42px] text-white max-[760px]:min-h-[62px] max-[760px]:px-7"
              href={`/services/${category.slug}`}
              key={category.key}
              tabIndex={index >= categories.length ? -1 : undefined}
            >
              <strong className="whitespace-nowrap text-[1.08rem] font-black leading-[1.1] text-white">{category.name}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
