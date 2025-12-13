'use client'
import MenuIcon from '@/assets/icon-menu.svg'
import Button from '@/components/Button'
import ThemeToggle from '@/components/ThemeToggle'

export const Header = () => {
  return (
    <header className="py-4 border-b border-border-primary/[var(--border-opacity)] md:border-none sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-border-primary/[var(--border-opacity)] md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="">
            <div className="border border-border-primary/20 h-10 w-10 rounded-lg inline-flex justify-center items-center bg-white/10 backdrop-blur-sm">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-7 w-7 object-contain" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a href="#" className="text-text-secondary hover:text-text-primary transition">
                Features
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition">
                Developers Guide
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
