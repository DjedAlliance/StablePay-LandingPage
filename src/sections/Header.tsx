'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import MenuIcon from '@/assets/icon-menu.svg'
import Logo from '@/assets/logo.svg'
import Button from '@/components/Button'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Developers Guide', href: '#developers' },
  { label: 'Integration Docs', href: '#docs' },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="py-3 sm:py-4 border-b border-white/15 md:border-none sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container px-4 sm:px-6">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div className="flex items-center">
            <Logo className="h-9 w-9 " />
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-4 lg:gap-8 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Button>Try Now!</Button>
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-1 rounded-lg hover:bg-white/10 transition"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-black border-l border-white/15 z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/15">
                  <Logo className="h-8 w-8" />
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="p-2 rounded-lg hover:bg-white/10 transition"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Links */}
                <nav className="flex flex-col p-4 gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition text-base"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Menu Footer */}
                <div className="mt-auto p-4 border-t border-white/15">
                  <Button>Try Now!</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
