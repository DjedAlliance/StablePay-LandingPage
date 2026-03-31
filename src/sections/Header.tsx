"use client"
import MenuIcon from '@/assets/icon-menu.svg'
import Logo from '@/assets/svg/logo.svg'
import Button from '@/components/Button'
import ThemeToggle from '@/components/ThemeToggle'
import React, { useState, useRef, useEffect } from 'react'

/**
 * Header component — top navigation bar with logo and primary actions.
 */
export const Header = () => {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousActiveRef = useRef<HTMLElement | null>(null)

  // Smooth scroll helper for same-page navigation
  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Manage focus when drawer opens/closes
  useEffect(() => {
    if (open) {
      previousActiveRef.current = document.activeElement as HTMLElement
      // focus the drawer container or the first focusable element inside
      setTimeout(() => {
        const first = drawerRef.current?.querySelector<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        )
        ;(first ?? drawerRef.current)?.focus()
      }, 0)

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
        if (e.key === 'Tab' && drawerRef.current) {
          const focusable = Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])')
          ).filter((el) => !el.hasAttribute('disabled'))
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        }
      }

      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    } else {
      // restore previous focus
      previousActiveRef.current?.focus()
    }
  }, [open])
  return (
    <header className="py-3 sm:py-4 border-b border-black/10 dark:border-white/15 md:border-none sticky top-0 z-0 transition-colors duration-500 shadow-sm md:shadow-none dark:shadow-none">
      <div className="absolute inset-0 backdrop-blur-md -z-10 md:hidden bg-white/80 dark:bg-transparent transition-colors duration-500"></div>
      <div className="container px-4 sm:px-6">
        <div className="flex justify-between items-center md:border border-black/10 dark:border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative transition-colors duration-500 md:shadow-lg md:dark:shadow-none bg-white/80 dark:bg-transparent backdrop-blur-md z-10">
          <div className="absolute inset-0 backdrop-blur-md -z-10 hidden md:block rounded-xl transition-colors duration-500"></div>
          <div className="flex items-center text-black dark:text-white transition-colors duration-500">
            <Logo className="h-9 w-9 fill-current" />
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-4 lg:gap-8 text-sm">
              <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Features
              </a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                About
              </a>
              <a href="#developers" onClick={(e) => handleSmoothScroll(e, 'developers')} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Developers Guide
              </a>
              <a href="#integration-docs" onClick={(e) => handleSmoothScroll(e, 'integration-docs')} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Integration Docs
              </a>
            </nav>
          </div>
            <div className="flex gap-2 sm:gap-4 items-center">
            <ThemeToggle />
            <Button>Try Now!</Button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setOpen(true)
              }}
              className="md:hidden p-2 w-8 h-8 sm:w-10 sm:h-10 text-black dark:text-white transition-colors duration-500 relative z-50"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
          <aside
            id="mobile-drawer"
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-black z-50 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-drawer-title"
          >
            <div className="p-6 flex flex-col h-full" tabIndex={-1}>
              <div className="flex items-center justify-between mb-6">
                <h2 id="mobile-drawer-title" className="sr-only">Navigation</h2>
                <Logo className="h-8 w-8" />
                <button ref={closeButtonRef} onClick={() => setOpen(false)} aria-label="Close menu" className="text-black dark:text-white">Close</button>
              </div>
              <nav className="flex flex-col gap-4">
                <a href="#features" onClick={(e) => { handleSmoothScroll(e, 'features'); setOpen(false) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors">Features</a>
                <a href="#about" onClick={(e) => { handleSmoothScroll(e, 'about'); setOpen(false) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors">About</a>
                <a href="#developers" onClick={(e) => { handleSmoothScroll(e, 'developers'); setOpen(false) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors">Developers Guide</a>
                <a href="#integration-docs" onClick={(e) => { handleSmoothScroll(e, 'integration-docs'); setOpen(false) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors">Integration Docs</a>
              </nav>
              <div className="mt-auto flex gap-3">
                <Button>Try Now!</Button>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  )
}
