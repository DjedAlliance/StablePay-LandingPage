import MenuIcon from '@/assets/icon-menu.svg'
import Logo from '@/assets/svg/logo.svg'
import Button from '@/components/Button'
import ThemeToggle from '@/components/ThemeToggle'

/**
 * Header component — top navigation bar with logo and primary actions.
 */
export const Header = () => {
  return (
    <header className="py-3 sm:py-4 border-b border-black/10 dark:border-white/15 md:border-none sticky top-0 z-10 transition-colors duration-500 shadow-sm md:shadow-none dark:shadow-none">
      <div className="absolute inset-0 backdrop-blur-md -z-10 md:hidden bg-white/80 dark:bg-transparent transition-colors duration-500"></div>
      <div className="container px-4 sm:px-6">
        <div className="flex justify-between items-center md:border border-black/10 dark:border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative transition-colors duration-500 md:shadow-lg md:dark:shadow-none bg-white/80 dark:bg-transparent backdrop-blur-md z-10">
          <div className="absolute inset-0 backdrop-blur-md -z-10 hidden md:block rounded-xl transition-colors duration-500"></div>
          <div className="flex items-center text-black dark:text-white transition-colors duration-500">
            <Logo className="h-9 w-9 fill-current" />
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-4 lg:gap-8 text-sm">
              <a href="#features" className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Features
              </a>
              <a href="#" className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Developers Guide
              </a>
              <a href="#" className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors duration-300">
                Integration Docs
              </a>
            </nav>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <ThemeToggle />
            <Button>Try Now!</Button>
            <MenuIcon className="md:hidden w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white transition-colors duration-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
