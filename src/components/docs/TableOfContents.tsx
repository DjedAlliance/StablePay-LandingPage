'use client'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type TocItem = { id: string; text: string; depth: number }

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    const elements = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const onScroll = () => {
      const offset = 120
      let current = elements[0].id
      for (const element of elements) {
        if (element.getBoundingClientRect().top - offset <= 0) current = element.id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = elements[elements.length - 1].id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">On this page</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={twMerge(
                '-ml-px block border-l-2 py-1 leading-snug transition',
                item.depth === 3 ? 'pl-6 text-[0.8125rem]' : 'pl-3',
                active === item.id
                  ? 'border-brand-500 font-medium text-brand-700'
                  : 'border-transparent text-ink-400 hover:border-ink-300 hover:text-ink-700'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
