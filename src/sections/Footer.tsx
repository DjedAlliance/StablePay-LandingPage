import Logo from '@/assets/svg/logo.svg'
import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
"use client"

/**
 * Footer component displayed at the bottom of pages.
 * Shows the StablePay logo, navigation links and social icons.
 */
export const Footer = () => {
  return (
    <footer>
      <div className="py-4 sm:py-5 border-t border-black/15 dark:border-white/15 transition-colors duration-500">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center gap-4 sm:gap-5">
            <div className="flex gap-2 items-center justify-center sm:justify-start w-full sm:w-auto lg:flex-1">
              <Logo className="h-8 w-8 sm:h-8 sm:w-8 flex-shrink-0 text-black dark:text-white fill-current transition-colors duration-500" />
              <div className="font-medium text-sm sm:text-base text-black dark:text-white transition-colors duration-500">StablePay</div>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 w-full sm:w-auto lg:flex-1 lg:justify-center">
              <a href="#features" onClick={(e) => { e.preventDefault(); const el = document.getElementById('features'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300">
                Features
              </a>
              <a href="#developers" onClick={(e) => { e.preventDefault(); const el = document.getElementById('developers'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300">
                Docs
              </a>
              <a href="#features" onClick={(e) => { e.preventDefault(); const el = document.getElementById('features'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300">
                Blog
              </a>
              <a
                href="https://github.com/DjedAlliance/StablePay-LandingPage"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300"
              >
                GitHub
              </a>
            </nav>
            <div className="flex gap-4 sm:gap-5 justify-center w-full sm:w-auto lg:flex-1 lg:justify-end items-center">
              <a
                href="https://twitter.com/DjedAlliance"
                target="_blank"
                rel="noreferrer"
                aria-label="Djed Alliance on X (Twitter)"
                className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors duration-300"
              >
                <XSocial className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Djed Alliance on YouTube"
                className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors duration-300"
              >
                <YTSocial className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              {/* Simple share links for discoverability */}
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20StablePay%20-%20An%20open-source%20SDK&url=https://github.com/DjedAlliance/StablePay-LandingPage"
                target="_blank"
                rel="noreferrer"
                className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300 flex items-center gap-2"
              >
                Share
              </a>

              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/DjedAlliance/StablePay-LandingPage"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white text-xs sm:text-sm transition-colors duration-300"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
