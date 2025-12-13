import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'

export const Footer = () => {
  return (
    <footer>
      <div className="py-5 border-t border-border-primary/[var(--border-opacity)]">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex gap-2 items-center lg:flex-1">
              <div className="h-6 w-6 rounded inline-flex items-center justify-center bg-white/10">
                <img src="/favicon.ico" alt="StablePay Logo" className="h-5 w-5 object-contain" />
              </div>
              <div className="font-medium">StablePay</div>
            </div>
            <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:flex-1 lg:justify-center">
              <a href="#" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition">
                Features
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition">
                Docs
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition">
                Blog
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary text-xs md:text-sm transition">
                Github
              </a>
            </nav>
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <XSocial className="text-text-secondary hover:text-text-primary transition" />
              <YTSocial className="text-text-secondary hover:text-text-primary transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
