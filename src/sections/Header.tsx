'use client'

import { useState } from 'react'
import MenuIcon from '@/assets/icon-menu.svg'
import Button from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="py-3 md:py-4 border-b border-gray-200 dark:border-white/15 md:border-none sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container px-4">
        <div className="flex justify-between items-center md:border border-gray-200 dark:border-white/15 md:p-2.5 rounded-xl max-w-2xl lg:max-w-3xl mx-auto relative bg-white/50 dark:bg-black/50">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="flex-shrink-0">
            <div className="border border-gray-200 dark:border-white/15 h-9 w-9 md:h-10 md:w-10 rounded-lg inline-flex justify-center items-center">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-7 w-7 md:h-8 md:w-8" />
            </div>
          </div>
          <div className="hidden lg:block">
            <nav className="flex gap-6 lg:gap-8 text-sm">
              <a href="#features" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition whitespace-nowrap">
                Features
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition whitespace-nowrap">
                Developers Guide
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition whitespace-nowrap">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button>Try Now!</Button>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <MenuIcon className="text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white dark:bg-black border border-gray-200 dark:border-white/15 rounded-xl">
            <nav className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition py-2 border-b border-gray-200 dark:border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#" 
                className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition py-2 border-b border-gray-200 dark:border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Developers Guide
              </a>
              <a 
                href="#" 
                className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition py-2 border-b border-gray-200 dark:border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Integration Docs
              </a>
              <div className="pt-2 sm:hidden">
                <Button>Try Now!</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
