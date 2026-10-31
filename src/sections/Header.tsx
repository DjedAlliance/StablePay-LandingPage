'use client'
import { useEffect, useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import { nav, site } from '@/lib/site'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Don't leave the page scrollable behind an open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={twMerge(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-white/85 backdrop-blur-md' : 'border-transparent bg-white/60 backdrop-blur-sm'
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <a href="#top" className="shrink-0" aria-label="StablePay home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-500 transition hover:bg-surface-tint hover:text-ink-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-400 transition hover:bg-surface-tint hover:text-ink-900 sm:inline-flex"
              aria-label="StablePay on GitHub"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer" size="sm" className="hidden sm:inline-flex">
              Get started
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-surface-tint lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-b border-line bg-white shadow-card lg:hidden"
          >
            <div className="container py-4">
              <nav className="flex flex-col">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-[0.9375rem] font-medium text-ink-700 transition hover:bg-surface-tint"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-3 flex flex-col gap-2 border-t border-line-soft pt-4">
                <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer" className="w-full">
                  Get started
                </Button>
                <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full">
                  <Github className="h-4 w-4" /> View on GitHub
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
