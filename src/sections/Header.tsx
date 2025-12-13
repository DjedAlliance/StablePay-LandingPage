'use client'

import MenuIcon from '@/assets/icon-menu.svg'
import Button from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'

export const Header = () => {
  return (
    <header className="py-4 border-b border-gray-200 dark:border-white/15 md:border-none sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-gray-200 dark:border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative bg-white/50 dark:bg-black/50">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="">
            <div className="border border-gray-200 dark:border-white/15 h-10 w-10 rounded-lg inline-flex justify-center items-center">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a href="#features" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
                Features
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
                Developers Guide
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden text-gray-900 dark:text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
