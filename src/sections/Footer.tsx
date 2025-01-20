import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import Logo from '@/assets/logo.svg';

export const Footer = () => {
  return (
    <footer>
      <div className="py-5 border-t border-white/15">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex gap-2 items-center lg:flex-1">
            <Logo className="h-8 w-8" />
              <div className="font-medium">StablePay</div>
            </div>
            <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:flex-1 lg:justify-center">
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
                Features
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
                Docs
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
                Blog
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">
                Github
              </a>
            </nav>
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <XSocial className="text-white/40 hover:text-white transition" />
              <YTSocial className="text-white/40 hover:text-white transition" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
