import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import GitHubSvg from '@/assets/svg/github.svg'

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black">
      <div className="py-5 border-t border-gray-200 dark:border-white/15">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex gap-2 items-center lg:flex-1">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-6 w-6" />
              <div className="font-medium text-gray-900 dark:text-white">StablePay</div>
            </div>
            <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:flex-1 lg:justify-center">
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition">
                Features
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition">
                Docs
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition">
                Blog
              </a>
              <a href="#" className="text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white text-xs md:text-sm transition">
                Github
              </a>
            </nav>
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <XSocial className="text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
              <a href="https://github.com/DjedAlliance/StablePay-LandingPage" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <GitHubSvg className="text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
              </a>
              <YTSocial className="text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
