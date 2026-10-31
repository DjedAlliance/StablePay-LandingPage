'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { BookOpen, ChevronRight, Compass, Rocket, Wrench, X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type SidebarGroup = { section: string; items: { title: string; href: string }[] }

const ICONS: Record<string, typeof Rocket> = {
  'Get started': Rocket,
  Learn: Compass,
  Guides: Wrench,
  Reference: BookOpen,
}

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path)

function SidebarNav({ groups, onNavigate }: { groups: SidebarGroup[]; onNavigate?: () => void }) {
  const pathname = normalise(usePathname() ?? '')
  return (
    <nav aria-label="Documentation" className="space-y-7">
      {groups.map((group) => {
        const Icon = ICONS[group.section] ?? BookOpen
        return (
          <div key={group.section}>
            <p className="mb-2 flex items-center gap-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              <Icon className="h-3.5 w-3.5" />
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={twMerge(
                        'block rounded-lg px-3 py-1.5 text-[0.875rem] leading-snug transition',
                        active
                          ? 'bg-brand-50 font-semibold text-brand-700'
                          : 'text-ink-500 hover:bg-surface-tint hover:text-ink-900'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar({ groups, children }: { groups: SidebarGroup[]; children?: ReactNode }) {
  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-64 shrink-0 overflow-y-auto border-r border-line-soft py-8 pr-4 lg:block">
      {children && <div className="mb-7">{children}</div>}
      <SidebarNav groups={groups} />
    </aside>
  )
}

export function DocsMobileNav({ groups, children }: { groups: SidebarGroup[]; children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const current = groups.flatMap((group) => group.items).find((item) => item.href === normalise(pathname ?? ''))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="sticky top-16 z-30 -mx-5 border-b border-line bg-white/90 px-5 backdrop-blur md:top-[72px] md:-mx-8 md:px-8 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 py-3 text-sm font-medium text-ink-700"
        aria-expanded={open}
      >
        <BookOpen className="h-4 w-4 text-brand-500" />
        Docs
        <ChevronRight className="h-3.5 w-3.5 text-ink-300" />
        <span className="truncate text-ink-900">{current?.title ?? 'Menu'}</span>
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[70]">
            <button
              type="button"
              className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            />
            <div className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] overflow-y-auto bg-white px-4 py-5 shadow-lift">
              <div className="mb-5 flex items-center justify-between px-3">
                <p className="text-sm font-semibold text-ink-900">Documentation</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-surface-tint"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {children && <div className="mb-6">{children}</div>}
              <SidebarNav groups={groups} onNavigate={() => setOpen(false)} />
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
