'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'
import MenuIcon from '@/assets/icon-menu.svg'
import Logo from '@/assets/logo.svg'
import Button from '@/components/Button'

export const Header = () => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const borderGlowRef = useRef<HTMLDivElement>(null)
  const sheenGlowRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#', label: 'Developers Guide' },
    { href: '#', label: 'Integration Docs' },
  ]

  const navLinkClassName =
    'relative isolate inline-flex items-center pt-1 pb-2 leading-none text-white/70 transition-[color,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:-inset-x-4 before:-inset-y-2 before:-z-10 before:rounded-full before:bg-[#FF863B]/28 before:opacity-0 before:blur-lg before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-[#FF863B] after:shadow-[0_0_16px_rgba(255,134,59,1)] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:[text-shadow:0_0_24px_rgba(255,134,59,0.95)] hover:before:opacity-100 hover:after:scale-x-100 focus-visible:text-white focus-visible:[text-shadow:0_0_24px_rgba(255,134,59,0.95)] focus-visible:before:opacity-100 focus-visible:after:scale-x-100 focus-visible:outline-none'

  const glassBorderStyle = {
    '--glass-border-opacity': '0',
  } as CSSProperties

  const glassBorderMaskStyle = {
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  } as CSSProperties

  const updateGlassPosition = (x: number, y: number) => {
    const transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`

    if (borderGlowRef.current) {
      borderGlowRef.current.style.transform = transform
    }

    if (sheenGlowRef.current) {
      sheenGlowRef.current.style.transform = transform
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    event.currentTarget.style.setProperty('--glass-border-opacity', '1')
    updateGlassPosition(x, y)
  }

  const handlePointerLeave = () => {
    navbarRef.current?.style.setProperty('--glass-border-opacity', '0')
  }

  return (
    <header className="py-3 sm:py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container px-4 sm:px-6">
        <div
          ref={navbarRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="flex justify-between items-center md:border border-white/15 md:bg-white/[0.03] md:p-2.5 rounded-xl max-w-2xl mx-auto relative overflow-hidden"
          style={glassBorderStyle}
        >
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="pointer-events-none absolute inset-px rounded-[11px] hidden md:block bg-white/[0.02]"></div>
          <div
            className="pointer-events-none absolute inset-0 hidden rounded-xl p-px opacity-[var(--glass-border-opacity)] transition-opacity duration-300 ease-out md:block"
            style={glassBorderMaskStyle}
          >
            <div
              ref={borderGlowRef}
              className="absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0.82)_14%,rgba(255,230,212,0.62)_26%,rgba(255,134,59,0.9)_42%,rgba(255,134,59,0.4)_58%,transparent_76%)] blur-2xl transition-transform duration-200 ease-out"
            ></div>
          </div>
          <div className="pointer-events-none absolute inset-px hidden rounded-[11px] overflow-hidden opacity-[var(--glass-border-opacity)] transition-opacity duration-300 ease-out md:block">
            <div
              ref={sheenGlowRef}
              className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.2)_26%,rgba(255,134,59,0.16)_52%,transparent_76%)] blur-2xl transition-transform duration-200 ease-out"
            ></div>
          </div>
          <div className="flex items-center">
            <Logo className="h-9 w-9 " />
          </div>
          <div className="hidden md:flex md:items-center md:translate-y-[2px]">
            <nav className="flex items-center gap-4 lg:gap-8 text-sm">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={navLinkClassName}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </header>
  )
}
