import MenuIcon from '@/assets/icon-menu.svg'
import Logo from '@/assets/logo.svg'
import Button from '@/components/Button'

export const Header = () => {
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
              <a href="#" className="text-white/70 hover:text-white transition">
                Features
              </a>
              <a href="#" className="text-white/70 hover:text-white transition">
                Developers Guide
              </a>
              <a href="#" className="text-white/70 hover:text-white transition">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </header>
  )
}
