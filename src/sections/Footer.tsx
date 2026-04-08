import Logo from '@/assets/svg/logo.svg'
import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import GitHubSvg from '@/assets/github.svg'

export const Footer = () => {
  return (
    <footer>
      <div className="py-4 sm:py-5 border-t border-white/15">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center gap-4 sm:gap-5">

            {/* Logo Section */}
            <div className="flex gap-2 items-center justify-center sm:justify-start w-full sm:w-auto lg:flex-1">
              <Logo className="h-8 w-8 flex-shrink-0" />
              <div className="font-medium text-sm sm:text-base">
                StablePay
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-4 w-full sm:w-auto lg:flex-1 lg:justify-center">
              <a
                href="#"
                className="text-white/70 hover:text-white text-xs sm:text-sm transition"
              >
                Features
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-xs sm:text-sm transition"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white text-xs sm:text-sm transition"
              >
                Blog
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-4 sm:gap-5 justify-center w-full sm:w-auto lg:flex-1 lg:justify-end">

              {/* GitHub */}
              <a
                href="https://github.com/DjedAlliance/StablePay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubSvg className="text-white/40 hover:text-white transition w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/DjedAlliance"
                aria-label="X"
              >
                <XSocial className="text-white/40 hover:text-white transition w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@StabilityNexus"
                aria-label="YouTube"
              >
                <YTSocial className="text-white/40 hover:text-white transition w-5 h-5 sm:w-6 sm:h-6" />
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}