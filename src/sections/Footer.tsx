import Logo from '@/assets/logo.svg'
import XSocial from '@/assets/social-x.svg'
import YTSocial from '@/assets/social-youtube.svg'
import Share from '@/assets/share.png'
import Logo from '@/assets/logo.svg'

export const Footer = () => {
  return (
    <footer>
      <div className="py-5 border-t border-white/15">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex gap-2 items-center lg:flex-1">
              <img src="/favicon.ico" alt="StablePay Logo" className="h-6 w-6"></img>
              <div className="font-medium">StablePay</div>
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
              <a href="https://github.com/DjedAlliance/StablePay" className="text-white/70 hover:text-white text-xs md:text-sm transition">
                Github
              </a>
            </nav> 

            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent("Check out StablePay by @DjedAlliance! 🚀 https://stablepay.site")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="text-white/40 hover:text-white transition"
            >
              <img src={Share.src} alt="Share" className="h-6 w-6" />
            </a>
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <a href="https://x.com/DjedAlliance" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">
               <XSocial/> 
               </a>
              <YTSocial className="text-white/40 hover:text-white transition" />
              <a href="#" className="text-white/70 hover:text-white text-xs sm:text-sm transition">
                Github
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
