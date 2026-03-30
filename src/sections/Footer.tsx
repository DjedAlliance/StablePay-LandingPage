import Logo from '@/assets/logo.svg'
import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import GitHubIcon from '@/assets/svg/github.svg'

/**
 * Footer component displayed at the bottom of pages.
 * Shows the StablePay logo, navigation links and social icons.
 */
export const Footer = () => {
  return (
    <footer>
      <div className="py-4 sm:py-5 border-t border-white/15">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center gap-4 sm:gap-5">
            <div className="flex gap-2 items-center justify-center sm:justify-start w-full sm:w-auto lg:flex-1">
              <Logo className="h-8 w-8 sm:h-8 sm:w-8 flex-shrink-0" />
              <div className="font-medium text-sm sm:text-base">StablePay</div>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 w-full sm:w-auto lg:flex-1 lg:justify-center">
              <a href="#" className="text-white/70 hover:text-white text-xs sm:text-sm transition">
                Features
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs sm:text-sm transition">
                Docs
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs sm:text-sm transition">
                Blog
              </a>
              <a
                href="https://github.com/DjedAlliance/StablePay-LandingPage"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white text-xs sm:text-sm transition"
              >
                <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
                <span className="sr-only">GitHub</span>
              </a>
            </nav>
            <div className="flex gap-4 sm:gap-5 justify-center w-full sm:w-auto lg:flex-1 lg:justify-end">
              <XSocial className="text-white/40 hover:text-white transition w-5 h-5 sm:w-6 sm:h-6" />
              <YTSocial className="text-white/40 hover:text-white transition w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
